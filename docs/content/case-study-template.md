# Case Study Template

Every case study follows this structure. Consistency signals professionalism.

## Required Frontmatter

```yaml
title: 'Project Name'
subtitle: 'Optional subtitle'
description: 'One-sentence summary of the project.'
date: 'YYYY-MM-DD'
tags: ['architecture', 'ai', 'performance']
role: 'Lead Engineer'
client: 'Client Name' # optional
organization: 'Org Name' # optional
duration: '3 months' # optional
teamSize: '2 engineers' # optional
stack: ['Next.js', 'TypeScript', 'PostgreSQL']
outcome: 'Launched on time with 98 Lighthouse score' # optional
featured: true # appears on homepage
draft: false # set true to hide from production
metrics: # optional, auto-rendered as MetricStrip
  - label: 'Lighthouse'
    value: '98'
  - label: 'Load Time'
    value: '1.2s'
related: # optional, renders Related Reading section
  - '/writing/working-with-designers'
  - '/work/project-chimera'
```

## Section Structure

1. **Overview** — What the product is, who it's for, your role
2. **The Problem** — What made this challenging (not easy = not impressive)
3. **Constraints** — Real-world limitations (timeline, budget, legacy, performance targets)
4. **Approach** — High-level decisions and reasoning (architecture-first, not tools-first)
5. **Architecture** — System diagram (static SVG), component relationships, data flow
6. **Engineering Challenges** — The hardest technical parts, explained honestly
7. **Decisions & Tradeoffs** — What options were considered, why this path was chosen, what was accepted
8. **Security & Performance** — Input validation, optimization strategy, Lighthouse scores
9. **AI Integration** — (if applicable) What AI does, hallucination handling, cost control
10. **Outcome** — Results, impact, client satisfaction, before/after
11. **Stack** — Brief list, not overemphasized
12. **Reflection** — What you learned, what you'd do differently

## Narrative Standard

Case studies must tell a **decision story**, not a feature list:

- Why the problem was difficult (not just what it was)
- What options were considered (not just what was chosen)
- Why the chosen architecture was selected over alternatives
- What tradeoffs were accepted and why
- What went wrong during the project
- What was learned that applies to future work

This is the difference between "Here's what I built" (mid-level) and "Here's how I think under real constraints" (senior).

## Architecture Diagram Standards

All diagrams must follow consistent standards:

**Color coding:**

- Blue — frontend / client
- Green — backend / services
- Orange — external APIs / third-party
- Purple — AI / LLM services
- Gray — database / storage

**Required elements:**

- System boundaries, data flow, external services, databases
- Diagram title and caption explaining the architecture in plain English
- Must work in both light and dark mode

## Internal Linking Rules

Every case study must link to:

- At least 1 related article
- The How I Build page (when a principle is demonstrated)
- The Work With Me page at the end (CTA)

## Writing Tone

Write like a senior engineer explaining a project to another smart person. Clear, structured, honest. Not marketing copy. Not raw technical docs. Show real tradeoffs and real lessons.

Written for the audience that hires senior engineers: founders, designers, engineers, and product managers — people who make decisions about who builds their systems.

**Recommended length:** 1,500-3,000 words.
