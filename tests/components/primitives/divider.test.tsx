import { render } from '@testing-library/react'

import { Divider } from '@/components/primitives/divider'

describe('Divider', () => {
  it('renders an hr element', () => {
    const { container } = render(<Divider />)
    const hr = container.querySelector('hr')
    expect(hr).toBeInTheDocument()
  })

  it('applies border color token', () => {
    const { container } = render(<Divider />)
    const hr = container.querySelector('hr')
    expect(hr?.className).toContain('border-(--color-border)')
  })

  it('has no visible border-top only', () => {
    const { container } = render(<Divider />)
    const hr = container.querySelector('hr')
    expect(hr?.className).toContain('border-t')
    expect(hr?.className).toContain('border-b-0')
  })

  it('forwards additional className', () => {
    const { container } = render(<Divider className="my-8" />)
    const hr = container.querySelector('hr')
    expect(hr?.className).toContain('my-8')
  })
})
