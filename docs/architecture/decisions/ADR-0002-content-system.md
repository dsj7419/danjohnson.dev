# ADR-0002: Content System

**Status:** Accepted
**Date:** 2026-04-05

## Context

The platform is content-driven: case studies, articles, and static pages. We evaluated MDX-in-repo vs. headless CMS (Sanity) for content management.

## Decision

**MDX-in-repo with Zod schema validation.**

- Content files live in `src/content/` as `.mdx` files
- Frontmatter validated at build time via Zod schemas in `src/types/content.ts`
- Content loaded programmatically via `src/lib/content.ts`, not as route files
- `@next/mdx` handles MDX compilation

## Rationale

- Solo author, comfortable with Git — no need for visual CMS editing
- Everything version-controlled, diffable, branchable
- Zero external dependencies for content delivery
- Faster builds (no API calls)
- Zod schemas catch malformed content at build time, not in production
- Sanity reserved for client projects where non-technical editors need access

## Consequences

- Content changes require code commits (acceptable for publishing cadence)
- No visual preview without running dev server
- Migration to headless CMS possible later without changing page components (content loading is abstracted)
