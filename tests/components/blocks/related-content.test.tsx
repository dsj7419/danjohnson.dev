import { render, screen } from '@testing-library/react'

import { RelatedContent } from '@/components/blocks/related-content'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('RelatedContent', () => {
  it('renders related links', () => {
    render(
      <RelatedContent
        items={[
          { path: '/work/austin', title: 'Austin Eischeid', type: 'case-study' },
          { path: '/writing/ai-article', title: 'AI in Products', type: 'article' },
        ]}
      />,
    )
    expect(screen.getByText('Austin Eischeid')).toBeInTheDocument()
    expect(screen.getByText('AI in Products')).toBeInTheDocument()
  })

  it('renders correct hrefs', () => {
    render(
      <RelatedContent items={[{ path: '/work/austin', title: 'Austin', type: 'case-study' }]} />,
    )
    const link = screen.getByText('Austin').closest('a')
    expect(link).toHaveAttribute('href', '/work/austin')
  })

  it('shows type labels', () => {
    render(
      <RelatedContent
        items={[
          { path: '/work/austin', title: 'Austin', type: 'case-study' },
          { path: '/writing/ai', title: 'AI', type: 'article' },
        ]}
      />,
    )
    expect(screen.getByText(/case study/i)).toBeInTheDocument()
    expect(screen.getByText(/article/i)).toBeInTheDocument()
  })

  it('renders a heading', () => {
    render(
      <RelatedContent items={[{ path: '/work/austin', title: 'Austin', type: 'case-study' }]} />,
    )
    expect(screen.getByText(/related/i)).toBeInTheDocument()
  })

  it('returns null for empty items', () => {
    const { container } = render(<RelatedContent items={[]} />)
    expect(container.firstChild).toBeNull()
  })
})
