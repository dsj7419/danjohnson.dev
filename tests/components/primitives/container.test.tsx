import { render, screen } from '@testing-library/react'

import { Container } from '@/components/primitives/container'

describe('Container', () => {
  it('renders children', () => {
    render(<Container>Hello</Container>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('applies content width by default', () => {
    render(<Container>Content</Container>)
    const el = screen.getByText('Content')
    expect(el.className).toContain('max-w-(--width-content)')
  })

  it('applies reading width when specified', () => {
    render(<Container width="reading">Prose</Container>)
    const el = screen.getByText('Prose')
    expect(el.className).toContain('max-w-(--width-reading)')
  })

  it('applies wide width when specified', () => {
    render(<Container width="wide">Wide</Container>)
    const el = screen.getByText('Wide')
    expect(el.className).toContain('max-w-(--width-wide)')
  })

  it('centers content with mx-auto', () => {
    render(<Container>Centered</Container>)
    const el = screen.getByText('Centered')
    expect(el.className).toContain('mx-auto')
  })

  it('applies horizontal padding', () => {
    render(<Container>Padded</Container>)
    const el = screen.getByText('Padded')
    expect(el.className).toContain('px-content-x')
  })

  it('renders as a custom element via as prop', () => {
    render(<Container as="section">Section</Container>)
    const el = screen.getByText('Section')
    expect(el.tagName).toBe('SECTION')
  })

  it('renders as div by default', () => {
    render(<Container>Default</Container>)
    const el = screen.getByText('Default')
    expect(el.tagName).toBe('DIV')
  })

  it('forwards additional className', () => {
    render(<Container className="mt-8">Styled</Container>)
    const el = screen.getByText('Styled')
    expect(el.className).toContain('mt-8')
  })
})
