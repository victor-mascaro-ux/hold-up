# Hold Up! / Peraí! — Game Design Document (GDD)

Oct 15, 2026 · @Victor Mascaro

# Pitch

You're the one person in the group chat who checks things before everyone believes them. Posts land in your family, school, work and friends chats. You inspect each one and pick a verdict: **Share**, **Stop** or **Needs context**.

- **Share **means it's true;
- **Stop **means it's false or a scam;
- **Needs context** means it's real but misleading on its own** (**like an old photo with a new caption).

Then you point to what gave it away and reply in a way that keeps people listening.

- **Title:** 🇺🇸 Hold Up! / 🇧🇷 Peraí!
- **Audience:** anyone who reads a group chat, from roughly age 10 to grandparents
- **Languages:** English and Brazilian Portuguese at launch, with content written for each, not just translated
- **Platform:** mobile first, also playable on desktop; a static web game built with Claude Code and hosted on GitHub Pages
- **Session length:** one in-game day takes 3 to 5 minutes, plus a Daily 5 challenge
- **Success:** players get better at telling true from false, and also at telling people kindly when something is fake.

# Design pillars

Every feature has to serve at least one of these five rules.

1. **Discernment, not doubt.**
   - About half the posts are true.
   - Blocking a true post costs as much as sharing a false one.
   - This is not a game that teaches people to distrust everything.
2. **Checking is the gameplay.**
   - Inspecting the post is the core action, not a quiz between levels.
3. **Show the evidence.**
   - A verdict only earns full points when you point at what gave it away.
   - Guessing right is not enough.
4. **Kindness keeps people listening.**
   - Being right and being heard are different skills, and the reply matters as much as the verdict.
5. **It works on a real phone.**
   - The screen looks like a familiar chat app, so the checking habit carries over to real life.
   - Every tool is something you can also do on a real phone, like zooming in on a link or checking who posted it.

# Setting and cast

The whole game happens inside your phone. The home screen is a list of group chats, and each chat is a chapter with its own people, topics and reply challenge. Names are chosen to work in both languages.

| Chat (EN / PT-BR) | Group name in the game (EN / PT-BR) | Who's in it | Typical posts | Reply challenge |
| --- | --- | --- | --- | --- |
| Family / Família | Family 🙏 (NO politics!!) / Família Unida ❤️🙏 | Cousin Nina (Prima Nina), 16, forwards every trend and AI image; Grandpa Jorge (Vô Jorge) trusts anything with a doctor in it. Mom (Mãe), Aunt Rosa (Tia Rosa) and the others react to your replies and take sides | Miracle cures, scam alerts, "share before they delete this" | Correcting elders without embarrassing them |
| Friends / Amigos | Bad Decisions Club 🍕 / Os Sem Noção 🤪 | Leo, the group's joker; Duda, who never misses a deal | Too-good giveaways, viral videos, outrage stories | Being honest without killing the mood |
| School / Escola | 8B Official 📚 (⚠️ teacher is here, behave) / 8º B Oficial 📚 (⚠️ prof no grupo!) | Bia, a classmate who chases every trend; Prof. Clara, the teacher | Fake school announcements, viral challenges, AI images, satire | Not sounding like a know-it-all in front of peers |
| Work / Trabalho | Team Sync 🚀 (work stuff ONLY) / Equipe 🚀 (só assuntos de trabalho) | Sr. Paulo, your manager; Rafa, the office gossip | Fake company memos, salary rumors, phishing links, misleading charts | Disagreeing with your boss politely, or with your peers without embarrassing them |

Rumors can jump between chats. Stop one in Family and it never reaches Work; miss it and it shows up there two days later, harder to undo.

# Core loop

*Core loop diagram, in words:* A post arrives → Inspect with tools (each check lets it spread) → Verdict? (false = Stop or Needs context; true = Share) → Point to evidence → Choose your reply → See the outcome (spread and trust) → next post.

- A **wrong verdict** never ends the game: the outcome shows what it cost, then the next post arrives.
- A **true post **marked **Share** skips the evidence step but still gets a reply.
- After the day's last post, you wake up the next morning to the consequences of your choices.

# Checking tools

Each tool mirrors a move anyone can make on a real phone, and each one costs time. While you check, the post keeps being forwarded and a spread counter ticks up.

- Quick and right beats slow and right
- Slow and right beats fast and wrong.

The tools teach what professional fact-checkers call lateral reading: leave the post and see what other sources say about it.

