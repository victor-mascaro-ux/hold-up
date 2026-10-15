// Hold Up! / Peraí! — the code behind the screen.
// Texts come from lang/en.js and lang/pt-BR.js; no player-facing text lives here.
(function () {
  var LANGUAGES = ["en", "pt-BR"];
  var SAVED_LANGUAGE_KEY = "holdup.language";
  var WELCOME_CAST = ["jorge", "nina", "mom", "rosa"];

  var welcome = document.getElementById("welcome");
  var chat = document.getElementById("chat");
  var settingsButton = document.getElementById("settings-button");
  var settingsPanel = document.getElementById("settings-panel");

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
  function inLanguage(language, text) {
    var span = document.createElement("span");
    span.lang = language;
    span.textContent = text;
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
    document.documentElement.lang = "en";
    document.title = LANGUAGES.map(function (language) {
      return window.TEXTS[language].gameTitle;
    }).join(" / ");
    chat.hidden = true;
    welcome.hidden = false;
  }

  function startGame(language) {
    var texts = window.TEXTS[language];
    document.documentElement.lang = language;
    document.title = texts.gameTitle;
    document.querySelectorAll("[data-text]").forEach(function (element) {
      element.textContent = texts[element.dataset.text];
    });
    document.querySelectorAll("[data-label]").forEach(function (element) {
      element.setAttribute("aria-label", texts[element.dataset.label]);
    });
    welcome.hidden = true;
    chat.hidden = false;
  }

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

  // Start over goes back to the welcome screen, where the language is chosen
  // again. Once progress is saved, it will also clear it (and ask first).
  document.getElementById("start-over").addEventListener("click", function () {
    closeSettings(false);
    forgetLanguage();
    showWelcome();
  });

  // Tapping anywhere else, or pressing Escape, closes the settings
  document.addEventListener("click", function (event) {
    if (!settingsPanel.contains(event.target) && !settingsButton.contains(event.target)) closeSettings(false);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeSettings(true);
  });

  buildWelcome();
  var saved = loadSavedLanguage();
  if (LANGUAGES.indexOf(saved) !== -1) startGame(saved); else showWelcome();
})();
