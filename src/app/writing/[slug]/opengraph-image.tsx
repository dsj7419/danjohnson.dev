import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'

import { siteConfig } from '@/config/site'
import { getAllArticles, getArticle } from '@/lib/content'
import { formatPublishDate } from '@/lib/dates'

// Uses the Node.js runtime (the Next.js default) rather than `edge`, because
// the content loader in @/lib/content uses Node's `fs` and `path` modules
// to read MDX files from disk. The edge runtime forbids Node built-ins.
// Functional impact at build time is zero: `generateStaticParams` plus
// `dynamicParams = false` (declared here as well as on the parent page, so an
// unknown slug is a 404 rather than an on-demand render) means every PNG is
// generated once at build time and served as a static asset from the CDN
// regardless of runtime choice.
export const alt = 'Article by Dan Johnson'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamicParams = false

export async function generateStaticParams() {
  return getAllArticles().map((entry) => ({ slug: entry.slug }))
}

type ImageProps = {
  params: Promise<{ slug: string }>
}

const COLORS = {
  background: '#1a1a2e',
  accent: '#7c7cdb',
  title: '#f0f0f5',
  muted: '#8888a0',
  url: '#5555a0',
} as const

export default async function OgImage({ params }: ImageProps) {
  const { slug } = await params
  const entry = getArticle(slug)

  if (!entry) notFound()

  const { title, description, category, date } = entry.frontmatter
  const readingTime = entry.readingTime
  const eyebrow = `Article · ${category.replace(/-/g, ' ')}`.toUpperCase()
  const meta = `${formatPublishDate(date)} · ${readingTime} min read`
  const canonicalPath = `${siteConfig.url.replace(/^https?:\/\//, '')}/writing/${slug}`

  return new ImageResponse(
    <div
      style={{
        background: COLORS.background,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
        }}
      >
        <div
          style={{
            fontSize: '16px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: COLORS.accent,
            fontWeight: 500,
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            fontSize: '56px',
            fontWeight: 700,
            color: COLORS.title,
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            maxWidth: '1040px',
            display: 'flex',
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: '22px',
            color: COLORS.muted,
            lineHeight: 1.5,
            maxWidth: '800px',
            display: 'flex',
          }}
        >
          {description}
        </div>

        <div
          style={{
            fontSize: '16px',
            color: COLORS.muted,
            marginTop: '12px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          }}
        >
          {meta}
        </div>

        <div
          style={{
            fontSize: '14px',
            color: COLORS.url,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          }}
        >
          {canonicalPath}
        </div>
      </div>
    </div>,
    { ...size },
  )
}
