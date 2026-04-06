import { render, screen } from '@testing-library/react'

import { Figure } from '@/components/blocks/figure'

describe('Figure', () => {
  it('renders an image', () => {
    render(<Figure src="/test.png" alt="Test image" />)
    expect(screen.getByAltText('Test image')).toBeInTheDocument()
  })

  it('renders caption when provided', () => {
    render(<Figure src="/test.png" alt="Test" caption="A test figure" />)
    expect(screen.getByText('A test figure')).toBeInTheDocument()
  })

  it('renders as figure element', () => {
    const { container } = render(<Figure src="/test.png" alt="Test" />)
    expect(container.querySelector('figure')).toBeInTheDocument()
  })

  it('renders figcaption for caption', () => {
    const { container } = render(<Figure src="/test.png" alt="Test" caption="Caption text" />)
    expect(container.querySelector('figcaption')).toBeInTheDocument()
  })

  it('does not render figcaption without caption', () => {
    const { container } = render(<Figure src="/test.png" alt="Test" />)
    expect(container.querySelector('figcaption')).not.toBeInTheDocument()
  })

  it('applies default width constraint', () => {
    const { container } = render(<Figure src="/test.png" alt="Test" />)
    const figure = container.querySelector('figure')
    expect(figure?.className).toContain('max-w-[var(--width-reading)]')
  })

  it('applies wide width when specified', () => {
    const { container } = render(<Figure src="/test.png" alt="Test" width="wide" />)
    const figure = container.querySelector('figure')
    expect(figure?.className).toContain('max-w-[var(--width-content)]')
  })

  it('applies full width when specified', () => {
    const { container } = render(<Figure src="/test.png" alt="Test" width="full" />)
    const figure = container.querySelector('figure')
    expect(figure?.className).toContain('max-w-[var(--width-wide)]')
  })
})
