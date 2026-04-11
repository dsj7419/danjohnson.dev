import type { ReactNode } from 'react'

type DiagramWrapperProps = {
  title?: string
  caption?: string
  className?: string
  children: ReactNode
}

export function DiagramWrapper({ title, caption, className = '', children }: DiagramWrapperProps) {
  return (
    <figure
      className={`my-6 overflow-x-auto rounded-lg border border-(--color-border) md:-mx-12 lg:-mx-24 ${className}`.trim()}
    >
      {title && (
        <div className="border-b border-(--color-border) bg-(--color-bg-alt) px-4 py-2">
          <span className="font-mono text-xs text-(--color-text-muted)">{title}</span>
        </div>
      )}
      <div className="flex items-center justify-center bg-(--color-bg-elevated) p-6">
        {children}
      </div>
      {caption && (
        <figcaption className="border-t border-(--color-border) px-4 py-3 text-center text-sm text-(--color-text-muted)">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
