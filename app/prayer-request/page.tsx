'use client'

import { useState } from 'react'
import { Section } from '@/components/layout/section'
import { PageHero } from '@/components/sections/page-hero'
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
      <Section>
        <PageHero
          eyebrow="Prayer Request"
          title="Cast your anxiety on Him"
          description="We would be honored to pray with you and for you. Share your prayer request below — our pastoral team will lift it up with you."
          actions={<ButtonLink href="/connect" variant="secondary">Other ways to connect</ButtonLink>}
        />
      </Section>

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
