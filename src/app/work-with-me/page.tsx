import type { Metadata } from 'next'

import { ContactForm } from '@/components/blocks/contact-form'
import { CurrentlyStrip } from '@/components/blocks/currently-strip'
import { Container } from '@/components/primitives/container'
import { Heading } from '@/components/primitives/heading'
import { Section } from '@/components/primitives/section'
import { Stack } from '@/components/primitives/stack'
import { Text } from '@/components/primitives/text'
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
          <Stack gap={4}>
            <Heading level={1}>Work With Me</Heading>
            <Text variant="lead">
              If you are building something serious — a system that has to hold together over time,
              a product where the architecture matters, or an AI integration that needs to be more
              than a wrapper around a model — I would like to hear about it.
            </Text>
            <CurrentlyStrip currently={siteConfig.currently} />
          </Stack>
          <ContactForm />
          <Stack gap={6} className="*:first:mt-0">
            <Content />
          </Stack>
        </Stack>
      </Container>
    </Section>
  )
}
