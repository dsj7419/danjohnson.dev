import Image from 'next/image'

type FigureWidth = 'default' | 'wide' | 'full'

type FigureProps = {
  src: string
  alt: string
  caption?: string
  width?: FigureWidth
  className?: string
}

const widthStyles: Record<FigureWidth, string> = {
  default: 'max-w-[var(--width-reading)]',
  wide: 'max-w-[var(--width-content)]',
  full: 'max-w-[var(--width-wide)]',
}

export function Figure({ src, alt, caption, width = 'default', className = '' }: FigureProps) {
  return (
    <figure className={`mx-auto py-4 ${widthStyles[width]} ${className}`.trim()}>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="rounded-md"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-[var(--color-text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
