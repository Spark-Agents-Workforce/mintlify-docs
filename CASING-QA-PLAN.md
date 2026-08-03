# QA review: typed all-caps in the docs corpus — findings & fix plan

## What the first pass missed

The rebrand pass removed all *CSS-applied* uppercase (`text-transform` in
inline styles and Tailwind `uppercase` classes). But a large amount of caps is
**typed directly into the content** — emphasis shouting ("in YOUR logs",
"**WHAT WE NEVER TOUCH:**"), verdict labels ("KEEP / CUT"), and worksheet
headers ("STEP 1  SET THE TWO NUMBERS"). CSS can't fix typed caps.

**The binding rule (site `DESIGN.md` + docs `AGENTS.md`):** sentence case, never
all-caps. Emphasis is carried by weight (bold/550–600) or italics — never by
capital letters. The only all-caps string in the entire brand is the `OPEN SUBS`
wordmark.

## Inventory (verified by corpus scan, code fences separated)

- **118 prose lines across 40 files** with typed caps (excludes acronyms,
  hex codes, `[PLACEHOLDER]` tokens, comments).
- **~180 lines inside ```text code-fence "artifact" worksheets** in 25 files
  (STEP headers, INPUTS/OUTPUTS, YES/NO decision branches).

## Categories & treatment rules

### A. Mid-sentence emphasis caps (~60 instances) — FIX
`YOUR`, `NOT`, `ONE`, `WAS`, `IS`, `ONLY`, `BEFORE`, `AND`, `ALL`, `MORE`,
`ZERO`, `END`, `FIRST`, `LAST`, `CAN`, `OWN`, `SAME`, `CAUSE`, `RITUAL`…

Treatment: lowercase + italics — `in YOUR logs` → `in *your* logs`;
`it CAN add` → `it *can* add`. Where the word already sits inside a bold
phrase, use bold-italic (`**…*your*…**` is redundant — just lowercase it;
the bold already carries the stress) → rule: **inside bold, lowercase with
no extra marker; in plain prose, lowercase + italics.**

### B. Bold structural labels (~25 instances) — FIX
`**WEEKLY — …**`, `**MONTHLY**`, `**QUARTERLY**`, `**WE ARE**`,
`**WE ARE NOT**`, `**WHAT WE TAKE:**`, `**WHAT WE NEVER TOUCH:**`,
`**YOUR NUMBER**`, `**[THE SCRIPTS]**`-style list leads (welcome.mdx),
`**GWP**` expansion.

Treatment: sentence case, keep bold: `**Weekly — the dashboard…**`,
`**We are not**`, `**[The scripts]**`, `**Your number**`.

### C. Table verdict / decision labels (~12 instances) — FIX
`KEEP`, `CUT / redesign`, `AUDIT` (perks-and-loyalty), `GO`, `NO-GO`,
`NOT-YET` (memberships), `NO-READ` (testing-calendar).

Treatment: sentence case bold: `**Keep**`, `**Cut / redesign**`, `**Audit**`,
`**Go**`, `**No-go**`, `**Not yet**`, "no-read window" in running text.

### D. Headings (2 instances) — FIX
`## When NOT to run a membership` → `## When not to run a membership`;
`## What NOT to send` → `## What not to send`. (Heading rule: no caps
emphasis at all — the serif display does the talking.)

### E. Step titles / component props (~4 instances) — FIX
`<Step title="…whose FIRST order falls…">`, `<Step title="…window's END
date">`, `<Step title="Move ONE dial…">` → sentence case.

### F. Code-fence artifact worksheets (~180 lines, 25 files) — FIX, carefully
The printable one-pagers (` ```text ` blocks) use caps section headers:
`STEP 1  SET THE TWO NUMBERS`, `INPUTS`, `THE DECISION TREE`, `YES →` /
`NO →` branches.

Treatment: sentence-case headers while **preserving column alignment and
dotted leaders** (these blocks are whitespace-art; length changes must be
re-padded): `Step 1 — Set the two numbers`, `Inputs`, `Yes →` / `No →`.
Manual, file-by-file — not a blind regex. Same-length substitutions where
possible.

### G. Deliberate carve-outs — DO NOT TOUCH
1. **`[PLACEHOLDER]` tokens** in negotiation scripts (`[NAME]`, `[BRAND]`,
   `[TARGET RATE]`, `[DATE]`) — functional fill-in slots; caps signal
   "replace me". Convention kept.
2. **Acronyms** — LTV, AOV, CFO, GWP, BFCM, P&L, SMS, etc.
3. **Email header labels** in script blocks — `TO:`, `CC:`, `SUBJECT:` are
   email conventions (but `SUBJECT LINE MATTERS` prose around them gets
   sentence-cased).
4. **Image `alt` text** describing in-art signage (`FEES FEES FEES`, `PAID`,
   `BILL`) — the artwork actually shows those words; alt text describes it
   and never renders visibly.
5. **JSX comments** (`{/* HERO */}`) — invisible.
6. **`OPEN SUBS` wordmark** — the one sanctioned all-caps string.

## Execution order

1. **Category A–E (prose)** — scripted pass with a reviewed word-list per
   file (the scan output is the worklist), then manual read of every diff
   hunk. ~40 files. The ambiguous ones (does lowercase change meaning?) get
   individual judgment — e.g. `WAS a retention flow` → `*was* a retention
   flow` keeps the reveal-beat.
2. **Category F (artifacts)** — manual pass over the 25 worksheet blocks,
   re-padding alignment after each header change.
3. **QA re-scan** — re-run the corpus scanner; expected residue: carve-outs
   only (placeholders, acronyms, email headers, alt text).
4. **Browser spot-check** — welcome, orientation, one artifact-heavy lesson
   (first-order-incentives), the scripts page, light + dark.

## Risks / judgment calls

- **Voice flattening**: these caps are the author's spoken-word stresses.
  Italics preserve the beat in a brand-legal way, but a few lines may read
  softer. Where a stress genuinely matters, italic is the tool the site
  itself uses.
- **Artifact whitespace**: the ```text worksheets align with spaces; every
  header edit must preserve the visual grid (checked by eye per block).
- **`_lab-scripts.mdx` / `_brand-lab.mdx`**: hidden lab pages — included in
  the pass so future copies inherit the correct register.
