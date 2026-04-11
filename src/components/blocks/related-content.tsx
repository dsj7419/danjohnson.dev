import Link from 'next/link'

type RelatedItem = {
  path: string
  title: string
  type: 'case-study' | 'article'
}

type RelatedContentProps = {
  items: RelatedItem[]
  className?: string
}

const typeLabels: Record<RelatedItem['type'], string> = {
  'case-study': 'Case Study',
  article: 'Article',
}

export function RelatedContent({ items, className = '' }: RelatedContentProps) {
  if (items.length === 0) return null

  return (
    <div className={`space-y-3 ${className}`.trim()}>
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-(--color-text-muted)">
        Related
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.path} className="flex items-baseline gap-2">
            <span className="rounded bg-(--color-bg-alt) px-1.5 py-0.5 font-mono text-xs text-(--color-text-faint)">
              {typeLabels[item.type]}
            </span>
            <Link
              href={item.path}
              className="text-sm text-accent-500 underline underline-offset-4 transition-colors hover:text-accent-600"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
