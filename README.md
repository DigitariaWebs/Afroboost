# AfroBoost — Mobile prototype

Frontend-only Expo prototype for **AfroBoost**, a B2B SaaS for Afro-Caribbean entrepreneurs in Quebec (restaurants, bars, grocery-restaurants, solo entrepreneurs). Built to validate UX/design with the client (Patrick) before any backend work.

> ⚠️ **Everything is mocked.** No real APIs, no real auth, no real OAuth, no real payments. All data lives in `src/mocks/` and every async call goes through `src/lib/mock-api.ts`.

## Visual identity (v2 redesign)

- **Mood:** Premium editorial · data cockpit (Revolut / Mercury reference)
- **Theme:** Dark-first jewel palette — obsidian `#0E1A14`, emerald `#1F8A55`, gold `#E5B040`, plum `#5B2A4F`
- **Typography:** Instrument Serif for display/headlines + tabular metrics, Inter for UI body
- **Shape:** Soft 16–24px radii, pill CTAs, hairline borders
- **Cultural ID:** Faint kente-inspired SVG texture on hero/empty surfaces only
- **Signature:** The **AI Orb** — animated emerald-gold radial gradient that surfaces wherever the agent acts (nav FAB, assistant header, agent test sheet, AI message avatars)
- **Nav:** Custom floating pill bar with center sparkle FAB → opens an action sheet (Generate post / Add customer / Ask the assistant)
- **Motion:** Numerical count-up on KPIs (`AnimatedNumber`), Sparkline draw-in, MiniBarChart staggered bars, sheet spring + iOS blur backdrop, AIOrb pulse + slow rotate

## Run

```bash
npm install
npx expo start
# press i (iOS), a (Android), or w (web)
```

Sign in with any email and password — the prototype accepts everything.

## Demo script (≈ 5 minutes)

1. **Sign up** with any email → choose any password (≥ 8 chars).
2. On **Plan select**, pick **Performance** ($97/mo) → tap **Continuer**.
3. **Payment mock** is pre-filled — tap **Démarrer mon essai**.
4. Walk through **Onboarding**:
   - Welcome video (placeholder) → Continuer.
   - Business profile (5 steps): type → name/address → hours → services → tone + languages.
   - Connect Facebook + Instagram (animated mock OAuth, ~1.2 s loader → ✓ Connecté).
   - Connect Google Business → Skip or connect.
   - Connect Calendar → Skip or connect.
   - Train agent → tap **🎙️ Tester mon agent** to see the waveform + transcript animation.
   - Done → animated checkmark → **Découvrir l’application**.
5. **Home tab** — see today's stats, this week's recap, quick actions, usage bars, activity feed.
6. **Content** → tap **+ Générer**:
   - Pick a template, write a prompt, choose tone + channels.
   - Watch skeleton → image fade-in + typewriter caption.
   - Tap **Approuver** → **Programmer** → pick a date/time → **Confirmer**.
7. **Inbox** — filter chips along the top.
   - Tap any conversation → reply, or tap ✨ to get an AI-suggested reply.
   - Tap the 📞 Appels filter → call list with transcripts.
   - Tap ⭐ Avis Google → approve or edit AI-drafted replies.
8. **Assistant**:
   - **Chat** tab — tap a quick prompt or ask "Comment va mon business cette semaine ?". Answer streams in with a chart attachment.
   - **Rapport hebdo** — full weekly report with mini bar chart, wins, watch-outs, recommended actions (checkbox-able).
   - **Formulaire guidé** — 4-question survey → animated analysis → 5 personalized recommendations.
9. **Clients (CRM)** — search, sort, tap a customer for **Profil / Historique / Notes**. Tap **+ Ajouter** to create one. Overflow menu has CSV import (3 s mock progress) and export.
10. **Settings** (avatar top-right of Home):
    - **Langue** — switch between Français and English live, then back.
    - **Comptes connectés** — toggle any integration; see the mock loader.
    - **Abonnement** — change plan, view invoices, attempt cancellation.
    - **Aide & FAQ** — chat with the (mocked) help bot using quick prompts.

## Project structure

