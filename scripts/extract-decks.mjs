/**
 * Extracts slide content from the Claude Design deck exports into
 * data/lesson-decks.generated.ts.
 *
 * Re-run whenever the decks are re-exported:
 *   node scripts/extract-decks.mjs "/path/to/Foundation Guide Decks"
 *
 * Why extract rather than ship the .dc.html files directly:
 *  - they load Archivo and Source Sans 3 from fonts.googleapis.com, which the site's
 *    CSP (`style-src 'self'`, `font-src 'self'`) blocks. The fonts are self-hosted
 *    through next/font instead.
 *  - they depend on deck-stage.js + support.js (205 KB) purely for navigation and
 *    scaling, both of which the site does in CSS.
 *
 * The slides themselves need none of that: they carry inline styles only, no classes,
 * no scripts and no image refs, so their markup is portable as-is.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const DECK_W = 1920

const SRC = process.argv[2]
if (!SRC) {
  console.error('usage: node scripts/extract-decks.mjs "<path to Foundation Guide Decks>"')
  process.exit(1)
}

// Deck filename -> lesson slug in data/lessons.ts
const SLUG_BY_LESSON = {
  '01': 'seeking-god',
  '02': 'word-of-god',
  '03': 'discipleship',
  '04': 'kingdom-of-god',
  '05': 'light-and-darkness',
  '06': 'church',
  '07': 'cross',
}

/**
 * Deck chrome toggles. These mirror the `data-props` defaults in the export, except
 * showClaimFlags: that one is a review aid ("Show SOURCE NEEDED flags") and must never
 * reach a published page.
 */
const PROPS = {
  showPageRefs: true,
  showSlideNumbers: true,
  showExerciseLines: true,
  showClaimFlags: false,
}

/** Resolve <sc-if value="{{ prop }}">…</sc-if> against PROPS, then drop the wrapper. */
function resolveConditionals(html) {
  let out = html
  let guard = 0
  // Innermost-first so nesting resolves correctly.
  const re = /<sc-if value="\{\{\s*(\w+)\s*\}\}"[^>]*>((?:(?!<sc-if)[\s\S])*?)<\/sc-if>/
  while (re.test(out) && guard++ < 500) {
    out = out.replace(re, (_, prop, inner) => (PROPS[prop] ? inner : ''))
  }
  return out
}

/**
 * The decks hardcode three Google families in ~800 inline styles. Route them through
 * CSS variables so the font decision lives in one stylesheet rule instead of the
 * generated markup — self-hosting via next/font later is then a one-line change, and
 * the fallbacks keep the slides legible with no webfont at all.
 */
function rewriteFonts(html) {
  return html
    .replace(/font-family:\s*Archivo\s*,\s*sans-serif/g,
      'font-family:var(--deck-display),system-ui,sans-serif')
    .replace(/font-family:\s*'Source Sans 3'\s*,\s*sans-serif/g,
      'font-family:var(--deck-sans),system-ui,sans-serif')
    .replace(/font-family:\s*'Source Serif 4'\s*,\s*serif/g,
      'font-family:var(--deck-serif),Georgia,serif')
}

/**
 * Convert the slides' absolute px to container-query width units.
 *
 * The decks are authored on a fixed 1920px stage. Scaling that with
 * `transform: scale(...)` cannot be expressed in CSS alone — dividing a length by a
 * number yields a length, and scale() needs a unitless number — so it would need a
 * resize observer. Rewriting every px as a fraction of the stage width instead makes
 * the slides scale declaratively at any viewport with no JavaScript at all.
 *
 * 1920px is the stage, so 1px === (100 / 1920)cqw.
 */
function pxToCqw(html) {
  return html.replace(/(-?\d*\.?\d+)px/g, (_, n) => {
    const cqw = (parseFloat(n) / DECK_W) * 100
    // Hairlines would vanish once scaled down; keep sub-pixel borders as real pixels.
    if (Math.abs(parseFloat(n)) <= 1) return `${n}px`
    return `${Number(cqw.toFixed(4))}cqw`
  })
}

function extractSlides(html) {
  const slides = []
  const re =
    /<section\s+data-label="([^"]*)"\s+data-screen-label="(\d+)"([^>]*)>([\s\S]*?)<\/section>/g
  let m
  while ((m = re.exec(html)) !== null) {
    const [, label, screen, attrs, innerRaw] = m
    const styleMatch = attrs.match(/style="([^"]*)"/)
    let inner = resolveConditionals(innerRaw)
    // Defensive: the slides contain no scripts today, and must not start to.
    inner = inner.replace(/<script[\s\S]*?<\/script>/gi, '')
    slides.push({
      label,
      screen,
      style: pxToCqw(rewriteFonts(styleMatch ? styleMatch[1] : '')),
      html: pxToCqw(rewriteFonts(inner.trim())),
    })
  }
  return slides
}

const files = readdirSync(SRC).filter((f) => f.endsWith('.dc.html'))
const decks = {}

for (const file of files) {
  const num = file.match(/Lesson\s+(\d+)/)?.[1]
  const slug = SLUG_BY_LESSON[num]
  if (!slug) {
    console.warn(`  skipped (no slug mapping): ${file}`)
    continue
  }
  const slides = extractSlides(readFileSync(join(SRC, file), 'utf8'))
  if (slides.length === 0) {
    console.warn(`  skipped (no slides found): ${file}`)
    continue
  }
  decks[slug] = slides
  console.log(`  ${slug}: ${slides.length} slides`)
}

const banner = `// GENERATED FILE — do not edit by hand.
// Produced by scripts/extract-decks.mjs from the Claude Design deck exports.
// Slide markup is inline-styled and self-contained; it carries no classes, no scripts
// and no external references. Re-run the script to refresh.

export type DeckSlide = {
  /** Human label from the deck, e.g. "Purpose", "Psalm 119:1-2". */
  label: string
  /** Slide number as authored, e.g. "02". */
  screen: string
  /** Inline style for the slide surface (background, tone, padding). */
  style: string
  /** Slide body markup. Rendered as-is; build-time content, never user input. */
  html: string
}

/** Slides are authored on a 1920x1080 stage and scaled to fit by CSS. */
export const DECK_WIDTH = 1920
export const DECK_HEIGHT = 1080

export const lessonDecks: Record<string, DeckSlide[]> = `

writeFileSync(
  'data/lesson-decks.generated.ts',
  banner + JSON.stringify(decks, null, 2) + '\n',
  'utf8',
)

const total = Object.values(decks).reduce((n, s) => n + s.length, 0)
console.log(`\nwrote data/lesson-decks.generated.ts — ${Object.keys(decks).length} decks, ${total} slides`)
