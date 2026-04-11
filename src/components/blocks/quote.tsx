import type { ReactNode } from 'react'

type QuoteProps = {
  attribution?: string
  role?: string
  className?: string
  children: ReactNode
}

export function Quote({ attribution, role, className = '', children }: QuoteProps) {
  return (
    <blockquote
      className={`border-l-2 border-accent-500 py-2 pl-6 font-heading text-lg italic leading-relaxed text-(--color-text-muted) ${className}`.trim()}
    >
      <div>{children}</div>
      {attribution && (
        <footer className="mt-3 font-body text-sm not-italic">
          <span className="font-medium text-(--color-text)">{attribution}</span>
          {role && <span className="text-(--color-text-faint)"> &mdash; {role}</span>}
        </footer>
      )}
    </blockquote>
  )
}
