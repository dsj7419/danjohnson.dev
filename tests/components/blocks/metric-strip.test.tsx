import { render, screen } from '@testing-library/react'

import { MetricStrip } from '@/components/blocks/metric-strip'

describe('MetricStrip', () => {
  const items = [
    { label: 'Lighthouse', value: '98' },
    { label: 'Load Time', value: '1.2s' },
    { label: 'Bundle Size', value: '45KB' },
  ]

  it('renders all metric values', () => {
    render(<MetricStrip items={items} />)
    expect(screen.getByText('98')).toBeInTheDocument()
    expect(screen.getByText('1.2s')).toBeInTheDocument()
    expect(screen.getByText('45KB')).toBeInTheDocument()
  })

  it('renders all metric labels', () => {
    render(<MetricStrip items={items} />)
    expect(screen.getByText('Lighthouse')).toBeInTheDocument()
    expect(screen.getByText('Load Time')).toBeInTheDocument()
    expect(screen.getByText('Bundle Size')).toBeInTheDocument()
  })

  it('applies mono font to values', () => {
    render(<MetricStrip items={items} />)
    const value = screen.getByText('98')
    expect(value.className).toContain('font-mono')
  })

  it('uses flex layout', () => {
    const { container } = render(<MetricStrip items={items} />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain('flex')
  })
})
