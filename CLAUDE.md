# RTG (rule-the-globe)

Marketing website for RTG Agency ("Let your brand rule the globe"), a Lagos-based web/SEO/AI-search agency.

@AGENTS.md

## Repo

- GitHub: https://github.com/Ruletheglobe/rule-the-globe — **public**.
- Branch: `main`. Pushing to `main` redeploys GitHub Pages automatically.
- Never commit secrets: the repo is public. `.env*` is gitignored; `.env.example` is the only env file tracked.
- Don't commit or push unless asked.

## Stack

Next.js 16 (App Router, static export), React 19, Tailwind 4 (only the pipeline; styling is hand-written CSS), Three.js (hero globe), GSAP (scroll animations). Read `node_modules/next/dist/docs/` before writing Next.js code (see AGENTS.md).

## How the page is built

The site is a 1:1 port of a hand-written HTML page, so it is **not** idiomatic React:

- `app/body.html` — the page markup, injected with `dangerouslySetInnerHTML` in `app/page.tsx` (read from disk per render).
- `public/rtg.js` — the original vanilla JS (pricing, reviews, work grid, forms, etc.), loaded as a classic script. Inline `onclick="..."` handlers in the markup call its globals.
- `app/globals.css` — all styling. Later rules override earlier ones, and the file ends with appended blocks (brand colors, motion, perf, compare table). New CSS goes at the end.
- `app/HeroGlobe.tsx` — Three.js hero globe, mounts into `.hero .v4-globe`.
- `app/ScrollAnimations.tsx` — GSAP scroll reveals.
- `app/Interactions.tsx` — magnetic buttons, card tilt/spotlight, "Compare all plans" slide.

`public/rtg.js` renders parts of the page (work grid, reviews, pricing table) after load, so React components that need those elements poll for them.

## Brand

Primary lime `#9ce860`, secondary coral `#e25548`. Blend them through warm white, never directly (they go muddy). Fonts: Google Sans (headings), Geist / Geist Mono, Instrument Serif (italic accents). Google Sans tops out at weight 700.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` — static export to `out/`
- `npx tsc --noEmit` — typecheck

## Deploy

- GitHub Pages via `.github/workflows/deploy.yml`, served on the custom domain https://rtg.studio (DNS at Namecheap: four A records for @ to GitHub Pages, www CNAME to ruletheglobe.github.io). No base path. The old https://ruletheglobe.github.io/rule-the-globe/ redirects there.
- Email: Namecheap Private Email on rtg.studio (hello@, xica@, benn@). Webmail at privateemail.com.
- `netlify.toml` publishes `out/` for the Netlify site; no base path there either.
- Because it is a static export there is no server: the contact form currently only shows a toast. A Discord webhook must live behind a server function (not in client code, since the repo is public) — put the URL in `DISCORD_WEBHOOK_URL`, see `.env.example`.

## Gotchas

- `next.config.ts` has `output: "export"` — `cacheComponents` / PPR options are incompatible with it.
- The in-app Chrome tab throttles rendering; frame-rate measurements there are unreliable.
- Keep animations on the compositor (transforms/opacity). Animating gradients, filters or SVG turbulence caused scroll lag before.
