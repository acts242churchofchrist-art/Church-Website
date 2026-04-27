import { getCurrentWeekSermon } from '@/lib/sermons'
import { Section } from '@/components/layout/section'

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function DownloadButton({
  href,
  label,
  note,
  isExternal,
}: {
  href: string
  label: string
  note?: string
  isExternal?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      download={!isExternal || undefined}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-muted dark:border-slate-600 dark:bg-slate-700 dark:text-amber-300 dark:hover:bg-slate-600"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="shrink-0"
      >
        <path d="M7 1v8M4 6l3 3 3-3M2 11h10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
      {note && <span className="text-xs font-normal text-text-soft dark:text-slate-400">{note}</span>}
    </a>
  )
}

// Inner card — use this when embedding inside an existing Section
export function CurrentWeekMaterialsCard() {
  const sermon = getCurrentWeekSermon()
  if (!sermon) return null

  const hasAnyMaterial =
    sermon.posterImage ||
    sermon.brochureImages?.front ||
    sermon.brochureImages?.inside ||
    sermon.pptxUrl

  if (!hasAnyMaterial) return null

  return (
    <div className="mt-6 rounded-3xl border border-border bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">This Week</p>
      <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground dark:text-slate-100">
        Download this Sunday's materials
      </h2>
      <div className="mt-5 flex flex-wrap gap-3">
        {sermon.posterImage && (
          <DownloadButton href={sermon.posterImage} label="Poster" />
        )}
        {sermon.brochureImages?.front && (
          <DownloadButton href={sermon.brochureImages.front} label="Brochure (Front)" />
        )}
        {sermon.brochureImages?.inside && (
          <DownloadButton href={sermon.brochureImages.inside} label="Brochure (Inside)" />
        )}
        {sermon.pptxUrl && (
          <DownloadButton href={sermon.pptxUrl} label="Sermon Slides" note="(Google Drive)" isExternal />
        )}
      </div>
      <p className="mt-4 text-sm text-text-soft dark:text-slate-400">
        <span className="font-medium text-foreground dark:text-slate-100">"{sermon.title}"</span>
        {' '}— {sermon.preacher} · {formatDate(sermon.date)}
      </p>
    </div>
  )
}

// Standalone — use this on other pages where it needs its own Section wrapper
export function CurrentWeekMaterials() {
  const sermon = getCurrentWeekSermon()
  if (!sermon) return null

  const hasAnyMaterial =
    sermon.posterImage ||
    sermon.brochureImages?.front ||
    sermon.brochureImages?.inside ||
    sermon.pptxUrl

  if (!hasAnyMaterial) return null

  return (
    <Section>
      <div className="rounded-3xl border border-border bg-muted p-8 dark:border-slate-700 dark:bg-slate-800">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">This Week</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground dark:text-slate-100">
          Download this Sunday's materials
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {sermon.posterImage && (
            <DownloadButton href={sermon.posterImage} label="Poster" />
          )}
          {sermon.brochureImages?.front && (
            <DownloadButton href={sermon.brochureImages.front} label="Brochure (Front)" />
          )}
          {sermon.brochureImages?.inside && (
            <DownloadButton href={sermon.brochureImages.inside} label="Brochure (Inside)" />
          )}
          {sermon.pptxUrl && (
            <DownloadButton href={sermon.pptxUrl} label="Sermon Slides" note="(Google Drive)" isExternal />
          )}
        </div>
        <p className="mt-5 text-sm text-text-soft dark:text-slate-400">
          <span className="font-medium text-foreground dark:text-slate-100">"{sermon.title}"</span>
          {' '}— {sermon.preacher} · {formatDate(sermon.date)}
        </p>
      </div>
    </Section>
  )
}
