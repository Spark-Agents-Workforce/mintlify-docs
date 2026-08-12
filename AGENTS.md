> For Mintlify product knowledge (components, configuration, writing standards),
> install the Mintlify skill: `npx skills add https://mintlify.com/docs`

# OpenSubs documentation — project instructions

## About this project

- OpenSubs docs, built on [Mintlify](https://mintlify.com). OpenSubs is a self-hosted Shopify subscription platform that charges 0% of subscription revenue, forever.
- Pages are MDX files with YAML frontmatter. Configuration lives in `docs.json`.
- Run `mint dev` to preview locally (requires Node LTS — the CLI refuses Node 25+).
- Run `mint broken-links` to check links.
- `_brand-lab.mdx` (hidden) is the component specimen page — check it after any styling change.
- Brand system: **os2** (warm editorial). Docs CSS is in `style.css`. The binding source of truth is the marketing site at `opensubs-new-site/opensubs-site` — especially `DESIGN.md` and `src/styles/os2/` (`tokens.css`, `base.css`, `components.css`). The retired neobrutalist system is archived there as `design/DESIGN-legacy.md` — do not follow it.

## Brand rules (binding — os2)

Register: warm, confident, editorial. New Kansas serif headlines in sentence case, quiet Inter body, yellow as band and accent. Mascots carry the playfulness so the chrome doesn't have to.

### Color

| Token | Value | Use |
| --- | --- | --- |
| `--nh2-bg` | `#FBFBFB` | Page / paper |
| `--nh2-yellow` | `#FFDE01` | Accents, chips, active sidebar, selection |
| `--nh2-yellow-hero` | `#FEE102` | Hero / yellow bands (one step warmer) |
| `--nh2-yellow-growth` | `#FEE300` | Growth / door bands |
| `--nh2-ink` | `#1A150C` | Text, pills, borders on sticker surfaces — **never pure `#000` for ink** |
| `--nh2-dark` | `#211C11` | Dark bands / code ground (warm charcoal) |
| `--nh2-dark-heading` | `#FFF8E8` | Headings on dark |
| `--nh2-dark-body` | `#D9D2C3` | Body on dark |
| `--nh2-body-muted` | `rgba(26,21,12,0.76)` | Secondary body on light |
| `--nh2-gray-band` | `#F0EEEC` | Warm gray band / table headers |
| `--nh2-hairline` | `rgba(26,21,12,0.1)` | 1px rules, quiet borders |
| `--nh2-menu-hover` | `#F6F3ED` | Hover / press wash |
| `--nh2-well-pie` | `#FEF8CE` | Cream well |
| `--nh2-well-engineer` | `#D6FEEC` | Mint well |
| `--nh2-well-analyst` | `#F9EEFF` | Lavender well |
| `--nh2-well-bank` | `#CDFFCF` | Green well |

Docs-only extensions (os2 has no warning/danger surfaces; stay in the warm family):

- `--nh2-well-warning` `#FDF0C2` — manila (Warning callouts)
- `--nh2-well-danger` `#FFE4D9` — warm clay (Danger callouts)

Rules:

- Warm neutrals only — no pure black ink, no cool grays.
- Pastel wells: **one hue per surface**.
- Hard black offset shadows are a **quote from the old brand** — only on wordmark/chips, outlined artifact panels (`.os-hero-box` / `nh2-panel`), and pill sticker hover. Everything else: hairline or none. Soft layered `rgba` shadows are allowed for chrome overlays (site mega-menu pattern); do not spray them on content cards.
- No gradients as brand decoration, no glassmorphism as a content look, no emoji.
- Never invent an icon mark — the wordmark **is** the logo (`OPEN SUBS` in Google Sans Flex; prose writes "OpenSubs").

### Typography

| Role | Face | Weight | Notes |
| --- | --- | --- | --- |
| Display (h1–h3) | `new-kansas` (Adobe kit `hsb4lyn`) | **500 Medium** | Sentence case, never all-caps. No terminal period on single-sentence headings. `-webkit-font-smoothing: auto` on display. |
| Body / UI | `Inter` (variable) | 435 body · 500 UI/buttons · 550–600 emphasis | `line-height: 1.7`, tracking `-0.005em`, `antialiased` |
| Wordmark + chips | `Google Sans Flex` | 700 | Only for `OPEN SUBS` and eyebrow chips |

- `font-synthesis: none` — a missing weight must fail to Regular, never fake-bold.
- Display sizes in docs are stepped (one notch below marketing); never fluid `vw`.
- **Sentence case everywhere** — including page H1s. CSS must not force uppercase on prose. Exceptions: the wordmark (`OPEN SUBS`) and chips/eyebrows/stickers (CSS `text-transform: uppercase` — site `.nh2-chip` recipe). Typed prose stays sentence case. See `CASING-QA-PLAN.md` for corpus cleanup rules.

### Radii, borders, shadows (docs scale)

| Element | Radius | Border / shadow |
| --- | --- | --- |
| Pills / CTA | 72px | Sticker hover only (yellow fill + black stroke + hard offset) |
| Cards / callouts / code / tables | 20–28px | Hairline; no default hard shadow |
| Sidebar items | 12px | Wash hover; active = yellow highlighter fill |
| Artifact / hero panels (`.os-hero-box`) | 28px | 3px `#000` + `4px 4px 0 #000` (sanctioned hard shadow) |
| Chips / stickers | pill | 2–2.5px `#000` + hard drop-shadow |

Ease: `cubic-bezier(0.16, 1, 0.3, 1)` (~180–350ms).

### Icons

- Lucide only (`icons.library` is set in `docs.json`). No filled or duotone sets.

## Component conventions

- Callouts: use the TYPED components — `<Note>`, `<Info>`, `<Tip>`, `<Check>`, `<Warning>`, `<Danger>`. Brand CSS maps each type to a pastel well (cream / green / manila / clay). Do NOT use generic `<Callout color=...>` for standard callouts (native color renders an off-brand alpha tint); generic Callout is for rare one-off accents only, and then only with os2 well hexes.
- Chips / labels: page `eyebrow:`, `.os-chip`, `.os-sticker` share one recipe — yellow, 2.47px black stroke, Google Sans Flex 700, 16px / lh 0.8, pad 6×12, drop-shadow 2.57px, ALL CAPS. Stickers may tilt ±2°. Sidebar tags stay flat and slightly smaller. Never rely on Mintlify's default eyebrow (`h-5 text-xs`) — `style.css` overrides it.
- Platform / product callouts: `import { InOpenSubs } from "/snippets/InOpenSubs.jsx"` (cream well + chip). `PlatformTag` only renders for `platform="opensubs"`.
- Us-vs-them tables: OpenSubs column cells get `class="os-compare-us"` (cream well — site `nh2-table__ours-cell`). Markdown tables can't class their cells — put the OpenSubs column last and wrap the table in `<div className="os-compare-ours-last">` (rule in `style.css`).
- Changelog: `<Update>` on a dedicated page; add `rss: true` frontmatter.
- Landing-style pages: `mode: custom` + `os-hero-box` / `os-hero-yellow` / `os-pill` / `os-chip` / `os-press` / pastel `os-box-*` utilities from `style.css`. Hero yellow band uses `#FEE102` when matching site heroes.
- Prefer Mintlify built-ins (`<Card>`, `<Steps>`, `<Columns>`, typed callouts) over one-off HTML. When custom layout is required, use Tailwind v3 utility classes or os2 utility classes — not arbitrary new visual systems.

## Styling workflow

- Native branding first: `docs.json` (`colors`, `background`, `appearance`, `logo`, `favicon`, `styling.codeblocks`).
- Theme: `luma` (single-row topbar — centered section tabs, search + navbar links + CTA on the right). Theme toggle hidden via `appearance.strict: true` (light default).
- Deep chrome / component look: `style.css` (Mintlify auto-loads every `.css` file). DOM hooks verified against luma — re-check after Mintlify theme upgrades.
- Fonts load via `@import` in `style.css` (Typekit + Google Fonts). Typekit kit `hsb4lyn` must whitelist `insiders.opensubs.com` and `localhost` or New Kansas falls back to Georgia.
- After visual changes: open `_brand-lab.mdx` in light + dark before calling it done.
- When the marketing site changes a pattern in `DESIGN.md` / `src/styles/os2/`, port the token or recipe here in the same spirit — don't invent a docs-only look that drifts from the site.

## Voice

- Confident challenger, second person, punchy fragments, concrete numbers. "Stop paying rent."
- Jokes live in page intros, section leads, the 404, and empty states — NEVER in procedure steps or API reference. Reference content is bone-dry.
- No emoji. Full stops as rhythm. Sentence case headings (including H1).
- Emphasis by weight or italics — never by shouting in ALL CAPS.
- Every number must be real. No fabricated stats, ever.

## Terminology

- "OpenSubs" (one word, capital O capital S) — never "Open Subs" in prose (the wordmark renders it spaced; prose does not).
- "merchant" not "customer" (customers are the merchant's subscribers).
- "subscriber" for the end consumer.
- Incumbents referred to by name (Skio, Recharge, Stay AI) only when the context is migration or comparison.

## Content boundaries

- Do not document internal WayFX/Luna history — OpenSubs docs start at OpenSubs.
- No pricing figures in docs without a corpus source; pricing lives on the marketing site.

## Navigation taxonomy (LOCKED 2026-07-04; v2 staging addendum 2026-08-09)

Four tabs, this order: **Start here · Scripts · Platform · Growth Program** — plus a
TEMPORARY fifth tab **Growth Program v2** (JD direction, 2026-08-09): the rolling
recipe-form rewrite staged NEXT TO the original. Pages land under `growth-program-v2/`
as they are rebuilt; the original Growth Program tab stays untouched until cutover, then
v2 replaces it (redirects at cutover). Do not add new content to the OLD growth-program/
tree during the rewrite.
These are the product's part names — they match the marketing site verbatim.
- Prose refers to sections by these names: "the Scripts", "the Platform",
  "the Growth Program". NEVER the old task names ("the instant win",
  "the curtain", "the school") — those survive only in URLs (/instant-win/,
  /curtain/, /growth-program/), which are Phase-2 work and not to be renamed without
  explicit direction.
- Shelf order tells the money story (save → own → grow); personal routing
  lives in /start/welcome and the Growth Program orientation triage.
- Directory→tab map: start/→Start here · instant-win/→Scripts ·
  curtain/+deploy/+migrate/+operate/→Platform · growth-program/→Growth Program.

## Production content (do not re-stub)

- growth-program: 41/46 lessons are REAL content (tiers 1-3A staged 07-08):
  M1, M2, M3, M4, M5, M6, M7, M9, M10 ALL COMPLETE. Only M8 churn-defense
  (5 lessons) + the orientation hub remain skeleton — awaiting the M8 draft
  and the hub's production pass. M10.3 carries the
  school's CLOSE ("Run the rhythm. Keep everything." — tagline echo, JD-
  defaulted keep) + the ONE white-glove services line (taste line: never
  add pitch around it). checkout.mdx platform facts verified vs shopify.dev
  07-08 — re-verify before edits. Brand A ($50M+ consumables) / Brand B
  ($35M+ snacks, paid membership) naming is canon. Escape prose $ always. Phase-D staging — JD reads on-site;
  E-gates + practitioner (ops) correction on first-order-experience's
  physical layer come AFTER. Hedges (attribution≠incrementality, one-case)
  are curriculum — never strip them. Brand A/B anonymization is canon.
  Remaining GP pages are skeletons awaiting their module drafts.

- start/welcome ("You're in") — REAL content (JD's Start-Here draft, 07-07).
  GATED (public:true removed by JD ruling 07-07 — homepage alone carries the
  logged-out pitch; "You're in" lands after login). One-page walk-through;
  absorbed choose-your-door + first-24-hours (redirects in docs.json).
  Mascot slot held at page bottom for JD's thumbs-up pick. Placeholders
  render as honest one-liners — never fake readiness.

- instant-win/* — ALL SIX PAGES are REAL content (JD's Movement 1+2 drafts).
  Kit pages carry per-platform figures verified against published pricing at
  staging time. CFO memo staged in the kit (JD-approved via closer, 07-07).
  Scripts tab = 3 groups: THE STORY (4 chapters) / THE KIT (6) / THE CLOSE
  (go-collect — the ring-composition closer; answers the cold open's three
  questions). Year-2 delivery promise (Part 10) still awaits JD blessing.
- instant-win/why-you-have-leverage — REAL content (JD's draft, 2026-07-04).
  The Scripts tab's front door. JD-RULED 2026-07-07: the story runs as FOUR
  chapter pages (why-you-have-leverage -> the-history -> what-your-platform-does
  -> the-reveal), each ending in a next-chapter card. Never shorten to stubs;
  never merge back to one page; never break the chapter chain.
  curtain/why-the-percent-existed was absorbed (redirect in docs.json).
