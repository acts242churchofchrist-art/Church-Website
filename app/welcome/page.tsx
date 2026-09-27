'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Section } from '@/components/layout/section'
import { VerseBlock } from '@/components/sections/verse-block'
import { ButtonLink } from '@/components/ui/button-link'
import { FormLabel, FormInput, FormCheckbox } from '@/components/ui/form-field'
import { siteConfig } from '@/data/site'

/**
 * Answers are grounded in what the site already states — service times from
 * siteConfig.serviceHours, the "come as you are" welcome copy above, the Lord's Supper,
 * the foundation lessons, and the Children's Ministry in data/ministries.ts.
 *
 * TODO (needs the church to confirm before these can be added): parking arrangements,
 * whether visitors are asked to stand or introduce themselves, and how giving is
 * handled for guests. Do not invent answers to those — a first-time visitor acting on a
 * wrong one arrives to a surprise.
 */
const faqs = [
  {
    q: 'What time should I arrive?',
    a: `Sunday worship runs ${siteConfig.serviceHours[0].time}. Arriving ten to fifteen minutes early gives you time to find a seat and say hello, but you are welcome whenever you get here.`,
  },
  {
    q: 'How long is the service?',
    a: 'About two and a half hours on a Sunday, including worship, prayer, the Lord’s Supper, and the message. The Friday midweek devotional is shorter.',
  },
  {
    q: 'What should I wear?',
    a: 'Come as you are. You will see everything from barong and dresses to jeans and a shirt, and nobody will think twice about it.',
  },
  {
    q: 'Where exactly are you?',
    a: `${siteConfig.address}. The "Get directions" link above opens the map straight to our door.`,
  },
  {
    q: 'Is there anything for my children?',
    a: 'Yes — we have a Children’s Ministry, and children are also welcome to stay with you in the service. Find one of the team on a Sunday and they will point you to the right place.',
  },
  {
    q: 'Do I need to know anything about the Bible first?',
    a: 'Not at all. Many people come with no background whatsoever. If you would like somewhere to start, the seven foundation lessons are written for exactly that.',
  },
  {
    q: 'Can I take part in the Lord’s Supper?',
    a: 'The Lord’s Supper is shared each Sunday by those who have put their faith in Christ. If you are still exploring, you are very welcome to let it pass and simply observe.',
  },
  {
    q: 'Can I just come and watch online first?',
    a: 'Of course. We livestream on Facebook and YouTube, and every past message is on the sermons page to read, watch, and download.',
  },
  {
    q: 'Can I ask for prayer without coming in person?',
    a: 'Yes. You can send a prayer request through the site at any time, anonymously if you prefer, and our pastoral team will pray for you.',
  },
]

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
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-navy text-white">
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-content px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Welcome</p>
            <h1 className="mt-4 animate-fade-up-delay-1 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              We are glad<br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-white bg-clip-text text-transparent">you are here.</span>
            </h1>
            <p className="mt-6 max-w-2xl animate-fade-up-delay-2 text-lg leading-8 text-white/85 sm:text-xl">
              If today is your first time with Acts 242, we would love to know you, answer your questions, and walk with you into the next step.
            </p>
          </div>
        </div>
      </section>

      <Section className="bg-muted dark:bg-slate-900">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">First time here?</p>
            <h2 className="mt-3 text-xl font-semibold text-foreground dark:text-slate-100">What to expect</h2>
            <p className="mt-3 text-sm leading-7 text-text-soft dark:text-slate-400">
              A Sunday service at Acts 242 is warm, simple, and centered on God&apos;s Word. Expect worship, prayer, the Lord&apos;s Supper, and a Bible-centered message. Come as you are.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              {siteConfig.serviceHours.map((s) => (
                <p key={s.day}>
                  <span className="font-semibold text-foreground dark:text-slate-200">{s.day}</span>{' '}
                  <span className="text-text-soft dark:text-slate-400">{s.time}</span>
                  <span className="ml-2 text-xs text-text-soft dark:text-slate-400">— {s.description}</span>
                </p>
              ))}
              <p className="pt-1 text-xs text-text-soft dark:text-slate-400">{siteConfig.address}</p>
            </div>
            {/* A link on the 12px address line would be under the 44px touch minimum,
                so the tap target is its own control. */}
            <ButtonLink href={siteConfig.mapsUrl} variant="ghost" className="mt-4 px-0">
              Get directions →
            </ButtonLink>
          </div>

          <div className="rounded-3xl border border-border bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Want to study?</p>
            <h2 className="mt-3 text-xl font-semibold text-foreground dark:text-slate-100">One-on-one Bible study</h2>
            <p className="mt-3 text-sm leading-7 text-text-soft dark:text-slate-400">
              We offer personal Bible study for anyone wanting to grow in God&apos;s Word. Reach out and we&apos;ll match you with someone from our team.
            </p>
            <ButtonLink href="/grow#foundations" variant="ghost" className="mt-6 px-0">
              Start the foundation lessons
            </ButtonLink>
          </div>

          <div className="rounded-3xl border border-border bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Looking for prayer?</p>
            <h2 className="mt-3 text-xl font-semibold text-foreground dark:text-slate-100">We would love to pray</h2>
            <p className="mt-3 text-sm leading-7 text-text-soft dark:text-slate-400">
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
            <div className="rounded-3xl border border-border bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-sm font-semibold text-foreground dark:text-slate-200">2026 Theme</p>
              <p className="mt-2 text-xl font-bold tracking-tight text-navy dark:text-amber-300">{siteConfig.yearTheme}</p>
              <p className="mt-2 text-sm text-text-soft dark:text-slate-400">
                This year at Acts 242, everything we study, preach, and build is centered on Jesus — who He is, what He did, and what it means to follow Him.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">Let us know you were here</p>
            <p className="mt-2 text-base text-text-soft dark:text-slate-400">Fill this out and someone from our team will follow up with you.</p>

            {status === 'success' ? (
              <div className="mt-6 space-y-3 text-center">
                <p className="text-xl font-bold tracking-tight text-foreground dark:text-slate-100">Welcome to Acts 242.</p>
                <p className="text-sm leading-7 text-text-soft dark:text-slate-400">We received your details and will be in touch soon. We&apos;re glad you&apos;re here.</p>
                <ButtonLink href="/grow#foundations" variant="secondary" className="mt-2">Start the lessons</ButtonLink>
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
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft disabled:opacity-60 dark:bg-amber-300 dark:text-navy dark:hover:bg-amber-200"
                >
                  {status === 'submitting' ? 'Sending...' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>

      {/* ── FAQ ── */}
      {/* Native <details>/<summary>: no JS, works in the Facebook in-app browser, and
          `summary` is already in the :focus-visible selector in globals.css. */}
      <Section className="bg-muted dark:bg-slate-900">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
            Before you come
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground dark:text-slate-100">
            Questions people usually ask
          </h2>

          <div className="mt-8 divide-y divide-border rounded-3xl border border-border bg-white px-6 dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-800">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer items-start justify-between gap-4 font-semibold text-foreground marker:content-[''] dark:text-slate-100">
                  {faq.q}
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 text-navy transition group-open:rotate-45 dark:text-amber-300"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-text-soft dark:text-slate-400">{faq.a}</p>
              </details>
            ))}
          </div>

          <p className="mt-6 text-sm leading-7 text-text-soft dark:text-slate-400">
            Anything else you would like to ask before Sunday?{' '}
            <Link
              href="/connect"
              className="font-semibold text-navy underline underline-offset-4 dark:text-amber-300"
            >
              Send us a message
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  )
}
