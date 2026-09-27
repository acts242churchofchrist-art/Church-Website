'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Prev/next and a position readout for SlideDeck.
 *
 * Deliberately receives only an id and a count — never the slide markup — so the
 * ~50-90 KB of inline-styled HTML per lesson stays server-side. Swiping works without
 * this component; it exists for pointer and keyboard users.
 */
export function DeckControls({ containerId, count }: { containerId: string; count: number }) {
  const [index, setIndex] = useState(0)
  const scroller = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = document.getElementById(containerId)
    if (!el) return
    scroller.current = el

    // Keep the readout honest when the user swipes instead of using the buttons.
    let frame = 0
    function onScroll() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const width = el!.clientWidth
        if (width > 0) setIndex(Math.round(el!.scrollLeft / width))
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })

    function onKey(e: KeyboardEvent) {
      // Only when focus is inside the deck, so arrows still scroll the page elsewhere.
      if (!el!.contains(document.activeElement)) return
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
    }
    el.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId])

  function go(delta: number) {
    const el = scroller.current
    if (!el) return
    const next = Math.min(Math.max(index + delta, 0), count - 1)
    el.scrollTo({
      left: next * el.clientWidth,
      // Respect the same preference the stylesheet honours globally.
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    })
    setIndex(next)
  }

  const atStart = index <= 0
  const atEnd = index >= count - 1

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm tabular-nums text-text-soft dark:text-slate-400">
        {index + 1} / {count}
      </span>
      <button
        type="button"
        onClick={() => go(-1)}
        disabled={atStart}
        aria-label="Previous slide"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-navy transition hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent dark:border-slate-700 dark:text-amber-300 dark:hover:bg-slate-800"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        disabled={atEnd}
        aria-label="Next slide"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-navy transition hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent dark:border-slate-700 dark:text-amber-300 dark:hover:bg-slate-800"
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>
    </div>
  )
}
