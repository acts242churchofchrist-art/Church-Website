import Link from 'next/link'
import type { Metadata } from 'next'
import { Section } from '@/components/layout/section'
import { ButtonLink } from '@/components/ui/button-link'
import { milestoneMonths, milestoneCount, formatMilestoneDate } from '@/data/milestones'

export const metadata: Metadata = {
  title: 'Milestones',
  description:
    'A record of what God has done through Acts 242 Church of Christ, month by month — outreaches, teaching series, gatherings, and the moments that marked our year.',
}

function isExternal(href: string) {
  return href.startsWith('http')
}

export default function MilestonesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-navy text-white">
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">
              Our story so far
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              What God has done,
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-white bg-clip-text text-transparent">
                month by month.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
              A record of the seasons we have walked through together — the outreaches, the teaching
              series, the gatherings, and the moments that marked this church family&apos;s year.
            </p>
          </div>
        </div>
      </section>

      {/* ── Month jump links ── */}
      <div className="sticky top-[var(--header-h)] z-30 border-b border-border bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95">
        <nav
          aria-label="Jump to month"
          className="mx-auto flex max-w-content gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8"
        >
          {milestoneMonths.map((month) => (
            <a
              key={month.month}
              href={`#${month.month}`}
              className="shrink-0 rounded-full border border-border px-4 py-2 text-sm font-semibold text-navy transition hover:bg-muted dark:border-slate-700 dark:text-amber-300 dark:hover:bg-slate-800"
            >
              {month.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ── Timeline ── */}
      <Section>
        <p className="text-sm text-text-soft dark:text-slate-400">
          {milestoneCount} milestones recorded across {milestoneMonths.length} months.
        </p>

        <div className="mt-10 space-y-16">
          {milestoneMonths.map((month) => (
            <section
              key={month.month}
              id={month.month}
              // html already carries scroll-padding-top for the header; this only needs
              // to clear the sticky month bar on top of it. The two offsets add.
              className="scroll-mt-16"
            >
              <h2 className="text-2xl font-bold tracking-tight text-foreground dark:text-slate-100">
                {month.label}
              </h2>

              <ol className="mt-6 border-l border-border pl-6 dark:border-slate-700">
                {month.entries.map((entry) => (
                  <li key={`${entry.date}-${entry.title}`} className="relative pb-8 last:pb-0">
                    <span
                      className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-navy ring-4 ring-white dark:bg-amber-300 dark:ring-slate-950"
                      aria-hidden
                    />
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-navy/70 dark:text-amber-300/70">
                      {entry.category}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-foreground dark:text-slate-100">
                      {entry.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-soft dark:text-slate-400">
                      {formatMilestoneDate(entry)}
                    </p>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-text-soft dark:text-slate-400">
                      {entry.description}
                    </p>
                    {entry.link &&
                      (isExternal(entry.link) ? (
                        <a
                          href={entry.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex text-sm font-semibold text-navy underline-offset-4 hover:underline dark:text-amber-300"
                        >
                          View on YouTube ↗
                        </a>
                      ) : (
                        <Link
                          href={entry.link}
                          className="mt-3 inline-flex text-sm font-semibold text-navy underline-offset-4 hover:underline dark:text-amber-300"
                        >
                          See more →
                        </Link>
                      ))}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </Section>

      {/* ── Footer note ── */}
      <Section className="bg-muted dark:bg-slate-900">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-base leading-8 text-text-soft dark:text-slate-400">
            This archive grows as each season closes. Ministry plans are set by the church core group
            and recorded here once completed.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <ButtonLink href="/community">See our community</ButtonLink>
            <ButtonLink href="/connect" variant="secondary">
              Get involved
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  )
}
