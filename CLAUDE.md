# Hold Up! / Peraí! — rules for every session

A mobile-first web game about spotting misinformation in group chats.
**GDD.md is the game design document, roadmap included. Read it before every task.**
**ART.md is the art direction. Every screen follows it.**

## Working with Victor

- Victor is a designer, not a developer, and has never used Git or the command
  line. Do every technical step yourself and explain things in plain words
  (say "draft", "bookmark" and "publish", not "branch", "tag" and "merge").
- **Before each task, give a plan in a few plain bullets and wait for an OK.**
- If GDD.md doesn't answer something, ask. Don't invent rules or numbers.

## How the game is built

- Plain HTML, CSS and JavaScript. No frameworks, no build tools, nothing to install.
- The game must play by double-clicking `index.html`. That opens it from a file,
  not a web server, so:
  - no `fetch`, no JSON loading, no `type="module"` scripts or `import`;
  - load everything with ordinary `<script src="...">` tags and relative paths;
  - posts live in `.js` files, keeping the record shape from the GDD's
    "Content rules and post format".
- Every text in the game exists in English and Brazilian Portuguese, in two
  language files: `lang/en.js` and `lang/pt-BR.js`, with the same names in
  both. No player-facing text in the code.
- Files: `index.html` (the page), `style.css` (colours at the top, named as in
  ART.md), `game.js` (the code), `lang/` (texts), `settings.js` (every
  number), `illustrations.js` (flat pictures for posts), `characters.js` (the cast,
  one SVG per character with a face setting), `fonts/fonts.css` (Fredoka and
  Nunito, embedded so they work offline), `art/` (reference, cast sheet and
  `sketch.html`, the chat screen sketch), `posts/` (`family.js` holds the
  posts; `review.html` shows them side by side for Victor to read).

## Posts

- Every post is modelled on a famous real hoax from Brazil or the US (Victor's
  rule), recorded in its `basedOn` with sources. Keep the GDD's content rules
  too: invented outlets, people, brands and towns, our own wording,
  non-partisan topics, about half true. True posts copy the look of a famous
  hoax (the decoy) but are real.
- English posts happen in Tallowbrook, Portuguese ones in Pouso Sereno. Write
  each language for its own players (Brazilian details in PT-BR: reais, Pix,
  CPF, Defesa Civil), never as a translation; only the trick and the right
  answer must match.
- Every real-world claim gets a `factCheck` entry with what was found and its
  sources. They show as FACT-CHECK on `posts/review.html` until Victor has read
  them; remove the marks only when he says so.
- The language is chosen once, on the welcome screen, and remembered in the
  browser. Posts are written for each language, so it never changes mid-game:
  the only way back is "Start over" in the settings card, which returns to the
  welcome screen (and, once progress is saved, will clear it after asking).
- Every number from the GDD (scores, weights, trust, spread) lives in one
  settings file that Victor can read and edit. No numbers in the code.
- Mobile first: design for a phone held in one hand, with the main buttons
  within thumb reach.
- No accounts, no tracking, no server. Saving progress in the browser is fine.

## Decisions the GDD doesn't cover (Victor's answers)

- Portuguese verdict names: Compartilhar / Barrar / Falta contexto.
- Only the exact verdict counts as right (Stop on a Needs context post is wrong,
  and the other way round).
- "typing…" lasts `typingSeconds` in settings.js (1.5 s to start).
- The messenger's own name is still to be decided; nothing shows it yet.
- The settings card's Test section (jump to a post, switch language) is for
  building only: take it out before strangers playtest.
- Still open: how replies to true posts are scored (the GDD's R table was made
  for corrections).

## Victor's commands

The current draft is the `sprint-1` branch. `main` is what's live.

- **After every task, always publish (Victor's standing instruction, Oct 15,
  2026):** commit the work on the draft, push it to GitHub, then publish as
  below, without asking. Tell Victor it's live once the run has finished.
- **"save this version as [name]":** commit any open work, then create an
  annotated tag for that name (spaces become hyphens; say so) and push the tag.
- **"go back to [name]":** `git restore --source=<tag> --staged --worktree -- .`,
  then commit it as "Go back to [name]" and push the draft. Nothing after the
  bookmark is lost, so the step can be undone the same way. Then publish, so
  the live site matches.
- **"publish":** bring `main` up to the draft (`git push origin sprint-1:main`,
  merging first if `main` has moved) and push. GitHub Actions
  (`.github/workflows/publish.yml`) puts it online about a minute later at
  https://victor-mascaro-ux.github.io/hold-up/ — check the run finished before
  saying it's live.
- If a push hangs, the Windows sign-in helper is stuck: end
  `git-credential-manager.exe` and the push finishes.
