import { render, screen } from '@testing-library/react'

import { Heading } from '@/components/primitives/heading'

describe('Heading', () => {
  it('renders children', () => {
    render(<Heading level={1}>Title</Heading>)
    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument()
  })

  it('renders h1 element for level 1', () => {
    render(<Heading level={1}>H1</Heading>)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders h2 element for level 2', () => {
    render(<Heading level={2}>H2</Heading>)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renders h3 element for level 3', () => {
    render(<Heading level={3}>H3</Heading>)
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })

  it('renders h4 element for level 4', () => {
    render(<Heading level={4}>H4</Heading>)
    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument()
  })

  it('applies serif font for level 1', () => {
    render(<Heading level={1}>Serif</Heading>)
    const el = screen.getByRole('heading')
    expect(el.className).toContain('font-heading')
  })

  it('applies serif font for level 2', () => {
    render(<Heading level={2}>Serif</Heading>)
    const el = screen.getByRole('heading')
    expect(el.className).toContain('font-heading')
  })

  it('applies sans font for level 3', () => {
    render(<Heading level={3}>Sans</Heading>)
    const el = screen.getByRole('heading')
    expect(el.className).not.toContain('font-heading')
  })

  it('applies correct size for each level', () => {
    const { unmount } = render(<Heading level={1}>L1</Heading>)
    expect(screen.getByRole('heading').className).toContain('text-4xl')
    unmount()

    const { unmount: u2 } = render(<Heading level={2}>L2</Heading>)
    expect(screen.getByRole('heading').className).toContain('text-3xl')
    u2()

    const { unmount: u3 } = render(<Heading level={3}>L3</Heading>)
    expect(screen.getByRole('heading').className).toContain('text-2xl')
    u3()

    render(<Heading level={4}>L4</Heading>)
    expect(screen.getByRole('heading').className).toContain('text-xl')
  })

  it('applies semibold weight', () => {
    render(<Heading level={1}>Bold</Heading>)
    expect(screen.getByRole('heading').className).toContain('font-semibold')
  })

  it('allows override via as prop', () => {
    render(
      <Heading level={2} as="h3">
        Override
      </Heading>,
    )
    const el = screen.getByRole('heading', { name: 'Override' })
    expect(el.tagName).toBe('H3')
    expect(el.className).toContain('text-3xl')
  })

  it('forwards additional className', () => {
    render(
      <Heading level={1} className="text-center">
        Styled
      </Heading>,
    )
    expect(screen.getByRole('heading').className).toContain('text-center')
  })
})
