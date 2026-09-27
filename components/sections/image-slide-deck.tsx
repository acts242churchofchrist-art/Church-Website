import Image from 'next/image'
import { DeckControls } from './deck-controls'
import { SERIES_DECK_BASE, type SeriesSlide } from '@/data/series-decks.generated'

/**
 * Slide browser for the teaching series decks.
 *
 * Unlike the Foundation Guide decks — authored as HTML and scaled with container
 * queries — these arrive as presentation PDFs, so each slide is a rendered image.
 * scripts/extract-series-decks.mjs produces them at 1600px and next/image serves a
 * width to suit the viewport, which matters: the congregation reads on phones, on
 * cellular, and the source decks run 7–30 MB each.
 *
 * Only the first slide is eager. The rest load as they are swiped to, so opening a
 * session costs one image rather than nineteen.
 */
export function ImageSlideDeck({
  slides,
  folder,
  id,
  title,
}: {
  slides: SeriesSlide[]
  /** Session slug — the folder the extractor wrote these slides into. */
  folder: string
  id: string
  title: string
}) {
  if (slides.length === 0) return null

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
            Slides
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground dark:text-slate-100">
            Browse the teaching slides
          </h2>
        </div>
        <DeckControls containerId={id} count={slides.length} />
      </div>

      <p className="mt-3 text-sm text-text-soft dark:text-slate-400">
        Swipe, or use the arrows. {slides.length} slides.
      </p>

      <div
        id={id}
        // `snap-mandatory` with one-slide-wide children makes every swipe land on a
        // slide. `overscroll-x-contain` stops a swipe past the end from triggering
        // the browser's back gesture, which the Facebook in-app browser fires readily.
        className="deck-scroller mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain rounded-2xl"
        role="group"
        aria-label={`${title} — teaching slides`}
        tabIndex={0}
      >
        {slides.map((slide, i) => (
          <figure
            key={slide.file}
            className="m-0 w-full shrink-0 snap-center"
            aria-label={`Slide ${i + 1} of ${slides.length}: ${slide.label}`}
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-muted dark:border-slate-700 dark:bg-slate-900">
              <Image
                src={`${SERIES_DECK_BASE}/${folder}/${slide.file}`}
                alt={slide.label}
                width={slide.width}
                height={slide.height}
                // The first slide is what a reader lands on; the rest wait for a swipe.
                loading={i === 0 ? 'eager' : 'lazy'}
                priority={i === 0}
                sizes="(min-width: 1024px) 768px, 100vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-2 flex items-baseline justify-between gap-3 px-1 text-xs text-text-soft dark:text-slate-400">
              <span className="truncate">{slide.label}</span>
              <span className="shrink-0 tabular-nums">
                {i + 1} / {slides.length}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
