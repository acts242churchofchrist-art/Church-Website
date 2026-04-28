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

  // MAY 2026 EVENTS
  {
    id: 'teens-painting-may10',
    title: 'Painting and Character Studies',
    description: 'A creative activity for teens, young adults, and kids after the Sunday service. Artworks will be used for the Ice Cream Evangelism outreach.',
    date: '2026-05-10',
    time: '12:30 PM onwards',
    location: 'Acts 242 Worship Hall',
    type: 'fellowship',
    ministry: 'Teens, Young Adults & Kids',
  },
  {
    id: 'ice-cream-evangelism-may15',
    title: 'Ice Cream Evangelism',
    description: 'Come join us as we share the gospel and build connections in the community.',
    date: '2026-05-15',
    time: '4:30 PM',
    location: 'TBA',
    type: 'outreach',
    ministry: 'Evangelism',
  },
  {
    id: 'inner-healing-may17',
    title: 'Inner Healing Part 2: Trauma',
    description: 'An after-service event led by Sis. Karol on inner healing and trauma.',
    date: '2026-05-17',
    time: '12:30 PM onwards',
    location: 'Acts 242 Worship Hall',
    type: 'fellowship',
    ministry: "Women's Ministry",
  },
  {
    id: 'mens-ministry-may31',
    title: "Men's Ministry Leadership Training",
    description: 'Led by Bro. Marc. After the Sunday service.',
    date: '2026-05-31',
    time: '12:30 PM onwards',
    location: 'Acts 242 Worship Hall',
    type: 'fellowship',
    ministry: "Men's Ministry",
  },
]

// Recurring events (no date) — always shown
export const recurringEvents = upcomingEvents.filter((e) => !e.date)

// Dated events — sorted ascending, only future events kept
export const datedEvents = upcomingEvents
  .filter((e) => Boolean(e.date))
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .filter((e) => {
    const eventDate = new Date(e.date + 'T23:59:59')
    return eventDate.getTime() >= Date.now()
  })

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
  { date: '2026-05-10', preacher: 'Bro. Tony', note: 'With testimony by Bro. Mike' },
  { date: '2026-05-17', preacher: 'Bro. Marc', note: 'Sunday Service' },
  { date: '2026-05-22', preacher: 'Bro. Vince', note: 'Midweek Devotional' },
  { date: '2026-05-24', preacher: 'Bro. Kiev', note: 'Sunday Service' },
  { date: '2026-05-31', preacher: 'Bro. Marc', note: 'Sunday Service' },
]

// Only show upcoming entries
export const upcomingPreachingSchedule = preachingSchedule.filter((e) => {
  const d = new Date(e.date + 'T23:59:59')
  return d.getTime() >= Date.now()
})
