import { ProjectCard } from '@/components/blocks/project-card'
import { Container } from '@/components/primitives/container'
import { Heading } from '@/components/primitives/heading'
import { Section } from '@/components/primitives/section'
import { Stack } from '@/components/primitives/stack'
import { Text } from '@/components/primitives/text'
import { getAllCaseStudies } from '@/lib/content'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: 'Work',
  description:
    'Case studies of complex software systems, AI-enabled products, and architecture-heavy applications.',
  path: '/work',
})

export default function WorkPage() {
  const caseStudies = getAllCaseStudies()

  return (
    <Section>
      <Container>
        <Stack gap={10}>
          <Stack gap={4}>
            <Heading level={1}>Work</Heading>
            <Text variant="lead">
              Case studies of systems I have designed and built. Each one documents the problem,
              approach, architecture, and lessons learned.
            </Text>
          </Stack>

          {caseStudies.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((entry) => (
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
          ) : (
            <Text variant="small">Case studies coming soon.</Text>
          )}
        </Stack>
      </Container>
    </Section>
  )
}
