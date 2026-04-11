# Dan Johnson Platform — Execution Epics

> **Target launch:** Mid-May 2026
> **Guiding principle:** Content and positioning before features. Launch before perfection.
> **Quality bar:** Every element must withstand scrutiny from senior engineers and the webdev community.

## Completion Summary (updated 2026-04-10)

| Epic                     | Status            | Notes                                                                                              |
| ------------------------ | ----------------- | -------------------------------------------------------------------------------------------------- |
| Epic 0: Foundation       | **COMPLETE**      | Next.js 16.2.3, TS strict, Tailwind v4, Vitest, CI, Vercel. MDX-in-repo chosen.                    |
| Epic 1: Design System    | **COMPLETE**      | 8 primitives, 13 blocks, 3 fonts, oklch tokens, dark mode, fluid type.                             |
| Epic 2: Content          | **NEAR-COMPLETE** | 3/3 case studies published. 2 articles published. Forges of Karinth remaining.                     |
| Epic 3: Core Pages       | **COMPLETE**      | All routes, listings, layout shell, static pages, 404.                                             |
| Epic 4: Inquiry System   | **DEFERRED**      | mailto CTA is sufficient for launch. Resend integration post-launch.                               |
| Epic 5: Launch Readiness | **IN PROGRESS**   | Security hardened, a11y verified, OG images done. Lighthouse pass + domain cutover remaining.      |
| Epic 6: Post-Launch      | NOT STARTED       | Tracked in GitHub issues on austin-eischeid repo for client work; personal site features deferred. |

**Current commit:** `e74ef0f` | **Tests:** 232 passing | **Vulnerabilities:** 0

---

## Epic 0: Project Foundation ✓

**Goal:** Repository, tooling, and environment — ready to build.

- [x] Secure domain (danjohnson.dev)
- [x] Initialize Next.js (App Router) + TypeScript strict mode
- [x] Configure monorepo structure if needed — decided: single package, no monorepo
- [x] Set up linting (ESLint flat config + Prettier), Tailwind CSS v4, path aliases
- [x] Set up Vercel project with preview + production environments
- [x] Configure environment variables strategy
- [x] Set up testing infrastructure (Vitest + React Testing Library + happy-dom)
- [x] Choose CMS: MDX-in-repo (Sanity reserved for client projects)
- [x] Set up Git branching strategy (trunk-based, main only) and CI pipeline (GitHub Actions)
- [ ] Set up error monitoring (Sentry) — deferred to post-launch
- [ ] Set up analytics (Plausible) — deferred to post-launch

### Decision: CMS Approach

**Option A — Sanity:** Best if you want a visual editing experience, structured content queries (GROQ), image pipeline, and the ability to edit content without touching code. Heavier initial setup but powerful for case studies with structured metadata.

**Option B — MDX in repo:** Best if you want everything in Git, version-controlled, close to code. Simpler architecture, fewer moving parts, faster to set up. You write in markdown with component embeds. Content lives alongside code.

**Recommendation for your timeline:** MDX in repo. Fewer dependencies, faster to launch, everything version-controlled (which you value), and you can always migrate to a headless CMS later. For a solo operator on a 6-week timeline, removing the CMS dependency removes an entire category of integration work.

**Estimated time:** 2-3 days

---

## Epic 1: Design System Foundation ✓

**Goal:** Reusable component library implementing the "Technical Editorial Minimalism" identity.

### 1.1 Design Tokens ✓

- [x] Color system: oklch neutral palette + muted indigo-blue accent (light + dark mode)
- [x] Typography scale: Source Serif 4 (headings), Inter (body), JetBrains Mono (code) — all self-hosted variable WOFF2
- [x] Spacing scale (4px base via `--spacing: 0.25rem`, fluid section/content spacing via clamp)
- [x] Breakpoint system (Tailwind v4 defaults)
- [x] Motion tokens (--duration-fast/normal/slow, --easing-default/in/out)

### 1.2 Core Components ✓