| Tool | What it reveals | On a real phone | Cost (to tune) |
| --- | --- | --- | --- |
| Zoom | Small details: the web address, the date, the fine print | Pinch to zoom on the post or screenshot | Free |
| Source card | Who posted it, account age, what else it posts, whether it is satire | Tap the profile or search the site's name | 1 tick |
| Open the article | Whether the article supports the headline | Tap through before sharing | 1 tick |
| Chart inspector | The full axis and the full date range | Read the axis labels and dates | 1 tick |
| Image trace | Where and when the photo first appeared | Reverse image search | 2 ticks |
| Other coverage | Whether anyone else reports the story | Search the claim in a news search | 2 ticks |
| Call back | Whether the person really sent that voice note or message | Call them on the number you already have | 2 ticks |

New tools unlock as the chapters introduce new tricks (see Progression).

# Answering back

The verdict is about the facts; the reply is about the person.

After each verdict you choose how to answer, and every recurring character has a trust meter.

- High trust means they start checking with you before they forward things.
- Low trust means they ignore you, or forward the hoax again just to prove a point.
- Every reply gets a reception score R.
- R sets how the person reacts, and the reaction moves trust and changes how fast the post spreads.
- All numbers are starting values to tune in playtests.

*Reply model diagram, in words:* One reply moves two things: trust now and spread until morning. Your reply (where you send it, its tone and the source you found) → 1 · Reception score R (evidence + this person's taste + trust bonus) → 2 · Reaction (accepts, stung, ignores or digs in). The reaction changes trust, per person, which feeds the next R. It also sets virality v (how fast the post keeps going) → 3 · Spread S (multiplies by 1 + v every tick until someone stops it) → 4 · Harm H (severity × how many people saw it, at the end of the day) → Morning after (bigger harm, worse event).

- The reaction is the hinge.
  - It changes the person's trust right away, which shapes how your next reply to them lands.
  - It also sets the post's virality, which drives spread and, by morning, harm.

## **(R) Reception score**

```latex
R = E + \sum_k w_{p,k} \, x_{r,k} + T + J
```

- **E = evidence**
  - +2 if the reply names the trick you actually found;
  - 0 if it cites nothing;
  - −3 if it cites the wrong reason.
- **x = reply features**
  - 1 if the reply has that feature, 0 if not;
  - The features are the column names in the Trait weights table below.
- **w = trait weights**
  - how much person p likes or hates each feature;
  - Hidden from the player and revealed through reactions.
- **T = trust bonus**
  - From −2 (trust 0) to +2 (trust 100);
  - **A** small bonus or penalty on R (people who trust you accept imperfect replies more easily):

* **J = roast bonus**
  - A bonus or penalty that only applies when your reply is a roast: it depends on how well the person takes a joke and how absurd and harmful the hoax is (see Roasts).

### **(w) Trait weights**

Each row is a person, and each column shows how much they like (+) or dislike (−) that reply feature.

A reply scores the sum of the weights for the features it has.

- Example: a short joke sent to Leo has joke = 1 and short = 1, so it gets +3 + 2 = +5 from this table.

| Person (PT-BR / EN) | Group | Empathy | Source | Joke | Short | Private | True alternative | Question | Joke receptivity ρ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Prima Nina / Cousin Nina | Family | +2 | 0 | +1 | 0 | +1 | 0 | +2 | 2 |
| Vô Jorge / Grandpa George | Family | 0 | +2 | −2 | 0 | +2 | 0 | 0 | 1 |
| Leo / Leo | Friends | −1 | 0 | +3 | +2 | 0 | 0 | 0 | 2 |
| Duda / Dee | Friends | +2 | +1 | 0 | 0 | 0 | +3 | 0 | 1 |
| Bia / Bea | School | 0 | 0 | +1 | +1 | 0 | 0 | +3 | 0 |
| Prof. Clara / Ms. Clara | School | +1 | +3 | −1 | 0 | +1 | 0 | −1 | 0 |
| Sr. Paulo / Mr. Paul | Work | 0 | +2 | −1 | +2 | +2 | 0 | 0 | 0 |
| Rafa / Ray | Work | +1 | −1 | +2 | 0 | 0 | 0 | +2 | 2 |

What each reply feature means:

| Feature | The reply... | Example line |
| --- | --- | --- |
| Empathy | Opens by showing you understand why they shared it | "I know you shared it to protect us" |
| Source | Links the evidence your tools found | "Here's the original photo, from 2019" |
| Joke | Uses light humor, not at their expense | "Sadly, sharks still can't drive" |
| Short | Is two lines or less | "Fake, sorry! Here's why: \[link\]" |
| Private | Goes as a private message, not in the group | (sent only to the person) |
| True alternative | Offers something real they can share instead | "That voucher is fake, but this store really has 30% off this week" |
| Question | Asks something that lets them find the answer themselves | "Where did this come from? The site's name looks odd" |

Joke receptivity ρ is not a reply feature; it's how well the person takes a roast (see J).

### **(T) Trust**

A small bonus on Receptivity (R) = the more the person trusts you, more receptive they are.

```latex
T = \mathrm{round}\left(\frac{\mathrm{trust} - 50}{25}\right)
```

| Trust | Bonus T |
| --- | --- |
| 0–12 | −2 |
| 13–37 | −1 |
| 38–62 | 0 |
| 63–87 | +1 |
| 88–100 | +2 |

Your reply's score R decides how the person reacts, and each reaction changes their trust in you and how far the post spreads:

| R | Reaction | What they do | Trust change | Spread |
| --- | --- | --- | --- | --- |
| 4 or more | Accepts | Deletes the post and thanks you | +10 | Stops |
| 2 to 3 | Accepts, but stung | Deletes the post with a cold "ok" | −5 | Stops |
| −3 to 1 | Ignores | Leaves the post up | 0 | Keeps going |
| Below −3 | Digs in | Reposts it with "they don't want you to know this!" | −10 | Same if you replied publicly, faster if privately |

Digging in is rare on purpose: research finds that corrections rarely backfire. Roasts are the exception, since a roast backfires at any R below 0 (see Roasts).

Some actions change trust on top of the reaction:

| Action | Extra trust change |
| --- | --- |
| Roast lands (R 4 or more) | +10 with everyone else in the group |
| Roast backfires (R below 0) | −15 with the poster, −5 with everyone else |
| Citing a wrong reason | −10 |
| Confirming a true post | +5 |
| They accepted in private (you saved their face) | +5 |

Trust stays between 0 and 100.

Trust also prevents problems before they start.

- Before forwarding a post to the group, a person may first message you privately: "Is this real?"
- The higher their trust, the more often they ask.
- Chance they ask you first:

  ```latex
  P(\text{ask first}) = \frac{\text{trust}}{100}
  ```
  - At trust 30 they ask 3 times out of 10, and at trust 80, 8 times out of 10.

### (J) Roasts: receptivity × absurdity

The player can choose to roast the post. A roast laughs at the hoax (not the person).

```latex
J = x_{r,\text{roast}} \, (\rho_p \, a - 2s - 2)
```

- **x\_roast = is it a roast?**
  - 1 if the reply you picked is a roast, 0 if not;
  - It works like the other reply features, so J is 0 for every reply that isn't a roast.
- **ρ = joke receptivity**
  - how well this person takes a joke about their own post;
  - 0, 1 or 2 (last column of the Trait weights table).
- **a = absurdity**
  - how absurd the hoax is;

  | a | Level | Example hoax |
  | --- | --- | --- |
  | 0 | Ordinary | "The bakery on Main Street is closing next month" (it isn't) |
  | 1 | Odd | "Your phone charges twice as fast if you keep it in the freezer" |
  | 2 | Absurd | "A shark was spotted swimming down the flooded highway" |
- **s = severity**
  - how much harm the hoax can do; a hoax can be absurd and dangerous at once, so danger is its own term

  | s | Level | Example hoax |
  | --- | --- | --- |
  | 0 | Harmless | "A famous singer is moving to our town" |
  | 1 | Harmful (health or money) | "Warm lemon water every morning cures the flu" |
  | 2 | Dangerous (scams) | "Your bank account is blocked, confirm your password here" |
- **−2, the sting**
  - being laughed at always hurts a little;
  - only receptivity × absurdity can outweigh it.
- **p, r, k = indexes**
  - p = the person who posted;
  - r = your reply;
  - k = runs over every reply feature (Σ adds them all up).

The perfect moment has two signs:

1. **The hoax is absurd,** and the stakes are low
   - Danger doesn't rule a roast out, but it costs 2s.
   - An absurd health hoax ("drink bleach to cure the flu") still lands with Leo (R = 4), but not with Vô Jorge (J = 1·2 − 2 − 2 = −2, so R = 0).
2. **The poster can take a joke**
   - The roast term multiplies receptivity by absurdity, so the more absurd the hoax, the less joke-friendly the poster needs to be.
     - Leo, Ray and Nina (ρ = 2) laugh at most roasts;
     - Vô Jorge and Duda (ρ = 1) laugh along only when the hoax is truly absurd;
     - Bia, Prof. Clara and Sr. Paulo (ρ = 0) never do.

## **Spread**

The reaction (R) sets the post's **virality (v) **from that moment on.

| Reaction | Virality afterwards | What it means |
| --- | --- | --- |
| R = 2+\
Public reply, and they accept (even if stung) | 0 | They delete it in front of everyone, so it stops spreading |
| R = 2+\
Private reply, and they accept (even if stung) | v ÷ 2 for 3 ticks, then 0 | They delete it, then post the correction in the group themselves. That stops the forwarded copies too, because people believe the original sender more than you, but it takes a few ticks. In exchange you get +5 extra trust for saving their face |
| −3 < R < 1\
They ignore you | v, unchanged | The post keeps spreading as before |
| R < −3\
They dig in | Public reply: v, unchanged. Private reply: v × 1.5 | They repost it to prove a point. If you corrected in public, others saw your evidence and stop sharing, so the two cancel out. If you corrected privately, nobody saw it, so it spreads faster |

Spread growth is exponential: each tick multiplies the audience by (1 + v), so a scam almost doubles every tick.

The day's length limits how many ticks a post gets, and harm bands are categories, so big numbers can't break the game.

```latex
S_t = S_0 \, (1 + v)^t
```

## **Harm**

At the end of the day, each post's harm H picks its morning-after event:

- under 10 nothing happens;
- 10 to 40 a minor event;
- over 40 a major one.

```latex
H = (1 + 2s) \times S_{\mathrm{end}}
```

The harm multiplier is 1 + 2s:

- 1 for harmless posts (s = 0);
- 3 for harmful ones (s = 1);
- 5 for dangerous ones (s = 2).

## Example

Four replies to the same fake post, everyone at trust 50 (T = 0).

- Kind & private = empathetic, sourced, private and long;
- Joke = a short joke in the group with no source;
- Firm & public = short, firm and sourced, in the group;
- Roast = a short roast of the hoax in the group, with no source.

The post is an ordinary hoax (a = 0) and only gossip (s = 0), so J is −2 for everyone.

| Reply | Nina | Vô Jorge | Duda | Leo | Manager |
| --- | --- | --- | --- | --- | --- |
| Kind & private | 5 accepts | 6 accepts | 5 accepts | 1 ignores | 6 accepts |
| Joke | 1 ignores | −2 ignores | 0 ignores | 5 accepts | 1 ignores |
| Firm & public | 2 stung | 4 accepts | 3 stung | 4 accepts | 6 accepts |
| Roast | −2 digs in | −2 digs in | −2 digs in | 0 ignores | 0 ignores |

Kind & private looks best, but it's private.

Take a post caught at S = 4 with 5 ticks left in the day, and Nina as the sender:

| Post | Kind & private, accepted | Firm & public, stung |
| --- | --- | --- |
| Gossip (v = 0.2, s = 0) | S = 5.3, H = 5: nothing happens, trust +15 | S = 4, H = 4: nothing happens, trust −5 |
| Scam (v = 0.8, s = 2) | S = 11, H = 55: major event, trust +15 | S = 4, H = 20: minor event, trust −5 |

Kind and private wins on gossip; fast and public wins on a scam, at a cost in trust.

Before choosing, the player has to judge two things:

- who posted it (what that person responds to);
- what's at stake (how fast the post spreads and how much harm it can do).

# Trick catalog

The game teaches 24 tricks in seven families.

Each trick is one rulebook page and one collectible card, and each is caught by a specific tool.

| Family | Trick | Example post | Caught by |
| --- | --- | --- | --- |
| Source | Lookalike address | valleytimes.news-update.co posing as the Valley Times | Zoom |
| Source | Impersonated account | "Dr. Ana Lima" with a checkmark avatar, 40 followers, created last week | Source card |
| Source | Satire taken seriously | A joke story from a parody site, forwarded as news | Source card |
| Source | Anonymous authority | "My friend who's a nurse says..." | Source card |
| Images | Old photo, new story | A 2019 flood photo shared as today's storm | Image trace |
| Images | Photo from somewhere else | A crowd from another country's event | Image trace |
| Images | AI-made or edited image | A shark swimming down a flooded highway | Image trace |
| Images | Fake screenshot | A "post" a celebrity never wrote | Other coverage, Source card |
| Numbers | Cut-off axis | A 2% rise drawn to look like a tripling | Chart inspector |
| Numbers | Cherry-picked dates | Only the three months when prices rose | Chart inspector |
| Numbers | Relative risk without the base | "Doubles your risk!" (1 in 10,000 to 2 in 10,000) | Open the article |
| Numbers | Tiny sample | "Study proves..." based on 12 people | Open the article |
| Numbers | Correlation as cause | "Towns with more ice cream shops have more drownings" | Open the article |
| Words | Headline overstates the article | "Coffee cures cancer" over a mouse study | Open the article |
| Words | Quote out of context | Half a sentence from a longer answer | Other coverage |
| Words | Urgency and outrage | "SHARE BEFORE THEY DELETE THIS!!" | Other coverage |
| Time | Old news shared as new | A 2021 store closure posted as today's news | Zoom |
| Experts | Fake credentials | A "doctor" with an online certificate | Source card |
| Experts | Real expert, wrong field | A famous dentist explaining the economy | Source card |
| Scams | Too-good giveaway | "Free voucher for the first 100 people" | Zoom |
| Scams | Fake alert from "the bank" | "Your account is blocked, confirm here" | Zoom, Source card |
| Scams | Chain message | "Forward to 10 people or lose your account" | Other coverage |
| Voice | Cloned voice note | "Grandpa" asking for money urgently | Call back |
| Voice | Fake audio of a public figure | A leaked "recording" with no source | Other coverage |

**True posts can look suspicious too.**

- A real storm warning in all caps, or a small but legitimate local site.
- These decoys teach players to check rather than judge by looks.

**AI images get no pixel hunt.**

- Many can no longer be spotted by eye, so the game teaches tracing where an image came from instead of looking for six fingers.

# Progression

Story mode runs through four chats, one chapter each, then a finale.

As in Papers, Please, every day adds one rulebook page, and most add a tool.

1. **Family (tutorial, 5 days)**
   - Zoom and lookalike addresses, old news shared as new, Image trace, Open the article, then the reply system and private messages.
2. **Friends**
   - scams, giveaways, chain messages, fake screenshots, urgency and outrage;
   - Source card unlocks.
3. **School**
   - satire, AI images, fake announcements, impersonated accounts;
   - Other coverage unlocks.
4. **Work**
   - charts, cherry-picked dates, relative risk, tiny samples, correlation as cause;
   - Chart inspector unlocks.
5. **Finale**
   - one rumor breaks out in all four chats at once, and you decide where to stop it first.

Difficulty rises by turning four dials:

- fewer warning signs on each fake post
- more decoys on true posts
- posts arriving faster
- more chats active at the same time, so you switch between them

Voice-note tricks arrive in the Friends and Family chats after the main story, as a short bonus chapter that unlocks Call back.

# Scoring and feedback

Scoring punishes both mistakes equally, so a player who blocks everything does as badly as one who shares everything. Points below are starting values to tune in playtests.

| Outcome | Points |
| --- | --- |
| Right verdict and right evidence | +3 |
| Right verdict, wrong or no evidence | +1 |
| Needs context on a real but misleading post | +3 |
| Shared a false post | −3 |
| Stopped a true post | −3 |
| Each spread tick before your verdict | −0.5 |
| A reply that raised trust | +1 |

- **Two bars, not one score**
  - The progress screen shows "Fakes caught" and "Truths trusted" side by side. If the second bar drops, the game says so: doubting everything is its own trap.
- **The morning after**
  - There is no report. You wake up to what your choices caused, told through notifications, new messages and short scenes.
  - Tapping any event shows the post behind it and the trick you caught or missed, so the lesson still lands.
- **Adaptive serving**
  - The game tracks your accuracy on each trick and serves more of your weakest ones, the same way Fox & Hare serves the times tables you miss.
  - Tricks you've mastered come back now and then so they stick.

Examples of what you wake up to:

| Your choice | What happens next |
| --- | --- |
| Shared the fake "lemon water cures the flu" post | Grandpa Jorge skips his flu shot "because you said it was fine." Mom calls you, worried. |
| Corrected Nina kindly in a private message | Next day she messages you first: "Is this one real? Checking before I post." |
| Roasted Vô Jorge's health post in the family group | Jorge stops answering you, and the family takes his side at Sunday lunch. |
| Roasted Leo's shark photo, with the original attached | The group laughs for an hour, and nobody forwards the next shark photo. |
| Stopped a real storm warning | Nobody brought the laundry in, and the Sunday barbecue is underwater. |
| Let the fake voucher link through in Bad Decisions Club | Two friends get hacked and spam the group with the same scam. |
| Said nothing about the fake company memo | The rumor reaches the whole office, and your manager asks why nobody checked. |
| Confirmed a true post: "Checked it, this one's real" | People start trusting you, so your next correction lands. |

# Modes

Story mode teaches; the other three modes bring players back and get them playing together.

| Mode | How it works | Why it matters |
| --- | --- | --- |
| Story | Four chats, one chapter each, then the finale | Teaches every trick and tool in order |
| Daily 5 | The same five posts for everyone each day, with a shareable grid of green, red and yellow squares | Daily habit and word of mouth, like Wordle |
| Spin Room | Take a true story and make it misleading with the tricks you've learned, then see if others catch it | Building a trick makes it easier to spot; unlocks after each chapter |
| Party / classroom | One shared screen shows a post; everyone votes on their phone; then the reveal and a discussion | Family dinners, classrooms, workplace training |

# Look, tone and UI

The game should feel like your own phone, only friendlier. The closer it looks to a real chat, the more the habit carries over to real life.

- **Chat UI with its own identity**
  - Message bubbles, link previews, forwarded images, screenshots and voice notes, in a generic messenger with its own name and colors, not a copy of any real app.
- **Mobile layout**
  - One chat fills the screen. Tapping part of a post opens the tool tray from the bottom, and the verdict buttons sit within thumb reach.
- **Reply screen**
  - After the verdict, a switch at the top toggles between "Reply in group" and "Message Nina privately" (or whoever posted).
  - The private option opens a one-on-one chat with that person, as in a real messenger, and the reply options change to fit it.
- **Desktop layout**
  - Chat list on the left, the open chat in the middle, and the tools and rulebook on the right, so nothing needs a drawer.
- **Art style**
  - Warm, flat illustration with expressive avatars that react to your replies (a relieved smile, a crossed-arms pout). Calm enough for adults, friendly enough for kids.
- **Tone**
  - Gentle humor that never mocks the people who fall for things. Everyone gets fooled sometimes, including the player, and the game says so.
- **Language choice**
  - English or Brazilian Portuguese, chosen once on the first screen.
  - Posts are written for each language, so the language can't change mid-game; "Start over" in settings goes back to the first screen.
- **Accessibility**
  - Large-text option, captions on every voice note, playable one-handed, and color is never the only signal of right or wrong.

# Content rules and post format

Every post is invented, and it follows the same rules in both languages.

- **Fictional everything**
  - Outlets, people, brands, apps and towns are invented.
  - No real news brands, public figures or fact-checking services.
- **Non-partisan topics**
  - Health fads, food, animals, weather, money, scams, tech, school and local events.
  - People spot tricks better when their side isn't on the line.
- **Patterns, not real hoaxes**
  - Posts copy the shape of common hoaxes, never their exact wording, so the game doesn't spread the real thing.
- **Half true**
  - Roughly 50% of posts are true, and many of those carry a decoy warning sign.
- **Accurate answers**
  - Health and safety posts are checked against reliable sources before release, because the "true" answer has to be true.
- **Written for each language**
  - Portuguese posts reflect Brazilian life (reais, Pix payment scams, the "new number, it's me" relative scam). English posts reflect their own context, not a translation.

Each post is one JSON record. Both languages live in the same record, so a post can't drift between versions, and Claude can write new packs in this shape.

```json
{
  "id": "family-03",
  "chat": "family",
  "sender": "jorge",
  "kind": "link",
  "verdict": "stop",
  "tricks": ["lookalike-address", "headline-overstates"],
  "evidence": ["source.url", "article.p2"],
  "source": { "name": "Health Daily Now", "url": "healthdaily-now.info", "accountAgeDays": 21 },
  "image": { "file": "lemons.png", "firstSeen": "2022-03-14" },
  "date": "2026-10-12",
  "text": {
    "en": { "headline": "Doctors confirm: warm lemon water every morning cures the flu", "article": "...", "explain": "..." },
    "pt-BR": { "headline": "Médicos confirmam: água morna com limão toda manhã cura a gripe", "article": "...", "explain": "..." }
  },
  "replies": [
    { "style": "gentle-source", "trust": 2, "en": "...", "pt-BR": "..." },
    { "style": "blunt", "trust": -1, "en": "This is fake.", "pt-BR": "Isso é falso." }
  ]
}
```

**Build notes for GitHub Pages**

- The game is a static site with no server: posts load from JSON files, progress saves in the browser, and the Daily 5 is picked from the date, so everyone gets the same five posts without a backend.
- There are no accounts and no tracking, which keeps it safe for kids.

# Prior art and positioning

Research-backed misinformation games already exist, but they are short, one-time experiences where you play the person spreading misinformation. Hold Up! is replayable, has you play the person checking, and adds the reply.

| Game | What it is | What Hold Up! does differently |
| --- | --- | --- |
| [Bad News](https://www.gatescambridge.org/about/news/online-game-helps-players-to-spot-fake-news) | Cambridge game where you play a "fake news tycoon" learning six manipulation techniques; players got better at spotting them | You play the checker, inside a familiar chat, with real checking tools |
| [Go Viral!](https://olhardigital.com.br/2021/07/19/internet-e-redes-sociais/conheca-go-viral-o-game-que-ensina-a-nao-cair-em-fake-news/) | Five-minute Cambridge game, also in Brazilian Portuguese, where you try to go viral with emotion, fake experts and conspiracies | Hours of replayable content, a Daily 5, and adaptive difficulty |
| [Caçadores de Verdades](https://oimparcial.com.br/noticias/2026/05/projeto-utiliza-gamificacao-para-combater-desinformacao-em-escolas-de-sao-luis/) | 2026 Brazilian school game: investigators in the fictional city of Fuxicópolis check sources and compare accounts | Built for every age and for home, school and work, not only classrooms |

## **The gap this design fills**

A [2023 reanalysis](https://eprints.soton.ac.uk/475360) of Bad News and Go Viral! studies found the games did not improve players' ability to tell true from fake news. They mostly made players answer "false" to everything. Hold Up! is built to avoid that: half the posts are true, and both kinds of mistake cost the same.

**The reply system has a source too.** The truth sandwich in Answering back follows the [Debunking Handbook 2020](https://www.climatechangecommunication.org/debunking-handbook-2020/): lead with the fact, warn that a myth is coming, state the myth once, explain the fallacy, end with the fact.

# Open questions and next steps

The next milestone is one playable day of the Family chapter, in both languages, live on GitHub Pages.

## **Open questions**

- What is the youngest age we design for, and what reading level does that set for the posts?
- How many posts does each chapter need, and who checks the facts in both languages before release?
- Party mode needs live syncing between phones, which GitHub Pages can't do alone. Do we start with a pass-the-phone version, or add a small real-time service?
- How do Spin Room creations reach other players without a server? Shareable links are one option.
- How do we measure that players get better at telling true from false, not just more suspicious? A short before-and-after quiz is one option.
- Should Hold Up! and Fox & Hare live under one brand of all-ages learning games?

## **Next steps**

- [ ] Write the first 20 Family posts in English and Brazilian Portuguese, using the JSON format
- [ ] Paper-test the verdict, evidence and reply loop with three generations of one family
- [ ] Sketch the chat screen for mobile and desktop
- [ ] Pick the art style and design the four Family characters
- [ ] Build a one-day prototype with Claude Code and publish it on GitHub Pages

---

# Roadmap: from cupcake to wedding cake

Hold Up! grows in three releases, and each one is a complete game, just smaller. That's the cupcake model from Brandon Schauer and Adaptive Path: a cupcake already has the sponge, filling and frosting of a wedding cake, only less of each.

We ship the cupcake to real players, learn from it, then grow it into a birthday cake and finally the full wedding cake. Each step only starts once its gate is passed.

The cupcake is the next thing to build; the tables below spell out each cake and each gate.

## What's in each cake

Every cake has every layer of the game (posts, tools, replies, consequences), just at a different size. Post and day counts are starting targets.

| Layer | 🧁 Cupcake (MVP) | 🎂 Birthday cake | 💒 Wedding cake (full game) |
| --- | --- | --- | --- |
| Question it answers | Is checking and replying fun, and does it teach? | Will people of every age come back? | Can it grow beyond us: classrooms, sharing, new content? |
| Chats and characters | Family chat only: Prima Nina and Vô Jorge | All four chats and all eight characters | Plus the finale, where one rumor hits every chat at once |
| Story | Family chapter, 3 days, about 15 posts | Four chapters, about 5 days each | Full story plus the voice-note bonus chapter |
| Tricks | 6 tricks: lookalike address, old news, impersonated account, anonymous authority, headline overstates, too-good giveaway | The full written trick catalog | Voice-note tricks, plus new trick packs over time |
| Checking tools | Zoom, Source card, Open the article | Adds Image trace, Other coverage, Chart inspector | Adds Call back |
| Replies | Group or private, 3 written options, trait weights, trust | Adds roasts (J) and "asks you first" | More reply styles, tuned separately for each language |
| Consequences | Spread, harm and one morning-after event per post | Full morning-after scenes; rumors jump between chats | Consequences that come back days later |
| Modes | Story only | Adds Daily 5 with a shareable grid | Adds Spin Room and party/classroom mode |
| Platform and languages | Mobile web on GitHub Pages, English and Brazilian Portuguese | Adds desktop layout, accessibility options, progress screen | Adds a small real-time service for party mode |
| Learning check | Short before-and-after quiz with true and fake headlines | Built-in tracking: fakes caught and truths trusted | A study with a school or researchers |

## Baking the cupcake, sprint by sprint

Even the cupcake is too much to build in one go, so it's baked in one-week sprints, sized for one person building with Claude Code. Each sprint adds one layer of the core loop and ends with a build on GitHub Pages that someone can play on a phone. That's eight sprints, about two months.

- **Both languages from sprint 0.** Every string and post is written in English and Brazilian Portuguese as it's made, because adding a language later means reworking every screen.
- **Someone new plays every build.** At the end of each sprint, one person who hasn't seen the game plays it while you watch.
- **If a sprint runs long, cut posts, not layers.** A 10-post chapter with every layer teaches more than 15 posts without the morning after.

| Sprint | Goal | What gets built | Playable at the end |
| --- | --- | --- | --- |
| 0 · Paper and setup | Prove the loop before writing code | Paper-test verdict, evidence and reply with one family across three generations. Write the first 5 Family posts in the JSON format. Set up the repo, GitHub Pages and the language switch. | The paper prototype, and an empty Family chat live on a phone |
| 1 · Judge a post | A post arrives and you call it | Family chat screen with bubbles and link previews; Share, Stop and Needs context within thumb reach; right or wrong shown after each verdict | 5 posts, verdicts only |
| 2 · Check and prove it | Checking is the gameplay | Tool tray with Zoom, Source card and Open the article; the point-to-evidence step; scoring, including the spread tick for each check | One trick per tool: lookalike address, impersonated account, headline overstates |
| 3 · Reply | Being heard matters as much as being right | 3 written replies per post, sent in the group or in private; reception score R without roasts (J = 0); trait weights and trust for Nina and Vô Jorge; their reactions in the chat | The same posts, each ending in a reply and a reaction |
| 4 · The morning after | Choices have consequences | Spread and harm; one morning-after event per post; tap an event to see the trick behind it; progress saved in the browser | Day 1, complete |
| 5 · The whole chapter | Enough posts to learn from | Write and fact-check the rest of the \~15 posts, about half true; add old news, anonymous authority and too-good giveaway; make days 2 and 3 harder; tune the numbers | The full 3-day Family chapter |
| 6 · Quiz and polish | Ready for strangers | Before-and-after quiz; first-time hints; art for the Family cast; a native speaker reviews the Portuguese; test on an old, cheap phone | Release candidate |
| 7 · Playtest | Pass Gate 1 | 10 playtesters across three generations, in both languages; fix what blocks them; score the gate | Go or no-go for the birthday cake |

## Gates

A new cake starts only when the one before it proves its point. The numbers are targets to tune after the first playtests.

| Gate | Move on when |
| --- | --- |
| 🧁 → 🎂 Cupcake to birthday cake | 8 of 10 playtesters, across three generations, finish the 3 days without help. Most ask to play another day. The before-and-after quiz improves on both true and fake headlines, not just more "fake" answers. Both languages play equally well. |
| 🎂 → 💒 Birthday cake to wedding cake | Players come back for the Daily 5 several days a week. Players of every age group finish chapters. Teachers or families ask for a group mode. We can write and fact-check a new post pack every month. |

## Cut on purpose

Each cake leaves things out so it can ship small and still feel finished.

| Cake | Leaves out | Why |
| --- | --- | --- |
| 🧁 Cupcake | Roasts, the other three chats, Image trace, Other coverage, Chart inspector, Daily 5, desktop polish, voice notes, any server | Roasts are the hardest thing to balance, and everything else adds content before we know the core loop works |
| 🎂 Birthday cake | Spin Room, party/classroom mode, voice-note tricks, the finale | Sharing and live play need a backend; cloned-voice content needs extra care before it reaches kids |
| 💒 Wedding cake | Anything not listed above goes to the backlog | New ideas earn a place by beating something already in the game |

## Sources

- [Brandon Schauer: the cake and cupcake model of product strategy](https://maeda.pm/2019/06/30/brandon-schauer-the-cake-and-cupacake-model-of-product-strategy/), reposted by John Maeda
- [The Cake Model: a new approach to creating MVPs](https://www.parabol.co/blog/the-cake-model-approach-to-mvps/), Parabol (cupcake, birthday cake, wedding cake)
