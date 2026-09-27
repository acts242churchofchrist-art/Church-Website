/**
 * The canonical public origin. Every absolute URL on the site — metadata, Open Graph
 * images, JSON-LD, the sitemap and robots.txt — must be built from this one constant.
 * Four files previously hardcoded their own, and two still pointed at a retired
 * preview domain, which silently broke every shared sermon's preview image.
 */
export const SITE_URL = 'https://www.acts242churchofchrist.com'

export const siteConfig = {
  churchName: 'Acts 242',
  fullChurchName: 'Acts 242 Church of Christ',
  email: 'acts242churchofchrist@gmail.com',
  // NOTE: The church phone number is deliberately NOT stored here as text.
  // Search engines and scrapers were indexing it and auto-attributing the
  // number to "Acts242". It is now shown only as an image on /connect
  // (public/images/contact/phone-*.png) and in the sermon brochures.
  // Do not re-add a `phone` string, a tel: link, or a JSON-LD `telephone`
  // field — that would undo the fix.
  address: '4707 Dr Arcadio Santos Ave, Parañaque, 1700 Metro Manila',
  mapsUrl: 'https://maps.app.goo.gl/TcXp4d7Xth8ZUQEMA',
  facebookUrl: 'https://www.facebook.com/profile.php?id=100069363818681',
  messengerUrl: 'https://m.me/100069363818681',
  youtubeUrl: 'https://www.youtube.com/@Acts242ChurchofChrist',
  youtubeChannelId: 'UC2wraRMnOSzefhVFjXJ51hg',
  liveEmbedUrl: 'https://www.youtube.com/embed/live_stream?channel=UC2wraRMnOSzefhVFjXJ51hg&autoplay=0&rel=0',

  // Formspree endpoints
  prayerRequestFormUrl: 'https://formspree.io/f/mdayzprr',
  welcomeFormUrl: 'https://formspree.io/f/maqajlgr',
  talkToAPastorFormUrl: 'https://formspree.io/f/mojywpzd',

  // Foundation verse
  verseReference: 'Acts 2:42',
  verseText:
    "They devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer.",

  // Annual theme
  yearTheme: 'All About JESUS',
  yearThemeYear: 2026,

  // Service schedule
  serviceHours: [
    { day: 'Sunday', time: '10:00 AM – 12:30 PM', description: 'Sunday Worship Service' },
    { day: 'Friday', time: '6:00 PM – 8:00 PM', description: 'Midweek Devotional' },
  ],
}

/**
 * Prose form of the schedule — "every Sunday at 10:00 AM and every Friday at 6:00 PM".
 * Pages render this instead of spelling the times out, so changing serviceHours above
 * can never leave a stale time behind in body copy.
 */
export const liveScheduleSentence = siteConfig.serviceHours
  .map((s) => `every ${s.day} at ${s.time.split(/[–-]/)[0].trim()}`)
  .join(' and ')
