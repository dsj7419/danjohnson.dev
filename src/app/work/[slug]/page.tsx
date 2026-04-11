import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CaseStudyMeta } from '@/components/blocks/case-study-meta'
import { CaseStudyNav } from '@/components/blocks/case-study-nav'
import { MetricStrip } from '@/components/blocks/metric-strip'
import { StackList } from '@/components/blocks/stack-list'
import { Container } from '@/components/primitives/container'
import { Divider } from '@/components/primitives/divider'
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

  const allCaseStudies = getAllCaseStudies()
  const currentIndex = allCaseStudies.findIndex((e) => e.slug === slug)
  const previous =
    currentIndex > 0
      ? {
          slug: allCaseStudies[currentIndex - 1]!.slug,
          title: allCaseStudies[currentIndex - 1]!.frontmatter.title,
        }
      : undefined
  const next =
    currentIndex < allCaseStudies.length - 1
      ? {
          slug: allCaseStudies[currentIndex + 1]!.slug,
          title: allCaseStudies[currentIndex + 1]!.frontmatter.title,
        }
      : undefined

  const { default: Content } = await import(`@/content/case-studies/${slug}.mdx`)
  const { frontmatter } = entry

  return (
    <article>
      <Section background="alt">
        <Container>
          <Stack gap={6}>
            <Stack gap={4}>
              <Heading level={1}>{frontmatter.title}</Heading>
              {frontmatter.subtitle && <Text variant="lead">{frontmatter.subtitle}</Text>}
            </Stack>

            <CaseStudyMeta
              role={frontmatter.role}
              date={frontmatter.date}
              client={frontmatter.client}
              organization={frontmatter.organization}
              duration={frontmatter.duration}
              teamSize={frontmatter.teamSize}
            />

            <div className="flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-(--color-bg) px-2.5 py-0.5 font-mono text-xs text-(--color-text-faint)"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Stack>
        </Container>
      </Section>

      {frontmatter.metrics && frontmatter.metrics.length > 0 && (
        <Section>
          <Container>
            <MetricStrip items={frontmatter.metrics} />
          </Container>
        </Section>
      )}

      <Section>
        <Container width="reading">
          <Stack gap={6}>
            <Text variant="small">{entry.readingTime} min read</Text>
            <Content />
          </Stack>
        </Container>
      </Section>

      <Section>
        <Container>
          <Stack gap={8}>
            <StackList items={frontmatter.stack} />
            <Divider />
            <CaseStudyNav previous={previous} next={next} />
          </Stack>
        </Container>
      </Section>
    </article>
  )
}
