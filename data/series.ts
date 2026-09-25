/**
 * TEACHING SERIES — multi-session series taught across a season.
 *
 * Adding a session: append to `sessions`. Adding its deck: set `pdfUrl` once the
 * compressed PDF is committed under /public/series/<slug>/. Download buttons only
 * render for sessions that have a file, so a session can be listed before its deck
 * is ready without producing a dead link.
 *
 * Decks must be compressed to roughly 3 MB or less before being committed — the
 * source presentations run 7–30 MB and would load badly on mobile data.
 */

/** A teaching block within a session body. */
export type SessionBlock =
  | { kind: 'prose'; heading?: string; subheading?: string; text: string }
  | { kind: 'scripture'; reference: string; translation?: string; text: string }
  | { kind: 'leaderNote'; text: string }

export type SeriesSession = {
  /** Field names mirror the lesson frontmatter spec: session / sessionSlug / sourcePages. */
  number: number
  sessionSlug: string
  title: string
  subtitle?: string
  focus: string
  /** `YYYY-MM-DD`, only where the teaching date is actually known. */
  date?: string
  /** Page range in the source deck, e.g. '3-28'. */
  sourcePages?: string
  /** Path under /public once the compressed deck is committed. */
  pdfUrl?: string

  // ── Session body. Absent until the decks are transcribed; the page renders an
  // honest "not yet published" state rather than filler.
  body?: SessionBlock[]
  /** One question per entry — they render one per line so a reader holds one at a time. */
  reflection?: string[]
  challenge?: string
  prayer?: string
}

export type TeachingSeries = {
  slug: string
  title: string
  subtitle: string
  season: string
  intro: string[]
  verse: { text: string; reference: string }
  sessions: SeriesSession[]
  coverImage?: string
}

export const teachingSeries: TeachingSeries[] = [
  {
    slug: 'inner-healing-202-trauma',
    title: 'Inner Healing 202: Trauma',
    subtitle: 'Understanding, Healing, and Hope',
    season: 'May – August 2026',
    intro: [
      'Trauma is often imagined as one devastating moment. In truth it takes many forms — sudden events, long-term wounds, neglect, loss, and silence — and it shapes the mind, the body, and the way we relate to others.',
      'Over six sessions, Inner Healing 202 walked through what trauma is, how it forms, and what Scripture says to those who carry it. The series held two things together: honest language for pain, and the promise that God restores what was broken.',
    ],
    verse: {
      text: 'He heals the brokenhearted and binds up their wounds.',
      reference: 'Psalm 147:3',
    },
    sessions: [
      {
        number: 1,
        sessionSlug: 'the-many-faces-of-trauma',
        sourcePages: '3-28',
        title: 'The Many Faces of Trauma',
        subtitle: 'Understanding how trauma forms and the many shapes it takes',
        focus:
          'Childhood, emotional, physical, generational, social and cultural trauma; loss and grief; pathways to healing.',
        date: '2026-05-24',
      },
      {
        number: 2,
        sessionSlug: 'developmental-trauma',
        title: 'Developmental Trauma: Understanding Early Wounds',
        subtitle: 'Early wounds, attachment, and the cycles they set in motion',
        focus:
          'Childhood and neglect trauma, betrayal by caregivers, attachment patterns, intergenerational cycles.',
      },
      {
        number: 3,
        sessionSlug: 'healing-the-hidden-wounds',
        title: 'Healing the Hidden Wounds: A Biblical Response to Trauma',
        subtitle: 'A biblical response to trauma, and the church’s part in it',
        focus:
          "Trauma in today's world, physical and loss trauma, fear-based and social trauma, how God heals, and the church's response.",
      },
      {
        number: 4,
        sessionSlug: 'through-a-medical-lens',
        title: 'Inner Healing: Trauma — Through a Medical Lens',
        subtitle: 'What trauma does to the brain and body, and what God promises',
        focus:
          "Adverse childhood experiences, how trauma reshapes the brain, manifestations in adult life, and God's promise of restoration.",
      },
      {
        number: 5,
        sessionSlug: 'who-is-jeremiah',
        title: 'Who Is Jeremiah? The Weeping Prophet',
        subtitle: 'A trauma-aware Bible study in the life of the weeping prophet',
        focus:
          'A trauma-aware Bible study — calling, opposition, lament, and the new covenant.',
      },
      {
        number: 6,
        sessionSlug: 'breaking-the-cycle',
        title: 'Breaking the Cycle: Healing Begins',
        subtitle: 'A heart transformation workshop — naming it, and choosing differently',
        focus:
          'A heart transformation workshop — what shaped me, what I am still carrying, what God says, and what I will choose.',
      },
    ],
  },
]

export function getSeriesBySlug(slug: string): TeachingSeries | undefined {
  return teachingSeries.find((s) => s.slug === slug)
}

export function getSession(seriesSlug: string, sessionSlug: string) {
  const series = getSeriesBySlug(seriesSlug)
  if (!series) return null
  const index = series.sessions.findIndex((s) => s.sessionSlug === sessionSlug)
  if (index === -1) return null
  return {
    series,
    session: series.sessions[index],
    previous: index > 0 ? series.sessions[index - 1] : null,
    next: index < series.sessions.length - 1 ? series.sessions[index + 1] : null,
  }
}
