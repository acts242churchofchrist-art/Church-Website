import type { Metadata } from 'next'
import { Section } from '@/components/layout/section'
import { ButtonLink } from '@/components/ui/button-link'

// Next currently ignores metadata exported from not-found.tsx (vercel/next.js#49030).
// Kept so the title is correct if that is ever fixed; verify in a build before relying on it.
export const metadata: Metadata = {
  title: 'Page not found',
}

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl py-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl dark:text-slate-100">
          We could not find that page
        </h1>
        <p className="mt-6 text-lg leading-8 text-text-soft dark:text-slate-400">
          The link may be out of date, or the page may have moved. Here is where most people are
          heading.
        </p>

        {/* Most 404s here are a stale sermon link shared on Facebook, so sermons leads. */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <ButtonLink href="/sermons" className="justify-center py-4">
            Browse sermons
          </ButtonLink>
          <ButtonLink href="/welcome" variant="secondary" className="justify-center py-4">
            Plan your visit
          </ButtonLink>
          <ButtonLink href="/connect" variant="secondary" className="justify-center py-4">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </Section>
  )
}
