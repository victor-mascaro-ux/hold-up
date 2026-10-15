// Every Brazilian Portuguese text in the game. Its twin is lang/en.js: both
// files always have the same names on the left, with the text in their language.
// Words in {chaves} are filled in by the game.
window.TEXTS = window.TEXTS || {};

window.TEXTS["pt-BR"] = {
  // Game title, also the browser tab title
  gameTitle: "Peraí!",

  // Welcome screen, where the language is chosen once (it shows both languages)
  chooseLanguage: "Escolha seu idioma",
  languageName: "Português (Brasil)",

  // Settings, behind the button at the right of the chat header
  settings: "Configurações",
  startOver: "Recomeçar",

  // Test section of the settings card (for building and testing only)
  test: "Teste",
  jumpToPost: "Ir para o post",
  language: "Idioma",
  languageCode: "PT-BR",
  showNumbers: "Mostrar os números",
  on: "Ligado",
  off: "Desligado",

  // Score, at the top of the chat
  scoreChip: "{n} pts",
  score: "Pontuação: {n}",

  // Family chat
  familyGroupName: "Família Unida ❤️🙏",
  familyMembers: "Vô Jorge, Prima Nina, Mãe, Tia Rosa, você",
  messagesName: "Mensagens",

  // People: full name in the chat, whose post it is, and whose message
  nina: "Prima Nina",
  ninaPost: "Post da Nina",
  ninaMessage: "A mensagem da Nina",
  jorge: "Vô Jorge",
  jorgePost: "Post do Vô",
  jorgeMessage: "A mensagem do Vô",

  // Posts
  typing: "{name} está digitando…",
  forwarded: "Encaminhada",
  forwardedTimes: "Encaminhada {n} vezes",
  checkPost: "{post}: toque pra conferir",

  // Checking tools, in the tray that opens when you tap the post
  tapToCheck: "Toque no post pra conferir",
  closeTools: "Fechar as ferramentas",
  toolZoom: "Zoom",
  toolSource: "Ver a fonte",
  toolArticle: "Abrir a matéria",
  toolFree: "grátis",
  toolTicks: "+{n} tique",
  noArticle: "Não tem matéria pra abrir",
  zoomDate: "Data: {date}",
  ticksSoFar: "Tiques até agora: {n} ({points})",

  // Clues you can point at after Barrar or Falta contexto
  whatGaveItAway: "O que entregou?",
  thatsIt: "É isso",
  notSure: "Não sei",
  clueAddress: "O endereço do site",
  clueHeadline: "A manchete",
  cluePostText: "O texto do post",
  clueAlertText: "O texto do alerta",
  clueImage: "A imagem",
  clueDate: "A data",
  clueFinePrint: "As letras miúdas",
  clueSource: "Quem postou",
  clueParagraph: "A matéria, parágrafo {n}",

  // Pictures in posts, described for screen readers
  artGiftBox: "Imagem: uma caixa de presente e um vale-presente",
  artTvDoctor: "Imagem: um médico sorridente de jaleco, num estúdio de TV",
  artTvDoctorAvatar: "Foto de perfil: o médico, com um selo de verificado",
  artWineAndSneakers: "Imagem: uma taça de vinho tinto ao lado de um tênis",
  artCoinJar: "Imagem: um pote cheio de moedas",

  // Verdicts
  yourCall: "{post}: qual seu veredito?",
  share: "Compartilhar",
  stop: "Barrar",
  needsContext: "Falta contexto",

  // After a verdict
  right: "Acertou!",
  wrong: "Não foi dessa vez",
  theAnswer: "A resposta:",
  youPicked: "Você escolheu:",
  youSaid: "Você: {verdict}",
  proofFound: "Você achou o que entregou:",
  proofPointed: "Você apontou:",
  proofNone: "Você não apontou nada.",
  proofAnswer: "O que entregou:",
  pointsVerdict: "Veredito: {points}",
  pointsTicks: "Tiques: {n} × {each} = {points}",
  pointsPost: "Este post: {points}",
  next: "Próximo post",

  // Replying (after every verdict)
  replyToNina: "Responder a Nina",
  replyToJorge: "Responder ao Vô",
  whatDoYouSay: "O que você responde?",
  inGroup: "Responder no grupo",
  privatelyNina: "Chamar a Nina no privado",
  privatelyJorge: "Chamar o Vô no privado",
  send: "Enviar",
  privateChat: "Conversa privada",
  sharedInGroup: "{name} mandou no grupo:",
  ninaShort: "Nina",
  jorgeShort: "Vô",

  // How they took it
  reactionAccepts: "{name}: aceitou",
  reactionStung: "{name}: aceitou, mas não gostou",
  reactionIgnores: "{name}: ignorou você",
  reactionDigsIn: "{name}: bateu o pé",
  ninaTrust: "Confiança da Nina em você: {n} de 100",
  jorgeTrust: "Confiança do Vô em você: {n} de 100",

  // Their answers. "Stop" answers follow a correction (after Barrar or Falta
  // contexto); "Share" answers follow agreeing with the post (after Compartilhar).
  ninaStopAccepts: "mds você tem razão 😳 já apaguei. valeu por avisar!!",
  ninaStopStung: "tá. apaguei.",
  ninaStopIgnores: "enfim, quem leva a sobremesa domingo? 🍰",
  ninaStopDigsIn: "kkkk é exatamente isso que eles querem que você pense. vou repostar 🙄",
  ninaShareAccepts: "aaa valeu!! 🥰 eu falei 😌",
  ninaShareStung: "tá né kkk",
  ninaShareIgnores: "enfim, quem leva a sobremesa domingo? 🍰",
  ninaShareDigsIn: "qual é o problema? 🙄",
  jorgeStopAccepts: "Ah, obrigado por avisar! Eu não sabia. Já apaguei 🙏",
  jorgeStopStung: "Tá bom. Apaguei.",
  jorgeStopIgnores: "O churrasco de domingo tá de pé? 🍖",
  jorgeStopDigsIn: "Vou mandar de novo. Eles não querem que a gente saiba disso! 👍",
  jorgeShareAccepts: "Isso! Eu sabia que valia a pena mandar 👍",
  jorgeShareStung: "Tá.",
  jorgeShareIgnores: "O churrasco de domingo tá de pé? 🍖",
  jorgeShareDigsIn: "Não entendo vocês, jovens 🙄",

  // "Mostrar os números": how R adds up, and trust before and after
  rLine: "R = {parts} = {total}",
  partProof: "prova {points} ({what})",
  partTrustBonus: "bônus de confiança {points}",
  namesTheTrick: "nomeia o truque",
  namesNothing: "não nomeia nada",
  wrongReason: "motivo errado",
  featureEmpathy: "empatia",
  featureSource: "fonte",
  featureJoke: "piada",
  featureShort: "curta",
  featurePrivate: "no privado",
  featureTrueAlternative: "alternativa verdadeira",
  featureQuestion: "pergunta",
  trustLine: "Confiança: {before} → {after} ({changes})",
  changeAccepts: "aceitou",
  changeStung: "não gostou",
  changeIgnores: "ignorou",
  changeDigsIn: "bateu o pé",
  changeAcceptedInPrivate: "no privado",
  changeWrongReason: "motivo errado",
  changeConfirmedTrue: "confirmou um post verdadeiro",
  pointsReply: "A resposta aumentou a confiança: {points}",
  replyPreview: "R {n} · {reaction}",

  // After the last post
  doneTitle: "Por hoje é só",
  doneScore: "{right} de {total} certas",
  playAgain: "Jogar de novo",
};
