# Acts 242 Website — Build Log

## Task Status

| Task | Status | Notes |
|---|---|---|
| 1. Audit & Setup | ✅ Done | `npm install` clean, Next.js 15.5.15, 0 vulnerabilities |
| 2. Core Data Updates | ✅ Done | data/site.ts, lessons.ts (7 lessons), materials.ts, types updated |
| 3. Logo & Image Assets | ✅ Done | Logo set up with SVG → PNG fallback; banner images pending |
| 4. PDF Assets | ✅ Done | foundation-guide.pdf in /public; evangelism PDFs pending upload |
| 5. New Pages | ✅ Done | /prayer-request, /welcome, /connect (Formspree), /privacy-policy, /terms |
| 6. Sermon Archive v1 | ✅ Done | MDX + gray-matter; 2 sermons; lib/sermons.ts; /sermons + /sermons/[slug] |
| 6b. Sermon Archive v2 | ✅ Done | Two-tier index (2026 + archive years); poster hero; Facebook embed; brochure panels; resources; prev/next nav; @tailwindcss/typography; JSON-LD Article schema |
| 7. Update Existing Pages | ✅ Done | Discipleship title 5→7, live+home link to /sermons |
| 8. SEO | ✅ Done | sitemap.ts, robots.ts, JSON-LD Church schema in layout |
| 9. Accessibility & Build | ✅ Done | 26 pages build clean, 0 TS errors, 0 vulnerabilities |
| 10. Legal Review | ✅ Done | Privacy policy updated for Formspree data collection |
| 11. Deployment Prep | ✅ Done | .env.example created; no secrets required |
| 12. Handoff | ✅ Done | BUILD_LOG.md updated; see checklist below |
| 13. About Page — Bio & Leadership | ✅ Done | Mission/vision, 4 values, Our Story, pastor bio, core leadership (3), extended team (6), church interior placeholder, dev-only mockup banners |
| 14. Live + Materials + Discipleship | ✅ Done | CurrentWeekMaterials component (auto-shows 7 days post-sermon); MaterialHeroCard for Foundation Guide; thumbnail support on MaterialCard; materials page rebuilt with hierarchy; discipleship video section with coming-soon state; isLastLesson fixed to 7 |

---

## Build Summary

- **Framework:** Next.js 15.5.15, TypeScript, Tailwind CSS 3.4
- **Pages:** 26 total (all static/SSG, no server-side routes)
- **Forms:** 3 Formspree endpoints (talk-to-pastor, prayer-request, welcome)
- **Sermons:** MDX-based, file system — add new `.mdx` files to `content/sermons/`
- **Lessons:** 7 (Foundation Book order — Seeking God → Cross)
- **Deployment:** Vercel free tier — push to GitHub and connect repo

---

## Decisions Made During Build

- `siteUrl` kept as `https://acts242.vercel.app` — update when custom domain purchased
- Lessons expanded from 5 to 7 (added Church, Cross). Numbering reordered per Foundation Book.
- Formspree endpoints live and connected (3 forms: talk-to-pastor, prayer-request, welcome)
- Mockup content marked clearly in code — requires pastor review before public launch
- Sermon archive uses MDX + gray-matter (no database needed). Sermons sorted newest first.
- `@mdx-js/mdx evaluate()` used for dynamic server-side rendering of sermon MDX content
- Leadership/pastor sections use initials avatars as placeholders
- No Tailwind Typography plugin — custom `.sermon-prose` CSS added to globals.css
- JSON-LD `Church` schema (subset of Organization) added to layout.tsx `<head>`

---

## Mockup Content — Needs Pastor Approval

- [ ] Mission statement (`data/mission-vision.ts`)
- [ ] Vision statement (`data/mission-vision.ts`)
- [ ] Pastor bio (Bro. Marc) in `data/leadership.ts`
- [ ] Leadership roles and titles in `data/leadership.ts`
- [ ] All MOCKUP-tagged copy on About page
- [ ] Sermon content in `content/sermons/*.mdx` — review for theological accuracy

---

## Files Still Needed From User

- [ ] `acts242_logo.svg` → place at `public/images/logo.svg`
- [ ] `foundation-guide.pdf` — 1MB compressed version (current is 41MB)
- [ ] `acts242-trifold.pdf` → `public/acts242-trifold.pdf`
- [ ] `acts242-poster.pdf` → `public/acts242-poster.pdf`
- [ ] `acts242-card.pdf` → `public/acts242-card.pdf`
- [ ] `hero-bible-cross.jpg` → `public/images/hero-bible-cross.jpg`
- [ ] `hero-path-dawn.jpg` → `public/images/hero-path-dawn.jpg`
- [ ] `hero-praying-hands.jpg` → `public/images/hero-praying-hands.jpg`
- [ ] Pastor photo (Bro. Marc) — for About page
- [ ] Leadership photos
- [ ] Real YouTube sermon URLs — update `youtubeUrl` in MDX frontmatter
- [ ] Custom domain name

---

## How to Add a New Sermon

1. Create a new file in `content/sermons/` named: `YYYY-MM-DD-sermon-title-slug.mdx`
2. Add frontmatter at the top:
   ```
   ---
   title: "Sermon Title"
   preacher: "Preacher Name"
   date: "YYYY-MM-DD"
   passage: "Book X:Y-Z"
   summary: "One paragraph summary."
   youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID"
   ---
   ```
3. Write the sermon notes in Markdown below the frontmatter
4. Deploy — Vercel will rebuild automatically

---

## Known Issues / TODOs

- `siteUrl` in `app/layout.tsx` and `app/sitemap.ts` — TODO: replace with custom domain
- All MOCKUP sections need pastor sign-off before launch
- PDF files (except foundation-guide.pdf) are not in /public yet — Material cards will show but downloads will 404
- YouTube live embed shows unavailable state outside live hours — expected behavior
- `outputFileTracingRoot` warning in build output — cosmetic only, does not affect deployment

---

## Post-Build Checklist (for user)

### Before going live
- [ ] Pastoral review of all mockup content (mission, vision, pastor bio, sermon notes)
- [ ] Upload compressed foundation-guide.pdf to /public (current is 41MB — compress to under 5MB)
- [ ] Upload evangelism PDFs to /public: acts242-trifold.pdf, acts242-poster.pdf, acts242-card.pdf
- [ ] Upload logo SVG to public/images/logo.svg
- [ ] Upload banner images to public/images/
- [ ] Test all 3 Formspree forms (submit a test entry, verify it arrives in Gmail)
- [ ] Test on mobile device (375px viewport) — hamburger menu, forms, lesson pages
- [ ] Review sermon notes for accuracy (content was drafted as placeholder)

### Deployment
- [ ] Push to GitHub (create repo if not done)
- [ ] Deploy to Vercel (connect GitHub repo)
- [ ] Share Vercel preview link with Bro. Marc for review
- [ ] Purchase custom domain
- [ ] Connect domain to Vercel
- [ ] Update `siteUrl` in `app/layout.tsx` and `app/sitemap.ts` to custom domain
- [ ] Redeploy after domain update

### After launch
- [ ] Add to Google Search Console
- [ ] Submit sitemap.xml to Google
- [ ] Configure GA4 Measurement ID in layout.tsx when ready
- [ ] Add YouTube sermon URLs to MDX files as they are recorded
