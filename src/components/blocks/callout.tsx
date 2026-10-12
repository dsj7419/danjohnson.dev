import type { ReactNode } from 'react'

type CalloutVariant = 'note' | 'warning' | 'insight' | 'result'

type CalloutProps = {
  variant: CalloutVariant
  title?: string
  className?: string
  children: ReactNode
}

// Callouts are inline annotations, not page-level complementary content, so they are notes
// with an accessible name rather than <aside> landmarks (axe: landmark-complementary-is-top-level).
const labels: Record<CalloutVariant, string> = {
  note: 'Note',
  insight: 'Insight',
  warning: 'Warning',
  result: 'Result',
}

const borderColors: Record<CalloutVariant, string> = {
  note: 'border-l-accent-500',
  insight: 'border-l-accent-500',
  warning: 'border-l-amber-500',
  result: 'border-l-emerald-500',
}

export function Callout({ variant, title, className = '', children }: CalloutProps) {
  return (
    <div
      role="note"
      aria-label={title ?? labels[variant]}
      className={`rounded-r-lg border border-(--color-border) border-l-4 ${borderColors[variant]} bg-(--color-bg-elevated) p-4 ${className}`.trim()}
    >
      {title && <p className="mb-2 text-sm font-semibold">{title}</p>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}
