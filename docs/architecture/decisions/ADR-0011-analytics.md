# ADR-0011: Vercel Web Analytics

**Status:** Accepted (supersedes the "Plausible analytics, deferred" entry in `docs/HANDOFF.md`)
**Date:** 2026-10-12

## Context

Until October 2026 the site had no measurement, so neither content nor distribution work could be evaluated. The April plan named Plausible and deferred it until content existed. Content now exists.

## Decision

Use Vercel Web Analytics through `@vercel/analytics` (`<Analytics />` in the root layout). It is enabled per project in the Vercel dashboard.

## Rationale

- First-party and same-origin: the script and the beacon are served from the site's own domain, so the CSP needs no new origin (ADR-0010).
- Cookieless, no IP storage, visitor identity is a daily-rotating hash: no consent banner is needed, and `/privacy` can describe it in two sentences.
- Already part of the hosting platform: no new vendor, account or secret. Plausible would add all three for the same page-view data.
- Readable from the Vercel API (page views by route and referrer), so progress can be checked from tooling.

## Consequences

- Page views are counted only after the toggle is switched on in the Vercel project's Analytics tab; until then the script request returns 404, which is harmless.
- Data lives with Vercel and follows its retention for the plan in use.
- Custom events (form submissions) are a later, separate decision; they need no new consent but should stay limited to counts.
