// Hold Up! / Peraí! — the code behind the screen.
// Texts come from lang/en.js and lang/pt-BR.js; no player-facing text lives here.
(function () {
  var LANGUAGES = ["en", "pt-BR"];
  var SAVED_LANGUAGE_KEY = "holdup.language";
  var TICK = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

  var settingsButton = document.getElementById("settings-button");
  var settingsPanel = document.getElementById("settings-panel");

  // A saved choice wins. Otherwise phones set to Portuguese start in PT-BR,
  // and every other phone starts in English.
  function pickLanguage(saved, phoneLanguages) {
    if (LANGUAGES.indexOf(saved) !== -1) return saved;
    var first = (phoneLanguages && phoneLanguages[0]) || "";
    return first.toLowerCase().indexOf("pt") === 0 ? "pt-BR" : "en";
  }

  // The browser can refuse storage (private mode, blocked site data), so the
  // game still works, it just won't remember.
  function loadSavedLanguage() {
    try { return localStorage.getItem(SAVED_LANGUAGE_KEY); } catch (e) { return null; }
  }

  function saveLanguage(language) {
    try { localStorage.setItem(SAVED_LANGUAGE_KEY, language); } catch (e) {}
  }

  function phoneLanguages() {
    if (navigator.languages && navigator.languages.length) return navigator.languages;
    return [navigator.language || ""];
  }

  function showLanguage(language) {
    var texts = window.TEXTS[language];
    document.documentElement.lang = language;
    document.title = texts.gameTitle;
    document.querySelectorAll("[data-text]").forEach(function (element) {
      element.textContent = texts[element.dataset.text];
    });
    document.querySelectorAll("[data-label]").forEach(function (element) {
      element.setAttribute("aria-label", texts[element.dataset.label]);
    });
    document.querySelectorAll(".language-option").forEach(function (option) {
      option.setAttribute("aria-pressed", String(option.dataset.language === language));
    });
  }

  function openSettings() {
    settingsPanel.hidden = false;
    settingsButton.setAttribute("aria-expanded", "true");
    var chosen = settingsPanel.querySelector('[aria-pressed="true"]');
    if (chosen) chosen.focus();
  }

  function closeSettings(returnFocus) {
    if (settingsPanel.hidden) return;
    settingsPanel.hidden = true;
    settingsButton.setAttribute("aria-expanded", "false");
    if (returnFocus) settingsButton.focus();
  }

  // Each language is named in its own language, so anyone can find theirs
  function buildLanguageOptions() {
    var holder = settingsPanel.querySelector(".language-options");
    LANGUAGES.forEach(function (language) {
      var option = document.createElement("button");
      option.type = "button";
      option.className = "language-option";
      option.lang = language;
      option.dataset.language = language;
      option.innerHTML = "<span></span>" + TICK;
      option.firstChild.textContent = window.TEXTS[language].languageName;
      option.addEventListener("click", function () {
        saveLanguage(language);
        showLanguage(language);
        closeSettings(true);
      });
      holder.appendChild(option);
    });
  }

  settingsButton.addEventListener("click", function () {
    if (settingsPanel.hidden) openSettings(); else closeSettings(false);
  });

  // Tapping anywhere else, or pressing Escape, closes the settings
  document.addEventListener("click", function (event) {
    if (!settingsPanel.contains(event.target) && !settingsButton.contains(event.target)) closeSettings(false);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeSettings(true);
  });

  // Shared so the language rule can be tested from the browser console.
  window.HoldUp = { pickLanguage: pickLanguage };

  buildLanguageOptions();
  showLanguage(pickLanguage(loadSavedLanguage(), phoneLanguages()));
})();
