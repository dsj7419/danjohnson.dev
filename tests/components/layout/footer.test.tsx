import { render, screen } from '@testing-library/react'

import { Footer } from '@/components/layout/footer'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('Footer', () => {
  it('renders copyright with current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })

  it('renders site name', () => {
    render(<Footer />)
    expect(screen.getByText(/Dan Johnson/)).toBeInTheDocument()
  })

  it('renders GitHub link', () => {
    render(<Footer />)
    const link = screen.getByText('GitHub')
    expect(link).toHaveAttribute('href', 'https://github.com/dsj7419')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders LinkedIn link', () => {
    render(<Footer />)
    const link = screen.getByText('LinkedIn')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders RSS link', () => {
    render(<Footer />)
    const link = screen.getByText('RSS')
    expect(link.closest('a')).toHaveAttribute('href', '/writing/feed.xml')
  })

  it('renders as footer element', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('footer')).toBeInTheDocument()
  })
})
