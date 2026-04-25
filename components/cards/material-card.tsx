import Link from 'next/link'
import { MaterialItem } from '@/types/content'
import { Tag } from '@/components/ui/tag'

export function MaterialCard({ item }: { item: MaterialItem }) {
  const isPdf = item.href.endsWith('.pdf')

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-border bg-white transition hover:shadow-calm">
      {item.thumbnail && (
        <div className="overflow-hidden border-b border-border">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-40 w-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <Tag>{item.category}</Tag>
        <h3 className="mt-4 text-xl font-semibold text-foreground">{item.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-text-soft">{item.description}</p>
        <Link
          href={item.href}
          target={isPdf ? '_blank' : undefined}
          rel={isPdf ? 'noopener noreferrer' : undefined}
          className="mt-6 inline-flex text-sm font-semibold text-navy hover:underline"
        >
          {item.actionLabel}
        </Link>
      </div>
    </article>
  )
}
