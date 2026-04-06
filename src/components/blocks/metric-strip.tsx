type MetricItem = {
  label: string
  value: string
}

type MetricStripProps = {
  items: MetricItem[]
  className?: string
}

export function MetricStrip({ items, className = '' }: MetricStripProps) {
  return (
    <div
      className={`flex flex-wrap gap-8 border-y border-[var(--color-border)] py-6 ${className}`.trim()}
    >
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1">
          <span className="font-mono text-2xl font-semibold text-accent-500">{item.value}</span>
          <span className="text-sm text-[var(--color-text-muted)]">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
