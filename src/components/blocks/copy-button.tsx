'use client'

import { useCallback, useState } from 'react'

export function CopyButton() {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    const pre = e.currentTarget.closest('pre')
    const code = pre?.querySelector('code')
    if (!code) return
    await navigator.clipboard.writeText(code.textContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy code'}
      className="absolute right-3 top-3 rounded-md border border-(--color-border) bg-(--color-code-bg) p-1.5 text-(--color-text-faint) opacity-0 transition-opacity hover:bg-(--color-bg-alt) hover:text-(--color-text-muted) focus:opacity-100 group-hover:opacity-100 group-focus-within:opacity-100 coarse:opacity-100"
      style={{ transitionDuration: 'var(--duration-normal)' }}
    >
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  )
}
