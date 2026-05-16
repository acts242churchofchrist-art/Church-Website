export type LessonSection = {
  label: string
  content: string
}

export type PassageBlock = {
  reference: string
  text: string
}

export type Lesson = {
  lessonNumber: number
  slug: string
  title: string
  summary: string
  purpose: string
  mainQuestion: string
  explanation: string
  passages: PassageBlock[]
  understand: LessonSection[]
  reflection: string
  challenge: string
  prayer: string
  nextStepLabel: string
  nextStepHref: string
  videoUrl?: string
  transcript?: string
}

export type MaterialCategory = 'Foundation and Discipleship' | 'Sermon Materials' | 'Evangelism Materials'

export type MaterialItem = {
  id: string
  title: string
  description: string
  category: MaterialCategory
  featured?: boolean
  actionLabel: string
  href: string
  thumbnail?: string // path in /public/images/materials/
  comingSoon?: boolean
}

export type MessageItem = {
  title: string
  date: string
  description: string
  href: string
}

export type SermonFrontmatter = {
  slug: string
  title: string
  preacher: string
  date: string
  passage: string
  summary: string
  youtubeUrl?: string
  facebookUrl?: string
  driveUrl?: string // Google Drive video (edited/produced recordings)
  pptxUrl?: string
  posterImage?: string
  brochureImages?: {
    front?: string
    inside?: string
  }
}

export type Sermon = SermonFrontmatter & {
  content: string
}

export type ArchiveYear = {
  year: number
  label: string
  description?: string
  driveFolderUrl: string
  sermonCount?: number
}