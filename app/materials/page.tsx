import type { Metadata } from 'next'
import { Section } from '@/components/layout/section'
import { PageHero } from '@/components/sections/page-hero'
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
      <Section>
        <PageHero
          eyebrow="Materials"
          title="Church resources and study materials"
          description="Download and share these resources freely — for personal study, evangelism conversations, and discipleship. All materials are prepared by Acts 242 Church of Christ."
        />
      </Section>

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
