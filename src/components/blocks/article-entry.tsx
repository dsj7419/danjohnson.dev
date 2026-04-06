import Link from 'next/link'

type ArticleEntryProps = {
  title: string
  description: string
  slug: string
  category: string
  date: string
  readingTime: number
  tags: string[]
  className?: string
}

export function ArticleEntry({
  title,
  description,
  slug,
  category,
  date,
  readingTime,
  className = '',
}: ArticleEntryProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article
      className={`border-b border-[var(--color-border)] py-6 last:border-b-0 ${className}`.trim()}
    >
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
          {category.replace(/-/g, ' ')}
        </p>
        <Link
          href={`/writing/${slug}`}
          className="block font-heading text-xl font-semibold tracking-tight text-[var(--color-text)] hover:text-accent-500"
          style={{ transitionDuration: 'var(--duration-fast)' }}
        >
          {title}
        </Link>
        <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{description}</p>
        <p className="text-xs text-[var(--color-text-faint)]">
          {formattedDate} &middot; {readingTime} min read
        </p>
      </div>
    </article>
  )
}
