'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLinkProps = {
  href: string
  children: React.ReactNode
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={`text-sm transition-colors ${
        isActive
          ? 'font-medium text-accent-500'
          : 'text-(--color-text-muted) hover:text-(--color-text)'
      }`}
      style={{ transitionDuration: 'var(--duration-fast)' }}
    >
      {children}
    </Link>
  )
}
