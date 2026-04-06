import { render, screen } from '@testing-library/react'

import { Text } from '@/components/primitives/text'

describe('Text', () => {
  it('renders children', () => {
    render(<Text>Hello world</Text>)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('renders as p element by default', () => {
    render(<Text>Paragraph</Text>)
    expect(screen.getByText('Paragraph').tagName).toBe('P')
  })

  it('applies body variant by default', () => {
    render(<Text>Body</Text>)
    const el = screen.getByText('Body')
    expect(el.className).toContain('text-base')
  })

  it('applies lead variant', () => {
    render(<Text variant="lead">Lead</Text>)
    const el = screen.getByText('Lead')
    expect(el.className).toContain('text-lg')
  })

  it('applies small variant', () => {
    render(<Text variant="small">Small</Text>)
    const el = screen.getByText('Small')
    expect(el.className).toContain('text-sm')
  })

  it('applies caption variant', () => {
    render(<Text variant="caption">Caption</Text>)
    const el = screen.getByText('Caption')
    expect(el.className).toContain('text-xs')
  })

  it('applies muted color for small and caption', () => {
    const { unmount } = render(<Text variant="small">Muted</Text>)
    expect(screen.getByText('Muted').className).toContain('text-[var(--color-text-muted)]')
    unmount()

    render(<Text variant="caption">Also muted</Text>)
    expect(screen.getByText('Also muted').className).toContain('text-[var(--color-text-muted)]')
  })

  it('renders as a custom element via as prop', () => {
    render(<Text as="span">Inline</Text>)
    expect(screen.getByText('Inline').tagName).toBe('SPAN')
  })

  it('forwards additional className', () => {
    render(<Text className="text-center">Styled</Text>)
    expect(screen.getByText('Styled').className).toContain('text-center')
  })
})
