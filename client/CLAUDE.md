# Client

React 19, Vite, Tailwind CSS v4 (via `@tailwindcss/vite`, no `tailwind.config.js`), ES modules.
Project-wide rules (git, naming, comments, shared logic, lint/format) are in `../CLAUDE.md`.

## Commands (run from `client/`)

- `npm run dev`: dev server on http://localhost:5173
- `npm run build` / `npm run preview`
- `npm run lint`, `npm run format`
- No tests configured yet.

## Folder structure (`src/`)

Create a folder when its first file is needed; empty folders are not committed.

- `assets/`: images, fonts, icons
- `components/`: reusable UI components
- `layout/`: headers, footers, page wrappers
- `services/`: all API calls, one file per domain (e.g. `productsService.js`)
- `store/`: global state (none yet; ask before adding Redux or Zustand)
- `widgets/`: specialized reusable widgets
- `utils.js`: generic shared helpers
- `App.jsx`, `main.jsx` (entry point), `config.js`, `endpoints.js`

## File naming

- Components: PascalCase with `.jsx` (`ProductCard.jsx`).
- Everything else: camelCase with `.js` (`productsService.js`).

## API access

- Components never call `fetch` directly. All requests go through a service in `src/services/`.
- Services build URLs only from `ENDPOINTS` in `src/endpoints.js`, never hardcoded. Add new routes there.
- The base URL comes from `VITE_API_URL` via `src/config.js`.
- `VITE_` variables are bundled into the browser code and visible to anyone. Never put secrets in them.
- The server's CORS allows only http://localhost:5173 (set by `CLIENT_URL` in `server/.env`, which the developer manages). If the dev port changes, tell the developer instead of editing server files.

## React

- Functional components with hooks only.
- Use state only for values that change what is rendered; otherwise use a regular variable.
- Declare state in the lowest component that needs it. State in a parent re-renders every child below it.
- `useEffect` is only for syncing with something outside React, like fetching data when a component mounts. Don't use it for values you can compute during render, or for reacting to user actions (use event handlers).

## Async and errors

- Use async/await, never callbacks.
- Use try/catch in async handlers and pass errors to the central error middleware with `next(error)`.

## Styling

- Tailwind classes only, no inline style={{}}, and no new .css files.
