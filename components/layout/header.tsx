'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { siteConfig } from '@/data/site'
import { ButtonLink } from '@/components/ui/button-link'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/testimonies', label: 'Testimonies' },
  { href: '/live', label: 'Live' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/midweek', label: 'Midweek' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/discipleship', label: 'Discipleship' },
  { href: '/materials', label: 'Materials' },
  { href: '/connect', label: 'Connect' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const logoSrc = mounted && resolvedTheme === 'dark' ? '/images/logo-white.svg' : '/images/logo.svg'

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-content items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src={logoSrc}
            alt={siteConfig.fullChurchName}
            width={120}
            height={48}
            className="h-10 w-auto object-contain"
            priority
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement
              img.src = mounted && resolvedTheme === 'dark' ? '/images/logo-dark.png' : '/images/logo.png'
            }}
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition ${
                isActive(item.href)
                  ? 'font-semibold text-navy dark:text-amber-300'
                  : 'text-foreground hover:text-navy dark:text-slate-300 dark:hover:text-amber-300'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href="/welcome"
            className="rounded-2xl border border-border px-4 py-2 text-sm font-semibold text-navy transition hover:bg-muted dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            Start Here
          </Link>
        </div>

        <button
          className="flex flex-col items-center justify-center gap-1.5 rounded-lg p-2 text-navy dark:text-slate-200 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-border bg-white shadow-calm dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <nav className="mx-auto flex flex-col px-4 pb-4 pt-2 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-border py-3 text-sm font-medium last:border-0 dark:border-slate-800 ${
                  isActive(item.href)
                    ? 'font-semibold text-navy dark:text-amber-300'
                    : 'text-foreground hover:text-navy dark:text-slate-300 dark:hover:text-amber-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center justify-between gap-3 pt-4">
              <ThemeToggle />
              <ButtonLink href="/welcome" onClick={() => setMenuOpen(false)} className="flex-1 justify-center">
                Start Here
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
