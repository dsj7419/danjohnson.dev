'use server'

import { headers } from 'next/headers'

import { buildContactEmail } from '@/lib/email/contact-email'
import { contactFormSchema } from '@/lib/schemas/contact'

import { checkRateLimit } from './rate-limit'

export type ContactActionState = {
  success: boolean
  error?: string | undefined
  fieldErrors?: Record<string, string> | undefined
}

const INITIAL_STATE: ContactActionState = { success: false }

export { INITIAL_STATE }

function extractClientIp(headersList: Headers): string {
  const forwarded = headersList.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]
    if (first) return first.trim()
  }
  return headersList.get('x-real-ip') ?? 'unknown'
}

export async function submitContactForm(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  try {
    const honeypot = formData.get('website')
    if (honeypot && String(honeypot).length > 0) {
      return { success: true }
    }

    const headersList = await headers()
    const ip = extractClientIp(headersList)

    if (ip === 'unknown') {
      console.warn('[contact] No client IP in headers — rate limiting degraded')
    }

    const rateCheck = checkRateLimit(ip)
    if (!rateCheck.allowed) {
      console.warn(`[contact] Rate limited IP: ${ip}`)
      return {
        success: false,
        error: `Too many submissions. Please try again in ${Math.ceil((rateCheck.retryAfterSeconds ?? 3600) / 60)} minutes.`,
      }
    }

    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message'),
      referralSource: formData.get('referralSource'),
    }

    const parsed = contactFormSchema.safeParse(rawData)
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]
        if (key !== undefined && typeof key === 'string') {
          fieldErrors[key] = issue.message
        }
      }
      return { success: false, fieldErrors }
    }

    const apiKey = process.env['RESEND_API_KEY']
    const contactEmail = process.env['CONTACT_EMAIL']

    if (!apiKey || !contactEmail) {
      console.error('[contact] RESEND_API_KEY or CONTACT_EMAIL not configured')
      return {
        success: false,
        error: 'Contact form is not configured. Please try again later.',
      }
    }

    const email = buildContactEmail(parsed.data)
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: 'Dan Johnson <dan@danjohnson.dev>',
      to: contactEmail,
      replyTo: parsed.data.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
    })

    if (error) {
      console.error(`[contact] Resend send failed: ${error.message}`)
      return {
        success: false,
        error: 'Failed to send your message. Please try again.',
      }
    }

    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`[contact] Unexpected error in submitContactForm: ${message}`)
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    }
  }
}
