import { checkRateLimit, resetRateLimits } from '@/lib/actions/rate-limit'

describe('checkRateLimit', () => {
  beforeEach(() => {
    resetRateLimits()
  })

  it('allows the first request', () => {
    expect(checkRateLimit('1.2.3.4')).toEqual({ allowed: true })
  })

  it('allows up to 5 requests from the same IP', () => {
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit('1.2.3.4').allowed).toBe(true)
    }
  })

  it('blocks the 6th request from the same IP', () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit('1.2.3.4')
    }
    const result = checkRateLimit('1.2.3.4')
    expect(result.allowed).toBe(false)
    expect(result.retryAfterSeconds).toBeGreaterThan(0)
  })

  it('tracks different IPs independently', () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit('1.2.3.4')
    }
    expect(checkRateLimit('1.2.3.4').allowed).toBe(false)
    expect(checkRateLimit('5.6.7.8').allowed).toBe(true)
  })

  it('resets after the time window expires', () => {
    const realNow = Date.now
    let mockTime = 1000000

    Date.now = () => mockTime

    for (let i = 0; i < 5; i++) {
      checkRateLimit('1.2.3.4')
    }
    expect(checkRateLimit('1.2.3.4').allowed).toBe(false)

    mockTime += 60 * 60 * 1000 + 1
    expect(checkRateLimit('1.2.3.4').allowed).toBe(true)

    Date.now = realNow
  })
})
