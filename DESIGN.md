# CP Tracker — Design System & Redesign Record

This document is the design contract for the CP Tracker dashboard. It records what the
product is, what was wrong, the direction chosen, and the rules every component follows.
Update it when the system changes so the code and the intent never drift apart.

---

## 1. The product

**What it is.** A single-page, static, publicly hosted record of one competitive
programmer's solved-problem history: 5,616 problems across 14 online judges, refreshed
daily by automation and verifiable click-by-click against live judge profiles.

**Who it is for.**

| Audience | Arrives asking | Needs |
| :-- | :-- | :-- |
| Recruiters / hiring managers | "Is this real and is this person strong?" | Trustworthy numbers, credentials, fast scan, verifiable links |
| ICPC teammates, coaches, peers | "What has he actually solved, and where?" | Per-judge breakdown, tier/rank, handles |
| The owner (Ahsanul Haque) | "Share my record and keep it current" | Share/embed affordances, live sync, low maintenance |

**Core workflows, in priority order**

1. **Credibility scan** — land, read the headline number and tier credentials, click through to a judge profile. Occurs in under 30 seconds.
2. **Breakdown inspection** — filter by category (contests / practice / national), read per-judge counts, tier and details.
3. **Comparison** — see how the 14 judges compare and how difficulty is distributed.
4. **Freshness check / refresh** — confirm the data is current, or trigger a live re-sync.
5. **Sharing** — copy the portfolio link or an embed badge for a CV, README, or chat.

**Non-goals.** Not a training log, not a problem recommender, not multi-user, not a
social feed. No accounts, no data entry, no server at runtime.

**Architecture.** `index.html` (structure) + `style.css` (design system) + `app.js`
(render, sync, share) + `config.json` (source of truth, written by `sync_server.py`
locally or the daily GitHub Action) + `assets/`. No build step, no framework, no runtime
dependency beyond two Google fonts.

---

## 2. Audit findings that drove the redesign

Measured with a scripted in-page audit (contrast, overflow, tap targets, token counts)
at 1440px and 500px, plus a full source read.

| Finding | Evidence | Severity |
| :-- | :-- | :-- |
| No typographic scale | **19 distinct font sizes** in use (15.2 / 14.08 / 13.12 / 12.8 / 12.48 / 12.16 / 11.84px all doing the same jobs) | High |
| Incoherent radius system | 7+ values: `8 / 10 / 12 / 14 / 20 / 24 / 9999px`, mixed arbitrarily | High |
| Contrast failure | `--text-dim` `#64748B` = **3.52–4.14:1** on the real surfaces (needs 4.5:1); the `.embed-hint` measured **4.31:1** | High (WCAG AA) |
| Invalid ARIA | `role="tablist"`/`role="tab"` on filter pills with **0 tabpanels** and no roving focus | High (a11y) |
| Decorative noise | 14 emoji in UI chrome, gradient text, 3 page-wide radial gradients, animated floating blob, glow on every card | High |
| Expensive rendering | **15 elements** with `backdrop-filter`, `background-attachment: fixed`, an infinite `hero-float` animation | High (perf) |
| Card slivers | Per-card progress bar measured against the single largest judge → 12 of 14 cards show near-empty bars that carry no extra information | Medium |
| Mislabeled chart | Panel titled "LeetCode & Codeforces Skill Tiers" plotted LeetCode difficulty alongside raw totals for AtCoder/CSES/Toph — and Codeforces was not in it | Medium |
| Redundant IA | Navbar and hero both stated name + headline; both charts restated the per-card counts | Medium |
| Duplicated data source | `DEFAULT_CONFIG` in `app.js` (~200 lines) duplicates `config.json`, which CI rewrites daily — guaranteed drift | Medium (maintainability) |
| Dead CSS | ~90 lines for `.modal-*`, `.form-*`, `.visually-hidden`, `.dot-sep` — no such DOM exists | Medium |
| Missing states | No loading, empty, or error state anywhere; a Chart.js CDN failure left two blank boxes with no explanation | Medium |
| Ragged rows | Card heights varied 263–281px within the grid | Low |
| Heavy asset | `avatar.png` = **887 KB (800×800)** rendered at 54px | Medium (perf) |
| Small targets | Footer links 20px tall (below the 24px WCAG 2.5.8 minimum) | Low |

**Preserved deliberately:** all 14 judges and their data, category filters, the
deduplicate-VJudge toggle, the animated count-up, live sync (local API + GitHub Pages
path), Codeforces peak-rating protection, share/embed helpers, SEO/OG metadata, and the
dark identity.

---

## 3. Design direction

> **A precision instrument, not a landing page.**

The strongest content on this page is numbers and credentials, so the interface should
behave like a well-built measurement tool: quiet surfaces, rigorous typography, one
accent, and colour reserved for meaning.

**Principles**

