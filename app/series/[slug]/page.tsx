import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Section } from '@/components/layout/section'
import { ButtonLink } from '@/components/ui/button-link'
import { teachingSeries, getSeriesBySlug } from '@/data/series'
import { seriesDecks } from '@/data/series-decks.generated'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return teachingSeries.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const series = getSeriesBySlug(slug)
  if (!series) return {}
  return {
    title: series.title,
    description: `${series.subtitle} — a ${series.sessions.length}-session teaching series from Acts 242 Church of Christ, ${series.season}.`,
  }
}

function formatSessionDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params
  const series = getSeriesBySlug(slug)
  if (!series) notFound()

  const downloadableSessions = series.sessions.filter((s) => s.pdfUrl)

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-navy text-white">
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">
              Teaching Series · {series.season}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {series.title}
            </h1>
            <p className="mt-4 text-xl text-white/85">{series.subtitle}</p>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <Section>
        <div className="mx-auto max-w-3xl">
          {series.intro.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mb-5 text-lg leading-8 text-text-soft dark:text-slate-400"
            >
              {paragraph}
            </p>
          ))}

          <blockquote className="mt-8 border-l-4 border-navy pl-6 dark:border-amber-300">
            <p className="text-lg italic leading-8 text-foreground dark:text-slate-200">
              &ldquo;{series.verse.text}&rdquo;
            </p>
            <cite className="mt-2 block text-sm font-semibold not-italic text-navy dark:text-amber-300">
              {series.verse.reference}
            </cite>
          </blockquote>
        </div>
      </Section>

      {/* ── Sessions ── */}
      <Section className="bg-muted dark:bg-slate-900">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
            The series
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">
            {series.sessions.length} sessions
          </h2>

          <ol className="mt-8 space-y-4">
            {series.sessions.map((session) => (
              <li
                key={session.number}
                className="group relative flex gap-5 rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:border-navy/30 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-amber-300/40"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white dark:bg-amber-300 dark:text-navy">
                  {session.number}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-foreground dark:text-slate-100">
                    {/* Stretched link: the whole card is the target, and the accessible
                        name is the session title rather than six identical "Open" links. */}
                    <Link
                      href={`/series/${series.slug}/${session.sessionSlug}`}
                      className="after:absolute after:inset-0 after:content-[''] hover:underline"
                    >
                      {session.title}
                    </Link>
                  </h3>
                  {session.subtitle && (
                    <p className="mt-1 text-sm text-navy/70 dark:text-amber-300/70">
                      {session.subtitle}
                    </p>
                  )}
                  {session.date && (
                    <p className="mt-1 text-sm text-text-soft dark:text-slate-400">
                      {formatSessionDate(session.date)}
                    </p>
                  )}
                  <p className="mt-2 text-base leading-7 text-text-soft dark:text-slate-400">
                    {session.focus}
                  </p>
                  {/* Says up front that there is something to read, rather than making
                      someone open six sessions to find out. */}
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-navy/70 dark:text-amber-300/70">
                    {[
                      session.body?.length ? 'Full notes' : null,
                      seriesDecks[session.sessionSlug]?.length
                        ? `${seriesDecks[session.sessionSlug].length} slides`
                        : null,
                      session.pdfUrl ? 'PDF' : null,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ── Pastoral care note — deliberately placed before the downloads ── */}
      <Section>
        <div className="mx-auto max-w-3xl rounded-3xl border border-navy/20 bg-white p-8 dark:border-amber-300/30 dark:bg-slate-800">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
            Before you begin
          </p>
          <p className="mt-4 text-base leading-8 text-text-soft dark:text-slate-400">
            These materials are offered for spiritual formation and group study. They are not
            counseling and are not a substitute for professional care. If you are carrying something
            heavy, we would be glad to walk with you —{' '}
            <Link
              href="/connect"
              className="font-semibold text-navy underline underline-offset-4 dark:text-amber-300"
            >
              reach out to us
            </Link>{' '}
            — and we encourage seeking qualified professional help alongside prayer and community.
          </p>
        </div>
      </Section>

      {/* ── Downloads — only rendered for sessions whose deck is committed ── */}
      {downloadableSessions.length > 0 && (
        <Section className="bg-muted dark:bg-slate-900">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
              Session materials
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">
              Slides for group study
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {downloadableSessions.map((session) => (
                <a
                  key={session.number}
                  href={session.pdfUrl}
                  download
                  className="rounded-2xl border border-border bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-navy/70 dark:text-amber-300/70">
                    Session {session.number} · PDF
                  </p>
                  <p className="mt-2 font-semibold text-foreground dark:text-slate-100">
                    {session.title}
                  </p>
                  <span className="mt-3 inline-flex text-sm font-semibold text-navy dark:text-amber-300">
                    Download slides ↓
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── Next step ── */}
      <Section className={downloadableSessions.length > 0 ? '' : 'bg-muted dark:bg-slate-900'}>
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/connect">Talk to a pastor</ButtonLink>
            <ButtonLink href="/grow#materials" variant="secondary">
              Browse all materials
            </ButtonLink>
            <ButtonLink href="/milestones" variant="ghost">
              See our milestones →
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  )
}
