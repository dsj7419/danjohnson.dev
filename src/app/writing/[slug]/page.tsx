import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ComponentType } from 'react'

import { TableOfContents } from '@/components/blocks/table-of-contents'
import { Container } from '@/components/primitives/container'
import { Divider } from '@/components/primitives/divider'
import { Eyebrow } from '@/components/primitives/eyebrow'
import { Heading } from '@/components/primitives/heading'
import { Section } from '@/components/primitives/section'
import { Stack } from '@/components/primitives/stack'
import { Text } from '@/components/primitives/text'
import { getAllArticles, getArticle } from '@/lib/content'
import { formatPublishDate } from '@/lib/dates'
import { buildContentMetadata } from '@/lib/metadata'
import { articleJsonLd } from '@/lib/structured-data'

type PageProps = {
  params: Promise<{ slug: string }>
}

type MdxModule = { default: ComponentType }

export function generateStaticParams() {
  return getAllArticles().map((entry) => ({ slug: entry.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const entry = getArticle(slug)
  if (!entry) return {}

  return buildContentMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    path: `/writing/${slug}`,
    publishedTime: entry.frontmatter.date,
    modifiedTime: entry.frontmatter.updatedAt,
    ogImage: entry.frontmatter.ogImage,
    tags: entry.frontmatter.tags,
  })
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const entry = getArticle(slug)
  if (!entry) notFound()

  // A template-literal import cannot be matched to the '*.mdx' module declaration, so the
  // module shape is asserted here; the slug was validated against the content index above.
  const { default: Content } = (await import(`@/content/writing/${slug}.mdx`)) as MdxModule

  const formattedDate = formatPublishDate(entry.frontmatter.date)

  const { updatedAt } = entry.frontmatter
  const updatedOn =
    updatedAt !== undefined && updatedAt !== entry.frontmatter.date ? updatedAt : undefined

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: entry.frontmatter.title,
              description: entry.frontmatter.description,
              date: entry.frontmatter.date,
              url: `/writing/${slug}`,
              updatedAt: entry.frontmatter.updatedAt,
            }),
          ),
        }}
      />
      <Section>
        <Container width="reading">
          <Stack gap={4}>
            <Eyebrow>{entry.frontmatter.category.replace(/-/g, ' ')}</Eyebrow>
            <Heading level={1}>{entry.frontmatter.title}</Heading>
            <Text variant="lead">{entry.frontmatter.description}</Text>
            <Text variant="small">
              {formattedDate} &middot; {entry.readingTime} min read
              {updatedOn !== undefined && <> &middot; Updated {formatPublishDate(updatedOn)}</>}
            </Text>
          </Stack>
        </Container>
      </Section>

      <Section>
        <Container width="reading">
          <Stack gap={8}>
            {entry.toc.length > 0 && <TableOfContents entries={entry.toc} />}
            <Content />
          </Stack>
        </Container>
      </Section>

      <Section>
        <Container width="reading">
          <Divider />
          <div className="pt-8 text-center">
            <Link
              href="/writing"
              className="text-sm text-(--color-text-muted) transition-colors hover:text-accent-500"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              &larr; More writing
            </Link>
          </div>
        </Container>
      </Section>
    </article>
  )
}
