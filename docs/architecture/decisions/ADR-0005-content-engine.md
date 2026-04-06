# ADR-0005: Content Engine

**Status:** Accepted
**Date:** 2026-04-05

## Context

The platform needs a publishing engine that transforms MDX files into consistently rendered, SEO-optimized, accessible content pages. We needed to decide on content loading, frontmatter handling, syntax highlighting, MDX rendering, and feed generation approaches.

## Decision

**MDX-in-repo with gray-matter frontmatter parsing, Zod validation, rehype-pretty-code syntax highlighting, custom MDX component mapping, and build-time static generation.**

### Key Choices

| Decision            | Choice                             | Alternative Rejected             |
| ------------------- | ---------------------------------- | -------------------------------- |
| Frontmatter parsing | gray-matter (YAML)                 | MDX named exports                |
| Schema validation   | Zod (runtime, build-time)          | TypeScript interfaces only       |
| Slug source         | Filename                           | Frontmatter field                |
| Syntax highlighting | rehype-pretty-code + Shiki         | Raw Shiki, Prism                 |
| Prose rendering     | Custom MDX component overrides     | @tailwindcss/typography          |
| Plugin stack        | 3 plugins (gfm, pretty-code, slug) | 12+ plugins                      |
| RSS                 | Writing only                       | All content types                |
| TOC                 | Build-time extraction              | Client-side IntersectionObserver |
| Code copy button    | Deferred (requires client JS)      | V1 implementation                |

### Content Blocks

6 blocks built: Callout (4 variants), Figure (3 widths), Quote, MetricStrip, DiagramWrapper, TableOfContents. All Server Components, zero client JS.

## Rationale

- gray-matter is the standard for MDX frontmatter extraction, tiny and battle-tested
- Filename-as-slug eliminates slug/filename mismatch bugs
- Custom MDX component mapping gives full editorial control vs. Typography plugin defaults
- rehype-pretty-code handles dual-theme (light/dark) code blocks at build time with zero runtime JS
- 3 plugins instead of 12+ reduces dependency surface and build complexity
- Blocks consume primitives and tokens — they don't define their own styling

## Consequences

- Content updates require git commits and deploys (acceptable for solo operator)
- No code copy button until client JS is justified
- No active TOC highlighting until IntersectionObserver is justified
- If content grows beyond ~50 files, may need caching layer in content loader
