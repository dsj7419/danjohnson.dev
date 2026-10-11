'use client'

import Link from 'next/link'
import { useCallback, useRef, useState } from 'react'

type FormState = {
  success: boolean
  error?: string | undefined
  fieldErrors?: Record<string, string> | undefined
}

function FormField({
  label,
  name,
  type = 'text',
  required = false,
  error,
  children,
}: {
  label: string
  name: string
  type?: string | undefined
  required?: boolean | undefined
  error?: string | undefined
  children?: React.ReactNode
}) {
  const id = `contact-${name}`
  const errorId = `${id}-error`

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-(--color-text)">
        {label}
        {required && <span className="ml-0.5 text-(--color-text-faint)">*</span>}
      </label>
      {children ?? (
        <input
          type={type}
          id={id}
          name={name}
          required={required}
          aria-describedby={error ? errorId : undefined}
          className={`w-full rounded-md border px-4 py-3 text-base text-(--color-text) placeholder:text-(--color-text-faint) transition-colors bg-(--color-bg) focus:outline-none focus:ring-1 ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-(--color-border) focus:border-accent-500 focus:ring-accent-500'
          }`}
          style={{ transitionDuration: 'var(--duration-fast)' }}
        />
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactForm({ className = '' }: { className?: string }) {
  const [state, setState] = useState<FormState>({ success: false })
  const [pending, setPending] = useState(false)
  const [submittedName, setSubmittedName] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = useCallback(async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)
    setState({ success: false })

    const form = e.currentTarget
    const formData = new FormData(form)
    const submittedNameField = formData.get('name')
    setSubmittedName(typeof submittedNameField === 'string' ? submittedNameField : '')

    try {
      const body = {
        name: formData.get('name'),
        email: formData.get('email'),
        company: formData.get('company'),
        message: formData.get('message'),
        referralSource: formData.get('referralSource'),
        website: formData.get('website'),
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = (await res.json()) as FormState
      setState(data)
    } catch {
      setState({ success: false, error: 'Something went wrong. Please try again.' })
    } finally {
      setPending(false)
    }
  }, [])

  if (state.success) {
    return (
      <section
        id="contact"
        role="status"
        className={`rounded-lg border border-(--color-border) bg-(--color-bg-alt) p-8 text-center ${className}`.trim()}
      >
        <div className="mx-auto max-w-md space-y-4 py-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto text-emerald-500"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="16 10 10.5 15.5 8 13" />
          </svg>
          <p className="text-lg font-semibold text-(--color-text)">Message sent</p>
          <p className="text-sm text-(--color-text-muted)">
            Thanks{submittedName ? `, ${submittedName}` : ''}. I&apos;ll review your project details
            and get back to you soon.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-accent-500 underline underline-offset-4 transition-colors hover:text-accent-600"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            Send another message
          </button>
        </div>
      </section>
    )
  }

  return (
    <section
      id="contact"
      className={`rounded-lg border border-(--color-border) bg-(--color-bg-alt) p-8 ${className}`.trim()}
    >
      <div className="mb-6">
        <p className="text-lg font-semibold text-(--color-text)">Get in touch</p>
        <p className="mt-1 text-sm text-(--color-text-muted)">
          Tell me what you are building. The more specific, the better.
        </p>
      </div>

      {state.error && (
        <div role="alert" className="mb-6 rounded-md border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-sm text-red-500">{state.error}</p>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <FormField label="Name" name="name" required error={state.fieldErrors?.['name']} />

        <FormField
          label="Email"
          name="email"
          type="email"
          required
          error={state.fieldErrors?.['email']}
        />

        <FormField label="Company" name="company" error={state.fieldErrors?.['company']} />

        <FormField
          label="Tell me about your project"
          name="message"
          required
          error={state.fieldErrors?.['message']}
        >
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            required
            aria-describedby={state.fieldErrors?.['message'] ? 'contact-message-error' : undefined}
            className={`w-full resize-y rounded-md border px-4 py-3 text-base text-(--color-text) placeholder:text-(--color-text-faint) transition-colors bg-(--color-bg) focus:outline-none focus:ring-1 ${
              state.fieldErrors?.['message']
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-(--color-border) focus:border-accent-500 focus:ring-accent-500'
            }`}
            style={{ transitionDuration: 'var(--duration-fast)' }}
            placeholder="What are you building? What kind of help are you looking for?"
          />
        </FormField>

        <FormField
          label="How did you find me?"
          name="referralSource"
          error={state.fieldErrors?.['referralSource']}
        />

        <div className="pt-2">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center rounded-md bg-accent-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-600 disabled:opacity-50 disabled:pointer-events-none"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            {pending ? 'Sending...' : 'Send message'}
          </button>
          <p className="mt-3 text-xs text-(--color-text-muted)">
            This goes straight to my inbox.{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 transition-colors hover:text-(--color-text)"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              How I handle what you send
            </Link>
            .
          </p>
        </div>
      </form>
    </section>
  )
}
