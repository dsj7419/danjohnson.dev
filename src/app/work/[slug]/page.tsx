import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Container } from '@/components/primitives/container'
import { Eyebrow } from '@/components/primitives/eyebrow'
import { Heading } from '@/components/primitives/heading'
import { Section } from '@/components/primitives/section'
import { Stack } from '@/components/primitives/stack'
import { Text } from '@/components/primitives/text'
import { getAllCaseStudies, getCaseStudy } from '@/lib/content'
import { buildContentMetadata } from '@/lib/metadata'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllCaseStudies().map((entry) => ({ slug: entry.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const entry = getCaseStudy(slug)
  if (!entry) return {}

  return buildContentMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    path: `/work/${slug}`,
    publishedTime: entry.frontmatter.date,
    modifiedTime: entry.frontmatter.updatedAt,
    ogImage: entry.frontmatter.ogImage,
    tags: entry.frontmatter.tags,
  })
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const entry = getCaseStudy(slug)
  if (!entry) notFound()

  const { default: Content } = await import(`@/content/case-studies/${slug}.mdx`)

  return (
    <article>
      <Section>
        <Container>
          <Stack gap={4}>
            <Eyebrow>{entry.frontmatter.role}</Eyebrow>
            <Heading level={1}>{entry.frontmatter.title}</Heading>
            {entry.frontmatter.subtitle && <Text variant="lead">{entry.frontmatter.subtitle}</Text>}
            <Text variant="small">
              {new Date(entry.frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              &middot; {entry.readingTime} min read
            </Text>
          </Stack>
        </Container>
      </Section>

      <Section>
        <Container width="reading">
          <Stack gap={6}>
            <Content />
          </Stack>
        </Container>
      </Section>
    </article>
  )
}
