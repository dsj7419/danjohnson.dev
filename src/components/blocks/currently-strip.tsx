import { formatPublishDate } from '@/lib/dates'

export type Currently = {
  /** What is on the bench right now. */
  focus: string
  /** Availability, in plain words. */
  status: string
  /** YYYY-MM-DD; shown so staleness is visible to the owner before it is visible to visitors. */
  updated: string
}

type CurrentlyStripProps = {
  currently: Currently
  className?: string
}

export function CurrentlyStrip({ currently, className = '' }: CurrentlyStripProps) {
  const { focus, status, updated } = currently

  return (
    <aside
      role="note"
      aria-label="Currently"
      className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 border-l-2 border-accent-500 pl-4 text-sm text-(--color-text-muted) ${className}`.trim()}
    >
      <span className="font-mono text-xs uppercase tracking-widest text-(--color-text-faint)">
        Currently
      </span>
      <span>
        {focus}. {status}.
      </span>
      <span className="text-xs text-(--color-text-faint)">
        Updated <time dateTime={updated}>{formatPublishDate(updated)}</time>
      </span>
    </aside>
  )
}
