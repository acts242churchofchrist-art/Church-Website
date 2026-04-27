import Link from 'next/link'
import { cn } from '@/lib/utils'

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className,
  onClick,
}: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition',
        variant === 'primary' && 'bg-navy text-white hover:bg-navy-soft dark:bg-amber-300 dark:text-navy dark:hover:bg-amber-200',
        variant === 'secondary' && 'border border-border bg-white text-navy hover:bg-muted dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
        variant === 'ghost' && 'text-navy underline-offset-4 hover:underline dark:text-amber-300',
        className,
      )}
    >
      {children}
    </Link>
  )
}