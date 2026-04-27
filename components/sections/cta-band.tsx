import { ReactNode } from 'react'

export function CtaBand({ title, description, actions }: { title: string; description: string; actions?: ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-muted p-8 md:p-10 dark:border-slate-700 dark:bg-slate-800">
      <h2 className="text-2xl font-bold tracking-tight text-foreground dark:text-slate-100">{title}</h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-text-soft dark:text-slate-400">{description}</p>
      {actions ? <div className="mt-6 flex flex-wrap gap-4">{actions}</div> : null}
    </div>
  )
}