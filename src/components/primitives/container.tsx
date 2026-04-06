import type { ElementType, ReactNode } from 'react'

type ContainerWidth = 'reading' | 'content' | 'wide'

type ContainerProps = {
  width?: ContainerWidth
  as?: ElementType
  className?: string
  children: ReactNode
}

const widthStyles: Record<ContainerWidth, string> = {
  reading: 'max-w-[var(--width-reading)]',
  content: 'max-w-[var(--width-content)]',
  wide: 'max-w-[var(--width-wide)]',
}

export function Container({
  width = 'content',
  as: Tag = 'div',
  className = '',
  children,
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto px-[var(--spacing-content-x)] ${widthStyles[width]} ${className}`.trim()}
    >
      {children}
    </Tag>
  )
}
