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
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">
            Lesson {lesson.lessonNumber} of 7 — Discipleship
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">{lesson.title}</h1>
          <p className="mt-6 text-lg leading-8 text-text-soft">{lesson.summary}</p>
        </div>
      </Section>

      {/* 2. Video — embed if available, coming-soon placeholder if not */}
      <Section className="bg-muted">
        {lesson.videoUrl ? (
          <>
            <div className="overflow-hidden rounded-3xl border border-border bg-black">
              <iframe
                className="aspect-video w-full"
                src={lesson.videoUrl}
                title={`${lesson.title} — Video Teaching`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <p className="mt-3 text-center text-sm text-text-soft">
              Video teaching for Lesson {lesson.lessonNumber}: {lesson.title}
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-3xl border border-border bg-white p-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-navy/40">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-foreground">Video teaching coming soon</p>
            <p className="max-w-sm text-sm text-text-soft">
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Transcript</p>
            <p className="mt-4 whitespace-pre-line text-base leading-8 text-text-soft">{lesson.transcript}</p>
          </div>
        </Section>
      )}

      {/* 4. Purpose and main question */}
      <Section className="bg-muted">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-white p-8">
            <h2 className="text-xl font-semibold text-foreground">Purpose</h2>
            <p className="mt-4 text-base leading-8 text-text-soft">{lesson.purpose}</p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-8">
            <h2 className="text-xl font-semibold text-foreground">Main question</h2>
            <p className="mt-4 text-base leading-8 text-text-soft">{lesson.mainQuestion}</p>
          </div>
        </div>
      </Section>

      {/* 5. Study content — explanation, passages, understand, reflection, challenge */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-white p-8">
              <h2 className="text-2xl font-semibold text-foreground">Short explanation</h2>
              <p className="mt-4 text-base leading-8 text-text-soft">{lesson.explanation}</p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-8">
              <h2 className="text-2xl font-semibold text-foreground">Passage blocks</h2>
              <div className="mt-6 space-y-6">
                {lesson.passages.map((passage) => (
                  <div key={passage.reference} className="rounded-2xl bg-muted p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">{passage.reference}</p>
                    <p className="mt-3 text-base leading-8 text-foreground">{passage.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-white p-8">
              <h2 className="text-2xl font-semibold text-foreground">Understand</h2>
              <div className="mt-6 space-y-5">
                {lesson.understand.map((item) => (
                  <div key={item.label}>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">{item.label}</p>
                    <p className="mt-2 text-base leading-8 text-text-soft">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-white p-8">
              <h2 className="text-2xl font-semibold text-foreground">Reflection</h2>
              <p className="mt-4 text-base leading-8 text-text-soft">{lesson.reflection}</p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-8">
              <h2 className="text-2xl font-semibold text-foreground">Challenge</h2>
              <p className="mt-4 text-base leading-8 text-text-soft">{lesson.challenge}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. Prayer — full width, given its own space */}
      <Section className="bg-muted">
        <div className="max-w-3xl rounded-3xl border border-border bg-white p-8">
          <h2 className="text-2xl font-semibold text-foreground">Prayer</h2>
          <p className="mt-4 text-base leading-8 text-text-soft">{lesson.prayer}</p>
        </div>
      </Section>

      {/* 7. Next step CTA */}
      <Section>
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