```
afroboost/
├── app/                          # expo-router file-based routes
│   ├── _layout.tsx               # Root: providers (Theme, Query, i18n, GestureHandler, SafeArea, Toast)
│   ├── index.tsx                 # Splash redirect (auth → onboarding → tabs)
│   ├── (auth)/                   # welcome, sign-up, sign-in, forgot, plan-select, payment-mock
│   ├── (onboarding)/             # welcome-video, business-profile (5 steps), 3× connect, train-agent, done
│   ├── (tabs)/                   # Bottom-tab nav: home, content, inbox, assistant, crm
│   │   ├── content/              # feed/queue/scheduled/drafts, generate, schedule, [id]
│   │   ├── inbox/                # list with filter chips, [conversationId], calls, reviews
│   │   ├── assistant/            # chat, weekly-report, form-mode (also embeddable in tab switcher)
│   │   └── crm/                  # search/sort list, [customerId], add, import
│   └── settings/                 # 9 setting screens
└── src/
    ├── components/
    │   ├── ui/                   # 19 primitives (Button, Input, Card, Sheet, Toast, …)
    │   ├── domain/               # PlanCard, PostCard, MockOAuthButton, StatCard, UsageBar, …
    │   ├── animations/           # Waveform, AnimatedCheckmark
    │   └── layout/               # ScreenContainer, Header
    ├── stores/                   # zustand: auth, onboarding, settings, toast
    ├── mocks/                    # business, posts (32), conversations (25), customers (52), calls (14),
    │                             #   reviews (5), usage, decision-reports (2), notifications (5)
    ├── lib/
    │   ├── theme/                # colors (light/dark), typography (Inter), ThemeProvider
    │   ├── i18n/                 # i18next + locales/fr.json + en.json (full coverage)
    │   ├── mock-api.ts           # mockDelay/mockMutation/mockQuery
    │   └── utils.ts              # cn, formatDate, formatRelative, genId
    └── types/                    # Shared TypeScript types
```

## Tech stack

- **Expo SDK 55** + **React Native 0.83.6** + **React 19.2** + **TypeScript** (strict)
- **expo-router 6** — file-based routing
- **zustand** — auth/onboarding/settings/toast stores
- **@tanstack/react-query** — wired in providers (mock fetchers can use it)
- **i18next** + **expo-localization** — FR (default for Québec) + EN
- **react-hook-form** + **zod** — form validation
- **lucide-react-native** + **react-native-svg** — icons
- **react-native-reanimated v4** — press/scale, sheet, toast slide-down, waveform, checkmark, fade-up stagger
- **@expo-google-fonts/inter** — Inter family loaded at boot
- **date-fns** + `fr` locale — relative times, formatted dates

## Known limitations / deviations from the master prompt

- **NativeWind v4 not used.** The original spec calls for it; I went with theme tokens + `StyleSheet` via `useTheme()` instead. NativeWind v4's `react-native-css-interop` Metro pipeline has known friction with RN 0.81 + Reanimated 4, and rolling that out across 30+ screens would have eaten a lot of time without changing the visual fidelity. Switching to NativeWind later means swapping `style={{...}}` for `className=""`; the theme tokens are identical.
- **No real charts library.** The weekly report and assistant chat use a hand-rolled `MiniBarChart`. Swap in `victory-native` or `react-native-chart-kit` later.
- **Brand icons.** Lucide dropped its Facebook/Instagram glyphs; we use `ThumbsUp` and `Camera` colored to the brand palettes. Swap in proper SVG brand marks before any client demo if needed.
- **`react-native-confetti-cannon` skipped** on the onboarding "done" screen — the animated checkmark + spring is enough and avoids a heavy dep.
- **CSV import** is purely visual — no file picker. Acceptable for the demo (per spec).
- **Premium plan ($197)** is greyed out with "Bientôt disponible" — not selectable, as required.
- **Creole / Lingala / Soussou** show as selectable language chips with "à venir" badges; they don't yet swap UI strings.

## What's NOT here (out of scope per spec)

- No backend folder, no Supabase migrations, no API routes.
- No real network calls — every async goes through `mockDelay()` (800–1400 ms).
- No public end-customer interface — this is owner-only.
- No website builder / WordPress agent — explicitly excluded from MVP.
- No persistent storage between app launches (AsyncStorage is installed but unused; flip on for stores you want sticky).

## Next steps to wire to real APIs

When the prototype is validated, the highest-leverage user stories to wire first:

1. **US-1.1 / 1.2 / 1.3** — Real auth + Stripe checkout + cancellation. Easiest unlock for paying customers.
2. **US-3.3** — Real social content generation (Anthropic / OpenAI) and Meta Graph API publish/schedule.
3. **US-5.2** — Google Business Profile reviews + AI-drafted replies (mostly server-side).
4. **US-4.2 / 4.7** — Twilio voice + AI agent with WhatsApp Business + intent extraction.
5. **US-6.1 / 6.2** — Decision assistant pulling from each business's real metrics.
