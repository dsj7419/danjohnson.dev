# ADR-0008: Contact Form via a Route Handler and Resend

**Status:** Accepted
**Date:** 2026-10-12 (records a decision made in April 2026; amended after the October review; amended 2026-10-12 when mail forwarding went live)

## Context

The site needs one way for a prospective client to start a conversation. The original plan was a `mailto:` link. The first form (April 2026, `6c60179`) used a Server Action, which returned 500 in production: posting the action re-rendered `/work-with-me` inside the serverless function, and that page's dynamic MDX import only resolves at build time. `cf5427a` moved the send into a Route Handler called with `fetch`, which runs in its own function without re-rendering the page; the orphaned action was removed in `ef3606f`. The October 2026 forensic review then found the handler untested, open to cross-site posts, and echoing the submitter's message in the confirmation email.

## Decision

A single Route Handler, `POST /api/contact`, validates input with the shared Zod schema and sends two emails through Resend: a notification to the owner and a confirmation to the submitter.

- The handler refuses anything that is not `application/json` sent from this site's origin (`Sec-Fetch-Site: same-origin`, or an `Origin` equal to the site URL or the request's own origin) before reading the body.
- Non-object JSON returns 400 with empty field errors; schema failures return 400 with one message per field.
- The confirmation carries no user text beyond the name, states the reply window, and sets `Reply-To` to `dan@danjohnson.dev`, which Porkbun forwards to the owner's inbox.
- Header values derived from user input pass through `sanitizeHeaderValue` (no CR/LF, control characters or angle brackets).
- A failed confirmation is logged and does not fail the request; a failed notification returns 502.

## Rationale

- A Route Handler keeps the send out of the page's render path, so statically generated pages stay static and never need their MDX at runtime.
- A Route Handler has explicit HTTP semantics (status codes, content type, origin checks) that the client form consumes directly, and it can be tested end to end with a plain `Request`.
- Resend is already the verified sender for the domain; adding a queue or database would be infrastructure without a requirement.
- Not echoing the message closes both the relay-abuse vector and the privacy exposure of mailing sensitive text to a mistyped address.

## Consequences

- `tests/app/api/contact/route.test.ts` pins every branch, including the origin guard and header injection; the route is inside the coverage gate.
- Inquiries live only in the owner's inbox. There is no store to query, export or lose; retention is described on `/privacy`.
- Inbound mail depends on Porkbun forwarding (MX `fwd1`/`fwd2.porkbun.com`). If forwarding is ever removed, the confirmation's `Reply-To` must move to the `CONTACT_EMAIL` inbox in the same change.
