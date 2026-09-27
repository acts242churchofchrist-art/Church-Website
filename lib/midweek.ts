import path from 'path'
import type { Sermon, SermonFrontmatter } from '@/types/content'
import { createMdxCollection } from './mdx-collection'

const midweek = createMdxCollection({
  dir: path.join(process.cwd(), 'content', 'midweek'),
  defaultPreacher: 'Bro. Marc',
})

export function getAllMidweek(): SermonFrontmatter[] {
  return midweek.getAll()
}

export function getMidweekBySlug(slug: string): Sermon | null {
  return midweek.getBySlug(slug)
}

export function getAdjacentMidweek(slug: string) {
  return midweek.getAdjacent(slug)
}
