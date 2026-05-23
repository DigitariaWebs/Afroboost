# AfroBoost — Marketing Landing Page

The public-facing marketing site for the AfroBoost mobile app. Built to drive App Store / Google Play downloads.

## Stack

- **Next.js 15** (App Router, static-friendly)
- **TypeScript**
- **Tailwind CSS v3** — extended with the mobile app's dark color tokens
- **next-intl** — FR (default) / EN with `localePrefix: 'as-needed'`
- **lucide-react** for icons

## Local development

```bash
cd web
npm install
npm run dev
```

Open `http://localhost:3000` (French is the default). EN at `http://localhost:3000/en`.

## Production build

```bash
npm run build
npm run start
```

## Project layout

```
web/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx              # html/body, fonts, metadata
│  │  ├─ globals.css             # tailwind base + kente texture
│  │  ├─ sitemap.ts / robots.ts
│  │  └─ [locale]/
│  │     ├─ layout.tsx           # NextIntlClientProvider + chrome
│  │     ├─ page.tsx             # composes all sections
│  │     └─ not-found.tsx
│  ├─ components/                # primitives (Button, GlowCard, AIOrb, …)
│  ├─ sections/                  # page sections (Hero, Pricing, FAQ, …)
│  ├─ lib/                       # theme tokens, i18n config
│  ├─ messages/{fr,en}.json      # all marketing copy
│  └─ middleware.ts              # next-intl locale routing
├─ public/                       # logo, favicon, demo GIFs
├─ tailwind.config.ts            # dark theme — colors mirror src/lib/theme/colors.ts in mobile app
└─ next.config.mjs               # next-intl plugin
```

## Brand fidelity

This site is a continuation of the mobile app's brand language. All color tokens come from `../src/lib/theme/colors.ts` (mobile app). If those tokens change in the app, update `web/tailwind.config.ts` and `web/src/lib/theme.ts` to match.

Key tokens:

- Background `#0E1A14`, surface `#15221C`, surface-elevated `#1A2B22`
- Primary emerald `#1F8A55`, accent gold `#E8B84A`, deep plum `#5B2A4F`
- Fonts: Instrument Serif (display) + Inter (body)
- Radii 22px on cards, 18px on buttons, pill (full) on CTAs

## Things to swap before launch

These are placeholders flagged with `TODO` in source:

- **App Store URL** — `src/components/StoreBadges.tsx` → `APP_STORE_URL`
- **Google Play URL** — `src/components/StoreBadges.tsx` → `GOOGLE_PLAY_URL`
- **Testimonials** — `src/sections/Testimonials.tsx` (placeholder quotes)
- **Founder photos** — `src/sections/Founders.tsx` currently uses initials
- **OG image** — drop a `public/og-image.png` (1200×630) and reference in `app/layout.tsx`
- **Sitemap base URL** — `src/app/sitemap.ts` and `src/app/robots.ts` use `https://afroboost.app`
- **Analytics** — no provider wired; add GA4 / Plausible / Posthog in `app/layout.tsx` when ready

## Accessibility & motion

- Honors `prefers-reduced-motion` (orb stops rotating, transitions disabled)
- Focus rings use accent gold (`#E8B84A`)
- Color contrast checked at AA on dark surfaces

## Deploy

Vercel: import the `web/` folder as the project root. No env vars needed for the static build.
