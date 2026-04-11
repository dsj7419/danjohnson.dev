import Link from 'next/link'

type NavEntry = {
  slug: string
  title: string
}

type CaseStudyNavProps = {
  previous?: NavEntry | undefined
  next?: NavEntry | undefined
  className?: string
}

export function CaseStudyNav({ previous, next, className = '' }: CaseStudyNavProps) {
  if (!previous && !next) return null

  return (
    <nav
      aria-label="Case study navigation"
      className={`flex items-start justify-between border-t border-(--color-border) pt-8 ${className}`.trim()}
    >
      <div>
        {previous && (
          <Link
            href={`/work/${previous.slug}`}
            className="group text-sm text-(--color-text-muted) transition-colors hover:text-(--color-text)"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            <span className="mb-1 block font-mono text-xs uppercase tracking-widest text-(--color-text-faint)">
              Previous
            </span>
            <span className="group-hover:text-accent-500">&larr; {previous.title}</span>
          </Link>
        )}
      </div>
      <div className="text-right">
        {next && (
          <Link
            href={`/work/${next.slug}`}
            className="group text-sm text-(--color-text-muted) transition-colors hover:text-(--color-text)"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            <span className="mb-1 block font-mono text-xs uppercase tracking-widest text-(--color-text-faint)">
              Next
            </span>
            <span className="group-hover:text-accent-500">{next.title} &rarr;</span>
          </Link>
        )}
      </div>
    </nav>
  )
}
