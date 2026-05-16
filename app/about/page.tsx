import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Section } from '@/components/layout/section'
import { VerseBlock } from '@/components/sections/verse-block'
import { ButtonLink } from '@/components/ui/button-link'
import { LeaderAvatar } from '@/components/ui/leader-avatar'
import { siteConfig } from '@/data/site'
import { missionVision } from '@/data/mission-vision'
import { coreLeadership, extendedTeam } from '@/data/leadership'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Acts 242 Church of Christ — our story, our pastor Bro. Marc, our leadership team, and our congregation in Parañaque, Metro Manila.',
}

const pastor = coreLeadership.find((l) => l.name === 'Bro. Marc')!

export default function AboutPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-navy text-white">
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-content px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
            {/* Left — text */}
            <div>
              <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Acts 242 Church of Christ</p>
              <h1 className="mt-4 animate-fade-up-delay-1 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Who we are.<br />
                <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-white bg-clip-text text-transparent">A church for the next generation.</span>
              </h1>
              <p className="mt-6 max-w-2xl animate-fade-up-delay-2 text-lg leading-8 text-white/85 sm:text-xl">
                Acts 242 Church of Christ is a community in Parañaque devoted to God&apos;s Word, prayer, fellowship, and the faithful making of disciples — named after the pattern found in Acts 2:42.
              </p>
              <div className="mt-10 flex animate-fade-up-delay-3 flex-wrap gap-4">
                <a href="#story" className="inline-flex items-center justify-center rounded-full bg-amber-300 px-7 py-3 text-sm font-semibold text-navy shadow-glow transition hover:bg-amber-200">
                  Our story →
                </a>
                <Link href="/connect" className="inline-flex items-center justify-center rounded-full bg-white/10 px-7 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20">
                  Connect with us
                </Link>
              </div>
            </div>

            {/* Right — quick facts card */}
            <div className="animate-fade-up-delay-2 hidden lg:block">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">Quick facts</p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-amber-300">✦</span>
                    <div>
                      <p className="text-xs font-semibold text-white/60">Founded</p>
                      <p className="text-sm font-medium text-white">Incorporated Feb 2026 (SEC Philippines)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-amber-300">✦</span>
                    <div>
                      <p className="text-xs font-semibold text-white/60">Where</p>
                      <p className="text-sm font-medium text-white">Parañaque, Metro Manila</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-amber-300">✦</span>
                    <div>
                      <p className="text-xs font-semibold text-white/60">Sunday Service</p>
                      <p className="text-sm font-medium text-white">10:00 AM – 12:30 PM</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-6 overflow-hidden rounded-2xl border border-white/15">
                  <div className="relative aspect-video">
                    <Image
                      src="/images/church/congregation-worship.jpg"
                      alt="Acts 242 congregation in Sunday worship"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="bg-white/10 px-3 py-2 text-xs text-white/60">
                    Sunday Worship Service — every Sunday 10:00 AM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Why the Name ── */}
      <Section className="bg-muted dark:bg-slate-900">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">The name</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">Why Acts 242</h2>
            <p className="mt-4 text-base leading-8 text-text-soft dark:text-slate-400">
              The name comes from Acts 2:42. It reflects a church life centered on Scripture,
              fellowship, the breaking of bread, and prayer. We do not want to build around trends.
              We want to remain close to the pattern God has given in His Word.
            </p>
          </div>
          <VerseBlock reference={siteConfig.verseReference} text={siteConfig.verseText} />
        </div>
      </Section>

      {/* ── 3. Mission and Vision ── */}
      <Section>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Our Mission</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">What we believe and where we&apos;re going</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
              {missionVision.mission.label}
            </p>
            <p className="mt-4 text-lg font-medium leading-8 text-foreground dark:text-slate-200">
              {missionVision.mission.text}
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-muted p-8 dark:border-slate-700 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
              {missionVision.vision.label}
            </p>
            <p className="mt-4 text-lg font-medium leading-8 text-foreground dark:text-slate-200">
              {missionVision.vision.text}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {missionVision.values.map((value) => (
            <div key={value.title} className="group rounded-3xl border border-border border-l-4 border-l-navy bg-white p-6 transition hover:-translate-y-1 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800 dark:border-l-amber-300">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-navy dark:bg-amber-300" />
                <h3 className="text-base font-semibold text-foreground dark:text-slate-100">{value.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-7 text-text-soft dark:text-slate-400">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 4. Our Story ── */}
      <Section id="story" className="bg-muted dark:bg-slate-900">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Our Story</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">
              A church built over a decade of faithfulness
            </h2>
            <p className="mt-4 text-base leading-8 text-text-soft dark:text-slate-400">
              Acts 242 began as a small fellowship in Parañaque, founded by Bro. Marc after years
              of walking with the Lord from his early twenties. What started as Mustard Seed Faith
              Christian Church grew in faith, size, and clarity of identity until it was formally
              incorporated as Acts 242 Church of Christ Corporation by the Philippine SEC in
              February 2026.
            </p>
            <p className="mt-4 text-base leading-8 text-text-soft dark:text-slate-400">
              The name Acts 242 was not chosen lightly. It reflects the heartbeat we want to keep:
              devoted to the apostles&apos; teaching, to fellowship, to the breaking of bread, and to
              prayer. This is not a program. It is a pattern — the same pattern that shaped the
              first church, and the one we are building our lives around today.
            </p>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-calm">
            <Image
              src="/images/church/worship-hall.jpg"
              alt="Acts 242 Worship Hall — 4707 Dr Arcadio Santos Ave, Parañaque"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* ── 5. Meet the Pastor ── */}
      <Section>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Pastor</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">Meet the pastor</h2>

        <div className="mt-8 rounded-3xl border border-border border-l-4 border-l-navy bg-white p-8 md:p-10 dark:border-slate-700 dark:bg-slate-800 dark:border-l-amber-300">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-3xl border border-border shadow-calm lg:h-64 lg:w-64">
              <Image
                src="/images/church/pastor-preaching.jpg"
                alt="Bro. Marc — Pastor of Acts 242 Church of Christ"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground dark:text-slate-100">{pastor.name}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
                {pastor.title}
              </p>
              <p className="mt-2 text-sm text-text-soft dark:text-slate-400">{pastor.ministry}</p>
              {pastor.bio && (
                <p className="mt-5 text-base leading-8 text-text-soft dark:text-slate-400">{pastor.bio}</p>
              )}
              <p className="mt-6 text-sm italic text-text-soft dark:text-slate-400">
                Acts 242 Church of Christ is a registered non-stock corporation under the
                Securities and Exchange Commission of the Philippines.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 6. Core Leadership ── */}
      <Section className="bg-muted dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Leadership</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">
          The people who lead us
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {coreLeadership.map((leader) => (
            <div
              key={leader.name}
              className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-border border-t-4 border-t-navy bg-white p-8 text-center transition hover:-translate-y-1 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800 dark:border-t-amber-300"
            >
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-navy/5 transition group-hover:bg-navy/10 dark:bg-amber-300/5" />
              <div className="relative flex flex-col items-center">
                <LeaderAvatar name={leader.name} photo={leader.photo} size="md" />
                <h3 className="mt-4 text-lg font-semibold text-foreground dark:text-slate-100">{leader.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
                  {leader.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-text-soft dark:text-slate-400">{leader.ministry}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 7. Community ── */}
      <Section className="bg-muted dark:bg-slate-900">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
              Our Community
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">
              A family growing together
            </h2>
            <p className="mt-5 text-base leading-8 text-text-soft dark:text-slate-400">
              Acts 242 is made up of families, young adults, seniors, and children — all at different points in their walk with God, all devoted to growing together. Every Sunday we gather to worship, hear the Word, share communion, and encourage one another. Every week is a reminder that the church is not a building — it is the people God has called together.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-border shadow-calm">
              <Image
                src="/images/church/congregation-worship.jpg"
                alt="Acts 242 congregation in worship"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-border shadow-calm">
              <Image
                src="/images/church/congregation-fellowship.jpg"
                alt="Acts 242 members in fellowship"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ── 8. Extended Team ── */}
      <Section>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Our Team</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground dark:text-slate-100">
          Serving together
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {extendedTeam.map((member) => (
            <div
              key={member.name}
              className="flex items-center gap-4 rounded-2xl border border-border border-l-4 border-l-navy/30 bg-muted p-4 transition hover:border-navy/30 hover:shadow-calm dark:border-slate-700 dark:bg-slate-900 dark:border-l-amber-300/30 dark:hover:border-amber-300/40"
            >
              <LeaderAvatar name={member.name} photo={member.photo} size="sm" />
              <div>
                <p className="text-sm font-semibold text-foreground dark:text-slate-100">{member.name}</p>
                <p className="text-xs text-navy dark:text-amber-300">{member.title}</p>
                <p className="mt-0.5 text-xs text-text-soft dark:text-slate-400">{member.ministry}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 8. Location ── */}
      <Section className="bg-muted dark:bg-slate-900">
        <div className="rounded-3xl border border-border bg-white p-8 md:p-10 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Location</p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground dark:text-slate-100">
            {siteConfig.fullChurchName}
          </h2>
          <p className="mt-3 text-base text-text-soft dark:text-slate-400">{siteConfig.address}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <ButtonLink href="/connect">Get in touch</ButtonLink>
            <ButtonLink href="/live" variant="secondary">
              Watch online
            </ButtonLink>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-2xl border border-border bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:bg-muted dark:border-slate-700 dark:bg-slate-800 dark:text-amber-300 dark:hover:bg-slate-700"
            >
              Get directions ↗
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}
