import { buildPageMetadata } from '@/lib/metadata'

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
