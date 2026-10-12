import fs from 'fs'
import GithubSlugger from 'github-slugger'

import {
  calculateReadingTime,
  extractToc,
  getAllArticles,
  getAllCaseStudies,
  getArticle,
  getCaseStudy,
  getPage,
  slugify,
} from '@/lib/content'

// Vitest 4 no longer automocks the methods of a default-exported Node built-in, so the three
// functions the loader uses are declared as mocks for both the default and named import shapes.
vi.mock('fs', () => {
  const mocked = { existsSync: vi.fn(), readdirSync: vi.fn(), readFileSync: vi.fn() }
  return { default: mocked, ...mocked }
})

const validCaseStudyMdx = `---
title: "Test Project"
description: "A test project."
date: "2026-01-15"
tags:
  - architecture
role: "Lead Engineer"
stack:
  - Next.js
featured: true
---

## Overview

This is the overview.

### Details

Some details here.
`

const validArticleMdx = `---
title: "Test Article"
description: "A test article."
date: "2026-02-01"
tags:
  - engineering
category: "architecture"
---

## Introduction

Some text.
`

const validPageMdx = `---
title: "About"
description: "About page."
---

## Background

Content here.
`

describe('calculateReadingTime', () => {
  it('returns 1 minute for very short content', () => {
    expect(calculateReadingTime('Hello world')).toBe(1)
  })

  it('returns correct time for ~225 word content', () => {
    const words = Array.from({ length: 225 }, () => 'word').join(' ')
    expect(calculateReadingTime(words)).toBe(1)
  })

  it('returns correct time for ~450 word content', () => {
    const words = Array.from({ length: 450 }, () => 'word').join(' ')
    expect(calculateReadingTime(words)).toBe(2)
  })

  it('returns correct time for ~1000 word content', () => {
    const words = Array.from({ length: 1000 }, () => 'word').join(' ')
    expect(calculateReadingTime(words)).toBe(4)
  })

  it('handles empty content', () => {
    expect(calculateReadingTime('')).toBe(1)
  })

  describe('counts prose, not markup', () => {
    const prose = Array.from({ length: 450 }, () => 'word').join(' ')
    const svgAttributes = Array.from(
      { length: 600 },
      (_, i) => `<rect x="${String(i)}" y="0" width="10" height="10" />`,
    ).join('\n')

    it('ignores an inline SVG diagram', () => {
      const content = `${prose}\n\n<figure>\n<svg viewBox="0 0 800 400">\n${svgAttributes}\n</svg>\n</figure>\n`
      expect(calculateReadingTime(content)).toBe(2)
    })

    it('ignores import and export lines', () => {
      const imports = Array.from({ length: 300 }, (_, i) => `import X${String(i)} from 'y'`).join(
        '\n',
      )
      expect(calculateReadingTime(`${imports}\nexport const meta = {}\n\n${prose}`)).toBe(2)
    })

    it('keeps the words inside JSX components while dropping their attributes', () => {
      const callout = `<Callout variant="note" title="Status">\n${prose}\n</Callout>`
      expect(calculateReadingTime(callout)).toBe(2)
    })

    it('ignores MDX comments', () => {
      const comment = `{/* ${Array.from({ length: 600 }, () => 'note').join(' ')} */}`
      expect(calculateReadingTime(`${comment}\n${prose}`)).toBe(2)
    })
  })
})

