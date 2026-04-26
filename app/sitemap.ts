import type { MetadataRoute } from 'next'
import { getAllSermonsMeta } from '@/lib/sermons'
import { lessons } from '@/data/lessons'

const BASE_URL = 'https://www.acts242churchofchrist.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/live`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/sermons`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/discipleship`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/discipleship/water-baptism`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/materials`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/connect`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/welcome`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/prayer-request`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const lessonRoutes: MetadataRoute.Sitemap = lessons.map((lesson) => ({
    url: `${BASE_URL}/discipleship/${lesson.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const sermons = getAllSermonsMeta()
  const sermonRoutes: MetadataRoute.Sitemap = sermons.map((sermon) => ({
    url: `${BASE_URL}/sermons/${sermon.slug}`,
    lastModified: new Date(sermon.date),
    changeFrequency: 'never',
    priority: 0.7,
  }))

  return [...staticRoutes, ...lessonRoutes, ...sermonRoutes]
}
