import { articleFrontmatterSchema, caseStudyFrontmatterSchema } from '@/types/content'

describe('caseStudyFrontmatterSchema', () => {
  const validFrontmatter = {
    title: 'Austin Eischeid Site',
    slug: 'austin-eischeid',
    description: 'A designer portfolio built as a technical collaboration.',
    date: '2026-03-15',
    tags: ['architecture', 'performance', 'collaboration'],
    role: 'Lead Engineer',
    stack: ['Next.js', 'TypeScript', 'Sanity'],
  }

  it('accepts valid frontmatter', () => {
    const result = caseStudyFrontmatterSchema.safeParse(validFrontmatter)
    expect(result.success).toBe(true)
  })

  it('defaults featured to false when not provided', () => {
    const result = caseStudyFrontmatterSchema.parse(validFrontmatter)
    expect(result.featured).toBe(false)
  })

  it('defaults draft to false when not provided', () => {
    const result = caseStudyFrontmatterSchema.parse(validFrontmatter)
    expect(result.draft).toBe(false)
  })

  it('rejects frontmatter with missing title', () => {
    const { title: _, ...withoutTitle } = validFrontmatter
    const result = caseStudyFrontmatterSchema.safeParse(withoutTitle)
    expect(result.success).toBe(false)
  })

  it('rejects frontmatter with empty tags array', () => {
    const result = caseStudyFrontmatterSchema.safeParse({
      ...validFrontmatter,
      tags: [],
    })
    expect(result.success).toBe(false)
  })

  it('rejects frontmatter with invalid date format', () => {
    const result = caseStudyFrontmatterSchema.safeParse({
      ...validFrontmatter,
      date: 'March 15, 2026',
    })
    expect(result.success).toBe(false)
  })

  it('accepts optional client field', () => {
    const result = caseStudyFrontmatterSchema.parse({
      ...validFrontmatter,
      client: 'Austin Eischeid',
    })
    expect(result.client).toBe('Austin Eischeid')
  })

  it('rejects frontmatter with empty stack array', () => {
    const result = caseStudyFrontmatterSchema.safeParse({
      ...validFrontmatter,
      stack: [],
    })
    expect(result.success).toBe(false)
  })
})

describe('articleFrontmatterSchema', () => {
  const validArticle = {
    title: 'How I Design Software Systems Before Writing Code',
    slug: 'design-systems-before-code',
    description: 'My approach to architecture-first development.',
    date: '2026-04-01',
    tags: ['architecture', 'engineering'],
    category: 'engineering-philosophy' as const,
  }

  it('accepts valid article frontmatter', () => {
    const result = articleFrontmatterSchema.safeParse(validArticle)
    expect(result.success).toBe(true)
  })

  it('rejects invalid category', () => {
    const result = articleFrontmatterSchema.safeParse({
      ...validArticle,
      category: 'random-topic',
    })
    expect(result.success).toBe(false)
  })

  it('accepts all valid categories', () => {
    const categories = [
      'engineering-philosophy',
      'architecture',
      'ai',
      'lessons-learned',
      'performance',
      'security',
    ] as const

    for (const category of categories) {
      const result = articleFrontmatterSchema.safeParse({
        ...validArticle,
        category,
      })
      expect(result.success).toBe(true)
    }
  })

  it('defaults draft to false', () => {
    const result = articleFrontmatterSchema.parse(validArticle)
    expect(result.draft).toBe(false)
  })
})
