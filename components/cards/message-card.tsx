import Link from 'next/link'
import { MessageItem } from '@/types/content'

export function MessageCard({ item }: { item: MessageItem }) {
  return (
    <article className="rounded-3xl border border-border bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">{item.date}</p>
      <h3 className="mt-3 text-xl font-semibold text-foreground dark:text-slate-100">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-text-soft dark:text-slate-400">{item.description}</p>
      <Link href={item.href} target="_blank" className="mt-6 inline-flex text-sm font-semibold text-navy hover:underline dark:text-amber-300">
        Watch message
      </Link>
    </article>
  )
}