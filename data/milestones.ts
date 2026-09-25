/**
 * MILESTONES — a permanent record of completed ministry work, newest month first.
 *
 * When a season closes, move the activity here from data/events.ts rather than
 * deleting it, so the year accumulates instead of disappearing.
 *
 * Dates recorded in the core-group minutes as a month rather than a specific day
 * are marked `approx: true` and carry a `YYYY-MM` date.
 *
 * Nothing in this file may identify a person's spiritual state, absence, or home.
 */

export type Milestone = {
  /** `YYYY-MM-DD`, or `YYYY-MM` when only the month is known (`approx: true`). */
  date: string
  approx?: boolean
  category: string
  title: string
  description: string
  /** Internal route or external URL for related material. */
  link?: string
}

export type MilestoneMonth = {
  /** `YYYY-MM` — also used as the section anchor id. */
  month: string
  label: string
  entries: Milestone[]
}

export const milestoneMonths: MilestoneMonth[] = [
  {
    month: '2026-08',
    label: 'August 2026',
    entries: [
      {
        date: '2026-08-30',
        category: 'Children & Youth',
        title: "Children's Presentation & Youth Service",
        description:
          'The children led a presentation and the youth took the Sunday service — a Sunday shaped and carried by the next generation.',
      },
      {
        date: '2026-08-23',
        category: 'Marrieds',
        title: 'Marrieds Fellowship Begins',
        description: 'Married couples began meeting monthly for fellowship and encouragement.',
      },
      {
        date: '2026-08-21',
        category: 'Young Adults',
        title: 'Young Adult Gatherings Begin',
        description:
          'Monthly gatherings launched for young adult men and young adult women — space to study, pray, and grow together.',
      },
      {
        date: '2026-08-15',
        category: "Men's Ministry",
        title: "Men's Basketball Fellowship",
        description:
          'The men gathered for basketball — fellowship built on the court as much as in the pew.',
      },
      {
        date: '2026-08',
        approx: true,
        category: 'Inner Healing',
        title: 'Inner Healing 202: Trauma — Final Sessions',
        description:
          'The Inner Healing series closed with its final two sessions, ending in a heart transformation workshop.',
        link: '/series/inner-healing-202-trauma',
      },
      {
        date: '2026-08',
        approx: true,
        category: 'Media',
        title: 'Recording for YouTube Begins',
        description:
          'Alongside the Facebook livestream, services began being recorded for the church YouTube channel so messages can be revisited any time.',
        link: 'https://www.youtube.com/@Acts242ChurchofChrist',
      },
    ],
  },
  {
    month: '2026-07',
    label: 'July 2026',
    entries: [
      {
        date: '2026-07-26',
        category: 'Worship',
        title: 'Concert Worship Service',
        description:
          'A full Sunday given to worship — an extended service of singing and the Word together.',
      },
      {
        date: '2026-07-19',
        category: 'Teens & Young Adults',
        title: 'Youth Speakers Sunday',
        description:
          'Young speakers from the congregation took the pulpit, stepping into the work of preaching and teaching.',
      },
      {
        date: '2026-07-17',
        category: 'Fellowship',
        title: 'Midweek Movie Night',
        description:
          'The Friday devotional became a movie night — an open door for friends and family to come along.',
      },
      {
        date: '2026-07-12',
        category: 'Children',
        title: "Children's Ministry Performance",
        description:
          "The children performed for the congregation, the fruit of weeks of preparation in the children's ministry.",
      },
      {
        date: '2026-07',
        approx: true,
        category: 'Inner Healing',
        title: 'Inner Healing 202: Trauma — Sunday Sessions Continue',
        description:
          'The trauma series continued through July, working through developmental wounds and the biblical response to pain.',
        link: '/series/inner-healing-202-trauma',
      },
    ],
  },
  {
    month: '2026-06',
    label: 'June 2026',
    entries: [
      {
        date: '2026-06-21',
        category: "Men's Ministry",
        title: "Father's Day Men's Bible Talk",
        description:
          "The men gathered for a Bible talk on Father's Day, with refreshments and time together.",
      },
      {
        date: '2026-06-21',
        category: 'Children & Youth',
        title: "Kids' Presentation & Youth Lineup",
        description: 'The children presented and the youth led in worship on the same Sunday.',
      },
      {
        date: '2026-06',
        approx: true,
        category: 'Schedule',
        title: 'Friday Devotional Time Set',
        description: 'The midweek devotional settled into its regular Friday evening slot.',
      },
      {
        date: '2026-06',
        approx: true,
        category: 'Evangelism',
        title: 'Evangelism Location Scouting',
        description: 'The church began scouting locations for the next community outreach.',
      },
      {
        date: '2026-06',
        approx: true,
        category: 'Inner Healing',
        title: 'Inner Healing 202: Trauma — Sunday Sessions',
        description:
          "The series ran through June's Sundays, covering the many forms trauma takes and how God meets each one.",
        link: '/series/inner-healing-202-trauma',
      },
    ],
  },
  {
    month: '2026-05',
    label: 'May 2026',
    entries: [
      {
        date: '2026-05-31',
        category: "Men's Ministry",
        title: "Men's Leadership Training",
        description:
          'A training day for the men of the church — building the next layer of leadership.',
      },
      {
        date: '2026-05-24',
        category: 'Inner Healing',
        title: 'The Many Faces of Trauma',
        description:
          'The opening teaching of the Inner Healing 202 series — trauma is rarely one moment, and God meets every form of it.',
        link: '/series/inner-healing-202-trauma',
      },
      {
        date: '2026-05-17',
        category: 'Inner Healing',
        title: 'Inner Healing 202: Trauma Begins',
        description:
          'A new teaching series opened, walking the congregation through trauma, healing, and the hope of restoration in Christ.',
        link: '/series/inner-healing-202-trauma',
      },
      {
        date: '2026-05-15',
        category: 'Evangelism',
        title: 'Ice Cream Evangelism',
        description:
          'The church took the gospel into the community with ice cream and hand-painted bookmarks — a simple, warm way to open a conversation about Christ.',
      },
      {
        date: '2026-05-10',
        category: 'Teens, Young Adults & Kids',
        title: 'Painting for the Gospel',
        description:
          'Kids, teens, and young adults painted bookmarks together — each one a gift to be handed out at the Ice Cream Evangelism outreach.',
        link: '/gallery/2026-05-10-painting-activity',
      },
      {
        date: '2026-05',
        approx: true,
        category: "Women's Ministry",
        title: 'Single Mom Ministry Visitation',
        description:
          'The women’s ministry visited single mothers in the congregation — presence, prayer, and practical care.',
      },
    ],
  },
]

export const milestoneCount = milestoneMonths.reduce((sum, m) => sum + m.entries.length, 0)

/** Day-precision entries render a full date; month-only entries render just the month. */
export function formatMilestoneDate(entry: Milestone): string {
  if (entry.approx) {
    return new Date(`${entry.date}-01T00:00:00`).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
  }
  return new Date(`${entry.date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
