import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { checkRateLimit } from '@/lib/actions/rate-limit'
import { buildContactEmail } from '@/lib/email/contact-email'
import { contactFormSchema } from '@/lib/schemas/contact'

function extractClientIp(headersList: Headers): string {
  const forwarded = headersList.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]
    if (first) return first.trim()
  }
  return headersList.get('x-real-ip') ?? 'unknown'
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>

    const honeypot = body['website']
    if (honeypot && String(honeypot).length > 0) {
      return NextResponse.json({ success: true })
    }

    const headersList = await headers()
    const ip = extractClientIp(headersList)

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
      from: 'Dan Johnson <dan@danjohnson.dev>',
      to: contactEmail,
      replyTo: parsed.data.email,
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
