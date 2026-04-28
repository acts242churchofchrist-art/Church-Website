import { notFound } from 'next/navigation'
import { Section } from '@/components/layout/section'
import { ButtonLink } from '@/components/ui/button-link'
import { CtaBand } from '@/components/sections/cta-band'
import { lessons } from '@/data/lessons'

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }))
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const lesson = lessons.find((item) => item.slug === slug)

  if (!lesson) {
    notFound()
  }

  const isLastLesson = lesson.lessonNumber === 7

  return (
    <>
      {/* 1. Lesson header */}
      <Section>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
            Lesson {lesson.lessonNumber} of 7 — Discipleship
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground dark:text-slate-100">{lesson.title}</h1>
          <p className="mt-6 text-lg leading-8 text-text-soft dark:text-slate-400">{lesson.summary}</p>
        </div>
      </Section>

      {/* 2. Video — embed if available, coming-soon placeholder if not */}
      <Section className="bg-muted dark:bg-slate-900">
        {lesson.videoUrl ? (
          <>
            <div className="overflow-hidden rounded-3xl border border-border bg-black dark:border-slate-700">
              <iframe
                className="aspect-video w-full"
                src={lesson.videoUrl}
                title={`${lesson.title} — Video Teaching`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <p className="mt-3 text-center text-sm text-text-soft dark:text-slate-400">
              Video teaching for Lesson {lesson.lessonNumber}: {lesson.title}
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-3xl border border-border bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted dark:bg-slate-900">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-navy/40 dark:text-amber-300/50">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-foreground dark:text-slate-100">Video teaching coming soon</p>
            <p className="max-w-sm text-sm text-text-soft dark:text-slate-400">
              A short video teaching for this lesson is being prepared. Work through the passages
              and reflection questions below in the meantime.
            </p>
          </div>
        )}
      </Section>

      {/* 3. Transcript — only shown when transcript text is provided */}
      {lesson.transcript && (
        <Section>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Transcript</p>
            <p className="mt-4 whitespace-pre-line text-base leading-8 text-text-soft dark:text-slate-400">{lesson.transcript}</p>
          </div>
        </Section>
      )}

      {/* 4. Purpose and main question */}
      <Section className="bg-muted dark:bg-slate-900">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-xl font-semibold text-foreground dark:text-slate-100">Purpose</h2>
            <p className="mt-4 text-base leading-8 text-text-soft dark:text-slate-400">{lesson.purpose}</p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-xl font-semibold text-foreground dark:text-slate-100">Main question</h2>
            <p className="mt-4 text-base leading-8 text-text-soft dark:text-slate-400">{lesson.mainQuestion}</p>
          </div>
        </div>
      </Section>

      {/* 5a. Explanation + Passages */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Explanation</p>
              <p className="mt-4 text-base leading-8 text-text-soft dark:text-slate-400">{lesson.explanation}</p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Key Passages</p>
              <div className="mt-6 space-y-6">
                {lesson.passages.map((passage) => (
                  <div key={passage.reference} className="rounded-2xl bg-muted p-5 dark:bg-slate-900">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">{passage.reference}</p>
                    <p className="mt-3 text-base leading-8 text-foreground dark:text-slate-200">{passage.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Understand — each item as a white card with navy left border */}
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Understand</p>
            {lesson.understand.map((item) => (
              <div key={item.label} className="rounded-3xl border border-border border-l-4 border-l-navy bg-white p-6 dark:border-slate-700 dark:bg-slate-800 dark:border-l-amber-300">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">{item.label}</p>
                <p className="mt-2 text-base leading-8 text-text-soft dark:text-slate-400">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 5b. Reflection + Challenge — two-column */}
      <Section className="bg-muted dark:bg-slate-900">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Reflection</p>
            <p className="mt-4 text-base leading-8 text-text-soft dark:text-slate-400">{lesson.reflection}</p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Challenge</p>
            <p className="mt-4 text-base leading-8 text-text-soft dark:text-slate-400">{lesson.challenge}</p>
          </div>
        </div>
      </Section>

      {/* 6. Prayer — centered, italic/devotional style */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Prayer</p>
          <p className="mt-6 text-lg italic leading-9 text-text-soft dark:text-slate-400">&ldquo;{lesson.prayer}&rdquo;</p>
        </div>
      </Section>

      {/* 7. Next step CTA */}
      <Section className="bg-muted dark:bg-slate-900">
        <CtaBand
          title={isLastLesson ? 'You have completed all seven lessons' : lesson.nextStepLabel}
          description={
            isLastLesson
              ? 'You have finished the foundation journey. The next step is to connect with a pastor and continue growing in obedience and faith.'
              : `You have completed Lesson ${lesson.lessonNumber} of 7. Continue to the next lesson when you are ready.`
          }
          actions={
            isLastLesson ? (
              <ButtonLink href="/connect">Talk to a pastor</ButtonLink>
            ) : (
              <>
                <ButtonLink href={lesson.nextStepHref}>Next lesson</ButtonLink>
                <ButtonLink href="/connect" variant="secondary">
                  Talk to a pastor
                </ButtonLink>
              </>
            )
          }
        />
      </Section>
    </>
  )
}
