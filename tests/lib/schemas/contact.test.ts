import { contactFormSchema } from '@/lib/schemas/contact'

function validData() {
  return {
    name: 'Jane Smith',
    email: 'jane@example.com',
    company: 'Acme Corp',
    message: 'I am building a complex system and need architecture help with the backend.',
    referralSource: 'Found you through a colleague',
  }
}

describe('contactFormSchema', () => {
  it('accepts valid data with all fields', () => {
    const result = contactFormSchema.safeParse(validData())
    expect(result.success).toBe(true)
  })

  it('accepts valid data with optional fields empty', () => {
    const result = contactFormSchema.safeParse({
      name: 'Jane Smith',
      email: 'jane@example.com',
      message: 'I need help with a product build for my startup team.',
    })
    expect(result.success).toBe(true)
  })

  it('accepts empty string for company', () => {
    const result = contactFormSchema.safeParse({ ...validData(), company: '' })
    expect(result.success).toBe(true)
  })

  it('accepts empty string for referralSource', () => {
    const result = contactFormSchema.safeParse({ ...validData(), referralSource: '' })
    expect(result.success).toBe(true)
  })

  it('rejects missing name', () => {
    const result = contactFormSchema.safeParse({ ...validData(), name: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Name is required')
    }
  })

  it('rejects missing email', () => {
    const result = contactFormSchema.safeParse({ ...validData(), email: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Email is required')
    }
  })

  it('rejects invalid email format', () => {
    const result = contactFormSchema.safeParse({ ...validData(), email: 'not-an-email' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Please enter a valid email address')
    }
  })

  it('rejects message shorter than 20 characters', () => {
    const result = contactFormSchema.safeParse({ ...validData(), message: 'Too short' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain('at least 20 characters')
    }
  })

  it('accepts message at exactly 20 characters', () => {
    const result = contactFormSchema.safeParse({ ...validData(), message: 'A'.repeat(20) })
    expect(result.success).toBe(true)
  })

  it('rejects message over 5000 characters', () => {
    const result = contactFormSchema.safeParse({ ...validData(), message: 'A'.repeat(5001) })
    expect(result.success).toBe(false)
  })

  it('rejects name over 100 characters', () => {
    const result = contactFormSchema.safeParse({ ...validData(), name: 'A'.repeat(101) })
    expect(result.success).toBe(false)
  })
})