describe('extractToc', () => {
  it('extracts h2 headings', () => {
    const content = '## The Problem\n\nSome text\n\n## The Approach'
    const toc = extractToc(content)
    expect(toc).toHaveLength(2)
    expect(toc[0]).toEqual({ depth: 2, text: 'The Problem', id: 'the-problem' })
    expect(toc[1]).toEqual({ depth: 2, text: 'The Approach', id: 'the-approach' })
  })

  it('extracts h3 headings', () => {
    const content = '### State Management\n\nSome text'
    const toc = extractToc(content)
    expect(toc).toHaveLength(1)
    expect(toc[0]).toEqual({ depth: 3, text: 'State Management', id: 'state-management' })
  })

  it('extracts both h2 and h3 headings in order', () => {
    const content = '## Overview\n\n### Details\n\n## Architecture\n\n### Components'
    const toc = extractToc(content)
    expect(toc).toHaveLength(4)
    expect(toc[0]?.depth).toBe(2)
    expect(toc[1]?.depth).toBe(3)
    expect(toc[2]?.depth).toBe(2)
    expect(toc[3]?.depth).toBe(3)
  })

  it('ignores h1 and h4+ headings', () => {
    const content = '# Title\n\n## Section\n\n#### Subsub\n\n##### Deep'
    const toc = extractToc(content)
    expect(toc).toHaveLength(1)
    expect(toc[0]?.text).toBe('Section')
  })

  it('returns empty array for content without headings', () => {
    const content = 'Just some text without any headings.'
    const toc = extractToc(content)
    expect(toc).toHaveLength(0)
  })

  it('handles special characters in heading text', () => {
    const content = '## Why AI Costs Matter: A Real-World Analysis'
    const toc = extractToc(content)
    expect(toc[0]?.id).toBe('why-ai-costs-matter-a-real-world-analysis')
  })

  // Regression guards for architecture-002 / code-quality-001: the TOC must produce the same ids
  // that rehype-slug (github-slugger) stamps on the rendered headings, or TOC links point nowhere.
  it('matches rehype-slug ids for headings with ampersands and dashes', () => {
    const content = "## Decisions & Tradeoffs\n\n## It isn't language — it's intent"
    const toc = extractToc(content)
    expect(toc.map((e) => e.id)).toEqual(['decisions--tradeoffs', 'it-isnt-language--its-intent'])
  })

  it('de-duplicates repeated headings the way rehype-slug does', () => {
    const content = '## Outcome\n\n### Outcome\n\n## Outcome'
    const toc = extractToc(content)
    expect(toc.map((e) => e.id)).toEqual(['outcome', 'outcome-1', 'outcome-2'])
  })

  it('starts a fresh id sequence for every document', () => {
    expect(extractToc('## Outcome')[0]?.id).toBe('outcome')
    expect(extractToc('## Outcome')[0]?.id).toBe('outcome')
  })

  it('slugs the rendered text of headings that contain inline code, links and emphasis', () => {
    const content = '## Using `depguard` with [rehype-slug](https://example.com) and *care*'
    const toc = extractToc(content)
    expect(toc[0]?.text).toBe('Using depguard with rehype-slug and care')
    expect(toc[0]?.id).toBe('using-depguard-with-rehype-slug-and-care')
  })

  it('keeps intraword underscores (identifiers are not emphasis; github-slugger keeps them)', () => {
    const content = '## Tuning `MAX_OPEN_CONNS` at COMBAT_SCALE=10,000 with _real_ emphasis'
    const toc = extractToc(content)
    expect(toc[0]?.text).toBe('Tuning MAX_OPEN_CONNS at COMBAT_SCALE=10,000 with real emphasis')
    expect(toc[0]?.id).toBe('tuning-max_open_conns-at-combat_scale10000-with-real-emphasis')
  })
})

describe('slugify', () => {
  it('produces exactly what github-slugger produces for a single heading', () => {
    const samples = [
      'Hello World',
      "What's Next?",
      'one - two --- three',
      'AI & Machine Learning: An Overview',
      'Layer 1: imports',
      'Security & Performance',
    ]
    for (const sample of samples) {
      expect(slugify(sample)).toBe(new GithubSlugger().slug(sample))
    }
  })

  it('does not collapse the double hyphen github-slugger leaves after a removed character', () => {
    expect(slugify('Decisions & Tradeoffs')).toBe('decisions--tradeoffs')
  })
})