- [x] Typography: Heading (h1-h4, serif/sans split at h3), Text (body/lead/small/caption), Eyebrow
- [x] Button (primary, secondary, ghost — polymorphic button/link)
- [x] Cards: ProjectCard, ArticleEntry
- [x] Container (reading/content/wide widths)
- [x] Section (default/alt/elevated backgrounds, controls outer spacing)
- [x] Stack (configurable gap, controls inner spacing)
- [x] Navigation (sticky header, active state via NavLink, mobile hamburger)
- [x] Footer (GitHub, LinkedIn, RSS, copyright)
- [x] Callout (note/warning/insight/result variants)
- [x] MetricStrip, DiagramWrapper, Quote, Figure, TableOfContents, RelatedContent, StackList, CaseStudyMeta, CaseStudyNav, ContactCTA

### 1.3 Content Components ✓

- [x] Custom MDX component mapping (mdx-components.tsx — full editorial control)
- [x] Image component (next/image with responsive sizes)
- [x] Code blocks via rehype-pretty-code + Shiki (dual theme, zero client JS)
- [x] Architecture diagram container (DiagramWrapper with inline SVG)
- [x] Table of contents (build-time extraction from headings)
- [x] Quote block (attribution + role)

### 1.4 Dark Mode ✓

- [x] CSS custom properties via :root/.dark + @custom-variant
- [x] System preference detection + manual toggle (light/dark/system cycle)
- [x] All components verified in both themes
- [x] Inline script prevents FOUC on page load

**Completed.**

---

## Epic 2: Content Production (CRITICAL PATH) — Near-Complete

**Goal:** Write the case studies and page content that ARE the platform. This is the most important epic.

### 2.1 Case Studies (3 required for launch — DONE)

Austin Eischeid Site ✓

- [x] Published: `/work/austin-eischeid` (319 lines, inline SVG diagram, 4 metrics, related content links)

Project Chimera ✓

- [x] Published: `/work/chimera` (322 lines, inline SVG diagram, 4 metrics, multi-provider AI architecture)

Restorative Craft ✓ (bonus — not in original plan)

- [x] Published: `/work/restorative-craft` (288 lines, inline SVG diagram, 4 metrics, 5 external integrations)

Forges of Karinth — REMAINING

- [ ] Deterministic simulation, game engine architecture
- [ ] Integer-scaled math, seeded PRNG, reproducibility
- [ ] Architecture diagram showing simulation pipeline
- [ ] This is the only planned content remaining before launch

### 2.2 Page Content ✓

All pages written with concrete project references and cross-links.

- [x] Homepage: hero, featured work (3 cards), capabilities (6), How I Build teaser, selected writing, CTA
- [x] How I Build: architecture-first, TDD, AI-augmented, security, performance, collaboration — all with specific project examples
- [x] About: what I do, recent work (cross-linked), what I care about, how I work
- [x] Work With Me: who, what, where I add value, what it looks like, mailto CTA

### 2.3 Writing / Articles

- [x] "Working With Designers: Turning Vision Into Reality" — published at `/writing/working-with-designers`
- [x] "Using AI in Real Products, Not Just Demos" — published at `/writing/using-ai-in-real-products`
- [ ] "How I Design Software Systems Before Writing Code" — optional for V1
- [ ] "Performance Is a Feature" — optional for V1

### 2.4 Architecture Diagrams ✓

- [x] Austin site architecture (inline SVG in case study)
- [x] Chimera architecture (inline SVG in case study)
- [x] Restorative Craft architecture (inline SVG in case study)
- [ ] Karinth architecture — ships with case study

### 2.5 Social Proof

- [ ] Collect 1-2 quotes from Austin Eischeid
- [ ] Collect any other collaborator quotes available
- [ ] Request these NOW — do not wait until launch

**Estimated time:** 15-25 days (this is the longest pole — start immediately)

---

## Epic 3: Core Pages Implementation

**Goal:** Build all V1 pages using the design system and content from Epic 2.

### 3.1 Layout Shell

- [ ] Root layout with navigation + footer
- [ ] Page transition handling (subtle, fast)
- [ ] Responsive behavior verified across breakpoints
- [ ] Metadata/SEO base configuration (Open Graph, Twitter cards)

### 3.2 Homepage

- [ ] Hero section
- [ ] Credibility signals
- [ ] Selected work grid (3 project cards)
- [ ] Capability areas
- [ ] Engineering philosophy teaser
- [ ] Writing highlights
- [ ] Brief about
- [ ] CTA section

### 3.3 Work Page

- [ ] Project grid/list with tags (AI, Architecture, Performance, Product, etc.)
- [ ] Links to individual case studies

### 3.4 Case Study Template ✓

