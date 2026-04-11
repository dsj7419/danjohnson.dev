import { buildContactEmail } from '@/lib/email/contact-email'
import type { ContactFormData } from '@/lib/schemas/contact'

function validData(): ContactFormData {
  return {
    name: 'Jane Smith',
    email: 'jane@example.com',
    company: 'Acme Corp',
    message: 'I am building a complex system and need architecture help.',
    referralSource: 'Found through a colleague',
  }
}

describe('buildContactEmail', () => {
  it('returns subject with name', () => {
    const { subject } = buildContactEmail(validData())
    expect(subject).toBe('New inquiry from Jane Smith via danjohnson.dev')
  })

  it('includes all fields in text version', () => {
    const { text } = buildContactEmail(validData())
    expect(text).toContain('Name: Jane Smith')
    expect(text).toContain('Email: jane@example.com')
    expect(text).toContain('Company: Acme Corp')
    expect(text).toContain('Found through a colleague')
    expect(text).toContain('I am building a complex system')
  })

  it('includes all fields in HTML version', () => {
    const { html } = buildContactEmail(validData())
    expect(html).toContain('Jane Smith')
    expect(html).toContain('jane@example.com')
    expect(html).toContain('Acme Corp')
    expect(html).toContain('Found through a colleague')
    expect(html).toContain('I am building a complex system')
  })

  it('shows "Not provided" for empty company', () => {
    const data = { ...validData(), company: '' }
    const { text, html } = buildContactEmail(data)
    expect(text).toContain('Company: Not provided')
    expect(html).toContain('Not provided')
  })

  it('shows "Not provided" for empty referralSource', () => {
    const data = { ...validData(), referralSource: '' }
    const { text, html } = buildContactEmail(data)
    expect(text).toContain('How they found you: Not provided')
    expect(html).toContain('Not provided')
  })

  it('escapes HTML special characters in all fields', () => {
    const data = {
      ...validData(),
      name: '<script>alert("xss")</script>',
      message: 'Test with <b>bold</b> & "quotes"',
    }
    const { html } = buildContactEmail(data)
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
    expect(html).toContain('&amp;')
    expect(html).toContain('&quot;quotes&quot;')
  })

  it('has valid HTML structure', () => {
    const { html } = buildContactEmail(validData())
    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('<html>')
    expect(html).toContain('</html>')
  })
})
