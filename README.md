# danjohnson.dev

The personal site and portfolio of Dan Johnson, product engineer and systems architect: case studies, writing, and a way to start a project. Live at **https://danjohnson.dev**.

The site is small on purpose. Its job is to show how the work is done, so the codebase is held to the same standard as the case studies describe.

## Stack

| Layer     | Choice                                                                           |
| --------- | -------------------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router), React 19, statically generated, Server Components first |
| Language  | TypeScript in strict mode with every additional strictness flag                  |
| Styling   | Tailwind CSS v4, CSS-first `@theme` tokens in oklch, light and dark themes       |
| Content   | MDX in the repository, YAML front matter validated with Zod 4                    |
| Code      | rehype-pretty-code with Shiki, dual theme                                        |
| Contact   | One Route Handler, Resend for delivery (ADR-0008)                                |
| Testing   | Vitest 4, React Testing Library, happy-dom                                       |
| Hosting   | Vercel, with cookieless Vercel Web Analytics                                     |

## Develop

Requires Node 24 (see `.nvmrc`) and pnpm via Corepack.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev                # http://localhost:3000
```

The contact form needs `RESEND_API_KEY` and `CONTACT_EMAIL` in `.env.local`; everything else runs without configuration.

## Quality gates

Every change reaches `main` through a pull request that must pass the same checks CI runs (ADR-0012):

```bash
pnpm typecheck && pnpm lint && pnpm format:check && pnpm test:coverage && pnpm build
```

- **Lint** is type-aware (`typescript-eslint` strict-type-checked) with accessibility rules at error and zero warnings allowed.
- **Tests** cover the content loader against the real corpus, the contact route end to end, and WCAG AA contrast for every colour-token pair in both themes. Coverage thresholds are enforced.
- **Dependencies** are audited in CI (high advisories in production dependencies fail the build), updated weekly by Dependabot, and installed only after a three-day release-age cool-off.

## Layout

```text
src/app/          routes, metadata, OG images, the contact Route Handler
src/components/   primitives (layout and type), blocks (content), layout (chrome)
src/content/      case studies, articles and pages as MDX
src/lib/          content loader, front matter, metadata, email templates
docs/             handoff, ADRs, planning, content standards
tests/            unit, component, route, corpus and token-contrast tests
```

Architecture decisions are recorded in [`docs/architecture/decisions`](docs/architecture/decisions/README.md).

## Licence

- **Code** is MIT licensed; see [`LICENSE`](LICENSE).
- **Writing and images** (everything under `src/content/` and `public/images/`) are © Dan Johnson, all rights reserved; see [`CONTENT-LICENSE.md`](CONTENT-LICENSE.md).
- **Fonts** in `public/fonts/` are under the SIL Open Font License 1.1; see [`public/fonts/README.md`](public/fonts/README.md).
