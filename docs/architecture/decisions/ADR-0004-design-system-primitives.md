# ADR-0004: Design System Primitives

**Status:** Accepted
**Date:** 2026-04-05

## Context

The platform needs a set of foundational components that enforce visual consistency across all pages. We needed to decide: how many primitives, what patterns they use, and what rules they follow.

## Decision

**8 primitives total. No component library. No class merge utility. No margin for layout.**

### Primitive Set

| Primitive | Responsibility                                                 |
| --------- | -------------------------------------------------------------- |
| Container | Horizontal width constraint + centering (reading/content/wide) |
| Section   | Vertical section spacing + optional background variant         |
| Stack     | Vertical rhythm between children via configurable gap          |
| Heading   | Typographic heading hierarchy (h1-h4, serif/sans split at h3)  |
| Text      | Body text variants (body/lead/small/caption)                   |
| Eyebrow   | Uppercase mono label for categories and annotations            |
| Divider   | Horizontal rule with border token                              |
| Button    | Polymorphic interactive element (button/link, 3 variants)      |

### Architecture Rules

- **`as` prop** for semantic element override on Container, Stack, Text, Heading
- **Template literal concatenation** for class merging (no clsx/cn/twMerge)
- **No margin on primitives** for layout spacing. Section controls outer spacing, Stack controls inner.
- **All Server Components.** Zero `'use client'` in the design system.
- **Blocks consume primitives.** Blocks (built in Epic 2) do not define their own spacing, typography, or colors.

## Rationale

- 8 primitives covers layout, typography, and interaction without component library bloat
- `as` prop prevents naming explosion (no StackList, TextSpan, etc.)
- No margin rule ensures predictable spacing composition
- Template literal concatenation avoids a dependency for trivial string joining
- Server Components keep zero client JS in the design system layer

## Consequences

- More complex blocks (Callout, CodeBlock, Quote) are deferred to Epic 2
- If class merging becomes painful with many conditional variants, we can add clsx later (one-line change)
- Custom MDX rendering (no Typography plugin) means more work in Epic 2 but full editorial control
