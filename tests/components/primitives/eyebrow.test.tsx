import { render, screen } from '@testing-library/react'

import { Eyebrow } from '@/components/primitives/eyebrow'

describe('Eyebrow', () => {
  it('renders children', () => {
    render(<Eyebrow>Case Study</Eyebrow>)
    expect(screen.getByText('Case Study')).toBeInTheDocument()
  })

  it('renders as span element', () => {
    render(<Eyebrow>Label</Eyebrow>)
    expect(screen.getByText('Label').tagName).toBe('SPAN')
  })

  it('applies uppercase styling', () => {
    render(<Eyebrow>Category</Eyebrow>)
    expect(screen.getByText('Category').className).toContain('uppercase')
  })

  it('applies mono font', () => {
    render(<Eyebrow>Technical</Eyebrow>)
    expect(screen.getByText('Technical').className).toContain('font-mono')
  })

  it('applies letter spacing', () => {
    render(<Eyebrow>Spaced</Eyebrow>)
    expect(screen.getByText('Spaced').className).toContain('tracking-widest')
  })

  it('applies small text size', () => {
    render(<Eyebrow>Small</Eyebrow>)
    expect(screen.getByText('Small').className).toContain('text-xs')
  })

  it('applies muted text color', () => {
    render(<Eyebrow>Muted</Eyebrow>)
    expect(screen.getByText('Muted').className).toContain('text-(--color-text-muted)')
  })

  it('forwards additional className', () => {
    render(<Eyebrow className="mb-2">Styled</Eyebrow>)
    expect(screen.getByText('Styled').className).toContain('mb-2')
  })
})