- [x] Metadata bar (role, client, duration, date)
- [x] MetricStrip auto-rendering from frontmatter metrics
- [x] Table of contents (build-time)
- [x] Architecture diagram embed (DiagramWrapper + inline SVG)
- [x] Stack display (StackList)
- [x] Prev/next navigation (CaseStudyNav with titles)
- [x] Related content links
- [ ] Reading progress indicator — deferred (requires client JS)

### 3.5 Writing Page ✓

- [x] Article index with category labels, dates, reading time
- [x] Featured articles surface first

### 3.6 Article Template ✓

- [x] Reading-width layout (Container width="reading")
- [x] Table of contents (build-time)
- [x] Reading time + date
- [x] Category eyebrow
- [x] "More writing" link back to index
- [x] JSON-LD Article structured data

### 3.7–3.9 Static Pages ✓

- [x] How I Build, About, Work With Me — all with MDX content, Person JSON-LD
- [x] Cross-linked to case studies and articles

### 3.10 Utility Pages ✓

- [x] Custom 404 (on-brand, helpful, "Back to home" button)
- [ ] Form success/confirmation page — deferred with inquiry form

**Completed.**

---

## Epic 4: Inquiry System — DEFERRED TO POST-LAUNCH

**Goal:** Multi-step intake form that filters for serious projects.
**Status:** Deferred. mailto CTA (`hello@danjohnson.dev`) is sufficient for launch. Resend integration planned post-launch.

### 4.1 Form Implementation

