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

  // Family chat
  familyGroupName: "Família Unida ❤️🙏",
  familyMembers: "Vô Jorge, Prima Nina, Mãe, Tia Rosa, você",
  messagesName: "Mensagens",

  // People: full name in the chat, and whose post it is in the panel
  nina: "Prima Nina",
  ninaPost: "Post da Nina",
  jorge: "Vô Jorge",
  jorgePost: "Post do Vô",

  // Posts
  typing: "{name} está digitando…",
  forwarded: "Encaminhada",

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
  next: "Próximo post",

  // After the last post
  doneTitle: "Por hoje é só",
  doneScore: "{right} de {total} certas",
  playAgain: "Jogar de novo",
};