1. **Restraint reads as confidence.** One accent colour, monochrome surfaces, colour only where it encodes something (judge identity, difficulty, state).
2. **Numbers are the hero.** Tabular monospace numerals, right-sized, aligned; never decorated with glow.
3. **Hierarchy through type, not effects.** Weight, size and spacing do the work that gradients and shadows were doing.
4. **Every element earns its place.** No element may merely look impressive; if it carries no information it is removed.
5. **Trust is a feature.** Show data provenance, "last verified" time and working links to sources.
6. **States are part of the design.** Loading, busy, empty, error and success are designed, not defaulted.

---

## 4. Design system

### Colour

Dark, near-neutral ink. Verified against WCAG AA on every surface.

| Token | Value | Role | Contrast |
| :-- | :-- | :-- | :-- |
| `--ink` | `#08090C` | Page canvas | — |
| `--surface-1` | `#0E1014` | Header, panels | — |
| `--surface-2` | `#13161B` | Cards | — |
| `--surface-3` | `#191D23` | Hover, inset wells | — |
| `--line` | `#1E222A` | Hairline borders | — |
| `--text-1` | `#F2F5F9` | Primary text | 16.4:1 |
| `--text-2` | `#A8B2C0` | Secondary text | 8.4:1 |
| `--text-3` | `#8A94A6` | Meta / captions | 5.9:1 |
| `--accent` | `#38BDF8` | Focus, active, links, data bars | 8.4:1 |
| `--easy / --medium / --hard` | `#34D399` / `#FBBF24` / `#FB7185` | Difficulty only | 8.7:1 / 10:1 / 6.5:1 |

Elevation is expressed with hairline borders and at most an ambient shadow — never with
coloured glow. Judge brand colours appear **only** as a 14%-tinted icon chip and its
glyph, using `accentColor` (the lighter variant) so dark brands stay legible.

### Typography

Two families. `Inter` (400/500/600) for everything structural; `JetBrains Mono`
(500/600) for every number, handle and code token, with `tabular-nums`.
`Outfit` was removed — a third family at weights 800/900 was the main "student project"
tell.

| Step | Size | Use |
| :-- | :-- | :-- |
| `--fs-display` | 36px | Hero headline only |
| `--fs-2xl` | 28px | Section titles |
| `--fs-xl` | 22px | Count-up value, panel titles |
| `--fs-lg` | 17px | Card titles, lead text |
| `--fs-base` | 15px | Body |
| `--fs-sm` | 13px | Meta, labels |
| `--fs-micro` | 11px | Uppercase eyebrow labels |

Body copy is capped at ~62ch; headlines at ~32ch. Seven steps, not nineteen.

### Space & radius

4px base unit; only `4 8 12 16 20 24 32 40 56` are used. One section rhythm:
`--section-gap` (56px desktop / 32px mobile) between every section, no exceptions.
Three radii: `--r-1: 6px` (chips, inputs), `--r-2: 10px` (cards, buttons),
`--r-3: 14px` (panels); `--r-pill` only for true pills and switches.

### Layout

Content container 1280px, 24px gutters (16px on mobile). The judge grid is
`repeat(auto-fill, minmax(264px, 1fr))`, which yields 1 / 2 / 3 / 4 columns without
brittle breakpoints. Text is measure-limited independently of the grid.

### Phones (≤599px)

Narrow screens are rebuilt rather than shrunk, by four rules:

1. **Type floor.** `--fs-micro` lifts 11 → 12px and `--fs-sm` 13 → 14px, so nothing is
   set below 12px on a phone while the desktop scale is untouched.
2. **Touch targets.** Every control reaches 44px — buttons, filter chips, copy button,
   the card's outbound link, and the switch, whose track keeps its 26px proportions
   inside a 44px hit area.
3. **A header that fits.** The header's social buttons duplicate links already in the
   hero and footer, so they are dropped here. The ~90px saved keeps the bar on one row
   and stops the name colliding with the action cluster (it previously overlapped the
   buttons at 320, 360 *and* 390px).
4. **Compact stacks.** Judge cards become `head | count` rows above full-width tags and
   details, and the filter row becomes a 2×2 keypad. The 14-card stack falls from
   ~3,000px to ~2,470px without dropping a single figure.

Long values (portfolio URL, embed snippet) wrap instead of scrolling sideways: a value
hidden behind an invisible horizontal scroll reads as a broken field.

### Components

- **Header** — sticky identity bar; gains a hairline and blur only once content scrolls beneath it. Section nav is progressive enhancement (hidden under 900px), and the duplicate social buttons are dropped under 600px so the name always has room.
- **Button** — `primary` (accent fill), `default` (surface + hairline), `icon` (32px, label via `aria-label`). One height scale, one radius, one focus ring.
- **Segment control** — `role="group"` of `aria-pressed` toggles with computed counts. Replaces the invalid tablist.
- **Switch** — native checkbox, custom track, label + hint wired by `aria-describedby`.
- **Judge card** — icon chip, name, handle, count, tier tags, details, outbound link. Details sit on a hairline pinned to the card foot so rows align on desktop; on phones the name and count share the first line and tabs/details span the card.
- **Bar list** — replaces both Chart.js canvases. Label / value / share % / proportional bar, one row per series. Real DOM, screen-reader readable, no CDN, no canvas.
- **Panel** — titled surface used by analytics and the share block.
- **Toast** — `role="status"`, tone variants, no emoji.

