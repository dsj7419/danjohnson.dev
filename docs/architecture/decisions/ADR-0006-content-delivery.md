# ADR-0006: Content Delivery Layer

**Status:** Accepted
**Date:** 2026-04-06

## Context

The content engine (Epic 2) built the loading, validation, and rendering pipeline. Phase 3 needed to complete the delivery layer: listing pages, navigation shell, static MDX pages, and the layout chrome that makes the site a functioning publication.

## Decision

**Server-first layout shell with only 2 client components. All content pages static. Listing pages use content loader directly.**

### Layout Shell

- Header: sticky, nav from siteConfig, site name links to home
- Footer: social links, RSS link, copyright
- Mobile nav: `'use client'` — hamburger toggle (state only)
- Theme toggle: `'use client'` — light/dark/system cycle via `useSyncExternalStore`

### Route Structure

- 7 static pages, 2 SSG dynamic routes, 1 server-rendered route handler (RSS)
- Listing pages (`/work`, `/writing`) call content loader at build time
- Static MDX pages (`/about`, `/how-i-build`, `/work-with-me`) load from `src/content/pages/`

### Client JS Budget

Only 2 `'use client'` components in the entire site:

1. `MobileNav` — hamburger menu toggle
2. `ThemeToggle` — theme cycle with localStorage sync

Everything else is Server Components.

## Rationale

- Sticky header with blur provides polished navigation without layout shift
- `useSyncExternalStore` for theme toggle avoids setState-in-effect anti-pattern
- Mobile nav as client component is the minimum viable interactivity
- Listing pages use the same content loader functions as detail pages (single source of truth)
- Static MDX pages use `getPage()` for metadata, dynamic import for content

## Consequences

- No active nav highlighting in mobile view (would require pathname subscription, adds complexity)
- Placeholder content in static pages needs to be replaced with real content
- `/now` page intentionally deferred to avoid maintenance pressure
