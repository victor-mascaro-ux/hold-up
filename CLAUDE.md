# Hold Up! / Peraí! — rules for every session

A mobile-first web game about spotting misinformation in group chats.
**GDD.md is the game design document, roadmap included. Read it before every task.**

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
  language files (one per language). No player-facing text in the code.
- Every number from the GDD (scores, weights, trust, spread) lives in one
  settings file that Victor can read and edit. No numbers in the code.
- Mobile first: design for a phone held in one hand, with the main buttons
  within thumb reach.
- No accounts, no tracking, no server. Saving progress in the browser is fine.

## Victor's commands

The current draft is the `sprint-1` branch. `main` is what's live.

- **After every task:** commit the work on the draft and push it to GitHub as a
  backup. This does not change the live site.
- **"save this version as [name]":** commit any open work, then create an
  annotated tag for that name (spaces become hyphens; say so) and push the tag.
- **"go back to [name]":** `git restore --source=<tag> --staged --worktree -- .`,
  then commit it as "Go back to [name]" and push the draft. Nothing after the
  bookmark is lost, so the step can be undone the same way. Going back does not
  publish.
- **"publish":** bring `main` up to the draft (`git push origin sprint-1:main`,
  merging first if `main` has moved) and push. GitHub Actions
  (`.github/workflows/publish.yml`) puts it online about a minute later at
  https://victor-mascaro-ux.github.io/hold-up/ — check the run finished before
  saying it's live.
