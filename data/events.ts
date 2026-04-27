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
}

export const upcomingEvents: ChurchEvent[] = [
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
  // Add one-off events below. Example:
  // {
  //   id: 'badminton-may-3',
  //   title: 'Fellowship Badminton',
  //   description: 'Open to all members. Contact Sis. Normie to join.',
  //   date: '2026-05-03',
  //   time: '9:00 AM',
  //   location: 'Flick Badminton Court',
  //   type: 'fellowship',
  // },
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
