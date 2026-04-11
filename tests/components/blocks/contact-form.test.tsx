import { render, screen } from '@testing-library/react'

import { ContactForm } from '@/components/blocks/contact-form'

vi.mock('@/lib/actions/contact', () => ({
  INITIAL_STATE: { success: false },
  submitContactForm: vi.fn(),
}))

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tell me about your project/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/how did you find me/i)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<ContactForm />)
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('has required attributes on required fields', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/^name/i)).toBeRequired()
    expect(screen.getByLabelText(/email/i)).toBeRequired()
    expect(screen.getByLabelText(/tell me about your project/i)).toBeRequired()
  })

  it('does not require optional fields', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/company/i)).not.toBeRequired()
    expect(screen.getByLabelText(/how did you find me/i)).not.toBeRequired()
  })

  it('renders honeypot field as hidden', () => {
    const { container } = render(<ContactForm />)
    const honeypot = container.querySelector('#website')
    expect(honeypot).toBeInTheDocument()
    expect(honeypot?.closest('[aria-hidden="true"]')).toBeInTheDocument()
  })

  it('renders with id="contact" for anchor linking', () => {
    const { container } = render(<ContactForm />)
    expect(container.querySelector('#contact')).toBeInTheDocument()
  })

  it('renders heading text', () => {
    render(<ContactForm />)
    expect(screen.getByText('Get in touch')).toBeInTheDocument()
  })

  it('forwards className prop', () => {
    const { container } = render(<ContactForm className="mt-8" />)
    expect(container.querySelector('#contact')?.className).toContain('mt-8')
  })
})
