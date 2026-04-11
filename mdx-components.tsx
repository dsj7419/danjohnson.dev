import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

import { Divider } from '@/components/primitives/divider'
import { Heading } from '@/components/primitives/heading'

function createHeading(level: 1 | 2 | 3 | 4) {
  const spacingByLevel: Record<number, string> = {
    1: 'scroll-mt-20',
    2: 'mt-12 mb-4 scroll-mt-20',
    3: 'mt-8 mb-3 scroll-mt-20',
    4: 'mt-6 mb-2 scroll-mt-20',
  }

  function MdxHeading({ children, id }: ComponentPropsWithoutRef<'h1'>) {
    return (
      <Heading level={level} as={`h${level}`} id={id} className={spacingByLevel[level] ?? ''}>
        {children}
      </Heading>
    )
  }
  MdxHeading.displayName = `MdxH${level}`
  return MdxHeading
}

function MdxLink({ href, children }: ComponentPropsWithoutRef<'a'>) {
  const className =
    'text-accent-500 underline underline-offset-4 transition-colors hover:text-accent-600'
  const style = { transitionDuration: 'var(--duration-fast)' }

  if (href?.startsWith('/') || href?.startsWith('#')) {
    return (
      <Link href={href} className={className} style={style}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      {children}
    </a>
  )
}

function MdxImage({ src, alt }: ComponentPropsWithoutRef<'img'>) {
  if (!src || typeof src !== 'string') return null
  return (
    <figure className="py-4">
      <Image
        src={src}
        alt={alt ?? ''}
        width={800}
        height={450}
        className="rounded-md"
        sizes="(max-width: 768px) 100vw, 800px"
      />
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-(--color-text-muted)">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    p: (props: ComponentPropsWithoutRef<'p'>) => (
      <p className="text-base leading-relaxed" {...props} />
    ),
    a: MdxLink,
    img: MdxImage,
    hr: () => <Divider className="my-8" />,
    ul: (props: ComponentPropsWithoutRef<'ul'>) => (
      <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed" {...props} />
    ),
    ol: (props: ComponentPropsWithoutRef<'ol'>) => (
      <ol className="list-decimal space-y-2 pl-6 text-base leading-relaxed" {...props} />
    ),
    li: (props: ComponentPropsWithoutRef<'li'>) => <li className="pl-1" {...props} />,
    blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
      <blockquote
        className="my-6 border-l-2 border-accent-500 pl-4 font-heading italic text-(--color-text-muted)"
        {...props}
      />
    ),
    code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
      const hasLanguage = 'data-language' in props
      if (hasLanguage) return <code {...props}>{children}</code>
      return (
        <code
          className="rounded bg-(--color-code-bg) px-1.5 py-0.5 font-mono text-sm text-(--color-code-text)"
          {...props}
        >
          {children}
        </code>
      )
    },
    pre: (props: ComponentPropsWithoutRef<'pre'>) => (
      <pre
        className="my-6 overflow-x-auto rounded-lg border border-(--color-border) bg-(--color-code-bg) p-4 font-mono text-sm leading-relaxed"
        {...props}
      />
    ),
    table: (props: ComponentPropsWithoutRef<'table'>) => (
      <div className="overflow-x-auto">
        <table className="w-full text-sm" {...props} />
      </div>
    ),
    thead: (props: ComponentPropsWithoutRef<'thead'>) => (
      <thead className="border-b border-(--color-border)" {...props} />
    ),
    th: (props: ComponentPropsWithoutRef<'th'>) => (
      <th className="px-3 py-2 text-left font-semibold" {...props} />
    ),
    td: (props: ComponentPropsWithoutRef<'td'>) => (
      <td className="border-t border-(--color-border) px-3 py-2" {...props} />
    ),
    strong: (props: ComponentPropsWithoutRef<'strong'>) => (
      <strong className="font-semibold" {...props} />
    ),
    ...components,
  }
}
