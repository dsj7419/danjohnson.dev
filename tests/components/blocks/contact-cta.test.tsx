import { render, screen } from '@testing-library/react'

import { ContactCTA } from '@/components/blocks/contact-cta'

describe('ContactCTA', () => {
  it('renders the email link', () => {
    render(<ContactCTA email="hello@danjohnson.dev" />)
    const link = screen.getByRole('link', { name: /get in touch/i })
    expect(link).toHaveAttribute('href', 'mailto:hello@danjohnson.dev')
  })

  it('renders a heading', () => {
    render(<ContactCTA email="hello@danjohnson.dev" />)
    expect(screen.getByText(/interested in working together/i)).toBeInTheDocument()
  })

  it('renders as a section element', () => {
    const { container } = render(<ContactCTA email="hello@danjohnson.dev" />)
    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<ContactCTA email="hello@danjohnson.dev" className="mt-8" />)
    const section = container.querySelector('section')
    expect(section?.className).toContain('mt-8')
  })
})
