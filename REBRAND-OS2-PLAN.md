# Plan: Restyle the Mintlify docs to the os2 brand system

> **Status (2026-08-03):** Visual port largely landed — `style.css`, `docs.json`
> colors/background, logos, snippets, and homepage utilities follow os2.
> `AGENTS.md` brand rules now bind to os2 (site `DESIGN.md` is source of truth).
> Remaining work: Typekit domain QA, casing corpus pass (`CASING-QA-PLAN.md`),
> and light/dark visual QA against the live marketing site. Treat this file as
> the migration log + residual checklist, not as "docs still look neobrutalist."

## The diagnosis

The docs were previously styled with the **retired** OpenSubs brand ("neobrutalism v2",
archived in the site repo at `design/DESIGN-legacy.md`): pure `#000` ink, uppercase
H1s, square corners, rotated stickers, system sans everywhere.

The main site (`opensubs-new-site/opensubs-site`) now runs the **os2 system** —
warm, confident, editorial:

| Axis | Legacy (docs today) | os2 (site, target) |
| --- | --- | --- |
| Ink | `#000000` | `#1A150C` (warm, never pure black) |
| Paper | `#FFFFFF` | `#FBFBFB` |
| Yellow | `#FFDE00` | `#FFDE01` (+ band variants `#FEE102`/`#FEE300`) |
| Dark surface | `#000` | `#211C11` warm charcoal, headings `#FFF8E8`, body `#D9D2C3` |
| Headings | system sans, 900, UPPERCASE | **New Kansas** serif, 500 Medium, sentence case |
| Body | system sans 450 | **Inter** (variable) 435, `line-height: 1.7`, `-0.005em` |
| Wordmark/chips | n/a | **Google Sans Flex** 700 |
| Corners | radius 0 everywhere | pill 72 / card 44 / panel 28 / mega 20 / item 12 |
| Borders | 3px black on everything | hairline `rgba(26,21,12,0.1)`; 2.5–3px black only on pills/chips/panels |
| Shadows | hard black offsets on everything | hard offsets **only** as sticker language (pill hover `3px 3px 0 #000`, panel `4px 4px 0 #000`) |
| Accent surfaces | candy (lime/peach/salmon/purple) | pastel wells: cream `#FEF8CE`, mint `#D6FEEC`, lavender `#F9EEFF`, green `#CDFFCF`; hover wash `#F6F3ED` |
| Motion | `ease` 150–175ms | `cubic-bezier(0.16, 1, 0.3, 1)` 180–350ms |

Sources of truth (site repo):
- `src/styles/os2/tokens.css` — all `--nh2-*` tokens (port verbatim)
- `src/styles/os2/base.css` — ground, type ramp, focus rings
- `src/styles/os2/components.css` — pill/chip/panel/card/table/accordion recipes
- `DESIGN.md` — binding rules (sentence case, font smoothing, no fluid type, etc.)

Blast radius in the docs repo (small):
- `style.css` — full rewrite (the bulk of the work)
- `docs.json` — colors, background, fonts, styling
- `logo/light.svg`, `logo/dark.svg`, `favicon.svg` — rebuild as os2 wordmark
- `index.mdx` + `_brand-lab.mdx` — only pages using legacy `os-*` utility classes
- `snippets/InOpenSubs.jsx`, `snippets/PlatformTag.jsx` — inline legacy styles

---

## Phase 0 — Prep & unblock (do first)

1. **Adobe Fonts licensing check (the one real blocker).** New Kansas loads from
   Typekit kit `hsb4lyn` (`https://use.typekit.net/hsb4lyn.css`), and Typekit kits
   are domain-whitelisted. Confirm the kit's domain list includes
   `insiders.opensubs.com` **and** `localhost` (for `mint dev`). If not, add them
   in the Adobe Fonts dashboard. Fallback chain if a page loads before/without the
   kit: `Georgia, "Times New Roman", serif` (same as the site).
2. **Verify CSS injection mechanics.** Mintlify loads any `.css` file in the repo.
   Confirm `@import url(...)` at the top of `style.css` actually fetches the three
   font sources (Typekit + Inter + Google Sans Flex) in the built page. If
   `@import` is stripped, plan B: load Inter/Google Sans Flex via `docs.json`
   `fonts` config and pull New Kansas woff2 URLs from the kit CSS directly as
   `@font-face` rules.
3. **Re-verify DOM hooks.** The current `style.css` header says selectors were
   "verified against live DOM 2026-07-04". Re-check the key hooks against today's
   sequoia-theme DOM with the running dev server (`#navbar`, `.nav-tabs-item`,
   `#sidebar-content`, `.card`, `.callout`, `[data-table-wrapper]`,
   `pagination-*`, `toc-item`) before writing new rules against them.
4. **Before screenshots.** Capture light+dark screenshots of ~6 representative
   pages (home, a lesson page, a deploy page, `_brand-lab`) for comparison.

