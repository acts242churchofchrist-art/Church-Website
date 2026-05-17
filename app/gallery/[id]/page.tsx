import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Section } from '@/components/layout/section'
import { galleryAlbums } from '@/data/gallery'

type Props = { params: Promise<{ id: string }> }

export async function generateStaticParams() {
  return galleryAlbums.map((a) => ({ id: a.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const album = galleryAlbums.find((a) => a.id === id)
  if (!album) return {}
  return {
    title: `${album.title} | Acts 242 Gallery`,
    description: album.description,
  }
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-PH', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function GalleryAlbumPage({ params }: Props) {
  const { id } = await params
  const album = galleryAlbums.find((a) => a.id === id)
  if (!album) notFound()

  const cover = album.photos.find((p) => p.featured) ?? album.photos[0]
  const featured = album.photos.filter((p) => p.featured)
  const rest = album.photos.filter((p) => !p.featured)

  return (
    <>
      {/* Hero — cover photo with dark overlay */}
      <section className="relative overflow-hidden">
        <div className="relative h-[50vh] min-h-[320px] w-full sm:h-[60vh]">
          <Image
            src={`${album.folder}/${cover.filename}`}
            alt={cover.alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/20" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-content px-4 pb-12 sm:px-6 lg:px-8">
            <Link
              href="/gallery"
              className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
            >
              ← Back to Gallery
            </Link>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              {album.ministry}
            </p>
            <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">{album.title}</h1>
            <p className="mt-2 text-white/60">{formatDate(album.date)}</p>
            <p className="mt-3 max-w-2xl text-base text-white/80">{album.description}</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
            About This Activity
          </p>
          <p className="mt-4 text-base leading-8 text-text-soft dark:text-slate-300">
            {album.story}
          </p>
        </div>
      </Section>

      {/* Photo grid */}
      <Section className="bg-muted dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
          {album.photos.length} photos
        </p>

        {/* Featured — larger */}
        {featured.length > 0 && (
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((photo, i) => (
              <a
                key={photo.filename}
                href={`${album.folder}/${photo.filename}`}
                target="_blank"
                rel="noopener noreferrer"
                className={i === 0 ? 'md:col-span-2' : ''}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-calm dark:border-slate-700">
                  <Image
                    src={`${album.folder}/${photo.filename}`}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw"
                  />
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Rest — uniform grid */}
        {rest.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            {rest.map((photo) => (
              <a
                key={photo.filename}
                href={`${album.folder}/${photo.filename}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-border shadow-calm dark:border-slate-700">
                  <Image
                    src={`${album.folder}/${photo.filename}`}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </a>
            ))}
          </div>
        )}
      </Section>

      {/* Related links */}
      {album.relatedEventId && (
        <Section>
          <div className="mx-auto max-w-2xl rounded-3xl border border-border border-l-4 border-l-navy bg-white p-8 dark:border-slate-700 dark:bg-slate-800 dark:border-l-amber-300">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
              Connected To
            </p>
            <p className="mt-3 text-base leading-7 text-text-soft dark:text-slate-300">
              These bookmarks will be given out during the{' '}
              <Link href="/#events" className="font-semibold text-navy hover:underline dark:text-amber-300">
                Ice Cream Evangelism
              </Link>{' '}
              outreach on May 15, 2026.
            </p>
          </div>
        </Section>
      )}

      {/* Nav footer */}
      <Section className="bg-muted dark:bg-slate-900">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">More albums</p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground dark:text-slate-100">
            See more from the church
          </h2>
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded-full bg-navy px-7 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft dark:bg-amber-300 dark:text-navy dark:hover:bg-amber-200"
          >
            ← Back to Gallery
          </Link>
        </div>
      </Section>
    </>
  )
}
