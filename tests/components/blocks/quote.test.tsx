import { render, screen } from '@testing-library/react'

import { Quote } from '@/components/blocks/quote'

describe('Quote', () => {
  it('renders children as quote text', () => {
    render(<Quote>Great engineering starts with understanding the problem.</Quote>)
    expect(
      screen.getByText('Great engineering starts with understanding the problem.'),
    ).toBeInTheDocument()
  })

  it('renders as blockquote element', () => {
    const { container } = render(<Quote>Text</Quote>)
    expect(container.querySelector('blockquote')).toBeInTheDocument()
  })

  it('renders attribution when provided', () => {
    render(<Quote attribution="Austin Eischeid">Great work.</Quote>)
    expect(screen.getByText('Austin Eischeid')).toBeInTheDocument()
  })

  it('renders role when provided with attribution', () => {
    render(
      <Quote attribution="Austin Eischeid" role="Designer">
        Great work.
      </Quote>,
    )
    expect(screen.getByText(/Designer/)).toBeInTheDocument()
  })

  it('applies accent left border', () => {
    const { container } = render(<Quote>Text</Quote>)
    const quote = container.querySelector('blockquote')
    expect(quote?.className).toContain('border-l-')
  })

  it('applies serif font for quote text', () => {
    const { container } = render(<Quote>Text</Quote>)
    const quote = container.querySelector('blockquote')
    expect(quote?.className).toContain('font-heading')
  })
})
