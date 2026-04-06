import { render, screen } from '@testing-library/react'

import { Stack } from '@/components/primitives/stack'

describe('Stack', () => {
  it('renders children', () => {
    render(
      <Stack>
        <p>First</p>
        <p>Second</p>
      </Stack>,
    )
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  it('renders as div by default', () => {
    render(
      <Stack>
        <p>Child</p>
      </Stack>,
    )
    const el = screen.getByText('Child').parentElement
    expect(el?.tagName).toBe('DIV')
  })

  it('applies default gap of space-y-6', () => {
    render(
      <Stack>
        <p>Child</p>
      </Stack>,
    )
    const el = screen.getByText('Child').parentElement
    expect(el?.className).toContain('space-y-6')
  })

  it('applies custom gap when specified', () => {
    render(
      <Stack gap={4}>
        <p>Child</p>
      </Stack>,
    )
    const el = screen.getByText('Child').parentElement
    expect(el?.className).toContain('space-y-4')
  })

  it('renders as a custom element via as prop', () => {
    render(
      <Stack as="ul">
        <li>Item</li>
      </Stack>,
    )
    const el = screen.getByRole('list')
    expect(el.tagName).toBe('UL')
  })

  it('forwards additional className', () => {
    render(
      <Stack className="px-4">
        <p>Child</p>
      </Stack>,
    )
    const el = screen.getByText('Child').parentElement
    expect(el?.className).toContain('px-4')
  })
})
