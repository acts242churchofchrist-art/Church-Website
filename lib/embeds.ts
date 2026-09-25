/**
 * Video embed URL builders, shared by the sermon and midweek detail pages.
 *
 * These were duplicated verbatim in both pages, so a change to one silently shipped
 * half-done. Any new embed host added here also needs adding to the CSP `frame-src`
 * list in next.config.ts, or the iframe renders as an empty box.
 */

/**
 * youtube-nocookie.com serves the same player without setting advertising cookies
 * until playback starts.
 *
 * NOTE: this only applies to URLs we can parse into a video id. `siteConfig.liveEmbedUrl`
 * deliberately stays on www.youtube.com — it uses the undocumented legacy
 * `/embed/live_stream?channel=` endpoint, which is not part of the nocookie surface.
 * Breaking that would take down the Sunday live stream.
 */
export function youtubeEmbedUrl(url: string): string {
  // Supports watch?v=, youtu.be/, /live/ (live stream), /embed/, and /shorts/ forms
  const match = url.match(/(?:v=|youtu\.be\/|\/live\/|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/)
  // Falls through to the original URL when the regex misses, which is why
  // www.youtube.com must stay in frame-src alongside the nocookie host.
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : url
}

export function facebookEmbedUrl(url: string): string {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=560&height=315&appId`
}

export function driveEmbedUrl(url: string): string {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url
}
