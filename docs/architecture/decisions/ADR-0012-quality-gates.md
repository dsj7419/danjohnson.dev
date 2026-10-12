# ADR-0012: Quality Gates and Dependency Policy

**Status:** Accepted
**Date:** 2026-10-12

## Context

Until October 2026 every check ran in CI but nothing enforced it: pushes to `main` deployed to production whether CI passed or not, coverage thresholds were configured but never run, and "the audit must be clean" was a promise in a document. The forensic review found 51 production advisories.

## Decision

**Branch protection.** A GitHub ruleset on `main` (`.github/rulesets/main-green-ci.json`) requires a pull request and a passing `Quality Checks` run on an up-to-date branch, and blocks force-push and deletion. Repository admins can bypass only through a pull request. Merges use rebase or squash.

**CI (`.github/workflows/ci.yml`).** Node from `.nvmrc`; `pnpm install --frozen-lockfile`; `pnpm audit --prod --audit-level=high` (blocking) plus the full audit (advisory); `eslint . --max-warnings 0` with `typescript-eslint` strict-type-checked and `jsx-a11y` at error; Prettier check; `tsc --noEmit`; `vitest run --coverage` against thresholds; `next build`. Actions are pinned to commit SHAs.

**Dependencies.** Dependabot opens grouped weekly PRs for npm and GitHub Actions with a three-day cooldown; `pnpm-workspace.yaml` sets the same three-day `minimumReleaseAge` (type-only `@types/*` packages excepted) and `strictDepBuilds`, with an explicit allow-list for install scripts.

**Design tokens.** `tests/styles/contrast.test.ts` asserts WCAG AA for every rendered colour-token pair in both themes, so contrast is a gate rather than an audit.

## Rationale

- A personal site that doubles as a résumé is judged on whether its own standards are enforced, not stated.
- Each gate is cheap to run and fails loudly; together they make "a red build cannot reach production" true.

## Consequences

- Every change, including content, goes through a pull request (`gh pr create --fill && gh pr merge --auto --rebase`).
- A new high advisory in a production dependency blocks all merges until it is upgraded or explicitly accepted in this ADR.
- New colour pairings must be added to the contrast test's pair list.
