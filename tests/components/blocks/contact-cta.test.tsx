import { render, screen } from '@testing-library/react'

import { ContactCta } from '@/components/blocks/contact-cta'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('ContactCta', () => {
  it('is a labelled region that invites the reader to get in touch', () => {
    render(<ContactCta />)
    expect(
      screen.getByRole('region', { name: /building something like this\?/i }),
    ).toBeInTheDocument()
  })

  it('links straight to the contact form with the primary button style', () => {
    render(<ContactCta />)
    const link = screen.getByRole('link', { name: /work with me/i })
    expect(link).toHaveAttribute('href', '/work-with-me#contact')
    expect(link.className).toContain('bg-accent-500')
  })

  it('states the reply window', () => {
    render(<ContactCta />)
    expect(screen.getByText(/two business days/i)).toBeInTheDocument()
  })
})
