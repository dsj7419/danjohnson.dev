import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonBaseProps = {
  variant?: ButtonVariant
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonBaseProps> & {
    href?: never
  }

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonBaseProps> & {
    href: string
    disabled?: never
  }

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-500 text-(--color-on-accent) hover:bg-accent-600 disabled:opacity-50 disabled:pointer-events-none',
  secondary:
    'border border-(--color-border) text-(--color-text) hover:bg-(--color-bg-alt) disabled:opacity-50 disabled:pointer-events-none',
  ghost:
    'text-(--color-text-muted) hover:text-(--color-text) disabled:opacity-50 disabled:pointer-events-none',
}

const baseStyles =
  'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors'

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`.trim()

  if (props.href !== undefined) {
    const { href, ...linkProps } = props
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
