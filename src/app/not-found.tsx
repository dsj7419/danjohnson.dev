import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[var(--width-content)] flex-col items-center justify-center px-[var(--spacing-content-x)]">
      <h1 className="font-heading text-4xl font-semibold tracking-tight">404</h1>
      <p className="mt-4 text-[var(--color-text-muted)]">This page does not exist.</p>
      <Link
        href="/"
        className="mt-8 text-accent-500 underline underline-offset-4 transition-colors hover:text-accent-600"
        style={{ transitionDuration: 'var(--duration-fast)' }}
      >
        Back to home
      </Link>
    </main>
  )
}
