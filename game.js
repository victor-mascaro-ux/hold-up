// Hold Up! / Peraí! — the code behind the screen.
// Texts come from lang/en.js and lang/pt-BR.js, numbers from settings.js and
// posts from posts/family.js; no player-facing text lives here.
(function () {
  var LANGUAGES = ["en", "pt-BR"];
  var SAVED_LANGUAGE_KEY = "holdup.language";
  var WELCOME_CAST = ["jorge", "nina", "mom", "rosa"];
  var POSTS = window.POSTS;

  var welcome = document.getElementById("welcome");
  var chat = document.getElementById("chat");
  var messages = document.getElementById("messages");
  var panel = document.getElementById("panel");
  var settingsButton = document.getElementById("settings-button");
  var settingsPanel = document.getElementById("settings-panel");

  // Where the player is: which posts are in the chat, what they said about
  // each, and what the bottom panel shows (typing, judging, result or done)
  var game = { language: null, shown: [], next: 0, phase: "typing" };
  var typingTimer = null;

  // Line icons (2.2px stroke, round ends), as in ART.md
  var ICONS = {
    forward: '<path d="M14 6l6 6-6 6"/><path d="M20 12H10a6 6 0 0 0-6 6"/>',
    share: '<path d="M12 4v11"/><path d="M7 9l5-5 5 5"/><path d="M5 14v5h14v-5"/>',
    stop: '<path d="M8.5 3h7L21 8.5v7L15.5 21h-7L3 15.5v-7z"/><path d="M8 12h8"/>',
    "needs-context": '<circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><path d="M12 7.5v.01"/>',
    right: '<circle cx="12" cy="12" r="9"/><path d="M7.5 12.5l3 3 6-6.5"/>',
    wrong: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    tick: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    cross: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
    next: '<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
    again: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    alert: '<path d="M12 4l9 16H3z"/><path d="M12 10v4"/><path d="M12 17v.01"/>'
  };
  var VERDICTS = ["share", "stop", "needs-context"];
  var VERDICT_TEXT = { share: "share", stop: "stop", "needs-context": "needsContext" };
  var ART_LABEL = {
    "gift-box": "artGiftBox",
    "tv-doctor": "artTvDoctor",
    "tv-doctor-avatar": "artTvDoctorAvatar",
    "wine-and-sneakers": "artWineAndSneakers",
    "coin-jar": "artCoinJar"
  };

  function icon(name, size) {
    return '<svg width="' + (size || 22) + '" height="' + (size || 22) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + "</svg>";
  }

  function text(key, values) {
    return window.TEXTS[game.language][key].replace(/\{(\w+)\}/g, function (all, name) {
      return values && name in values ? values[name] : all;
    });
  }

  function esc(value) {
    return String(value).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  // ---------------------------------------------------------------- language

  // The browser can refuse storage (private mode, blocked site data), so the
  // game still works, it just won't remember.
  function loadSavedLanguage() {
    try { return localStorage.getItem(SAVED_LANGUAGE_KEY); } catch (e) { return null; }
  }

  function saveLanguage(language) {
    try { localStorage.setItem(SAVED_LANGUAGE_KEY, language); } catch (e) {}
  }

  function forgetLanguage() {
    try { localStorage.removeItem(SAVED_LANGUAGE_KEY); } catch (e) {}
  }

  // A span of text in one language, tagged so screen readers pronounce it right
  function inLanguage(language, words) {
    var span = document.createElement("span");
    span.lang = language;
    span.textContent = words;
    return span;
  }

  // The welcome screen speaks both languages until one is chosen
  function buildWelcome() {
    var title = document.getElementById("welcome-title");
    var prompt = document.getElementById("welcome-prompt");
    var buttons = document.getElementById("welcome-buttons");

    LANGUAGES.forEach(function (language, i) {
      var texts = window.TEXTS[language];
      if (i > 0) {
        var slash = document.createElement("span");
        slash.className = "welcome-slash";
        slash.setAttribute("aria-hidden", "true");
        slash.textContent = " / ";
        title.appendChild(slash);
      }
      title.appendChild(inLanguage(language, texts.gameTitle));
      prompt.appendChild(inLanguage(language, texts.chooseLanguage));

      var button = document.createElement("button");
      button.type = "button";
      button.className = "welcome-button";
      button.lang = language;
      button.textContent = texts.languageName;
      button.addEventListener("click", function () {
        saveLanguage(language);
        startGame(language);
      });
      buttons.appendChild(button);
    });

    document.getElementById("welcome-cast").innerHTML = WELCOME_CAST.map(function (id) {
      return window.Characters.avatar(id, "relieved", 64);
    }).join("");
  }

  function showWelcome() {
    clearTimeout(typingTimer);
    document.documentElement.lang = "en";
    document.title = LANGUAGES.map(function (language) {
      return window.TEXTS[language].gameTitle;
    }).join(" / ");
    chat.hidden = true;
    welcome.hidden = false;
  }

  // Fills every fixed text on the chat screen in the game's language
  function applyLanguage(language) {
    game.language = language;
    var texts = window.TEXTS[language];
    document.documentElement.lang = language;
    document.title = texts.gameTitle;
    document.querySelectorAll("[data-text]").forEach(function (element) {
      element.textContent = texts[element.dataset.text];
    });
    document.querySelectorAll("[data-label]").forEach(function (element) {
      element.setAttribute("aria-label", texts[element.dataset.label]);
    });
  }

  function startGame(language) {
    applyLanguage(language);
    welcome.hidden = true;
    chat.hidden = false;
    playFrom(0);
  }

  // ---------------------------------------------------------------- posts

  function senderName(post) { return text(post.sender); }

  function picture(art) {
    return window.Illustrations.svg(art, ART_LABEL[art] ? text(ART_LABEL[art]) : "");
  }

  // The inside of a post: a link preview, a social post or an alert
  function postCard(post, t) {
    if (post.kind === "alert") {
      return '<div class="card alert-card"><div class="alert-head">' + icon("alert", 15) + esc(t.source.name) + "</div>" +
        '<div class="alert-text">' + esc(t.headline) + "</div></div>";
    }
    if (post.kind === "post") {
      return '<div class="card"><div class="social-head"><span class="social-avatar">' + picture(post.image.avatar) + "</span>" +
        '<div><div class="social-name">' + esc(t.source.name) + '</div><div class="site">' + esc(t.source.url) + "</div></div></div>" +
        picture(post.image.art) + '<div class="social-text">' + esc(t.headline) + "</div></div>";
    }
    return '<div class="card">' + picture(post.image.art) + '<div class="card-body">' +
      '<div class="site">' + esc(t.source.url) + '</div><div class="headline">' + esc(t.headline) + "</div></div></div>";
  }

  function postBubble(entry, isCurrent) {
    var post = POSTS[entry.index];
    var t = post.text[game.language];
    var said = "";
    if (entry.choice) {
      var right = entry.choice === post.verdict;
      said = '<span class="said">' + icon(right ? "tick" : "cross", 13) +
        esc(text("youSaid", { verdict: text(VERDICT_TEXT[entry.choice]) })) + "</span>";
    }
    var time = entry.arrived.toLocaleTimeString(game.language, { hour: "numeric", minute: "2-digit" });
    return '<div class="message-row">' + window.Characters.avatar(post.sender, "neutral", 44) +
      '<div class="bubble post' + (isCurrent && !entry.choice ? " judged" : "") + '">' +
      '<div class="post-top"><div class="sender">' + esc(senderName(post)) + "</div>" +
      '<div class="forwarded">' + icon("forward", 14) + esc(text("forwarded")) + "</div></div>" +
      postCard(post, t) +
      '<div class="post-text">' + esc(t.message) + "</div>" +
      '<div class="post-foot">' + said + '<span class="time">' + esc(time) + "</span></div>" +
      "</div></div>";
  }

  function typingBubble(post) {
    var name = senderName(post);
    return '<div class="message-row">' + window.Characters.avatar(post.sender, "neutral", 44) +
      '<div class="bubble typing" role="status"><span class="sender">' + esc(text("typing", { name: name })) + "</span>" +
      '<span class="typing-dots" aria-hidden="true"><span></span><span></span><span></span></span></div></div>';
  }

  function renderMessages() {
    var html = game.shown.map(function (entry, i) {
      return postBubble(entry, i === game.shown.length - 1);
    }).join("");
    if (game.phase === "typing") html += typingBubble(POSTS[game.next]);
    messages.innerHTML = html;
  }

  // Shows the newest message: all of it if it fits, or from its top if it's
  // taller than the space left above the panel
  function scrollToNewest() {
    var newest = messages.lastElementChild;
    if (!newest) return;
    var room = messages.clientHeight;
    if (newest.offsetHeight > room - 28) {
      messages.scrollTop = newest.offsetTop - 14;
    } else {
      messages.scrollTop = messages.scrollHeight;
    }
  }

  // ---------------------------------------------------------------- panel

  function verdictChip(verdict) {
    return '<span class="verdict-chip verdict-' + verdict + '">' + icon(verdict, 14) + esc(text(VERDICT_TEXT[verdict])) + "</span>";
  }

  function renderPanel() {
    var current = game.shown[game.shown.length - 1];
    if (game.phase === "typing" || !current) {
      panel.hidden = true;
      return;
    }
    panel.hidden = false;
    var post = POSTS[current.index];

    if (game.phase === "judging") {
      panel.innerHTML = '<h2 class="panel-title">' + esc(text("yourCall", { post: text(post.sender + "Post") })) + "</h2>" +
        '<div class="verdicts">' + VERDICTS.map(function (verdict) {
          return '<button type="button" class="verdict verdict-' + verdict + '" data-verdict="' + verdict + '">' +
            icon(verdict) + esc(text(VERDICT_TEXT[verdict])) + "</button>";
        }).join("") + "</div>";
      return;
    }

    if (game.phase === "result") {
      var right = current.choice === post.verdict;
      panel.innerHTML =
        '<h2 class="panel-title result-title ' + (right ? "right" : "wrong") + '" tabindex="-1">' +
        icon(right ? "right" : "wrong", 24) + esc(text(right ? "right" : "wrong")) + "</h2>" +
        '<p class="result-line">' + esc(text("theAnswer")) + " " + verdictChip(post.verdict) + "</p>" +
        (right ? "" : '<p class="result-line">' + esc(text("youPicked")) + " " + verdictChip(current.choice) + "</p>") +
        '<p class="result-explain">' + esc(post.text[game.language].explain) + "</p>" +
        '<button type="button" class="primary" data-action="next">' +
        esc(text("next")) + icon("next", 20) + "</button>";
      return;
    }

    // Done: every post has been judged
    var judged = game.shown.filter(function (entry) { return entry.choice; });
    var rightCount = judged.filter(function (entry) { return entry.choice === POSTS[entry.index].verdict; }).length;
    panel.innerHTML = '<h2 class="panel-title" tabindex="-1">' + esc(text("doneTitle")) + "</h2>" +
      '<p class="done-score">' + esc(text("doneScore", { right: rightCount, total: judged.length })) + "</p>" +
      '<button type="button" class="primary" data-action="again">' + icon("again", 20) + esc(text("playAgain")) + "</button>";
  }

  function render() {
    renderMessages();
    renderPanel();
    renderTestMenu();
    scrollToNewest();
  }

  // ---------------------------------------------------------------- the loop

  // A post arrives after a short "typing…"
  function arrive(index) {
    clearTimeout(typingTimer);
    game.next = index;
    game.phase = "typing";
    render();
    typingTimer = setTimeout(function () {
      game.shown.push({ index: index, choice: null, arrived: new Date() });
      game.phase = "judging";
      render();
    }, window.SETTINGS.typingSeconds * 1000);
  }

  function playFrom(index) {
    game.shown = [];
    arrive(index);
  }

  function choose(verdict) {
    game.shown[game.shown.length - 1].choice = verdict;
    game.phase = "result";
    render();
    panel.querySelector(".result-title").focus();
  }

  function goOn() {
    var current = game.shown[game.shown.length - 1];
    if (current.index < POSTS.length - 1) {
      arrive(current.index + 1);
    } else {
      game.phase = "done";
      render();
      panel.querySelector(".panel-title").focus();
    }
  }

  panel.addEventListener("click", function (event) {
    var button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.verdict) choose(button.dataset.verdict);
    else if (button.dataset.action === "next") goOn();
    else if (button.dataset.action === "again") playFrom(0);
  });

  // ---------------------------------------------------------------- settings

  function openSettings() {
    settingsPanel.hidden = false;
    settingsButton.setAttribute("aria-expanded", "true");
    settingsPanel.querySelector("button").focus();
  }

  function closeSettings(returnFocus) {
    if (settingsPanel.hidden) return;
    settingsPanel.hidden = true;
    settingsButton.setAttribute("aria-expanded", "false");
    if (returnFocus) settingsButton.focus();
  }

  settingsButton.addEventListener("click", function () {
    if (settingsPanel.hidden) openSettings(); else closeSettings(false);
  });

  // Start over resets everything and goes back to the welcome screen, where
  // the language is chosen again. Once progress is saved, it will clear that
  // too (and ask first).
  document.getElementById("start-over").addEventListener("click", function () {
    closeSettings(false);
    forgetLanguage();
    game.shown = [];
    showWelcome();
  });

  // Test section: jump to any post, or switch language mid-game. For building
  // and testing only; players can't change language mid-game (see the GDD).
  function buildTestMenu() {
    document.getElementById("jump-buttons").innerHTML = POSTS.map(function (post, i) {
      return '<button type="button" class="pill" data-jump="' + i + '">' + (i + 1) + "</button>";
    }).join("");
    document.getElementById("language-buttons").innerHTML = LANGUAGES.map(function (language) {
      return '<button type="button" class="pill" lang="' + language + '" data-language="' + language + '">' +
        esc(window.TEXTS[language].languageCode) + "</button>";
    }).join("");
  }

  function renderTestMenu() {
    var current = game.phase === "typing" ? game.next : (game.shown[game.shown.length - 1] || {}).index;
    settingsPanel.querySelectorAll("[data-jump]").forEach(function (button) {
      button.setAttribute("aria-current", String(Number(button.dataset.jump) === current));
    });
    settingsPanel.querySelectorAll("[data-language]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.language === game.language));
    });
  }

  settingsPanel.addEventListener("click", function (event) {
    var button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.jump) {
      closeSettings(false);
      playFrom(Number(button.dataset.jump));
    } else if (button.dataset.language) {
      closeSettings(false);
      saveLanguage(button.dataset.language);
      applyLanguage(button.dataset.language);
      render();
    }
  });

  // Tapping anywhere else, or pressing Escape, closes the settings
  document.addEventListener("click", function (event) {
    if (!settingsPanel.contains(event.target) && !settingsButton.contains(event.target)) closeSettings(false);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeSettings(true);
  });

  buildWelcome();
  buildTestMenu();
  var saved = loadSavedLanguage();
  if (LANGUAGES.indexOf(saved) !== -1) startGame(saved); else showWelcome();
})();
