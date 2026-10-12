# ADR-0009: In-Memory Rate Limiting for the Contact Route

**Status:** Accepted
**Date:** 2026-10-12

## Context

`POST /api/contact` spends money (Resend sends) and reputation (mail from the site's domain). It needs a throttle. The site runs on Vercel functions, where module state lives per instance, survives warm reuse, and is lost on cold start.

## Decision

Keep the in-memory limiter (`src/lib/actions/rate-limit.ts`): five submissions per IP per hour, keyed on the first hop of `x-forwarded-for` with `x-real-ip` as fallback. Requests that fail the origin guard (ADR-0008) are rejected before the limiter runs and spend no budget. Rejections log a 12-character SHA-256 prefix of the IP, never the address.

## Rationale

- The origin guard removes the cheap abuse path (cross-site forms); what remains is scripted senders, for which a per-instance counter is a meaningful first filter at this site's traffic.
- A durable limiter (Upstash, Vercel KV) or a Vercel WAF rule adds a service, a secret or a plan upgrade for a threat that has not materialized: Resend logs show no abuse.
- Hashing the logged IP keeps the log useful for correlation without storing personal data (see `/privacy`).

## Consequences

- The effective ceiling is five per hour per warm instance, not globally. This is a known, accepted gap.
- **Revisit when** any of these is true: Resend's daily send count exceeds what real inquiries explain; the project moves to Vercel Pro (a WAF rate-limit rule on `/api/contact` is then free to add); the form gains a second purpose.
- The upgrade path is additive: keep this limiter as the first filter and put a shared sliding window (per IP and global) behind it.
