# ADR-0010: Content Security Policy Posture

**Status:** Accepted
**Date:** 2026-10-12

## Context

`next.config.ts` sends a strict CSP (`default-src 'self'`, `connect-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`, `form-action 'self'`, `base-uri 'self'`) but allows `'unsafe-inline'` for scripts and styles. Reviews have asked whether a nonce or hash could replace it.

## Decision

Keep `'unsafe-inline'` for `script-src` and `style-src` while the site is statically generated. Allow `'unsafe-eval'` in development only. Everything else stays `'self'`.

## Rationale

- Nonces require a fresh value per response, which means rendering every page dynamically and giving up static generation (ADR-0001) for a site with no user-generated content.
- Hashes are not a stable option either: Next.js emits inline bootstrap and RSC payload scripts whose content changes per build and per page, so a hash list would have to be regenerated and injected for every route on every build.
- The practical XSS surface is small: all content is authored in-repo, MDX is compiled at build time, and the only user input (the contact form) never renders back into a page.
- Third-party origins stay out entirely: fonts are self-hosted and analytics is same-origin (ADR-0011).

## Consequences

- An injected inline script would not be blocked by CSP; defence rests on there being no injection point. Any feature that renders user-supplied content must reopen this ADR.
- Revisit if Next.js ships build-time script hashing for statically generated routes.
