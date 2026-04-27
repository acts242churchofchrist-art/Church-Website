export function FormLabel({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-foreground dark:text-slate-200">
      {children}
      {required && <span className="ml-1 text-navy dark:text-amber-300" aria-hidden="true">*</span>}
    </label>
  )
}

export function FormInput({ id, name, type = 'text', placeholder, required }: {
  id: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      className="mt-2 block w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-text-soft focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-amber-300 dark:focus:ring-amber-300"
    />
  )
}

export function FormTextarea({ id, name, placeholder, required, rows = 5 }: {
  id: string
  name: string
  placeholder?: string
  required?: boolean
  rows?: number
}) {
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      required={required}
      rows={rows}
      className="mt-2 block w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-text-soft focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-amber-300 dark:focus:ring-amber-300"
    />
  )
}

export function FormCheckbox({ id, name, label }: { id: string; name: string; label: string }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
      <input
        id={id}
        name={name}
        type="checkbox"
        value="yes"
        className="mt-0.5 h-4 w-4 rounded border-border text-navy focus:ring-navy dark:border-slate-600 dark:bg-slate-800"
      />
      <span className="text-sm leading-6 text-text-soft dark:text-slate-400">{label}</span>
    </label>
  )
}
