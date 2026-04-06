# Dan Johnson Platform — Execution Epics

> **Target launch:** Mid-May 2026 (~6 weeks from 2026-04-05)
> **Guiding principle:** Content and positioning before features. Launch before perfection.
> **Quality bar:** Every element must withstand scrutiny from senior engineers and the webdev community.

---

## Epic 0: Project Foundation

**Goal:** Repository, tooling, and environment — ready to build.

- [ ] Secure domain (danjohnson.dev, danjohnson.io, or similar)
- [ ] Initialize Next.js (App Router) + TypeScript strict mode
- [ ] Configure monorepo structure if needed (turborepo/pnpm workspaces)
- [ ] Set up linting (ESLint + Prettier), Tailwind CSS, path aliases
- [ ] Set up Vercel project with preview + production environments
- [ ] Configure environment variables strategy
- [ ] Set up testing infrastructure (Vitest + React Testing Library)
- [ ] Choose CMS: Sanity OR MDX-in-repo (one, not both — decision point below)
- [ ] Set up Git branching strategy and CI pipeline
- [ ] Set up error monitoring (Sentry) and analytics (Vercel Analytics or Plausible)

### Decision: CMS Approach

**Option A — Sanity:** Best if you want a visual editing experience, structured content queries (GROQ), image pipeline, and the ability to edit content without touching code. Heavier initial setup but powerful for case studies with structured metadata.

**Option B — MDX in repo:** Best if you want everything in Git, version-controlled, close to code. Simpler architecture, fewer moving parts, faster to set up. You write in markdown with component embeds. Content lives alongside code.

**Recommendation for your timeline:** MDX in repo. Fewer dependencies, faster to launch, everything version-controlled (which you value), and you can always migrate to a headless CMS later. For a solo operator on a 6-week timeline, removing the CMS dependency removes an entire category of integration work.

**Estimated time:** 2-3 days

---

## Epic 1: Design System Foundation

**Goal:** Reusable component library implementing the "Technical Editorial Minimalism" identity.

### 1.1 Design Tokens

- [ ] Color system: neutral palette + muted indigo-blue accent (light + dark mode)
- [ ] Typography scale: serif headings (e.g., Playfair Display, Source Serif Pro), sans body (e.g., Inter, Source Sans), monospace for technical annotations
- [ ] Spacing scale (4px base, consistent rhythm)
- [ ] Breakpoint system
- [ ] Motion tokens (duration, easing — fast and subtle)

### 1.2 Core Components

- [ ] Typography components (H1-H4, body, caption, code, label)
- [ ] Button (primary, secondary, ghost)
- [ ] Card (project card, article card)
- [ ] Section container (full-width, reading-width, wide)
- [ ] Grid layouts (2-col, 3-col, asymmetric)
- [ ] Navigation (sticky, minimal, current-page indicator, mobile responsive)
- [ ] Footer (contact, GitHub, LinkedIn, copyright)
- [ ] Tag/badge (for project categories)
- [ ] Callout/annotation block
- [ ] Metric/stat block

### 1.3 Content Components

- [ ] MDX renderer with custom components (if MDX path chosen)
- [ ] Image component with optimization and lazy loading
- [ ] Code block with syntax highlighting
- [ ] Architecture diagram container (static SVG for V1)
- [ ] Table of contents (auto-generated from headings)
- [ ] Quote/testimonial block

### 1.4 Dark Mode

- [ ] CSS custom properties for theme switching
- [ ] System preference detection + manual toggle
- [ ] All components verified in both themes

**Estimated time:** 5-7 days

---

## Epic 2: Content Production (CRITICAL PATH)

**Goal:** Write the case studies and page content that ARE the platform. This is the most important epic.

> Start this in parallel with Epic 1. Writing doesn't require code.

### 2.1 Case Studies (3 required for launch)

Austin Eischeid Site

- [ ] Overview: designer collaboration, what the product is
- [ ] Problem: translating a designer's vision into production reality
- [ ] Constraints: designer expectations, performance targets, CMS needs
- [ ] Approach: architecture decisions, technology selection rationale
- [ ] Architecture: system diagram (static SVG)
- [ ] Engineering challenges: the hard parts
- [ ] Security & performance: Lighthouse scores, optimization strategy
- [ ] Outcome: results, collaboration quality
- [ ] Stack summary
- [ ] Reflection: lessons learned
- [ ] Screenshots and visual assets gathered

Project Chimera

- [ ] Same structure as above
- [ ] AI integration section: what AI does, how hallucinations handled, cost control
- [ ] Architecture diagram showing AI pipeline

Forges of Karinth

- [ ] Same structure as above
- [ ] Focus on deterministic simulation, game engine architecture
- [ ] Architecture diagram showing simulation pipeline

### 2.2 Page Content

Homepage copy

- [ ] Hero statement (who you are, what you do — 2-3 sentences)
- [ ] Credibility signals section (projects, awards, experience summary)
- [ ] Selected work summaries (3 cards linking to case studies)
- [ ] Capability areas (5-6 categories of work you do)
- [ ] Engineering philosophy teaser (links to How I Build)
- [ ] Selected writing teaser (links to 2-3 articles)
- [ ] Brief about section
- [ ] CTA to Work With Me

How I Build

- [ ] Architecture-first thinking
- [ ] AI-augmented development workflow (how you actually use AI tools in your process)
- [ ] Testing philosophy (TDD)
- [ ] Performance and security practices
- [ ] How you collaborate with designers and product teams
- [ ] How you approach new projects
- [ ] Long-term maintainability mindset

