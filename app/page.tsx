import Link from 'next/link'
import Image from 'next/image'
import { Section } from '@/components/layout/section'
import { ButtonLink } from '@/components/ui/button-link'
import { LessonCard } from '@/components/cards/lesson-card'
import { lessons } from '@/data/lessons'
import { materials } from '@/data/materials'
import { MaterialCard } from '@/components/cards/material-card'
import { siteConfig } from '@/data/site'
import { SocialLinks } from '@/components/sections/social-links'
import { ThisSundayBanner } from '@/components/sections/this-sunday-banner'
import { StatsRow } from '@/components/sections/stats-row'
import { UpcomingEvents } from '@/components/sections/upcoming-events'
import { testimonies } from '@/data/testimonies'
import { galleryAlbums } from '@/data/gallery'

const latestAlbum = [...galleryAlbums].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
)[0]
const featuredGalleryPhotos = latestAlbum?.photos.filter((p) => p.featured).slice(0, 3) ?? []

export default function HomePage() {
  const featuredMaterials = materials.filter((item) => item.featured)

  return (
    <>
      {/* This Sunday banner — only shows if a sermon was preached in the last 7 days */}
      <ThisSundayBanner />

      {/* Hero — full-bleed gradient with animated headline */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-navy text-white">
        {/* decorative glow */}
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_50%)]" />

        <div className="relative mx-auto max-w-content px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">
              Welcome to Acts 242 Church of Christ
            </p>
            <h1 className="mt-4 animate-fade-up-delay-1 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Know Christ.
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-white bg-clip-text text-transparent">
                Grow as His disciple.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl animate-fade-up-delay-2 text-lg leading-8 text-white/85 sm:text-xl">
              A church devoted to God&apos;s Word, prayer, fellowship, and the making of disciples — in Parañaque, Metro Manila.
            </p>
            <div className="mt-10 flex animate-fade-up-delay-3 flex-wrap gap-4">
              <Link
                href="/welcome"
                className="inline-flex items-center justify-center rounded-full bg-amber-300 px-7 py-3 text-sm font-semibold text-navy shadow-glow transition hover:bg-amber-200"
              >
                Start here
              </Link>
              <Link
                href="/grow"
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-7 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20"
              >
                Begin discipleship
              </Link>
              <Link
                href="/sermons#live"
                className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white/90 transition hover:text-white"
              >
                Watch live →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-border bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
          <StatsRow />
        </div>
      </section>

      {/* Scripture — dramatic, full-width navy */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(252,211,77,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-content px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">
            {siteConfig.verseReference}
          </p>
          <p className="mx-auto mt-6 max-w-4xl text-2xl font-medium leading-relaxed sm:text-3xl sm:leading-snug">
            &ldquo;{siteConfig.verseText}&rdquo;
          </p>
          <p className="mt-8 text-sm uppercase tracking-[0.18em] text-white/60">
            The pattern we keep
          </p>
        </div>
      </section>

      {/* Two paths welcome */}
      <Section className="dark:bg-slate-950">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">A warm welcome</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl dark:text-slate-100">
            Wherever you are, there is a next step
          </h2>
          <p className="mt-4 text-base leading-8 text-text-soft dark:text-slate-400">
            Acts 242 exists to help people know the Lord, be grounded in Scripture, and continue in faithful discipleship.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-white p-8 transition hover:-translate-y-1 hover:border-navy/30 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-amber-300/40">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-100 transition group-hover:scale-110 dark:bg-amber-300/10" />
            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl dark:bg-amber-300/20">
                ✦
              </div>
              <h3 className="mt-6 text-2xl font-bold text-foreground dark:text-slate-100">New to faith?</h3>
              <p className="mt-3 text-base leading-7 text-text-soft dark:text-slate-400">
                Start with the foundation lessons — written for anyone exploring the Christian life from the very beginning.
              </p>
              <ButtonLink href="/welcome" variant="ghost" className="mt-6 px-0">
                I&apos;m new — start here →
              </ButtonLink>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-border bg-white p-8 transition hover:-translate-y-1 hover:border-navy/30 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-amber-300/40">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-navy/10 transition group-hover:scale-110 dark:bg-amber-300/5" />
            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/10 text-2xl dark:bg-amber-300/15 dark:text-amber-300">
                ✛
              </div>
              <h3 className="mt-6 text-2xl font-bold text-foreground dark:text-slate-100">Already following Christ?</h3>
              <p className="mt-3 text-base leading-7 text-text-soft dark:text-slate-400">
                Connect with us, explore the materials, or reach out to a pastor to keep growing in the faith.
              </p>
              <ButtonLink href="/connect" variant="ghost" className="mt-6 px-0">
                Connect with us →
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Discipleship lessons — light bg */}
      <Section className="bg-muted dark:bg-slate-900">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Discipleship</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl dark:text-slate-100">
              Seven foundation lessons
            </h2>
            <p className="mt-3 text-base leading-7 text-text-soft dark:text-slate-400">
              A clear path through the essentials of the Christian life — for new believers and for any disciple wanting to revisit the basics.
            </p>
          </div>
          <ButtonLink href="/grow" variant="ghost">
            View all lessons →
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.slug} lesson={lesson} />
          ))}
        </div>
      </Section>

      {/* Live preaching — dark accent */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-soft to-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-glow">
              <iframe
                className="aspect-video w-full"
                src={siteConfig.liveEmbedUrl}
                title="Acts 242 Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">Live preaching</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Watch live and revisit recent messages
              </h2>
              <p className="mt-4 text-base leading-8 text-white/80">
                Join the preaching online and stay connected through recent messages. Slides, posters, and brochures are available alongside every sermon.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/sermons#live"
                  className="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-navy shadow-glow transition hover:bg-amber-200"
                >
                  Go to live page
                </Link>
                <Link
                  href="/sermons"
                  className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20"
                >
                  Sermon archive
                </Link>
                <Link
                  href={siteConfig.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white/90 transition hover:text-white"
                >
                  YouTube →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <UpcomingEvents />

      {/* Testimony highlight */}
      {testimonies.length > 0 && (() => {
        const latest = testimonies[0]
        const ini = latest.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()
        return (
          <Section className="dark:bg-slate-950">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Testimonies</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl dark:text-slate-100">
                  What God has done in us
                </h2>
                <p className="mt-3 text-base leading-7 text-text-soft dark:text-slate-400">
                  Stories of grace from the members of Acts 242 — honest accounts of lives being changed by the Word and the Spirit.
                </p>
              </div>
              <ButtonLink href="/community" variant="ghost">
                All testimonies →
              </ButtonLink>
            </div>

            <div className="mt-10">
              <Link
                href={`/testimonies/${latest.id}`}
                className="group flex flex-col gap-6 overflow-hidden rounded-3xl border border-border bg-white p-8 transition hover:-translate-y-1 hover:border-navy/20 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-amber-300/30 sm:flex-row sm:items-start md:p-10"
              >
                {/* Avatar */}
                {latest.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={latest.photo}
                    alt={latest.name}
                    className="h-20 w-20 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-navy/10 text-xl font-bold text-navy dark:bg-amber-300/15 dark:text-amber-300">
                    {ini}
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">{latest.name}</p>
                  <blockquote className="mt-3 text-xl font-medium italic leading-8 text-foreground dark:text-slate-100 sm:text-2xl sm:leading-9">
                    &ldquo;{latest.pullQuote}&rdquo;
                  </blockquote>
                  <p className="mt-4 text-base leading-7 text-text-soft dark:text-slate-400">{latest.summary}</p>
                  <p className="mt-6 text-sm font-semibold text-navy transition group-hover:underline dark:text-amber-300">
                    Read full testimony →
                  </p>
                </div>
              </Link>
            </div>
          </Section>
        )
      })()}

      {/* Gallery teaser */}
      {latestAlbum && featuredGalleryPhotos.length > 0 && (
        <Section className="bg-muted dark:bg-slate-900">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Gallery</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl dark:text-slate-100">
                Life at Acts 242
              </h2>
            </div>
            <Link href="/community#gallery" className="text-sm font-semibold text-navy hover:underline dark:text-amber-300">
              View all →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
            {featuredGalleryPhotos.map((photo) => (
              <Link key={photo.filename} href={`/gallery/${latestAlbum.id}`}>
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-border shadow-calm dark:border-slate-700">
                  <Image
                    src={`${latestAlbum.folder}/${photo.filename}`}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/community#gallery"
              className="inline-flex items-center gap-2 rounded-2xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-white dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              See more from the gallery
            </Link>
          </div>
        </Section>
      )}

      {/* Materials */}
      <Section className="bg-muted dark:bg-slate-900">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Materials</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl dark:text-slate-100">
              Resources for discipleship and evangelism
            </h2>
            <p className="mt-3 text-base leading-7 text-text-soft dark:text-slate-400">
              Foundation guide, sermon slides, brochures, and printable evangelism materials — all freely available.
            </p>
          </div>
          <ButtonLink href="/grow#materials" variant="ghost">
            Browse all materials →
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredMaterials.map((item) => (
            <MaterialCard key={item.id} item={item} />
          ))}
        </div>
      </Section>

      {/* Connect / visit */}
      <Section className="dark:bg-slate-950">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Connect</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl dark:text-slate-100">
            Take your next step
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-lg dark:bg-amber-300/20">
              ✉
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground dark:text-slate-100">Email the church</h3>
            <p className="mt-3 text-sm leading-7 text-text-soft dark:text-slate-400">Reach out with a question, prayer request, or your desire to know more.</p>
            <a href={`mailto:${siteConfig.email}`} className="mt-4 inline-flex text-sm font-semibold text-navy hover:underline dark:text-amber-300">
              {siteConfig.email}
            </a>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy/10 text-lg dark:bg-amber-300/15 dark:text-amber-300">
              ✛
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground dark:text-slate-100">Talk to a pastor</h3>
            <p className="mt-3 text-sm leading-7 text-text-soft dark:text-slate-400">Want guidance, prayer, or pastoral help? We would be glad to connect with you.</p>
            <ButtonLink href="/connect" variant="ghost" className="mt-4 px-0 py-0">
              Go to connect page →
            </ButtonLink>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-lg dark:bg-amber-300/20">
              ✦
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground dark:text-slate-100">I am ready to know more</h3>
            <p className="mt-3 text-sm leading-7 text-text-soft dark:text-slate-400">Ready to begin discipleship or take your next step? Start here.</p>
            <ButtonLink href="/welcome" variant="ghost" className="mt-4 px-0 py-0">
              Start here →
            </ButtonLink>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-white px-6 py-5 dark:border-slate-700 dark:bg-slate-800">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Join us in person</p>
            <div className="mt-2 flex flex-wrap gap-6">
              {siteConfig.serviceHours.map((s) => (
                <span key={s.day} className="text-sm text-foreground dark:text-slate-200">
                  <span className="font-semibold">{s.day}</span>{' '}
                  <span className="text-text-soft dark:text-slate-400">{s.time}</span>
                </span>
              ))}
            </div>
            <p className="mt-1 text-xs text-text-soft dark:text-slate-400">{siteConfig.address}</p>
          </div>
          <Link
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-navy hover:underline dark:text-amber-300"
          >
            Get directions →
          </Link>
        </div>

        <div className="mt-8">
          <SocialLinks />
        </div>
      </Section>
    </>
  )
}
