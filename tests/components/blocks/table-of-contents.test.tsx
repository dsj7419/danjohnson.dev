import { render, screen } from '@testing-library/react'

import { TableOfContents } from '@/components/blocks/table-of-contents'
import type { TocEntry } from '@/types/content'

describe('TableOfContents', () => {
  const entries: TocEntry[] = [
    { depth: 2, text: 'Overview', id: 'overview' },
    { depth: 3, text: 'Background', id: 'background' },
    { depth: 2, text: 'Architecture', id: 'architecture' },
    { depth: 3, text: 'Components', id: 'components' },
  ]

  it('renders all entries as links', () => {
    render(<TableOfContents entries={entries} />)
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Background')).toBeInTheDocument()
    expect(screen.getByText('Architecture')).toBeInTheDocument()
    expect(screen.getByText('Components')).toBeInTheDocument()
  })

  it('renders as nav element', () => {
    const { container } = render(<TableOfContents entries={entries} />)
    expect(container.querySelector('nav')).toBeInTheDocument()
  })

  it('creates anchor links with # prefix', () => {
    render(<TableOfContents entries={entries} />)
    const link = screen.getByText('Overview').closest('a')
    expect(link).toHaveAttribute('href', '#overview')
  })

  it('indents h3 entries', () => {
    render(<TableOfContents entries={entries} />)
    const h3Link = screen.getByText('Background').closest('a')
    expect(h3Link?.className).toContain('pl-4')
  })

  it('does not indent h2 entries', () => {
    render(<TableOfContents entries={entries} />)
    const h2Link = screen.getByText('Overview').closest('a')
    expect(h2Link?.className).not.toContain('pl-4')
  })

  it('returns null for empty entries', () => {
    const { container } = render(<TableOfContents entries={[]} />)
    expect(container.querySelector('nav')).not.toBeInTheDocument()
  })
})
