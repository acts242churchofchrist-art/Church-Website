import type { Metadata } from 'next'
import { Source_Serif_4 } from 'next/font/google'
import { MessageCircle } from 'lucide-react'
import './globals.css'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Providers } from '@/components/layout/providers'
import { siteConfig, SITE_URL } from '@/data/site'

/**
 * The approved Grow redesign sets every display heading in a serif. next/font
 * self-hosts the face at build time and serves it from /_next, which is what makes it
 * usable at all here — the design's own `fonts.googleapis.com` link is blocked by
 * `style-src 'self'` / `font-src 'self'` in the CSP.
 *
 * Variable weight, latin only, so it is one file rather than four.
 */
const displaySerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteConfig.fullChurchName} | Discipleship and Church`,
    template: `%s — ${siteConfig.churchName}`,
  },
  description:
    'Acts 242 Church of Christ is a church devoted to God\'s Word, prayer, fellowship, and the making of disciples. Based in Parañaque, Metro Manila.',
  keywords: ['Acts 242', 'Church of Christ', 'Parañaque', 'discipleship', 'foundation guide', 'Bible study'],
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: SITE_URL,
    siteName: siteConfig.fullChurchName,
    title: `${siteConfig.fullChurchName} | Discipleship and Church`,
    description:
      'A church devoted to God\'s Word, prayer, fellowship, and the making of disciples. Parañaque, Metro Manila.',
    images: [
      {
        url: '/images/logo-dark.png',
        width: 600,
        height: 240,
        alt: siteConfig.fullChurchName,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: siteConfig.fullChurchName,
    description: 'A church devoted to God\'s Word, prayer, fellowship, and discipleship.',
    images: ['/images/logo-dark.png'],
  },
  icons: {
    icon: '/images/logo.svg',
    apple: '/images/logo.png',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Church',
  name: siteConfig.fullChurchName,
  alternateName: siteConfig.churchName,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.svg`,
  email: siteConfig.email,
  // `telephone` intentionally omitted — see the note in data/site.ts
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4707 Dr Arcadio Santos Ave',
    addressLocality: 'Parañaque',
    addressRegion: 'Metro Manila',
    postalCode: '1700',
    addressCountry: 'PH',
  },
  sameAs: [siteConfig.facebookUrl, siteConfig.youtubeUrl],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={displaySerif.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased dark:bg-slate-950 dark:text-slate-100">
        <Providers>
          {/* Parked off-screen by transform rather than `sr-only`, so focusing it
              reliably brings it back without fighting utility ordering. */}
          <a
            href="#main"
            className="fixed left-4 top-4 z-50 -translate-y-24 rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0 dark:bg-amber-300 dark:text-navy"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />

          {/* Persistent Messenger link. A plain anchor — no state, no client component —
              so it costs nothing on all prerendered pages. The congregation arrives from
              Facebook and is usually already signed in, so m.me opens straight into a
              conversation. bottom-6 rather than env(safe-area-inset-bottom): without
              viewport-fit=cover iOS reports every inset as 0px, so the env() would be a
              no-op and the button would sit under the home indicator. */}
          <a
            href={siteConfig.messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message us on Messenger"
            className="fixed bottom-6 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-glow transition hover:bg-navy-soft focus-visible:outline-offset-4 dark:bg-amber-300 dark:text-navy dark:hover:bg-amber-200 sm:right-6"
          >
            <MessageCircle className="h-6 w-6" aria-hidden />
          </a>
        </Providers>
      </body>
    </html>
  )
}
