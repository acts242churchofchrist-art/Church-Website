import path from 'path'
import type { Sermon, SermonFrontmatter } from '@/types/content'
import { createMdxCollection } from './mdx-collection'

const sermons = createMdxCollection({
  dir: path.join(process.cwd(), 'content', 'sermons'),
})

export function getAllSermons(): SermonFrontmatter[] {
  return sermons.getAll()
}

export function getSermonBySlug(slug: string): Sermon | null {
  return sermons.getBySlug(slug)
}

export function getAdjacentSermons(slug: string) {
  return sermons.getAdjacent(slug)
}

export function getRecentSermons(limit: number): SermonFrontmatter[] {
  return sermons.getAll().slice(0, limit)
}

export function getCurrentWeekSermon(): SermonFrontmatter | null {
  const all = sermons.getAll()
  if (all.length === 0) return null

  const mostRecent = all[0] // already sorted newest first
  const sermonDate = new Date(mostRecent.date + 'T00:00:00')
  const today = new Date()
  const daysDiff = Math.floor(
    (today.getTime() - sermonDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  return daysDiff <= 7 ? mostRecent : null
}

/**
 * "This Sunday" only while the service is still ahead; "Latest message" once it has
 * passed. Evaluated when the site is built, which is also when a new sermon is added —
 * so the label is correct for the week it matters.
 */
export function sermonRecencyLabel(dateStr: string): 'This Sunday' | 'Latest message' {
  const sermonDate = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return sermonDate.getTime() >= today.getTime() ? 'This Sunday' : 'Latest message'
}

// Legacy aliases so existing sitemap.ts keeps working
export const getAllSermonsMeta = getAllSermons
export const getAllSermonSlugs = () => getAllSermons().map((s) => s.slug)
