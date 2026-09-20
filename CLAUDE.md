# mini-store

Full-stack app: `server/` (Node, Express, Mongoose) and `client/` (React, coming soon).
Each folder has its own CLAUDE.md with stack-specific rules. Use npm only.

## Git 
- Never run git commands that change state (commit, push, checkout, merge, stash, reset). The developer handles all git operations. Read-only commands like `git status` and `git diff` are fine.

## Naming
- Booleans always start with `is`: `isActive`, `isLoading`.
- Files: PascalCase for React components (`UserCard.js`), camelCase for everything else (`productsService.js`).

## Where shared logic goes
- Used in one file only: a local function in that file.
- Generic and reused (math, strings, dates): the `utils.js` file of that side.
- Domain-specific and reused: a service file named after the domain, e.g. `productsService.js`.

## Comments
- Comment only code that is NOT self-explanatory: explain it in simple words, with an example call if it helps.
- Remove unused code, imports and outdated comments before finishing a task.

## Performance
- No redundant loops over the same data and no unnecessary server calls. Combine them where possible.

## After every change
- Run `npm run lint` and `npm run format` in the folder you changed, and fix all lint errors.