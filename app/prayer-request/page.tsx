'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Section } from '@/components/layout/section'
import { VerseBlock } from '@/components/sections/verse-block'
import { ButtonLink } from '@/components/ui/button-link'
import { FormLabel, FormInput, FormTextarea, FormCheckbox } from '@/components/ui/form-field'
import { siteConfig } from '@/data/site'

export default function PrayerRequestPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch(siteConfig.prayerRequestFormUrl, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-navy text-white">
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-content px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Prayer</p>
            <h1 className="mt-4 animate-fade-up-delay-1 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Cast your<br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-white bg-clip-text text-transparent">anxiety on Him.</span>
            </h1>
            <p className="mt-6 max-w-2xl animate-fade-up-delay-2 text-lg leading-8 text-white/85 sm:text-xl">
              Share your prayer request with our pastoral team. We will pray for you personally and follow up if you would like.
            </p>
          </div>
        </div>
      </section>

      <Section className="bg-muted dark:bg-slate-900">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <VerseBlock
              reference="1 Peter 5:7"
              text="Cast all your anxiety on him because he cares for you."
            />
            <div className="rounded-3xl border border-border bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Confidential</p>
              <p className="mt-3 text-sm leading-7 text-text-soft dark:text-slate-400">
                Submissions are seen only by our pastoral team. We will pray for your request and reach out if you ask us to.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
            {status === 'success' ? (
              <div className="space-y-4 text-center">
                <p className="text-2xl font-bold tracking-tight text-foreground dark:text-slate-100">Thank you.</p>
                <p className="text-base leading-8 text-text-soft dark:text-slate-400">
                  We have received your prayer request. Our pastoral team will be praying for you. If you asked to be contacted, we will be in touch.
                </p>
                <ButtonLink href="/" variant="secondary" className="mt-2">
                  Back to home
                </ButtonLink>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="form_type" value="prayer_request" />
                {/* Honeypot for spam */}
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                <div>
                  <FormLabel htmlFor="name">Your name (optional)</FormLabel>
                  <FormInput id="name" name="name" placeholder="First name or anonymous" />
                </div>

                <div>
                  <FormLabel htmlFor="prayer_request" required>Prayer request</FormLabel>
                  <FormTextarea
                    id="prayer_request"
                    name="prayer_request"
                    placeholder="Share what you would like us to pray for..."
                    required
                    rows={6}
                  />
                </div>

                <div className="space-y-3">
                  <FormCheckbox
                    id="contact_me"
                    name="contact_me"
                    label="I would like someone from the church to contact me"
                  />
                  <FormCheckbox
                    id="confidential"
                    name="confidential"
                    label="This is confidential — for pastors only"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-600">
                    Something went wrong. Please try again or email us at{' '}
                    <a href={`mailto:${siteConfig.email}`} className="underline">{siteConfig.email}</a>.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft disabled:opacity-60 dark:bg-amber-300 dark:text-navy dark:hover:bg-amber-200"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send prayer request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
