import { parseFrontmatter } from '@/lib/frontmatter'

describe('parseFrontmatter', () => {
  it('splits a YAML front matter block from the body', () => {
    const raw = `---\ntitle: "Test"\ntags:\n  - one\n  - two\n---\n\n## Heading\n\nBody text.\n`

    const { data, content } = parseFrontmatter(raw)

    expect(data).toEqual({ title: 'Test', tags: ['one', 'two'] })
    expect(content).toBe('\n## Heading\n\nBody text.\n')
  })

  it('returns empty data and the whole input when there is no front matter', () => {
    const raw = '## Heading\n\nNo front matter here.\n'

    expect(parseFrontmatter(raw)).toEqual({ data: {}, content: raw })
  })

  it('treats an empty front matter block as empty data', () => {
    const { data, content } = parseFrontmatter('---\n---\nBody\n')

    expect(data).toEqual({})
    expect(content).toBe('Body\n')
  })

  it('accepts CRLF line endings', () => {
    const { data, content } = parseFrontmatter('---\r\ntitle: "Win"\r\n---\r\nBody\r\n')

    expect(data).toEqual({ title: 'Win' })
    expect(content).toBe('Body\r\n')
  })

  it('keeps ISO dates as strings whether or not they are quoted', () => {
    const { data } = parseFrontmatter("---\ndate: '2026-01-15'\nupdatedAt: 2026-02-01\n---\n")

    expect(data).toEqual({ date: '2026-01-15', updatedAt: '2026-02-01' })
  })

  it('only recognises a block that opens on the very first line', () => {
    const raw = 'intro\n---\ntitle: "Not front matter"\n---\n'

    expect(parseFrontmatter(raw)).toEqual({ data: {}, content: raw })
  })

  it('rejects front matter that is not a YAML mapping', () => {
    expect(() => parseFrontmatter('---\n- just\n- a list\n---\nBody\n')).toThrow(
      /front matter must be a YAML mapping/i,
    )
  })

  it('does not treat a horizontal rule in the body as a closing fence', () => {
    const raw = '---\ntitle: "T"\n---\nFirst\n\n---\n\nSecond\n'

    const { data, content } = parseFrontmatter(raw)

    expect(data).toEqual({ title: 'T' })
    expect(content).toBe('First\n\n---\n\nSecond\n')
  })
})
