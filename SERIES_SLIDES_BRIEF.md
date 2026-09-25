# Brief — Inner Healing 202 session slides, as HTML and PDF

**Prepared:** September 17, 2026
**For:** Claude Design (or whoever produces the session materials)
**Target repo:** `acts242churchofchrist-art/Church-Website` (Next.js, live at https://www.acts242churchofchrist.com)

---

## 0. What is being asked for

Six teaching sessions from **Inner Healing 202: Trauma** (May – August 2026) need to exist in two forms:

1. **HTML** — the reading experience *inside the site*, at `/series/inner-healing-202-trauma`. This is the primary deliverable. It is not a slide player; it is a readable, responsive page per session.
2. **PDF** — the takeaway a leader prints or hands out. Secondary.

The source material is six presentation decks, 7–30 MB each, not yet supplied to the repo.

**Why HTML and not the decks themselves:** the congregation reads on phones, usually inside the Facebook in-app browser, which frequently refuses to render PDFs inline and hands them off to a download or an external app instead. A 16:9 slide in a 375 px portrait viewport is also unreadable without pinch-zooming every page. HTML reflows, weighs kilobytes instead of megabytes, is deep-linkable, and its text is selectable, searchable and screen-reader accessible.

**The PDF keeps a real job:** printing, handing out, and reading offline. It is not the in-app experience.

---

## 1. Subject matter — read this before anything else

This series is about trauma: childhood and developmental wounds, neglect, betrayal by caregivers, loss, grief, fear, and generational cycles. Some readers will be in the middle of it.

- **Register is quiet and pastoral, not cinematic.** Most pages on this site open with a full-viewport navy gradient hero and animated headline. Do not do that here. The prior UI audit specifically flagged that emotionally heavy pages must not share the marketing register used elsewhere.
- **No dramatic or evocative imagery.** No stock photos of distress, no shadowy figures, no "documentary" styling. Restraint reads as trustworthy; atmosphere reads as exploitative.
- **The guide's own framing is the model:** *"This activity is not counseling. It is a simple prayer practice of bringing pain honestly before God."* Match that tone.
- **The pastoral-care note is mandatory and must appear before any download.** It already exists on the series page — keep its placement and substance:

  > These materials are offered for spiritual formation and group study. They are not counseling and are not a substitute for professional care. If you are carrying something heavy, we would be glad to walk with you — reach out to us — and we encourage seeking qualified professional help alongside prayer and community.

### Privacy — non-negotiable

The decks were produced for internal teaching and may contain material that must never be published. Strip all of it, including from alt text, file names, and commit messages:

- Named individuals presented as examples, case studies, or workshop responses
- Anything identifying a person's spiritual state, their absence from gatherings, or their home
- Any private residence used as a venue
- Any phone number as text — the church deliberately keeps its number out of text site-wide because scrapers were indexing it

If a session's teaching depends on a real person's story, it needs that person's explicit consent or it comes out.

---

## 2. Hard technical constraints

A deliverable that breaks any of these is wrong, however good it looks.

| Constraint | Detail |
| --- | --- |
| **Stack** | Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS 3.4 (`darkMode: 'class'`), `next-themes`, `lucide-react` available |
| **Static only** | Fully static SSG. No server runtime, no database, no API routes |
| **CSP blocks external hosts** | See below — this rules out most off-the-shelf viewers |
| **Build must pass** | `npm run build`, currently 51 static pages |
| **Weekly workflow** | Content is added by non-engineers dropping files. Do not add a step that needs a developer |

### The CSP, verbatim from `next.config.ts`

```
default-src 'self'
script-src  'self' 'unsafe-inline'
style-src   'self' 'unsafe-inline'
img-src     'self' data: https:
font-src    'self'
frame-src   https://www.youtube.com https://youtube.com https://www.facebook.com https://drive.google.com
connect-src 'self' https://formspree.io
media-src   'self' https://www.youtube.com
```

What this means in practice:

- **No CDN-hosted scripts or stylesheets.** No jsDelivr, no unpkg, no Google Fonts CDN. Custom fonts must be self-hosted via `next/font`, which self-hosts automatically.
- **No new iframe hosts** without a CSP edit. Do not propose an Office Online, SlideShare, or Speaker Deck embed.
- **No client-side slide library** (Reveal.js, Swiper, pptxjs, pdf.js). If a solution needs one, it is the wrong solution. The site's advantage is being light on cellular data.
- `img-src` does allow any `https:` image, but prefer local assets under `/public`.

---

## 3. What already exists — you are extending, not starting

`/series/[slug]` is built and live. **Do not rebuild it.** Its current section order:

1. Hero — title, subtitle, season
2. Intro paragraphs + a Scripture blockquote (Psalm 147:3)
3. Sessions — an ordered list of all six, each with number, title, optional date, and focus line
4. **Pastoral care note**
5. Downloads — one card per session, rendered *only* for sessions that have a `pdfUrl`
6. Next-step CTAs

The data lives in `data/series.ts`:

```ts
type SeriesSession = {
  number: number
  title: string
  focus: string
  date?: string        // 'YYYY-MM-DD', only where actually known
  pdfUrl?: string      // set once the compressed deck is committed
}

type TeachingSeries = {
  slug: string
  title: string
  subtitle: string
  season: string
  intro: string[]
  verse: { text: string; reference: string }
  sessions: SeriesSession[]
  coverImage?: string
}
```

Only session 1 has a known date (2026-05-24); the rest are listed by sequence. Sessions 2–6 currently have no `pdfUrl`, so no download cards render — that is intentional, not a bug.

**What is missing and what you are adding:** a per-session reading page, and the session content itself.

---

## 4. Proposed structure for the HTML deliverable

### Routing

Add `/series/[slug]/[session]` — e.g. `/series/inner-healing-202-trauma/the-many-faces-of-trauma`. The existing series page becomes the index; each session gets its own page. Keep `/series/[slug]` working exactly as it does now.

### Content as MDX, reusing the existing loader

Session bodies belong in `content/series/<series-slug>/<session-slug>.mdx`, loaded through the shared collection helper already in the repo:

```ts
// lib/mdx-collection.ts
createMdxCollection({ dir })  // → { getAll, getBySlug, getAdjacent }
```

It caches per process, validates frontmatter, and normalises dates. Reuse it rather than writing a third loader — the repo had two near-identical ones and they were just consolidated.

### Frontmatter spec — use these key names and no others

The lesson content had to be renamed once already because two documents invented different keys for the same field. Do not repeat that.

```yaml
---
session: 1
sessionSlug: 'the-many-faces-of-trauma'
seriesSlug: 'inner-healing-202-trauma'
title: 'The Many Faces of Trauma'
subtitle: 'Understanding how trauma forms and the many shapes it takes'
focus: 'Childhood, emotional, physical, generational, social and cultural trauma; loss and grief; pathways to healing.'
date: '2026-05-24'        # QUOTED. Omit entirely if unknown — do not guess.
sourcePages: '3-28'       # page range in the source deck
pdfUrl: '/series/inner-healing-202-trauma/session-1.pdf'
---
```

`date` **must be quoted**. Unquoted YAML dates parse as `Date` objects, which previously produced `Invalid Date` downstream and silently removed content from the page. The loader now throws a clear build error instead, but quote it anyway.

### Body structure

Translate each deck into a reading sequence, not a slide carousel. Per session:

- An opening purpose or focus statement, set apart the way the Foundation Guide sets its `PURPOSE` block
- Teaching sections under real `<h2>` / `<h3>` headings — **not styled `<p>` elements**; heading structure is how screen readers and keyboard users navigate
- Scripture given a distinct visual treatment from commentary. Scripture is the most important content type on this site and currently has no signature — a designed blockquote here is welcome
- Reflection questions and practical challenges as their own blocks
- Anything marked *Leader's Note* in the source clearly separated as guidance for the teacher, not instruction to the reader
- A closing prayer or response moment where the deck has one

Keep prose in one readable column (`max-w-3xl`, as the sermon pages do). Do not reproduce slide-by-slide pagination — a slide deck's page breaks are an artefact of projection, not of reading.

---

## 5. Design system to work within

Do not introduce a parallel palette. These are the existing tokens (`tailwind.config.ts`):

```
background  #FFFFFF      foreground  #0F172A
navy        #102544      navy-soft   #1E3A5F
muted       #F8FAFC      border      #E2E8F0
text-soft   #475569      amber-300   #FCD34D  (dark-mode accent)
```

Verified palette from the printed Foundation Guide, for keeping web and print in one family:

```
--guide-cream  #FAF7F0
--guide-navy   #03194C
--guide-gold   #C39A38
```

Established patterns to reuse rather than reinvent:

- **`Section` primitive** — `py-16 md:py-24`, inner wrapper `mx-auto max-w-content px-4 sm:px-6 lg:px-8` (`max-w-content` = 72rem). The site's strongest systemic element; use it.
- **The eyebrow signature** — uppercase, `tracking-[0.18em]`, `text-navy dark:text-amber-300`. The site's most recognisable typographic move.
- **`.sermon-prose`** in `app/globals.css` styles MDX bodies (`h2`, `h3`, `p`, `blockquote`, `ul`, `strong`, `hr`, each with a `.dark` variant). Extend this class rather than adding a competing prose system — and if you add an element type, add its `.dark` variant in the same commit. A missing `h3` dark variant recently rendered headings at 1.32:1 contrast, effectively invisible.
- **`shadow-calm` / `shadow-glow`**, and `--header-h: 65px` for sticky offsets and `scroll-padding-top`.

If the series needs its own accent to distinguish it, propose one token and argue for it. Do not restyle the site.

---

## 6. Accessibility — required, not a follow-up

- **Both themes, every surface.** Dark mode is first-class here. Check contrast in both; a light-mode-only design will be rejected. For reference, current passing values on this page are ~10.15:1 for body text on a card and ~10.63:1 for the session badge.
- **WCAG AA minimum** — 4.5:1 for body text, 3:1 for large text.
- **Real heading hierarchy**, in order, no level skips.
- **16 px minimum body text.** Anything under 16 px on a form input triggers iOS Safari auto-zoom.
- **44 × 44 px minimum touch targets.**
- **Focus states already exist globally** via a `:focus-visible` rule in `globals.css` — do not remove or override it without replacing it.
- **`prefers-reduced-motion` is handled globally.** Any new animation must respect it.
- **Decorative glyphs get `aria-hidden`**; use `lucide-react` icons rather than `✦ ✛ → ↗` characters.
- **Decorative images take `alt=""`**; meaningful ones get real alt text. Do not repeat the adjacent heading in alt text.
- **Portrait covers must not be cropped to a landscape band** — use `object-contain`. This was a real defect on the material cards.

---

## 7. Mobile first, genuinely

**Design at 375 px before anything else.** The dominant visitor is a congregation member on a phone arriving from a Facebook post, often inside the Facebook in-app browser, on cellular data.

- No horizontal page scroll at 375 px.
- Watch inline separators and pill rows — a `·` between wrapped items dangles at line ends. This already had to be fixed once on the home page banner.
- **Never `target="_blank"` to a raw file.** In the in-app browser it strands the user outside the site with no way back. If a download must open, it needs the `download` attribute and a real filename.
- Keep the payload small. This is the whole reason HTML beats a 3 MB PDF here.
- The congregation is bilingual Filipino/English. Do not assume English-only typography or line lengths, and do not machine-translate content.

---

## 8. The PDF deliverable

| Requirement | Detail |
| --- | --- |
| **Size** | Under ~3 MB each. Sources run 7–30 MB |
| **Do not over-compress** | Type must stay crisp. The Foundation Guide is 140 A5 pages at 2.0 MB — that is the quality bar |
| **Format** | Portrait reads better than 16:9 for a printed handout. A5 matches the Foundation Guide; A4 is fine if the content is dense |
| **Path** | `/public/series/inner-healing-202-trauma/session-N.pdf`, referenced from `pdfUrl` in frontmatter |
| **Metadata is mandatory** | Set Title, Author, Subject, Keywords |

**On metadata specifically:** two PDFs already shipped on this site carrying junk titles from their export tool — `Acts 242 Church Contact Block` and `The Fellowship of the Believers`. That string is what appears in the browser tab, in download managers, and in some search results. Set it properly:

```
Title:    Inner Healing 202: Trauma — Session N: <Title>
Author:   Acts 242 Church of Christ
Subject:  A teaching series on understanding trauma and finding healing in Christ
Keywords: inner healing, trauma, discipleship, Bible study, Acts 242, Parañaque
```

The PDF also carries the Church Use Notice terms: free to use, print and reproduce for personal study, one-on-one discipleship, small group gatherings and church ministry within Acts 242 with proper permission from church leadership; not for sale, republication or commercial use without written permission.

---

## 9. Explicitly out of scope

- Any change to the CSP, or any new external host
- Rebuilding `/series/[slug]`, or changing the `data/series.ts` shape without updating every consumer
- Any client-side slide, PDF or PPTX rendering library
- Restyling the site's shared palette, `Section` primitive, or header
- Any other page on the site
- Publishing a `.pptx` — it is an editable source format and conflicts with the Church Use Notice

---

## 10. Deliverables

1. `content/series/inner-healing-202-trauma/*.mdx` — six session files, frontmatter per §4
2. A session page at `/series/[slug]/[session]` reusing `Section`, `.sermon-prose` and the existing tokens
3. Session links added to the existing series index page (section 3 of the current page)
4. Six compressed PDFs under `/public/series/inner-healing-202-trauma/`, metadata set
5. `data/series.ts` updated with each session's `pdfUrl` and `sessionSlug`

## 11. Definition of done

- `npm run build` passes
- Every page reviewed at 375 px and desktop, in light **and** dark mode
- AA contrast verified in both themes, with measured values
- Heading structure is real and in order
- No new CSP hosts; no external scripts, fonts or stylesheets
- No `target="_blank"` to a raw file
- Pastoral-care note appears before any download
- Privacy pass done per §1 — no named individuals, no addresses, no phone number as text
- Every internal link and anchor resolves
- Each PDF under ~3 MB with correct metadata

## 12. Open questions the church still owes

Answer these before finalising; do not guess:

1. **Session dates for 2–6.** Only session 1 carries a date (2026-05-24). The minutes say the series ran across eight Sundays from May with two closing sessions in August. Without dates, sessions stay listed by sequence.
2. **Are there more than six sessions?** Session 1's closing slide promises four further themes — Comfort and God's Presence, Peace and Restoration, Renewal and Transformation, Strength Through Weakness — but only six decks exist. If more are coming, the structure should accommodate them from the start.
3. **Is any session's content still under revision?** The Church Use Notice states all lesson content remains subject to review.
