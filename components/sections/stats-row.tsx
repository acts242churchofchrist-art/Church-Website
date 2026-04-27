const stats = [
  { value: '7', label: 'Foundation Lessons' },
  { value: 'Weekly', label: 'Live Preaching' },
  { value: 'Acts 2:42', label: 'Our Pattern' },
]

export function StatsRow() {
  return (
    <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border dark:border-slate-700 dark:bg-slate-700 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white px-6 py-8 text-center transition hover:bg-muted dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          <p className="text-3xl font-bold tracking-tight text-navy sm:text-4xl dark:text-amber-300">{stat.value}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-soft dark:text-slate-400">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}
