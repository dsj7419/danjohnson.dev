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

  it('renders as a note landmark-free region named after its variant', () => {
    render(<Callout variant="warning">Careful</Callout>)
    const note = screen.getByRole('note', { name: 'Warning' })
    expect(note.tagName).toBe('DIV')
  })

  it('uses the title as the accessible name when one is given', () => {
    render(
      <Callout variant="note" title="Status">
        Shipping
      </Callout>,
    )
    expect(screen.getByRole('note', { name: 'Status' })).toBeInTheDocument()
  })

  it('applies elevated background', () => {
    const { container } = render(<Callout variant="note">Content</Callout>)
    const aside = container.querySelector('[role="note"]')
    expect(aside?.className).toContain('bg-(--color-bg-elevated)')
  })

  it('applies accent border for note variant', () => {
    const { container } = render(<Callout variant="note">Content</Callout>)
    const aside = container.querySelector('[role="note"]')
    expect(aside?.className).toContain('border-l-')
  })

  it('applies different border color for warning variant', () => {
    const { container } = render(<Callout variant="warning">Content</Callout>)
    const aside = container.querySelector('[role="note"]')
    expect(aside?.className).toContain('border-l-')
  })

  it('forwards className', () => {
    const { container } = render(
      <Callout variant="note" className="mt-4">
        Content
      </Callout>,
    )
    const aside = container.querySelector('[role="note"]')
    expect(aside?.className).toContain('mt-4')
  })
})
