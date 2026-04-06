import { calculateReadingTime, extractToc, slugify } from '@/lib/content'

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
