import { defaultMetadata } from '@/config/seo'

describe('defaultMetadata', () => {
  it('does not declare a site-wide canonical (pages must set their own)', () => {
    // Regression guard for seo-aeo-001: a canonical on the root metadata was inherited by every
    // page that did not override it, telling search engines five pages were duplicates of the home page.
    expect(defaultMetadata.alternates).toBeUndefined()
  })

  it('keeps the shared openGraph defaults', () => {
    expect(defaultMetadata.openGraph?.siteName).toBe('Dan Johnson')
    expect(defaultMetadata.openGraph?.locale).toBe('en_US')
  })
})
