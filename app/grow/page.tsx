import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { Section } from '@/components/layout/section'
import { lessons } from '@/data/lessons'
import { materials } from '@/data/materials'
import type { MaterialItem } from '@/types/content'

export const metadata: Metadata = {
  title: 'Grow',
  description:
    'Grow as a disciple of Jesus — seven foundation lessons taken with a pastor or leader, water baptism, and the next steps after it. Resources for study, evangelism, and discipleship from Acts 242 Church of Christ.',
}

const foundationGuide = materials.find((m) => m.id === 'foundation-guide')
/** Everything except the hero guide, rendered as one flat grid per the design. */
const otherMaterials = materials.filter((m) => m.id !== 'foundation-guide')

/** Per-item eyebrow. The design labels the Filipino pieces specifically. */
const FILIPINO_IDS = new Set(['evangelism-trifold', 'evangelism-poster'])
function eyebrowFor(item: MaterialItem) {
  if (item.category === 'Evangelism Materials') {
    return FILIPINO_IDS.has(item.id) ? 'Evangelism · Filipino' : 'Evangelism'
  }
  return item.category
}

const JOURNEY = [
  {
    node: 'dot',
    title: 'The question',
    body: 'You ask it, or someone asks it of you.',
  },
  {
    node: 'seven',
    title: 'Seven lessons',
    body: 'Seeking God through to the Cross, with a pastor or leader.',
  },
  {
    node: 'square',
    title: 'Water baptism',
    body: 'The response the seven lessons lead to.',
  },
  {
    node: 'ring',
    title: 'Church membership',
    body: 'Belonging to this congregation, not visiting it.',
  },
  {
    node: 'ring',
    title: 'Your story, told',
    body: 'You share what God did, in your own words.',
  },
  {
    node: 'ring',
    title: 'Serve and go deeper',
    body: 'A ministry team, a series, and people you bring with you.',
  },
] as const

const AFTER_BAPTISM = [
  {
    title: 'Church membership',
    body: 'Commit to this local church rather than only attending it.',
    href: '/connect',
  },
  {
    title: 'Share your baptism story',
    body: 'Tell the church what God did, in your own words.',
    href: '/community#testimonies',
  },
  {
    title: 'Serve on a ministry team',
    body: 'Every member has a function. Ask a leader where yours fits.',
    href: '/connect',
  },
  {
    title: 'Inner Healing 202: Trauma',
    body: 'Six sessions on trauma and healing in Christ. May to August 2026.',
    href: '/series/inner-healing-202-trauma',
  },
  {
    title: 'Learn to share your faith',
    body: 'Take the trifold and the card, then go back to your street.',
    href: '#materials',
  },
]

const HOW_IT_WORKS = [
  {
    step: 'Step one',
    title: 'You reach out',
    body: 'Message us or fill in the form. One question is enough to start.',
  },
  {
    step: 'Step two',
    title: 'We pair you with someone',
    body: 'A pastor or church leader is assigned to sit with you through the lessons.',
  },
  {
    step: 'Step three',
    title: 'You go through the seven',
    body: 'In order, at your pace, with the Foundation Guide open in front of you.',
  },
]

/** Chips on the guide card. Kept literal because they describe the file, not the data. */
const GUIDE_CHIPS = ['PDF', 'A5', 'Edition 1 · 2026', 'English']

const CHECKLIST = [...lessons.map((l) => l.title), 'Water Baptism']

