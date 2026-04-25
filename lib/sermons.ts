import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Sermon, SermonFrontmatter } from '@/types/content'

const SERMONS_DIR = path.join(process.cwd(), 'content', 'sermons')

function parseSermonFile(filename: string): SermonFrontmatter {
  const slug = filename.replace(/\.mdx$/, '')
  const raw = fs.readFileSync(path.join(SERMONS_DIR, filename), 'utf-8')
  const { data } = matter(raw)

  return {
    slug,
    title: data.title as string,
    preacher: data.preacher as string,
    date: data.date as string,
    passage: data.passage as string,
    summary: data.summary as string,
    youtubeUrl: (data.youtubeUrl as string) || undefined,
    facebookUrl: (data.facebookUrl as string) || undefined,
    pptxUrl: (data.pptxUrl as string) || undefined,
    posterImage: (data.posterImage as string) || undefined,
    brochureImages: data.brochureImages
      ? {
          front: (data.brochureImages.front as string) || undefined,
          inside: (data.brochureImages.inside as string) || undefined,
        }
      : undefined,
  }
}

export function getAllSermons(): SermonFrontmatter[] {
  if (!fs.existsSync(SERMONS_DIR)) return []

  const files = fs
    .readdirSync(SERMONS_DIR)
    .filter((f) => f.endsWith('.mdx'))

  return files
    .map(parseSermonFile)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getSermonBySlug(slug: string): Sermon | null {
  const filepath = path.join(SERMONS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title as string,
    preacher: data.preacher as string,
    date: data.date as string,
    passage: data.passage as string,
    summary: data.summary as string,
    youtubeUrl: (data.youtubeUrl as string) || undefined,
    facebookUrl: (data.facebookUrl as string) || undefined,
    pptxUrl: (data.pptxUrl as string) || undefined,
    posterImage: (data.posterImage as string) || undefined,
    brochureImages: data.brochureImages
      ? {
          front: (data.brochureImages.front as string) || undefined,
          inside: (data.brochureImages.inside as string) || undefined,
        }
      : undefined,
    content,
  }
}

export function getAdjacentSermons(slug: string): {
  previous: SermonFrontmatter | null
  next: SermonFrontmatter | null
} {
  const all = getAllSermons()
  const index = all.findIndex((s) => s.slug === slug)
  return {
    // older sermon (higher index = further in the past)
    previous: index < all.length - 1 ? all[index + 1] : null,
    // newer sermon (lower index = more recent)
    next: index > 0 ? all[index - 1] : null,
  }
}

export function getRecentSermons(limit: number): SermonFrontmatter[] {
  return getAllSermons().slice(0, limit)
}

export function getCurrentWeekSermon(): SermonFrontmatter | null {
  const all = getAllSermons()
  if (all.length === 0) return null

  const mostRecent = all[0] // already sorted newest first
  const sermonDate = new Date(mostRecent.date + 'T00:00:00')
  const today = new Date()
  const daysDiff = Math.floor(
    (today.getTime() - sermonDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  return daysDiff <= 7 ? mostRecent : null
}

// Legacy aliases so existing sitemap.ts keeps working
export const getAllSermonsMeta = getAllSermons
export const getAllSermonSlugs = () =>
  getAllSermons().map((s) => s.slug)