describe('getAllCaseStudies', () => {
  beforeEach(() => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readdirSync).mockReturnValue(['test-project.mdx' as never])
    vi.mocked(fs.readFileSync).mockReturnValue(validCaseStudyMdx)
  })

  it('returns case studies with correct slug', () => {
    const entries = getAllCaseStudies()
    expect(entries[0]?.slug).toBe('test-project')
  })

  it('returns case studies with validated frontmatter', () => {
    const entries = getAllCaseStudies()
    expect(entries[0]?.frontmatter.title).toBe('Test Project')
    expect(entries[0]?.frontmatter.role).toBe('Lead Engineer')
  })

  it('calculates reading time', () => {
    const entries = getAllCaseStudies()
    expect(entries[0]?.readingTime).toBeGreaterThanOrEqual(1)
  })

  it('extracts table of contents', () => {
    const entries = getAllCaseStudies()
    expect(entries[0]?.toc).toHaveLength(2)
    expect(entries[0]?.toc[0]?.text).toBe('Overview')
  })

  it('returns empty array when directory does not exist', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)
    const entries = getAllCaseStudies()
    expect(entries).toHaveLength(0)
  })

  it('throws on invalid frontmatter', () => {
    vi.mocked(fs.readFileSync).mockReturnValue('---\ntitle: ""\n---\nContent')
    expect(() => getAllCaseStudies()).toThrow(/Invalid frontmatter/)
  })
})

describe('getCaseStudy', () => {
  beforeEach(() => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readdirSync).mockReturnValue(['test-project.mdx' as never])
    vi.mocked(fs.readFileSync).mockReturnValue(validCaseStudyMdx)
  })

  it('returns entry by slug', () => {
    const entry = getCaseStudy('test-project')
    expect(entry?.frontmatter.title).toBe('Test Project')
  })

  it('returns undefined for unknown slug', () => {
    const entry = getCaseStudy('nonexistent')
    expect(entry).toBeUndefined()
  })
})

describe('getAllArticles', () => {
  beforeEach(() => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readdirSync).mockReturnValue(['test-article.mdx' as never])
    vi.mocked(fs.readFileSync).mockReturnValue(validArticleMdx)
  })

  it('returns articles with correct slug', () => {
    const entries = getAllArticles()
    expect(entries[0]?.slug).toBe('test-article')
  })

  it('returns articles with validated frontmatter', () => {
    const entries = getAllArticles()
    expect(entries[0]?.frontmatter.title).toBe('Test Article')
    expect(entries[0]?.frontmatter.category).toBe('architecture')
  })
})

describe('getArticle', () => {
  beforeEach(() => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readdirSync).mockReturnValue(['test-article.mdx' as never])
    vi.mocked(fs.readFileSync).mockReturnValue(validArticleMdx)
  })

  it('returns entry by slug', () => {
    const entry = getArticle('test-article')
    expect(entry?.frontmatter.title).toBe('Test Article')
  })

  it('returns undefined for unknown slug', () => {
    const entry = getArticle('nonexistent')
    expect(entry).toBeUndefined()
  })
})

describe('getPage', () => {
  beforeEach(() => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readdirSync).mockReturnValue(['about.mdx' as never])
    vi.mocked(fs.readFileSync).mockReturnValue(validPageMdx)
  })

  it('returns page by slug', () => {
    const entry = getPage('about')
    expect(entry?.frontmatter.title).toBe('About')
  })

  it('returns undefined for unknown slug', () => {
    const entry = getPage('nonexistent')
    expect(entry).toBeUndefined()
  })
})

describe('draft filtering', () => {
  const draftMdx = `---
title: "Draft Project"
description: "A draft."
date: "2026-01-01"
tags:
  - test
role: "Engineer"
stack:
  - Node.js
draft: true
---

Content here.
`

  beforeEach(() => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readdirSync).mockReturnValue(['draft.mdx' as never])
    vi.mocked(fs.readFileSync).mockReturnValue(draftMdx)
  })

  it('includes drafts in development', () => {
    vi.stubEnv('NODE_ENV', 'development')
    const entries = getAllCaseStudies()
    expect(entries).toHaveLength(1)
    vi.unstubAllEnvs()
  })

  it('excludes drafts in production', () => {
    vi.stubEnv('NODE_ENV', 'production')
    const entries = getAllCaseStudies()
    expect(entries).toHaveLength(0)
    vi.unstubAllEnvs()
  })
})
