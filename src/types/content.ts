import type { ComponentType } from 'react'
import { z } from 'zod'

export const caseStudyFrontmatterSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().min(1),
  date: z.iso.date(),
  updatedAt: z.iso.date().optional(),
  tags: z.array(z.string()).min(1),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  role: z.string().min(1),
  client: z.string().optional(),
  organization: z.string().optional(),
  duration: z.string().optional(),
  teamSize: z.string().optional(),
  stack: z.array(z.string()).min(1),
  outcome: z.string().optional(),
  ogImage: z.string().optional(),
  metrics: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
  related: z.array(z.string()).optional(),
})

export type CaseStudyFrontmatter = z.infer<typeof caseStudyFrontmatterSchema>

export const articleFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.iso.date(),
  updatedAt: z.iso.date().optional(),
  tags: z.array(z.string()).min(1),
  category: z.enum([
    'engineering-philosophy',
    'architecture',
    'ai',
    'lessons-learned',
    'performance',
    'security',
  ]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  ogImage: z.string().optional(),
  related: z.array(z.string()).optional(),
})

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>

export const pageFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  ogImage: z.string().optional(),
})

export type PageFrontmatter = z.infer<typeof pageFrontmatterSchema>

export type TocEntry = {
  depth: 2 | 3
  text: string
  id: string
}

export type ContentEntry<T> = {
  slug: string
  frontmatter: T
  readingTime: number
  toc: TocEntry[]
  content: ComponentType
}