---

## 5. Interaction & motion

Motion is limited to three purposeful moments: the count-up on first paint, a single
fade-and-rise as cards and bars enter the viewport, and the sync spinner. All of them
collapse to instant under `prefers-reduced-motion: reduce`. Nothing loops, nothing
floats, nothing glows on hover — hover only clarifies (border, surface, pointer).

## 6. Accessibility contract

- AA everywhere, verified numerically (see §4), not assumed.
- Every control reachable and operable by keyboard, with a visible `:focus-visible` ring that clears 3:1.
- Filtering uses `aria-pressed` toggles, not fake tabs; the grid and empty state are announced by `role="status"`.
- Charts are lists with text values; bars are `aria-hidden` decoration because the number is already in the DOM.
- One `h1`, section `h2`s, card/panel `h3`s.
- Pointer targets ≥ 24px (footer and icon controls padded to 44px).
- Skip link uses the clip technique rather than `left: -9999px`.

## 7. Performance contract

No render-blocking third-party script. No `background-attachment: fixed`. At most one
`backdrop-filter`. Avatar served at 160px instead of 800px. Two font families, five
weights total.

## 8. Implementation priority

1. Tokens and primitives (colour, type, space, radius, focus, motion).
2. Header, hero, footer shell.
3. Judge grid, toolbar, filter and dedup logic, card states.
4. Analytics bar lists replacing Chart.js.
5. Share/verify block, toast, empty/error/busy states.
6. Responsive pass, then a measured re-audit and refinement.

---

## 9. Verification record

Everything below was measured, not assumed. The audit harness runs the page in
headless Chrome and reports contrast ratios, overflow, text clipping, pointer-target
sizes, token counts, ARIA structure and JS errors; the interaction harness drives the
real UI and asserts the outcome of every workflow.

### Before → after

| Measure | Before | After |
| :-- | :-- | :-- |
| Distinct font sizes | 19 | **7** (all from the scale, plus one mobile step) |
| Font weights | 400/600/700/800/900 | **400/500/600** |
| Border radii | 7 values (`8/10/12/14/20/24/9999px`) | **3 + pill** |
| Contrast failures (WCAG AA) | 1 measured, palette failing down to 3.52:1 | **0 of 218 checks, every surface** |
| Pointer targets under 24px | 4 | **0** |
| Invalid ARIA (`role=tab` without panels) | 4 | **0** |
| Emoji in UI chrome | 14 | **0** |
| Text clipping / element overflow | 14 clipped rows | **0** |
| Elements with `backdrop-filter` | 15 | **1** (sticky header, only when stuck) |
| Third-party runtime scripts | Chart.js from CDN | **0** |
| Avatar weight | 868 KB (800×800) | **44 KB** (160×160) |
| Dead CSS | ~90 lines (no such DOM) | **0 unreferenced classes** |
| JS errors at load | — | **0** at 1440/1280/1024/900/768/600/500px |

### Workflow tests

49 assertions covering the real user paths, passing at 1440px and 500px and over both
`file://` and HTTP: category filters (6/3/5 cards), filter state, the forced empty state
and its reset, the deduplicate toggle (5,616 → 5,033, Virtual Judge flagged excluded,
distribution drops to 13 rows and re-sums to 5,033, restored on toggle-off), sticky-header
state, offline notice, clipboard feedback, and the sync button's busy → idle → outcome
cycle including a double-fire guard.

### Data integrity

The inline offline snapshot is verified field-by-field against `config.json`: same order,
same 13 rendered fields, same per-judge breakdowns, same 5,616 total.

### Known limitations

- Headless Chrome clamps `--window-size` to a 500px minimum, so a true phone viewport
  was measured by loading the page inside a 320 / 360 / 390px iframe and injecting the
  audit there. Every phone-width figure in this document comes from that harness.
- Below 340px the judge handle ellipsizes; it is a secondary identifier and the name,
  count and profile link all remain intact.
- Headless Chrome cannot scroll, so the scroll-triggered card reveal was verified by
  rendering at a viewport tall enough to put the cards in view on load (14/14 revealed)
  rather than by simulating a scroll.
- `navigator.clipboard` does not settle headlessly, which is exactly why the copy path
  is bounded by a timeout and falls back to `execCommand`. The fallback is what the
  harness exercises.
- Contrast is verified for the default (dark) theme only; the product ships one theme.
