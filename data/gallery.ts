export type GalleryPhoto = {
  filename: string // just the filename — path is inferred from the album folder
  alt: string
  featured?: boolean // featured photos appear first and larger
}

export type GalleryAlbum = {
  id: string
  title: string
  date: string // ISO YYYY-MM-DD
  ministry: string
  description: string
  story: string // longer paragraph for the album detail page
  folder: string // path under /public/images/gallery/
  photos: GalleryPhoto[]
  relatedEventId?: string // matches an event id in events.ts
  relatedSermonSlug?: string // matches a sermon slug
}

export const galleryAlbums: GalleryAlbum[] = [
  {
    id: '2026-05-10-painting-activity',
    title: 'Painting for the Gospel',
    date: '2026-05-10',
    ministry: 'Teens, Young Adults & Kids',
    description:
      "Kids, teens, and young adults came together to paint bookmarks — each one a gift to be given out during the church's upcoming Ice Cream Evangelism outreach.",
    story:
      'After the Sunday service on May 10, the kids, teens, and young adults of Acts 242 gathered around the table with paintbrushes, markers, and colors. Each one created a hand-painted bookmark — not to keep, but to give away. At the back of each bookmark, every member wrote their favorite Bible verse. These bookmarks will be given out during the Ice Cream Evangelism outreach as a personal gift from the congregation — a piece of creativity, a word of Scripture, and a door to conversation. It was a reminder that sharing the gospel can begin with something as simple as paint on paper.',
    folder: '/images/gallery/2026-05-10-painting-activity',
    relatedEventId: 'teens-painting-may10',
    photos: [
      // Featured — shown first and larger
      { filename: '685157099_1264349015724615_1682227914448546349_n.jpg', alt: 'Kids and teens holding up their painted bookmarks', featured: true },
      { filename: '688893425_812346234968666_1086903014659702592_n.jpg', alt: 'Full group showing their finished bookmarks — kids, teens, young adults', featured: true },
      { filename: '688137770_1949878722556092_8276604213815091458_n.jpg', alt: 'Kids and teens painting at the activity table', featured: true },
      // Regular
      { filename: '662689490_877438345373106_3441765376910474690_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '668064315_2320156415177418_8023282731414772571_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '668146567_1421763269387920_8250235646956029193_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '672655202_1491196459135258_4075658028036087455_n.jpg', alt: 'Kids enjoying ice cream during the activity' },
      { filename: '674086245_1311362314264007_6727062901234604503_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '684259854_2156405444902161_1345077246876011302_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '684923774_1548859980097326_5925033225128493110_n.jpg', alt: 'Kids picking up their ice cream at the counter' },
      { filename: '684938065_2203020580471632_5248385045716569275_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '685088101_1454810103000441_6032522299452235116_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '685177503_1148331994105470_8133094476060896467_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '685259980_1566229631588212_2252992325180161916_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '685426255_1936425150328804_4464947260387616254_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '685468347_975187995483015_7390510095487583179_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '685636621_1469094194756184_7438321532372521752_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '685667644_1608273117557225_1015484308620811410_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '685708441_1656355312280099_5569920451894476218_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '685937485_2063583264569841_2699026639907502682_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '687682940_3244821032372021_4835518820046048805_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '687744878_1475011914422594_1464355321286625865_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '687764208_2300020793859298_7295856164248465564_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '687892215_799681189667878_6524887190507910995_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '687969266_1368824825071625_1378265441982447150_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '688626194_1715610096552574_1077840339791288967_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '688695441_1330361012346413_7501584571655077662_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '688940666_813285831539940_6984773972995181142_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '689072625_2079872285908772_6074801901549770481_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '689103634_1316702257092507_4611345593800798479_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '689230004_1673221947361493_3070896716221836503_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '689251294_3970095579963303_7523058889712001642_n.jpg', alt: 'Wider view of the painting activity in progress' },
      { filename: '689306824_974986561585961_7724754982746508226_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '689358444_1862519921086011_3527513773884989979_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '689486447_1502074067953985_375780479310609892_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '690144800_990040226709519_2825703384719777580_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '690896127_1484520999718938_1140868165942258806_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '690938621_970835012584883_1370227227527787447_n.jpg', alt: 'Painting activity — May 10, 2026' },
      { filename: '691111572_1301299695522568_2071123769939332432_n.jpg', alt: 'Painting activity — May 10, 2026' },
    ],
  },
]
