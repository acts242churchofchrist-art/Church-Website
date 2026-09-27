import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Lesson } from '@/types/content'

export function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <article
      // The guide gives each lesson its own page-edge colour — six blues and, for the
      // Cross, a deliberate break into warm brown. Carried as a variable so the badge
      // can fall back to amber in dark mode, where all seven would otherwise vanish.
      style={{ '--edge': lesson.edgeColour } as CSSProperties}
      className="group relative overflow-hidden rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:border-navy/30 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-amber-300/40"
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1.5 bg-[var(--edge)] dark:bg-amber-300"
      />
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-navy/5 transition group-hover:bg-navy/10 dark:bg-amber-300/5 dark:group-hover:bg-amber-300/10" />
      <div className="relative pl-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--edge)] text-sm font-bold text-white shadow-calm dark:bg-amber-300 dark:text-navy">
            {lesson.lessonNumber}
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
            Lesson {lesson.lessonNumber} of 7
          </p>
        </div>

        <h3 className="mt-4 text-xl font-semibold text-foreground dark:text-slate-100">
          {/* Stretched link: the whole card is the target and the accessible name is the
              lesson title, instead of seven links all reading "Open lesson". */}
          <Link
            href={`/discipleship/${lesson.slug}`}
            className="after:absolute after:inset-0 after:content-[''] hover:underline"
          >
            {lesson.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-navy/70 dark:text-amber-300/70">{lesson.subtitle}</p>

        <p className="mt-3 text-sm leading-7 text-text-soft dark:text-slate-400">{lesson.summary}</p>

        <p className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-navy transition group-hover:gap-2 dark:text-amber-300">
          Open lesson <span aria-hidden>→</span>
        </p>
      </div>
    </article>
  )
}
