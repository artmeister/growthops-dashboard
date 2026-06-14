# GrowthOps Dashboard

A **Next.js** pet project that simulates a working dashboard for a growth/product team.

The project is open and clickable, the API can be inspected, and you can quickly understand how the internal logic works.

## About the Project

GrowthOps Dashboard helps a hypothetical team keep track of web projects that impact marketing and product metrics.

Several types of projects are included:

- SEO landing pages
- paid traffic campaigns
- CMS templates
- e-commerce product pages
- account portal flows

Each project displays metrics, the tech stack, current status, audit score, task list, and recommendations. There’s also a landing page audit simulator and a list of A/B experiments.

All project data is mocked. This is intentional: instead of connecting a database, the focus is on application structure, typing, UI, API routes, and overall product logic.

## Why Next.js

This repo demonstrates a full-stack approach in one place:

- Pages are in `app/`
- API endpoints are located nearby in `app/api/*/route.ts`
- The main page fetches initial data on the server
- The interactive part of the dashboard works as a client component
- Project pages are implemented via dynamic routes
- SEO is not forgotten: metadata, sitemap, robots, and JSON-LD are included

This setup is closer to how many real-world Next.js apps are built: some logic runs on the server, some remains interactive on the client.

## What You Can Do in the UI

The app allows you to:

- View KPIs for performance, conversion rate, API latency, and release lead time
- Filter projects by segment
- Select a project to see its stack, audit score, backlog, and recommendations
- Open an individual project page at `/projects/[projectId]`
- View the list of A/B experiments
- Submit the audit simulator form and get a score with recommendations
- See the timeline of recent releases and optimizations

This isn’t a production SaaS—it's a portfolio project. But the logic is built to easily expand further: add a database, authentication, real Lighthouse reports, or analytics integration.

## Tech Stack

Main stack:

- **Next.js 15** — App Router, pages, layouts, route handlers, metadata routes
- **React 19** — components, forms, dashboard interactivity
- **TypeScript** — types for data, API responses, props, and business logic
- **SCSS/SASS** — responsive styling, CSS variables, adaptive layout
- **Zod** — runtime validation for POST requests

Additionally:

- mock data layer in `lib/seed.ts`
- separate business logic for audit score calculation
- GitHub Actions for typechecking and production build
- sitemap, robots, and structured data for SEO-oriented implementation

## Project Structure

```txt
growthops-dashboard-next/
├── app/
│   ├── api/
│   │   ├── audits/route.ts
│   │   ├── dashboard/route.ts
│   │   ├── experiments/route.ts
│   │   ├── health/route.ts
│   │   └── projects/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── projects/[projectId]/page.tsx
│   ├── globals.scss
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── dashboard-client.tsx
│   ├── audit-panel.tsx
│   ├── project-card.tsx
│   ├── kpi-card.tsx
│   └── ...
├── lib/
│   ├── audit-score.ts
│   ├── dashboard.ts
│   ├── seed.ts
│   ├── types.ts
│   └── validation.ts
├── .github/workflows/ci.yml
├── .env.example
├── next.config.mjs
├── package.json
└── tsconfig.json
```

## How to Run

Requirements:

- Node.js 20+
- npm 10+

```bash
npm install
cp .env.example .env
npm run dev
```

After starting, the app will be available at:

```txt
http://localhost:3000
```

Healthcheck:

```txt
http://localhost:3000/api/health
```

## Commands

```bash
npm run dev        # dev server
npm run typecheck  # TypeScript type checking
npm run build      # production build
npm run start      # run production build
npm run clean      # remove node_modules and .next
```

## API

The project exposes several API endpoints using Next.js Route Handlers.

### `GET /api/health`

Checks that the API is responding.

### `GET /api/dashboard?segment=all`

Returns dashboard data: KPIs, projects, timeline, and segment list.

Supported `segment` values:

```txt
all
seo
paid
cms
ecommerce
account
```

### `GET /api/projects`

Returns the list of projects.

### `GET /api/projects/:id`

Returns a single project by id.

### `POST /api/audits`

Simulates a landing page audit.

Sample payload:

```json
{
  "url": "https://campaign.growthops.demo",
  "stack": ["Next.js", "React", "Magento"],
  "hasServerRendering": true,
  "imageOptimization": true,
  "trackingDepth": "events"
}
```

Sample response:

```json
{
  "url": "https://campaign.growthops.demo/",
  "overallScore": 94,
  "summary": "Project is close to release quality. Focus on small SEO, tracking and render-path improvements.",
  "metrics": [],
  "recommendations": []
}
```

### `GET /api/experiments`

Returns the list of A/B experiments.

### `POST /api/experiments`

Creates a draft experiment in app memory.

## What to Check Out in the Code

`app/page.tsx` — Main page, fetches initial data on the server and passes it into the dashboard

`components/dashboard-client.tsx` — Main interactive piece: filters, project selection, and data updates

`components/audit-panel.tsx` — Audit simulator form, demonstrating controlled forms, submit state, and API requests

`app/api/audits/route.ts` — Sample POST endpoint with Zod payload validation

`lib/audit-score.ts` — Business logic for scoring and recommendations

`lib/types.ts` — Shared project types

`app/projects/[projectId]/page.tsx` — Dynamic route for individual project pages

## What the Project Demonstrates

- UI with multiple states and filters
- Server-side and client-side parts together in a single Next.js app
- API endpoints without a separate Express server
- Typed data and responses
- Input validation for incoming requests
- SEO-oriented details: metadata, sitemap, robots, JSON-LD
- Context of performance, analytics, conversion, and release process
- Integrating modern React/Next.js approaches for CMS and e-commerce tasks

## Possible Improvements

- SQLite or PostgreSQL instead of mock data
- Auth and user roles
- Persistent A/B experiments
- Server Actions for some forms
- Unit tests for `audit-score.ts`
- Playwright smoke tests
- Real Lighthouse reports
- Import data from Google Analytics or Search Console
- Drag-and-drop backlog board

## Git

The project includes a GitHub Actions workflow. On push and pull request, it runs:

```bash
npm install
npm run typecheck
npm run build
```

## In Short

GrowthOps Dashboard is a small but complete Next.js pet project. It showcases frontend, API, typing, validation, SEO settings, and product context within a single application.

The main idea: to demonstrate how you can build a clear, practical product tool around real-world web tasks—performance, SEO, analytics, CMS/e-commerce, and conversion optimization.