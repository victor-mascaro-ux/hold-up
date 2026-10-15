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
  showNumbers: "Show the numbers",
  on: "On",
  off: "Off",

  // Score, at the top of the chat
  scoreChip: "{n} pts",
  score: "Score: {n}",

  // Family chat
  familyGroupName: "Family 🙏 (NO politics!!)",
  familyMembers: "Grandpa Jorge, Cousin Nina, Mom, Aunt Rosa, you",
  messagesName: "Messages",

  // People: full name in the chat, whose post it is, and whose message
  nina: "Cousin Nina",
  ninaPost: "Nina's post",
  ninaMessage: "Nina's message",
  jorge: "Grandpa Jorge",
  jorgePost: "Grandpa's post",
  jorgeMessage: "Grandpa's message",

  // Posts
  typing: "{name} is typing…",
  forwarded: "Forwarded",
  forwardedTimes: "Forwarded {n} times",
  checkPost: "{post}: tap to check it",

  // Checking tools, in the tray that opens when you tap the post
  tapToCheck: "Tap the post to check it",
  closeTools: "Close the tools",
  toolZoom: "Zoom",
  toolSource: "Source card",
  toolArticle: "Open the article",
  toolFree: "free",
  toolTicks: "+{n} tick",
  noArticle: "No article to open",
  zoomDate: "Date: {date}",
  ticksSoFar: "Ticks so far: {n} ({points})",

  // Clues you can point at after Stop or Needs context
  whatGaveItAway: "What gave it away?",
  thatsIt: "That's it",
  notSure: "Not sure",
  clueAddress: "The web address",
  clueHeadline: "The headline",
  cluePostText: "The post's words",
  clueAlertText: "The alert's words",
  clueImage: "The picture",
  clueDate: "The date",
  clueFinePrint: "The fine print",
  clueSource: "Who posted it",
  clueParagraph: "The article, paragraph {n}",

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
  proofFound: "You found what gave it away:",
  proofPointed: "You pointed at:",
  proofNone: "You didn't point at anything.",
  proofAnswer: "What gave it away:",
  pointsVerdict: "Verdict: {points}",
  pointsTicks: "Ticks: {n} × {each} = {points}",
  pointsPost: "This post: {points}",
  next: "Next post",

  // After the last post
  doneTitle: "That's all for today",
  doneScore: "{right} of {total} right",
  playAgain: "Play again",
};
