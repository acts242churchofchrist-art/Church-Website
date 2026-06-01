import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Section } from '@/components/layout/section'
import { testimonies, getTestimonyById } from '@/data/testimonies'

type Props = { params: Promise<{ id: string }> }

export async function generateStaticParams() {
  return testimonies.map((t) => ({ id: t.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const t = getTestimonyById(id)
  if (!t) return {}
  return {
    title: `${t.name}'s Testimony`,
    description: t.summary,
  }
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

export default async function TestimonyDetailPage({ params }: Props) {
  const { id } = await params
  const testimony = getTestimonyById(id)
  if (!testimony) notFound()

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-navy text-white">
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <Link
            href="/community#testimonies"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
          >
            ← All testimonies
          </Link>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Avatar */}
            {testimony.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={testimony.photo}
                alt={testimony.name}
                className="h-20 w-20 rounded-full border-2 border-white/20 object-cover sm:h-24 sm:w-24"
              />
            ) : (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 text-2xl font-bold text-white sm:h-24 sm:w-24">
                {initials(testimony.name)}
              </div>
            )}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Testimony</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{testimony.name}</h1>
              <p className="mt-2 text-white/60">{formatDate(testimony.date)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(252,211,77,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-content px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="mx-auto max-w-3xl text-2xl font-medium italic leading-relaxed sm:text-3xl sm:leading-snug">
            &ldquo;{testimony.pullQuote}&rdquo;
          </p>
          <p className="mt-6 text-sm font-semibold text-amber-300">{testimony.name}</p>
        </div>
      </section>

      {/* Testimony body */}
      <Section>
        <div className="mx-auto max-w-3xl">
          {testimony.sections.map((section, i) => (
            <div key={i} className={i > 0 ? 'mt-12' : ''}>
              <h2 className="text-2xl font-bold tracking-tight text-foreground dark:text-slate-100">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-5">
                {section.body.split('\n\n').map((para, j) => (
                  <p key={j} className="text-base leading-8 text-text-soft dark:text-slate-300">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Sermon link */}
      {testimony.sermonSlug && (
        <Section className="bg-muted dark:bg-slate-900">
          <div className="mx-auto max-w-3xl rounded-3xl border border-border border-l-4 border-l-navy bg-white p-8 dark:border-slate-700 dark:bg-slate-800 dark:border-l-amber-300">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">From this service</p>
            <p className="mt-3 text-base leading-7 text-text-soft dark:text-slate-300">
              This testimony was shared on {formatDate(testimony.date)}. You can read the sermon that accompanied it below.
            </p>
            <Link
              href={`/sermons/${testimony.sermonSlug}`}
              className="mt-5 inline-flex items-center text-sm font-semibold text-navy hover:underline dark:text-amber-300"
            >
              Read the sermon →
            </Link>
          </div>
        </Section>
      )}

      {/* Nav footer */}
      <Section>
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">More stories</p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground dark:text-slate-100">
            God is still writing testimonies
          </h2>
          <p className="max-w-xl text-base leading-8 text-text-soft dark:text-slate-400">
            Every member of this church carries a story of grace. Read more testimonies — or share your own.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/community#testimonies"
              className="inline-flex items-center justify-center rounded-full bg-navy px-7 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft dark:bg-amber-300 dark:text-navy dark:hover:bg-amber-200"
            >
              All testimonies
            </Link>
            <Link
              href="/connect"
              className="inline-flex items-center justify-center rounded-full border border-border px-7 py-3 text-sm font-semibold text-navy transition hover:bg-muted dark:border-slate-700 dark:text-amber-300 dark:hover:bg-slate-800"
            >
              Share your story
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
