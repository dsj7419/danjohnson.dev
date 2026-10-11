import { render, screen } from '@testing-library/react'

import { CurrentlyStrip } from '@/components/blocks/currently-strip'

const currently = {
  focus: 'Accrulith, a deterministic game engine in Go',
  status: 'Taking a limited number of new engagements',
  updated: '2026-10-12',
}

describe('CurrentlyStrip', () => {
  it('renders the focus and the status', () => {
    render(<CurrentlyStrip currently={currently} />)
    expect(screen.getByText(/Accrulith, a deterministic game engine in Go/)).toBeInTheDocument()
    expect(screen.getByText(/Taking a limited number of new engagements/)).toBeInTheDocument()
  })

  it('shows when the line was last updated as a time element', () => {
    render(<CurrentlyStrip currently={currently} />)
    const time = screen.getByText('October 12, 2026')
    expect(time.tagName).toBe('TIME')
    expect(time).toHaveAttribute('dateTime', '2026-10-12')
  })

  it('is labelled as a status line for assistive technology', () => {
    render(<CurrentlyStrip currently={currently} />)
    expect(screen.getByRole('note', { name: /currently/i })).toBeInTheDocument()
  })
})
