# Weekly Sermon Publishing Workflow

## Files Per Sermon

Each Sunday produces up to 4 files:
- `poster.png` — sermon poster image (~500KB after compression)
- `brochure-front.png` — brochure front panel (~500KB)
- `brochure-inside.png` — brochure inside panels (~500KB)
- `{title}.pptx` → upload to Google Drive, **do NOT commit to Git**

## Step-by-Step

1. Compress all 3 PNGs to under 500KB at [tinypng.com](https://tinypng.com)
2. Create folder: `public/sermons/YYYY-MM-DD-slug/`
3. Place `poster.png`, `brochure-front.png`, `brochure-inside.png` inside that folder
4. Upload PPTX to Google Drive → get share link (anyone with link can view)
5. Get the Facebook Live video URL from the livestream after the service
6. Create `content/sermons/YYYY-MM-DD-slug.mdx`
7. Fill in frontmatter (see template below)
8. Paste the sermon notes MDX content below the frontmatter
9. Commit and push → Vercel auto-deploys in ~2 minutes

## Frontmatter Template

```yaml
---
title: ""
preacher: "Bro. Marc"
date: "YYYY-MM-DD"
passage: ""
summary: ""
youtubeUrl: ""
facebookUrl: "https://www.facebook.com/100069363818681/videos/{VIDEO_ID}/"
pptxUrl: ""
posterImage: "/sermons/YYYY-MM-DD-slug/poster.png"
brochureImages:
  front: "/sermons/YYYY-MM-DD-slug/brochure-front.png"
  inside: "/sermons/YYYY-MM-DD-slug/brochure-inside.png"
---
```

### Notes on fields

- Leave any field as `""` if not available — empty strings are treated as absent
- `facebookUrl` takes priority over `youtubeUrl` for the embed if both are present
- `pptxUrl` should be a Google Drive share link
- `posterImage` / `brochureImages` paths are relative to `/public`

## Slug Convention

`YYYY-MM-DD-sermon-title-in-lowercase-with-hyphens.mdx`

Example: `2026-04-19-paano-kung-kahit-na.mdx`

## Year-End Rollover (January 1 each year)

1. Upload all year's PPTXs to a Google Drive folder named "Acts 242 Sermons YYYY"
2. Set folder sharing: Anyone with the link can view
3. Add the year to `data/sermon-archive.ts` with the Drive folder URL and sermon count
4. Delete `content/sermons/YYYY-*.mdx`
5. Delete `public/sermons/YYYY-*/` (free up repo space)
6. Commit: `git commit -m "Archive YYYY sermons"`
7. New year starts fresh. The archive link is permanent on the sermons page.
