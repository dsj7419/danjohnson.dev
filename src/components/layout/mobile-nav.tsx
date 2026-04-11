'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'

type NavItem = {
  label: string
  href: string
}

type MobileNavProps = {
  items: readonly NavItem[]
}

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [lastPathname, setLastPathname] = useState(pathname)

  // Close menu on any route change (site name link, internal links, browser nav)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setIsOpen(false)
  }

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <div className="md:hidden">
      <button
        onClick={toggle}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        className="rounded-md p-2 text-(--color-text-muted) transition-colors hover:text-(--color-text)"
        style={{ transitionDuration: 'var(--duration-fast)' }}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {isOpen && (
        <nav className="absolute left-0 right-0 top-full border-b border-(--color-border) bg-(--color-bg) px-content-x py-4">
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className={`block text-sm transition-colors ${
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? 'font-medium text-accent-500'
                      : 'text-(--color-text-muted) hover:text-(--color-text)'
                  }`}
                  style={{ transitionDuration: 'var(--duration-fast)' }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
