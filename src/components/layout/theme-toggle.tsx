'use client'

import { useCallback, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark' | 'system'

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system'
  return (localStorage.getItem('theme') as Theme | null) ?? 'system'
}

function subscribe(callback: () => void): () => void {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getStoredTheme, () => 'system' as Theme)

  const cycle = useCallback(() => {
    const order: Theme[] = ['light', 'dark', 'system']
    const nextIndex = (order.indexOf(theme) + 1) % order.length
    const next = order[nextIndex] as Theme

    const isDark =
      next === 'dark' ||
      (next === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList.toggle('dark', isDark)

    if (next === 'system') {
      localStorage.removeItem('theme')
    } else {
      localStorage.setItem('theme', next)
    }

    window.dispatchEvent(new StorageEvent('storage'))
  }, [theme])

  return (
    <button
      onClick={cycle}
      aria-label={`Theme: ${theme}. Click to change.`}
      className="rounded-md p-2 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
      style={{ transitionDuration: 'var(--duration-fast)' }}
    >
      {theme === 'light' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
      {theme === 'dark' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
      {theme === 'system' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )}
    </button>
  )
}
