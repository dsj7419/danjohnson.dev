/**
 * Format a YYYY-MM-DD publish date as "Month Day, Year" in en-US, anchored
 * to UTC so the displayed calendar day matches the frontmatter input
 * regardless of the viewer's local timezone.
 *
 * `new Date('2026-03-14')` parses the string as UTC midnight. Calling
 * `toLocaleDateString('en-US', ...)` without an explicit `timeZone` then
 * renders that instant using the runtime's local timezone, which shifts
 * the displayed date backward by one calendar day in any timezone west
 * of UTC. Passing `timeZone: 'UTC'` keeps the formatter in UTC and the
 * rendered day stays aligned with the input.
 */
export function formatPublishDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
