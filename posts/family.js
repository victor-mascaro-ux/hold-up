// The Family chat's posts, in the record shape from the GDD's "Content rules
// and post format". Both languages live in the same record. Each language is
// written for its own players (Tallowbrook in English, Pouso Sereno in
// Portuguese), so names, places, money and details differ; the trick and the
// right answer never do.
//
// Every post is modelled on a famous real hoax from Brazil or the US (basedOn),
// but every outlet, person, brand and town in it is invented and the wording
// is our own, so the game never spreads the real thing.
//
// Fields added to the GDD's example:
//   severity   0-2, from the GDD's severity table (true posts have none)
//   decoys     what makes a true post look fake
//   text.*.message      what the sender writes in the chat
//   text.*.source       the site or account as that language's players see it
//   text.*.finePrint    small text that Zoom reveals
//   replies[].features  reply features from the GDD's trait weights table
//                       (empathy, source, joke, short, question, trueAlternative);
//                       "private" isn't here: it's the group/private switch
//   replies[].cites     the trick the reply names, or null if it names none
//   basedOn    the real hoax, with sources (for us, not shown to players)
//   factCheck  what was checked, and against what (for us, not shown to players)
window.POSTS = window.POSTS || [];

window.POSTS.push(
  // ---------------------------------------------------------------- 1
  {
    id: "family-01",
    chat: "family",
    sender: "nina",
    kind: "link",
    verdict: "stop",
    tricks: ["lookalike-address", "too-good-giveaway"],
    evidence: ["source.url", "finePrint"],
    severity: 2,
    source: { ageDays: 3 },
    image: { art: "gift-box" },
    date: "2026-10-15",
    text: {
      en: {
        message: "OMG Marlowe's is giving out $250 gift cards for their 50th anniversary!!! 😍😍 hurry before they run out",
        source: {
          name: "Marlowe's Market",
          url: "marlowes-market.shop",
          about: "Website created 3 days ago. Marlowe's real website is marlowesmarket.com, and it lists no giveaway."
        },
        headline: "Marlowe's Market turns 50! Claim your $250 gift card 🎁",
        article: [
          "To celebrate 50 years, Marlowe's Market is giving a $250 gift card to the first 500 customers. Only 37 left!",
          "Answer 3 quick questions, then share this page with 10 friends or 5 groups to unlock your card.",
          "Last step: enter your name, address and card number to pay $1.99 for shipping."
        ],
        finePrint: "This site is not affiliated with Marlowe's Market.",
        explain: "Zoom in on the address: it's marlowes-market.shop, not Marlowe's real site, marlowesmarket.com. Copycat sites borrow a store's name to look real. And a $250 gift card you unlock by sharing the link and paying for \"shipping\" is a classic scam: the sharing spreads it, the payment steals your card number."
      },
      "pt-BR": {
        message: "GENTE a Perfumaria Lírio tá dando kit de perfume de graça pelos 30 anos da loja 😍😍 corre que acaba",
        source: {
          name: "Perfumaria Lírio",
          url: "perfumarialirio-brindes.site",
          about: "Site criado há 3 dias. O site oficial da Perfumaria Lírio é perfumarialirio.com.br, e lá não tem brinde nenhum."
        },
        headline: "Perfumaria Lírio faz 30 anos e dá kits de presente! Resgate o seu 🎁",
        article: [
          "Pra comemorar 30 anos, a Perfumaria Lírio vai dar um kit de perfumes para os 500 primeiros clientes. Restam só 37!",
          "Responda 3 perguntinhas e compartilhe este link com 10 amigos ou 5 grupos pra liberar o seu kit.",
          "Último passo: informe nome, CPF e endereço e pague o frete de R$ 9,90 no Pix."
        ],
        finePrint: "Este site não tem vínculo com a Perfumaria Lírio.",
        explain: "Dá um zoom no endereço: é perfumarialirio-brindes.site, não o site oficial, perfumarialirio.com.br. Site cópia usa o nome da loja pra parecer de verdade. E kit grátis que só sai se você compartilhar o link e pagar \"frete\" no Pix é golpe clássico: o compartilhamento espalha o golpe, e o Pix e o CPF vão pro golpista."
      }
    },
    replies: [
      {
        features: ["empathy", "question", "source"],
        cites: "lookalike-address",
        en: "Haha I'd want $250 too 😅 but did you zoom in on the link? It says marlowes-market.shop, not marlowesmarket.com 👀",
        "pt-BR": "Kkkk eu também queria um kit 😅 mas você deu zoom no link? Tá escrito perfumarialirio-brindes.site, não perfumarialirio.com.br 👀"
      },
      {
        features: ["trueAlternative"],
        cites: null,
        en: "Don't type your card in there! Marlowe's real app does have 20% off produce this week, though 🛒",
        "pt-BR": "Não coloca seu CPF aí não! Mas o app oficial da Lírio tá com 20% de desconto essa semana 🛒"
      },
      {
        features: ["joke", "short"],
        cites: "lookalike-address",
        en: "Sure, and I get a free pony 🦄 That's not Marlowe's site",
        "pt-BR": "Claro, e eu ganhei um unicórnio 🦄 Esse site não é da Lírio"
      }
    ],
    basedOn: {
      summary: "Fake store \"anniversary\" giveaways that spread by making you share the link: Costco's \"$75 anniversary coupon\" on Facebook and its \"40th anniversary\" WhatsApp version (US, 2022), and free O Boticário perfume kits on WhatsApp (Brazil; the Federal Police warned about the Mother's Day one in 2020).",
      sources: [
        { title: "Costco: $75 'Anniversary' coupon on Facebook is a scam (WIFR)", url: "https://www.wifr.com/content/news/75-Costco-Anniversary-coupon-on-Facebook-is-a-scam-company-says-564819642.html" },
        { title: "Costco 40th anniversary scam targets WhatsApp users (ESET WeLiveSecurity, 2022)", url: "https://www.welivesecurity.com/2022/06/30/costco-40th-anniversary-scam-targets-whatsapp-users/" },
        { title: "Polícia Federal alerta para golpe do Dia das Mães (O Povo, 2020)", url: "https://www.opovo.com.br/noticias/tecnologia/2020/05/08/policia-federal-alerta-para-golpe-do-dia-das-maes--saiba-como-se-proteger.html" },
        { title: "WhatsApp: golpe com promoção de Dia das Mães envolve O Boticário (Oficina da Net)", url: "https://www.oficinadanet.com.br/aplicativos/22609-whatsapp-novo-golpe-com-promocao-para-o-dia-das-maes-envolve-o-boticario-" }
      ]
    },
    factCheck: [
      { claim: "These giveaways ask you to share the link with your contacts, then collect personal data or payment details.", finding: "Confirmed in both the Costco and O Boticário cases.", sources: ["https://www.welivesecurity.com/2022/06/30/costco-40th-anniversary-scam-targets-whatsapp-users/", "https://www.opovo.com.br/noticias/tecnologia/2020/05/08/policia-federal-alerta-para-golpe-do-dia-das-maes--saiba-como-se-proteger.html"] },
      { claim: "Names are invented: Marlowe's Market, Perfumaria Lírio.", finding: "Searched: no store with either exact name. A small \"Lírio dos Vales Perfumaria\" exists in Dormentes (PE), a different name.", sources: [] }
    ]
  },

  // ---------------------------------------------------------------- 2
  {
    id: "family-02",
    chat: "family",
    sender: "jorge",
    kind: "post",
    verdict: "stop",
    tricks: ["impersonated-account"],
    evidence: ["source.about"],
    severity: 2,
    source: { ageDays: 6, followers: 312, posts: 9 },
    image: { art: "tv-doctor", avatar: "tv-doctor-avatar" },
    date: "2026-10-15",
    text: {
      en: {
        message: "Dr. Holloway from TV!! He says these capsules end knee pain in 7 days. I'm ordering 2 boxes 👍",
        source: {
          name: "Dr. Ray Holloway ✔",
          url: "@dr.rayholloway.health",
          about: "Account created 6 days ago · 312 followers. The check mark is drawn into the profile picture; it isn't a real badge. All 9 posts are the same ad. The real Dr. Ray Holloway (@drrayholloway, 2.1M followers) has said he never sells products."
        },
        headline: "I'm retiring, so I'm sharing my secret: Kneevana capsules end joint pain in 7 days. The pharmacies don't want you to know! Only 50 boxes left 👇 kneevana-official.shop",
        finePrint: "",
        explain: "Tap the profile: this \"Dr. Holloway\" is a 6-day-old account with 312 followers, and its check mark is just part of the photo. Scammers copy famous doctors' faces, and now their voices with AI, to sell pills nobody has tested. A real doctor won't sell you a cure in an ad."
      },
      "pt-BR": {
        message: "Olha o Dr. Heitor Lessa da TV!! Ele disse que essa cápsula acaba com a dor no joelho em 7 dias. Vou encomendar 2 caixas 👍🙏",
        source: {
          name: "Dr. Heitor Lessa ✔",
          url: "@dr.heitorlessa.saude",
          about: "Conta criada há 6 dias · 312 seguidores. O selo de verificado é um desenho na foto de perfil, não é selo de verdade. Os 9 posts são o mesmo anúncio. O Dr. Heitor Lessa de verdade (@drheitorlessa, 3,4 mi de seguidores) já avisou que não vende produto nenhum."
        },
        headline: "Vou me aposentar e resolvi contar meu segredo: as cápsulas Joelhix acabam com a dor nas juntas em 7 dias. As farmácias não querem que você saiba! Últimas 50 caixas 👇 joelhix-oficial.shop",
        finePrint: "",
        explain: "Toca no perfil: esse \"Dr. Heitor\" é uma conta de 6 dias com 312 seguidores, e o selo é só um desenho na foto. Golpista copia o rosto, e agora até a voz com IA, de médico famoso pra vender cápsula sem registro na Anvisa. Médico de verdade não vende cura em anúncio."
      }
    },
    replies: [
      {
        features: ["empathy", "source"],
        cites: "impersonated-account",
        en: "I know your knee has been bothering you, Grandpa ❤️ But tap the profile: the account is 6 days old and the check mark is just part of the photo. The real Dr. Holloway doesn't sell pills.",
        "pt-BR": "Vô, sei que o joelho do senhor tá incomodando ❤️ Mas toca no perfil: a conta tem 6 dias e o selo é só um desenho na foto. O Dr. Heitor de verdade não vende remédio."
      },
      {
        features: ["short"],
        cites: "impersonated-account",
        en: "That account is fake, Grandpa. Please don't buy it.",
        "pt-BR": "Vô, essa conta é falsa. Não compra, por favor."
      },
      {
        features: ["joke", "short"],
        cites: null,
        en: "Grandpa, with pills that good you'd run marathons 😂🏃",
        "pt-BR": "Vô, com uma cápsula dessas o senhor corria a São Silvestre 😂🏃"
      }
    ],
    basedOn: {
      summary: "Fake ads that use famous doctors' faces, and AI-cloned voices, to sell unapproved pills: Drauzio Varella in Brazil (Meta sued the scammers in March 2026; Santa Catarina prosecutors raided a ring in April 2026; he says he never advertises products) and deepfaked physicians selling supplements in the US (American Medical Association warning, 2026).",
      sources: [
        { title: "Meta processa golpistas por deepfake de Drauzio Varella e outros famosos (Tecnoblog)", url: "https://tecnoblog.net/noticias/meta-processa-golpistas-por-uso-de-videos-falsos-de-celebridades/" },
        { title: "AI deepfakes used to impersonate a doctor and promote illegal medicines in Brazil (OECD AI incidents, Apr 2026)", url: "https://oecd.ai/en/incidents/2026-04-22-dd21" },
        { title: "Deepfake doctors scam: AMA warning (STAT, Feb 2026)", url: "https://www.statnews.com/2026/02/17/deepfake-doctors-scam-ama/" },
        { title: "AI deepfake doctors scam (AARP, The Perfect Scam)", url: "https://www.aarp.org/podcasts/the-perfect-scam/ai-deepfake-doctors-scam/" }
      ]
    },
    factCheck: [
      { claim: "Scammers copy famous doctors' faces, and voices with AI, to sell untested pills.", finding: "Confirmed in Brazil (Drauzio Varella) and the US (AMA warning).", sources: ["https://www.statnews.com/2026/02/17/deepfake-doctors-scam-ama/", "https://tecnoblog.net/noticias/meta-processa-golpistas-por-uso-de-videos-falsos-de-celebridades/"] },
      { claim: "PT-BR: the pills have no Anvisa registration.", finding: "Matches the real Brazilian cases (medicines without Anvisa registration).", sources: ["https://oecd.ai/en/incidents/2026-04-22-dd21"] },
      { claim: "Names are invented: Dr. Ray Holloway, Dr. Heitor Lessa, Kneevana, Joelhix.", finding: "Searched: no TV doctor or product with these names. \"Holloway\" doctors exist only as characters in other TV shows; real doctors named Lessa aren't public figures.", sources: [] }
    ]
  },

  // ---------------------------------------------------------------- 3
  {
    id: "family-03",
    chat: "family",
    sender: "jorge",
    kind: "link",
    verdict: "needs-context",
    tricks: ["headline-overstates"],
    evidence: ["article.p3"],
    severity: 1,
    source: { ageDays: 9000 },
    image: { art: "wine-and-sneakers" },
    date: "2026-10-15",
    text: {
      en: {
        message: "Finally some good science! 🍷 No more walks for me 😄",
        source: {
          name: "The Tallowbrook Ledger",
          url: "tallowbrookledger.com",
          about: "Tallowbrook's local newspaper since 1921. The web address matches the one printed in the paper."
        },
        headline: "Study: a glass of red wine is as good as an hour at the gym",
        article: [
          "Good news for wine lovers? Researchers at Northvale University found that resveratrol, a compound in grape skins, made hearts and muscles stronger.",
          "The team gave the compound to 24 rats on a 12-week treadmill program. The rats that got it ran longer than the ones that didn't.",
          "\"We didn't study wine, and we didn't study people,\" said lead researcher Dr. Maya Okafor. \"You'd need to drink hundreds of bottles a day to get this dose, and the rats still exercised.\""
        ],
        finePrint: "",
        explain: "The study is real, but it didn't find what the headline says. Open the article: the researchers gave one compound to rats that also exercised. They didn't test wine, or people, and you'd need hundreds of bottles a day to get that dose. Real news, misleading on its own: it needs context."
      },
      "pt-BR": {
        message: "Até que enfim uma ciência boa! 🍷 Vou largar a caminhada 😄",
        source: {
          name: "Gazeta Serena",
          url: "gazetaserena.com.br",
          about: "Jornal de Pouso Sereno desde 1948. O endereço do site é o mesmo que vem impresso no jornal."
        },
        headline: "Estudo: uma taça de vinho tinto vale por uma hora de academia",
        article: [
          "Boa notícia pra quem gosta de vinho? Pesquisadores da Universidade Estadual do Vale do Sereno descobriram que o resveratrol, uma substância da casca da uva, deixou o coração e os músculos mais fortes.",
          "A equipe deu a substância para 24 ratos que faziam esteira por 12 semanas. Os que receberam correram mais do que os outros.",
          "\"Não estudamos vinho e não estudamos pessoas\", disse a pesquisadora responsável, Dra. Marta Quintela. \"Pra chegar nessa dose, seria preciso beber centenas de garrafas por dia, e os ratos continuaram se exercitando.\""
        ],
        finePrint: "",
        explain: "O estudo existe, mas não descobriu o que a manchete diz. Abre a matéria: os pesquisadores deram uma substância pra ratos que também faziam exercício. Não testaram vinho, nem gente, e pra chegar nessa dose seriam centenas de garrafas por dia. Notícia real, mas enganosa sozinha: precisa de contexto."
      }
    },
    replies: [
      {
        features: ["empathy", "source"],
        cites: "headline-overstates",
        en: "I wish, Grandpa! 🍷 But read the end: they gave one compound to rats, not wine to people. You'd need hundreds of bottles a day to get that dose. Our Sunday walk stays!",
        "pt-BR": "Quem dera, vô! 🍷 Mas lê o finalzinho: deram uma substância pra ratos, não vinho pra gente. Pra chegar nessa dose, seriam centenas de garrafas por dia. A caminhada de domingo continua!"
      },
      {
        features: ["trueAlternative"],
        cites: null,
        en: "Want something real to share, Grandpa? A daily walk really is good for the heart 🚶‍♂️❤️",
        "pt-BR": "Quer algo bom pra compartilhar, vô? Caminhar todo dia faz bem de verdade pro coração 🚶‍♂️❤️"
      },
      {
        features: ["joke", "short"],
        cites: "headline-overstates",
        en: "Grandpa, the rats still had to hit the gym 🐀🏋️",
        "pt-BR": "Vô, os ratos continuaram indo pra academia 🐀🏋️"
      }
    ],
    basedOn: {
      summary: "\"A glass of red wine is as good as an hour at the gym\", viral in 2015 in the US, the UK and Brazil. It came from a 2012 University of Alberta study that gave resveratrol to rats that also exercised. The lead researcher said they didn't study wine or people, and that you'd need hundreds of bottles a day to get the dose.",
      sources: [
        { title: "Don't cancel that gym membership just yet (Nutrition Over Easy, 2015)", url: "https://nutritionovereasy.com/2015/12/dont-cancel-that-gym-membership-just-yet/" },
        { title: "Could a glass of red wine be equivalent to an hour at the gym? (Women's Brain Health Initiative)", url: "https://womensbrainhealth.org/think-tank/wishful-thinking/could-a-glass-of-red-wine-be-equivalent-to-an-hour-at-the-gym" },
        { title: "University of Alberta student paper on the researcher's clarification (The Gateway)", url: "https://www.thegatewayonline.ca/?p=4322" }
      ]
    },
    factCheck: [
      { claim: "You'd need hundreds of bottles a day to get the study's dose; the rats also exercised; no wine or people were studied.", finding: "Confirmed: the lead researcher said \"hundreds of bottles\" (other estimates say 100 to 1,000), and the rats did a 12-week training program.", sources: ["https://nutritionovereasy.com/2015/12/dont-cancel-that-gym-membership-just-yet/", "https://www.thegatewayonline.ca/?p=4322"] },
      { claim: "Reply: a daily walk is good for the heart.", finding: "Confirmed: WHO recommends 150+ minutes of moderate activity a week, walking included; a 2024 Lancet study links walking about 30 minutes most days with less heart disease.", sources: ["https://www.paho.org/en/news/26-11-2020-every-move-counts-towards-better-health-says-who", "https://world-heart-federation.org/wp-content/uploads/2016/04/Walking___Heart_Booklet_-_English_-_FINAL.pdf"] },
      { claim: "Names are invented: The Tallowbrook Ledger, Gazeta Serena, Northvale University, Universidade Estadual do Vale do Sereno, Dr. Maya Okafor, Dra. Marta Quintela.", finding: "Searched the outlets, towns and Northvale University: none exist. Tallowbrook and Pouso Sereno aren't real towns.", sources: [] }
    ]
  },

  // ---------------------------------------------------------------- 4
  {
    id: "family-04",
    chat: "family",
    sender: "nina",
    kind: "alert",
    verdict: "share",
    tricks: [],
    decoys: ["all-caps", "urgency"],
    evidence: [],
    source: { ageDays: 5400 },
    image: null,
    date: "2026-10-15",
    text: {
      en: {
        message: "GUYS bring the laundry in!!! 😱🌧️",
        source: {
          name: "Tallowbrook County Emergency Alerts",
          url: "tallowbrookcounty.gov/alerts",
          about: "The county's official alert service. The link goes to tallowbrookcounty.gov, the county's own website, which shows the same warning."
        },
        headline: "SEVERE THUNDERSTORM WARNING until 9 PM. Hail and winds up to 60 mph. Stay indoors and away from windows. Bring in loose outdoor items. More: tallowbrookcounty.gov/alerts",
        finePrint: "Sent by Tallowbrook County Emergency Management · 4:12 PM",
        explain: "It's all in caps and sounds scary, just like the fake alerts that go around, but this one is real: it came from the county's official alert service, and the county's own website, tallowbrookcounty.gov, shows the same warning. Scary-looking isn't the same as fake. And when a real warning says stay indoors, do it while you check."
      },
      "pt-BR": {
        message: "GENTE tirem a roupa do varal!!! 😱🌧️",
        source: {
          name: "Defesa Civil (40199)",
          url: "pousosereno.mg.gov.br/defesacivil",
          about: "Mensagem do número oficial da Defesa Civil, o 40199, que manda alerta por SMS pra quem cadastra o CEP. O site da prefeitura, pousosereno.mg.gov.br, mostra o mesmo aviso."
        },
        headline: "DEFESA CIVIL: ALERTA SEVERO DE TEMPESTADE em Pouso Sereno até 21h. Granizo e ventos de até 90 km/h. Fique em local seguro, longe de janelas e árvores. Recolha objetos soltos. Mais: pousosereno.mg.gov.br/defesacivil",
        finePrint: "SMS de 40199 · 16:12",
        explain: "Tá tudo em maiúscula e parece assustador, igual aos alertas falsos que circulam por aí, mas este é de verdade: veio do número oficial da Defesa Civil, o 40199, e o site da prefeitura mostra o mesmo aviso. Parecer assustador não é o mesmo que ser falso. E quando um alerta de verdade manda ficar em local seguro, fique, enquanto confere."
      }
    },
    replies: [
      {
        features: ["empathy", "source"],
        cites: null,
        en: "Thanks for the heads-up, Nina! 🙏 I checked: it's on the county's website too. Bringing everything in!",
        "pt-BR": "Valeu pelo aviso, Nina! 🙏 Conferi: tá no site da prefeitura também. Vou recolher tudo!"
      },
      {
        features: ["short"],
        cites: "urgency-outrage",
        en: "Relax, it's one of those fake alerts. Way too many caps 🙄",
        "pt-BR": "Calma, é um daqueles alertas falsos. Quanta letra maiúscula 🙄"
      },
      {
        features: ["question", "short"],
        cites: null,
        en: "Is it on the county's website too?",
        "pt-BR": "Tá no site da prefeitura também?"
      }
    ],
    basedOn: {
      summary: "Fake alerts and disaster rumours that look just like this real one. Brazil: a dam-burst rumour that led the Army to evacuate a Canoas neighbourhood during the 2024 floods, a fake Ervália dam alert (2022), and hacked Defesa Civil alerts about an \"alien attack\" (2026). US: fake tornado warnings posted by people posing as officials (Butler County, Pennsylvania). This post is the real thing, so players learn to check instead of judging by looks.",
      sources: [
        { title: "Como um boato fez o Exército gerar pânico em Canoas (Aos Fatos)", url: "https://www.aosfatos.org/noticias/boato-barragem-exercito-canoas/" },
        { title: "Moradores de BH recebem alerta de 'ataque alienígena' da Defesa Civil (Folha Vitória)", url: "https://www.folhavitoria.com.br/cotidiano/moradores-de-belo-horizonte-recebem-alerta-de-ataque-alienigena-da-defesa-civil/" },
        { title: "Fake Facebook tornado warning leaves Butler County officials upset (CBS Pittsburgh)", url: "https://www.cbsnews.com/amp/pittsburgh/news/fake-tornado-warning-has-butler-county-officials-upset" }
      ]
    },
    factCheck: [
      { claim: "PT-BR: Brazil's Defesa Civil sends free SMS alerts from 40199 to anyone who registers their CEP.", finding: "Confirmed.", sources: ["https://estado.rs.gov.br/como-se-cadastrar-para-receber-avisos-e-alertas-da-defesa-civil-no-celular", "https://carioca.rio/servicos/informacoes-sobre-as-mensagens-de-alerta-da-defesa-civil/"] },
      { claim: "Stay indoors and away from windows; bring in loose outdoor items. A severe thunderstorm means hail of 1 inch or winds of 58 mph or more (60 mph / 90 km/h in the alert fits).", finding: "Confirmed by National Weather Service thunderstorm safety guidance.", sources: ["https://www.weather.gov/media/safety/Thunderstorm-brochure17.pdf"] }
    ]
  },

  // ---------------------------------------------------------------- 5
  {
    id: "family-05",
    chat: "family",
    sender: "jorge",
    kind: "link",
    verdict: "share",
    tricks: [],
    decoys: ["too-good-to-be-true"],
    evidence: [],
    source: { ageDays: 7300 },
    image: { art: "coin-jar" },
    date: "2026-10-15",
    text: {
      en: {
        message: "Everyone search your name here!! The county is holding money that belongs to people. I found $86 from my old water deposit 😮",
        source: {
          name: "Tallowbrook County Treasurer",
          url: "tallowbrookcounty.gov/unclaimed",
          about: "The county's official website. Searching and claiming are free, and the page says the county will never call, text or ask for a fee."
        },
        headline: "Unclaimed money: search your name for free",
        article: [
          "Tallowbrook County is holding $3.2 million in unclaimed money: old deposits, refunds and uncashed checks.",
          "Search your name on this site. Claiming is always free and takes about 10 minutes.",
          "The county will never call, text or ask you to pay a fee. If someone does, it's a scam."
        ],
        finePrint: "Tallowbrook County Treasurer · tallowbrookcounty.gov",
        explain: "Free money sounds like a scam, and fake versions of pages like this do go around, but this one is real: the address is tallowbrookcounty.gov, the county's own website, and it never asks for a fee. Real unclaimed-money searches are free; the fake ones ask you to pay to \"release\" your money."
      },
      "pt-BR": {
        message: "Gente, procurem o nome de vocês aqui!! A prefeitura tem dinheiro esquecido do povo. Achei R$ 86 de um IPTU que paguei em dobro 😮",
        source: {
          name: "Prefeitura de Pouso Sereno",
          url: "pousosereno.mg.gov.br/valores",
          about: "Site oficial da prefeitura (termina em .gov.br). A consulta é gratuita, e a página avisa que a prefeitura não manda link por WhatsApp nem cobra taxa."
        },
        headline: "Valores esquecidos: consulte seu CPF de graça",
        article: [
          "A Prefeitura de Pouso Sereno tem R$ 3,2 milhões em valores esquecidos: IPTU pago em dobro, cauções e restituições.",
          "Consulte pelo CPF neste site. O resgate é sempre gratuito e o dinheiro cai na sua conta em até 15 dias.",
          "A prefeitura não manda link por WhatsApp ou SMS e nunca cobra taxa. Se alguém cobrar, é golpe."
        ],
        finePrint: "Prefeitura Municipal de Pouso Sereno · pousosereno.mg.gov.br",
        explain: "Dinheiro de graça tem cara de golpe, e versões falsas de páginas assim circulam por aí, mas esta é de verdade: o endereço é pousosereno.mg.gov.br, o site oficial da prefeitura, e não pede taxa nenhuma. Consulta de valores esquecidos de verdade é gratuita; a falsa pede Pix pra \"liberar\" o dinheiro."
      }
    },
    replies: [
      {
        features: ["source"],
        cites: null,
        en: "Nice find, Grandpa! 🙌 I checked: it's the county's real website, and it never asks for a fee. I'm searching my name too.",
        "pt-BR": "Boa, vô! 🙌 Conferi: é o site oficial da prefeitura e não cobra nada. Vou consultar meu CPF também."
      },
      {
        features: ["short"],
        cites: "too-good-giveaway",
        en: "Grandpa, free money is always a scam 🙄",
        "pt-BR": "Vô, dinheiro de graça é sempre golpe 🙄"
      },
      {
        features: ["question", "short"],
        cites: null,
        en: "Is it on the county's own site, Grandpa? Then it's real 👍",
        "pt-BR": "Tá no site da prefeitura, vô? Então é verdade 👍"
      }
    ],
    basedOn: {
      summary: "Real \"forgotten money\" programs that scammers copy. Brazil: the Central Bank's \"Valores a Receber\" (fake sites ask for your CPF and a Pix \"fee\"; the Central Bank says it never sends links). US: state unclaimed-property searches, which are free (state treasurers warn about fakes that charge a fee). This post is the real thing.",
      sources: [
        { title: "Banco Central alerta para golpes relativos a valores a receber (IstoÉ Dinheiro, 2023)", url: "https://istoedinheiro.com.br/banco-central-alerta-para-golpes-relativos-a-valores-a-receber" },
        { title: "Golpe: Banco Central faz alerta sobre resgate de valores esquecidos (Bem Paraná)", url: "https://www.bemparana.com.br/noticias/golpe-banco-central-faz-alerta-de-golpistas-que-prometem-resgate-de-valores-esquecidos/amp/" },
        { title: "National Association of State Treasurers warns of fraudulent unclaimed property contacts (Utah State Treasurer)", url: "https://treasurer.utah.gov/featured-news/national-association-of-state-treasurers-warns-public-of-fraudulent-unclaimed-property-contact-attempts/" }
      ]
    },
    factCheck: [
      { claim: "Official forgotten-money searches are free, and being asked for a fee is the sign of a scam.", finding: "Confirmed for the US (state treasurers, NAST/NAUPA) and Brazil (Central Bank).", sources: ["https://treasurer.utah.gov/featured-news/national-association-of-state-treasurers-warns-public-of-fraudulent-unclaimed-property-contact-attempts/", "https://istoedinheiro.com.br/banco-central-alerta-para-golpes-relativos-a-valores-a-receber"] },
      { claim: "PT-BR: the city hall's \"valores esquecidos\" page is invented.", finding: "Modelled on the Central Bank's real program; city halls do refund IPTU paid twice. Pouso Sereno isn't a real town, so its .gov.br address doesn't exist.", sources: [] }
    ]
  }
);
