import Link from 'next/link'

type ContactCTAProps = {
  className?: string
}

export function ContactCTA({ className = '' }: ContactCTAProps) {
  return (
    <section
      className={`rounded-lg border border-(--color-border) bg-(--color-bg-alt) p-8 text-center ${className}`.trim()}
    >
      <p className="mb-2 text-lg font-semibold">Interested in working together?</p>
      <p className="mb-6 text-sm text-(--color-text-muted)">
        I take on a limited number of serious engineering projects. Tell me what you are building.
      </p>
      <Link
        href="/work-with-me#contact"
        className="inline-flex items-center justify-center rounded-md bg-accent-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-600"
        style={{ transitionDuration: 'var(--duration-fast)' }}
      >
        Get in touch
      </Link>
    </section>
  )
}
