import { render, screen } from '@testing-library/react'

import { CaseStudyNav } from '@/components/blocks/case-study-nav'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('CaseStudyNav', () => {
  it('renders previous link when provided', () => {
    render(<CaseStudyNav previous={{ slug: 'prev', title: 'Previous Project' }} />)
    const link = screen.getByText(/Previous Project/)
    expect(link.closest('a')).toHaveAttribute('href', '/work/prev')
  })

  it('renders next link when provided', () => {
    render(<CaseStudyNav next={{ slug: 'next', title: 'Next Project' }} />)
    const link = screen.getByText(/Next Project/)
    expect(link.closest('a')).toHaveAttribute('href', '/work/next')
  })

  it('renders both when both provided', () => {
    render(
      <CaseStudyNav
        previous={{ slug: 'prev', title: 'Alpha' }}
        next={{ slug: 'next', title: 'Beta' }}
      />,
    )
    expect(screen.getByText(/Alpha/)).toBeInTheDocument()
    expect(screen.getByText(/Beta/)).toBeInTheDocument()
  })

  it('returns null when neither provided', () => {
    const { container } = render(<CaseStudyNav />)
    expect(container.firstChild).toBeNull()
  })

  it('renders as nav element with aria-label', () => {
    render(<CaseStudyNav previous={{ slug: 'p', title: 'Prev' }} />)
    expect(screen.getByLabelText('Case study navigation')).toBeInTheDocument()
  })
})
