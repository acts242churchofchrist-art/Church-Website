import Link from 'next/link'
import {
  recurringEvents,
  datedEvents,
  ministryRhythms,
  upcomingPreachingSchedule,
  preachingScheduleLabel,
  eventTypeColors,
  eventTypeLabels,
  type ChurchEvent,
} from '@/data/events'
import { siteConfig } from '@/data/site'
import { Section } from '@/components/layout/section'

function formatEventDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

function formatShortDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function EventTypeBadge({ type }: { type: ChurchEvent['type'] }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${eventTypeColors[type]}`}
    >
      {eventTypeLabels[type]}
    </span>
  )
}

function RecurringEventCard({ event }: { event: ChurchEvent }) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800">
      <div className="absolute inset-y-0 left-0 w-1.5 bg-navy dark:bg-amber-300" />
      <div className="pl-3">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
            {event.recurringLabel}
          </p>
          <EventTypeBadge type={event.type} />
        </div>
        <h3 className="mt-3 text-xl font-semibold text-foreground dark:text-slate-100">
          {event.title}
        </h3>
        {event.time && (
          <p className="mt-2 text-sm font-medium text-foreground dark:text-slate-200">{event.time}</p>
        )}
        {event.location && (
          <p className="mt-1 text-sm text-text-soft dark:text-slate-400">{event.location}</p>
        )}
      </div>
    </article>
  )
}

function DatedEventCard({ event }: { event: ChurchEvent }) {
  return (
    <article className="rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
          {formatEventDate(event.date)}
        </p>
        <EventTypeBadge type={event.type} />
      </div>
      {event.ministry && (
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-navy/60 dark:text-amber-300/60">
          {event.ministry}
        </p>
      )}
      <h3 className={`${event.ministry ? 'mt-1' : 'mt-3'} text-lg font-semibold text-foreground dark:text-slate-100`}>
        {event.title}
      </h3>
      {event.description && (
        <p className="mt-2 text-sm leading-7 text-text-soft dark:text-slate-400">
          {event.description}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-soft dark:text-slate-400">
        {event.time && <span>{event.time}</span>}
        {event.location && (
          <>
            {event.time && <span aria-hidden>·</span>}
            <span>{event.location}</span>
          </>
        )}
      </div>
    </article>
  )
}

export function UpcomingEvents() {
  if (recurringEvents.length === 0 && datedEvents.length === 0) return null

  return (
    <Section id="events">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
          What&apos;s coming up
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl dark:text-slate-100">
          Join us
        </h2>
        <p className="mt-4 text-base leading-8 text-text-soft dark:text-slate-400">
          We gather every week to worship, study, pray, and grow together.
        </p>
      </div>

      {/* Recurring events — the weekly gatherings anyone can turn up to */}
      {recurringEvents.length > 0 && (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {recurringEvents.map((event) => (
            <RecurringEventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {/* Preaching schedule */}
      {upcomingPreachingSchedule.length > 0 && (
        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-muted dark:border-slate-700 dark:bg-slate-900">
          <div className="border-b border-border px-5 py-3 dark:border-slate-700">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
              {preachingScheduleLabel}
            </p>
          </div>
          <div className="divide-y divide-border dark:divide-slate-700">
            {upcomingPreachingSchedule.map((entry) => (
              <div key={entry.date} className="flex items-center gap-4 px-5 py-3">
                <span className="w-14 shrink-0 text-sm font-semibold text-foreground dark:text-slate-200">
                  {formatShortDate(entry.date)}
                </span>
                <span className="w-px self-stretch bg-border dark:bg-slate-700" aria-hidden />
                <span className="w-28 shrink-0 text-sm font-medium text-foreground dark:text-slate-100">
                  {entry.preacher}
                </span>
                {entry.note && (
                  <span className="text-sm text-text-soft dark:text-slate-400">{entry.note}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dated activities — only ever rendered when a real date exists */}
      {datedEvents.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-foreground dark:text-slate-100">
            Upcoming activities
          </h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {datedEvents.slice(0, 4).map((event) => (
              <DatedEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Ministry rhythms — true all year, so this block never goes stale */}
      {ministryRhythms.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-foreground dark:text-slate-100">
            Monthly rhythms
          </h3>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {ministryRhythms.map((rhythm) => (
              <div
                key={rhythm.ministry}
                className="rounded-2xl border border-border bg-muted px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
              >
                <dt className="text-sm font-semibold text-foreground dark:text-slate-100">
                  {rhythm.ministry}
                </dt>
                <dd className="mt-1 text-sm text-text-soft dark:text-slate-400">{rhythm.cadence}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <p className="mt-8 rounded-2xl border border-border bg-white px-5 py-4 text-sm leading-7 text-text-soft dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
        <span className="font-semibold text-foreground dark:text-slate-100">
          Dated activities are announced on Facebook and during Sunday service.
        </span>{' '}
        For the latest,{' '}
        <a
          href={siteConfig.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-navy underline underline-offset-4 dark:text-amber-300"
        >
          follow us on Facebook
        </a>{' '}
        or ask any of the team on a Sunday.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-muted px-5 py-4 dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm leading-7 text-text-soft dark:text-slate-400">
          <span className="font-semibold text-foreground dark:text-slate-100">Looking back?</span>{' '}
          See what God has done through this church over the past months.
        </p>
        <Link
          href="/milestones"
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-navy underline-offset-4 hover:underline dark:text-amber-300"
        >
          View our milestones →
        </Link>
      </div>
    </Section>
  )
}
