import { Container } from '@/components/primitives/container'
import { Heading } from '@/components/primitives/heading'
import { Section } from '@/components/primitives/section'
import { Stack } from '@/components/primitives/stack'
import { getPage } from '@/lib/content'
import { buildPageMetadata } from '@/lib/metadata'

export function generateMetadata() {
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
    <Section>
      <Container width="reading">
        <Stack gap={8}>
          <Heading level={1}>About</Heading>
          <Stack gap={6}>
            <Content />
          </Stack>
        </Stack>
      </Container>
    </Section>
  )
}
