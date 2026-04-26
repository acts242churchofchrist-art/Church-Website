import Link from 'next/link'
import { getCurrentWeekSermon } from '@/lib/sermons'

function formatSundayDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}

export function ThisSundayBanner() {
  const sermon = getCurrentWeekSermon()
  if (!sermon) return null

  return (
    <Link
      href={`/sermons/${sermon.slug}`}
      className="group block bg-gradient-to-r from-navy via-navy-soft to-navy text-white"
    >
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-3 text-center text-sm sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-amber-300" />
          This Sunday
        </span>
        <span className="font-semibold">{sermon.title}</span>
        <span className="text-white/70">·</span>
        <span className="text-white/80">{formatSundayDate(sermon.date)}</span>
        <span className="text-white/70">·</span>
        <span className="font-semibold underline-offset-4 group-hover:underline">
          Watch and download materials →
        </span>
      </div>
    </Link>
  )
}
