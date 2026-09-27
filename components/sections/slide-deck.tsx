import { DeckControls } from './deck-controls'
import type { DeckSlide } from '@/data/lesson-decks.generated'

/**
 * In-page slide browser for the Foundation Guide decks.
 *
 * The slides are authored on a fixed 1920x1080 stage, so they are scaled rather than
 * reflowed. The extractor rewrites their px values into `cqw` fractions of that stage,
 * so scaling is pure CSS and costs no JavaScript at any viewport.
 *
 * Slide markup is rendered here, in a server component, so ~50-90 KB of inline-styled
 * HTML per lesson stays out of the client bundle. The only client code is DeckControls,
 * which drives this container by id and never receives the slide content.
 *
 * Horizontal scroll-snap gives native swiping on touch — the primary audience is on a
 * phone — and keeps the whole thing usable if JavaScript never runs.
 */
export function SlideDeck({
  slides,
  id,
  title,
}: {
  slides: DeckSlide[]
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
        // `snap-mandatory` plus one-slide-wide children makes every swipe land on a
        // slide. `overscroll-x-contain` stops a swipe at the end from triggering the
        // browser's back gesture, which the Facebook in-app browser is quick to fire.
        className="deck-scroller mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain rounded-2xl"
        role="group"
        aria-label={`${title} — teaching slides`}
        tabIndex={0}
      >
        {slides.map((slide, i) => (
          <figure
            key={slide.screen}
            className="m-0 w-full shrink-0 snap-center"
            aria-label={`Slide ${i + 1} of ${slides.length}: ${slide.label}`}
          >
            <div className="deck-stage overflow-hidden rounded-2xl border border-border dark:border-slate-700">
              <div
                className="deck-slide"
                style={parseStyle(slide.style)}
                // Build-time content extracted from the design export — never user input.
                dangerouslySetInnerHTML={{ __html: slide.html }}
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

/** The export stores the slide surface style as a CSS declaration string. */
function parseStyle(style: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const part of style.split(';')) {
    const idx = part.indexOf(':')
    if (idx === -1) continue
    const prop = part.slice(0, idx).trim()
    const value = part.slice(idx + 1).trim()
    if (!prop || !value) continue
    // camelCase for React, preserving CSS custom properties as-is.
    const key = prop.startsWith('--')
      ? prop
      : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    out[key] = value
  }
  return out
}
