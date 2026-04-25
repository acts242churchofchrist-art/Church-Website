export function VerseBlock({ reference, text }: { reference: string; text: string }) {
  return (
    <div className="rounded-3xl border border-border bg-white p-8 shadow-calm">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">{reference}</p>
      <p className="mt-4 text-xl leading-9 text-foreground">{text}</p>
    </div>
  )
}