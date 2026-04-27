import Link from 'next/link'
import { Lesson } from '@/types/content'

export function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:border-navy/30 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-amber-300/40">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-navy/5 transition group-hover:bg-navy/10 dark:bg-amber-300/5 dark:group-hover:bg-amber-300/10" />
      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white shadow-calm dark:bg-amber-300 dark:text-navy">
            {lesson.lessonNumber}
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Lesson {lesson.lessonNumber} of 7</p>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-foreground dark:text-slate-100">{lesson.title}</h3>
        <p className="mt-3 text-sm leading-7 text-text-soft dark:text-slate-400">{lesson.summary}</p>
        <Link href={`/discipleship/${lesson.slug}`} className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-navy transition group-hover:gap-2 hover:underline dark:text-amber-300">
          Open lesson <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  )
}
