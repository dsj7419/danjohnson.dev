# ADR-0007: Presentation Quality & Launch Readiness

**Status:** Accepted
**Date:** 2026-04-06

## Context

The site infrastructure was complete (design system, content engine, delivery layer) but every page followed the same visual pattern. Phase 4 refined presentation quality to make the site feel like a world-class technical publication.

## Decision

**Presentation polish via existing primitives and new blocks. No new systems. Typography-only hero. 3 client components total.**

### Key Changes

- Homepage rewritten with 6 sections: hero, featured work, capabilities, how I build teaser, selected writing, CTA
- Case study pages enhanced with metadata bar, MetricStrip auto-rendering, tech stack display, prev/next navigation
- Article pages enhanced with updatedAt display and "More writing" footer
- MDX spacing tuned: h2 mt-12, h3 mt-8, h4 mt-6, blockquote my-6, pre my-6
- Skip-to-content link for accessibility
- Active nav state via NavLink client component
- JSON-LD structured data: WebSite (homepage), Person (about), Article (writing)

### Client Component Budget

3 total: MobileNav, ThemeToggle, NavLink. All under 30 lines. No content rendering in client components.

## Rationale

- Typography-only hero matches "Technical Editorial Minimalism" — the words are the design
- PM-revised capabilities use senior/product language, not resume skills
- Case study prev/next with titles (not "Previous/Next") encourages exploration
- JSON-LD structured data improves search result presentation
- MDX spacing tuned for editorial reading rhythm

## Consequences

- No hero image means the homepage relies entirely on typography and whitespace for impact
- Featured content sections show nothing if no items are marked `featured: true`
- Nav active state adds 3rd client component — justified by clear UX need
