import Link from 'next/link'
import { MaterialItem } from '@/types/content'
import { Tag } from '@/components/ui/tag'

const categoryAccent: Record<string, string> = {
  'Foundation and Discipleship': 'border-t-4 border-t-navy',
  'Evangelism Materials': 'border-t-4 border-t-amber-500',
  'Sermon Materials': 'border-t-4 border-t-blue-500',
}

export function MaterialCard({ item }: { item: MaterialItem }) {
  const isPdf = item.href.endsWith('.pdf')
  const accent = categoryAccent[item.category] ?? ''

  return (
    <article className={`group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-white transition hover:-translate-y-1 hover:border-navy/30 hover:shadow-calm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-amber-300/40 ${accent}`}>
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-navy/5 transition group-hover:bg-navy/10 dark:bg-amber-300/5 dark:group-hover:bg-amber-300/10" />
      {item.thumbnail && (
        <div className="overflow-hidden border-b border-border dark:border-slate-700">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-40 w-full object-cover transition group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="relative flex flex-1 flex-col p-6">
        <Tag>{item.category}</Tag>
        <h3 className="mt-4 text-xl font-semibold text-foreground dark:text-slate-100">{item.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-text-soft dark:text-slate-400">{item.description}</p>
        <Link
          href={item.href}
          target={isPdf ? '_blank' : undefined}
          rel={isPdf ? 'noopener noreferrer' : undefined}
          className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-navy transition group-hover:gap-2 hover:underline dark:text-amber-300"
        >
          {item.actionLabel} <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  )
}
