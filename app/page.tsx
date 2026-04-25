import Link from 'next/link'
import { Section } from '@/components/layout/section'
import { PageHero } from '@/components/sections/page-hero'
import { VerseBlock } from '@/components/sections/verse-block'
import { ButtonLink } from '@/components/ui/button-link'
import { LessonCard } from '@/components/cards/lesson-card'
import { lessons } from '@/data/lessons'
import { materials } from '@/data/materials'
import { MaterialCard } from '@/components/cards/material-card'
import { siteConfig } from '@/data/site'
import { SocialLinks } from '@/components/sections/social-links'

export default function HomePage() {
  const featuredMaterials = materials.filter((item) => item.featured)

  return (
    <>
      {/* Hero */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <PageHero
            eyebrow="Welcome"
            title="Acts 242"
            description="A church devoted to God's Word, prayer, fellowship, and the making of disciples."
            actions={
              <>
                <ButtonLink href="/discipleship">Start discipleship</ButtonLink>
                <ButtonLink href="/about" variant="secondary">
                  Learn about the church
                </ButtonLink>
                <ButtonLink href="/connect" variant="ghost">
                  Just have a question?
                </ButtonLink>
              </>
            }
          />

          <div className="rounded-3xl border border-border bg-muted p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Church life</p>
            <p className="mt-4 text-lg leading-8 text-foreground">
              We want every visitor, new believer, and church member to know Christ, grow in His Word, and walk faithfully as His disciple.
            </p>
          </div>
        </div>
      </Section>

      {/* Why Acts 242 */}
      <Section className="bg-muted">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Why Acts 242</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">A church named after a pattern of devotion</h2>
            <p className="mt-4 text-base leading-8 text-text-soft">
              The name Acts 242 comes from a church life centered on the apostles' doctrine, fellowship, breaking of bread, and prayers. This is the heartbeat we want to keep.
            </p>
          </div>

          <VerseBlock reference={siteConfig.verseReference} text={siteConfig.verseText} />
        </div>
      </Section>

      {/* About preview — dual-audience */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">About</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">A warm and serious church for those seeking Christ</h2>
            <p className="mt-4 text-base leading-8 text-text-soft">
              Acts 242 exists to help people know the Lord, be grounded in Scripture, and continue in faithful discipleship. Whether you are exploring faith or already walking with Christ, you are welcome here.
            </p>
            <div className="mt-6">
              <ButtonLink href="/about" variant="secondary">
                Learn more about us
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-muted p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Two paths, one welcome</p>
            <div className="mt-6 space-y-6">
              <div>
                <p className="font-semibold text-foreground">New to faith?</p>
                <p className="mt-2 text-sm leading-7 text-text-soft">
                  Start with the foundation lessons. They are written for anyone who wants to understand the Christian life from the beginning.
                </p>
                <ButtonLink href="/discipleship" variant="ghost" className="mt-3 px-0">
                  Start Lesson 1
                </ButtonLink>
              </div>
              <div className="border-t border-border pt-6">
                <p className="font-semibold text-foreground">Already following Christ?</p>
                <p className="mt-2 text-sm leading-7 text-text-soft">
                  Connect with us, explore the materials, or reach out to a pastor to continue growing.
                </p>
                <ButtonLink href="/connect" variant="ghost" className="mt-3 px-0">
                  Connect with us
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Discipleship lessons */}
      <Section className="bg-muted">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Discipleship</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Start with the foundation lessons</h2>
          </div>
          <ButtonLink href="/discipleship" variant="ghost">
            View all lessons
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.slug} lesson={lesson} />
          ))}
        </div>
      </Section>

      {/* Live preaching */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="overflow-hidden rounded-3xl border border-border bg-black">
            <iframe
              className="aspect-video w-full"
              src={siteConfig.liveEmbedUrl}
              title="Acts 242 Live Stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Live preaching</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Watch live and revisit recent messages</h2>
            <p className="mt-4 text-base leading-8 text-text-soft">
              Join the preaching online and stay connected through recent messages on our YouTube page.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <ButtonLink href="/live">Go to live page</ButtonLink>
              <ButtonLink href="/sermons" variant="secondary">
                Sermon archive
              </ButtonLink>
              <ButtonLink href={siteConfig.youtubeUrl} variant="ghost">
                YouTube
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Materials */}
      <Section className="bg-muted">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Materials</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Resources for discipleship, sermons, and evangelism</h2>
          </div>
          <ButtonLink href="/materials" variant="ghost">
            Browse all materials
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredMaterials.map((item) => (
            <MaterialCard key={item.id} item={item} />
          ))}
        </div>
      </Section>

      {/* Connect */}
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-white p-6">
            <h3 className="text-xl font-semibold text-foreground">Email the church</h3>
            <p className="mt-3 text-sm leading-7 text-text-soft">Reach out with a question, prayer request, or your desire to know more.</p>
            <a href={`mailto:${siteConfig.email}`} className="mt-6 inline-flex text-sm font-semibold text-navy hover:underline">
              {siteConfig.email}
            </a>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6">
            <h3 className="text-xl font-semibold text-foreground">Talk to a pastor</h3>
            <p className="mt-3 text-sm leading-7 text-text-soft">If you want guidance, prayer, or pastoral help, we would be glad to connect with you.</p>
            <ButtonLink href="/connect" variant="ghost" className="mt-6 px-0 py-0">
              Go to connect page
            </ButtonLink>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6">
            <h3 className="text-xl font-semibold text-foreground">I am ready to know more</h3>
            <p className="mt-3 text-sm leading-7 text-text-soft">If you are ready to begin discipleship or take your next step, start here.</p>
            <ButtonLink href="/discipleship" variant="ghost" className="mt-6 px-0 py-0">
              Start discipleship
            </ButtonLink>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-muted px-6 py-5">
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
