import { render, screen } from '@testing-library/react'

import { ArticleEntry } from '@/components/blocks/article-entry'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('ArticleEntry', () => {
  const props = {
    title: 'How I Design Software Systems',
    description: 'Architecture-first thinking produces better software.',
    slug: 'design-systems-before-code',
    category: 'engineering-philosophy',
    date: '2026-04-01',
    readingTime: 5,
    tags: ['architecture', 'engineering'],
  }

  it('renders the title', () => {
    render(<ArticleEntry {...props} />)
    expect(screen.getByText('How I Design Software Systems')).toBeInTheDocument()
  })

  it('renders the date as a time element with a machine-readable datetime', () => {
    render(<ArticleEntry {...props} />)
    const time = screen.getByText('April 1, 2026')
    expect(time.tagName).toBe('TIME')
    expect(time).toHaveAttribute('dateTime', '2026-04-01')
  })

  it('renders the description', () => {
    render(<ArticleEntry {...props} />)
    expect(screen.getByText(/Architecture-first/)).toBeInTheDocument()
  })

  it('links to the article page', () => {
    render(<ArticleEntry {...props} />)
    const link = screen.getByText('How I Design Software Systems').closest('a')
    expect(link).toHaveAttribute('href', '/writing/design-systems-before-code')
  })

  it('renders reading time', () => {
    render(<ArticleEntry {...props} />)
    expect(screen.getByText(/5 min read/)).toBeInTheDocument()
  })

  it('renders the category', () => {
    render(<ArticleEntry {...props} />)
    expect(screen.getByText(/engineering philosophy/i)).toBeInTheDocument()
  })
})
