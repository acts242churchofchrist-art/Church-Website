'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor, Check } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const options = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'system', label: 'System', Icon: Monitor },
] as const

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden />
  }

  // Show the icon for the active resolved theme (light or dark)
  const ActiveIcon = resolvedTheme === 'dark' ? Moon : Sun

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle theme"
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-navy transition hover:bg-muted dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <ActiveIcon className="h-4 w-4" />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-11 z-50 w-40 overflow-hidden rounded-2xl border border-border bg-white shadow-calm dark:border-slate-700 dark:bg-slate-900"
        >
          {options.map(({ value, label, Icon }) => {
            const active = theme === value
            return (
              <button
                key={value}
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setTheme(value)
                  setOpen(false)
                }}
                className="flex w-full items-center justify-between px-4 py-2.5 text-sm text-foreground transition hover:bg-muted dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <span className="inline-flex items-center gap-2.5">
                  <Icon className="h-4 w-4" />
                  {label}
                </span>
                {active ? <Check className="h-4 w-4 text-navy dark:text-amber-300" /> : null}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
