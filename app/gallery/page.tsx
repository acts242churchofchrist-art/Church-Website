import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Section } from '@/components/layout/section'
import { galleryAlbums } from '@/data/gallery'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Moments from Acts 242 Church of Christ — fellowship, outreach, worship, and the everyday life of a church family growing together.',
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-PH', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const sorted = [...galleryAlbums].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
)

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-navy text-white">
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-content px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">
              Gallery
            </p>
            <h1 className="mt-4 animate-fade-up-delay-1 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Life at<br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-white bg-clip-text text-transparent">
                Acts 242.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl animate-fade-up-delay-2 text-lg leading-8 text-white/85 sm:text-xl">
              Moments from our ministry — fellowship, outreach, worship, and the everyday life of a church family growing together.
            </p>
          </div>
        </div>
      </section>

      {/* Albums */}
      <Section>
        {sorted.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-base text-text-soft dark:text-slate-400">No albums yet. Check back soon.</p>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Albums</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">
              Ministry moments
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {sorted.map((album) => {
                const cover = album.photos.find((p) => p.featured) ?? album.photos[0]
                return (
                  <Link
                    key={album.id}
                    href={`/gallery/${album.id}`}
                    className="group relative overflow-hidden rounded-3xl border border-border bg-slate-900 shadow-calm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Cover image */}
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={`${album.folder}/${cover.filename}`}
                        alt={cover.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                    </div>

                    {/* Overlay text */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-300">
                        {album.ministry}
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-white">{album.title}</h3>
                      <p className="mt-1 text-sm text-white/60">{formatDate(album.date)}</p>
                      <p className="mt-3 text-sm leading-6 text-white/75">{album.description}</p>
                      <p className="mt-4 text-sm font-semibold text-amber-300 transition group-hover:underline">
                        View album ({album.photos.length} photos) →
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </Section>
    </>
  )
}
