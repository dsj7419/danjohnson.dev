import {
  articleFrontmatterSchema,
  caseStudyFrontmatterSchema,
  pageFrontmatterSchema,
} from '@/types/content'

describe('caseStudyFrontmatterSchema', () => {
  const validFrontmatter = {
    title: 'Austin Eischeid Site',
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
    const result = caseStudyFrontmatterSchema.safeParse({ ...validFrontmatter, tags: [] })
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
    const result = caseStudyFrontmatterSchema.safeParse({ ...validFrontmatter, stack: [] })
    expect(result.success).toBe(false)
  })

  it('accepts optional subtitle', () => {
    const result = caseStudyFrontmatterSchema.parse({
      ...validFrontmatter,
      subtitle: 'A design collaboration',
    })
    expect(result.subtitle).toBe('A design collaboration')
  })

  it('accepts optional updatedAt date', () => {
    const result = caseStudyFrontmatterSchema.parse({
      ...validFrontmatter,
      updatedAt: '2026-04-01',
    })
    expect(result.updatedAt).toBe('2026-04-01')
  })

  it('accepts optional organization, duration, and teamSize', () => {
    const result = caseStudyFrontmatterSchema.parse({
      ...validFrontmatter,
      organization: 'Eischeid Design',
      duration: '3 months',
      teamSize: '2 engineers',
    })
    expect(result.organization).toBe('Eischeid Design')
    expect(result.duration).toBe('3 months')
    expect(result.teamSize).toBe('2 engineers')
  })

  it('accepts optional metrics array', () => {
    const result = caseStudyFrontmatterSchema.parse({
      ...validFrontmatter,
      metrics: [
        { label: 'Lighthouse', value: '98' },
        { label: 'Load Time', value: '1.2s' },
      ],
    })
    expect(result.metrics).toHaveLength(2)
    expect(result.metrics?.[0]?.label).toBe('Lighthouse')
  })

  it('accepts optional ogImage', () => {
    const result = caseStudyFrontmatterSchema.parse({
      ...validFrontmatter,
      ogImage: '/images/og/austin.png',
    })
    expect(result.ogImage).toBe('/images/og/austin.png')
  })
})

describe('articleFrontmatterSchema', () => {
  const validArticle = {
    title: 'How I Design Software Systems Before Writing Code',
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
      const result = articleFrontmatterSchema.safeParse({ ...validArticle, category })
      expect(result.success).toBe(true)
    }
  })

  it('defaults draft to false', () => {
    const result = articleFrontmatterSchema.parse(validArticle)
    expect(result.draft).toBe(false)
  })

  it('defaults featured to false', () => {
    const result = articleFrontmatterSchema.parse(validArticle)
    expect(result.featured).toBe(false)
  })

  it('accepts optional updatedAt and ogImage', () => {
    const result = articleFrontmatterSchema.parse({
      ...validArticle,
      updatedAt: '2026-04-10',
      ogImage: '/images/og/article.png',
    })
    expect(result.updatedAt).toBe('2026-04-10')
    expect(result.ogImage).toBe('/images/og/article.png')
  })
})

describe('pageFrontmatterSchema', () => {
  it('accepts valid page frontmatter', () => {
    const result = pageFrontmatterSchema.safeParse({
      title: 'About',
      description: 'Learn about Dan Johnson.',
    })
    expect(result.success).toBe(true)
  })

  it('rejects missing title', () => {
    const result = pageFrontmatterSchema.safeParse({ description: 'Some text' })
    expect(result.success).toBe(false)
  })

  it('rejects missing description', () => {
    const result = pageFrontmatterSchema.safeParse({ title: 'About' })
    expect(result.success).toBe(false)
  })

  it('accepts optional ogImage', () => {
    const result = pageFrontmatterSchema.parse({
      title: 'About',
      description: 'Learn about Dan Johnson.',
      ogImage: '/images/og/about.png',
    })
    expect(result.ogImage).toBe('/images/og/about.png')
  })
})
