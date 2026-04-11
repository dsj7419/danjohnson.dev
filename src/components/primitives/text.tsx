import type { ElementType, ReactNode } from 'react'

type TextVariant = 'body' | 'lead' | 'small' | 'caption'

type TextProps = {
  variant?: TextVariant
  as?: ElementType
  className?: string
  children: ReactNode
}

const variantStyles: Record<TextVariant, string> = {
  body: 'text-base leading-relaxed',
  lead: 'text-lg leading-relaxed text-(--color-text-muted)',
  small: 'text-sm text-(--color-text-muted)',
  caption: 'text-xs text-(--color-text-muted)',
}

export function Text({ variant = 'body', as: Tag = 'p', className = '', children }: TextProps) {
  return <Tag className={`${variantStyles[variant]} ${className}`.trim()}>{children}</Tag>
}
