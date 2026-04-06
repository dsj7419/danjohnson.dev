import type { ReactNode } from 'react'

type DiagramWrapperProps = {
  caption?: string
  className?: string
  children: ReactNode
}

export function DiagramWrapper({ caption, className = '', children }: DiagramWrapperProps) {
  return (
    <figure
      className={`overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 ${className}`.trim()}
    >
      <div className="flex items-center justify-center">{children}</div>
      {caption && (
        <figcaption className="mt-4 text-center text-sm text-[var(--color-text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
