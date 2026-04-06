import { render, screen } from '@testing-library/react'

import { CaseStudyMeta } from '@/components/blocks/case-study-meta'

describe('CaseStudyMeta', () => {
  it('renders role', () => {
    render(<CaseStudyMeta role="Lead Engineer" date="2026-03-15" />)
    expect(screen.getByText('Lead Engineer')).toBeInTheDocument()
  })

  it('renders date value', () => {
    render(<CaseStudyMeta role="Engineer" date="2026-03-15" />)
    expect(screen.getByText(/2026/)).toBeInTheDocument()
  })

  it('renders client when provided', () => {
    render(<CaseStudyMeta role="Engineer" date="2026-01-01" client="Acme Corp" />)
    expect(screen.getByText('Acme Corp')).toBeInTheDocument()
  })

  it('renders duration when provided', () => {
    render(<CaseStudyMeta role="Engineer" date="2026-01-01" duration="3 months" />)
    expect(screen.getByText('3 months')).toBeInTheDocument()
  })

  it('renders teamSize when provided', () => {
    render(<CaseStudyMeta role="Engineer" date="2026-01-01" teamSize="2 engineers" />)
    expect(screen.getByText('2 engineers')).toBeInTheDocument()
  })

  it('does not render missing optional fields', () => {
    const { container } = render(<CaseStudyMeta role="Engineer" date="2026-01-01" />)
    expect(container.textContent).not.toContain('undefined')
  })
})
