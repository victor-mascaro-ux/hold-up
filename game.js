// Hold Up! / Peraí! — the code behind the screen.
// Texts come from lang/en.js and lang/pt-BR.js; no player-facing text lives here.
(function () {
  var LANGUAGES = ["en", "pt-BR"];
  var SAVED_LANGUAGE_KEY = "holdup.language";

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
    document.querySelectorAll(".language-switch button").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.language === language));
    });
  }

  function buildLanguageSwitch() {
    var holder = document.querySelector(".language-switch");
    LANGUAGES.forEach(function (language) {
      var button = document.createElement("button");
      button.type = "button";
      button.lang = language;
      button.dataset.language = language;
      button.textContent = window.TEXTS[language].languageButton;
      button.addEventListener("click", function () {
        saveLanguage(language);
        showLanguage(language);
      });
      holder.appendChild(button);
    });
  }

  // Shared so the language rule can be tested from the browser console.
  window.HoldUp = { pickLanguage: pickLanguage };

  buildLanguageSwitch();
  showLanguage(pickLanguage(loadSavedLanguage(), phoneLanguages()));
})();
