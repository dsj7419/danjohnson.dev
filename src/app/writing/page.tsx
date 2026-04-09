import { ArticleEntry } from '@/components/blocks/article-entry'
import { Container } from '@/components/primitives/container'
import { Heading } from '@/components/primitives/heading'
import { Section } from '@/components/primitives/section'
import { Stack } from '@/components/primitives/stack'
import { Text } from '@/components/primitives/text'
import { getAllArticles } from '@/lib/content'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: 'Writing',
  description:
    'Articles on software architecture, engineering philosophy, AI integration, and lessons from real projects.',
  path: '/writing',
})

export default function WritingPage() {
  const articles = getAllArticles()

  return (
    <Section>
      <Container>
        <Stack gap={10}>
          <Stack gap={4}>
            <Heading level={1}>Writing</Heading>
            <Text variant="lead">
              Thinking about architecture, engineering, and how systems actually work.
            </Text>
          </Stack>

          {articles.length > 0 ? (
            <div>
              {articles.map((entry) => (
                <ArticleEntry
                  key={entry.slug}
                  title={entry.frontmatter.title}
                  description={entry.frontmatter.description}
                  slug={entry.slug}
                  category={entry.frontmatter.category}
                  date={entry.frontmatter.date}
                  readingTime={entry.readingTime}
                  tags={entry.frontmatter.tags}
                />
              ))}
            </div>
          ) : (
            <Text variant="small">Articles coming soon.</Text>
          )}
        </Stack>
      </Container>
    </Section>
  )
}
