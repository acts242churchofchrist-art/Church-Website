import Link from 'next/link'
import Image from 'next/image'
import { MaterialItem } from '@/types/content'

export function MaterialHeroCard({ item }: { item: MaterialItem }) {
  const isPdf = item.href.endsWith('.pdf')

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-white dark:border-slate-700 dark:bg-slate-800">
      <div className="grid lg:grid-cols-[2fr_3fr]">
        {/* Thumbnail — left on desktop, top on mobile */}
        <div className="relative min-h-[200px] overflow-hidden bg-navy lg:min-h-[320px]">
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain p-6"
            />
          ) : (
            <div className="flex h-full min-h-[200px] items-center justify-center bg-gradient-to-br from-navy to-navy-soft lg:min-h-[320px]">
              <span className="text-5xl font-bold text-white/20">A242</span>
            </div>
          )}
        </div>

        {/* Content — right on desktop, bottom on mobile */}
        <div className="flex flex-col justify-center p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">
            {item.category}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl dark:text-slate-100">
            {item.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-text-soft dark:text-slate-400">{item.description}</p>

          {item.meta && (
            <p className="mt-3 text-sm font-medium text-navy dark:text-amber-300">{item.meta}</p>
          )}

          <ul className="mt-5 space-y-1.5">
            <li className="flex items-center gap-2 text-sm text-text-soft dark:text-slate-400">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-navy dark:bg-amber-300" />
              Seven lessons, each opening with its purpose
            </li>
            <li className="flex items-center gap-2 text-sm text-text-soft dark:text-slate-400">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-navy dark:bg-amber-300" />
              Leader&apos;s notes, reflection pages, and a full Scripture index
            </li>
          </ul>

          <div className="mt-8">
            <Link
              href={item.href}
              target={isPdf ? '_blank' : undefined}
              rel={isPdf ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center rounded-2xl bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft dark:bg-amber-300 dark:text-navy dark:hover:bg-amber-200"
            >
              {item.actionLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
