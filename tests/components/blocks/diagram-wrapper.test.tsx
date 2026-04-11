import { render, screen } from '@testing-library/react'

import { DiagramWrapper } from '@/components/blocks/diagram-wrapper'

describe('DiagramWrapper', () => {
  it('renders children', () => {
    render(
      <DiagramWrapper>
        <svg data-testid="diagram" />
      </DiagramWrapper>,
    )
    expect(screen.getByTestId('diagram')).toBeInTheDocument()
  })

  it('renders caption when provided', () => {
    render(
      <DiagramWrapper caption="System architecture">
        <svg />
      </DiagramWrapper>,
    )
    expect(screen.getByText('System architecture')).toBeInTheDocument()
  })

  it('renders as figure element', () => {
    const { container } = render(
      <DiagramWrapper>
        <svg />
      </DiagramWrapper>,
    )
    expect(container.querySelector('figure')).toBeInTheDocument()
  })

  it('applies border and elevated background', () => {
    const { container } = render(
      <DiagramWrapper>
        <svg />
      </DiagramWrapper>,
    )
    const figure = container.querySelector('figure')
    expect(figure?.className).toContain('border')
    expect(figure?.className).toContain('bg-(--color-bg-elevated)')
  })

  it('does not render figcaption without caption', () => {
    const { container } = render(
      <DiagramWrapper>
        <svg />
      </DiagramWrapper>,
    )
    expect(container.querySelector('figcaption')).not.toBeInTheDocument()
  })
})
