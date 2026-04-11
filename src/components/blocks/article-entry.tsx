import Link from 'next/link'

import { formatPublishDate } from '@/lib/dates'

type ArticleEntryProps = {
  title: string
  description: string
  slug: string
  category: string
  date: string
  readingTime: number
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
  const formattedDate = formatPublishDate(date)

  return (
    <article
      className={`border-b border-(--color-border) py-6 last:border-b-0 ${className}`.trim()}
    >
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-widest text-(--color-text-muted)">
          {category.replace(/-/g, ' ')}
        </p>
        <Link
          href={`/writing/${slug}`}
          className="block font-heading text-xl font-semibold tracking-tight text-(--color-text) hover:text-accent-500"
          style={{ transitionDuration: 'var(--duration-fast)' }}
        >
          {title}
        </Link>
        <p className="text-sm leading-relaxed text-(--color-text-muted)">{description}</p>
        <p className="text-xs text-(--color-text-faint)">
          {formattedDate} &middot; {readingTime} min read
        </p>
      </div>
    </article>
  )
}
