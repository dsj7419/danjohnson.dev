import { formatPublishDate } from '@/lib/dates'

type MetaItem = {
  label: string
  value: string
}

type CaseStudyMetaProps = {
  role: string
  date: string
  client?: string | undefined
  organization?: string | undefined
  duration?: string | undefined
  teamSize?: string | undefined
  className?: string
}

export function CaseStudyMeta({
  role,
  date,
  client,
  organization,
  duration,
  teamSize,
  className = '',
}: CaseStudyMetaProps) {
  const formattedDate = formatPublishDate(date)

  const items: MetaItem[] = [
    { label: 'Role', value: role },
    ...(client !== undefined ? [{ label: 'Client', value: client }] : []),
    ...(organization !== undefined ? [{ label: 'Organization', value: organization }] : []),
    ...(duration !== undefined ? [{ label: 'Duration', value: duration }] : []),
    ...(teamSize !== undefined ? [{ label: 'Team', value: teamSize }] : []),
    { label: 'Date', value: formattedDate },
  ]

  return (
    <div className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`.trim()}>
      {items.map((item) => (
        <div key={item.label} className="flex items-baseline gap-1.5">
          <span className="text-xs text-[var(--color-text-faint)]">{item.label}</span>
          <span className="font-mono text-sm text-[var(--color-text-muted)]">{item.value}</span>
        </div>
      ))}
    </div>
  )
}
