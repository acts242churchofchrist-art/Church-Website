/**
 * MINISTRIES — the standing structure of the church.
 *
 * Deliberately names no individuals; the leadership and team sections on /about
 * already carry names. Keep this list to ministries that exist year-round.
 */

export type Ministry = {
  name: string
  description: string
}

export const ministries: Ministry[] = [
  {
    name: 'Evangelism',
    description: 'Taking the gospel outside our walls through outreach in the community.',
  },
  {
    name: "Men's Ministry",
    description: 'Leadership training, Bible talks, fellowship, and sports.',
  },
  {
    name: "Women's & Single Mom Ministry",
    description: 'Bible study, visitation, and practical support for women and single mothers.',
  },
  {
    name: 'Teens & Young Adults',
    description:
      'Discipleship for the next generation, with monthly gatherings for young adult men and women.',
  },
  {
    name: "Children's Ministry",
    description: 'Teaching, presentations, and youth services throughout the year.',
  },
  {
    name: 'Marrieds',
    description: 'Monthly fellowship for married couples.',
  },
  {
    name: 'Inner Healing',
    description: 'Teaching and prayer for those carrying wounds, grief, and trauma.',
  },
  {
    name: 'Worship & Media',
    description:
      'Song leading, audio-visual production, and the Sunday livestream on Facebook and YouTube.',
  },
]
