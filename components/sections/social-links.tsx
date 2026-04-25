import Link from 'next/link'
import { siteConfig } from '@/data/site'

export function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-4">
      <Link href={siteConfig.facebookUrl} target="_blank" className="rounded-2xl border border-border px-4 py-3 text-sm font-medium text-navy hover:bg-muted">
        Facebook
      </Link>
      <Link href={siteConfig.youtubeUrl} target="_blank" className="rounded-2xl border border-border px-4 py-3 text-sm font-medium text-navy hover:bg-muted">
        YouTube
      </Link>
    </div>
  )
}