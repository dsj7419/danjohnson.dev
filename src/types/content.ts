import { z } from 'zod'

export const caseStudyFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  date: z.string().date(),
  tags: z.array(z.string()).min(1),
  featured: z.boolean().default(false),
  role: z.string().min(1),
  client: z.string().optional(),
  stack: z.array(z.string()).min(1),
  outcome: z.string().optional(),
  draft: z.boolean().default(false),
})

export type CaseStudyFrontmatter = z.infer<typeof caseStudyFrontmatterSchema>

export const articleFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  date: z.string().date(),
  tags: z.array(z.string()).min(1),
  category: z.enum([
    'engineering-philosophy',
    'architecture',
    'ai',
    'lessons-learned',
    'performance',
    'security',
  ]),
  draft: z.boolean().default(false),
})

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>

export type ContentItem<T> = {
  frontmatter: T
  content: React.ComponentType
}
