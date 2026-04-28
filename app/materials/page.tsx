import Link from 'next/link'
import type { Metadata } from 'next'
import { Section } from '@/components/layout/section'
import { MaterialCard } from '@/components/cards/material-card'
import { MaterialHeroCard } from '@/components/cards/material-hero-card'
import { materials } from '@/data/materials'

export const metadata: Metadata = {
  title: 'Materials',
  description:
    'Download and share resources from Acts 242 Church of Christ — discipleship guides, evangelism materials, and sermon archives.',
}

const foundationGuide = materials.find((m) => m.id === 'foundation-guide')
const foundationExtras = materials.filter(
  (m) => m.category === 'Foundation and Discipleship' && m.id !== 'foundation-guide'
)
const evangelismMaterials = materials.filter((m) => m.category === 'Evangelism Materials')
const sermonMaterials = materials.filter((m) => m.category === 'Sermon Materials')

export default function MaterialsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-navy text-white">
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-content px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Resources</p>
            <h1 className="mt-4 animate-fade-up-delay-1 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Study, share,<br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-white bg-clip-text text-transparent">and grow in the Word.</span>
            </h1>
            <p className="mt-6 max-w-2xl animate-fade-up-delay-2 text-lg leading-8 text-white/85 sm:text-xl">
              Download and share these resources freely — for personal study, evangelism conversations, and discipleship. All materials are prepared by Acts 242 Church of Christ.
            </p>
            <div className="mt-10 flex animate-fade-up-delay-3 flex-wrap gap-4">
              <Link href="/foundation-guide.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-amber-300 px-7 py-3 text-sm font-semibold text-navy shadow-glow transition hover:bg-amber-200">
                Open Foundation Guide →
              </Link>
              <Link href="/sermons" className="inline-flex items-center justify-center rounded-full bg-white/10 px-7 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20">
                Browse sermons
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Foundation Guide — Featured Hero ── */}
      {foundationGuide && (
        <Section className="bg-muted dark:bg-slate-900">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
            Start Here
          </p>
          <MaterialHeroCard item={foundationGuide} />
        </Section>
      )}

      {/* ── Extra Foundation Materials (if any added in future) ── */}
      {foundationExtras.length > 0 && (
        <Section>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
              Foundation and Discipleship
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">
              More discipleship resources
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {foundationExtras.map((item) => (
              <MaterialCard key={item.id} item={item} />
            ))}
          </div>
        </Section>
      )}

      {/* ── Evangelism Materials ── */}
      <Section>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
            Evangelism Materials
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">
            Share the gospel
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-text-soft dark:text-slate-400">
            These materials are designed for first conversations — hand them out after a
            conversation, at the gate, in your community, or after Sunday service.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {evangelismMaterials.map((item) => (
            <MaterialCard key={item.id} item={item} />
          ))}
        </div>
      </Section>

      {/* ── Sermon Materials ── */}
      <Section className="bg-muted dark:bg-slate-900">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
            Sermon Materials
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">
            Continue in the teaching
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-text-soft dark:text-slate-400">
            Browse weekly sermon outlines, brochures, and recordings from Acts 242 Church of
            Christ.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sermonMaterials.map((item) => (
            <MaterialCard key={item.id} item={item} />
          ))}
        </div>
      </Section>
    </>
  )
}
