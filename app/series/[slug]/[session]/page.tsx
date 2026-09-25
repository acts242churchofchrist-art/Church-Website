import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Section } from '@/components/layout/section'
import { ButtonLink } from '@/components/ui/button-link'
import { teachingSeries, getSession } from '@/data/series'

type Props = { params: Promise<{ slug: string; session: string }> }

export async function generateStaticParams() {
  return teachingSeries.flatMap((series) =>
    series.sessions.map((s) => ({ slug: series.slug, session: s.sessionSlug })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, session } = await params
  const found = getSession(slug, session)
  if (!found) return {}
  return {
    title: `${found.session.title} — ${found.series.title}`,
    description: found.session.subtitle ?? found.session.focus,
  }
}

function formatDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-PH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function SessionPage({ params }: Props) {
  const { slug, session: sessionSlug } = await params
  const found = getSession(slug, sessionSlug)
  if (!found) notFound()
  const { series, session, previous, next } = found

  return (
    <>
      {/* ── Header ──
          Deliberately quiet: no cinematic gradient hero. Someone arriving here may be
          in the middle of what this series is about. */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <Link
            href={`/series/${series.slug}`}
            className="text-sm font-semibold text-navy underline-offset-4 hover:underline dark:text-amber-300"
          >
            ← {series.title}
          </Link>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
            Session {session.number} of {series.sessions.length}
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl dark:text-slate-100">
            {session.title}
          </h1>
          {session.subtitle && (
            <p className="mt-3 text-lg leading-8 text-text-soft dark:text-slate-400">
              {session.subtitle}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-soft dark:text-slate-400">
            {session.date && <span>{formatDate(session.date)}</span>}
            {session.sourcePages && (
              <>
                {session.date && (
                  <span aria-hidden className="hidden sm:inline">
                    ·
                  </span>
                )}
                <span>Foundation deck pp.&nbsp;{session.sourcePages.replace('-', '–')}</span>
              </>
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-muted p-5 dark:border-slate-700 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
              Focus
            </p>
            <p className="mt-2 text-base leading-7 text-foreground dark:text-slate-200">
              {session.focus}
            </p>
          </div>
        </div>
      </Section>

      {/* ── Body ── */}
      <Section className="pt-0">
        <div className="mx-auto max-w-3xl">
          {session.body && session.body.length > 0 ? (
            <div className="sermon-prose">
              {session.body.map((block, i) => {
                if (block.kind === 'scripture') {
                  return (
                    <figure key={i} className="scripture my-8">
                      <p>{block.text}</p>
                      <cite>
                        {block.reference}
                        {block.translation ? ` · ${block.translation}` : ''}
                      </cite>
                    </figure>
                  )
                }
                if (block.kind === 'leaderNote') {
                  return (
                    <aside
                      key={i}
                      className="my-8 rounded-2xl border border-amber-400/40 bg-amber-50 p-5 dark:border-amber-300/30 dark:bg-slate-800"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
                        Leader&apos;s note
                      </p>
                      <p className="mt-2 text-sm leading-7 text-text-soft dark:text-slate-300">
                        {block.text}
                      </p>
                    </aside>
                  )
                }
                return (
                  <div key={i}>
                    {block.heading && <h2>{block.heading}</h2>}
                    {block.subheading && <h3>{block.subheading}</h3>}
                    <p>{block.text}</p>
                  </div>
                )
              })}
            </div>
          ) : (
            /* Honest empty state. The session decks have not been transcribed yet, and
               filler prose on a page about trauma would be worse than an absence. */
            <div className="rounded-3xl border border-border bg-muted p-8 text-center dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
                Session notes
              </p>
              <p className="mt-3 text-base leading-7 text-text-soft dark:text-slate-400">
                The written notes for this session are being prepared. In the meantime, the
                focus above tells you what it covered, and you are welcome to ask us about it.
              </p>
              <div className="mt-6">
                <ButtonLink href="/connect" variant="secondary">
                  Ask about this session
                </ButtonLink>
              </div>
            </div>
          )}

          {session.reflection && session.reflection.length > 0 && (
            <div className="mt-10 rounded-3xl border border-border bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <h2 className="text-xl font-bold text-foreground dark:text-slate-100">Reflection</h2>
              {/* One per line, so a reader can hold one at a time. */}
              <ul className="mt-4 space-y-3">
                {session.reflection.map((q) => (
                  <li key={q} className="text-base leading-7 text-text-soft dark:text-slate-300">
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {session.challenge && (
            <div className="mt-6 rounded-3xl bg-navy p-6 text-white dark:bg-slate-800">
              <h2 className="text-xl font-bold">Challenge</h2>
              <p className="mt-3 text-base leading-7 text-white/90">{session.challenge}</p>
            </div>
          )}

          {session.prayer && (
            <figure className="scripture mt-6">
              <p>{session.prayer}</p>
              <cite>Prayer</cite>
            </figure>
          )}
        </div>
      </Section>

      {/* ── Pastoral care note — always before the download ── */}
      <Section className="bg-muted dark:bg-slate-900">
        <div className="mx-auto max-w-3xl rounded-3xl border border-navy/20 bg-white p-8 dark:border-amber-300/30 dark:bg-slate-800">
          <h2 className="text-lg font-bold text-foreground dark:text-slate-100">
            A note before you download
          </h2>
          <p className="mt-3 text-base leading-8 text-text-soft dark:text-slate-400">
            These materials are offered for spiritual formation and group study. They are not
            counseling and are not a substitute for professional care. If you are carrying
            something heavy, we would be glad to walk with you —{' '}
            <Link
              href="/connect"
              className="font-semibold text-navy underline underline-offset-4 dark:text-amber-300"
            >
              reach out to us
            </Link>{' '}
            — and we encourage seeking qualified professional help alongside prayer and
            community.
          </p>

          {session.pdfUrl && (
            <a
              href={session.pdfUrl}
              download
              className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-border bg-muted p-5 transition hover:border-navy/30 dark:border-slate-600 dark:bg-slate-900"
            >
              <span>
                <span className="block font-semibold text-foreground dark:text-slate-100">
                  Session {session.number} handout
                </span>
                <span className="mt-1 block text-sm text-text-soft dark:text-slate-400">
                  PDF · A5 · for printing and offline reading
                </span>
              </span>
              <span className="shrink-0 text-sm font-semibold text-navy dark:text-amber-300">
                Download ↓
              </span>
            </a>
          )}
        </div>
      </Section>

      {/* ── Session navigation ── */}
      <Section className="pt-0">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 border-t border-border pt-8 dark:border-slate-700">
          <div className="min-w-0">
            {previous ? (
              <Link
                href={`/series/${series.slug}/${previous.sessionSlug}`}
                className="group flex flex-col"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-soft dark:text-slate-400">
                  ← Session {previous.number}
                </span>
                <span className="mt-1 text-sm font-semibold text-navy line-clamp-1 group-hover:underline dark:text-amber-300">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span className="text-xs text-text-soft dark:text-slate-400">
                This is the first session.
              </span>
            )}
          </div>

          <ButtonLink href={`/series/${series.slug}`} variant="secondary">
            All sessions
          </ButtonLink>

          <div className="min-w-0 text-right">
            {next && (
              <Link
                href={`/series/${series.slug}/${next.sessionSlug}`}
                className="group flex flex-col items-end"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-soft dark:text-slate-400">
                  Session {next.number} →
                </span>
                <span className="mt-1 text-sm font-semibold text-navy line-clamp-1 group-hover:underline dark:text-amber-300">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
