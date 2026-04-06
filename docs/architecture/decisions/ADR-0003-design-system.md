# ADR-0003: Design System

**Status:** Accepted
**Date:** 2026-04-05

## Context

The platform needs a visual identity ("Technical Editorial Minimalism") that communicates precision, clarity, and engineering depth. We need a design token system, typography, and component architecture.

## Decision

**Tailwind CSS v4 with CSS-first `@theme` tokens, self-hosted fonts, no component library.**

- Design tokens defined in `src/styles/globals.css` via `@theme` and `:root`/`.dark`
- Colors in oklch format (perceptually uniform)
- Three self-hosted variable fonts: Source Serif 4 (headings), Inter (body), JetBrains Mono (code)
- Fluid typography via `clamp()` — no breakpoint jumps
- Class-based dark mode with `@custom-variant dark`
- Components built from scratch in `src/components/primitives/`
- No external component library (shadcn, Radix, etc.)

## Rationale

- Tailwind v4 CSS-first config is simpler and generates utilities from `@theme` automatically
- oklch produces visually consistent color scales (equal lightness steps)
- Self-hosted fonts eliminate third-party CDN dependency and tracking
- Building primitives from scratch proves engineering capability (the site is the portfolio)
- Dark mode as a first-class design system concern, not an afterthought

## Consequences

- More upfront work building primitives vs. using a component library
- Every component must be verified in both light and dark themes
- Font files add ~1.5MB to the repo (acceptable for self-hosting benefits)
