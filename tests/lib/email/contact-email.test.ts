import {
  buildConfirmationEmail,
  buildContactEmail,
  sanitizeHeaderValue,
} from '@/lib/email/contact-email'
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

describe('sanitizeHeaderValue', () => {
  // Header values (From display name, Subject) must never carry line breaks or address syntax:
  // CR/LF would let a submitter inject headers, and angle brackets could forge the address part
  // of a display name (security-004).
  it('removes carriage returns and line feeds', () => {
    expect(sanitizeHeaderValue('Jane\r\nBcc: victim@example.com')).toBe(
      'Jane Bcc: victim@example.com',
    )
  })

  it('removes other control characters', () => {
    expect(sanitizeHeaderValue('Ja\u0000ne\u0007 Smith\u007f')).toBe('Jane Smith')
  })

  it('removes angle brackets that could forge an address in a display name', () => {
    expect(sanitizeHeaderValue('Jane <attacker@example.com>')).toBe('Jane attacker@example.com')
  })

  it('collapses runs of whitespace and trims', () => {
    expect(sanitizeHeaderValue('  Jane \t  Smith  ')).toBe('Jane Smith')
  })

  it('leaves ordinary names alone', () => {
    expect(sanitizeHeaderValue("Siobhán O'Neill-García")).toBe("Siobhán O'Neill-García")
  })
})

describe('buildContactEmail', () => {
  it('returns subject with name', () => {
    const { subject } = buildContactEmail(validData())
    expect(subject).toBe('New inquiry from Jane Smith via danjohnson.dev')
  })

  it('keeps the subject on one line when the name contains line breaks', () => {
    const data = { ...validData(), name: 'Jane\r\nX-Injected: 1' }
    const { subject } = buildContactEmail(data)
    expect(subject).not.toMatch(/[\r\n]/)
    expect(subject).toBe('New inquiry from Jane X-Injected: 1 via danjohnson.dev')
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

describe('buildConfirmationEmail', () => {
  it('returns subject line', () => {
    const { subject } = buildConfirmationEmail(validData())
    expect(subject).toContain('Dan Johnson')
  })

  it('greets the submitter by name', () => {
    const { html, text } = buildConfirmationEmail(validData())
    expect(html).toContain('Hi Jane Smith')
    expect(text).toContain('Hi Jane Smith')
  })

  it('does not echo the submitted message back', () => {
    // The confirmation goes to an unverified address from the site's DKIM-aligned domain. Echoing
    // the message would turn the form into a relay for arbitrary text (security-002, security-G03).
    const { html, text } = buildConfirmationEmail(validData())
    expect(html).not.toContain('I am building a complex system')
    expect(text).not.toContain('I am building a complex system')
    expect(text).not.toContain("Here's a copy of what you sent")
  })

  it('states a concrete reply window instead of "soon"', () => {
    const { html, text } = buildConfirmationEmail(validData())
    expect(text).toContain('two business days')
    expect(html).toContain('two business days')
    expect(text).not.toMatch(/\bsoon\b/)
  })

  it('includes a link to danjohnson.dev', () => {
    const { html } = buildConfirmationEmail(validData())
    expect(html).toContain('danjohnson.dev')
  })

  it('escapes HTML in the name', () => {
    const data = { ...validData(), name: '<script>alert("xss")</script>' }
    const { html } = buildConfirmationEmail(data)
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })
})
