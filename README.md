# BCA Backend (API)

This backend provides APIs for homepage content (promos, news, rates, carousel) consumed by the Angular frontend.

## Tech Stack
- Node.js + Express
- Prisma ORM (MySQL/PostgreSQL compatible)
- Swagger/OpenAPI for API documentation (`/api/docs`)
- Helmet, CORS, Morgan for security and logging
- Nodemon for development

## Architecture
The codebase follows a layered structure:
- `src/routes/` – Express routers that define endpoints and attach middlewares/validators
- `src/controllers/` – Request/response handlers that call services and format results
- `src/services/` – Business logic and database access via Prisma
- `src/lib/db.js` – Shared Prisma client instance
- `src/middlewares/` – Authentication (JWT), error handling, etc.
- `src/validators/` – Request validation schemas
- `src/swagger.js` – Swagger/OpenAPI setup
- `src/logger.js` – Application logging configuration

## Prerequisites
- Node.js v18+ recommended
- A database (MySQL/Postgres) accessible via `DATABASE_URL`

## Environment Variables
Create a `.env` file in `bca-backend/` with at least:
```
PORT=3002
DATABASE_URL="mysql://user:pass@localhost:3306/bca_db"
JWT_SECRET="replace-with-a-secure-secret"
CORS_ORIGIN="http://localhost:3000"
```

## Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run Prisma migrations and optional seed:
   ```bash
   npx prisma migrate dev
   node prisma/seed.js
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   The server will be available at `http://localhost:3002/` and Swagger docs at `http://localhost:3002/api/docs`.

## Key Endpoints
- `GET /api/health` – health check
- Footer
  - `GET /api/footer/contact`
  - `GET /api/footer/quicklinks`
  - `GET /api/footer/social`
  - `GET /api/footer/policy`
- News
  - `GET /api/news` (query: `featured`, `limit`)
- Auth
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/auth/me` (requires Bearer token)
- Promos (protected: admin)
  - `GET /api/promos`
  - `POST /api/promos`
  - `PUT /api/promos/:id`
  - `DELETE /api/promos/:id`
- Carousel (protected: admin)
  - `GET /api/carousel`
  - `POST /api/carousel`
  - `PUT /api/carousel/:id`
  - `DELETE /api/carousel/:id`
- Rates (protected: admin)
  - `GET /api/rates`
  - `POST /api/rates`
  - `PUT /api/rates/:id`
  - `DELETE /api/rates/:id`
- Search
  - `GET /api/search?q=<term>`

## Directory Structure
```
bca-backend/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
└── src/
    ├── controllers/
    ├── lib/
    ├── logger.js
    ├── middlewares/
    ├── routes/
    ├── server.js
    ├── services/
    ├── swagger.js
    └── validators/
```

## Development Notes
- To test admin-only endpoints, ensure you have a user with `role: 'admin'`.
- Update `CORS_ORIGIN` in `.env` to match your frontend dev URL (`http://localhost:3000`).

## Troubleshooting
- Prisma connection issues: verify `DATABASE_URL` and DB user permissions.
- CORS errors: ensure `CORS_ORIGIN` is set correctly.
- Runtime errors: check `logs/error.log` and terminal output.
/*
BCA Backend – API Server (Node.js/Express)

Overview
- RESTful API powering the BCA Clone frontend.
- Runs on http://localhost:3002 with Swagger docs at http://localhost:3002/api/docs.
- Uses Prisma to access the database (SQLite/PostgreSQL depending on your setup).

Tech Stack
- Node.js 18+
- Express
- Prisma ORM
- Swagger (OpenAPI) for docs
- Nodemon for development

Prerequisites
- Node.js 18+
- npm or yarn
- Database configured for Prisma (check prisma/schema.prisma)

Environment Variables (.env example)
PORT=3002
DATABASE_URL="file:./dev.db"  # example for SQLite
JWT_SECRET="your-secret-here"
CLIENT_URL=http://localhost:3000

Local Development
1) Install dependencies:
   npm install
2) Generate Prisma client:
   npx prisma generate
3) Apply migrations (if applicable):
   npx prisma migrate dev
4) Start the dev server:
   npm run dev
5) Swagger docs:
   http://localhost:3002/api/docs

Key Endpoints (examples)
- GET /api/health – Health check
- Auth:
  - POST /api/auth/register
  - POST /api/auth/login
  - GET  /api/auth/me
- Content:
  - GET /api/carousel
  - GET /api/promos
  - GET /api/news
  - GET /api/footer/sections
- Rates:
  - GET    /api/rates
  - POST   /api/rates
  - PUT    /api/rates/:id
  - DELETE /api/rates/:id
- Search:
  - GET /api/search?q=<term>

Directory Structure (after refactor)
src/
  db.js              # Prisma client
  server.js          # Express app bootstrap
  routes/
    auth.routes.js
    carousel.routes.js
    promos.routes.js
    news.routes.js
    footer.routes.js
    rates.routes.js
    search.routes.js
  controllers/
    auth.controller.js
    carousel.controller.js
    promos.controller.js
    news.controller.js
    footer.controller.js
    rates.controller.js
    search.controller.js
  services/
    auth.service.js
    carousel.service.js
    promos.service.js
    news.service.js
    footer.service.js
    rates.service.js
    search.service.js

Troubleshooting
- If Swagger does not load, confirm the server is running on port 3002 and the route /api/docs is mounted.
- CORS errors: ensure CLIENT_URL matches your frontend origin (e.g., http://localhost:3000).
- Prisma errors: check DATABASE_URL and run `npx prisma generate`.

Note on Tooling Diagnostics
- Some editors/tools may mistakenly parse Markdown files (README.md) as TypeScript/JavaScript, leading to errors like "Invalid character" or "; expected".
- To suppress those false diagnostics, this README is wrapped in a block comment (/* ... */).
- Recommended permanent fixes you can apply next:
  1) tsconfig/jsconfig: exclude Markdown files
     {
       "exclude": ["**/*.md"]
     }
  2) ESLint: add ignorePatterns for **/*.md.
  3) VSCode: enforce Markdown association
     "files.associations": { "**/*.md": "markdown" }
- After applying the permanent fixes, you can remove the /* */ wrapper to render the README normally.
*/