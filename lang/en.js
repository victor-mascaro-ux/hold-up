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

  // Replying (after every verdict)
  replyToNina: "Reply to Nina",
  replyToJorge: "Reply to Grandpa",
  whatDoYouSay: "What do you say?",
  inGroup: "Reply in group",
  privatelyNina: "Message Nina privately",
  privatelyJorge: "Message Grandpa privately",
  send: "Send",
  privateChat: "Private chat",
  sharedInGroup: "{name} shared in the group:",
  ninaShort: "Nina",
  jorgeShort: "Grandpa",

  // How they took it
  reactionAccepts: "{name}: accepts",
  reactionStung: "{name}: accepts, but stung",
  reactionIgnores: "{name}: ignores you",
  reactionDigsIn: "{name}: digs in",
  ninaTrust: "Nina's trust in you: {n} of 100",
  jorgeTrust: "Grandpa's trust in you: {n} of 100",

  // Their answers. "Stop" answers follow a correction (after Stop or Needs
  // context); "Share" answers follow agreeing with the post (after Share).
  ninaStopAccepts: "omg you're right 😳 deleting it now. thanks for telling me!!",
  ninaStopStung: "ok. deleted.",
  ninaStopIgnores: "anyway who's bringing dessert on Sunday? 🍰",
  ninaStopDigsIn: "lol that's exactly what they want you to think. reposting 🙄",
  ninaShareAccepts: "yay thanks!! 🥰 told you 😌",
  ninaShareStung: "ok lol",
  ninaShareIgnores: "anyway who's bringing dessert on Sunday? 🍰",
  ninaShareDigsIn: "what's that supposed to mean 🙄",
  jorgeStopAccepts: "Oh! Thank you for telling me. I didn't know. I've deleted it 🙏",
  jorgeStopStung: "Ok. Deleted.",
  jorgeStopIgnores: "Is the barbecue still on for Sunday? 🍖",
  jorgeStopDigsIn: "I'm sharing it again. They don't want us to know this! 👍",
  jorgeShareAccepts: "Good! I knew it was worth sharing 👍",
  jorgeShareStung: "Ok.",
  jorgeShareIgnores: "Is the barbecue still on for Sunday? 🍖",
  jorgeShareDigsIn: "I don't understand you young people 🙄",

  // "Show the numbers": how R adds up, and trust before and after
  rLine: "R = {parts} = {total}",
  partProof: "proof {points} ({what})",
  partTrustBonus: "trust bonus {points}",
  namesTheTrick: "names the trick",
  namesNothing: "names nothing",
  wrongReason: "wrong reason",
  featureEmpathy: "empathy",
  featureSource: "source",
  featureJoke: "joke",
  featureShort: "short",
  featurePrivate: "private",
  featureTrueAlternative: "true alternative",
  featureQuestion: "question",
  trustLine: "Trust: {before} → {after} ({changes})",
  changeAccepts: "accepts",
  changeStung: "stung",
  changeIgnores: "ignores",
  changeDigsIn: "digs in",
  changeAcceptedInPrivate: "in private",
  changeWrongReason: "wrong reason",
  changeConfirmedTrue: "confirmed a true post",
  pointsReply: "Reply raised trust: {points}",
  replyPreview: "R {n} · {reaction}",

  // After the last post
  doneTitle: "That's all for today",
  doneScore: "{right} of {total} right",
  playAgain: "Play again",
};
