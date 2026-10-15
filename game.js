// Hold Up! / Peraí! — the code behind the screen.
// Texts come from lang/en.js and lang/pt-BR.js, numbers from settings.js,
// posts from posts/family.js and the rules for checking and scoring from
// scoring.js; no player-facing text lives here.
(function () {
  var LANGUAGES = ["en", "pt-BR"];
  var SAVED_LANGUAGE_KEY = "holdup.language";
  var SAVED_NUMBERS_KEY = "holdup.numbers";
  var WELCOME_CAST = ["jorge", "nina", "mom", "rosa"];
  var POSTS = window.POSTS;
  var Scoring = window.Scoring;

  var welcome = document.getElementById("welcome");
  var chat = document.getElementById("chat");
  var messages = document.getElementById("messages");
  var panel = document.getElementById("panel");
  var scoreChip = document.getElementById("score");
  var settingsButton = document.getElementById("settings-button");
  var settingsPanel = document.getElementById("settings-panel");

  // Where the player is. `shown` holds the posts in the chat, each with the
  // tools used, the verdict, the proof and its score. `phase` says what the
  // bottom panel shows: typing, judging, proof, result or done.
  var game = {
    language: null,
    shown: [],
    next: 0,
    phase: "typing",
    trayOpen: false,
    tool: null,
    picked: null,
    numbers: false
  };
  var typingTimer = null;
  var lastScore = 0;
  var lastForwards = null;

  // Line icons (2.2px stroke, round ends), as in ART.md
  var ICONS = {
    forward: '<path d="M14 6l6 6-6 6"/><path d="M20 12H10a6 6 0 0 0-6 6"/>',
    spread: '<path d="M4 17l6-6 4 4 6-6"/><path d="M15 9h5v5"/>',
    share: '<path d="M12 4v11"/><path d="M7 9l5-5 5 5"/><path d="M5 14v5h14v-5"/>',
    stop: '<path d="M8.5 3h7L21 8.5v7L15.5 21h-7L3 15.5v-7z"/><path d="M8 12h8"/>',
    "needs-context": '<circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><path d="M12 7.5v.01"/>',
    right: '<circle cx="12" cy="12" r="9"/><path d="M7.5 12.5l3 3 6-6.5"/>',
    wrong: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    tick: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    cross: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
    next: '<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
    again: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    alert: '<path d="M12 4l9 16H3z"/><path d="M12 10v4"/><path d="M12 17v.01"/>',
    zoom: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
    source: '<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    article: '<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h7M9 16h7M9 8h3"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
    close: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>'
  };
  var VERDICTS = ["share", "stop", "needs-context"];
  var VERDICT_TEXT = { share: "share", stop: "stop", "needs-context": "needsContext" };
  var TOOL_TEXT = { zoom: "toolZoom", source: "toolSource", article: "toolArticle" };
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

  // 2.5 in English, 2,5 in Portuguese, with a real minus sign
  function number(n) {
    return (n + 0).toLocaleString(game.language, { maximumFractionDigits: 1 }).replace("-", "−"); // + 0 turns −0 into 0
  }

  function signed(n) { return (n > 0 ? "+" : "") + number(n); }

  // ---------------------------------------------------------------- storage

  // The browser can refuse storage (private mode, blocked site data), so the
  // game still works, it just won't remember.
  function load(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  function forget(key) {
    try { localStorage.removeItem(key); } catch (e) {}
  }

  // ---------------------------------------------------------------- language

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
        save(SAVED_LANGUAGE_KEY, language);
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

  function current() { return game.shown[game.shown.length - 1]; }

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
    var checkable = isCurrent && game.phase === "judging";
    var said = "";
    if (entry.result) { // only once it's scored, so the tick doesn't give the answer away
      var right = entry.choice === post.verdict;
      said = '<span class="said">' + icon(right ? "tick" : "cross", 13) +
        esc(text("youSaid", { verdict: text(VERDICT_TEXT[entry.choice]) })) + "</span>";
    }
    var forwards = Scoring.forwards(Scoring.ticks(entry.used));
    var time = entry.arrived.toLocaleTimeString(game.language, { hour: "numeric", minute: "2-digit" });
    return '<div class="message-row">' + window.Characters.avatar(post.sender, "neutral", 44) +
      '<div class="bubble post' + (isCurrent && !entry.choice ? " judged" : "") + (checkable ? " checkable" : "") + '"' +
      (checkable ? ' role="button" tabindex="0" aria-label="' + esc(text("checkPost", { post: text(post.sender + "Post") })) + '"' : "") + ">" +
      '<div class="post-top"><div class="sender">' + esc(senderName(post)) + "</div>" +
      '<div class="forwarded">' + icon("forward", 14) + esc(text("forwarded")) + "</div></div>" +
      postCard(post, t) +
      '<div class="post-text">' + esc(t.message) + "</div>" +
      '<div class="post-foot"><span class="forward-count"' + (isCurrent ? ' id="forward-count"' : "") + ">" +
      icon("spread", 13) + esc(text("forwardedTimes", { n: number(forwards) })) + "</span>" +
      said + '<span class="time">' + esc(time) + "</span></div>" +
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

    // The counter jumps a little when a tick forwards the post again
    var counter = document.getElementById("forward-count");
    var entry = current();
    var now = entry && game.phase !== "typing" ? Scoring.ticks(entry.used) : null;
    if (counter && lastForwards !== null && now > lastForwards) counter.classList.add("bump");
    lastForwards = now;
  }

  // Shows the newest message: all of it if it fits, or from its top if it's
  // taller than the space left above the panel
  function scrollToNewest() {
    var newest = messages.lastElementChild;
    if (!newest) return;
    if (newest.offsetHeight > messages.clientHeight - 28) {
      messages.scrollTop = newest.offsetTop - 14;
    } else {
      messages.scrollTop = messages.scrollHeight;
    }
  }

  // ---------------------------------------------------------------- clues

  function clueLabel(post, clue) {
    if (clue === "source.url") return text("clueAddress");
    if (clue === "headline") {
      return text(post.kind === "post" ? "cluePostText" : post.kind === "alert" ? "clueAlertText" : "clueHeadline");
    }
    if (clue === "image") return text("clueImage");
    if (clue === "message") return text(post.sender + "Message");
    if (clue === "date") return text("clueDate");
    if (clue === "finePrint") return text("clueFinePrint");
    if (clue === "source.about") return text("clueSource");
    return text("clueParagraph", { n: clue.replace("article.p", "") });
  }

  function clueChip(post, clue, mark) {
    return '<span class="clue-chip">' + (mark ? icon(mark, 14) : "") + esc(clueLabel(post, clue)) + "</span>";
  }

  // ---------------------------------------------------------------- panel

  function verdictChip(verdict) {
    return '<span class="verdict-chip verdict-' + verdict + '">' + icon(verdict, 14) + esc(text(VERDICT_TEXT[verdict])) + "</span>";
  }

  function postDate(post) {
    return new Date(post.date + "T12:00:00").toLocaleDateString(game.language, { day: "numeric", month: "long", year: "numeric" });
  }

  // What a checking tool shows about the post
  function toolResult(post, tool) {
    var t = post.text[game.language];
    var html = '<div class="tool-result"><div class="tool-result-name">' + icon(tool, 14) + esc(text(TOOL_TEXT[tool])) + "</div>";
    if (tool === "zoom") {
      html += '<div class="zoom-address">' + esc(t.source.url) + "</div>" +
        '<div class="zoom-small">' + esc(text("zoomDate", { date: postDate(post) })) + "</div>" +
        (t.finePrint ? '<div class="zoom-small">' + esc(t.finePrint) + "</div>" : "");
    } else if (tool === "source") {
      html += '<div class="source-name">' + esc(t.source.name) + "</div><div>" + esc(t.source.about) + "</div>";
    } else {
      html += '<ol class="article-text">' + t.article.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ol>";
    }
    return html + "</div>";
  }

  function toolButton(post, entry, tool) {
    var available = Scoring.hasTool(post, tool);
    var cost = Scoring.toolTicks(tool);
    var costLine = game.numbers && available
      ? '<span class="cost">' + (cost ? icon("clock", 12) + esc(text("toolTicks", { n: cost })) : esc(text("toolFree"))) + "</span>"
      : "";
    return '<button type="button" class="tool" data-tool="' + tool + '" aria-pressed="' + (game.tool === tool) + '"' +
      (available ? "" : ' disabled aria-label="' + esc(text(TOOL_TEXT[tool]) + ": " + text("noArticle")) + '"') + ">" +
      (entry.used[tool] ? '<span class="used">' + icon("tick", 12) + "</span>" : "") +
      icon(tool) + esc(text(TOOL_TEXT[tool])) + costLine + "</button>";
  }

  function judgingPanel(post, entry) {
    var head = '<div class="panel-head"><h2 class="panel-title">' + esc(text("yourCall", { post: text(post.sender + "Post") })) + "</h2>" +
      (game.trayOpen
        ? '<button type="button" class="icon-button close-tools" data-action="close-tools" aria-label="' + esc(text("closeTools")) + '">' + icon("close") + "</button>"
        : '<div class="hint">' + icon("zoom", 15) + esc(text("tapToCheck")) + "</div>") +
      "</div>";
    var tray = "";
    if (game.trayOpen) {
      var ticks = Scoring.ticks(entry.used);
      tray = (game.tool ? toolResult(post, game.tool) : "") +
        '<div class="tools">' + Scoring.tools.map(function (tool) { return toolButton(post, entry, tool); }).join("") + "</div>" +
        (game.numbers
          ? '<p class="numbers">' + esc(text("ticksSoFar", { n: ticks, points: signed(ticks * window.SETTINGS.points.perTick) })) + "</p>"
          : "");
    }
    return head + tray + '<div class="verdicts">' + VERDICTS.map(function (verdict) {
      return '<button type="button" class="verdict verdict-' + verdict + '" data-verdict="' + verdict + '">' +
        icon(verdict) + esc(text(VERDICT_TEXT[verdict])) + "</button>";
    }).join("") + "</div>";
  }

  function proofPanel(post, entry) {
    return '<h2 class="panel-title" tabindex="-1">' + esc(text("whatGaveItAway")) + "</h2>" +
      '<div class="clues">' + Scoring.cluesAvailable(post, entry.used).map(function (clue) {
        var picked = game.picked === clue;
        return '<button type="button" class="clue" data-clue="' + clue + '" aria-pressed="' + picked + '">' +
          (picked ? icon("tick", 16) : "") + esc(clueLabel(post, clue)) + "</button>";
      }).join("") + "</div>" +
      '<div class="proof-actions"><button type="button" class="secondary" data-action="not-sure">' + esc(text("notSure")) + "</button>" +
      '<button type="button" class="primary" data-action="confirm"' + (game.picked ? "" : " disabled") + ">" +
      icon("tick", 20) + esc(text("thatsIt")) + "</button></div>";
  }

  function proofLines(post, entry) {
    var r = entry.result;
    if (entry.choice !== post.verdict || Scoring.truth(post) === "true") return "";
    var answer = '<p class="result-line">' + esc(text("proofAnswer")) + " " +
      post.evidence.map(function (clue) { return clueChip(post, clue); }).join(" ") + "</p>";
    if (r.proof === "right") {
      return '<p class="result-line">' + esc(text("proofFound")) + " " + clueChip(post, entry.proof, "tick") + "</p>";
    }
    if (r.proof === "wrong") {
      return '<p class="result-line">' + esc(text("proofPointed")) + " " + clueChip(post, entry.proof, "cross") + "</p>" + answer;
    }
    return '<p class="result-line">' + esc(text("proofNone")) + "</p>" + answer;
  }

  function numberLines(entry) {
    if (!game.numbers) return "";
    var r = entry.result;
    return '<p class="numbers">' + esc(text("pointsVerdict", { points: signed(r.verdictPoints) })) + "<br>" +
      esc(text("pointsTicks", { n: r.ticks, each: number(window.SETTINGS.points.perTick), points: signed(r.tickPoints) })) + "<br>" +
      esc(text("pointsPost", { points: signed(r.total) })) + "</p>";
  }

  function resultPanel(post, entry) {
    var right = entry.choice === post.verdict;
    return '<h2 class="panel-title result-title ' + (right ? "right" : "wrong") + '" tabindex="-1">' +
      icon(right ? "right" : "wrong", 24) + esc(text(right ? "right" : "wrong")) + "</h2>" +
      '<p class="result-line">' + esc(text("theAnswer")) + " " + verdictChip(post.verdict) + "</p>" +
      (right ? "" : '<p class="result-line">' + esc(text("youPicked")) + " " + verdictChip(entry.choice) + "</p>") +
      proofLines(post, entry) +
      '<p class="result-explain">' + esc(post.text[game.language].explain) + "</p>" +
      numberLines(entry) +
      '<button type="button" class="primary" data-action="next">' + esc(text("next")) + icon("next", 20) + "</button>";
  }

  function donePanel() {
    var judged = game.shown.filter(function (entry) { return entry.result; });
    var rightCount = judged.filter(function (entry) { return entry.choice === POSTS[entry.index].verdict; }).length;
    return '<h2 class="panel-title" tabindex="-1">' + esc(text("doneTitle")) + "</h2>" +
      '<p class="done-score">' + esc(text("doneScore", { right: rightCount, total: judged.length })) + "<br>" +
      esc(text("score", { n: number(totalScore()) })) + "</p>" +
      '<button type="button" class="primary" data-action="again">' + icon("again", 20) + esc(text("playAgain")) + "</button>";
  }

  function renderPanel() {
    var entry = current();
    if (game.phase === "typing" || !entry) {
      panel.hidden = true;
      return;
    }

    // Re-drawing the panel loses keyboard focus, so put it back on the same button
    var focused = document.activeElement && panel.contains(document.activeElement) ? document.activeElement.dataset : null;

    panel.hidden = false;
    var post = POSTS[entry.index];
    if (game.phase === "judging") panel.innerHTML = judgingPanel(post, entry);
    else if (game.phase === "proof") panel.innerHTML = proofPanel(post, entry);
    else if (game.phase === "result") panel.innerHTML = resultPanel(post, entry);
    else panel.innerHTML = donePanel();

    if (focused) {
      var key = focused.tool ? '[data-tool="' + focused.tool + '"]' : focused.clue ? '[data-clue="' + focused.clue + '"]' : null;
      var again = key && panel.querySelector(key);
      if (again) again.focus();
    }
  }

  // ---------------------------------------------------------------- score

  function totalScore() {
    return game.shown.reduce(function (sum, entry) { return sum + (entry.result ? entry.result.total : 0); }, 0);
  }

  function renderScore() {
    var total = totalScore();
    document.getElementById("score-value").textContent = text("scoreChip", { n: number(total) });
    scoreChip.setAttribute("aria-label", text("score", { n: number(total) }));
    if (total !== lastScore) {
      scoreChip.classList.remove("bump");
      void scoreChip.offsetWidth;
      scoreChip.classList.add("bump");
    }
    lastScore = total;
  }

  function render() {
    renderMessages();
    renderPanel();
    renderScore();
    renderTestMenu();
    scrollToNewest();
  }

  // ---------------------------------------------------------------- the loop

  // A post arrives after a short "typing…"
  function arrive(index) {
    clearTimeout(typingTimer);
    game.next = index;
    game.phase = "typing";
    game.trayOpen = false;
    game.tool = null;
    game.picked = null;
    render();
    typingTimer = setTimeout(function () {
      game.shown.push({ index: index, arrived: new Date(), used: Scoring.noTools(), choice: null, proof: null, result: null });
      game.phase = "judging";
      lastForwards = 0;
      render();
    }, window.SETTINGS.typingSeconds * 1000);
  }

  function playFrom(index) {
    game.shown = [];
    lastScore = 0;
    arrive(index);
  }

  function openTray() {
    if (game.phase !== "judging" || game.trayOpen) return;
    game.trayOpen = true;
    render();
    var first = panel.querySelector(".tool");
    if (first) first.focus();
  }

  function useTool(tool) {
    var entry = current();
    entry.used[tool] = true;
    game.tool = tool;
    render();
  }

  function score() {
    var entry = current();
    entry.result = Scoring.score(POSTS[entry.index], { verdict: entry.choice, proof: entry.proof, used: entry.used });
    game.phase = "result";
    render();
    panel.querySelector(".result-title").focus();
  }

  // After Stop or Needs context you point at what gave it away; Share skips that
  function choose(verdict) {
    var entry = current();
    entry.choice = verdict;
    game.trayOpen = false;
    game.tool = null;
    if (verdict === "share") {
      score();
    } else {
      game.phase = "proof";
      game.picked = null;
      render();
      panel.querySelector(".panel-title").focus();
    }
  }

  function prove(clue) {
    current().proof = clue;
    score();
  }

  function goOn() {
    var entry = current();
    if (entry.index < POSTS.length - 1) {
      arrive(entry.index + 1);
    } else {
      game.phase = "done";
      render();
      panel.querySelector(".panel-title").focus();
    }
  }

  messages.addEventListener("click", function (event) {
    if (event.target.closest(".post.checkable")) openTray();
  });

  messages.addEventListener("keydown", function (event) {
    if ((event.key === "Enter" || event.key === " ") && event.target.classList.contains("checkable")) {
      event.preventDefault();
      openTray();
    }
  });

  panel.addEventListener("click", function (event) {
    var button = event.target.closest("button");
    if (!button || button.disabled) return;
    var data = button.dataset;
    if (data.tool) useTool(data.tool);
    else if (data.verdict) choose(data.verdict);
    else if (data.clue) { game.picked = data.clue; render(); }
    else if (data.action === "close-tools") { game.trayOpen = false; game.tool = null; render(); }
    else if (data.action === "confirm") prove(game.picked);
    else if (data.action === "not-sure") prove(null);
    else if (data.action === "next") goOn();
    else if (data.action === "again") playFrom(0);
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
    forget(SAVED_LANGUAGE_KEY);
    game.shown = [];
    lastScore = 0;
    showWelcome();
  });

  // Test section: jump to any post, switch language mid-game, show the
  // numbers. For building and testing only; players can't change language
  // mid-game (see the GDD).
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
    var at = game.phase === "typing" ? game.next : (current() || {}).index;
    settingsPanel.querySelectorAll("[data-jump]").forEach(function (button) {
      button.setAttribute("aria-current", String(Number(button.dataset.jump) === at));
    });
    settingsPanel.querySelectorAll("[data-language]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.language === game.language));
    });
    document.getElementById("numbers-buttons").innerHTML = ["on", "off"].map(function (value) {
      return '<button type="button" class="pill" data-numbers="' + value + '" aria-pressed="' +
        ((value === "on") === game.numbers) + '">' + esc(text(value)) + "</button>";
    }).join("");
  }

  settingsPanel.addEventListener("click", function (event) {
    var button = event.target.closest("button");
    if (!button) return;
    var data = button.dataset;
    if (data.jump) {
      closeSettings(false);
      playFrom(Number(data.jump));
    } else if (data.language) {
      closeSettings(false);
      save(SAVED_LANGUAGE_KEY, data.language);
      applyLanguage(data.language);
      render();
    } else if (data.numbers) {
      game.numbers = data.numbers === "on";
      save(SAVED_NUMBERS_KEY, data.numbers);
      render();
      settingsPanel.querySelector('[data-numbers="' + data.numbers + '"]').focus();
    }
  });

  // Tapping anywhere else, or pressing Escape, closes the settings
  document.addEventListener("click", function (event) {
    if (!event.target.isConnected) return; // a button that was just re-drawn
    if (!settingsPanel.contains(event.target) && !settingsButton.contains(event.target)) closeSettings(false);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeSettings(true);
  });

  game.numbers = load(SAVED_NUMBERS_KEY) === "on";
  buildWelcome();
  buildTestMenu();
  var saved = load(SAVED_LANGUAGE_KEY);
  if (LANGUAGES.indexOf(saved) !== -1) startGame(saved); else showWelcome();
})();
