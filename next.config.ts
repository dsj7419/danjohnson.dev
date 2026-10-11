import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'Content-Security-Policy', value: buildCSP() },
]

function buildCSP(): string {
  const isDev = process.env.NODE_ENV === 'development'

  const directives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ]

  return directives.join('; ')
}

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],

  turbopack: {
    resolveExtensions: ['.mdx', '.md', '.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  headers() {
    return Promise.resolve([
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ])
  },
}

// MDX plugin stack (see ADR-0005). Three functional content plugins only:
//   - remark-gfm: GitHub-flavored markdown
//   - rehype-pretty-code: Shiki-based dual-theme syntax highlighting
//   - rehype-slug: heading id generation for TOC
// remark-frontmatter is parser plumbing, not a content transformation — it
// tells the MDX parser to strip YAML frontmatter so gray-matter can own it
// and MDX does not render it as prose.
const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-frontmatter', 'remark-gfm'],
    rehypePlugins: [
      [
        'rehype-pretty-code',
        { theme: { light: 'github-light', dark: 'github-dark-dimmed' }, keepBackground: false },
      ],
      'rehype-slug',
    ],
  },
})

export default withMDX(nextConfig)
