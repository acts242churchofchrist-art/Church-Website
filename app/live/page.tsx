import Link from 'next/link'
import Image from 'next/image'
import { Section } from '@/components/layout/section'
import { ThisSundayBanner } from '@/components/sections/this-sunday-banner'
import { ButtonLink } from '@/components/ui/button-link'
import { CurrentWeekMaterialsCard } from '@/components/sections/current-week-materials'
import { getRecentSermons } from '@/lib/sermons'
import { siteConfig } from '@/data/site'

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function LivePage() {
  const recentSermons = getRecentSermons(6)

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
            <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Live Preaching</p>
            <h1 className="mt-4 animate-fade-up-delay-1 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Watch us<br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-white bg-clip-text text-transparent">live every Sunday.</span>
            </h1>
            <p className="mt-6 max-w-2xl animate-fade-up-delay-2 text-lg leading-8 text-white/85 sm:text-xl">
              We go live every Sunday at 10:00 AM and every Friday at 5:30 PM. Subscribe on YouTube to be notified when we go live.
            </p>
            <div className="mt-10 flex animate-fade-up-delay-3 flex-wrap gap-4">
              <a href={siteConfig.youtubeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-amber-300 px-7 py-3 text-sm font-semibold text-navy shadow-glow transition hover:bg-amber-200">
                Subscribe on YouTube
              </a>
              <a href={siteConfig.facebookUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-white/10 px-7 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20">
                Follow on Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      <Section className="bg-muted dark:bg-slate-900">
        <div className="relative w-full overflow-hidden rounded-3xl bg-black" style={{ aspectRatio: '16/9' }}>
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

        {/* This week's materials — directly below the embed, no gap */}
        <CurrentWeekMaterialsCard />
      </Section>

      <Section>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Recent messages</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">Continue in the teaching</h2>
          </div>
          <ButtonLink href="/sermons" variant="ghost">All sermons</ButtonLink>
        </div>

        {recentSermons.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-border bg-muted p-8 text-center dark:border-slate-700 dark:bg-slate-900">
            <p className="text-base text-text-soft dark:text-slate-400">
              Sermons will be posted here after each Sunday service.{' '}
              <a href={siteConfig.youtubeUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy hover:underline dark:text-amber-300">
                Subscribe on YouTube
              </a>{' '}
              to be notified.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {recentSermons.map((sermon) => (
              <Link
                key={sermon.slug}
                href={`/sermons/${sermon.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white transition hover:-translate-y-0.5 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800"
              >
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
                      <span className="text-3xl font-bold text-white/20">A242</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
                    {formatDate(sermon.date)}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-foreground line-clamp-2 dark:text-slate-100">{sermon.title}</h3>
                  <p className="mt-1 text-sm text-text-soft dark:text-slate-400">{sermon.passage}</p>
                  <span className="mt-4 text-sm font-semibold text-navy group-hover:underline dark:text-amber-300">
                    Read message notes →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  )
}
