import { ReactNode } from 'react'

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: string
  description: string
  actions?: ReactNode
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-navy">{eyebrow}</p> : null}
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{title}</h1>
      <p className="mt-6 text-lg leading-8 text-text-soft">{description}</p>
      {actions ? <div className="mt-8 flex flex-wrap gap-4">{actions}</div> : null}
    </div>
  )
}