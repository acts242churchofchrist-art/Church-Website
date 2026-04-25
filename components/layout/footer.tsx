import Link from 'next/link'
import { siteConfig } from '@/data/site'

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto grid max-w-content gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-navy">{siteConfig.fullChurchName}</p>
          <p className="mt-2 text-sm text-text-soft">{siteConfig.address}</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-text-soft">
            {siteConfig.verseReference} — {siteConfig.verseText}
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-foreground">
          <a href={`mailto:${siteConfig.email}`} className="hover:text-navy">
            {siteConfig.email}
          </a>
          <Link href={siteConfig.facebookUrl} target="_blank" className="hover:text-navy">
            Facebook
          </Link>
          <Link href={siteConfig.youtubeUrl} target="_blank" className="hover:text-navy">
            YouTube
          </Link>
          <div className="mt-4 flex gap-4 border-t border-border pt-4 text-xs text-text-soft">
            <Link href="/privacy-policy" className="hover:text-navy">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-navy">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
