import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Sermon, SermonFrontmatter } from '@/types/content'

/**
 * Shared loader for the MDX content collections (sermons, midweek devotionals).
 *
 * Results are cached for the lifetime of the process. Every page that needs the
 * full list previously re-read and re-parsed every file on disk: a sermon detail
 * page alone did it three times, which made a build O(N²) in the number of sermons.
 * The build is a short-lived process over read-only content, so caching is safe and
 * turns that back into one read per file.
 */

type CollectionOptions = {
  /** Absolute path to the directory holding the .mdx files. */
  dir: string
  /** Used when a file omits `preacher`. */
  defaultPreacher?: string
}

/**
 * YAML parses an unquoted `date: 2026-09-13` into a Date, not a string — and the
 * old `data.date as string` cast hid that. The value then flowed into
 * `new Date(date + 'T00:00:00')`, which yields Invalid Date and silently removed
 * the sermon from the banner and the materials card. Both forms normalise here so
 * one missing pair of quotes in a weekly drop cannot break the page.
 */
function normalizeDate(value: unknown, file: string): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10)
  }
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value.trim())) {
    return value.trim()
  }
  throw new Error(
    `[content] ${file}: "date" must be YYYY-MM-DD (received ${JSON.stringify(value)}). ` +
      `Quote it in the frontmatter, e.g. date: '2026-09-13'.`,
  )
}

function requireString(value: unknown, field: string, file: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`[content] ${file}: "${field}" is required and must be a non-empty string.`)
  }
  return value
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() !== '' ? value : undefined
}

function toFrontmatter(
  slug: string,
  data: Record<string, unknown>,
  opts: CollectionOptions,
): SermonFrontmatter {
  const file = `${slug}.mdx`
  const brochure = data.brochureImages as { front?: unknown; inside?: unknown } | undefined

  return {
    slug,
    title: requireString(data.title, 'title', file),
    preacher: optionalString(data.preacher) ?? opts.defaultPreacher ?? '',
    date: normalizeDate(data.date, file),
    passage: optionalString(data.passage) ?? '',
    summary: optionalString(data.summary) ?? '',
    youtubeUrl: optionalString(data.youtubeUrl),
    facebookUrl: optionalString(data.facebookUrl),
    driveUrl: optionalString(data.driveUrl),
    pptxUrl: optionalString(data.pptxUrl),
    posterImage: optionalString(data.posterImage),
    brochureImages: brochure
      ? { front: optionalString(brochure.front), inside: optionalString(brochure.inside) }
      : undefined,
  }
}

export type MdxCollection = {
  getAll: () => SermonFrontmatter[]
  getBySlug: (slug: string) => Sermon | null
  getAdjacent: (slug: string) => {
    previous: SermonFrontmatter | null
    next: SermonFrontmatter | null
  }
}

export function createMdxCollection(opts: CollectionOptions): MdxCollection {
  let listCache: SermonFrontmatter[] | null = null
  const bodyCache = new Map<string, Sermon | null>()

  function getAll(): SermonFrontmatter[] {
    if (listCache) return listCache
    if (!fs.existsSync(opts.dir)) {
      listCache = []
      return listCache
    }
    listCache = fs
      .readdirSync(opts.dir)
      .filter((f) => f.endsWith('.mdx'))
      .map((filename) => {
        const slug = filename.replace(/\.mdx$/, '')
        const { data } = matter(fs.readFileSync(path.join(opts.dir, filename), 'utf-8'))
        return toFrontmatter(slug, data as Record<string, unknown>, opts)
      })
      .sort((a, b) => b.date.localeCompare(a.date))
    return listCache
  }

  function getBySlug(slug: string): Sermon | null {
    const cached = bodyCache.get(slug)
    if (cached !== undefined) return cached

    const filepath = path.join(opts.dir, `${slug}.mdx`)
    if (!fs.existsSync(filepath)) {
      bodyCache.set(slug, null)
      return null
    }
    const { data, content } = matter(fs.readFileSync(filepath, 'utf-8'))
    const result: Sermon = {
      ...toFrontmatter(slug, data as Record<string, unknown>, opts),
      content,
    }
    bodyCache.set(slug, result)
    return result
  }

  function getAdjacent(slug: string) {
    const all = getAll()
    const index = all.findIndex((s) => s.slug === slug)
    // An unknown slug has no neighbours. Without this guard index === -1 made the
    // newest entry render as the "previous" link.
    if (index === -1) return { previous: null, next: null }
    return {
      // older entry (higher index = further in the past)
      previous: index < all.length - 1 ? all[index + 1] : null,
      // newer entry (lower index = more recent)
      next: index > 0 ? all[index - 1] : null,
    }
  }

  return { getAll, getBySlug, getAdjacent }
}
