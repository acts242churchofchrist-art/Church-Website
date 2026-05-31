import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/layout/section'
import { ButtonLink } from '@/components/ui/button-link'
import { getAllMidweek } from '@/lib/midweek'
import { siteConfig } from '@/data/site'
import type { SermonFrontmatter } from '@/types/content'

export const metadata = {
  title: 'Midweek Devotionals',
  description: 'Midweek devotional messages from Acts 242 Church of Christ — Scripture-rooted teaching to carry you through the week.',
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function MidweekCard({ message }: { message: SermonFrontmatter }) {
  return (
    <Link
      href={`/midweek/${message.slug}`}
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

export default function MidweekPage() {
  const messages = getAllMidweek()

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-navy text-white">
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-content px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Midweek Devotionals</p>
            <h1 className="mt-4 animate-fade-up-delay-1 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Strength for<br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-white bg-clip-text text-transparent">the week.</span>
            </h1>
            <p className="mt-6 max-w-2xl animate-fade-up-delay-2 text-lg leading-8 text-white/85 sm:text-xl">
              Our midweek gatherings are a moment to pause, open the Word together, and be refreshed before Sunday comes around again. Read and watch past devotionals here.
            </p>
            <div className="mt-10 flex animate-fade-up-delay-3 flex-wrap gap-4">
              <Link href="/sermons" className="inline-flex items-center justify-center rounded-full bg-amber-300 px-7 py-3 text-sm font-semibold text-navy shadow-glow transition hover:bg-amber-200">
                Browse Sunday sermons
              </Link>
              <a href={siteConfig.youtubeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-white/10 px-7 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20">
                Subscribe on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Devotionals grid ── */}
      <Section className="bg-muted dark:bg-slate-900">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
              Midweek
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">
              Devotional messages
            </h2>
          </div>
          <ButtonLink href={siteConfig.youtubeUrl} variant="secondary">
            Subscribe on YouTube
          </ButtonLink>
        </div>

        {messages.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-border bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
            <p className="text-base font-semibold text-foreground dark:text-slate-100">
              Our midweek devotionals will be published here soon.
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
            {messages.map((message) => (
              <MidweekCard key={message.slug} message={message} />
            ))}
          </div>
        )}
      </Section>
    </>
  )
}
