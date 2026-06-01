import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/layout/section'
import { ButtonLink } from '@/components/ui/button-link'
import { ThisSundayBanner } from '@/components/sections/this-sunday-banner'
import { CurrentWeekMaterialsCard } from '@/components/sections/current-week-materials'
import { getAllSermons } from '@/lib/sermons'
import { getAllMidweek } from '@/lib/midweek'
import { sermonArchive } from '@/data/sermon-archive'
import { siteConfig } from '@/data/site'
import type { SermonFrontmatter } from '@/types/content'

export const metadata = {
  title: 'Sermons',
  description: 'Watch live, browse Sunday sermons and midweek devotionals from Acts 242 Church of Christ — biblical teaching rooted in Scripture.',
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function MessageCard({ message, basePath }: { message: SermonFrontmatter; basePath: string }) {
  return (
    <Link
      href={`${basePath}/${message.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white transition hover:-translate-y-0.5 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-navy">
        {message.posterImage ? (
          <Image
            src={message.posterImage}
            alt={message.title}
            fill
            className="object-cover transition group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-navy to-navy-soft">
            <span className="text-4xl font-bold text-white/20">A242</span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
          {formatDate(message.date)}
        </p>
        <h2 className="mt-2 text-lg font-semibold leading-snug text-foreground line-clamp-2 dark:text-slate-100">
          {message.title}
        </h2>
        <p className="mt-1 text-sm text-text-soft dark:text-slate-400">
          {message.passage} — {message.preacher}
        </p>
        <p className="mt-3 flex-1 text-sm leading-7 text-text-soft line-clamp-2 dark:text-slate-400">
          {message.summary}
        </p>
        <span className="mt-5 text-sm font-semibold text-navy group-hover:underline dark:text-amber-300">
          Read message notes →
        </span>
      </div>
    </Link>
  )
}

export default function SermonsPage() {
  const sermons = getAllSermons()
  const midweek = getAllMidweek()

  return (
    <>
      <ThisSundayBanner />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-navy text-white">
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-content px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">2026 — All About Jesus</p>
            <h1 className="mt-4 animate-fade-up-delay-1 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Watch and grow<br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-white bg-clip-text text-transparent">in the Word.</span>
            </h1>
            <p className="mt-6 max-w-2xl animate-fade-up-delay-2 text-lg leading-8 text-white/85 sm:text-xl">
              We go live every Sunday at 10:00 AM and every Friday at 5:30 PM. Browse Sunday sermons and midweek devotionals — each message is available to read, watch, and download.
            </p>
            <div className="mt-10 flex animate-fade-up-delay-3 flex-wrap gap-4">
              <a href="#live" className="inline-flex items-center justify-center rounded-full bg-amber-300 px-7 py-3 text-sm font-semibold text-navy shadow-glow transition hover:bg-amber-200">
                Watch live
              </a>
              <a href={siteConfig.youtubeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-white/10 px-7 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20">
                Subscribe on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Live embed ── */}
      <Section id="live" className="bg-muted dark:bg-slate-900">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Live</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">Watch this Sunday</h2>
          </div>
          <ButtonLink href={siteConfig.facebookUrl} variant="secondary">
            Follow on Facebook
          </ButtonLink>
        </div>

        <div className="mt-8 relative w-full overflow-hidden rounded-3xl bg-black" style={{ aspectRatio: '16/9' }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src={siteConfig.liveEmbedUrl}
            title="Acts 242 Church of Christ — Live"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm text-text-soft dark:text-slate-400">
            <span className="font-semibold text-foreground dark:text-slate-100">Not live right now?</span>{' '}
            We go live every Sunday at 10:00 AM and Friday at 5:30 PM.{' '}
            <a
              href={siteConfig.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-navy hover:underline dark:text-amber-300"
            >
              Subscribe on YouTube
            </a>{' '}
            to get notified when we go live.
          </p>
        </div>

        {/* This week's materials — directly below the embed */}
        <CurrentWeekMaterialsCard />
      </Section>

      {/* ── Sunday Sermons ── */}
      <Section id="sunday">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
              {siteConfig.yearThemeYear} — {siteConfig.yearTheme}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">
              Sunday Sermons
            </h2>
          </div>
          <ButtonLink href={siteConfig.youtubeUrl} variant="secondary">
            Subscribe on YouTube
          </ButtonLink>
        </div>

        {sermons.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-border bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
            <p className="text-base font-semibold text-foreground dark:text-slate-100">
              Our first sermons for {siteConfig.yearThemeYear} will be published here soon.
            </p>
            <p className="mt-2 text-sm text-text-soft dark:text-slate-400">
              Subscribe on YouTube to be notified when new messages are posted.
            </p>
            <div className="mt-6">
              <ButtonLink href={siteConfig.youtubeUrl}>Subscribe on YouTube</ButtonLink>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sermons.map((sermon) => (
              <MessageCard key={sermon.slug} message={sermon} basePath="/sermons" />
            ))}
          </div>
        )}
      </Section>

      {/* ── Midweek Devotionals ── */}
      {midweek.length > 0 && (
        <Section id="midweek" className="bg-muted dark:bg-slate-900">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
                Midweek
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">
                Midweek Devotionals
              </h2>
              <p className="mt-3 max-w-2xl text-base text-text-soft dark:text-slate-400">
                A moment to pause, open the Word together, and be refreshed before Sunday comes around again.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {midweek.map((message) => (
              <MessageCard key={message.slug} message={message} basePath="/midweek" />
            ))}
          </div>
        </Section>
      )}

      {/* ── Sermon Archive ── */}
      <Section>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Archive</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">Browse past sermons</h2>
          <p className="mt-3 text-base text-text-soft dark:text-slate-400">
            Sermons from previous years are available as downloadable archives on Google Drive.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {sermonArchive.map((year) => (
            <div
              key={year.year}
              className="flex flex-col justify-between gap-4 rounded-3xl border border-border border-l-4 border-l-navy/30 bg-muted p-6 transition hover:-translate-y-1 hover:border-navy/30 hover:shadow-calm sm:flex-row sm:items-center dark:border-slate-700 dark:bg-slate-900 dark:border-l-amber-300/40 dark:hover:border-amber-300/40"
            >
              <div>
                <p className="text-lg font-semibold text-foreground dark:text-slate-100">{year.label}</p>
                {year.description && !year.description.startsWith('MOCKUP') && (
                  <p className="mt-1 text-sm text-text-soft dark:text-slate-400">{year.description}</p>
                )}
                {year.sermonCount && (
                  <p className="mt-1 text-xs text-text-soft dark:text-slate-400">
                    {year.sermonCount} sermons
                  </p>
                )}
              </div>
              <a
                href={year.driveFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-muted dark:border-slate-700 dark:bg-slate-800 dark:text-amber-300 dark:hover:bg-slate-700"
              >
                Open {year.year} Archive ↗
              </a>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
