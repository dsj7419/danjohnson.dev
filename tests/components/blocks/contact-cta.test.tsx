import { render, screen } from '@testing-library/react'

import { ContactCTA } from '@/components/blocks/contact-cta'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('ContactCTA', () => {
  it('renders a link to the contact form', () => {
    render(<ContactCTA />)
    const link = screen.getByRole('link', { name: /get in touch/i })
    expect(link).toHaveAttribute('href', '/work-with-me#contact')
  })

  it('renders a heading', () => {
    render(<ContactCTA />)
    expect(screen.getByText(/interested in working together/i)).toBeInTheDocument()
  })

  it('renders as a section element', () => {
    const { container } = render(<ContactCTA />)
    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<ContactCTA className="mt-8" />)
    const section = container.querySelector('section')
    expect(section?.className).toContain('mt-8')
  })
})
