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

  it('applies border to figure and elevated background to content area', () => {
    const { container } = render(
      <DiagramWrapper>
        <svg />
      </DiagramWrapper>,
    )
    const figure = container.querySelector('figure')
    expect(figure?.className).toContain('border')
    const contentDiv = figure?.querySelector('div')
    expect(contentDiv?.className).toContain('bg-(--color-bg-elevated)')
  })

  it('does not render figcaption without caption', () => {
    const { container } = render(
      <DiagramWrapper>
        <svg />
      </DiagramWrapper>,
    )
    expect(container.querySelector('figcaption')).not.toBeInTheDocument()
  })

  it('renders title header when title is provided', () => {
    render(
      <DiagramWrapper title="Package Dependency Graph">
        <svg />
      </DiagramWrapper>,
    )
    expect(screen.getByText('Package Dependency Graph')).toBeInTheDocument()
  })

  it('does not render title header when title is absent', () => {
    const { container } = render(
      <DiagramWrapper>
        <svg />
      </DiagramWrapper>,
    )
    const headerDivs = container.querySelectorAll('figure > div')
    expect(headerDivs).toHaveLength(1)
  })

  it('renders title before content and caption after', () => {
    const { container } = render(
      <DiagramWrapper title="Architecture" caption="System overview">
        <svg />
      </DiagramWrapper>,
    )
    const figure = container.querySelector('figure')
    const children = Array.from(figure?.children ?? [])
    expect(children[0]?.textContent).toBe('Architecture')
    expect(children[children.length - 1]?.textContent).toBe('System overview')
  })

  it('caption has border-top separator', () => {
    const { container } = render(
      <DiagramWrapper caption="Description">
        <svg />
      </DiagramWrapper>,
    )
    const figcaption = container.querySelector('figcaption')
    expect(figcaption?.className).toContain('border-t')
  })
})
