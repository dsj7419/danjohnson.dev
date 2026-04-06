import type { ElementType, ReactNode } from 'react'

type HeadingLevel = 1 | 2 | 3 | 4

type HeadingProps = {
  level: HeadingLevel
  as?: ElementType
  id?: string | undefined
  className?: string
  children: ReactNode
}

const levelStyles: Record<HeadingLevel, string> = {
  1: 'font-heading text-4xl font-semibold tracking-[-0.02em]',
  2: 'font-heading text-3xl font-semibold tracking-[-0.015em]',
  3: 'text-2xl font-semibold tracking-[-0.01em]',
  4: 'text-xl font-semibold',
}

const levelElements: Record<HeadingLevel, ElementType> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
}

export function Heading({ level, as, id, className = '', children }: HeadingProps) {
  const Tag = as ?? levelElements[level]
  return (
    <Tag id={id} className={`${levelStyles[level]} ${className}`.trim()}>
      {children}
    </Tag>
  )
}
