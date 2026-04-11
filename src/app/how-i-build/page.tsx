import type { Metadata } from 'next'

import { Container } from '@/components/primitives/container'
import { Heading } from '@/components/primitives/heading'
import { Section } from '@/components/primitives/section'
import { Stack } from '@/components/primitives/stack'
import { getPage } from '@/lib/content'
import { buildPageMetadata } from '@/lib/metadata'

export function generateMetadata(): Metadata {
  const page = getPage('how-i-build')
  if (!page) return {}
  return buildPageMetadata({
    title: page.frontmatter.title,
    description: page.frontmatter.description,
    path: '/how-i-build',
  })
}

export default async function HowIBuildPage() {
  const { default: Content } = await import('@/content/pages/how-i-build.mdx')

  return (
    <Section>
      <Container width="reading">
        <Stack gap={8}>
          <Heading level={1}>How I Build</Heading>
          <Stack gap={6} className="*:first:mt-0">
            <Content />
          </Stack>
        </Stack>
      </Container>
    </Section>
  )
}
