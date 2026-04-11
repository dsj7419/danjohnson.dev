import { siteConfig } from '@/config/site'

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  }
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: 'Product Engineer & Systems Architect',
    sameAs: [siteConfig.social.github],
  }
}

export function articleJsonLd(input: {
  title: string
  description: string
  date: string
  url: string
  updatedAt?: string | undefined
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    ...(input.updatedAt !== undefined && { dateModified: input.updatedAt }),
    url: `${siteConfig.url}${input.url}`,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }
}
