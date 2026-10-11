// @vitest-environment node
import { resetRateLimits } from '@/lib/actions/rate-limit'

type SendArgs = {
  from: string
  to: string | string[]
  replyTo?: string | string[]
  subject: string
  html: string
  text: string
}

type SendResult = {
  data: { id: string } | null
  error: { message: string; name: string } | null
}

const mockSend = vi.fn<(args: SendArgs) => Promise<SendResult>>()

vi.mock('resend', () => ({
  Resend: class MockResend {
    emails = { send: mockSend }
  },
}))

const SITE_ORIGIN = 'https://danjohnson.dev'
const ROUTE_URL = `${SITE_ORIGIN}/api/contact`

const validBody = () => ({
  name: 'Jane Smith',
  email: 'jane@example.com',
  company: 'Acme Corp',
  message: 'I am building a complex system and need architecture help with the backend.',
  referralSource: 'Found through a colleague',
  website: '',
})

type PostOptions = {
  body?: unknown
  rawBody?: string
  headers?: Record<string, string | null>
  url?: string
}

/** Builds a request the way the site's own form sends it; callers override headers to break it. */
function buildRequest({ body, rawBody, headers = {}, url = ROUTE_URL }: PostOptions): Request {
  const defaults: Record<string, string> = {
    'content-type': 'application/json',
    origin: SITE_ORIGIN,
    'sec-fetch-site': 'same-origin',
    'x-forwarded-for': '1.2.3.4',
  }
  const merged = new Headers()
  for (const [key, value] of Object.entries({ ...defaults, ...headers })) {
    if (value !== null) merged.set(key, value)
  }
  return new Request(url, {
    method: 'POST',
    headers: merged,
    body: rawBody ?? JSON.stringify(body ?? validBody()),
  })
}

async function post(options: PostOptions = {}) {
  const { POST } = await import('@/app/api/contact/route')
  const response = await POST(buildRequest(options))
  const json = (await response.json()) as {
    success: boolean
    error?: string
    fieldErrors?: Record<string, string>
  }
  return { status: response.status, json }
}

