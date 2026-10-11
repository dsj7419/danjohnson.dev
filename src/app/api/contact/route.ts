import { NextResponse } from 'next/server'

import { siteConfig } from '@/config/site'
import { checkRateLimit } from '@/lib/actions/rate-limit'
import {
  buildConfirmationEmail,
  buildContactEmail,
  sanitizeHeaderValue,
} from '@/lib/email/contact-email'
import { contactFormSchema } from '@/lib/schemas/contact'

function extractClientIp(headersList: Headers): string {
  const forwarded = headersList.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]
    if (first) return first.trim()
  }
  return headersList.get('x-real-ip') ?? 'unknown'
}

/**
 * The form is the only legitimate caller: it posts JSON from this site's own origin.
 * Anything else (cross-site forms laundering a visitor's IP through the rate limiter,
 * scripted senders) is refused before the body is read or any budget is spent.
 */
function isTrustedRequest(request: Request): boolean {
  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.toLowerCase().startsWith('application/json')) return false

  if (request.headers.get('sec-fetch-site') === 'same-origin') return true

  const origin = request.headers.get('origin')
  if (!origin) return false
  return origin === siteConfig.url || origin === new URL(request.url).origin
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

async function readJsonObject(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const parsed: unknown = await request.json()
    return isRecord(parsed) ? parsed : null
  } catch {
    return null
  }
}

export async function POST(request: Request) {
  try {
    if (!isTrustedRequest(request)) {
      return NextResponse.json(
        {
          success: false,
          error: 'This request could not be verified. Please reload the page and try again.',
        },
        { status: 403 },
      )
    }

    const body = await readJsonObject(request)
    if (!body) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request. Please reload the page and try again.',
          fieldErrors: {},
        },
        { status: 400 },
      )
    }

    const honeypot = body['website']
    if (typeof honeypot === 'string' && honeypot.length > 0) {
      console.warn('[contact] Honeypot hit')
      return NextResponse.json({ success: true })
    }

    const ip = extractClientIp(request.headers)

    if (ip === 'unknown') {
      console.warn('[contact] No client IP in headers — rate limiting degraded')
    }

    const rateCheck = checkRateLimit(ip)
    if (!rateCheck.allowed) {
      console.warn(`[contact] Rate limited IP: ${ip}`)
      return NextResponse.json(
        {
          success: false,
          error: `Too many submissions. Please try again in ${Math.ceil((rateCheck.retryAfterSeconds ?? 3600) / 60)} minutes.`,
        },
        { status: 429 },
      )
    }

    const parsed = contactFormSchema.safeParse(body)
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]
        if (key !== undefined && typeof key === 'string') {
          fieldErrors[key] = issue.message
        }
      }
      return NextResponse.json({ success: false, fieldErrors }, { status: 400 })
    }

    const apiKey = process.env['RESEND_API_KEY']
    const contactEmail = process.env['CONTACT_EMAIL']

    if (!apiKey || !contactEmail) {
      console.error('[contact] RESEND_API_KEY or CONTACT_EMAIL not configured')
      return NextResponse.json(
        { success: false, error: 'Contact form is not configured. Please try again later.' },
        { status: 500 },
      )
    }

    const email = buildContactEmail(parsed.data)
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: `${sanitizeHeaderValue(parsed.data.name)} via danjohnson.dev <noreply@danjohnson.dev>`,
      to: contactEmail,
      replyTo: [parsed.data.email],
      subject: email.subject,
      html: email.html,
      text: email.text,
    })

    if (error) {
      console.error(`[contact] Resend send failed: ${error.message}`)
      return NextResponse.json(
        { success: false, error: 'Failed to send your message. Please try again.' },
        { status: 502 },
      )
    }

    const confirmation = buildConfirmationEmail(parsed.data)
    await resend.emails
      .send({
        from: 'Dan Johnson <dan@danjohnson.dev>',
        to: parsed.data.email,
        // The apex domain has no inbound mail (no MX record), so replies must go to the live inbox
        // that receives notifications (devex-ops-015). Revisit when DNS forwarding exists.
        replyTo: contactEmail,
        subject: confirmation.subject,
        html: confirmation.html,
        text: confirmation.text,
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : 'Unknown'
        console.error(`[contact] Confirmation email failed: ${msg}`)
      })

    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`[contact] Unexpected error: ${message}`)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}
