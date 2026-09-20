# Server

Node.js, Express 5, Mongoose. ES modules (`"type": "module"`): use `import`/`export`, never `require`.

## Commands (run from `server/`)

- `npm run lint`, `npm run format`
- No tests configured yet.

## Async and errors

- Use async/await, never callbacks.
- Use try/catch in async handlers and pass errors to the central error middleware with `next(error)`.
- The error middleware logs the full error but sends the client only a status code and a generic message. Never send stack traces, DB errors or internal messages to the client, since they can expose sensitive data.

## Never trust client data

Anyone can call the API directly (e.g. from Postman) with any data they want.

- Identify the user from the JWT, never from IDs sent in the request body.
- Never use values the DB owns from the request. Example: at checkout, fetch product prices from the DB instead of using prices sent by the client.

## Return minimal data

- Select only the fields the endpoint needs (Mongoose `.select()`) and return only those.
  Why: smaller responses, and no risk of leaking fields like password hashes.

## Files

- Process small files in memory instead of writing them to disk.
- If a file must be written to disk, delete it in a `finally` block so it is removed even when an error occurs.

## Mongoose

- Define static methods with `function () {}`, never arrow functions: arrow functions don't bind `this` to the model.
