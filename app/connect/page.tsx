'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Section } from '@/components/layout/section'
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
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-navy text-white">
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-content px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Connect</p>
            <h1 className="mt-4 animate-fade-up-delay-1 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Take your<br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-white bg-clip-text text-transparent">next step.</span>
            </h1>
            <p className="mt-6 max-w-2xl animate-fade-up-delay-2 text-lg leading-8 text-white/85 sm:text-xl">
              If you have a question, want to talk to a pastor, or are ready to begin discipleship — we would be glad to hear from you.
            </p>
            <div className="mt-10 flex animate-fade-up-delay-3 flex-wrap gap-4">
              <a href="#form" className="inline-flex items-center justify-center rounded-full bg-amber-300 px-7 py-3 text-sm font-semibold text-navy shadow-glow transition hover:bg-amber-200">
                Fill out a form →
              </a>
              <a href={siteConfig.messengerUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-white/10 px-7 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20">
                Message on Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact entry cards */}
      <Section className="bg-muted dark:bg-slate-900">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:border-navy/30 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-amber-300/40">
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-navy/5 transition group-hover:bg-navy/10 dark:bg-amber-300/5" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">New here</p>
              <h2 className="mt-3 text-xl font-semibold text-foreground dark:text-slate-100">First time or exploring faith</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft dark:text-slate-400">
                If you are visiting for the first time or curious about Christianity, fill out a short welcome form. We would love to know you and follow up personally.
              </p>
              <a href="/welcome" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-navy transition group-hover:gap-2 dark:text-amber-300">
                Fill out a welcome form <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:border-navy/30 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-amber-300/40">
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-navy/5 transition group-hover:bg-navy/10 dark:bg-amber-300/5" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Prayer and counsel</p>
              <h2 className="mt-3 text-xl font-semibold text-foreground dark:text-slate-100">Prayer request</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft dark:text-slate-400">
                Share a prayer request with our pastoral team. We will pray for you personally and follow up if you&apos;d like.
              </p>
              <a href="/prayer-request" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-navy transition group-hover:gap-2 dark:text-amber-300">
                Submit a prayer request <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:border-navy/30 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-amber-300/40">
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-navy/5 transition group-hover:bg-navy/10 dark:bg-amber-300/5" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Next step</p>
              <h2 className="mt-3 text-xl font-semibold text-foreground dark:text-slate-100">Ready for baptism or discipleship</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft dark:text-slate-400">
                If you have gone through the lessons and are ready for water baptism, or want to begin one-on-one discipleship, let us know below.
              </p>
              <a href="/discipleship/water-baptism" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-navy transition group-hover:gap-2 dark:text-amber-300">
                Learn about baptism <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <SocialLinks />
        </div>
      </Section>

      {/* Talk to a pastor form */}
      <Section id="form">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Talk to a pastor</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">We would love to hear from you</h2>
              <p className="mt-4 text-base leading-8 text-text-soft dark:text-slate-400">
                Fill out the form and we will get back to you within 48 hours. You can also reach us by email or phone.
              </p>
            </div>
            <div className="space-y-3 text-sm">
              <p>
                <span className="font-semibold text-foreground dark:text-slate-200">Email: </span>
                <a href={`mailto:${siteConfig.email}`} className="text-navy hover:underline dark:text-amber-300">{siteConfig.email}</a>
              </p>
              <p>
                <span className="font-semibold text-foreground dark:text-slate-200">Phone / Text: </span>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="text-navy hover:underline dark:text-amber-300">{siteConfig.phone}</a>
              </p>
              <p>
                <span className="font-semibold text-foreground dark:text-slate-200">Messenger: </span>
                <a href={siteConfig.messengerUrl} target="_blank" rel="noopener noreferrer" className="text-navy hover:underline dark:text-amber-300">Facebook Messenger</a>
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
            {status === 'success' ? (
              <div className="space-y-4 text-center">
                <p className="text-2xl font-bold tracking-tight text-foreground dark:text-slate-100">Message received.</p>
                <p className="text-base leading-8 text-text-soft dark:text-slate-400">
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
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft disabled:opacity-60 dark:bg-amber-300 dark:text-navy dark:hover:bg-amber-200"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>

      {/* Service times + location */}
      <Section className="bg-muted dark:bg-slate-900">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border border-t-4 border-t-navy bg-white p-8 dark:border-slate-700 dark:bg-slate-800 dark:border-t-amber-300">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Service schedule</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground dark:text-slate-100">Join us in person</h2>
            <div className="mt-6 space-y-4">
              {siteConfig.serviceHours.map((s) => (
                <div key={s.day} className="flex items-start justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0 dark:border-slate-700">
                  <div>
                    <p className="font-semibold text-foreground dark:text-slate-200">{s.day}</p>
                    <p className="text-xs text-text-soft dark:text-slate-400">{s.description}</p>
                  </div>
                  <p className="shrink-0 text-sm text-text-soft dark:text-slate-400">{s.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border border-t-4 border-t-amber-500 bg-white p-8 dark:border-slate-700 dark:bg-slate-800 dark:border-t-amber-300">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Find us</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground dark:text-slate-100">{siteConfig.fullChurchName}</h2>
            <p className="mt-3 text-sm leading-7 text-text-soft dark:text-slate-400">{siteConfig.address}</p>
            <p className="mt-1 text-xs text-text-soft dark:text-slate-400">Beside Security Bank Lopez Branch</p>
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
