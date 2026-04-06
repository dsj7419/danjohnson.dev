import fs from 'fs'

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

vi.mock('fs')

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
})

describe('slugify', () => {
  it('converts text to lowercase', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('replaces spaces with hyphens', () => {
    expect(slugify('some text here')).toBe('some-text-here')
  })

  it('removes special characters', () => {
    expect(slugify("What's Next?")).toBe('whats-next')
  })

  it('collapses multiple hyphens', () => {
    expect(slugify('one - two --- three')).toBe('one-two-three')
  })

  it('trims leading and trailing hyphens', () => {
    expect(slugify(' -hello world- ')).toBe('hello-world')
  })

  it('handles colons and ampersands', () => {
    expect(slugify('AI & Machine Learning: An Overview')).toBe('ai-machine-learning-an-overview')
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
