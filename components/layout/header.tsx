'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/data/site'
import { ButtonLink } from '@/components/ui/button-link'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/live', label: 'Live' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/discipleship', label: 'Discipleship' },
  { href: '/materials', label: 'Materials' },
  { href: '/connect', label: 'Connect' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-content items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          {/* SVG preferred; falls back to PNG if SVG not yet uploaded */}
          <Image
            src="/images/logo.svg"
            alt={siteConfig.fullChurchName}
            width={120}
            height={48}
            className="h-10 w-auto object-contain"
            priority
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement
              img.src = '/images/logo.png'
            }}
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition ${
                isActive(item.href) ? 'text-navy font-semibold' : 'text-foreground hover:text-navy'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/welcome"
          className="hidden rounded-2xl border border-border px-4 py-2 text-sm font-semibold text-navy hover:bg-muted md:inline-flex"
        >
          Start Here
        </Link>

        <button
          className="flex flex-col items-center justify-center gap-1.5 rounded-lg p-2 text-navy md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="block h-0.5 w-5 bg-navy" />
          <span className="block h-0.5 w-5 bg-navy" />
          <span className="block h-0.5 w-5 bg-navy" />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-border bg-white shadow-calm md:hidden">
          <nav className="mx-auto flex flex-col px-4 pb-4 pt-2 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-border py-3 text-sm font-medium last:border-0 ${
                  isActive(item.href) ? 'text-navy font-semibold' : 'text-foreground hover:text-navy'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
              <ButtonLink href="/welcome" onClick={() => setMenuOpen(false)} className="w-full justify-center">
                Start Here
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
