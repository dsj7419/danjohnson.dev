import type { Metadata } from 'next'

import { Container } from '@/components/primitives/container'
import { Heading } from '@/components/primitives/heading'
import { Section } from '@/components/primitives/section'
import { Stack } from '@/components/primitives/stack'
import { getPage } from '@/lib/content'
import { buildPageMetadata } from '@/lib/metadata'
import { personJsonLd } from '@/lib/structured-data'

export function generateMetadata(): Metadata {
  const page = getPage('about')
  if (!page) return {}
  return buildPageMetadata({
    title: page.frontmatter.title,
    description: page.frontmatter.description,
    path: '/about',
  })
}

export default async function AboutPage() {
  const { default: Content } = await import('@/content/pages/about.mdx')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
      <Section>
        <Container width="reading">
          <Stack gap={8}>
            <Heading level={1}>About</Heading>
            <Stack gap={6} className="*:first:mt-0">
              <Content />
            </Stack>
          </Stack>
        </Container>
      </Section>
    </>
  )
}
