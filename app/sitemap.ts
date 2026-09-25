import type { MetadataRoute } from 'next'
import { getAllSermonsMeta } from '@/lib/sermons'
import { getAllMidweek } from '@/lib/midweek'
import { lessons } from '@/data/lessons'
import { teachingSeries } from '@/data/series'
import { testimonies } from '@/data/testimonies'
import { publishedAlbums } from '@/data/gallery'
import { SITE_URL } from '@/data/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/sermons`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/community`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/milestones`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/grow`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/discipleship/water-baptism`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/connect`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/welcome`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/prayer-request`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const lessonRoutes: MetadataRoute.Sitemap = lessons.map((lesson) => ({
    url: `${SITE_URL}/discipleship/${lesson.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const sermons = getAllSermonsMeta()
  const sermonRoutes: MetadataRoute.Sitemap = sermons.map((sermon) => ({
    url: `${SITE_URL}/sermons/${sermon.slug}`,
    lastModified: new Date(sermon.date),
    changeFrequency: 'never',
    priority: 0.7,
  }))

  const midweek = getAllMidweek()
  const midweekRoutes: MetadataRoute.Sitemap = midweek.map((message) => ({
    url: `${SITE_URL}/midweek/${message.slug}`,
    lastModified: new Date(message.date),
    changeFrequency: 'never',
    priority: 0.6,
  }))

  const seriesRoutes: MetadataRoute.Sitemap = teachingSeries.flatMap((series) => [
    {
      url: `${SITE_URL}/series/${series.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    ...series.sessions.map((session) => ({
      url: `${SITE_URL}/series/${series.slug}/${session.sessionSlug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ])

  const testimonyRoutes: MetadataRoute.Sitemap = testimonies.map((testimony) => ({
    url: `${SITE_URL}/testimonies/${testimony.id}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  const galleryRoutes: MetadataRoute.Sitemap = publishedAlbums.map((album) => ({
    url: `${SITE_URL}/gallery/${album.id}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.5,
  }))

  return [
    ...staticRoutes,
    ...lessonRoutes,
    ...seriesRoutes,
    ...sermonRoutes,
    ...midweekRoutes,
    ...testimonyRoutes,
    ...galleryRoutes,
  ]
}
