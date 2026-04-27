export function VerseBlock({ reference, text }: { reference: string; text: string }) {
  return (
    <div className="rounded-3xl border border-border bg-white p-8 shadow-calm dark:border-slate-700 dark:bg-slate-800">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy dark:text-amber-300">{reference}</p>
      <p className="mt-4 text-xl leading-9 text-foreground dark:text-slate-100">{text}</p>
    </div>
  )
}