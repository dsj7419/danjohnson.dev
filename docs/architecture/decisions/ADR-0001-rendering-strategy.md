# ADR-0001: Rendering Strategy

**Status:** Accepted
**Date:** 2026-04-05

## Context

The platform serves static content (case studies, articles, pages) with minimal interactivity. Next.js supports multiple rendering strategies (SSG, ISR, SSR, client-side). We need a clear policy that maximizes performance while leaving room for future needs.

## Decision

**Static by default, server-first by default, client only when required.**

- All content pages pre-rendered at build time via `generateStaticParams()`
- All components are React Server Components unless interactivity demands `'use client'`
- ISR available if editorial scale or external data sources justify it later
- SSR available if a real runtime need appears (none currently)

## Rationale

- MDX content lives in-repo — no external API to fetch at runtime
- Static pages served from CDN are the fastest possible delivery
- Server Components eliminate unnecessary client JS
- Policy language (not doctrine) keeps the door open without walking through it prematurely

## Consequences

- Content updates require a build and deploy (acceptable for solo operator publishing monthly)
- If content moves to an external CMS later, ISR becomes the natural evolution
- Each `'use client'` boundary is a deliberate decision that must be justified