export default function GrowPage() {
  return (
    <>
      {/* ── Hero ──
          Cream and quiet rather than the cinematic navy the other pages use: the page
          opens by putting a question to the reader. */}
      <section className="border-b border-cream-border bg-cream dark:border-slate-800 dark:bg-navy">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-ink dark:text-gold">
            Grow
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.08] text-navy sm:text-5xl lg:text-6xl dark:text-white">
            What are you seeking?
          </h1>
          {/* Gold rule beside the intro, as in the design. */}
          <p className="mt-8 max-w-2xl border-l-2 border-gold pl-5 text-base leading-8 text-text-soft dark:text-slate-300">
            Seven lessons start at that question and end at the Cross. You don&apos;t take them
            alone — someone from the church sits with you for each one. And if you have already
            been baptized, the journey keeps going from there.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#foundations"
              className="inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft dark:bg-amber-300 dark:text-navy dark:hover:bg-amber-200"
            >
              Start the seven lessons
            </a>
            <a
              href="#keep-growing"
              className="inline-flex items-center justify-center rounded-full border border-cream-border bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:bg-cream-deep dark:border-slate-600 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
            >
              I&apos;m already baptized
            </a>
          </div>
        </div>
      </section>

      {/* ── The whole journey — a rail, not a row of cards ── */}
      <Section>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-ink dark:text-gold">
          The whole journey
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-2xl leading-snug text-foreground sm:text-3xl dark:text-slate-100">
          One path, from the first question to a life spent serving.
        </h2>

        {/* Phase rules: navy for the foundations half, gold for what follows. */}
        <div className="mt-10 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          <div>
            <div className="h-px w-full bg-navy dark:bg-slate-500" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-slate-200">
              Foundations
            </p>
            <p className="mt-1 text-sm text-text-soft dark:text-slate-400">
              New to faith, or starting over
            </p>
          </div>
          <div>
            <div className="h-px w-full bg-gold" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-ink dark:text-gold">
              Keep growing
            </p>
            <p className="mt-1 text-sm text-text-soft dark:text-slate-400">After the water</p>
          </div>
        </div>

        {/* Sideways on purpose — the arc is a sequence, not a menu. Native scroll-snap,
            so it swipes on a phone with no JavaScript. */}
        <ol className="deck-scroller mt-8 flex gap-8 overflow-x-auto overscroll-x-contain pb-2">
          {JOURNEY.map((stage) => (
            <li key={stage.title} className="w-44 shrink-0 snap-start">
              <span className="flex h-4 items-center" aria-hidden>
                {stage.node === 'dot' && <span className="h-2.5 w-2.5 rounded-full bg-navy dark:bg-slate-200" />}
                {stage.node === 'seven' && (
                  <span className="flex gap-1">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <span key={i} className="h-1.5 w-1.5 rounded-full bg-navy dark:bg-slate-200" />
                    ))}
                  </span>
                )}
                {stage.node === 'square' && <span className="h-2.5 w-2.5 bg-gold" />}
                {stage.node === 'ring' && (
                  <span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-navy dark:border-slate-300" />
                )}
              </span>
              <h3 className="mt-3 font-semibold leading-snug text-foreground dark:text-slate-100">
                {stage.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-text-soft dark:text-slate-400">
                {stage.body}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-text-soft dark:text-slate-400">
          Scroll the path sideways to see the whole arc.
        </p>
      </Section>

      {/* ── The two tracks, side by side ──
          The panels carry the before/after-baptism split: navy-topped white for the
          lessons, gold-topped cream for what comes after. */}
      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          {/* Foundations */}
          <div
            id="foundations"
            className="scroll-mt-16 rounded-3xl border border-cream-border border-t-2 border-t-navy bg-white p-7 dark:border-slate-700 dark:border-t-slate-400 dark:bg-slate-900 sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-slate-200">
              Foundations · eight steps
            </p>
            <h2 className="mt-3 font-display text-2xl text-foreground dark:text-slate-100">
              Start at the beginning
            </h2>
            <p className="mt-4 text-sm leading-7 text-text-soft dark:text-slate-400">
              Seven lessons and one decision. Each lesson ends where the next one begins, so they
              are taken in order — read the passages carefully and pray through what you learn.
            </p>

            <ol className="mt-7 divide-y divide-cream-border dark:divide-slate-700">
              {lessons.map((lesson) => (
                <li key={lesson.slug} className="group relative">
                  <Link href={`/discipleship/${lesson.slug}`} className="flex gap-4 py-4">
                    {/* The lesson's page-edge tone from the printed guide, carried as a
                        variable so the dark variant can win — the tones are deep blues
                        and an inline colour would vanish on a dark panel. */}
                    <span
                      aria-hidden
                      className="w-6 shrink-0 pt-0.5 text-xs font-bold tabular-nums text-[var(--edge)] dark:text-amber-300"
                      style={{ '--edge': lesson.edgeColour } as CSSProperties}
                    >
                      {String(lesson.lessonNumber).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-foreground group-hover:underline dark:text-slate-100">
                        {lesson.title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-text-soft dark:text-slate-400">
                        {lesson.arcLine}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>

            {/* The eighth step is a decision, not a lesson — hence its own treatment. */}
            <Link
              href="/discipleship/water-baptism"
              className="group mt-5 flex gap-4 rounded-2xl border border-gold/40 bg-cream p-4 transition hover:border-gold dark:border-amber-300/30 dark:bg-slate-800"
            >
              <span aria-hidden className="mt-1.5 h-2.5 w-2.5 shrink-0 bg-gold" />
              <span className="min-w-0">
                <span className="block font-semibold text-navy group-hover:underline dark:text-amber-300">
                  Water Baptism
                </span>
                <span className="mt-1 block text-sm leading-6 text-text-soft dark:text-slate-400">
                  The eighth step. Talk it through with a pastor first.
                </span>
              </span>
            </Link>

            <div className="mt-7">
              <Link
                href="/connect"
                className="inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft dark:bg-amber-300 dark:text-navy dark:hover:bg-amber-200"
              >
                Ask someone to walk me through it
              </Link>
              <p className="mt-4">
                <Link
                  href={`/discipleship/${lessons[0].slug}`}
                  className="text-sm font-semibold text-navy underline underline-offset-4 dark:text-amber-300"
                >
                  Or read Lesson 1 on your own
                </Link>
              </p>
            </div>
          </div>

          {/* Keep growing */}
          <div
            id="keep-growing"
            className="scroll-mt-16 rounded-3xl border border-cream-border border-t-2 border-t-gold bg-cream p-7 dark:border-slate-700 dark:border-t-amber-300 dark:bg-slate-900 sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-ink dark:text-gold">
              Keep growing · after baptism
            </p>
            <h2 className="mt-3 font-display text-2xl text-foreground dark:text-slate-100">
              Already baptized
            </h2>
            <p className="mt-4 text-sm leading-7 text-text-soft dark:text-slate-400">
              Baptism is not the finish line. These are the next steps at Acts 242 — take them in
              whatever order your season allows.
            </p>

            <ul className="mt-7 divide-y divide-cream-border dark:divide-slate-700">
              {AFTER_BAPTISM.map((item) => (
                <li key={item.title} className="group relative">
                  <Link href={item.href} className="flex gap-4 py-4">
                    <span
                      aria-hidden
                      className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border-[1.5px] border-navy dark:border-amber-300"
                    />
                    <span className="min-w-0">
                      <span className="block font-semibold text-foreground group-hover:underline dark:text-slate-100">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-text-soft dark:text-slate-400">
                        {item.body}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <Link
                href="/connect"
                className="inline-flex items-center justify-center rounded-full border border-cream-border bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:bg-cream-deep dark:border-slate-600 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
              >
                Talk to a pastor about serving
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ── How it works ── */}
      <Section className="border-t border-cream-border pt-14 dark:border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-ink dark:text-gold">
          How it works
        </p>
        <h2 className="mt-3 font-display text-2xl text-foreground sm:text-3xl dark:text-slate-100">
          You don&apos;t take these alone.
        </h2>

        <ol className="mt-10 grid gap-8 sm:grid-cols-2">
          {HOW_IT_WORKS.map((s) => (
            <li key={s.step}>
              <div className="h-px w-full bg-navy dark:bg-slate-500" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-slate-200">
                {s.step}
              </p>
              <h3 className="mt-2 font-semibold text-foreground dark:text-slate-100">{s.title}</h3>
              <p className="mt-2 text-sm leading-7 text-text-soft dark:text-slate-400">{s.body}</p>
            </li>
          ))}
        </ol>

        {/* ── The printable checklist ── */}
        <div className="mt-14 grid gap-7 rounded-3xl border border-cream-border bg-white p-7 lg:grid-cols-[1fr_1fr] lg:items-center dark:border-slate-700 dark:bg-slate-900 sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-ink dark:text-gold">
              Keep track on paper
            </p>
            <h3 className="mt-3 font-display text-2xl text-foreground dark:text-slate-100">
              The journey checklist
            </h3>
            <p className="mt-4 text-sm leading-7 text-text-soft dark:text-slate-400">
              One A5 sheet with all eight steps, a line for the date you finished each one, and
              room for your leader&apos;s name. Print it and keep it inside the guide.
            </p>
            <a
              href="/acts242-journey-checklist.pdf"
              download
              className="mt-6 inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft dark:bg-amber-300 dark:text-navy dark:hover:bg-amber-200"
            >
              Download the checklist · PDF
            </a>
          </div>

          <div className="rounded-2xl border border-cream-border bg-cream p-5 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-soft dark:text-slate-400">
              Preview
            </p>
            <ol className="mt-4 grid gap-x-5 gap-y-3 sm:grid-cols-2">
              {CHECKLIST.map((title, i) => {
                const isBaptism = i === CHECKLIST.length - 1
                return (
                  <li key={title} className="flex items-start gap-2.5">
                    <span
                      aria-hidden
                      className={`mt-0.5 h-3.5 w-3.5 shrink-0 rounded-[3px] border ${
                        isBaptism
                          ? 'border-gold bg-gold/15'
                          : 'border-navy/40 dark:border-slate-500'
                      }`}
                    />
                    <span
                      className={`text-sm leading-5 ${
                        isBaptism
                          ? 'font-semibold text-navy dark:text-amber-300'
                          : 'text-text-soft dark:text-slate-400'
                      }`}
                    >
                      <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span> {title}
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </Section>

      {/* ── Scripture band ── */}
      <section className="bg-navy dark:bg-slate-900">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <figure className="max-w-2xl border-l-2 border-gold pl-6">
            <blockquote className="font-display text-2xl leading-snug text-white sm:text-3xl">
              You will seek me and find me when you seek me with all your heart.
            </blockquote>
            <figcaption className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Jeremiah 29:13 · NIV
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Resources — #materials is a 301 target, do not rename ── */}
      <Section id="materials" className="scroll-mt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-ink dark:text-gold">
          Resources
        </p>
        <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl dark:text-slate-100">
          Everything the journey uses
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-text-soft dark:text-slate-400">
          Prepared by Acts 242 Church of Christ for personal study, one-on-one discipleship, and
          evangelism conversations.
        </p>

        {foundationGuide && (
          <div className="mt-10 grid gap-7 rounded-3xl border border-cream-border bg-white p-6 md:grid-cols-[minmax(0,320px)_1fr] md:items-start dark:border-slate-700 dark:bg-slate-900 sm:p-7">
            {/* The real V2 cover, portrait — not cropped into a landscape band. */}
            {foundationGuide.thumbnail && (
              <div className="relative aspect-[1/1.414] overflow-hidden rounded-2xl border border-cream-border bg-cream dark:border-slate-700 dark:bg-slate-800">
                <Image
                  src={foundationGuide.thumbnail}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 320px, 100vw"
                  className="object-contain"
                />
              </div>
            )}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-ink dark:text-gold">
                Start here
              </p>
              <h3 className="mt-3 font-display text-2xl text-foreground sm:text-3xl dark:text-slate-100">
                {foundationGuide.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {GUIDE_CHIPS.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-cream-border px-3 py-1 text-xs font-medium text-text-soft dark:border-slate-600 dark:text-slate-300"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-base leading-8 text-text-soft dark:text-slate-400">
                {foundationGuide.description}
              </p>
              <a
                href={foundationGuide.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft dark:bg-amber-300 dark:text-navy dark:hover:bg-amber-200"
              >
                {foundationGuide.actionLabel}
              </a>
              {/* Mirrors the Church Use Notice on page ii of the guide. */}
              <p className="mt-5 text-xs leading-6 text-text-soft dark:text-slate-400">
                Free to use, print, and reproduce for personal study, one-on-one discipleship,
                small group gatherings, and church ministry within Acts 242, with proper permission
                from church leadership. Full terms are in the Church Use Notice on page ii.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {otherMaterials.map((item) => {
            const isPdf = item.href.endsWith('.pdf')
            return (
              <article
                key={item.id}
                className="group relative flex gap-4 rounded-3xl border border-cream-border bg-white p-5 transition hover:border-navy/25 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-amber-300/40"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-cream-border bg-cream dark:border-slate-700 dark:bg-slate-800">
                  {item.thumbnail && (
                    <Image
                      src={item.thumbnail}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-ink dark:text-gold">
                    {eyebrowFor(item)}
                  </p>
                  <h3 className="mt-1.5 font-semibold text-foreground dark:text-slate-100">
                    {item.comingSoon ? (
                      item.title
                    ) : (
                      <Link
                        href={item.href}
                        target={isPdf ? '_blank' : undefined}
                        rel={isPdf ? 'noopener noreferrer' : undefined}
                        className="after:absolute after:inset-0 after:content-[''] hover:underline"
                      >
                        {item.title}
                      </Link>
                    )}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-text-soft dark:text-slate-400">
                    {item.description}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-navy dark:text-amber-300">
                    {item.comingSoon ? (
                      <span className="text-text-soft dark:text-slate-400">
                        Not yet available for download
                      </span>
                    ) : (
                      item.actionLabel
                    )}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </Section>

      {/* ── Closing ── */}
      <Section className="border-t border-cream-border bg-cream dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl text-foreground sm:text-3xl dark:text-slate-100">
              Not sure where you are on this?
            </h2>
            <p className="mt-3 text-base leading-8 text-text-soft dark:text-slate-400">
              Tell us where you are and we will meet you there. No form to finish, no commitment to
              make first.
            </p>
          </div>
          <Link
            href="/connect"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft dark:bg-amber-300 dark:text-navy dark:hover:bg-amber-200"
          >
            Talk to a pastor
          </Link>
        </div>
      </Section>
    </>
  )
}
