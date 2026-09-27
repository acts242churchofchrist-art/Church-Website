/**
 * Turns the six Inner Healing 202 presentation PDFs into something the site can
 * actually serve:
 *
 *   public/series/<series>/<session>/NN.webp   one image per slide, for the browser
 *   public/series/<series>/<session>.pdf       a compressed take-home copy
 *   data/series-decks.generated.ts             slide counts and alt text
 *
 * The sources are 7–30 MB each (90 MB for the set) and live outside the repo. They
 * are never committed: at that size they would be unusable on the cellular
 * connection most of the congregation reads on.
 *
 *   node scripts/extract-series-decks.mjs "~/Downloads/Claude Handover/Inner Healing"
 *
 * Requires PyMuPDF and Pillow:  pip install pymupdf pillow
 */
import { execFileSync } from 'node:child_process'
import { writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { homedir } from 'node:os'

const SERIES = 'inner-healing-202-trauma'

/**
 * Deck file -> session. `skip` drops leading pages that repeat another deck: the
 * medical-lens deck opens with three slides lifted from session 1 before its own
 * title slide.
 */
const DECKS = [
  { file: 'The Many Faces of Trauma (1).pdf', session: 'the-many-faces-of-trauma', skip: 0 },
  { file: 'Developmental (1).pdf', session: 'developmental-trauma', skip: 0 },
  { file: 'Healing Hidden Wounds Biblical Trauma Response (1).pdf', session: 'healing-the-hidden-wounds', skip: 0 },
  { file: 'Inner Healing from Trauma Biblical Hope and Restoration.pdf', session: 'through-a-medical-lens', skip: 3 },
  { file: 'Who is Jeremiah - Inner Healing 202 - Trauma.pdf', session: 'who-is-jeremiah', skip: 0 },
  { file: 'Healing Truth in Grace Ceremony.pdf', session: 'breaking-the-cycle', skip: 0 },
]

/**
 * Slide headings, where the extracted text order does not give one.
 *
 * A PDF returns text in draw order, not reading order, so on slides whose heading
 * is painted after the body — or split across text runs, or rendered as part of an
 * image — the automatic pick lands on a body sentence. These are captions and alt
 * text that people actually read, so those slides get their heading written out.
 * Keyed by slide number; anything absent keeps the extracted heading.
 */
const LABELS = {
  'the-many-faces-of-trauma': {
    1: 'Understanding, Healing, and Hope',
    6: 'Physical Trauma',
    9: 'Loss and Grief',
    10: 'Effects of Trauma',
    12: 'Conclusion',
    14: 'Closing',
  },
  'developmental-trauma': {
    1: 'Developmental Trauma',
    2: 'What developmental trauma covers',
    3: 'Childhood and Neglect Trauma',
    4: 'Betrayal, Emotional and Psychological Trauma',
    5: 'Generational Trauma',
    6: 'How Early Experience Shapes Beliefs',
    7: 'Attachment Patterns',
    8: 'Long-Term Effects of Developmental Trauma',
    9: 'Hope and Healing Through God',
    10: 'God’s Promise of Restoration',
    11: '1 Peter 5:7',
  },
  'healing-the-hidden-wounds': {
    1: 'Healing the Hidden Wounds',
    2: 'Trauma in Today’s World',
    3: 'Where the Wounds Come From',
    4: 'Physical Trauma',
    5: 'Loss Trauma',
    6: '2 Timothy 1:7',
    7: 'Fear-Based Trauma',
    8: 'Social and Cultural Trauma',
    9: 'How Does God Heal?',
    10: 'The Church’s Response',
    11: 'Personal Reflection',
    12: 'Hope in Christ',
  },
  'through-a-medical-lens': {
    1: 'Inner Healing: Trauma',
    3: 'Lasting Effects of Childhood Trauma',
    4: 'How Trauma Reshapes the Brain',
    7: 'From Understanding to Healing',
    8: 'God’s Promise of Healing',
    9: 'God’s Promise of Healing',
    12: 'Your Healing Journey Begins',
  },
  'who-is-jeremiah': {
    11: 'The New Covenant',
    18: 'Key Takeaways',
  },
  'breaking-the-cycle': {
    1: 'Breaking the Cycle',
    7: 'Quiet Moment of Prayer',
    9: 'The Heart of the Workshop',
  },
}

const srcArg = process.argv[2]
if (!srcArg) {
  console.error('usage: node scripts/extract-series-decks.mjs <folder of source PDFs>')
  process.exit(1)
}
const src = srcArg.replace(/^~/, homedir())

const outDir = `public/series/${SERIES}`
rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

const py = `
import fitz, io, json, os, re, sys
from PIL import Image

src, out_dir, decks_json = sys.argv[1], sys.argv[2], sys.argv[3]
decks = json.loads(decks_json)
overrides = json.loads(sys.argv[4])

# Slides are 16:9. 1600px is the widest next/image will be asked for on a desktop
# hero; it downscales from there per viewport, so this is the source, not the
# delivered size.
SLIDE_W = 1600
# The take-home PDF is rebuilt from flat page renders rather than compressed in
# place: the originals carry full-resolution photo backgrounds that no lossless
# pass will meaningfully shrink.
PDF_W = 1400

def clean(text):
    """The meaningful lines of a slide, in order.

    Several decks carry a duplicated text layer (a drop-shadow copy sitting under
    the visible run), so every line appears twice. Dedupe preserving order and drop
    the slide number and the series header.
    """
    seen, lines = set(), []
    for raw in (text or '').splitlines():
        line = ' '.join(raw.split())
        if not line or line in seen:
            continue
        seen.add(line)
        if re.fullmatch(r'\\d{1,2}', line):                      # slide number
            continue
        if re.search(r'INNER HEALING 202', line, re.I):          # series header
            continue
        lines.append(line)
    return lines

def label_for(lines, running, fallback):
    """Pick the slide's own heading.

    Two things get in the way. The deck title is repeated on nearly every slide, so
    any line that shows up across most of the deck is chrome, not content -- that is
    what the running set holds. And several decks break a heading across two text
    runs ("Breaking the" / "Cycle:"), which would otherwise leave half a title
    behind, so a short opener is joined to a short successor.
    """
    body = [l for l in lines if l not in running] or lines
    if not body:
        return fallback
    head = body[0]
    if len(head) < 18 and len(body) > 1 and len(body[1]) < 30:
        head = f'{head} {body[1]}'
    return head[:90]

manifest = {}
for deck in decks:
    path = os.path.join(src, deck['file'])
    doc = fitz.open(path)
    session = deck['session']
    folder = os.path.join(out_dir, session)
    os.makedirs(folder, exist_ok=True)

    pages = list(doc)[deck['skip']:]
    slides, pdf_frames = [], []

    per_page = [clean(p.get_text('text')) for p in pages]
    # A line on more than half the slides is the deck's own title bar, not a heading.
    counts = {}
    for lines in per_page:
        for l in set(lines):
            counts[l] = counts.get(l, 0) + 1
    running = {l for l, n in counts.items() if n > len(pages) / 2}

    for i, (page, lines) in enumerate(zip(pages, per_page), 1):
        label = overrides.get(session, {}).get(str(i)) or label_for(lines, running, f'Slide {i}')

        zoom = SLIDE_W / page.rect.width
        pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
        img = Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGB')
        name = f'{i:02d}.webp'
        img.save(os.path.join(folder, name), 'WEBP', quality=82, method=6)

        frame = img.copy()
        frame.thumbnail((PDF_W, PDF_W), Image.LANCZOS)
        pdf_frames.append(frame)

        slides.append({'file': name, 'label': label, 'width': img.width, 'height': img.height})

    pdf_path = os.path.join(out_dir, session + '.pdf')
    pdf_frames[0].save(pdf_path, save_all=True, append_images=pdf_frames[1:],
                       resolution=150.0, quality=75, optimize=True)

    web = sum(os.path.getsize(os.path.join(folder, s['file'])) for s in slides)
    manifest[session] = slides
    print(f"  {len(slides):2d} slides  {web/1048576:5.2f} MB webp  "
          f"{os.path.getsize(pdf_path)/1048576:5.2f} MB pdf   {session}", file=sys.stderr)

print(json.dumps(manifest))
`

const raw = execFileSync('python3', ['-c', py, src, outDir, JSON.stringify(DECKS), JSON.stringify(LABELS)], {
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'inherit'],
  maxBuffer: 64 * 1024 * 1024,
})
const manifest = JSON.parse(raw)

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
const body = Object.entries(manifest)
  .map(
    ([session, slides]) => `  '${session}': [
${slides
  .map(
    (s) =>
      `    { file: '${s.file}', label: '${esc(s.label)}', width: ${s.width}, height: ${s.height} },`,
  )
  .join('\n')}
  ],`,
  )
  .join('\n')

writeFileSync(
  'data/series-decks.generated.ts',
  `// GENERATED FILE — do not edit by hand.
// Produced by scripts/extract-series-decks.mjs from the Inner Healing 202 deck PDFs.
// The source PDFs are 7–30 MB each and are deliberately not in the repo; re-run the
// script against them to refresh.

export type SeriesSlide = {
  /** Filename under /public/series/<series>/<session>/. */
  file: string
  /** Slide heading, used as the caption and the image's alt text. */
  label: string
  width: number
  height: number
}

export const SERIES_DECK_BASE = '/series/${SERIES}'

export const seriesDecks: Record<string, SeriesSlide[]> = {
${body}
}
`,
)

const total = Object.values(manifest).reduce((n, s) => n + s.length, 0)
console.log(`\nwrote data/series-decks.generated.ts — ${total} slides across ${Object.keys(manifest).length} sessions`)
