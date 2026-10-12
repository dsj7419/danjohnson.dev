import fs from 'fs'
import path from 'path'

import { extractToc } from '@/lib/content'
import { parseFrontmatter } from '@/lib/frontmatter'

// Content-contract tests over the real MDX corpus (no mocks). They guard the properties the
// rendered site depends on: TOC ids that rehype-slug will also produce, unique per document,
// and heading text free of leftover markdown syntax that the slug normalizer did not recognize.

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content')
const COLLECTIONS = ['case-studies', 'writing'] as const

type CorpusFile = { collection: string; file: string; body: string }

function loadCorpus(): CorpusFile[] {
  return COLLECTIONS.flatMap((collection) => {
    const dir = path.join(CONTENT_ROOT, collection)
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.mdx'))
      .map((file) => ({
        collection,
        file,
        body: parseFrontmatter(fs.readFileSync(path.join(dir, file), 'utf8')).content,
      }))
  })
}

const corpus = loadCorpus()

describe('content corpus: table of contents', () => {
  it('has at least one case study and one article to check', () => {
    expect(corpus.some((c) => c.collection === 'case-studies')).toBe(true)
    expect(corpus.some((c) => c.collection === 'writing')).toBe(true)
  })

  it.each(corpus.map((c) => [`${c.collection}/${c.file}`, c] as const))(
    '%s produces unique, non-empty TOC ids',
    (_label, { body }) => {
      const toc = extractToc(body)
      expect(toc.length).toBeGreaterThan(0)
      const ids = toc.map((e) => e.id)
      expect(new Set(ids).size).toBe(ids.length)
      for (const id of ids) {
        // github-slugger keeps underscores (identifiers in headings) and hyphens.
        expect(id).toMatch(/^[a-z0-9][a-z0-9_-]*$/)
      }
    },
  )

  it.each(corpus.map((c) => [`${c.collection}/${c.file}`, c] as const))(
    '%s has heading text with no leftover markdown syntax',
    (_label, { body }) => {
      for (const entry of extractToc(body)) {
        // Backticks, link brackets, asterisks or raw tags in the text mean the normalizer missed a
        // construct, and the rendered heading id would no longer match the TOC href. Underscores
        // are allowed: identifiers such as COMBAT_SCALE are legitimate heading text.
        expect(entry.text).not.toMatch(/[`*<>[\]]|\]\(/)
      }
    },
  )
})
