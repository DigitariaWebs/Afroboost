# AfroBoost — Super Admin Console

Operator dashboard for the **AfroBoost** platform — the web console the AfroBoost
team uses to manage every business tenant on the mobile app.

> ⚠️ **100% mock data, no backend.** Mirrors the mobile prototype's philosophy.
> All data is generated deterministically in `src/lib/mock-data.ts` (a seeded PRNG
> keeps server & client renders identical). No real auth, no database, no network.

## Run

```bash
cd admin
npm install
npm run dev      # http://localhost:3001
```

Sign in with **any** email and password — mock auth accepts everything
(session is stored in `localStorage`). Pre-filled with `patrick@afroboost.ca`.

```bash
npm run build    # production build
npm run start    # serve the build on :3001
```

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS** — dark jewel theme matching the mobile app
  (obsidian `#0E1A14`, emerald `#1F8A55`, gold `#E5B040`, plum `#5B2A4F`,
  Instrument Serif + Inter)
- **Recharts** — financial & growth charts
- **Zustand** (+ persist) — mock auth session
- **lucide-react** — icons · **date-fns** — dates

## Modules

| Route | Module | What it shows |
|---|---|---|
| `/dashboard` | **Overview / Analytics** | Platform KPIs (MRR, ARR, AI spend), **income vs cost vs profit** chart, monthly **cost breakdown** (AI / infra / other), plan mix, growth, accounts needing attention |
| `/dashboard/tenants` | **Businesses** | All tenants — search, status filter, sort by MRR/health/name/date; drill into a detail page (owner, subscription, connected accounts, usage, invoices, suspend/impersonate actions) |
| `/dashboard/billing` | **Subscriptions & Billing** | MRR by plan, collected revenue, failed payments, full invoice ledger with refund/retry (Stripe-style mock) |
| `/dashboard/usage` | **Usage & Quotas** | Per-business consumption vs plan limits for posts/calls/SMS/AI, AI cost, near/over-limit flags |
| `/dashboard/users` | **Users & Roles** | Admin team RBAC (super admin / support / analyst / viewer) + permission matrix, and business-owner accounts |
| `/dashboard/support` | **Support** | Tickets across all tenants — priority, status, assignee, resolve action |
| `/dashboard/audit` | **Audit Log** | Every admin action, newest first, filterable by action type |

## Project structure

```
admin/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # fonts + globals
│   │   ├── page.tsx                # → redirects to /dashboard
│   │   ├── login/                  # mock login (accepts anything)
│   │   └── dashboard/
│   │       ├── layout.tsx          # auth guard + sidebar + topbar shell
│   │       ├── page.tsx            # Overview / Analytics
│   │       ├── tenants/            # list + [id] detail
│   │       ├── billing/  usage/  users/  support/  audit/
│   ├── components/
│   │   ├── ui.tsx                  # Card, Badge, Button, Table, Avatar, ProgressBar…
│   │   ├── charts.tsx              # Recharts wrappers
│   │   ├── status.tsx              # status/role/priority badges
│   │   ├── KpiTile.tsx  AIOrb.tsx  Sidebar.tsx  Topbar.tsx  nav.ts
│   └── lib/
│       ├── types.ts                # domain types (tenants, billing, RBAC, audit…)
│       ├── mock-data.ts            # seeded deterministic dataset
│       ├── metrics.ts              # platform aggregations (MRR, profit, margin…)
│       ├── auth.ts                 # zustand mock session
│       └── utils.ts                # cn, currency/number formatting
```

## Notes & next steps

- The dashboard runs on **port 3001** so it doesn't clash with the mobile app's
  web build or the marketing site.
- To wire to a real backend later, replace the imports from `src/lib/mock-data.ts`
  with fetchers (the `metrics.ts` aggregations and component props are already
  shaped around the domain types in `src/lib/types.ts`).
- Mutations (suspend, refund, resolve ticket, invite admin, change plan) show a
  confirmation banner but do not persist — they are intentionally mocked.
