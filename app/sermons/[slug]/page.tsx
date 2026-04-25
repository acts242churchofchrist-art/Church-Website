import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import * as runtime from 'react/jsx-runtime'
import { evaluate } from '@mdx-js/mdx'
import { Section } from '@/components/layout/section'
import { ButtonLink } from '@/components/ui/button-link'
import { getAllSermons, getSermonBySlug, getAdjacentSermons } from '@/lib/sermons'
import { siteConfig } from '@/data/site'

const SITE_URL = 'https://acts242.vercel.app'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllSermons().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const sermon = getSermonBySlug(slug)
  if (!sermon) return {}
  return {
    title: sermon.title,
    description: sermon.summary,
    openGraph: {
      title: sermon.title,
      description: sermon.summary,
      type: 'article',
      images: sermon.posterImage
        ? [{ url: `${SITE_URL}${sermon.posterImage}` }]
        : [{ url: `${SITE_URL}/images/logo.svg` }],
    },
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function youtubeEmbedUrl(url: string): string {
  const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : url
}

function facebookEmbedUrl(url: string): string {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=560&height=315&appId`
}

export default async function SermonPage({ params }: Props) {
  const { slug } = await params
  const sermon = getSermonBySlug(slug)
  if (!sermon) notFound()

  const { previous, next } = getAdjacentSermons(slug)

  const { default: MDXContent } = await evaluate(sermon.content, {
    ...(runtime as Parameters<typeof evaluate>[1]),
  })

  const hasPoster = Boolean(sermon.posterImage)
  const hasVideo = Boolean(sermon.youtubeUrl || sermon.facebookUrl)
  const hasBrochure = Boolean(sermon.brochureImages?.front || sermon.brochureImages?.inside)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: sermon.title,
    datePublished: sermon.date,
    author: { '@type': 'Person', name: sermon.preacher },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.fullChurchName,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.svg` },
    },
    description: sermon.summary,
    image: sermon.posterImage ? `${SITE_URL}${sermon.posterImage}` : `${SITE_URL}/images/logo.svg`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. Hero — poster or text ── */}
      {hasPoster ? (
        <div className="relative min-h-[380px] w-full overflow-hidden bg-navy sm:min-h-[460px]">
          <Image
            src={sermon.posterImage!}
            alt={sermon.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent" />
          {/* text */}
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-content px-4 pb-10 sm:px-6 lg:px-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                {formatDate(sermon.date)} — {sermon.preacher}
              </p>
              <h1 className="mt-3 max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                {sermon.title}
              </h1>
              <p className="mt-2 text-base font-medium text-white/80">{sermon.passage}</p>
            </div>
          </div>
        </div>
      ) : (
        <Section>
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-navy">
              {formatDate(sermon.date)} — {sermon.preacher}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {sermon.title}
            </h1>
            <p className="mt-3 text-base font-medium text-navy">{sermon.passage}</p>
            <p className="mt-4 text-lg leading-8 text-text-soft">{sermon.summary}</p>
          </div>
        </Section>
      )}

      {/* ── 2. Video embed ── */}
      <Section className={hasPoster ? '' : 'bg-muted'}>
        {sermon.youtubeUrl ? (
          <div className="overflow-hidden rounded-3xl border border-border bg-black">
            <iframe
              className="aspect-video w-full"
              src={youtubeEmbedUrl(sermon.youtubeUrl)}
              title={sermon.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : sermon.facebookUrl ? (
          /* Facebook Live videos are portrait (9:16). Centre the iframe and cap width so it doesn't stretch wide. */
          <div className="flex justify-center">
            <div className="overflow-hidden rounded-3xl border border-border bg-black" style={{ width: '100%', maxWidth: 420 }}>
              <iframe
                src={facebookEmbedUrl(sermon.facebookUrl)}
                className="w-full"
                style={{ aspectRatio: '9/16', border: 'none', overflow: 'hidden', display: 'block' }}
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                scrolling="no"
              />
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-border bg-white p-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Recording</p>
            <p className="mt-3 text-base text-text-soft">
              Recording will be posted after Sunday's service.{' '}
              <a
                href={siteConfig.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-navy hover:underline"
              >
                Subscribe on YouTube
              </a>{' '}
              to be notified.
            </p>
          </div>
        )}
      </Section>

      {/* ── 3. Sermon prose ── */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <article className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-navy prose-h2:mt-10 prose-h2:mb-4 prose-p:leading-[1.85] prose-p:text-foreground prose-blockquote:border-l-4 prose-blockquote:border-navy prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-text-soft prose-blockquote:not-italic prose-strong:text-foreground prose-strong:font-semibold prose-a:text-navy prose-a:no-underline hover:prose-a:underline">
            <MDXContent />
          </article>
        </div>
      </Section>

      {/* ── 4. Brochure panels ── */}
      {hasBrochure && (
        <Section className="bg-muted">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Sunday Brochure</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">This week's brochure</h2>
            <div className="mt-8 space-y-6">
              {sermon.brochureImages?.front && (
                <div>
                  <a
                    href={sermon.brochureImages.front}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="overflow-hidden rounded-2xl border border-border">
                      <Image
                        src={sermon.brochureImages.front}
                        alt={`${sermon.title} — brochure front`}
                        width={1100}
                        height={850}
                        className="w-full transition group-hover:opacity-90"
                      />
                    </div>
                  </a>
                  <p className="mt-2 text-xs text-text-soft">Front — click to open full size</p>
                </div>
              )}
              {sermon.brochureImages?.inside && (
                <div>
                  <a
                    href={sermon.brochureImages.inside}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="overflow-hidden rounded-2xl border border-border">
                      <Image
                        src={sermon.brochureImages.inside}
                        alt={`${sermon.title} — brochure inside`}
                        width={1100}
                        height={850}
                        className="w-full transition group-hover:opacity-90"
                      />
                    </div>
                  </a>
                  <p className="mt-2 text-xs text-text-soft">Inside — click to open full size</p>
                </div>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. Resources ── */}
      {(hasVideo || sermon.pptxUrl || sermon.posterImage || hasBrochure) && (
        <Section className={hasBrochure ? '' : 'bg-muted'}>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Resources</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">Download & share</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {sermon.youtubeUrl && (
                <a
                  href={sermon.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-muted"
                >
                  Watch on YouTube ↗
                </a>
              )}
              {sermon.facebookUrl && (
                <a
                  href={sermon.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-muted"
                >
                  Watch on Facebook ↗
                </a>
              )}
              {sermon.pptxUrl && (
                <a
                  href={sermon.pptxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-muted"
                >
                  Download Slides ↗
                  <span className="text-xs font-normal text-text-soft">(Google Drive)</span>
                </a>
              )}
              {sermon.posterImage && (
                <a
                  href={sermon.posterImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-muted"
                >
                  Download Poster ↗
                </a>
              )}
              {sermon.brochureImages?.front && (
                <a
                  href={sermon.brochureImages.front}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-muted"
                >
                  Download Brochure (Front) ↗
                </a>
              )}
              {sermon.brochureImages?.inside && (
                <a
                  href={sermon.brochureImages.inside}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-muted"
                >
                  Download Brochure (Inside) ↗
                </a>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. Navigation footer ── */}
      <Section className="bg-muted">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            {/* Previous = older sermon */}
            <div className="min-w-0">
              {previous ? (
                <a href={`/sermons/${previous.slug}`} className="group flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-soft">
                    ← Previous sermon
                  </span>
                  <span className="mt-1 text-sm font-semibold text-navy group-hover:underline line-clamp-1">
                    {previous.title}
                  </span>
                </a>
              ) : (
                <span />
              )}
            </div>

            <ButtonLink href="/sermons" variant="secondary">
              All sermons
            </ButtonLink>

            {/* Next = newer sermon */}
            <div className="min-w-0 text-right">
              {next ? (
                <a href={`/sermons/${next.slug}`} className="group flex flex-col items-end">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-soft">
                    Next sermon →
                  </span>
                  <span className="mt-1 text-sm font-semibold text-navy group-hover:underline line-clamp-1">
                    {next.title}
                  </span>
                </a>
              ) : (
                <span />
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
