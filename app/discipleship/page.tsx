import Link from 'next/link'
import { Section } from '@/components/layout/section'
import { ButtonLink } from '@/components/ui/button-link'
import { LessonCard } from '@/components/cards/lesson-card'
import { lessons } from '@/data/lessons'

export default function DiscipleshipPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-navy text-white">
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-content px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Foundation Lessons</p>
            <h1 className="mt-4 animate-fade-up-delay-1 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Know Christ.<br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-white bg-clip-text text-transparent">Walk as His disciple.</span>
            </h1>
            <p className="mt-6 max-w-2xl animate-fade-up-delay-2 text-lg leading-8 text-white/85 sm:text-xl">
              Seven lessons to ground you in the Christian life — for new believers and for any disciple wanting to revisit the basics.
            </p>
            <div className="mt-10 flex animate-fade-up-delay-3 flex-wrap gap-4">
              <Link href={`/discipleship/${lessons[0].slug}`} className="inline-flex items-center justify-center rounded-full bg-amber-300 px-7 py-3 text-sm font-semibold text-navy shadow-glow transition hover:bg-amber-200">
                Begin Lesson 1
              </Link>
              <Link href="/discipleship/water-baptism" className="inline-flex items-center justify-center rounded-full bg-white/10 px-7 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20">
                Learn about baptism
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section className="bg-muted dark:bg-slate-900">
        <div className="rounded-3xl border border-border bg-white p-8 md:p-10 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">The journey</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">Seven lessons, one step at a time</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-text-soft dark:text-slate-400">
            Take these lessons in order. Read the passages carefully. Pray through what you learn. Take your next step when you are ready.
          </p>
          <ol className="mt-8 space-y-5">
            {lessons.map((lesson) => (
              <li key={lesson.slug} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-sm font-bold text-navy dark:border-slate-600 dark:bg-slate-900 dark:text-amber-300">
                  {lesson.lessonNumber}
                </span>
                <div>
                  <p className="font-semibold text-foreground dark:text-slate-100">{lesson.title}</p>
                  <p className="mt-1 text-sm leading-6 text-text-soft dark:text-slate-400">{lesson.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Lessons</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">Open a lesson and begin</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.slug} lesson={lesson} />
          ))}
        </div>
      </Section>

      <Section className="bg-muted dark:bg-slate-900">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Next Step</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">Water Baptism</h2>
            <p className="mt-4 text-base leading-8 text-text-soft dark:text-slate-400">
              If you have gone through these lessons and are ready to obey Christ in water baptism,
              we want to walk that step with you. Speak with a pastor, share what God has been
              teaching you, and take your next step with understanding and faith.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/discipleship/water-baptism">Learn more</ButtonLink>
              <ButtonLink href="/connect" variant="secondary">Talk to a pastor</ButtonLink>
            </div>
          </div>
          <div className="rounded-3xl border-2 border-navy/20 bg-white p-8 dark:border-slate-600 dark:bg-slate-800">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Acts 2:38</p>
            <p className="mt-4 text-base leading-8 text-foreground dark:text-slate-200">
              &ldquo;Repent and be baptized, every one of you, in the name of Jesus Christ for the
              forgiveness of your sins. And you will receive the gift of the Holy Spirit.&rdquo;
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Romans 6:4</p>
            <p className="mt-3 text-base leading-8 text-foreground dark:text-slate-200">
              &ldquo;We were therefore buried with him through baptism into death in order that, just
              as Christ was raised from the dead through the glory of the Father, we too may live
              a new life.&rdquo;
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
