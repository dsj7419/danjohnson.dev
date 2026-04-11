const submissions = new Map<string, { count: number; resetAt: number }>()

const MAX_REQUESTS = 5
const WINDOW_MS = 60 * 60 * 1000

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now()

  for (const [key, value] of submissions) {
    if (value.resetAt <= now) {
      submissions.delete(key)
    }
  }

  const entry = submissions.get(ip)

  if (!entry || entry.resetAt <= now) {
    submissions.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true }
  }

  if (entry.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    }
  }

  entry.count += 1
  return { allowed: true }
}

export function resetRateLimits(): void {
  submissions.clear()
}
