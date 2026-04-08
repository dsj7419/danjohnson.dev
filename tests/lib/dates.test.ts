import { formatPublishDate } from '@/lib/dates'

describe('formatPublishDate', () => {
  it('formats a YYYY-MM-DD string as Month Day, Year', () => {
    expect(formatPublishDate('2026-03-14')).toBe('March 14, 2026')
  })

  it('returns the same calendar day as the input, not shifted by local timezone', () => {
    // This is the core bug fix: new Date('2026-03-18') parses as UTC midnight,
    // and toLocaleDateString without an explicit timeZone option shifts the
    // displayed date backward by one day in timezones west of UTC. The fix is
    // to pass { timeZone: 'UTC' } to toLocaleDateString so the output matches
    // the input's calendar day regardless of the runtime's local timezone.
    expect(formatPublishDate('2026-03-18')).toBe('March 18, 2026')
  })

  it('handles start-of-year dates correctly', () => {
    expect(formatPublishDate('2026-01-01')).toBe('January 1, 2026')
  })

  it('handles end-of-year dates correctly', () => {
    expect(formatPublishDate('2026-12-31')).toBe('December 31, 2026')
  })

  it('handles leap-year February 29', () => {
    expect(formatPublishDate('2024-02-29')).toBe('February 29, 2024')
  })

  it('handles single-digit days without leading zeros in output', () => {
    expect(formatPublishDate('2026-05-01')).toBe('May 1, 2026')
  })

  it('handles single-digit months correctly', () => {
    expect(formatPublishDate('2026-09-09')).toBe('September 9, 2026')
  })
})
