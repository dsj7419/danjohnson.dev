import Link from 'next/link'

import { siteConfig } from '@/config/site'

import { MobileNav } from './mobile-nav'
import { NavLink } from './nav-link'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[var(--width-wide)] items-center justify-between px-[var(--spacing-content-x)] py-4">
        <Link
          href="/"
          className="font-heading text-lg font-semibold tracking-tight text-[var(--color-text)]"
        >
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden md:block" aria-label="Main navigation">
            <ul className="flex items-center gap-6">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <ThemeToggle />
          <MobileNav items={siteConfig.nav} />
        </div>
      </div>
    </header>
  )
}
