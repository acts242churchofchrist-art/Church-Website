import { MaterialItem } from '@/types/content'

// THUMBNAILS: Export a preview image from Canva for each material.
// Recommended: 800x600px JPEG, under 200KB each.
// Upload to /public/images/materials/[filename]

export const materials: MaterialItem[] = [
  {
    id: 'foundation-guide',
    title: 'ACTS 242 Foundation Guide',
    description:
      'A discipleship guide for learning, growing, and following Jesus Christ. Edition 1 (2026). Designed for personal study, one-on-one discipleship, and small group teaching. Seven lessons covering the foundation of the Christian life.',
    category: 'Foundation and Discipleship',
    featured: true,
    actionLabel: 'Open Foundation Guide',
    href: '/foundation-guide.pdf',
    thumbnail: '/images/materials/foundation-guide-thumb.jpg',
  },
  {
    id: 'sermon-archive',
    title: 'Sermon Archive',
    description:
      'Browse weekly sermon outlines, brochures, and recordings from Acts 242 Church of Christ.',
    category: 'Sermon Materials',
    featured: true,
    actionLabel: 'Browse sermons',
    href: '/sermons',
    thumbnail: undefined,
  },
  {
    id: 'evangelism-trifold',
    title: 'Ang Daan Tungo kay Cristo (Trifold)',
    description:
      "A gospel trifold in Filipino walking through the truth of sin, God's love, redemption in Christ, new life, and the call to respond. For one-on-one sharing or group outreach.",
    category: 'Evangelism Materials',
    featured: true,
    actionLabel: 'Download',
    href: '/acts242-trifold.pdf',
    thumbnail: '/images/materials/evangelism-trifold-thumb.png',
  },
  {
    id: 'evangelism-poster',
    title: 'Ang Daan Tungo kay Cristo (Poster)',
    description:
      'A two-sided teaching poster covering the five truths of the gospel and how to respond in faith, repentance, and discipleship.',
    category: 'Evangelism Materials',
    actionLabel: 'Download',
    href: '/acts242-poster.pdf',
    thumbnail: '/images/materials/evangelism-poster-thumb.png',
  },
  {
    id: 'evangelism-card',
    title: 'Acts 242 Evangelism Card',
    description:
      'A short first-contact card for handing out after a conversation, at the gate, after worship, or in community outreach.',
    category: 'Evangelism Materials',
    actionLabel: 'Download',
    href: '/acts242-card.pdf',
    thumbnail: '/images/materials/evangelism-card-thumb.png',
  },
]

export const materialCategories = [
  'Foundation and Discipleship',
  'Sermon Materials',
  'Evangelism Materials',
] as const
