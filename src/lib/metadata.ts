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
