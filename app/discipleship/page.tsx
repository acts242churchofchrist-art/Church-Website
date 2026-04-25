import { Section } from '@/components/layout/section'
import { PageHero } from '@/components/sections/page-hero'
import { ButtonLink } from '@/components/ui/button-link'
import { LessonCard } from '@/components/cards/lesson-card'
import { lessons } from '@/data/lessons'
import { CtaBand } from '@/components/sections/cta-band'

export default function DiscipleshipPage() {
  return (
    <>
      <Section>
        <PageHero
          eyebrow="Discipleship"
          title="A 7-lesson foundation for new and growing disciples"
          description="These lessons are for anyone who wants to understand the Christian life — whether you are just beginning or want to go deeper in what you believe."
          actions={
            <>
              <ButtonLink href={`/discipleship/${lessons[0].slug}`}>Start with Lesson 1</ButtonLink>
              <ButtonLink href="/connect" variant="secondary">
                Ask a question first
              </ButtonLink>
            </>
          }
        />
      </Section>

      <Section className="bg-muted">
        <div className="rounded-3xl border border-border bg-white p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">The journey</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Seven lessons, one step at a time</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-text-soft">
            Take these lessons in order. Read the passages carefully. Pray through what you learn. Take your next step when you are ready.
          </p>
          <ol className="mt-8 space-y-5">
            {lessons.map((lesson) => (
              <li key={lesson.slug} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-sm font-bold text-navy">
                  {lesson.lessonNumber}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{lesson.title}</p>
                  <p className="mt-1 text-sm leading-6 text-text-soft">{lesson.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Lessons</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Open a lesson and begin</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.slug} lesson={lesson} />
          ))}
        </div>
      </Section>

      <Section className="bg-muted">
        <CtaBand
          title="Water baptism"
          description="If you are ready to obey Christ in water baptism, we encourage you to speak with a pastor or church leader and take your next step with understanding and faith."
          actions={
            <>
              <ButtonLink href="/discipleship/water-baptism">Learn more</ButtonLink>
              <ButtonLink href="/connect" variant="secondary">
                Talk to a pastor
              </ButtonLink>
            </>
          }
        />
      </Section>
    </>
  )
}