- [ ] Step 1: Project type (dropdown/radio: new product, rebuild, AI integration, architecture help, performance/security, technical partnership, not sure)
- [ ] Step 2: Project stage (idea, prototype, existing with issues, scaling, rebuild, ongoing)
- [ ] Step 3: Budget range ($15k-$25k / $25k-$50k / $50k-$100k / $100k+ / Let's discuss)
- [ ] Step 4: Timeline (flexible, 1-2 months, 3-6 months, 6+, not sure)
- [ ] Step 5: Project description (open text)
- [ ] Step 6: Contact info (name, email, company optional, website optional, how did you find me)
- [ ] Progress indicator across steps

### 4.2 Backend

- [ ] Server-side validation
- [ ] Store submissions (Postgres via Neon/Supabase, or simple file/email-based for V1)
- [ ] Email notification on submission (Resend)
- [ ] Rate limiting
- [ ] Spam protection (honeypot field + basic heuristics, no CAPTCHA)
- [ ] Confirmation page with professional messaging

### 4.3 Security

- [ ] Input sanitization
- [ ] CSRF protection
- [ ] Rate limiting per IP
- [ ] Environment variables for all secrets

**Estimated time:** 3-4 days

---

## Epic 5: Launch Readiness — IN PROGRESS

**Goal:** Polish, performance, accessibility, and go-live.

### 5.1 Performance Pass

- [x] Font loading strategy (variable WOFF2, swap, preload heading/body, no preload mono)
- [x] Static generation for all content pages (generateStaticParams + dynamicParams=false)
- [x] Minimal client JS (3 client components, all under 30 lines of logic)
- [ ] Lighthouse audit: target 95+ on all categories — **PENDING VERIFICATION**
- [ ] Core Web Vitals verified on production (LCP, INP, CLS) — **PENDING VERIFICATION**

### 5.2 Accessibility Pass

- [x] WCAG 2.1 AA compliance (targeted)
- [x] Keyboard navigation: skip-to-content, Escape dismiss on mobile nav, focus management
- [x] Color contrast (oklch palette designed for perceptual uniformity)
- [x] Semantic HTML throughout (article, aside, nav, header, footer, main, figure)
- [x] prefers-reduced-motion: reduce — disables all animations/transitions
- [x] aria-label on all nav elements, aria-expanded + aria-controls on mobile nav
- [ ] Screen reader testing — **PENDING MANUAL VERIFICATION**

### 5.3 Mobile Pass

- [x] Navigation works on mobile (hamburger, Escape dismiss, focus management)
- [ ] All pages verified on mobile breakpoints — **PENDING VERIFICATION**
- [ ] Touch targets verified — **PENDING VERIFICATION**

### 5.4 SEO & Metadata ✓

- [x] Open Graph tags on all pages (per-page OG images for case studies and articles)
- [x] Twitter card tags (summary_large_image)
- [x] Structured data: JSON-LD for WebSite, Person, Article
- [x] Sitemap with priority ordering
- [x] robots.txt with sitemap reference
- [x] Per-page OG images for all content
- [x] Canonical URLs via alternates.canonical

### 5.5 Final Checklist

- [ ] Domain configured and DNS propagated (currently on danjohnson-dev.vercel.app)
- [x] SSL/HTTPS verified (Vercel handles)
- [ ] Error monitoring active (Sentry) — deferred
- [ ] Analytics active (Plausible) — deferred
- [ ] All internal links tested — **PENDING VERIFICATION**
- [x] 404 page works
- [x] Favicon and app icons (icon.svg)
- [x] Security headers: A grade posture (HSTS, CSP, X-Frame-Options, etc.)
- [x] Zero dependency vulnerabilities (pnpm audit clean)

### 5.6 Soft Launch

- [ ] Share with Austin Eischeid for feedback
- [ ] Share with 5-10 trusted peers for feedback
- [ ] Incorporate critical feedback
- [ ] Custom domain cutover
- [ ] Go live publicly

**Remaining:** Lighthouse verification pass, link audit, mobile verification, domain cutover.

---

## Epic 6: Post-Launch (Not blocking launch)

These are valuable but explicitly NOT required for V1:

- [ ] Interactive Architecture Explorer (V2 signature feature)
- [ ] Ask Dan AI system (when content corpus is large enough)
- [ ] Platform itself as a case study
- [ ] Locale Lens case study
- [ ] Additional case studies
- [ ] Newsletter/RSS
- [ ] Testimonials page (once you have 5+)
- [ ] Cloudflare security layer
- [ ] Paid consultation booking
- [ ] Additional writing

---

## Timeline (Actual vs Plan)

```text
Week 1 (Apr 5):  Epic 0 + Epic 1 + Epic 2 started (Austin case study)      ✓
Week 2 (Apr 12): Epic 2 + Epic 3 (pages, routes, delivery)                   ✓
Week 3 (Apr 19): Epic 2 content (Chimera, Restorative Craft, AI article)     ✓
Week 4 (Apr 26): Epic 5 partial (polish, OG, security, a11y)                 ✓
Week 5 (May 3):  Forges of Karinth case study + launch verification          ← NOW
Week 6 (May 10): Soft launch, feedback, domain cutover
```

The inquiry system (Epic 4) was deferred — mailto CTA is sufficient. This freed a full week for content quality and engineering polish.

---

## Removed from V1 (vs. Original Blueprint)

| Item                                 | Reason                                                                        |
| ------------------------------------ | ----------------------------------------------------------------------------- |
| Ask Dan AI chatbot                   | Thin content corpus = disappointing UX. Add when 15+ pieces of content exist. |
| Interactive Architecture Explorer    | High engineering effort, static diagrams differentiate plenty for V1.         |
| Sanity + MDX hybrid CMS              | Unnecessary complexity for solo operator on tight timeline.                   |
| Extensive motion/animation system    | Subtle CSS transitions are sufficient. Framer Motion adds bundle weight.      |
| AI conversation logging              | No AI system in V1.                                                           |
| Vector database                      | No AI system in V1.                                                           |
| Complex analytics dashboard          | Vercel Analytics or Plausible is sufficient.                                  |
| Discovery calls / paid consultations | Post-launch evolution.                                                        |
| Newsletter / RSS                     | Post-launch.                                                                  |

---

## Success Criteria

The platform is ready to launch when:

1. A senior engineer can browse the site and find zero signs of template or low-effort work — **MET** (3 independent code reviews graded A-)
2. A non-technical founder can understand what you do and why they should care within 30 seconds — **MET** (homepage hero + capabilities)
3. A designer (like Austin) would proudly link to your site from theirs — **PENDING** (soft launch feedback)
4. Three case studies demonstrate architecture, AI, and systems thinking at depth — **MET** (Austin, Chimera, Restorative Craft; Karinth adds a 4th)
5. ~~The inquiry form filters out low-quality leads before you ever see them~~ — **DEFERRED** (mailto CTA for launch)
6. Lighthouse scores are 95+ across the board — **PENDING VERIFICATION**
7. The site loads fast, works on mobile, and supports dark mode — **MET** (static-first, 3 client components, dark mode complete)
8. You would confidently hand this URL to anyone you want to work with — **PENDING** (after Karinth + verification pass)
