import { buildContentMetadata, buildPageMetadata } from '@/lib/metadata'

describe('buildPageMetadata', () => {
  it('returns metadata with the given title', () => {
    const result = buildPageMetadata({ title: 'About' })
    expect(result.title).toBe('About')
  })

  it('returns metadata with the given description', () => {
    const result = buildPageMetadata({
      title: 'About',
      description: 'Learn about Dan Johnson',
    })
    expect(result.description).toBe('Learn about Dan Johnson')
  })

  it('does not include description when not provided', () => {
    const result = buildPageMetadata({ title: 'Work' })
    expect(result.description).toBeUndefined()
  })

  it('sets openGraph title to match page title', () => {
    const result = buildPageMetadata({ title: 'Case Studies' })
    expect(result.openGraph?.title).toBe('Case Studies')
  })

  it('includes openGraph description when provided', () => {
    const result = buildPageMetadata({
      title: 'Writing',
      description: 'Articles on engineering',
    })
    expect(result.openGraph?.description).toBe('Articles on engineering')
  })

  it('sets openGraph url when path is provided', () => {
    const result = buildPageMetadata({ title: 'About', path: '/about' })
    expect(result.openGraph?.url).toBe('/about')
  })
})

describe('buildContentMetadata', () => {
  const baseInput = {
    title: 'Austin Eischeid Site',
    description: 'A designer portfolio collaboration.',
    path: '/work/austin-eischeid',
  }

  it('returns title and description', () => {
    const result = buildContentMetadata(baseInput)
    expect(result.title).toBe('Austin Eischeid Site')
    expect(result.description).toBe('A designer portfolio collaboration.')
  })

  it('sets canonical URL from path', () => {
    const result = buildContentMetadata(baseInput)
    expect(result.alternates?.canonical).toBe('/work/austin-eischeid')
  })

  it('defaults openGraph type to article', () => {
    const result = buildContentMetadata(baseInput)
    const og = result.openGraph as Record<string, unknown>
    expect(og['type']).toBe('article')
  })

  it('includes publishedTime when provided', () => {
    const result = buildContentMetadata({ ...baseInput, publishedTime: '2026-03-15' })
    const og = result.openGraph as Record<string, unknown>
    expect(og['publishedTime']).toBe('2026-03-15')
  })

  it('includes tags as keywords', () => {
    const result = buildContentMetadata({
      ...baseInput,
      tags: ['architecture', 'performance'],
    })
    expect(result.keywords).toEqual(['architecture', 'performance'])
  })

  it('includes ogImage in openGraph and twitter', () => {
    const result = buildContentMetadata({ ...baseInput, ogImage: '/images/og/austin.png' })
    const og = result.openGraph as Record<string, unknown>
    expect(og['images']).toEqual([{ url: '/images/og/austin.png' }])
    const twitter = result.twitter as Record<string, unknown>
    expect(twitter['images']).toEqual(['/images/og/austin.png'])
  })

  it('sets twitter card to summary_large_image', () => {
    const result = buildContentMetadata(baseInput)
    const twitter = result.twitter as Record<string, unknown>
    expect(twitter['card']).toBe('summary_large_image')
  })
})
