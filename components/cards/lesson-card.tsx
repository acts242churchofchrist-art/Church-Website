import Link from 'next/link'
import { Lesson } from '@/types/content'

export function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <article className="rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-calm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Lesson {lesson.lessonNumber} of 7</p>
      <h3 className="mt-3 text-xl font-semibold text-foreground">{lesson.title}</h3>
      <p className="mt-3 text-sm leading-7 text-text-soft">{lesson.summary}</p>
      <Link href={`/discipleship/${lesson.slug}`} className="mt-6 inline-flex text-sm font-semibold text-navy hover:underline">
        Open lesson
      </Link>
    </article>
  )
}
