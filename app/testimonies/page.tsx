import Link from 'next/link'
import type { Metadata } from 'next'
import { Section } from '@/components/layout/section'
import { testimonies } from '@/data/testimonies'

export const metadata: Metadata = {
  title: 'Testimonies',
  description:
    'Stories of God\'s faithfulness from the members of Acts 242 Church of Christ — lives being changed by the Word and the Spirit.',
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

export default function TestimoniesPage() {
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
              What God has done.<br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-white bg-clip-text text-transparent">
                Stories from the church.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl animate-fade-up-delay-2 text-lg leading-8 text-white/85 sm:text-xl">
              These are not perfect stories. They are honest ones — of lives being changed, one step at a time, by the faithfulness of God and the grace of community.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonies grid */}
      <Section>
        {testimonies.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-base text-text-soft dark:text-slate-400">No testimonies yet. Check back soon.</p>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Stories of grace</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">
              From the members of Acts 242
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
          </>
        )}
      </Section>

      {/* CTA */}
      <Section className="bg-muted dark:bg-slate-900">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Your story</p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground dark:text-slate-100">
            Has God been faithful to you?
          </h2>
          <p className="mt-4 text-base leading-8 text-text-soft dark:text-slate-400">
            Every testimony is a declaration that God keeps His promises. If you have a story to share, we would be honored to hear it — and to help you tell it to the church.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/connect"
              className="inline-flex items-center justify-center rounded-full bg-navy px-7 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft dark:bg-amber-300 dark:text-navy dark:hover:bg-amber-200"
            >
              Share your story
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
