> For Mintlify product knowledge (components, configuration, writing standards),
> install the Mintlify skill: `npx skills add https://mintlify.com/docs`

# OpenSubs documentation — project instructions

## About this project

- OpenSubs docs, built on [Mintlify](https://mintlify.com). OpenSubs is a self-hosted Shopify subscription platform that charges 0% of subscription revenue, forever.
- Pages are MDX files with YAML frontmatter. Configuration lives in `docs.json`.
- Run `mint dev` to preview locally (requires Node LTS — the CLI refuses Node 25+).
- Run `mint broken-links` to check links.
- `_brand-lab.mdx` (hidden) is the component specimen page — check it after any styling change.
- Brand source of truth: the OpenSubs brand handoff (neobrutalism). Summary below is binding for docs work.

## Brand rules (binding)

- Palette: yellow `#FFDE00`, black `#000` ink/borders, white surfaces. Candy accents (lime `#C5F542`, peach `#FFD3B6`, mint `#A8E6CF`, salmon `#FFAAA5`, red `#FF6B6B`) — ONE accent per surface. Purple `#9585D9` is reserved for mascots only.
- Hard offset shadows only. Never blurred, never rgba. No gradients, no glassmorphism, no emoji.
- Type: headings 800–900 weight, tight tracking. Body stays readable (450–500). Never invent an icon mark — the wordmark IS the logo.
- Sharp corners on cards, callouts, tables, code. Buttons may keep up to 8px radius.
- Icons: Lucide only (`icons.library` is set). No filled or duotone sets.

## Component conventions

- Callouts: use the TYPED components — `<Note>`, `<Info>`, `<Tip>`, `<Check>`, `<Warning>`, `<Danger>`. The brand CSS maps each type to its candy fill. Do NOT use generic `<Callout color=...>` for standard callouts (native color renders an off-brand alpha tint); generic Callout is for rare one-off accents only.
- Stickers/labels: `<Badge className="os-sticker">NEW</Badge>` (or `os-sticker os-sticker-alt` to tilt the other way).
- Us-vs-them tables: OpenSubs column cells get `class="os-compare-us"`.
- Changelog: `<Update>` components on a dedicated page; add `rss: true` frontmatter.
- Landing-style pages: `mode: custom` + the `os-hero-box` / `os-hero-yellow` / `os-press` / `os-shadow*` utilities from `style.css`.

## Voice

- Confident challenger, second person, punchy fragments, concrete numbers. "Stop paying rent."
- Jokes live in page intros, section leads, the 404, and empty states — NEVER in procedure steps or API reference. Reference content is bone-dry.
- No emoji. Full stops as rhythm. Sentence case headings (page H1s may be uppercase — CSS handles that).
- Every number must be real. No fabricated stats, ever.

## Terminology

- "OpenSubs" (one word, capital O capital S) — never "Open Subs" in prose (the wordmark renders it spaced; prose does not).
- "merchant" not "customer" (customers are the merchant's subscribers).
- "subscriber" for the end consumer.
- Incumbents referred to by name (Skio, Recharge, Stay AI) only when the context is migration or comparison.

## Content boundaries

- Do not document internal WayFX/Luna history — OpenSubs docs start at OpenSubs.
- No pricing figures in docs without a corpus source; pricing lives on the marketing site.
- Externally visible changes (anything that deploys) require Josh's approval before push to main.

## Navigation taxonomy (LOCKED 2026-07-04)

Four tabs, this order: **Start here · Scripts · Platform · Growth Program**.
These are the product's part names — they match the marketing site verbatim.
- Prose refers to sections by these names: "the Scripts", "the Platform",
  "the Growth Program". NEVER the old task names ("the instant win",
  "the curtain", "the school") — those survive only in URLs (/instant-win/,
  /curtain/, /school/), which are Phase-2 work and not to be renamed without
  explicit direction.
- Shelf order tells the money story (save → own → grow); personal routing
  lives in /start/choose-your-door and the Growth Program orientation triage.
- Directory→tab map: start/→Start here · instant-win/→Scripts ·
  curtain/+deploy/+migrate/+operate/→Platform · school/→Growth Program.
