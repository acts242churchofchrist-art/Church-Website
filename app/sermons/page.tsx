import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/layout/section'
import { ButtonLink } from '@/components/ui/button-link'
import { getAllSermons } from '@/lib/sermons'
import { sermonArchive } from '@/data/sermon-archive'
import { siteConfig } from '@/data/site'
import type { SermonFrontmatter } from '@/types/content'

export const metadata = {
  title: 'Sermons',
  description: 'Weekly preaching from Acts 242 Church of Christ — biblical teaching rooted in Scripture.',
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function SermonCard({ sermon }: { sermon: SermonFrontmatter }) {
  return (
    <Link
      href={`/sermons/${sermon.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white transition hover:-translate-y-0.5 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-navy">
        {sermon.posterImage ? (
          <Image
            src={sermon.posterImage}
            alt={sermon.title}
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
          {formatDate(sermon.date)}
        </p>
        <h2 className="mt-2 text-lg font-semibold leading-snug text-foreground line-clamp-2 dark:text-slate-100">
          {sermon.title}
        </h2>
        <p className="mt-1 text-sm text-text-soft dark:text-slate-400">
          {sermon.passage} — {sermon.preacher}
        </p>
        <p className="mt-3 flex-1 text-sm leading-7 text-text-soft line-clamp-2 dark:text-slate-400">
          {sermon.summary}
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

  return (
    <>
      <Section>
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Sermons</p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl dark:text-slate-100">
            Biblical teaching for every season
          </h1>
          <p className="mt-6 text-lg leading-8 text-text-soft dark:text-slate-400">
            Preaching from Acts 242 Church of Christ. Every message is grounded in Scripture and aimed at helping people follow Jesus more faithfully.
          </p>
        </div>
      </Section>

      {/* ── 2026 Current Year ── */}
      <Section className="bg-muted dark:bg-slate-900">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
              {siteConfig.yearThemeYear} — {siteConfig.yearTheme}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">
              {siteConfig.yearThemeYear} Sermons
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
              <SermonCard key={sermon.slug} sermon={sermon} />
            ))}
          </div>
        )}
      </Section>

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
              className="flex flex-col justify-between gap-4 rounded-3xl border border-border bg-muted p-6 sm:flex-row sm:items-center dark:border-slate-700 dark:bg-slate-900"
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
