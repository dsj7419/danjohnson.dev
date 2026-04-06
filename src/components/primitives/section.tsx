import type { ReactNode } from 'react'

type SectionBackground = 'default' | 'alt' | 'elevated'

type SectionProps = {
  background?: SectionBackground
  className?: string
  children: ReactNode
}

const backgroundStyles: Record<SectionBackground, string> = {
  default: '',
  alt: 'bg-[var(--color-bg-alt)]',
  elevated: 'bg-[var(--color-bg-elevated)]',
}

export function Section({ background = 'default', className = '', children }: SectionProps) {
  return (
    <section
      className={`py-[var(--spacing-section-y)] ${backgroundStyles[background]} ${className}`.trim()}
    >
      {children}
    </section>
  )
}
