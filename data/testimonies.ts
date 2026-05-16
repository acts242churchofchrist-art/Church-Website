export type TestimonySection = {
  heading: string
  body: string // plain text paragraphs separated by \n\n
}

export type Testimony = {
  id: string
  name: string // e.g., "Bro. James"
  fullName?: string // optional — shown only if person has given consent
  date: string // ISO — Sunday the testimony was shared
  sermonSlug?: string // links back to the sermon page
  pullQuote: string // one sentence — used on cards and homepage highlight
  summary: string // 2–3 sentence overview
  photo?: string // path in /public/ — optional; initials fallback used if absent
  sections: TestimonySection[]
}

export const testimonies: Testimony[] = [
  {
    id: 'bro-james-work-in-progress',
    name: 'Bro. James',
    date: '2026-05-10',
    sermonSlug: '2026-05-10-bless-one-another-in-these-last-days',
    pullQuote: 'Little by little, I chose my family. What\'s the point of temporary pleasure if you lose the gift of family?',
    summary:
      'Bro. James shared how years of chasing temporary pleasures slowly eroded the things that mattered most — until God, step by step, turned his heart back to what He had already given him.',
    sections: [
      {
        heading: 'The Life I Was Living',
        body: `I was not the kind of person who woke up one day and decided to throw everything away. It happened slowly — one compromise at a time, one night at a time. The pleasures I chased were not extraordinary. They were ordinary. But they were mine, and I held onto them.\n\nI still went to church. I still prayed, sometimes. But I had learned to live two lives, and I was more comfortable in one of them than the other. My family was there — patient, still loving me — but I had stopped seeing them clearly. I was too busy looking at what I thought I was missing.`,
      },
      {
        heading: 'The Moment I Began to See',
        body: `There was no single dramatic moment. God does not always work that way. For me, it was a conversation — something my wife said that she probably does not even remember saying. She was not angry. She was just tired. And in that tiredness, I saw myself clearly for the first time in a long time.\n\nWhat's the point of temporary pleasure if you lose the gift of family?\n\nI did not say it to her. I thought it — or maybe God put it in my mind. But it stayed with me for days. I would be at work and hear it. I would be out with friends and hear it. What's the point?`,
      },
      {
        heading: 'Little by Little',
        body: `I wish I could say I made one big decision and everything changed. But that is not how it happened. Little by little, I chose my family. I came home earlier. I put the phone down during dinner. I started praying with them — not every night, but more nights than before. And then more nights than that.\n\nBrothers, God does not always ask for dramatic gestures. Sometimes He just asks: will you choose them again today? Will you choose what I gave you over what the world is offering you right now?\n\nEvery day I said yes to that question, the old life got a little smaller. And every day, the life God had already given me got a little bigger.`,
      },
      {
        heading: 'What God Restored',
        body: `I do not tell this story because I have arrived anywhere. I tell it because I am still in the middle of it — and the middle is good. My marriage is not perfect, but it is real, and it is growing. My children know their father is present. Not just physically — present.\n\nAnd I am here, in this church, because Hebrews 10 is right. You cannot hold onto the warmth by yourself. You need the fire of the gathered people of God. I needed this church more than I knew. And I am grateful — for every brother and sister who kept burning while I was out in the cold.`,
      },
    ],
  },
]

export function getTestimonyById(id: string): Testimony | undefined {
  return testimonies.find((t) => t.id === id)
}
