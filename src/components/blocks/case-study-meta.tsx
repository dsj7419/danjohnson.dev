import { formatPublishDate } from '@/lib/dates'

type MetaItem = {
  label: string
  value: string
  /** When present the value is a date and is rendered as a <time> element. */
  dateTime?: string
}

type CaseStudyMetaProps = {
  role: string
  date: string
  updatedAt?: string | undefined
  client?: string | undefined
  organization?: string | undefined
  duration?: string | undefined
  teamSize?: string | undefined
  className?: string
}

export function CaseStudyMeta({
  role,
  date,
  updatedAt,
  client,
  organization,
  duration,
  teamSize,
  className = '',
}: CaseStudyMetaProps) {
  const updatedOn = updatedAt !== undefined && updatedAt !== date ? updatedAt : undefined

  const items: MetaItem[] = [
    { label: 'Role', value: role },
    ...(client !== undefined ? [{ label: 'Client', value: client }] : []),
    ...(organization !== undefined ? [{ label: 'Organization', value: organization }] : []),
    ...(duration !== undefined ? [{ label: 'Duration', value: duration }] : []),
    ...(teamSize !== undefined ? [{ label: 'Team', value: teamSize }] : []),
    { label: 'Date', value: formatPublishDate(date), dateTime: date },
    ...(updatedOn !== undefined
      ? [{ label: 'Updated', value: formatPublishDate(updatedOn), dateTime: updatedOn }]
      : []),
  ]

  return (
    <div className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`.trim()}>
      {items.map((item) => (
        <div key={item.label} className="flex items-baseline gap-1.5">
          <span className="text-xs text-(--color-text-faint)">{item.label}</span>
          {item.dateTime !== undefined ? (
            <time dateTime={item.dateTime} className="font-mono text-sm text-(--color-text-muted)">
              {item.value}
            </time>
          ) : (
            <span className="font-mono text-sm text-(--color-text-muted)">{item.value}</span>
          )}
        </div>
      ))}
    </div>
  )
}
