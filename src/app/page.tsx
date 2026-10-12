import type { Metadata } from 'next'
import Link from 'next/link'

import { ArticleEntry } from '@/components/blocks/article-entry'
import { CurrentlyStrip } from '@/components/blocks/currently-strip'
import { ProjectCard } from '@/components/blocks/project-card'
import { Button } from '@/components/primitives/button'
import { Container } from '@/components/primitives/container'
import { Divider } from '@/components/primitives/divider'
import { Eyebrow } from '@/components/primitives/eyebrow'
import { Heading } from '@/components/primitives/heading'
import { Section } from '@/components/primitives/section'
import { Stack } from '@/components/primitives/stack'
import { Text } from '@/components/primitives/text'
import { siteConfig } from '@/config/site'
import { getAllArticles, getAllCaseStudies } from '@/lib/content'
import { websiteJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  const featuredWork = getAllCaseStudies()
    .filter((e) => e.frontmatter.featured)
    .slice(0, 3)
  const featuredWriting = getAllArticles()
    .filter((e) => e.frontmatter.featured)
    .slice(0, 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
      />

      {/* Hero */}
      <Section className="py-12! md:py-16!">
        <Container>
          <Stack gap={6}>
            <Eyebrow>Product Engineer &amp; Systems Architect</Eyebrow>
            <Heading level={1} className="text-5xl">
              Dan Johnson
            </Heading>
            <Text variant="lead" className="max-w-(--width-reading)">
              I design and build complex, high-reliability software systems, AI-enabled products,
              and performance-critical applications with a focus on long-term architecture,
              security, and real-world usability.
            </Text>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href="/work-with-me#contact">Work with me</Button>
              <Link
                href="/work"
                className="text-sm font-medium text-(--color-text) underline underline-offset-4 transition-colors hover:text-accent-500"
                style={{ transitionDuration: 'var(--duration-fast)' }}
              >
                See the work &rarr;
              </Link>
            </div>
            <CurrentlyStrip currently={siteConfig.currently} className="max-w-(--width-reading)" />
          </Stack>
        </Container>
      </Section>

      {/* Featured Work */}
      {featuredWork.length > 0 && (
        <Section background="alt">
          <Container>
            <Stack gap={8}>
              <div className="flex items-end justify-between">
                <Heading level={2}>Selected Work</Heading>
                <Link
                  href="/work"
                  className="text-sm text-(--color-text-muted) transition-colors hover:text-accent-500"
                  style={{ transitionDuration: 'var(--duration-fast)' }}
                >
                  View all &rarr;
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredWork.map((entry) => (
                  <ProjectCard
                    key={entry.slug}
                    title={entry.frontmatter.title}
                    description={entry.frontmatter.description}
                    slug={entry.slug}
                    tags={entry.frontmatter.tags}
                    role={entry.frontmatter.role}
                  />
                ))}
              </div>
            </Stack>
          </Container>
        </Section>
      )}

      {/* Capabilities */}
      <Section>
        <Container>
          <Stack gap={8}>
            <Heading level={2}>What I Do</Heading>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {siteConfig.capabilities.map((cap) => (
                <Stack key={cap.title} gap={3}>
                  <Heading level={3} className="text-lg">
                    {cap.title}
                  </Heading>
                  <Text variant="small">{cap.description}</Text>
                </Stack>
              ))}
            </div>
          </Stack>
        </Container>
      </Section>

      <Divider />

      {/* How I Build Teaser */}
      <Section background="alt">
        <Container width="reading">
          <Stack gap={6}>
            <Heading level={2}>How I Build</Heading>
            <Text>
              Architecture-first thinking. Test-driven development. AI-augmented workflow. Every
              system I build is designed for long-term reliability, not just launch day.
            </Text>
            <div>
              <Button href="/how-i-build" variant="secondary">
                How I approach engineering
              </Button>
            </div>
          </Stack>
        </Container>
      </Section>

      {/* Selected Writing */}
      {featuredWriting.length > 0 && (
        <Section>
          <Container>
            <Stack gap={8}>
              <div className="flex items-end justify-between">
                <Heading level={2}>Writing</Heading>
                <Link
                  href="/writing"
                  className="text-sm text-(--color-text-muted) transition-colors hover:text-accent-500"
                  style={{ transitionDuration: 'var(--duration-fast)' }}
                >
                  View all &rarr;
                </Link>
              </div>
              <div>
                {featuredWriting.map((entry) => (
                  <ArticleEntry
                    key={entry.slug}
                    title={entry.frontmatter.title}
                    description={entry.frontmatter.description}
                    slug={entry.slug}
                    category={entry.frontmatter.category}
                    date={entry.frontmatter.date}
                    readingTime={entry.readingTime}
                  />
                ))}
              </div>
            </Stack>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section background="alt">
        <Container width="reading">
          <Stack gap={6} className="text-center">
            <Heading level={2}>Work With Me</Heading>
            <Text className="mx-auto max-w-lg">
              I take on a limited number of serious engineering projects. If you are building
              something that needs strong architecture, thoughtful AI integration, or careful
              technical execution, I would like to hear about it.
            </Text>
            <div>
              <Button href="/work-with-me#contact">Get in touch</Button>
            </div>
          </Stack>
        </Container>
      </Section>
    </>
  )
}
