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
  "frame-src https://www.youtube.com https://youtube.com https://www.facebook.com",
  "connect-src 'self' https://formspree.io",
  "media-src 'self' https://www.youtube.com",
].join('; ')

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],

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
