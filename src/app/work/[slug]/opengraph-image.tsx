import { ImageResponse } from 'next/og'

import { siteConfig } from '@/config/site'
import { getAllCaseStudies, getCaseStudy } from '@/lib/content'

// Uses the Node.js runtime (the Next.js default) rather than `edge`, because
// the content loader in @/lib/content uses Node's `fs` and `path` modules
// to read MDX files from disk. The edge runtime forbids Node built-ins.
// Functional impact at build time is zero: `generateStaticParams` plus
// `dynamicParams = false` on the parent page means every PNG is generated
// once at build time and served as a static asset from the CDN regardless
// of runtime choice.
export const alt = 'Case Study by Dan Johnson'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  return getAllCaseStudies().map((entry) => ({ slug: entry.slug }))
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

function metricGapFor(count: number): number {
  if (count >= 4) return 48
  if (count === 3) return 64
  if (count === 2) return 96
  return 0
}

export default async function OgImage({ params }: ImageProps) {
  const { slug } = await params
  const entry = getCaseStudy(slug)

  if (!entry) {
    return new ImageResponse(
      <div
        style={{
          background: COLORS.background,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          color: COLORS.title,
          fontSize: '32px',
        }}
      >
        Dan Johnson — Case Study
      </div>,
      { ...size },
    )
  }

  const { title, description, metrics } = entry.frontmatter
  const displayMetrics = metrics?.slice(0, 4) ?? []
  const metricGap = metricGapFor(displayMetrics.length)
  const canonicalPath = `${siteConfig.url.replace(/^https?:\/\//, '')}/work/${slug}`

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
          Case Study
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

        {displayMetrics.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: `${metricGap}px`,
              marginTop: '12px',
            }}
          >
            {displayMetrics.map((m) => (
              <div
                key={m.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div
                  style={{
                    fontSize: '32px',
                    fontWeight: 600,
                    color: COLORS.accent,
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    lineHeight: 1,
                  }}
                >
                  {m.value}
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    color: COLORS.muted,
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  }}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            fontSize: '14px',
            color: COLORS.url,
            marginTop: '12px',
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
