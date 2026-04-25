import Link from 'next/link'
import Image from 'next/image'
import { Section } from '@/components/layout/section'
import { PageHero } from '@/components/sections/page-hero'
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
      <Section>
        <PageHero
          eyebrow="Live"
          title="Watch live preaching"
          description="Join the church online through live preaching, then continue with recent messages and teaching on YouTube."
          actions={
            <>
              <ButtonLink href={siteConfig.youtubeUrl}>Visit YouTube</ButtonLink>
              <ButtonLink href="/sermons" variant="secondary">Sermon archive</ButtonLink>
              <ButtonLink href="/connect" variant="ghost">
                Connect with us
              </ButtonLink>
            </>
          }
        />
      </Section>

      <Section className="bg-muted">
        <div className="overflow-hidden rounded-3xl border border-border bg-black">
          <iframe
            className="aspect-video w-full"
            src={siteConfig.liveEmbedUrl}
            title="Acts 242 Live Stream"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        {/* This week's materials — directly below the embed, no gap */}
        <CurrentWeekMaterialsCard />
      </Section>

      <Section>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Recent messages</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Continue in the teaching</h2>
          </div>
          <ButtonLink href="/sermons" variant="ghost">All sermons</ButtonLink>
        </div>

        {recentSermons.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-border bg-muted p-8 text-center">
            <p className="text-base text-text-soft">
              Sermons will be posted here after each Sunday service.{' '}
              <a href={siteConfig.youtubeUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy hover:underline">
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
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white transition hover:-translate-y-0.5 hover:shadow-calm"
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
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">
                    {formatDate(sermon.date)}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-foreground line-clamp-2">{sermon.title}</h3>
                  <p className="mt-1 text-sm text-text-soft">{sermon.passage}</p>
                  <span className="mt-4 text-sm font-semibold text-navy group-hover:underline">
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
