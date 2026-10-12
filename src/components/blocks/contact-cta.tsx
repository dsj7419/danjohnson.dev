import { Button } from '@/components/primitives/button'
import { Heading } from '@/components/primitives/heading'
import { Stack } from '@/components/primitives/stack'
import { Text } from '@/components/primitives/text'

type ContactCtaProps = {
  className?: string
}

/** End-of-content invitation on case studies and articles; links straight to the form. */
export function ContactCta({ className = '' }: ContactCtaProps) {
  return (
    <section
      aria-labelledby="contact-cta-heading"
      className={`rounded-lg border border-(--color-border) bg-(--color-bg-alt) p-6 sm:p-8 ${className}`.trim()}
    >
      <Stack gap={4}>
        <Heading level={2} id="contact-cta-heading" className="text-xl">
          Building something like this?
        </Heading>
        <Text>
          I take on a limited number of engagements. Tell me what you are building and I will reply
          within two business days.
        </Text>
        <div>
          <Button href="/work-with-me#contact">Work with me</Button>
        </div>
      </Stack>
    </section>
  )
}
