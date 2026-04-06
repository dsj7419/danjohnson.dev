import { render, screen } from '@testing-library/react'

import { StackList } from '@/components/blocks/stack-list'

describe('StackList', () => {
  it('renders all items', () => {
    render(<StackList items={['Next.js', 'TypeScript', 'PostgreSQL']} />)
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
  })

  it('applies mono font to items', () => {
    render(<StackList items={['Next.js']} />)
    expect(screen.getByText('Next.js').className).toContain('font-mono')
  })

  it('renders a heading', () => {
    render(<StackList items={['Next.js']} />)
    expect(screen.getByText('Tech Stack')).toBeInTheDocument()
  })

  it('returns null for empty items', () => {
    const { container } = render(<StackList items={[]} />)
    expect(container.firstChild).toBeNull()
  })
})
