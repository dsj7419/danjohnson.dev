# Architecture Decision Records

One file per decision, numbered in the order the decisions were made. An ADR is never edited to reverse itself; a new ADR supersedes it.

## Status vocabulary

| Status                   | Meaning                                                                    |
| ------------------------ | -------------------------------------------------------------------------- |
| `Proposed`               | Written for discussion; not yet in effect.                                 |
| `Accepted`               | In effect. The code should match it; if it does not, one of them is wrong. |
| `Superseded by ADR-NNNN` | Replaced. Kept for history; read the superseding record instead.           |
| `Deprecated`             | No longer applies and has no replacement (the feature was removed).        |

An accepted ADR may be **amended** for facts that changed without changing the decision; the amendment is dated in the Status line.

## Index

| ADR  | Decision                                      | Status   |
| ---- | --------------------------------------------- | -------- |
| 0001 | Rendering strategy: static and server-first   | Accepted |
| 0002 | Content system                                | Accepted |
| 0003 | Design system                                 | Accepted |
| 0004 | Design system primitives                      | Accepted |
| 0005 | Content engine                                | Accepted |
| 0006 | Content delivery layer                        | Accepted |
| 0007 | Presentation quality and launch readiness     | Accepted |
| 0008 | Contact form via a Route Handler and Resend   | Accepted |
| 0009 | In-memory rate limiting for the contact route | Accepted |
| 0010 | Content Security Policy posture               | Accepted |
| 0011 | Vercel Web Analytics                          | Accepted |
| 0012 | Quality gates and dependency policy           | Accepted |
