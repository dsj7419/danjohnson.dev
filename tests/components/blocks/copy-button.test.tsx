import { fireEvent, render, screen } from '@testing-library/react'

import { CopyButton } from '@/components/blocks/copy-button'

const mockWriteText = vi.fn().mockResolvedValue(undefined)

vi.stubGlobal('navigator', {
  ...navigator,
  clipboard: { writeText: mockWriteText },
})

function renderInCodeBlock() {
  return render(
    <pre>
      <CopyButton />
      <code>const x = 42</code>
    </pre>,
  )
}

describe('CopyButton', () => {
  beforeEach(() => {
    mockWriteText.mockClear()
  })

  it('renders a button element', () => {
    renderInCodeBlock()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('has aria-label "Copy code" by default', () => {
    renderInCodeBlock()
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Copy code')
  })

  it('copies code content to clipboard on click', async () => {
    renderInCodeBlock()
    fireEvent.click(screen.getByRole('button'))
    await vi.waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith('const x = 42')
    })
  })

  it('shows "Copied" aria-label after click', async () => {
    renderInCodeBlock()
    fireEvent.click(screen.getByRole('button'))
    await vi.waitFor(() => {
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Copied')
    })
  })

  it('resets aria-label after timeout', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    renderInCodeBlock()
    fireEvent.click(screen.getByRole('button'))
    await vi.waitFor(() => {
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Copied')
    })
    vi.advanceTimersByTime(2100)
    await vi.waitFor(() => {
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Copy code')
    })
    vi.useRealTimers()
  })
})
