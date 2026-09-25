import Link from 'next/link'
import Image from 'next/image'
import { MaterialItem } from '@/types/content'
import { Tag } from '@/components/ui/tag'

const categoryAccent: Record<string, string> = {
  'Foundation and Discipleship': 'border-t-4 border-t-navy',
  'Teaching Series': 'border-t-4 border-t-purple-500',
  'Evangelism Materials': 'border-t-4 border-t-amber-500',
  'Sermon Materials': 'border-t-4 border-t-blue-500',
}

export function MaterialCard({ item }: { item: MaterialItem }) {
  const isPdf = item.href.endsWith('.pdf')
  const accent = categoryAccent[item.category] ?? ''

  return (
    <article className={`group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-white transition hover:-translate-y-1 hover:border-navy/30 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-amber-300/40 ${accent}`}>
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-navy/5 transition group-hover:bg-navy/10 dark:bg-amber-300/5 dark:group-hover:bg-amber-300/10" />
      {/* These are all portrait document covers. object-cover cropped them to a
          centered band that cut the title off, so they are contained instead. */}
      {item.thumbnail && (
        <div className="relative h-52 overflow-hidden border-b border-border bg-muted dark:border-slate-700 dark:bg-slate-900">
          <Image
            src={item.thumbnail}
            alt=""
            fill
            sizes="(min-width: 1280px) 22rem, (min-width: 768px) 45vw, 100vw"
            className="object-contain p-4 transition group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="relative flex flex-1 flex-col p-6">
        <Tag>{item.category}</Tag>
        <h3 className="mt-4 text-xl font-semibold text-foreground dark:text-slate-100">{item.title}</h3>
        <p className="mt-3 text-sm leading-7 text-text-soft dark:text-slate-400">{item.description}</p>
        {item.meta && (
          <p className="mt-2 text-xs font-medium text-navy dark:text-amber-300">{item.meta}</p>
        )}
        <div className="flex-1" />
        {item.comingSoon ? (
          <p className="mt-6 inline-flex w-fit items-center rounded-full bg-muted px-3 py-1 text-sm font-semibold text-text-soft dark:bg-slate-700 dark:text-slate-300">
            Coming soon
          </p>
        ) : (
          <Link
            href={item.href}
            target={isPdf ? '_blank' : undefined}
            rel={isPdf ? 'noopener noreferrer' : undefined}
            className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-navy transition group-hover:gap-2 hover:underline dark:text-amber-300"
          >
            {item.actionLabel} <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </article>
  )
}
