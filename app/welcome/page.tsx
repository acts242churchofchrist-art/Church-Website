'use client'

import { useState } from 'react'
import { Section } from '@/components/layout/section'
import { PageHero } from '@/components/sections/page-hero'
import { VerseBlock } from '@/components/sections/verse-block'
import { ButtonLink } from '@/components/ui/button-link'
import { FormLabel, FormInput, FormCheckbox } from '@/components/ui/form-field'
import { siteConfig } from '@/data/site'

export default function WelcomePage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch(siteConfig.welcomeFormUrl, {
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
          eyebrow="Welcome"
          title="We're glad you're here"
          description="If today is your first time with Acts 242, we would love to know you, answer your questions, and walk with you into your next step."
          actions={
            <>
              <ButtonLink href="/discipleship">Start foundation lessons</ButtonLink>
              <ButtonLink href="/connect" variant="secondary">Reach out to us</ButtonLink>
            </>
          }
        />
      </Section>

      <Section className="bg-muted">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">First time here?</p>
            <h2 className="mt-3 text-xl font-semibold text-foreground">What to expect</h2>
            <p className="mt-3 text-sm leading-7 text-text-soft">
              A Sunday service at Acts 242 is warm, simple, and centered on God's Word. Expect worship, prayer, the Lord's Supper, and a Bible-centered message. Come as you are.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              {siteConfig.serviceHours.map((s) => (
                <p key={s.day}>
                  <span className="font-semibold text-foreground">{s.day}</span>{' '}
                  <span className="text-text-soft">{s.time}</span>
                  <span className="ml-2 text-xs text-text-soft">— {s.description}</span>
                </p>
              ))}
              <p className="pt-1 text-xs text-text-soft">{siteConfig.address}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Want to study?</p>
            <h2 className="mt-3 text-xl font-semibold text-foreground">One-on-one Bible study</h2>
            <p className="mt-3 text-sm leading-7 text-text-soft">
              We offer personal Bible study for anyone wanting to grow in God's Word. Reach out and we'll match you with someone from our team.
            </p>
            <ButtonLink href="/discipleship" variant="ghost" className="mt-6 px-0">
              Start the foundation lessons
            </ButtonLink>
          </div>

          <div className="rounded-3xl border border-border bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Looking for prayer?</p>
            <h2 className="mt-3 text-xl font-semibold text-foreground">We would love to pray</h2>
            <p className="mt-3 text-sm leading-7 text-text-soft">
              Share a prayer request and our pastoral team will lift it up with you — personally and confidentially.
            </p>
            <ButtonLink href="/prayer-request" variant="ghost" className="mt-6 px-0">
              Submit a prayer request
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <VerseBlock
              reference="Matthew 18:20"
              text="For where two or three gather in my name, there am I with them."
            />
            <div className="rounded-3xl border border-border bg-white p-6">
              <p className="text-sm font-semibold text-foreground">2026 Theme</p>
              <p className="mt-2 text-xl font-bold tracking-tight text-navy">{siteConfig.yearTheme}</p>
              <p className="mt-2 text-sm text-text-soft">
                This year at Acts 242, everything we study, preach, and build is centered on Jesus — who He is, what He did, and what it means to follow Him.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Let us know you were here</p>
            <p className="mt-2 text-base text-text-soft">Fill this out and someone from our team will follow up with you.</p>

            {status === 'success' ? (
              <div className="mt-6 space-y-3 text-center">
                <p className="text-xl font-bold tracking-tight text-foreground">Welcome to Acts 242.</p>
                <p className="text-sm leading-7 text-text-soft">We received your details and will be in touch soon. We're glad you're here.</p>
                <ButtonLink href="/discipleship" variant="secondary" className="mt-2">Start the lessons</ButtonLink>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <input type="hidden" name="form_type" value="welcome" />
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                <div>
                  <FormLabel htmlFor="name" required>Your name</FormLabel>
                  <FormInput id="name" name="name" placeholder="Your name" required />
                </div>

                <div>
                  <FormLabel htmlFor="phone" required>Phone number</FormLabel>
                  <FormInput id="phone" name="phone" type="tel" placeholder="e.g. 09XX XXX XXXX" required />
                </div>

                <div>
                  <FormLabel htmlFor="email">Email (optional)</FormLabel>
                  <FormInput id="email" name="email" type="email" placeholder="your@email.com" />
                </div>

                <div className="space-y-3 pt-1">
                  <FormCheckbox id="first_time" name="first_time" label="This is my first time attending a church" />
                  <FormCheckbox id="bible_study" name="bible_study" label="I would like to study the Bible" />
                  <FormCheckbox id="prayer" name="prayer" label="I would like someone to pray for me" />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-600">
                    Something went wrong. Email us at{' '}
                    <a href={`mailto:${siteConfig.email}`} className="underline">{siteConfig.email}</a>.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Sending...' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
