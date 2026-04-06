import { render, screen } from '@testing-library/react'

import { Section } from '@/components/primitives/section'

describe('Section', () => {
  it('renders children', () => {
    render(<Section>Content</Section>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders as a section element', () => {
    render(<Section>Semantic</Section>)
    const el = screen.getByText('Semantic')
    expect(el.tagName).toBe('SECTION')
  })

  it('applies vertical section spacing', () => {
    render(<Section>Spaced</Section>)
    const el = screen.getByText('Spaced')
    expect(el.className).toContain('py-[var(--spacing-section-y)]')
  })

  it('applies default background by default', () => {
    render(<Section>Default</Section>)
    const el = screen.getByText('Default')
    expect(el.className).not.toContain('bg-')
  })

  it('applies alt background when specified', () => {
    render(<Section background="alt">Alt</Section>)
    const el = screen.getByText('Alt')
    expect(el.className).toContain('bg-[var(--color-bg-alt)]')
  })

  it('applies elevated background when specified', () => {
    render(<Section background="elevated">Elevated</Section>)
    const el = screen.getByText('Elevated')
    expect(el.className).toContain('bg-[var(--color-bg-elevated)]')
  })

  it('forwards additional className', () => {
    render(<Section className="border-t">Styled</Section>)
    const el = screen.getByText('Styled')
    expect(el.className).toContain('border-t')
  })
})