function sendArgs(callIndex: number): SendArgs {
  const args = mockSend.mock.calls[callIndex]?.[0]
  if (!args) throw new Error(`send was not called ${callIndex + 1} time(s)`)
  return args
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    resetRateLimits()
    mockSend.mockResolvedValue({ data: { id: 'test-id' }, error: null })
    vi.stubEnv('RESEND_API_KEY', 're_test_key')
    vi.stubEnv('CONTACT_EMAIL', 'inbox@example.com')
    vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.useRealTimers()
  })

  describe('happy path', () => {
    it('sends the notification and the confirmation and returns success', async () => {
      const { status, json } = await post()

      expect(status).toBe(200)
      expect(json).toEqual({ success: true })
      expect(mockSend).toHaveBeenCalledTimes(2)
    })

    it('addresses the notification to the owner with the submitter as reply-to', async () => {
      await post()

      const notification = sendArgs(0)
      expect(notification.from).toBe('Jane Smith via danjohnson.dev <noreply@danjohnson.dev>')
      expect(notification.to).toBe('inbox@example.com')
      expect(notification.replyTo).toEqual(['jane@example.com'])
      expect(notification.subject).toContain('Jane Smith')
    })

    it('addresses the confirmation to the submitter with the live inbox as reply-to', async () => {
      await post()

      const confirmation = sendArgs(1)
      expect(confirmation.from).toBe('Dan Johnson <dan@danjohnson.dev>')
      expect(confirmation.to).toBe('jane@example.com')
      expect(confirmation.replyTo).toBe('inbox@example.com')
    })

    it('never echoes the submitted message in the confirmation', async () => {
      await post()

      const confirmation = sendArgs(1)
      expect(confirmation.text).not.toContain('architecture help')
      expect(confirmation.html).not.toContain('architecture help')
    })
  })

  describe('request origin guard', () => {
    it.each([
      ['no content-type', { 'content-type': null }],
      ['a non-JSON content-type', { 'content-type': 'text/plain' }],
      ['a form content-type', { 'content-type': 'application/x-www-form-urlencoded' }],
      [
        'a cross-site origin and no fetch metadata',
        { origin: 'https://evil.example', 'sec-fetch-site': null },
      ],
      [
        'cross-site fetch metadata',
        { origin: 'https://evil.example', 'sec-fetch-site': 'cross-site' },
      ],
      [
        'same-site fetch metadata from another origin',
        { origin: 'https://evil.example', 'sec-fetch-site': 'same-site' },
      ],
      ['no origin and no fetch metadata', { origin: null, 'sec-fetch-site': null }],
    ])('rejects a request with %s without sending', async (_label, headers) => {
      const { status, json } = await post({ headers })

      expect(status).toBe(403)
      expect(json.success).toBe(false)
      expect(json.error).toMatch(/could not be verified/i)
      expect(mockSend).not.toHaveBeenCalled()
    })

    it('accepts same-origin fetch metadata even when the origin header is absent', async () => {
      const { status } = await post({ headers: { origin: null } })

      expect(status).toBe(200)
    })

    it('accepts a matching origin header when fetch metadata is absent', async () => {
      const { status } = await post({ headers: { 'sec-fetch-site': null } })

      expect(status).toBe(200)
    })

    it("accepts an origin equal to the request's own origin (preview deployments)", async () => {
      const preview = 'https://site-preview.vercel.app'
      const { status } = await post({
        url: `${preview}/api/contact`,
        headers: { origin: preview, 'sec-fetch-site': null },
      })

      expect(status).toBe(200)
    })

    it('accepts a JSON content-type with a charset parameter', async () => {
      const { status } = await post({
        headers: { 'content-type': 'application/json; charset=utf-8' },
      })

      expect(status).toBe(200)
    })

    it('does not spend rate-limit budget on rejected requests', async () => {
      for (let i = 0; i < 10; i++) {
        await post({ headers: { 'content-type': 'text/plain' } })
      }

      const { status } = await post()
      expect(status).toBe(200)
    })
  })

  describe('body parsing', () => {
    it.each([
      ['malformed JSON', '{not json'],
      ['a JSON null', 'null'],
      ['a JSON string', '"hello"'],
      ['a JSON array', '[1,2,3]'],
      ['a JSON number', '42'],
    ])('returns 400 with empty field errors for %s', async (_label, rawBody) => {
      const { status, json } = await post({ rawBody })

      expect(status).toBe(400)
      expect(json.success).toBe(false)
      expect(json.fieldErrors).toEqual({})
      expect(json.error).toBeTruthy()
      expect(mockSend).not.toHaveBeenCalled()
    })

    it('returns 400 with one message per invalid field', async () => {
      const { status, json } = await post({
        body: { name: '', email: 'not-valid', message: 'Too short', website: '' },
      })

      expect(status).toBe(400)
      expect(json.success).toBe(false)
      expect(json.fieldErrors).toEqual({
        name: 'Name is required',
        email: 'Please enter a valid email address',
        message: 'Please tell me a bit more about your project (at least 20 characters)',
      })
      expect(mockSend).not.toHaveBeenCalled()
    })
  })

  describe('honeypot', () => {
    it('returns success without sending when the honeypot field is filled', async () => {
      const { status, json } = await post({
        body: { ...validBody(), website: 'http://spam.example' },
      })

      expect(status).toBe(200)
      expect(json).toEqual({ success: true })
      expect(mockSend).not.toHaveBeenCalled()
    })
  })

  describe('rate limiting', () => {
    it('returns 429 with the retry window in minutes on the sixth request from one IP', async () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2026-10-12T00:00:00Z'))

      for (let i = 0; i < 5; i++) {
        expect((await post()).status).toBe(200)
      }
      const { status, json } = await post()

      expect(status).toBe(429)
      expect(json.success).toBe(false)
      expect(json.error).toBe('Too many submissions. Please try again in 60 minutes.')
      expect(mockSend).toHaveBeenCalledTimes(10)
    })

    it('logs a short hash of the client IP, never the address itself', async () => {
      for (let i = 0; i < 6; i++) {
        await post({ headers: { 'x-forwarded-for': '203.0.113.9' } })
      }

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringMatching(/Rate limited IP hash: [0-9a-f]{12}$/),
      )
      expect(console.warn).not.toHaveBeenCalledWith(expect.stringContaining('203.0.113.9'))
    })

    it('keys the limit on the first hop of x-forwarded-for', async () => {
      for (let i = 0; i < 5; i++) {
        await post({ headers: { 'x-forwarded-for': '9.9.9.9, 10.0.0.1' } })
      }

      const { status } = await post({ headers: { 'x-forwarded-for': '9.9.9.9' } })
      expect(status).toBe(429)
    })

    it('falls back to x-real-ip when x-forwarded-for is absent', async () => {
      for (let i = 0; i < 5; i++) {
        await post({ headers: { 'x-forwarded-for': null, 'x-real-ip': '7.7.7.7' } })
      }

      const { status } = await post({
        headers: { 'x-forwarded-for': null, 'x-real-ip': '7.7.7.7' },
      })
      expect(status).toBe(429)
    })

    it('still accepts, and warns, when no client IP header is present', async () => {
      const { status } = await post({ headers: { 'x-forwarded-for': null } })

      expect(status).toBe(200)
      expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('rate limiting degraded'))
    })

    it('tracks IPs independently', async () => {
      for (let i = 0; i < 5; i++) {
        await post({ headers: { 'x-forwarded-for': '5.5.5.5' } })
      }

      const { status } = await post({ headers: { 'x-forwarded-for': '6.6.6.6' } })
      expect(status).toBe(200)
    })
  })

  describe('configuration and delivery failures', () => {
    it('returns 500 without sending when RESEND_API_KEY is missing', async () => {
      vi.stubEnv('RESEND_API_KEY', '')

      const { status, json } = await post()

      expect(status).toBe(500)
      expect(json.error).toContain('not configured')
      expect(mockSend).not.toHaveBeenCalled()
    })

    it('returns 500 without sending when CONTACT_EMAIL is missing', async () => {
      vi.stubEnv('CONTACT_EMAIL', '')

      const { status, json } = await post()

      expect(status).toBe(500)
      expect(json.error).toContain('not configured')
      expect(mockSend).not.toHaveBeenCalled()
    })

    it('returns 502 and skips the confirmation when the notification send fails', async () => {
      mockSend.mockResolvedValueOnce({
        data: null,
        error: { message: 'API error', name: 'api_error' },
      })

      const { status, json } = await post()

      expect(status).toBe(502)
      expect(json.error).toContain('Failed to send')
      expect(mockSend).toHaveBeenCalledTimes(1)
    })

    it('still returns success, and logs, when only the confirmation send rejects', async () => {
      mockSend
        .mockResolvedValueOnce({ data: { id: 'ok' }, error: null })
        .mockRejectedValueOnce(new Error('confirmation down'))

      const { status, json } = await post()

      expect(status).toBe(200)
      expect(json).toEqual({ success: true })
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('confirmation down'))
    })

    it('returns a generic 500 when the notification send throws', async () => {
      mockSend.mockRejectedValueOnce(new Error('network down'))

      const { status, json } = await post()

      expect(status).toBe(500)
      expect(json.error).toBe('Something went wrong. Please try again.')
    })
  })

  describe('header injection', () => {
    it.each([
      ['a CRLF sequence', 'Jane\r\nBcc: victim@example.com'],
      ['a bare LF', 'Jane\nX-Injected: 1'],
      ['angle brackets', 'Jane <attacker@example.com>'],
      ['a double quote', 'Jane "The Boss" Smith'],
    ])(
      'keeps the From display name and Subject on one line when the name contains %s',
      async (_label, name) => {
        await post({ body: { ...validBody(), name } })

        const notification = sendArgs(0)
        expect(notification.from).not.toMatch(/[\r\n]/)
        expect(notification.subject).not.toMatch(/[\r\n]/)
        expect(notification.from).toMatch(/^[^<>]* via danjohnson\.dev <noreply@danjohnson\.dev>$/)
      },
    )
  })
})
