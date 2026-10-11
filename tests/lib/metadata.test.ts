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

  // Regression guards for seo-aeo-001 / seo-aeo-002: static pages must carry their own canonical
  // and a complete openGraph/twitter block, because Next.js replaces (not merges) these objects.
  it('sets the canonical to the page path', () => {
    const result = buildPageMetadata({ title: 'About', path: '/about' })
    expect(result.alternates?.canonical).toBe('/about')
  })

  it('does not set a canonical when no path is provided', () => {
    const result = buildPageMetadata({ title: 'About' })
    expect(result.alternates).toBeUndefined()
  })

  it('declares openGraph type website, siteName and locale', () => {
    const result = buildPageMetadata({ title: 'About', path: '/about' })
    const og = result.openGraph as Record<string, unknown>
    expect(og['type']).toBe('website')
    expect(og['siteName']).toBe('Dan Johnson')
    expect(og['locale']).toBe('en_US')
  })

  it('sets a twitter card whose title matches the page title', () => {
    const result = buildPageMetadata({
      title: 'Work With Me',
      description: 'Engagements',
      path: '/work-with-me',
    })
    const twitter = result.twitter as Record<string, unknown>
    expect(twitter['card']).toBe('summary_large_image')
    expect(twitter['title']).toBe('Work With Me')
    expect(twitter['description']).toBe('Engagements')
  })

  it('references the site Open Graph image so share previews are not blank', () => {
    // The root opengraph-image file applies only to routes that do not define their own openGraph
    // block; static pages define one, so they must point at the image explicitly (seo-aeo-002).
    const result = buildPageMetadata({ title: 'About', path: '/about' })
    const og = result.openGraph as Record<string, unknown>
    expect(og['images']).toEqual([
      { url: '/opengraph-image', width: 1200, height: 630, alt: 'Dan Johnson' },
    ])
    const twitter = result.twitter as Record<string, unknown>
    expect(twitter['images']).toEqual(['/opengraph-image'])
  })

  it('keeps twitter title in sync with openGraph title', () => {
    const result = buildPageMetadata({ title: 'Writing', path: '/writing' })
    const og = result.openGraph as Record<string, unknown>
    const twitter = result.twitter as Record<string, unknown>
    expect(twitter['title']).toBe(og['title'])
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
