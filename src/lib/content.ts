import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import type { z } from 'zod'

import type {
  ArticleFrontmatter,
  CaseStudyFrontmatter,
  ContentEntry,
  PageFrontmatter,
  TocEntry,
} from '@/types/content'
import {
  articleFrontmatterSchema,
  caseStudyFrontmatterSchema,
  pageFrontmatterSchema,
} from '@/types/content'

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content')
const WORDS_PER_MINUTE = 225

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function calculateReadingTime(content: string): number {
  const trimmed = content.trim()
  if (trimmed.length === 0) return 1
  const words = trimmed.split(/\s+/).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

export function extractToc(content: string): TocEntry[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const entries: TocEntry[] = []

  let match: RegExpExecArray | null = headingRegex.exec(content)
  while (match !== null) {
    const hashes = match[1]
    const text = match[2]
    if (hashes !== undefined && text !== undefined) {
      entries.push({
        depth: hashes.length as 2 | 3,
        text,
        id: slugify(text),
      })
    }
    match = headingRegex.exec(content)
  }

  return entries
}

function loadContentEntries<S extends z.ZodType>(
  directory: string,
  schema: S,
): ContentEntry<z.output<S>>[] {
  const contentPath = path.join(CONTENT_DIR, directory)

  if (!fs.existsSync(contentPath)) return []

  const files = fs.readdirSync(contentPath).filter((f) => f.endsWith('.mdx'))

  return files
    .map((filename) => {
      const filePath = path.join(contentPath, filename)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(raw)
      const slug = filename.replace(/\.mdx$/, '')

      const parsed = schema.safeParse(data)
      if (!parsed.success) {
        throw new Error(
          `Invalid frontmatter in ${directory}/${filename}: ${parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ')}`,
        )
      }

      return {
        slug,
        frontmatter: parsed.data,
        readingTime: calculateReadingTime(content),
        toc: extractToc(content),
        content: null as unknown as React.ComponentType,
      }
    })
    .filter((entry) => {
      const fm = entry.frontmatter as Record<string, unknown>
      if (process.env['NODE_ENV'] === 'production' && fm['draft'] === true) {
        return false
      }
      return true
    })
}

function sortEntriesByFeaturedAndDate<T extends { featured?: boolean; date: string }>(
  entries: ContentEntry<T>[],
): ContentEntry<T>[] {
  return [...entries].sort((a, b) => {
    if (a.frontmatter.featured && !b.frontmatter.featured) return -1
    if (!a.frontmatter.featured && b.frontmatter.featured) return 1
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  })
}

export function getAllCaseStudies(): ContentEntry<CaseStudyFrontmatter>[] {
  return sortEntriesByFeaturedAndDate(
    loadContentEntries('case-studies', caseStudyFrontmatterSchema),
  )
}

export function getCaseStudy(slug: string): ContentEntry<CaseStudyFrontmatter> | undefined {
  return getAllCaseStudies().find((entry) => entry.slug === slug)
}

export function getAllArticles(): ContentEntry<ArticleFrontmatter>[] {
  return sortEntriesByFeaturedAndDate(loadContentEntries('writing', articleFrontmatterSchema))
}

export function getArticle(slug: string): ContentEntry<ArticleFrontmatter> | undefined {
  return getAllArticles().find((entry) => entry.slug === slug)
}

export function getPage(slug: string): ContentEntry<PageFrontmatter> | undefined {
  const entries = loadContentEntries('pages', pageFrontmatterSchema)
  return entries.find((entry) => entry.slug === slug)
}
