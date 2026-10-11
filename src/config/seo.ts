import type { Metadata } from 'next'

import { siteConfig } from './site'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  // No site-wide canonical: each route sets its own (buildPageMetadata / buildContentMetadata).
  // A canonical here is inherited by every page that does not override it (seo-aeo-001).
  robots: {
    index: true,
    follow: true,
  },
}
