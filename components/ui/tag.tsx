export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-text-soft">
      {children}
    </span>
  )
}