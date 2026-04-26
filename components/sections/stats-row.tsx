const stats = [
  { value: '7', label: 'Foundation Lessons' },
  { value: 'Weekly', label: 'Live Preaching' },
  { value: 'Acts 2:42', label: 'Our Pattern' },
]

export function StatsRow() {
  return (
    <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white px-6 py-8 text-center transition hover:bg-muted"
        >
          <p className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">{stat.value}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-soft">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}
