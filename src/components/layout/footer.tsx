import Link from 'next/link'

import { siteConfig } from '@/config/site'

export function Footer() {
  return (
    <footer className="border-t border-(--color-border) bg-(--color-bg-alt)">
      <div className="mx-auto flex max-w-(--width-wide) flex-col items-center justify-between gap-4 px-content-x py-8 sm:flex-row">
        <p className="text-sm text-(--color-text-muted)">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>

        <nav aria-label="Footer links" className="flex items-center gap-4">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-(--color-text-muted) transition-colors hover:text-(--color-text)"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            GitHub
          </a>
          <Link
            href="/writing/feed.xml"
            className="text-sm text-(--color-text-muted) transition-colors hover:text-(--color-text)"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            RSS
          </Link>
        </nav>
      </div>
    </footer>
  )
}
