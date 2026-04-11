import { render, screen } from '@testing-library/react'

import { Callout } from '@/components/blocks/callout'

describe('Callout', () => {
  it('renders children', () => {
    render(<Callout variant="note">Important info</Callout>)
    expect(screen.getByText('Important info')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(
      <Callout variant="note" title="Note">
        Content
      </Callout>,
    )
    expect(screen.getByText('Note')).toBeInTheDocument()
  })

  it('renders as aside element', () => {
    const { container } = render(<Callout variant="note">Content</Callout>)
    expect(container.querySelector('aside')).toBeInTheDocument()
  })

  it('applies elevated background', () => {
    const { container } = render(<Callout variant="note">Content</Callout>)
    const aside = container.querySelector('aside')
    expect(aside?.className).toContain('bg-(--color-bg-elevated)')
  })

  it('applies accent border for note variant', () => {
    const { container } = render(<Callout variant="note">Content</Callout>)
    const aside = container.querySelector('aside')
    expect(aside?.className).toContain('border-l-')
  })

  it('applies different border color for warning variant', () => {
    const { container } = render(<Callout variant="warning">Content</Callout>)
    const aside = container.querySelector('aside')
    expect(aside?.className).toContain('border-l-')
  })

  it('forwards className', () => {
    const { container } = render(
      <Callout variant="note" className="mt-4">
        Content
      </Callout>,
    )
    const aside = container.querySelector('aside')
    expect(aside?.className).toContain('mt-4')
  })
})
