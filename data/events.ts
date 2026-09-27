/**
 * UPCOMING EVENTS — Update this file after the last-Sunday planning meeting each month.
 * - Remove events that have already passed
 * - Add new events for the coming weeks
 * - Recurring events (Sunday service, Friday devotional) are always shown — do not remove them
 * - Keep dated events to a maximum of 4–6 at a time
 *
 * Completed activities are not deleted — move them to data/milestones.ts so the
 * season is preserved on /milestones instead of vanishing when the month ends.
 */

export type ChurchEvent = {
  id: string
  title: string
  description?: string
  date: string // ISO format YYYY-MM-DD; leave empty string for recurring
  time?: string // e.g., "9:00 AM"
  location?: string // e.g., "Acts 242 Worship Hall" or "Flick Badminton Court"
  type: 'service' | 'devotional' | 'fellowship' | 'outreach' | 'special'
  recurringLabel?: string // e.g., "Every Sunday" — only for recurring events
  ministry?: string // e.g., "Teens & Young Adults"
}

export const upcomingEvents: ChurchEvent[] = [
  // RECURRING — always shown
  {
    id: 'sunday-service-weekly',
    title: 'Sunday Worship Service',
    date: '',
    time: '10:00 AM – 12:30 PM',
    location: 'Acts 242 Worship Hall',
    type: 'service',
    recurringLabel: 'Every Sunday',
  },
  {
    id: 'midweek-devotional-weekly',
    title: 'Midweek Devotional',
    date: '',
    time: '6:00 PM – 8:00 PM',
    location: 'Acts 242 Worship Hall',
    type: 'devotional',
    recurringLabel: 'Every Friday',
  },

  // DATED EVENTS — add here once the core group sets a date.
  // Past entries belong in data/milestones.ts, not here.
]

/**
 * MINISTRY RHYTHMS — congregation-wide patterns that recur without a fixed date.
 * These replace speculative "date to be announced" cards: they are true all year
 * and never go stale, so the home page stays honest between planning meetings.
 */
export type MinistryRhythm = {
  ministry: string
  cadence: string
}

export const ministryRhythms: MinistryRhythm[] = [
  { ministry: "Women's & Single Mom Ministry", cadence: 'Meets after Sunday worship' },
  { ministry: 'Young Adults', cadence: "Men's and women's gatherings, monthly" },
  { ministry: 'Marrieds', cadence: 'Monthly fellowship' },
  { ministry: "Men's Ministry", cadence: 'Fellowship and sports' },
  { ministry: "Children's Ministry", cadence: 'Presentations and youth services through the year' },
]

// Recurring events (weekly, no date) — always shown
export const recurringEvents = upcomingEvents.filter(
  (e) => !e.date && e.id.includes('weekly')
)

// Dated events — sorted ascending, only future events kept
export const datedEvents = upcomingEvents
  .filter((e) => Boolean(e.date) && !e.id.includes('weekly'))
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .filter((e) => {
    const eventDate = new Date(e.date + 'T23:59:59')
    return eventDate.getTime() >= Date.now()
  })

// Undated "coming soon" events are deliberately not supported: they were the source
// of months-stale cards on the home page. Use ministryRhythms for things that recur
// without a date, and add a dated event only once a real date exists.

export const eventTypeColors: Record<ChurchEvent['type'], string> = {
  service: 'bg-navy/10 text-navy dark:bg-amber-300/15 dark:text-amber-300',
  devotional: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  fellowship: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  outreach: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  special: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
}

export const eventTypeLabels: Record<ChurchEvent['type'], string> = {
  service: 'Service',
  devotional: 'Devotional',
  fellowship: 'Fellowship',
  outreach: 'Outreach',
  special: 'Special',
}

// ── Preaching Schedule ────────────────────────────────────────────────────────

export type PreacherEntry = {
  date: string // YYYY-MM-DD
  preacher: string
  note?: string
}

// Add the coming month's assignments after each planning meeting. Past entries are
// filtered out automatically at build time, so stale rows never reach the page.
export const preachingSchedule: PreacherEntry[] = []

// Only show upcoming entries
export const upcomingPreachingSchedule = preachingSchedule.filter((e) => {
  const d = new Date(e.date + 'T23:59:59')
  return d.getTime() >= Date.now()
})

// Heading label derived from the entries themselves, so it can never disagree with
// the rows beneath it the way a hardcoded month name did.
export const preachingScheduleLabel = (() => {
  if (upcomingPreachingSchedule.length === 0) return ''
  const months = upcomingPreachingSchedule.map((e) =>
    new Date(e.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long' }),
  )
  const first = months[0]
  const last = months[months.length - 1]
  return first === last ? `${first} Preaching Schedule` : `${first}–${last} Preaching Schedule`
})()
