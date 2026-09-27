import { MaterialItem } from '@/types/content'

// THUMBNAILS: Export a preview image from Canva for each material.
// Recommended: 800x600px JPEG, under 200KB each.
// Upload to /public/images/materials/[filename]

export const materials: MaterialItem[] = [
  {
    id: 'foundation-guide',
    title: 'ACTS 242 Foundation Guide',
    description:
      "A discipleship workbook for learning, growing, and following Jesus Christ. Seven lessons, a leader's track, reflection pages, and a full Scripture index — built for personal study, one-on-one discipleship, and small group teaching.",
    // No page count on purpose: the PDF runs 140 pages but the printed numbering ends
    // at 131, so any figure here would contradict the booklet in someone's hands.
    meta: 'Edition 1 (2026) · Seven lessons · A5 PDF',
    category: 'Foundation and Discipleship',
    featured: true,
    actionLabel: 'Open Foundation Guide',
    // ?v= busts the cache for anyone who already downloaded V1; the bare path still
    // resolves, so QR codes and printed brochures keep working.
    href: '/foundation-guide.pdf?v=2026-09',
    thumbnail: '/images/materials/foundation-guide-thumb.jpg',
  },
  {
    id: 'inner-healing-202-trauma',
    title: 'Inner Healing 202: Trauma',
    description:
      'A six-session series on understanding trauma and finding healing in Christ — childhood and developmental wounds, loss, fear, and the biblical path to restoration. Each session has its own page to read, with a printable handout.',
    meta: 'Six sessions · May – August 2026',
    category: 'Teaching Series',
    featured: true,
    actionLabel: 'Read the series',
    href: '/series/inner-healing-202-trauma',
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
    // File not yet committed to /public — link stays suppressed until it is.
    comingSoon: true,
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
    // File not yet committed to /public — link stays suppressed until it is.
    comingSoon: true,
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
    // File not yet committed to /public — link stays suppressed until it is.
    comingSoon: true,
  },
]

export const materialCategories = [
  'Foundation and Discipleship',
  'Teaching Series',
  'Sermon Materials',
  'Evangelism Materials',
] as const
