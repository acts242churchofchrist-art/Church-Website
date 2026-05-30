export type Leader = {
  name: string
  title: string
  ministry: string
  bio?: string
  photo?: string // path to /public/images/leadership/[filename]
  isCore: boolean // true = shown in core leadership section
}

export const leadership: Leader[] = [
  // CORE LEADERSHIP — shown prominently on About page
  {
    name: 'Bro. Marc',
    title: 'Pastor & Founder',
    ministry: 'Preaching, Teaching, and Church Leadership',
    bio: "Bro. Marc has been walking with the Lord since his early twenties, and for approximately ten years he has led and built the church community that is now Acts 242 Church of Christ. What began as Mustard Seed Faith Christian Church in Parañaque grew under his leadership into a formally incorporated congregation — officially registered with the Philippine SEC as Acts 242 Church of Christ Corporation in February 2026. By profession an accountant, Bro. Marc now serves as full-time pastor, devoting his life to raising up the next generation of faithful disciples. His ministry is shaped by the pattern of Acts 2:42: the apostles' teaching, fellowship, the breaking of bread, and prayer.",
    photo: undefined, // PLACEHOLDER — add path when photo is available: '/images/leadership/bro-marc.jpg'
    isCore: true,
  },
  {
    name: 'Sis. Normie',
    title: "Women's Ministry Lead",
    ministry: 'Female Ministry and Pastoral Support',
    photo: '/images/church/womens-ministry.jpg',
    isCore: true,
  },
  {
    name: 'Sis. Karol',
    title: "Church Elder & Women's Ministry Leader",
    ministry: "Children's Ministry and Single Mothers Ministry",
    photo: undefined, // PLACEHOLDER
    isCore: true,
  },

  // EXTENDED TEAM — shown in a secondary section
  {
    name: 'Bro. Rovince',
    title: 'Discipleship Group Leader',
    ministry: 'Discipleship Groups, Print Materials, Sunday Service',
    photo: undefined,
    isCore: false,
  },
  {
    name: 'Bro. James',
    title: 'Worship & Sunday Service',
    ministry: 'Worship Leading and Sunday Service',
    photo: undefined,
    isCore: false,
  },
  {
    name: 'Bro. Kiev',
    title: 'Discipleship Group Leader',
    ministry: 'Discipleship Groups and Sunday Service',
    photo: undefined,
    isCore: false,
  },
  {
    name: 'Bro. Mike',
    title: 'Worship Ministry',
    ministry: 'Worship Leading and Sunday Service',
    photo: undefined,
    isCore: false,
  },
  {
    name: 'Bro. Julian',
    title: 'Audio Visual Ministry',
    ministry: 'Technical Production and Sunday Service',
    photo: undefined,
    isCore: false,
  },
  {
    name: 'Sis. Raquel',
    title: 'Worship & Discipleship Group Leader',
    ministry: 'Worship Ministry and Discipleship Groups',
    photo: undefined,
    isCore: false,
  },
]

export const coreLeadership = leadership.filter((l) => l.isCore)
export const extendedTeam = leadership.filter((l) => !l.isCore)
