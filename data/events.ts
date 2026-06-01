/**
 * UPCOMING EVENTS — Update this file after the last-Sunday planning meeting each month.
 * - Remove events that have already passed
 * - Add new events for the coming weeks
 * - Recurring events (Sunday service, Friday devotional) are always shown — do not remove them
 * - Keep dated events to a maximum of 4–6 at a time
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
    time: '5:30 PM – 7:30 PM',
    location: 'Acts 242 Worship Hall',
    type: 'devotional',
    recurringLabel: 'Every Friday',
  },

  // JUNE 2026 EVENTS
  {
    id: 'inner-healing-june-series',
    title: 'Inner Healing Part 2: Trauma — Ongoing Series',
    description: 'An 8-Sunday series on inner healing and trauma led by Sis. Karol, starting June 7. Additional dates will be announced.',
    date: '2026-06-07',
    time: '12:30 PM onwards',
    location: 'Acts 242 Worship Hall',
    type: 'special',
    ministry: "Women's Ministry",
  },
  {
    id: 'fathers-day-june21',
    title: "Father's Day Service",
    description: "A special Sunday service celebrating fathers, featuring a guest testimony and a Kids presentation. Men's Fellowship with refreshments after the service.",
    date: '2026-06-21',
    time: '10:00 AM',
    location: 'Acts 242 Worship Hall',
    type: 'special',
    ministry: "Men's Ministry & Kids",
  },
  {
    id: 'mens-fathers-day-fellowship',
    title: "Men's Fellowship — Father's Day",
    description: "A Men's Brotherhood gathering with refreshments after the Father's Day service.",
    date: '2026-06-21',
    time: '12:30 PM onwards',
    location: 'Acts 242 Worship Hall',
    type: 'fellowship',
    ministry: "Men's Ministry",
  },
  {
    id: 'evangelism-scouting-june',
    title: 'Evangelism Outreach — Coming Soon',
    description: 'The church is scouting Manila Memorial Park and other locations for an upcoming evangelism activity. Date to be announced.',
    date: '', // no date yet — treat as a special "coming soon" event
    time: 'To be announced',
    location: 'To be announced',
    type: 'outreach',
    ministry: 'Evangelism',
  },
  {
    id: 'single-mom-visitation-june',
    title: 'Single Mom Ministry Visitation',
    description: 'A ministry visit for single mothers in our congregation. Date to be announced.',
    date: '',
    time: 'To be announced',
    location: 'To be announced',
    type: 'fellowship',
    ministry: "Women's Ministry",
  },
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

// Coming soon events — no date yet, not recurring
export const comingSoonEvents = upcomingEvents.filter(
  (e) => !e.date && !e.id.includes('weekly')
)

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

export const preachingSchedule: PreacherEntry[] = [
  { date: '2026-06-07', preacher: 'Bro. Marc', note: 'Sunday Service' },
  { date: '2026-06-14', preacher: 'Bro. James', note: 'Sunday Service' },
  { date: '2026-06-19', preacher: 'Bro. Kiev', note: 'Midweek Devotional' },
  { date: '2026-06-21', preacher: 'Bro. Marc', note: "Father's Day Service" },
  { date: '2026-06-26', preacher: 'Bro. Vince', note: 'Midweek Devotional' },
  { date: '2026-06-28', preacher: 'Bro. Marc', note: 'Sunday Service' },
]

// Only show upcoming entries
export const upcomingPreachingSchedule = preachingSchedule.filter((e) => {
  const d = new Date(e.date + 'T23:59:59')
  return d.getTime() >= Date.now()
})
