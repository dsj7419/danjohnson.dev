import { render, screen } from '@testing-library/react'

import { Header } from '@/components/layout/header'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('@/components/layout/nav-link', () => ({
  NavLink: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

vi.mock('@/components/layout/theme-toggle', () => ({
  ThemeToggle: () => <button aria-label="Theme toggle" />,
}))

vi.mock('@/components/layout/mobile-nav', () => ({
  MobileNav: () => <div data-testid="mobile-nav" />,
}))

describe('Header', () => {
  it('renders site name as link to home', () => {
    render(<Header />)
    const homeLink = screen.getByText('Dan Johnson')
    expect(homeLink.closest('a')).toHaveAttribute('href', '/')
  })

  it('renders navigation links', () => {
    render(<Header />)
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('Writing')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders as header element', () => {
    const { container } = render(<Header />)
    expect(container.querySelector('header')).toBeInTheDocument()
  })

  it('is sticky', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')
    expect(header?.className).toContain('sticky')
    expect(header?.className).toContain('top-0')
  })

  it('includes theme toggle', () => {
    render(<Header />)
    expect(screen.getByLabelText('Theme toggle')).toBeInTheDocument()
  })

  it('includes mobile nav', () => {
    render(<Header />)
    expect(screen.getByTestId('mobile-nav')).toBeInTheDocument()
  })
})
