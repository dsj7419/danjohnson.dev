type StackListProps = {
  items: string[]
  className?: string
}

export function StackList({ items, className = '' }: StackListProps) {
  if (items.length === 0) return null

  return (
    <div className={`space-y-3 ${className}`.trim()}>
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-(--color-text-muted)">
        Tech Stack
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-(--color-code-bg) px-3 py-1 font-mono text-xs text-(--color-code-text)"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