## Phase 1 — `docs.json` (native theming first, CSS second)

Change only what the config can express natively; everything else goes to CSS.

```jsonc
"colors": {
  "primary": "#1A150C",   // links/accents on light: ink
  "light":   "#FFDE01",   // accent in dark mode: brand yellow
  "dark":    "#1A150C"
},
"background": {
  "color": { "light": "#FBFBFB", "dark": "#211C11" }  // paper / warm charcoal
},
"fonts": { "body": { "family": "Inter" } }             // if supported natively; else CSS
```

- Keep `theme: "sequoia"`, light-first `appearance`, `codeblocks: "dark"`.
- Keep navigation/tabs/redirects untouched — this is a reskin, not an IA change.
- `favicon`: replace with the site's `public/favicon.svg` (yellow tile, 6px black
  stroke, "OS").

## Phase 2 — Rebuild the brand assets

- **Logo (`logo/light.svg`, `logo/dark.svg`).** The site wordmark is live text
  `OPEN SUBS` in Google Sans Flex 700, tight `-0.05em`-ish tracking, rotated
  −2°, ink on light. Rebuild the SVGs to match — **convert text to outlines**
  (don't depend on the font being loaded inside an `<img>` SVG, where webfonts
  never apply). Dark variant: `#FFF8E8` text on transparent.
- Copy `public/nh2/arrow-right.svg` from the site repo into `images/` (or inline
  as a data URI) for the pill caret hover.
- Mascots already exist in `images/mascots/` — reuse for the homepage.

## Phase 3 — Rewrite `style.css` (the core)

Structure the new file exactly like the site's system, in this order:

### 3.1 Tokens
Port the `--nh2-*` block from `tokens.css` verbatim onto `:root` (drop the
`[data-os2]` scoping — the whole docs site opts in). Add dark-mode overrides on
`html.dark`: ground `#211C11`, heading `#FFF8E8`, body `#D9D2C3`, hairline
`rgba(255,248,232,0.12)`.

### 3.2 Ground & type ramp
- Body: Inter, weight 435, `line-height: 1.7`, `letter-spacing: -0.005em`,
  `-webkit-font-smoothing: antialiased`, `font-synthesis: none`.
- Headings (`h1–h3`, `#page-title`): New Kansas, **weight 500**, `line-height 1.1`,
  `letter-spacing: -0.02em`, `-webkit-font-smoothing: auto` (DESIGN.md rule),
  `text-wrap: balance`. **Remove all `text-transform: uppercase`.** Fixed sizes
  stepped at 1100/760 (docs scale, one notch below marketing): h1 ~40px,
  h2 ~28px, h3 ~22px.
- `::selection`: yellow on ink (site rule), inverse in dark.
- Focus rings: 3px ink outline, 3px offset (yellow on dark surfaces).

### 3.3 Chrome (navbar, tabs, search, CTA)
- Navbar: paper ground with hairline bottom border (kill the yellow band + 3px
  black rule). Optionally the site's frosted-nav treatment if sequoia's DOM
  allows a `backdrop-filter`.
- Nav links: Inter 500, 15px, ink; hover = `--nh2-menu-hover` wash, not underline.
- Tab strip: quiet — active tab ink with a 2px ink underline; drop the 900
  weights.
- Search bar: pill radius, white, hairline border; subtle hover; no hard shadow.
- CTA button ("Talk to us"): the **nh2-pill recipe** — ink pill, radius 72,
  Inter 500; hover → yellow fill, 2px black stroke, `2px 2px 0 #000` sticker
  shadow, `translate(-1px,-1px)`, caret slides in; active → press down. This is
  the one place the sticker language lives in the chrome.

### 3.4 Sidebar & TOC
- Group headers: Inter 600, 12–13px, sentence case (drop uppercase), ink at 76%.
- Items: radius `--nh2-r-item` (12px); hover `--nh2-menu-hover` (`#F6F3ED`);
  active page: yellow fill, ink text, weight 550, **no border, no shadow, no
  rotation** — highlighter, not sticker.
- TOC: keep the chevron concept but hairline-quiet; active weight 550.

