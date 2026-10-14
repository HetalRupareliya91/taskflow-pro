# TaskFlow Pro

A full-stack team task manager.

| Layer    | Stack                                  |
|----------|----------------------------------------|
| API      | Node.js 20, Express, in-memory store   |
| Frontend | React 18, Vite                         |
| Tests    | `node:test` (no extra dependencies)    |

## Run it

```bash
cd backend && npm install && SEED=1 npm run dev     # http://localhost:4000/api
cd frontend && npm install && npm run dev           # http://localhost:5173
```

Run the API tests with `cd backend && npm test`.

Each domain module (tasks, boards, sprints, ...) lives in `backend/src/modules/<name>`
with its own model, validator, service, controller, routes and seed data, and has a
matching feature folder in `frontend/src/features/<name>`. API reference: `docs/api`.

Set `API_KEY` to require an `x-api-key` header on every request.
