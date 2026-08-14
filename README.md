# Flight Compensation Platform

Legal-tech platform for Israeli Aviation Law (Tibi Law) and EU Regulation 261 — compensation calculators, court verdict explorer, and claim guides.

## Structure

```
flight-compensation-platform/
├── frontend/          # Next.js (App Router + Tailwind)
├── backend/           # FastAPI + SQLAlchemy
├── data_pipeline/     # Ingestion templates and scripts
└── docker-compose.yml # PostgreSQL + API for local dev
```

## Quick start

### 1. Start database and API

```bash
docker compose up -d
```

API docs: http://localhost:8000/docs

### 2. Start frontend

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

App: http://localhost:3000

## Features

- **Compensation Calculator** — `/calculator` for Tibi Law and EU261 estimates
- **Verdict Explorer** — `/verdicts` with airline, amount, and delay filters
- **SEO verdict pages** — `/verdicts/[slug]` server-rendered for indexing
- **How to Sue Guide** — `/guide` with downloadable warning letter template
- **REST API** — CRUD endpoints for airlines, laws, and verdicts

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/airlines/` | List airlines |
| GET | `/api/verdicts/` | List/filter verdicts |
| GET | `/api/verdicts/{slug}` | Get verdict by slug |
| GET | `/api/laws/` | List legal frameworks |
| GET | `/health` | Health check |

## Development roadmap

- Phase 1: Monorepo, DB models, CRUD API ✅
- Phase 2: Admin panel, scraper pipeline, PDF parser
- Phase 3: Calculator, guides, templates ✅
- Phase 4: Verdict search, SSR pages, filters ✅

## Notes

The backend seeds sample verdicts on first startup. Connect the scraper in `backend/app/scraper/` to Net-HaMishpat or Nevo for live ingestion.
