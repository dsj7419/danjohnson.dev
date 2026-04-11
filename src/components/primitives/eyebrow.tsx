import type { ReactNode } from 'react'

type EyebrowProps = {
  className?: string
  children: ReactNode
}

export function Eyebrow({ className = '', children }: EyebrowProps) {
  return (
    <span
      className={`font-mono text-xs font-medium uppercase tracking-widest text-(--color-text-muted) ${className}`.trim()}
    >
      {children}
    </span>
  )
}