About

- [ ] Background and story
- [ ] What drives you
- [ ] How you work with people
- [ ] Professional photo (if available)

Work With Me

- [ ] Who you work with (founders, designers, teams)
- [ ] Types of projects you take on
- [ ] Where you add the most value (positive framing, not "what I reject")
- [ ] What working together looks like
- [ ] CTA to inquiry form

### 2.3 Writing / Articles (3-5 for launch)

- [ ] "How I Design Software Systems Before Writing Code"
- [ ] "Working With Designers: Turning Vision Into Reality" (ties to Austin case study)
- [ ] "Using AI in Real Products, Not Just Demos" (ties to Chimera)
- [ ] Optional: "Performance Is a Feature"
- [ ] Optional: "Why Most Software Projects Become Unmaintainable"

### 2.4 Architecture Diagrams

- [ ] Austin site architecture (static SVG, clean and labeled)
- [ ] Chimera architecture (static SVG, including AI pipeline)
- [ ] Karinth architecture (static SVG, including simulation engine)
- [ ] This platform's architecture (can be added post-launch as its own case study)

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

### 3.4 Case Study Template

- [ ] Reusable template matching the 10-12 section structure
- [ ] Table of contents (auto-generated)
- [ ] Architecture diagram embed
- [ ] Image gallery support
- [ ] Stack display
- [ ] Reading progress indicator (subtle)
- [ ] Related articles/projects links

### 3.5 Writing Page

- [ ] Article index (organized by category, not chronological feed)
- [ ] Categories: Engineering Philosophy, Architecture, AI, Lessons Learned

### 3.6 Article Template

- [ ] Reading-width layout
- [ ] Table of contents
- [ ] Estimated reading time
- [ ] Related articles
- [ ] Author/date metadata

### 3.7 How I Build Page

- [ ] Structured sections with clear hierarchy
- [ ] Links to relevant case studies as evidence

### 3.8 About Page

- [ ] Personal narrative layout
- [ ] Professional photo placement
- [ ] Links to work and writing

### 3.9 Work With Me Page

- [ ] Positioning copy
- [ ] Inquiry form (see Epic 4)

### 3.10 Utility Pages

- [ ] Custom 404 (on-brand, helpful)
- [ ] Form success/confirmation page

**Estimated time:** 7-10 days (depends on Epic 2 content readiness)

---

## Epic 4: Inquiry System

**Goal:** Multi-step intake form that filters for serious projects.

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

## Epic 5: Launch Readiness

**Goal:** Polish, performance, accessibility, and go-live.

### 5.1 Performance Pass

- [ ] Lighthouse audit: target 95+ on all categories
- [ ] Image optimization verified
- [ ] Font loading strategy (swap, preload)
- [ ] Bundle analysis — minimize JS shipped
- [ ] Static generation for all content pages
- [ ] Proper caching headers
- [ ] Core Web Vitals verified (LCP, INP, CLS)

### 5.2 Accessibility Pass

- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation throughout
- [ ] Screen reader testing
- [ ] Color contrast verification (both themes)
- [ ] Focus indicators
- [ ] Alt text on all images
- [ ] Semantic HTML

### 5.3 Mobile Pass

- [ ] All pages verified on mobile breakpoints
- [ ] Touch targets sized appropriately
- [ ] Navigation works on mobile
- [ ] Case studies readable on mobile
- [ ] Inquiry form usable on mobile

### 5.4 SEO & Metadata

- [ ] Open Graph tags on all pages
- [ ] Twitter card tags
- [ ] Structured data (JSON-LD: Person, Article, WebSite)
- [ ] Sitemap generated
- [ ] robots.txt configured
- [ ] Social preview images for key pages
- [ ] Canonical URLs

### 5.5 Final Checklist

- [ ] Domain configured and DNS propagated
- [ ] SSL/HTTPS verified
- [ ] Error monitoring active (Sentry)
- [ ] Analytics active
- [ ] All links tested
- [ ] Forms tested end-to-end
- [ ] 404 page works
- [ ] Favicon and app icons
- [ ] Print stylesheet (optional but classy for case studies)

### 5.6 Soft Launch

- [ ] Share with Austin Eischeid for feedback
- [ ] Share with 5-10 trusted peers for feedback
- [ ] Incorporate critical feedback
- [ ] Go live publicly

**Estimated time:** 3-5 days

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

## Timeline Overview (~6 weeks)

```text
Week 1:     Epic 0 (Foundation) + Start Epic 2 (Content writing)
Week 1-2:   Epic 1 (Design System) + Continue Epic 2
Week 2-3:   Continue Epic 2 (Content) + Start Epic 3 (Pages)
Week 3-4:   Epic 3 (Core Pages) + Epic 4 (Inquiry System)
Week 5:     Epic 5 (Launch Readiness — polish, perf, a11y)
Week 6:     Soft launch, feedback, fixes, go live
```

Content writing (Epic 2) runs in parallel the entire time. It is the critical path.

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

1. A senior engineer can browse the site and find zero signs of template or low-effort work
2. A non-technical founder can understand what you do and why they should care within 30 seconds
3. A designer (like Austin) would proudly link to your site from theirs
4. Three case studies demonstrate architecture, AI, and systems thinking at depth
5. The inquiry form filters out low-quality leads before you ever see them
6. Lighthouse scores are 95+ across the board
7. The site loads fast, works on mobile, and supports dark mode
8. You would confidently hand this URL to anyone you want to work with
