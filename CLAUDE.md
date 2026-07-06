# CLAUDE.md

Guidance for Claude Code when working in this repo.

## Design system terminology

This app has exactly four categories of small UI elements, and the distinctions are load-bearing — don't blur them:

- **Pill** — a control for *choosing* among options (click to set/toggle a value). 20px radius, 1.5px border, interactive.
- **Badge** — a static, read-only label (a value or status). 4px radius, no border, never interactive, font `700/.56rem/.04em/uppercase`, padding `2px 6px`, line-height `1.4` — identical shape/typography everywhere; only color/text vary.
- **Chip** — a standalone item with its own bound action (an × to remove it, a click to retry). 99px radius, 1px border.
- **Stat** — a plain aggregate readout (e.g. "42/58 games"), not a per-item indicator.

**Canonical reference:** `reviews/pills-badges-chips-stats-reference.html` — every element in the app, its class, every color value, rendered with the real `style.css`. When in doubt about what to call something or how it should look, that file is the source of truth — read it before guessing.

**Consistency law:** the same badge/pill/chip must render pixel-identically everywhere it appears in the app (same class, same CSS, no per-location size/weight overrides). Position/container/layout may differ by context (mobile vs desktop, overlay vs list row) — the element's own look never forks. If a screen needs the element to look different, that's a sign it's a different element, not a variant.

`reviews/pills-badges-chips-audit.html` and `reviews/pills-badges-chips-stats-preview.html` have been removed — both were superseded by `pills-badges-chips-stats-reference.html` and were kept out of date.

## Full style guide

**`reviews/style-guide.html`** covers everything in the app that is *not* a Pill/Badge/Chip/Stat: design tokens (colors, radii, typography), buttons (header, modal, panel, card, FAB, notes, sidebar), form controls, and every structural component (header, game/collection card, filter sidebar, modals, side panel, calendar, toasts/tooltips/dropdowns) — class names, hex colors (click to copy), CSS variable names, and hover/selected/active states, rendered with the real `style.css`. It cross-links to `pills-badges-chips-stats-reference.html` rather than duplicating it. When in doubt about any non-pill/badge/chip/stat element's class or look, check this file before guessing; keep both files in sync with `style.css` as the app evolves.
