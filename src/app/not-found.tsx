import { Button } from '@/components/primitives/button'
import { Container } from '@/components/primitives/container'
import { Eyebrow } from '@/components/primitives/eyebrow'
import { Heading } from '@/components/primitives/heading'
import { Stack } from '@/components/primitives/stack'
import { Text } from '@/components/primitives/text'

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center py-[var(--spacing-section-y)]">
      <Container width="reading">
        <Stack gap={6} className="text-center">
          <Eyebrow>404</Eyebrow>
          <Heading level={1}>Page not found</Heading>
          <Text variant="lead" className="mx-auto max-w-md">
            The page you are looking for does not exist or has been moved.
          </Text>
          <div>
            <Button href="/" variant="secondary">
              Back to home
            </Button>
          </div>
        </Stack>
      </Container>
    </div>
  )
}
