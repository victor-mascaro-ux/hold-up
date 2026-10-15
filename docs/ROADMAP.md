# Roadmap: from cupcake to wedding cake

Hold Up! grows in three releases, and each one is a complete game, just smaller. That's the cupcake model from Brandon Schauer and Adaptive Path: a cupcake already has the sponge, filling and frosting of a wedding cake, only less of each.

We ship the cupcake to real players, learn from it, then grow it into a birthday cake and finally the full wedding cake. Each step only starts once its gate is passed.

## At a glance

&#91;embedded content: roadmap · 3 cakes, 2 gates, not to scale\]

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
| 7 · Playtest | Pass [Gate 1](#mk22djq4w8s.2262) | 10 playtesters across three generations, in both languages; fix what blocks them; score the gate | Go or no-go for the birthday cake |

Prompts for Claude Code and tests for each sprint: Build checklist

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
