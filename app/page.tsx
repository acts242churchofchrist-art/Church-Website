import Link from 'next/link'
import { Section } from '@/components/layout/section'
import { ButtonLink } from '@/components/ui/button-link'
import { LessonCard } from '@/components/cards/lesson-card'
import { lessons } from '@/data/lessons'
import { materials } from '@/data/materials'
import { MaterialCard } from '@/components/cards/material-card'
import { siteConfig } from '@/data/site'
import { SocialLinks } from '@/components/sections/social-links'
import { ThisSundayBanner } from '@/components/sections/this-sunday-banner'
import { StatsRow } from '@/components/sections/stats-row'

export default function HomePage() {
  const featuredMaterials = materials.filter((item) => item.featured)

  return (
    <>
      {/* This Sunday banner — only shows if a sermon was preached in the last 7 days */}
      <ThisSundayBanner />

      {/* Hero — full-bleed gradient with animated headline */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-navy text-white">
        {/* decorative glow */}
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_50%)]" />

        <div className="relative mx-auto max-w-content px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">
              Welcome to Acts 242 Church of Christ
            </p>
            <h1 className="mt-4 animate-fade-up-delay-1 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Know Christ.
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-white bg-clip-text text-transparent">
                Grow as His disciple.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl animate-fade-up-delay-2 text-lg leading-8 text-white/85 sm:text-xl">
              A church devoted to God&apos;s Word, prayer, fellowship, and the making of disciples — in Parañaque, Metro Manila.
            </p>
            <div className="mt-10 flex animate-fade-up-delay-3 flex-wrap gap-4">
              <Link
                href="/welcome"
                className="inline-flex items-center justify-center rounded-full bg-amber-300 px-7 py-3 text-sm font-semibold text-navy shadow-glow transition hover:bg-amber-200"
              >
                Start here
              </Link>
              <Link
                href="/discipleship"
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-7 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20"
              >
                Begin discipleship
              </Link>
              <Link
                href="/live"
                className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white/90 transition hover:text-white"
              >
                Watch live →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
          <StatsRow />
        </div>
      </section>

      {/* Scripture — dramatic, full-width navy */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(252,211,77,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-content px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">
            {siteConfig.verseReference}
          </p>
          <p className="mx-auto mt-6 max-w-4xl text-2xl font-medium leading-relaxed sm:text-3xl sm:leading-snug">
            &ldquo;{siteConfig.verseText}&rdquo;
          </p>
          <p className="mt-8 text-sm uppercase tracking-[0.18em] text-white/60">
            The pattern we keep
          </p>
        </div>
      </section>

      {/* Two paths welcome */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">A warm welcome</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Wherever you are, there is a next step
          </h2>
          <p className="mt-4 text-base leading-8 text-text-soft">
            Acts 242 exists to help people know the Lord, be grounded in Scripture, and continue in faithful discipleship.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-white p-8 transition hover:-translate-y-1 hover:border-navy/30 hover:shadow-calm">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-100 transition group-hover:scale-110" />
            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                ✦
              </div>
              <h3 className="mt-6 text-2xl font-bold text-foreground">New to faith?</h3>
              <p className="mt-3 text-base leading-7 text-text-soft">
                Start with the foundation lessons — written for anyone exploring the Christian life from the very beginning.
              </p>
              <ButtonLink href="/welcome" variant="ghost" className="mt-6 px-0">
                I&apos;m new — start here →
              </ButtonLink>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-border bg-white p-8 transition hover:-translate-y-1 hover:border-navy/30 hover:shadow-calm">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-navy/10 transition group-hover:scale-110" />
            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/10 text-2xl">
                ✛
              </div>
              <h3 className="mt-6 text-2xl font-bold text-foreground">Already following Christ?</h3>
              <p className="mt-3 text-base leading-7 text-text-soft">
                Connect with us, explore the materials, or reach out to a pastor to keep growing in the faith.
              </p>
              <ButtonLink href="/connect" variant="ghost" className="mt-6 px-0">
                Connect with us →
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Discipleship lessons — light bg */}
      <Section className="bg-muted">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Discipleship</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Seven foundation lessons
            </h2>
            <p className="mt-3 text-base leading-7 text-text-soft">
              A clear path through the essentials of the Christian life — for new believers and for any disciple wanting to revisit the basics.
            </p>
          </div>
          <ButtonLink href="/discipleship" variant="ghost">
            View all lessons →
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.slug} lesson={lesson} />
          ))}
        </div>
      </Section>

      {/* Live preaching — dark accent */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-soft to-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-glow">
              <iframe
                className="aspect-video w-full"
                src={siteConfig.liveEmbedUrl}
                title="Acts 242 Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">Live preaching</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Watch live and revisit recent messages
              </h2>
              <p className="mt-4 text-base leading-8 text-white/80">
                Join the preaching online and stay connected through recent messages. Slides, posters, and brochures are available alongside every sermon.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/live"
                  className="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-navy shadow-glow transition hover:bg-amber-200"
                >
                  Go to live page
                </Link>
                <Link
                  href="/sermons"
                  className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20"
                >
                  Sermon archive
                </Link>
                <Link
                  href={siteConfig.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white/90 transition hover:text-white"
                >
                  YouTube →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Materials</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Resources for discipleship and evangelism
            </h2>
            <p className="mt-3 text-base leading-7 text-text-soft">
              Foundation guide, sermon slides, brochures, and printable evangelism materials — all freely available.
            </p>
          </div>
          <ButtonLink href="/materials" variant="ghost">
            Browse all materials →
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredMaterials.map((item) => (
            <MaterialCard key={item.id} item={item} />
          ))}
        </div>
      </Section>

      {/* Connect / visit */}
      <Section className="bg-muted">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Connect</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Take your next step
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-calm">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-lg">
              ✉
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">Email the church</h3>
            <p className="mt-3 text-sm leading-7 text-text-soft">Reach out with a question, prayer request, or your desire to know more.</p>
            <a href={`mailto:${siteConfig.email}`} className="mt-4 inline-flex text-sm font-semibold text-navy hover:underline">
              {siteConfig.email}
            </a>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-calm">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy/10 text-lg">
              ✛
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">Talk to a pastor</h3>
            <p className="mt-3 text-sm leading-7 text-text-soft">Want guidance, prayer, or pastoral help? We would be glad to connect with you.</p>
            <ButtonLink href="/connect" variant="ghost" className="mt-4 px-0 py-0">
              Go to connect page →
            </ButtonLink>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-calm">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-lg">
              ✦
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">I am ready to know more</h3>
            <p className="mt-3 text-sm leading-7 text-text-soft">Ready to begin discipleship or take your next step? Start here.</p>
            <ButtonLink href="/welcome" variant="ghost" className="mt-4 px-0 py-0">
              Start here →
            </ButtonLink>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-white px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Join us in person</p>
            <div className="mt-2 flex flex-wrap gap-6">
              {siteConfig.serviceHours.map((s) => (
                <span key={s.day} className="text-sm text-foreground">
                  <span className="font-semibold">{s.day}</span>{' '}
                  <span className="text-text-soft">{s.time}</span>
                </span>
              ))}
            </div>
            <p className="mt-1 text-xs text-text-soft">{siteConfig.address}</p>
          </div>
          <Link
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-navy hover:underline"
          >
            Get directions →
          </Link>
        </div>

        <div className="mt-8">
          <SocialLinks />
        </div>
      </Section>
    </>
  )
}
