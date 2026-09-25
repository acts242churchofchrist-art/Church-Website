import Image from 'next/image'

type LeaderAvatarProps = {
  name: string
  photo?: string
  size?: 'sm' | 'md' | 'lg'
}

const SIZES = {
  sm: { className: 'h-10 w-10 text-sm', px: 40 },
  md: { className: 'h-16 w-16 text-lg', px: 64 },
  lg: { className: 'h-24 w-24 text-2xl', px: 96 },
} as const

export function LeaderAvatar({ name, photo, size = 'md' }: LeaderAvatarProps) {
  const { className, px } = SIZES[size]

  // "Bro. Marc" → "BM", "Sis. Karol" → "SK"
  const initials = name
    .split(' ')
    .filter((part) => !['Bro.', 'Sis.', 'Bro', 'Sis'].includes(part))
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  if (photo) {
    return (
      <Image
        src={photo}
        alt={name}
        width={px}
        height={px}
        className={`${className} shrink-0 rounded-full border-2 border-border object-cover dark:border-slate-700`}
      />
    )
  }

  return (
    // role="img" is required for aria-label to be honoured — on a bare div ARIA
    // ignores it and a screen reader announces the raw initials instead of the name.
    <div
      role="img"
      aria-label={`${name} — photo coming soon`}
      className={`${className} flex shrink-0 items-center justify-center rounded-full border-2 border-border bg-navy font-bold text-white dark:border-slate-700`}
    >
      <span aria-hidden>{initials}</span>
    </div>
  )
}
