import type { MetadataRoute } from 'next'

import { siteConfig } from '@/config/site'
import { getAllArticles, getAllCaseStudies } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudies = getAllCaseStudies().map((entry) => ({
    url: `${siteConfig.url}/work/${entry.slug}`,
    lastModified: entry.frontmatter.updatedAt ?? entry.frontmatter.date,
    changeFrequency: 'yearly' as const,
    priority: 0.8,
  }))

  const articles = getAllArticles().map((entry) => ({
    url: `${siteConfig.url}/writing/${entry.slug}`,
    lastModified: entry.frontmatter.updatedAt ?? entry.frontmatter.date,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const staticPages = [
    { url: siteConfig.url, changeFrequency: 'monthly' as const, priority: 1.0 },
    { url: `${siteConfig.url}/work`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${siteConfig.url}/writing`, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${siteConfig.url}/about`, changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${siteConfig.url}/how-i-build`, changeFrequency: 'yearly' as const, priority: 0.5 },
    {
      url: `${siteConfig.url}/work-with-me`,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
  ]

  return [...staticPages, ...caseStudies, ...articles]
}
