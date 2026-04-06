import type { ElementType, ReactNode } from 'react'

type StackGap = 2 | 3 | 4 | 6 | 8 | 10 | 12 | 16

type StackProps = {
  gap?: StackGap
  as?: ElementType
  className?: string
  children: ReactNode
}

const gapStyles: Record<StackGap, string> = {
  2: 'space-y-2',
  3: 'space-y-3',
  4: 'space-y-4',
  6: 'space-y-6',
  8: 'space-y-8',
  10: 'space-y-10',
  12: 'space-y-12',
  16: 'space-y-16',
}

export function Stack({ gap = 6, as: Tag = 'div', className = '', children }: StackProps) {
  return <Tag className={`${gapStyles[gap]} ${className}`.trim()}>{children}</Tag>
}
