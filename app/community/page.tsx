import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Section } from '@/components/layout/section'
import { ButtonLink } from '@/components/ui/button-link'
import { testimonies } from '@/data/testimonies'
import { galleryAlbums } from '@/data/gallery'

export const metadata: Metadata = {
  title: 'Community',
  description:
    'Stories of God\'s faithfulness and moments from the life of Acts 242 Church of Christ — testimonies and ministry photos from a church family growing together.',
}

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-PH', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const sortedAlbums = [...galleryAlbums].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
)

export default function CommunityPage() {
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
              Acts 242 Church of Christ
            </p>
            <h1 className="mt-4 animate-fade-up-delay-1 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Life together.<br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-white bg-clip-text text-transparent">
                Stories and moments.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl animate-fade-up-delay-2 text-lg leading-8 text-white/85 sm:text-xl">
              The testimonies of lives being changed and the everyday moments of a church family — fellowship, outreach, and worship, all growing together.
            </p>
            <div className="mt-10 flex animate-fade-up-delay-3 flex-wrap gap-4">
              <a href="#testimonies" className="inline-flex items-center justify-center rounded-full bg-amber-300 px-7 py-3 text-sm font-semibold text-navy shadow-glow transition hover:bg-amber-200">
                Read testimonies
              </a>
              <a href="#gallery" className="inline-flex items-center justify-center rounded-full bg-white/10 px-7 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20">
                View the gallery
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonies ── */}
      <Section id="testimonies">
        {testimonies.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-base text-text-soft dark:text-slate-400">No testimonies yet. Check back soon.</p>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Stories of grace</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">
              Testimonies from the members of Acts 242
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {testimonies.map((t) => (
                <Link
                  key={t.id}
                  href={`/testimonies/${t.id}`}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white transition hover:-translate-y-1 hover:border-navy/20 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-amber-300/30"
                >
                  {/* Avatar + name */}
                  <div className="flex items-center gap-4 border-b border-border p-6 dark:border-slate-700">
                    {t.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy/10 text-lg font-bold text-navy dark:bg-amber-300/15 dark:text-amber-300">
                        {initials(t.name)}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-foreground dark:text-slate-100">{t.name}</p>
                      <p className="text-xs text-text-soft dark:text-slate-400">{formatDate(t.date)}</p>
                    </div>
                  </div>

                  {/* Pull quote */}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-base italic leading-7 text-text-soft dark:text-slate-300">
                      &ldquo;{t.pullQuote}&rdquo;
                    </p>
                    <p className="mt-4 text-sm leading-7 text-text-soft dark:text-slate-400">{t.summary}</p>
                    <p className="mt-6 text-sm font-semibold text-navy transition group-hover:underline dark:text-amber-300">
                      Read full testimony →
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 rounded-3xl border border-border bg-muted p-8 text-center dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Your story</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground dark:text-slate-100">
                Has God been faithful to you?
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-text-soft dark:text-slate-400">
                Every testimony is a declaration that God keeps His promises. If you have a story to share, we would be honored to hear it.
              </p>
              <div className="mt-6">
                <ButtonLink href="/connect">Share your story</ButtonLink>
              </div>
            </div>
          </>
        )}
      </Section>

      {/* ── Gallery ── */}
      <Section id="gallery" className="bg-muted dark:bg-slate-900">
        {sortedAlbums.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-base text-text-soft dark:text-slate-400">No albums yet. Check back soon.</p>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Gallery</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">
              Ministry moments
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {sortedAlbums.map((album) => {
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
