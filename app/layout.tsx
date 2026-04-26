import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { siteConfig } from '@/data/site'

const siteUrl = 'https://www.acts242churchofchrist.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    url: siteUrl,
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
  url: 'https://www.acts242churchofchrist.com',
  logo: 'https://www.acts242churchofchrist.com/images/logo.svg',
  email: siteConfig.email,
  telephone: siteConfig.phone,
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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
