import { Container } from '@/components/primitives/container'
import { Divider } from '@/components/primitives/divider'
import { Eyebrow } from '@/components/primitives/eyebrow'
import { Heading } from '@/components/primitives/heading'
import { Section } from '@/components/primitives/section'
import { Stack } from '@/components/primitives/stack'
import { Text } from '@/components/primitives/text'

export default function HomePage() {
  return (
    <main>
      <Section>
        <Container>
          <Stack gap={6}>
            <Eyebrow>Product Engineer &amp; Systems Architect</Eyebrow>
            <Heading level={1}>Dan Johnson</Heading>
            <Text variant="lead">
              I design and build complex, high-reliability software systems, AI-enabled products,
              and performance-critical applications with a focus on long-term architecture,
              security, and real-world usability.
            </Text>
          </Stack>
        </Container>
      </Section>

      <Divider />

      <Section background="alt">
        <Container>
          <Stack gap={4}>
            <Heading level={2}>How I Build</Heading>
            <Text>
              Architecture-first thinking. Test-driven development. AI-augmented workflow. Every
              system I build is designed for long-term reliability, not just launch day.
            </Text>
          </Stack>
        </Container>
      </Section>
    </main>
  )
}
