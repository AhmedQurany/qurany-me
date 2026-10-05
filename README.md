# qurany.me — v2

Ahmed Qurany's portfolio, rebuilt around real experience and the "Qurany Branding"
positioning: one designer who sees the whole system — strategy, interface, and build.

Next.js 14 (App Router) · Tailwind CSS · TypeScript. Three runtime dependencies, fully static.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint && npm run typecheck
```

## Where things live

- `content/profile.ts` — **all copy and data**: hero, experience timeline, projects,
  ventures, skills, clients, contact links. Edit this file, not the components.
- `components/sections.tsx` — homepage sections, in trust order:
  Hero → Problem → Process → Edge → Experience → Work → UDL → Clients → CTA.
- `components/ProblemPile.tsx` — the "scattered problems → one system" animation.
- `app/cv/` — printable one-page CV built from the same data (Print / Save PDF).
- `app/opengraph-image.tsx`, `app/icon.svg`, `app/sitemap.ts`, `app/robots.ts` — SEO.

## Deploying on Vercel

Import the repo with default Next.js settings — no extra configuration needed.
