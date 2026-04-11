import Link from 'next/link'

type ProjectCardProps = {
  title: string
  description: string
  slug: string
  tags: string[]
  role: string
  className?: string
}

export function ProjectCard({
  title,
  description,
  slug,
  tags,
  role,
  className = '',
}: ProjectCardProps) {
  return (
    <article
      className={`rounded-lg border border-(--color-border) bg-(--color-bg-elevated) p-6 transition-colors hover:border-accent-500/50 ${className}`.trim()}
      style={{ transitionDuration: 'var(--duration-normal)' }}
    >
      <div className="space-y-3">
        <p className="font-mono text-xs text-(--color-text-muted)">{role}</p>
        <Link
          href={`/work/${slug}`}
          className="block font-heading text-xl font-semibold tracking-tight text-(--color-text) hover:text-accent-500"
          style={{ transitionDuration: 'var(--duration-fast)' }}
        >
          {title}
        </Link>
        <p className="text-sm leading-relaxed text-(--color-text-muted)">{description}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-(--color-bg-alt) px-2.5 py-0.5 font-mono text-xs text-(--color-text-faint)"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
