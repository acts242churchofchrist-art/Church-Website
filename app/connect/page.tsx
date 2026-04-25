'use client'

import { useState } from 'react'
import { Section } from '@/components/layout/section'
import { PageHero } from '@/components/sections/page-hero'
import { SocialLinks } from '@/components/sections/social-links'
import { ButtonLink } from '@/components/ui/button-link'
import { FormLabel, FormInput, FormTextarea, FormCheckbox } from '@/components/ui/form-field'
import { siteConfig } from '@/data/site'

export default function ConnectPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch(siteConfig.talkToAPastorFormUrl, {
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
          eyebrow="Connect"
          title="Take your next step"
          description="If you have a question, want to talk to a pastor, or are ready to begin discipleship, we would be glad to hear from you."
        />
      </Section>

      {/* Contact entry cards */}
      <Section className="bg-muted">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">New here</p>
            <h2 className="mt-3 text-xl font-semibold text-foreground">First time or exploring faith</h2>
            <p className="mt-3 text-sm leading-7 text-text-soft">
              If you are visiting for the first time or curious about Christianity, fill out a short welcome form. We would love to know you and follow up personally.
            </p>
            <ButtonLink href="/welcome" variant="ghost" className="mt-6 px-0">
              Fill out a welcome form
            </ButtonLink>
          </div>

          <div className="rounded-3xl border border-border bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Prayer and counsel</p>
            <h2 className="mt-3 text-xl font-semibold text-foreground">Prayer request</h2>
            <p className="mt-3 text-sm leading-7 text-text-soft">
              Share a prayer request with our pastoral team. We will pray for you personally and follow up if you'd like.
            </p>
            <ButtonLink href="/prayer-request" variant="ghost" className="mt-6 px-0">
              Submit a prayer request
            </ButtonLink>
          </div>

          <div className="rounded-3xl border border-border bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Next step</p>
            <h2 className="mt-3 text-xl font-semibold text-foreground">Ready for baptism or discipleship</h2>
            <p className="mt-3 text-sm leading-7 text-text-soft">
              If you have gone through the lessons and are ready for water baptism, or want to begin one-on-one discipleship, let us know below.
            </p>
            <ButtonLink href="/discipleship/water-baptism" variant="ghost" className="mt-6 px-0">
              Learn about baptism
            </ButtonLink>
          </div>
        </div>

        <div className="mt-10">
          <SocialLinks />
        </div>
      </Section>

      {/* Talk to a pastor form */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Talk to a pastor</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">We would love to hear from you</h2>
              <p className="mt-4 text-base leading-8 text-text-soft">
                Fill out the form and we will get back to you within 48 hours. You can also reach us by email or phone.
              </p>
            </div>
            <div className="space-y-3 text-sm">
              <p>
                <span className="font-semibold text-foreground">Email: </span>
                <a href={`mailto:${siteConfig.email}`} className="text-navy hover:underline">{siteConfig.email}</a>
              </p>
              <p>
                <span className="font-semibold text-foreground">Phone / Text: </span>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="text-navy hover:underline">{siteConfig.phone}</a>
              </p>
              <p>
                <span className="font-semibold text-foreground">Messenger: </span>
                <a href={siteConfig.messengerUrl} target="_blank" rel="noopener noreferrer" className="text-navy hover:underline">Facebook Messenger</a>
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-8">
            {status === 'success' ? (
              <div className="space-y-4 text-center">
                <p className="text-2xl font-bold tracking-tight text-foreground">Message received.</p>
                <p className="text-base leading-8 text-text-soft">
                  Thank you for reaching out. We will get back to you within 48 hours.
                </p>
                <ButtonLink href="/" variant="secondary" className="mt-2">Back to home</ButtonLink>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="hidden" name="form_type" value="talk_to_pastor" />
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                <div>
                  <FormLabel htmlFor="name" required>Your name</FormLabel>
                  <FormInput id="name" name="name" placeholder="Your name" required />
                </div>

                <div>
                  <FormLabel htmlFor="contact" required>Email or phone number</FormLabel>
                  <FormInput id="contact" name="contact" placeholder="Your email or phone" required />
                </div>

                <div>
                  <FormLabel htmlFor="message" required>What would you like to talk about?</FormLabel>
                  <FormTextarea id="message" name="message" placeholder="Share your question, request, or situation..." required rows={5} />
                </div>

                <div className="space-y-3 pt-1">
                  <FormCheckbox id="discipleship" name="discipleship" label="I am ready to begin discipleship" />
                  <FormCheckbox id="baptism" name="baptism" label="I am interested in water baptism" />
                  <FormCheckbox id="question" name="question" label="I have a question about faith" />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-600">
                    Something went wrong. Email us directly at{' '}
                    <a href={`mailto:${siteConfig.email}`} className="underline">{siteConfig.email}</a>.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>

      {/* Service times + location */}
      <Section className="bg-muted">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-white p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Service schedule</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">Join us in person</h2>
            <div className="mt-6 space-y-4">
              {siteConfig.serviceHours.map((s) => (
                <div key={s.day} className="flex items-start justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-semibold text-foreground">{s.day}</p>
                    <p className="text-xs text-text-soft">{s.description}</p>
                  </div>
                  <p className="shrink-0 text-sm text-text-soft">{s.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Find us</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">{siteConfig.fullChurchName}</h2>
            <p className="mt-3 text-sm leading-7 text-text-soft">{siteConfig.address}</p>
            <p className="mt-1 text-xs text-text-soft">Beside Security Bank Lopez Branch</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={siteConfig.mapsUrl} variant="secondary">Get directions</ButtonLink>
              <ButtonLink href={siteConfig.messengerUrl} variant="ghost">Message on Facebook</ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
