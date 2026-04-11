import type { TocEntry } from '@/types/content'

type TableOfContentsProps = {
  entries: TocEntry[]
  className?: string
}

export function TableOfContents({ entries, className = '' }: TableOfContentsProps) {
  if (entries.length === 0) return null

  return (
    <nav aria-label="Table of contents" className={`py-4 ${className}`.trim()}>
      <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-(--color-text-muted)">
        On this page
      </p>
      <ul className="space-y-2">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className={`text-sm text-(--color-text-muted) transition-colors hover:text-(--color-text) ${entry.depth === 3 ? 'pl-4' : ''}`}
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
