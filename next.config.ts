import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const isDev = process.env.NODE_ENV === 'development'

const csp = [
  "default-src 'self'",
  // 'unsafe-eval' is required by Next.js Fast Refresh in development only
  isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  // drive.google.com is required by sermons that set `driveUrl` — the detail pages
  // build a Drive /preview iframe for those.
  // www.youtube.com must stay alongside the nocookie host: siteConfig.liveEmbedUrl is
  // still a youtube.com URL, and youtubeEmbedUrl() falls through to the original URL
  // when it cannot parse a video id.
  'frame-src https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com https://www.facebook.com https://drive.google.com',
  "connect-src 'self' https://formspree.io",
  "media-src 'self' https://www.youtube.com",
].join('; ')

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],

  // Two lockfiles exist (one here, one in the home directory), and without this Next
  // infers the home directory as the workspace root when collecting build traces.
  outputFileTracingRoot: __dirname,

  images: {
    // Sermon posters and brochures are large PNGs; AVIF first cuts them substantially
    // for the mobile-on-cellular audience, with WebP as the fallback.
    formats: ['image/avif', 'image/webp'],
    // The default 60s makes the optimiser re-encode the same poster constantly. A day
    // removes that churn, but stays short enough that replacing an image in place —
    // as the Foundation Guide cover just was — self-heals instead of serving stale
    // art for months. The optimised URL keys on the source path, not its contents.
    minimumCacheTTL: 86400,
  },

  async redirects() {
    return [
      { source: '/live', destination: '/sermons#live', permanent: true },
      { source: '/midweek', destination: '/sermons#midweek', permanent: true },
      { source: '/testimonies', destination: '/community', permanent: true },
      { source: '/gallery', destination: '/community#gallery', permanent: true },
      { source: '/discipleship', destination: '/grow', permanent: true },
      { source: '/materials', destination: '/grow#materials', permanent: true },
    ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ]
  },
}

export default withMDX(nextConfig)
