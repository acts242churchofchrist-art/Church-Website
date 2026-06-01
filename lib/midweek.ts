import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Sermon, SermonFrontmatter } from '@/types/content'

const MIDWEEK_DIR = path.join(process.cwd(), 'content', 'midweek')

function parseMidweekFile(filename: string): SermonFrontmatter {
  const slug = filename.replace(/\.mdx$/, '')
  const raw = fs.readFileSync(path.join(MIDWEEK_DIR, filename), 'utf-8')
  const { data } = matter(raw)

  return {
    slug,
    title: data.title as string,
    preacher: (data.preacher as string) || 'Bro. Marc',
    date: data.date as string,
    passage: data.passage as string,
    summary: data.summary as string,
    youtubeUrl: (data.youtubeUrl as string) || undefined,
    facebookUrl: (data.facebookUrl as string) || undefined,
    driveUrl: (data.driveUrl as string) || undefined,
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

export function getAllMidweek(): SermonFrontmatter[] {
  if (!fs.existsSync(MIDWEEK_DIR)) return []

  const files = fs
    .readdirSync(MIDWEEK_DIR)
    .filter((f) => f.endsWith('.mdx'))

  return files
    .map(parseMidweekFile)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getMidweekBySlug(slug: string): Sermon | null {
  const filepath = path.join(MIDWEEK_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title as string,
    preacher: (data.preacher as string) || 'Bro. Marc',
    date: data.date as string,
    passage: data.passage as string,
    summary: data.summary as string,
    youtubeUrl: (data.youtubeUrl as string) || undefined,
    facebookUrl: (data.facebookUrl as string) || undefined,
    driveUrl: (data.driveUrl as string) || undefined,
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

export function getAdjacentMidweek(slug: string): {
  previous: SermonFrontmatter | null
  next: SermonFrontmatter | null
} {
  const all = getAllMidweek()
  const index = all.findIndex((s) => s.slug === slug)
  return {
    // older devotional (higher index = further in the past)
    previous: index < all.length - 1 ? all[index + 1] : null,
    // newer devotional (lower index = more recent)
    next: index > 0 ? all[index - 1] : null,
  }
}
