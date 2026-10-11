import type { Metadata } from 'next'

/** Served by `src/app/opengraph-image.tsx`; resolved against `metadataBase`. */
const SITE_OG_IMAGE = '/opengraph-image'

type PageMetadataInput = {
  title: string
  description?: string
  path?: string
}

/**
 * Metadata for a static page. Next.js replaces (not merges) the `openGraph`, `twitter` and
 * `alternates` objects per route, so this builder must emit complete blocks: a page that set only
 * `openGraph.title` inherited the homepage's canonical and twitter card and lost `og:type` and
 * `og:site_name` (seo-aeo-001, seo-aeo-002).
 */
export function buildPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    ...(description !== undefined && { description }),
    ...(path !== undefined && { alternates: { canonical: path } }),
    openGraph: {
      title,
      ...(description !== undefined && { description }),
      ...(path !== undefined && { url: path }),
      type: 'website',
      siteName: 'Dan Johnson',
      locale: 'en_US',
      // The root opengraph-image file only applies to routes without their own openGraph block.
      images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: 'Dan Johnson' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      ...(description !== undefined && { description }),
      images: [SITE_OG_IMAGE],
    },
  }
}

type ContentMetadataInput = {
  title: string
  description: string
  path: string
  type?: 'article' | 'website' | undefined
  publishedTime?: string | undefined
  modifiedTime?: string | undefined
  ogImage?: string | undefined
  tags?: string[] | undefined
}

export function buildContentMetadata({
  title,
  description,
  path,
  type = 'article',
  publishedTime,
  modifiedTime,
  ogImage,
  tags,
}: ContentMetadataInput): Metadata {
  return {
    title,
    description,
    keywords: tags,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      type,
      siteName: 'Dan Johnson',
      locale: 'en_US',
      ...(publishedTime !== undefined && { publishedTime }),
      ...(modifiedTime !== undefined && { modifiedTime }),
      ...(ogImage !== undefined && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage !== undefined && { images: [ogImage] }),
    },
  }
}