### 3.5 Content components
- **Links in prose:** ink, weight 550, 2px underline; hover = yellow highlight
  wash (keep — it matches os2's yellow-as-accent rule).
- **Cards:** white, radius `--nh2-r-panel` (28px — docs scale; 44 is too big for
  card grids), **hairline border**, no default shadow; hover = `translateY(-2px)`
  with the os2 ease + hairline darkens. Card titles New Kansas 500.
- **Callouts:** pastel wells, radius `--nh2-r-mega` (20px), hairline border, no
  shadow, ink text: note/info → cream `#FEF8CE`; tip/check → green `#CDFFCF`;
  warning → mint→ no — warning gets a warm manila (derive from yellow at low
  saturation, e.g. `#FEF3C7`-adjacent within the warm family); danger → lavender
  is wrong for danger, so introduce one warm derived tone (e.g. `#FFE8DE`) and
  document it as a docs-only extension token (`--nh2-well-danger`).
- **Code blocks:** warm charcoal `#211C11` ground (never `#000`), radius 20px,
  no border/shadow; active tab = 2px yellow underline.
- **Tables:** the `nh2-table` recipe — hairline border, radius 20px, white bg,
  `overflow: hidden`; header row: Inter 600 ink on `--nh2-gray-band` `#F0EEEC`
  (kill the inverted black header); row hairline dividers; keep an
  `os-compare-us` → cream-well remap.
- **Accordions/Tabs/Frames:** hairline dividers and borders, radii 12–20px,
  hover wash; drop all hard shadows.
- **Pagination prev/next:** quiet panels — hairline border, radius 20px, hover
  lift with os2 ease (no press-shadow).
- **Sidebar tags (`tag: NEW` pills):** the **nh2-chip** recipe, miniaturized:
  yellow, black stroke, fully-round, Google Sans Flex 700 — no rotation.

### 3.6 Legacy utility remap (content compatibility)
`index.mdx` and `_brand-lab.mdx` are the only pages using `os-*` classes. Keep
the class names working but restyle them in place so nothing breaks mid-migration:
- `os-sticker` → nh2-chip look (rotation only on the sticker, ±2° max)
- `os-hero-box` / `os-hero-yellow` → `nh2-panel` (3px black border, radius 28,
  `4px 4px 0 #000`) — panels legitimately keep the hard shadow in os2
- `os-box-lime/peach/mint/salmon` → the four pastel wells (cream/mint/lavender/green)
- `os-press` → pill-style hover translate with os2 ease
- `os-tilt-*`, `os-shadow-*` → keep, retuned (±2°, panel shadow)

### 3.7 Dark mode
Warm charcoal system per os2's dark band: ground `#211C11`, headings `#FFF8E8`,
body `#D9D2C3`, yellow accents unchanged, hairlines at 12% cream. Pastel wells
in dark: keep well colors but ink text (wells are light surfaces by design), or
mute to 15% tints — decide visually at QA. **No pure `#000` anywhere.**

## Phase 4 — Content & snippets

- `snippets/InOpenSubs.jsx`: restyle inline styles → cream well `#FEF8CE`,
  hairline border, radius 20px; label becomes an nh2-chip.
- `snippets/PlatformTag.jsx`: nh2-chip, no rotation.
- `index.mdx` (homepage): rework the hero to the os2 register — yellow hero band
  (`#FEE102`), New Kansas sentence-case headline, mascot art from
  `images/mascots/`, pill CTA. This is the highest-visibility page; do it last,
  after the system CSS is proven.
- `_brand-lab.mdx`: update to document the *new* system — it becomes the QA
  harness page showing every styled component.

## Phase 5 — QA

1. `mint dev` + browser pass (Chrome DevTools MCP) over: home, one page per tab,
   `_brand-lab`, in **light + dark**, at desktop / 1100 / 760 / 390 widths.
2. Font verification: New Kansas actually renders (not Georgia fallback);
   Inter at 435 (variable axis working); no synthesized bold.
3. Component sweep on `_brand-lab`: cards, callouts (all 5 types), code groups,
   tables, accordions, tabs, steps, pagination, sidebar states, search modal.
4. Side-by-side with the real site (localhost:3000/3001) — chrome, type ramp,
   and yellow usage should read as one brand.
5. Regression: KaTeX `$` escaping untouched (content files are not edited except
   `index.mdx`); redirects and navigation untouched.

## Order of work & checkpoints

1. Phase 0 (blockers) → 2. docs.json + fonts loading proven → 3. tokens/ground/
type (checkpoint screenshot: typography reads as os2) → 4. chrome + sidebar
(checkpoint: shell reads as os2) → 5. content components → 6. legacy remap +
snippets → 7. homepage hero → 8. full QA pass.

## Risks

- **Typekit domain whitelist** — New Kansas silently falls back to Georgia if
  `insiders.opensubs.com`/`localhost` aren't on kit `hsb4lyn`. Check first.
- **Mintlify DOM churn** — sequoia's internals aren't a public API; every hook
  must be re-verified against the live DOM, and `!important` kept to the minimum
  that beats Tailwind utility specificity.
- **`@import` in injected CSS** — if Mintlify inlines `style.css` after other
  sheets, `@import` may be ignored (spec: must precede all rules). Verify early;
  fall back to `@font-face` with direct woff2 URLs.
- **Radii scale** — os2's marketing radii (44px cards) are tuned for big
  surfaces; docs components are smaller, so the plan steps radii down one notch.
  Judge at QA against the site side-by-side.
