// Every English text in the game. Its twin is lang/pt-BR.js: both files
// always have the same names on the left, with the text in their language.
// Words in {curly brackets} are filled in by the game.
window.TEXTS = window.TEXTS || {};

window.TEXTS["en"] = {
  // Game title, also the browser tab title
  gameTitle: "Hold Up!",

  // Welcome screen, where the language is chosen once (it shows both languages)
  chooseLanguage: "Choose your language",
  languageName: "English",

  // Settings, behind the button at the right of the chat header
  settings: "Settings",
  startOver: "Start over",

  // Test section of the settings card (for building and testing only)
  test: "Test",
  jumpToPost: "Jump to post",
  language: "Language",
  languageCode: "EN",

  // Family chat
  familyGroupName: "Family 🙏 (NO politics!!)",
  familyMembers: "Grandpa Jorge, Cousin Nina, Mom, Aunt Rosa, you",
  messagesName: "Messages",

  // People: full name in the chat, and whose post it is in the panel
  nina: "Cousin Nina",
  ninaPost: "Nina's post",
  jorge: "Grandpa Jorge",
  jorgePost: "Grandpa's post",

  // Posts
  typing: "{name} is typing…",
  forwarded: "Forwarded",

  // Pictures in posts, described for screen readers
  artGiftBox: "Picture: a gift box and a gift card",
  artTvDoctor: "Picture: a smiling doctor in a white coat, on a TV set",
  artTvDoctorAvatar: "Profile picture: the doctor, with a check mark",
  artWineAndSneakers: "Picture: a glass of red wine next to a sneaker",
  artCoinJar: "Picture: a jar full of coins",

  // Verdicts
  yourCall: "{post}: your call?",
  share: "Share",
  stop: "Stop",
  needsContext: "Needs context",

  // After a verdict
  right: "Right!",
  wrong: "Not quite",
  theAnswer: "The answer:",
  youPicked: "You picked:",
  youSaid: "You: {verdict}",
  next: "Next post",

  // After the last post
  doneTitle: "That's all for today",
  doneScore: "{right} of {total} right",
  playAgain: "Play again",
};
