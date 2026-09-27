/**
 * Generates public/acts242-journey-checklist.pdf — the printable A5 sheet the Grow page
 * offers: all eight steps, a line for the date each was finished, and room for the
 * leader's name.
 *
 * Driven by data/lessons.ts so the step titles can never drift from the site.
 *
 *   node scripts/make-journey-checklist.mjs
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

// Pull titles straight from the lesson data rather than restating them.
const lessonsSrc = readFileSync('data/lessons.ts', 'utf8')
const steps = [...lessonsSrc.matchAll(/lessonNumber:\s*(\d+),[\s\S]*?title:\s*'([^']+)'/g)].map(
  (m) => ({ n: Number(m[1]), title: m[2] }),
)
if (steps.length !== 7) {
  console.error(`expected 7 lessons, parsed ${steps.length} — check data/lessons.ts`)
  process.exit(1)
}
steps.push({ n: 8, title: 'Water Baptism' })

const py = `
from reportlab.lib.pagesizes import A5
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.units import mm
import json, sys

steps = json.loads(sys.argv[1])
out = sys.argv[2]

CREAM  = HexColor('#FBF8F3')
NAVY   = HexColor('#102544')
GOLD   = HexColor('#C39A38')
SOFT   = HexColor('#6B6459')
RULE   = HexColor('#D8D0C2')

W, H = A5
c = canvas.Canvas(out, pagesize=A5)
c.setTitle('Acts 242 — The Journey Checklist')
c.setAuthor('Acts 242 Church of Christ')
c.setSubject('Eight steps through the Foundation Guide, with room to record your progress')
c.setKeywords('discipleship, foundation guide, checklist, Acts 242')

c.setFillColor(CREAM); c.rect(0, 0, W, H, stroke=0, fill=1)

M = 16 * mm
y = H - M

c.setFillColor(GOLD); c.setFont('Helvetica-Bold', 8)
c.drawString(M, y - 4, 'ACTS 242 CHURCH OF CHRIST')
y -= 16
c.setFillColor(NAVY); c.setFont('Helvetica-Bold', 20)
c.drawString(M, y - 12, 'The Journey Checklist')
y -= 30
c.setFillColor(GOLD); c.rect(M, y, 34 * mm, 2.4, stroke=0, fill=1)
y -= 16
c.setFillColor(SOFT); c.setFont('Helvetica', 8.6)
c.drawString(M, y - 6, 'Eight steps, taken in order. Mark the date you finish each one.')
y -= 26

# Leader field
c.setFillColor(NAVY); c.setFont('Helvetica-Bold', 8)
c.drawString(M, y, 'WALKING WITH ME')
c.setStrokeColor(RULE); c.setLineWidth(0.7)
c.line(M + 36 * mm, y - 1, W - M, y - 1)
y -= 24

row = (y - M - 14 * mm) / len(steps)
for s in steps:
    box = 9
    c.setStrokeColor(NAVY); c.setLineWidth(0.9)
    c.rect(M, y - box + 1, box, box, stroke=1, fill=0)

    c.setFillColor(GOLD); c.setFont('Helvetica-Bold', 8)
    c.drawString(M + 15, y - 1, f"{s['n']:02d}")

    c.setFillColor(NAVY); c.setFont('Helvetica-Bold', 10.5)
    c.drawString(M + 32, y - 1, s['title'])

    # date line
    c.setFillColor(SOFT); c.setFont('Helvetica', 7.4)
    c.drawRightString(W - M - 30 * mm - 3, y - 1, 'Date')
    c.setStrokeColor(RULE); c.setLineWidth(0.7)
    c.line(W - M - 30 * mm, y - 2, W - M, y - 2)
    y -= row

c.setFillColor(SOFT); c.setFont('Helvetica-Oblique', 7.8)
c.drawString(M, M + 12, 'You will seek me and find me when you seek me with all your heart.')
c.setFillColor(GOLD); c.setFont('Helvetica-Bold', 7)
c.drawString(M, M + 2, 'JEREMIAH 29:13')
c.setFillColor(SOFT); c.setFont('Helvetica', 7)
c.drawRightString(W - M, M + 2, 'acts242churchofchrist.com')

c.showPage(); c.save()
`

const dir = mkdtempSync(join(tmpdir(), 'a242-'))
const script = join(dir, 'gen.py')
writeFileSync(script, py, 'utf8')
execFileSync('python3', [script, JSON.stringify(steps), 'public/acts242-journey-checklist.pdf'], {
  stdio: 'inherit',
})
console.log('wrote public/acts242-journey-checklist.pdf —', steps.length, 'steps')
