// @vitest-environment node
import { getAllArticles, getAllCaseStudies } from '@/lib/content'

const NOT_FOUND = new Error('NEXT_HTTP_ERROR_FALLBACK;404')

const mockNotFound = vi.fn(() => {
  throw NOT_FOUND
})

const imageResponseCalls: unknown[][] = []

vi.mock('next/navigation', () => ({ notFound: mockNotFound }))

vi.mock('next/og', () => ({
  ImageResponse: class MockImageResponse {
    constructor(...args: unknown[]) {
      imageResponseCalls.push(args)
    }
  },
}))

const routes = [
  {
    label: 'case study',
    load: () => import('@/app/work/[slug]/opengraph-image'),
    knownSlug: () => getAllCaseStudies()[0]?.slug,
  },
  {
    label: 'article',
    load: () => import('@/app/writing/[slug]/opengraph-image'),
    knownSlug: () => getAllArticles()[0]?.slug,
  },
] as const

describe.each(routes)('$label opengraph-image route', ({ load, knownSlug }) => {
  beforeEach(() => {
    imageResponseCalls.length = 0
  })

  it('refuses to render params that were not generated at build time', async () => {
    const route = await load()

    expect(route.dynamicParams).toBe(false)
  })

  it('returns 404 instead of a fallback image for an unknown slug', async () => {
    const route = await load()

    await expect(
      route.default({ params: Promise.resolve({ slug: 'not-a-real-slug' }) }),
    ).rejects.toBe(NOT_FOUND)
    expect(mockNotFound).toHaveBeenCalledTimes(1)
    expect(imageResponseCalls).toHaveLength(0)
  })

  it('renders an image for a slug that exists', async () => {
    const route = await load()
    const slug = knownSlug()
    if (!slug) throw new Error('corpus has no entries to test against')

    await route.default({ params: Promise.resolve({ slug }) })

    expect(mockNotFound).not.toHaveBeenCalled()
    expect(imageResponseCalls).toHaveLength(1)
  })

  it('generates a static param for every published entry', async () => {
    const route = await load()

    const params = await route.generateStaticParams()
    const slug = knownSlug()

    expect(params.length).toBeGreaterThan(0)
    expect(params).toContainEqual({ slug })
  })
})
