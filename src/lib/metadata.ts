import type { Metadata } from 'next'

type PageMetadataInput = {
  title: string
  description?: string
  path?: string
}

export function buildPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    ...(description !== undefined && { description }),
    openGraph: {
      title,
      ...(description !== undefined && { description }),
      ...(path !== undefined && { url: path }),
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
