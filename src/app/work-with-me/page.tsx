import type { Metadata } from 'next'

import { ContactCTA } from '@/components/blocks/contact-cta'
import { Container } from '@/components/primitives/container'
import { Heading } from '@/components/primitives/heading'
import { Section } from '@/components/primitives/section'
import { Stack } from '@/components/primitives/stack'
import { siteConfig } from '@/config/site'
import { getPage } from '@/lib/content'
import { buildPageMetadata } from '@/lib/metadata'

export function generateMetadata(): Metadata {
  const page = getPage('work-with-me')
  if (!page) return {}
  return buildPageMetadata({
    title: page.frontmatter.title,
    description: page.frontmatter.description,
    path: '/work-with-me',
  })
}

export default async function WorkWithMePage() {
  const { default: Content } = await import('@/content/pages/work-with-me.mdx')

  return (
    <Section>
      <Container width="reading">
        <Stack gap={8}>
          <Heading level={1}>Work With Me</Heading>
          <Stack gap={6} className="*:first:mt-0">
            <Content />
          </Stack>
          <ContactCTA email={siteConfig.email} />
        </Stack>
      </Container>
    </Section>
  )
}
