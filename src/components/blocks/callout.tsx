import type { ReactNode } from 'react'

type CalloutVariant = 'note' | 'warning' | 'insight' | 'result'

type CalloutProps = {
  variant: CalloutVariant
  title?: string
  className?: string
  children: ReactNode
}

const borderColors: Record<CalloutVariant, string> = {
  note: 'border-l-accent-500',
  insight: 'border-l-accent-500',
  warning: 'border-l-amber-500',
  result: 'border-l-emerald-500',
}

export function Callout({ variant, title, className = '', children }: CalloutProps) {
  return (
    <aside
      className={`rounded-r-lg border border-[var(--color-border)] border-l-4 ${borderColors[variant]} bg-[var(--color-bg-elevated)] p-4 ${className}`.trim()}
    >
      {title && <p className="mb-2 text-sm font-semibold">{title}</p>}
      <div className="text-sm leading-relaxed">{children}</div>
    </aside>
  )
}
