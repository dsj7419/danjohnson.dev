import { parse as parseYaml } from 'yaml'

export type ParsedFrontmatter = {
  data: Record<string, unknown>
  content: string
}

/**
 * A front matter block opens on the very first line with `---` and closes at the next line
 * that is exactly `---`. The lazy group stops at the first closing fence, so a horizontal
 * rule later in the body is never mistaken for one.
 */
const FRONT_MATTER = /^---\r?\n([\s\S]*?)(?:\r?\n)?---(?:\r?\n|$)/

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Splits an MDX source into its YAML front matter and body. YAML is parsed with the 1.2 core
 * schema, so unquoted dates stay strings and the Zod schemas downstream see exactly what was
 * written. Replaces gray-matter (dependency plan step 5).
 */
export function parseFrontmatter(raw: string): ParsedFrontmatter {
  const match = FRONT_MATTER.exec(raw)
  if (!match) return { data: {}, content: raw }

  const block = match[1] ?? ''
  const parsed: unknown = block.trim() === '' ? {} : parseYaml(block)
  if (parsed === null || parsed === undefined) {
    return { data: {}, content: raw.slice(match[0].length) }
  }
  if (!isRecord(parsed)) {
    throw new Error('Front matter must be a YAML mapping')
  }

  return { data: parsed, content: raw.slice(match[0].length) }
}
