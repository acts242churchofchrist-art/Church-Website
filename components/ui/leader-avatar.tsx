type LeaderAvatarProps = {
  name: string
  photo?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LeaderAvatar({ name, photo, size = 'md' }: LeaderAvatarProps) {
  const sizeClasses = {
    sm: 'h-10 w-10 text-sm',
    md: 'h-16 w-16 text-lg',
    lg: 'h-24 w-24 text-2xl',
  }

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
      <img
        src={photo}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-border`}
      />
    )
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-navy flex items-center justify-center font-bold text-white border-2 border-border shrink-0`}
      aria-label={`${name} — photo coming soon`}
    >
      {initials}
    </div>
  )
}
