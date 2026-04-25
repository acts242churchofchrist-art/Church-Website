import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Section } from '@/components/layout/section'
import { PageHero } from '@/components/sections/page-hero'
import { VerseBlock } from '@/components/sections/verse-block'
import { ButtonLink } from '@/components/ui/button-link'
import { LeaderAvatar } from '@/components/ui/leader-avatar'
import { siteConfig } from '@/data/site'
import { missionVision } from '@/data/mission-vision'
import { coreLeadership, extendedTeam } from '@/data/leadership'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Acts 242 Church of Christ — our story, our mission, our pastor, and the team serving in Parañaque, Metro Manila.',
}

const isDev = process.env.NODE_ENV === 'development'

function DevNote({ label }: { label: string }) {
  if (!isDev) return null
  return (
    <p className="mb-3 rounded border border-amber-200 bg-amber-50 px-2 py-1 text-xs text-amber-600">
      ⚠ Mockup — {label}
    </p>
  )
}

// Check at build time whether the church interior photo has been uploaded
const churchInteriorExists =
  fs.existsSync(path.join(process.cwd(), 'public', 'images', 'church-interior.jpg')) ||
  fs.existsSync(path.join(process.cwd(), 'public', 'images', 'church-interior.jpeg'))

const pastor = coreLeadership.find((l) => l.name === 'Bro. Marc')!

export default function AboutPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <Section>
        <PageHero
          eyebrow="About"
          title="Who Acts 242 is"
          description="Acts 242 Church of Christ is a community devoted to God's Word, prayer, fellowship, and the faithful making of disciples — named after the pattern found in Acts 2:42."
          actions={<ButtonLink href="/connect">Connect with us</ButtonLink>}
        />
      </Section>

      {/* ── 2. Why the Name ── */}
      <Section className="bg-muted">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">The name</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Why Acts 242</h2>
            <p className="mt-4 text-base leading-8 text-text-soft">
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
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-white p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">
              {missionVision.mission.label}
            </p>
            <p className="mt-4 text-lg font-medium leading-8 text-foreground">
              {missionVision.mission.text}
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">
              {missionVision.vision.label}
            </p>
            <p className="mt-4 text-lg font-medium leading-8 text-foreground">
              {missionVision.vision.text}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {missionVision.values.map((value) => (
            <div key={value.title} className="rounded-3xl border border-border bg-muted p-6">
              <h3 className="text-base font-semibold text-foreground">{value.title}</h3>
              <p className="mt-2 text-sm leading-7 text-text-soft">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 4. Our Story ── */}
      <Section className="bg-muted">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Our Story</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
              A church built over a decade of faithfulness
            </h2>
            <p className="mt-4 text-base leading-8 text-text-soft">
              Acts 242 began as a small fellowship in Parañaque, founded by Bro. Marc after years
              of walking with the Lord from his early twenties. What started as Mustard Seed Faith
              Christian Church grew in faith, size, and clarity of identity until it was formally
              incorporated as Acts 242 Church of Christ Corporation by the Philippine SEC in
              February 2026.
            </p>
            <p className="mt-4 text-base leading-8 text-text-soft">
              The name Acts 242 was not chosen lightly. It reflects the heartbeat we want to keep:
              devoted to the apostles' teaching, to fellowship, to the breaking of bread, and to
              prayer. This is not a program. It is a pattern — the same pattern that shaped the
              first church, and the one we are building our lives around today.
            </p>
          </div>

          {/* PHOTO PLACEHOLDER — upload worship hall photo to /public/images/church-interior.jpeg */}
          <div className="relative overflow-hidden rounded-3xl">
            <DevNote label="Church interior photo pending — upload to /public/images/church-interior.jpeg" />
            {churchInteriorExists ? (
              <Image
                src="/images/church-interior.jpeg"
                alt="Acts 242 worship hall"
                width={800}
                height={560}
                className="w-full rounded-3xl object-cover"
              />
            ) : (
              <div className="flex h-64 items-center justify-center rounded-3xl bg-navy/10 lg:h-80">
                <p className="text-sm font-medium text-navy/40">Acts 242 Worship Hall</p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* ── 5. Meet the Pastor ── */}
      <Section>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Pastor</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Meet the pastor</h2>

        <div className="mt-8 rounded-3xl border border-border bg-white p-8 md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <DevNote label="Pastor photo pending — add to /public/images/leadership/bro-marc.jpg" />
              <LeaderAvatar name={pastor.name} photo={pastor.photo} size="lg" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground">{pastor.name}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-navy">
                {pastor.title}
              </p>
              <p className="mt-2 text-sm text-text-soft">{pastor.ministry}</p>
              {pastor.bio && (
                <p className="mt-5 text-base leading-8 text-text-soft">{pastor.bio}</p>
              )}
              <p className="mt-6 text-sm italic text-text-soft">
                Acts 242 Church of Christ is a registered non-stock corporation under the
                Securities and Exchange Commission of the Philippines.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 6. Core Leadership ── */}
      <Section className="bg-muted">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Leadership</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
          The people who lead us
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {coreLeadership.map((leader) => (
            <div
              key={leader.name}
              className="flex flex-col items-center rounded-3xl border border-border bg-white p-8 text-center"
            >
              <DevNote label="Leadership photos pending" />
              <LeaderAvatar name={leader.name} photo={leader.photo} size="md" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">{leader.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-navy">
                {leader.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-text-soft">{leader.ministry}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 7. Extended Team ── */}
      <Section>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Our Team</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
          Serving together
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {extendedTeam.map((member) => (
            <div
              key={member.name}
              className="flex items-center gap-4 rounded-2xl border border-border bg-muted p-4"
            >
              <LeaderAvatar name={member.name} photo={member.photo} size="sm" />
              <div>
                <p className="text-sm font-semibold text-foreground">{member.name}</p>
                <p className="text-xs text-navy">{member.title}</p>
                <p className="mt-0.5 text-xs text-text-soft">{member.ministry}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 8. Location ── */}
      <Section className="bg-muted">
        <div className="rounded-3xl border border-border bg-white p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Location</p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
            {siteConfig.fullChurchName}
          </h2>
          <p className="mt-3 text-base text-text-soft">{siteConfig.address}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <ButtonLink href="/connect">Get in touch</ButtonLink>
            <ButtonLink href="/live" variant="secondary">
              Watch online
            </ButtonLink>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-2xl border border-border bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:bg-muted"
            >
              Get directions ↗
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}
