import { siteConfig } from '@/config/site'
import { articleJsonLd, personJsonLd, websiteJsonLd } from '@/lib/structured-data'

describe('websiteJsonLd', () => {
  it('uses the schema.org context', () => {
    expect(websiteJsonLd()['@context']).toBe('https://schema.org')
  })

  it('declares the WebSite type', () => {
    expect(websiteJsonLd()['@type']).toBe('WebSite')
  })

  it('takes name, url, and description from siteConfig', () => {
    const result = websiteJsonLd()
    expect(result.name).toBe(siteConfig.name)
    expect(result.url).toBe(siteConfig.url)
    expect(result.description).toBe(siteConfig.description)
  })
})

describe('personJsonLd', () => {
  it('uses the schema.org context', () => {
    expect(personJsonLd()['@context']).toBe('https://schema.org')
  })

  it('declares the Person type', () => {
    expect(personJsonLd()['@type']).toBe('Person')
  })

  it('takes name and url from siteConfig', () => {
    const result = personJsonLd()
    expect(result.name).toBe(siteConfig.name)
    expect(result.url).toBe(siteConfig.url)
  })

  it('includes a jobTitle', () => {
    expect(personJsonLd().jobTitle).toBe('Product Engineer & Systems Architect')
  })

  it('lists the GitHub profile in sameAs', () => {
    expect(personJsonLd().sameAs).toContain(siteConfig.social.github)
  })
})

describe('articleJsonLd', () => {
  const input = {
    title: 'Building Reliable Systems',
    description: 'How I approach high-reliability software.',
    date: '2026-03-14',
    url: '/writing/building-reliable-systems',
  }

  it('uses the schema.org context', () => {
    expect(articleJsonLd(input)['@context']).toBe('https://schema.org')
  })

  it('declares the Article type', () => {
    expect(articleJsonLd(input)['@type']).toBe('Article')
  })

  it('maps the title to headline', () => {
    expect(articleJsonLd(input).headline).toBe(input.title)
  })

  it('passes through the description', () => {
    expect(articleJsonLd(input).description).toBe(input.description)
  })

  it('maps the date to datePublished', () => {
    expect(articleJsonLd(input).datePublished).toBe(input.date)
  })

  it('builds an absolute url from siteConfig.url and the input url', () => {
    expect(articleJsonLd(input).url).toBe(`${siteConfig.url}${input.url}`)
  })

  it('includes a Person author block sourced from siteConfig', () => {
    expect(articleJsonLd(input).author).toEqual({
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    })
  })

  it('omits dateModified when updatedAt is absent', () => {
    expect(articleJsonLd(input)).not.toHaveProperty('dateModified')
  })

  it('includes dateModified when updatedAt is supplied', () => {
    const result = articleJsonLd({ ...input, updatedAt: '2026-04-01' })
    expect(result).toHaveProperty('dateModified', '2026-04-01')
  })
})
