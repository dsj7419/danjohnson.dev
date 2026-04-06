import { siteConfig } from '@/config/site'
import { getAllArticles } from '@/lib/content'

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET(): Response {
  const articles = getAllArticles()

  const items = articles
    .map(
      (article) => `    <item>
      <title>${escapeXml(article.frontmatter.title)}</title>
      <link>${siteConfig.url}/writing/${article.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/writing/${article.slug}</guid>
      <description>${escapeXml(article.frontmatter.description)}</description>
      <pubDate>${new Date(article.frontmatter.date).toUTCString()}</pubDate>
      <category>${escapeXml(article.frontmatter.category)}</category>
    </item>`,
    )
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} — Writing</title>
    <link>${siteConfig.url}/writing</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <atom:link href="${siteConfig.url}/writing/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
