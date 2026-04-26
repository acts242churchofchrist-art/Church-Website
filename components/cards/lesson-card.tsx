import Link from 'next/link'
import { Lesson } from '@/types/content'

export function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:border-navy/30 hover:shadow-calm">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-navy/5 transition group-hover:bg-navy/10" />
      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white shadow-calm">
            {lesson.lessonNumber}
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Lesson {lesson.lessonNumber} of 7</p>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-foreground">{lesson.title}</h3>
        <p className="mt-3 text-sm leading-7 text-text-soft">{lesson.summary}</p>
        <Link href={`/discipleship/${lesson.slug}`} className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-navy transition group-hover:gap-2 hover:underline">
          Open lesson <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  )
}
