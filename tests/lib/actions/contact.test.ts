import { INITIAL_STATE, submitContactForm } from '@/lib/actions/contact'
import { resetRateLimits } from '@/lib/actions/rate-limit'

const mockSend = vi.fn()

vi.mock('resend', () => {
  return {
    Resend: class MockResend {
      emails = { send: mockSend }
    },
  }
})

const mockHeaderValues = new Map([['x-forwarded-for', '1.2.3.4']])

vi.mock('next/headers', () => ({
  headers: () =>
    Promise.resolve({
      get: (key: string) => mockHeaderValues.get(key) ?? null,
    }),
}))

function createFormData(data: Record<string, string>): FormData {
  const fd = new FormData()
  for (const [key, value] of Object.entries(data)) {
    fd.set(key, value)
  }
  return fd
}

const validFormData = () =>
  createFormData({
    name: 'Jane Smith',
    email: 'jane@example.com',
    company: 'Acme Corp',
    message: 'I am building a complex system and need architecture help with the backend.',
    referralSource: 'Found through a colleague',
    website: '',
  })

describe('submitContactForm', () => {
  beforeEach(() => {
    resetRateLimits()
    mockSend.mockResolvedValue({ data: { id: 'test-id' }, error: null })
    vi.stubEnv('RESEND_API_KEY', 're_test_key')
    vi.stubEnv('CONTACT_EMAIL', 'dan@test.com')
  })

  it('returns success for valid submission', async () => {
    const result = await submitContactForm(INITIAL_STATE, validFormData())
    expect(result.success).toBe(true)
  })

  it('returns fake success when honeypot is filled', async () => {
    const fd = validFormData()
    fd.set('website', 'http://spam.example.com')
    const result = await submitContactForm(INITIAL_STATE, fd)
    expect(result.success).toBe(true)
  })

  it('returns field errors for invalid data', async () => {
    const fd = createFormData({
      name: '',
      email: 'not-valid',
      message: 'Too short',
      website: '',
    })
    const result = await submitContactForm(INITIAL_STATE, fd)
    expect(result.success).toBe(false)
    expect(result.fieldErrors).toBeDefined()
    expect(result.fieldErrors?.['name']).toBe('Name is required')
  })

  it('returns error when rate limited', async () => {
    for (let i = 0; i < 5; i++) {
      await submitContactForm(INITIAL_STATE, validFormData())
    }
    const result = await submitContactForm(INITIAL_STATE, validFormData())
    expect(result.success).toBe(false)
    expect(result.error).toContain('Too many submissions')
  })

  it('returns error when env vars are missing', async () => {
    vi.stubEnv('RESEND_API_KEY', '')
    const result = await submitContactForm(INITIAL_STATE, validFormData())
    expect(result.success).toBe(false)
    expect(result.error).toContain('not configured')
  })

  it('returns error when Resend fails', async () => {
    mockSend.mockResolvedValueOnce({
      data: null,
      error: { message: 'API error', name: 'api_error' },
    })
    const result = await submitContactForm(INITIAL_STATE, validFormData())
    expect(result.success).toBe(false)
    expect(result.error).toContain('Failed to send')
  })
})
