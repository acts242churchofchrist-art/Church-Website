# Acts 242 Church of Christ — Website Redesign Brief

This document is the design brief for a full visual and UX redesign of this repository's website. It was prepared from a six-area UI/UX audit of the actual codebase. Read it fully before proposing anything.

---

## 1. Who we are and why we're redesigning

**Acts 242 Church of Christ** is a young, warm congregation in Parañaque, Metro Manila, Philippines — formerly Mustard Seed Faith Christian Church, SEC-incorporated February 2026. Foundation verse: **Acts 2:42**. 2026 theme: **"All About JESUS."** Live site: https://www.acts242churchofchrist.com

We are redesigning because the current site is functional and content-rich but visually generic — it reads like a default Tailwind template rather than a congregation. We want either **a meaningfully better evolution of the current identity** or **a fresh design direction**, with materially improved UI and UX. We are open to bold proposals.

## 2. Audience and jobs (design for these people, in this order)

1. **Congregation members on mobile, arriving from Facebook** (the dominant traffic pattern — often inside the Facebook in-app browser). Jobs: watch this week's sermon or the live stream, grab the brochure/slides, check events.
2. **First-time visitors evaluating the church.** Jobs: When are services? Where are you? What are you like? (Currently service times are buried at the very bottom of the homepage — fixing this is a top priority.)
3. **Newcomers to faith.** Jobs: start the 7-lesson discipleship journey, learn about water baptism, request prayer without fear.

Brand personality to express: **warm, reverent, hopeful, trustworthy, local**. The site's product is *words* — sermons, Scripture, testimony — so typography is the single highest-leverage design surface.

## 3. Hard technical constraints (do not break)

- **Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 3.4, MDX content via gray-matter, `next-themes` dark mode (class strategy), `lucide-react` available. Fully static SSG — no database, no server runtime. Forms are Formspree POSTs.
- **`npm run build` must pass** (dev server: `npm run dev`, port 3100).
- **CSP in `next.config.ts` blocks external hosts** — no Google Fonts CDN, no external CSS/JS. Custom fonts are welcome but must be self-hosted (use `next/font`, which self-hosts automatically). New embed domains require a CSP update.
- **Keep the content contracts intact:** MDX frontmatter shapes (`types/content.ts`), the loaders (`lib/sermons.ts`, `lib/midweek.ts`), and the data modules in `data/` (site, events, lessons, leadership, materials, testimonies, gallery, mission-vision). The church adds a sermon every week by dropping an MDX file + images — that workflow must survive untouched.
- **Keep all routes and the 301 redirects** in `next.config.ts` (`/live`, `/midweek`, `/testimonies`, `/gallery`, `/discipleship`, `/materials` → merged pages). Anchor section IDs (`#live`, `#sunday`, `#midweek`, `#testimonies`, `#gallery`, `#discipleship`, `#materials`) are redirect targets and cross-link targets — if you restructure them, update every reference *and* the redirects together.
- **Dark mode is a first-class citizen** — every redesigned surface must be designed for both themes, not have dark bolted on.
- Current nav (6 tabs): Home · About · Sermons · Community · Grow · Connect. You may propose renaming/restructuring nav labels (see §7), but keep the underlying route consolidation.

## 4. What is genuinely working — preserve these patterns (evolve, don't discard)

- **`Section` layout primitive** — consistent rhythm/measure site-wide; the strongest systemic element.
- **The eyebrow signature** — uppercase, tracked labels; the site's most recognizable typographic move. Formalize it, don't delete it.
- **`shadow-calm` / `shadow-glow`** — named shadows that encode the calm/warm mood.
- **ThisSundayBanner** — self-expiring "this week's sermon" banner; ideal for the Facebook-mobile audience.
- **Two-path welcome cards** ("New to faith?" vs "Already following Christ?") — correct audience segmentation.
- **"Not live right now?" fallback** under the live embed, and **CurrentWeekMaterialsCard** (watch → grab materials matches the congregation's Sunday routine).
- **Prev/next sermon navigation with real titles**; multi-source video handling (YouTube 16:9, Drive, Facebook portrait) with honest empty states.
- **Human-first testimony cards** (avatar → name → pull quote) and the navy pull-quote band on testimony details.
- **"Lesson N of 7" framing** everywhere in discipleship; Scripture visually set apart from commentary; lesson 7 ending with "Talk to a pastor."
- **Trauma-aware prayer form** (only the request required, "First name or anonymous", consent checkboxes, confidentiality card) and **phone-first PH-localized welcome form**.
- **Dark-mode infrastructure** (next-themes, logo swap, color-scheme) — solid plumbing worth keeping under a better token system.
- Culturally-aware touches: "Bro./Sis." honorific handling in avatar initials.

## 5. The big design-system problems to solve

1. **No typographic identity.** System font only, no scale, `tracking-tight` doing all the brand work. Give the site a real typographic voice: a warm display face for headings and Scripture (self-hosted via next/font), a defined type scale, **16px minimum body** (the current 14px-dominant text triggers iOS zoom on form inputs), and a designed Scripture/pull-quote treatment. This is the highest-leverage change on a words-centric site.
2. **The warmth is invisible in light mode.** Amber (the brand accent) appears almost exclusively in dark mode and navy heroes; default light mode is cold navy-on-white. Bring warmth into the light theme deliberately.
3. **No semantic token system.** Light-only hex tokens + ~560 manual `dark:` overrides with visible drift (slate-700 vs slate-800 cards), amber untokenized across 286 call sites, `.sermon-prose` as a disconnected hardcoded mini-system, dead `xl2` radius token. Rebuild as CSS-variable semantic tokens (surface / surface-raised / text-primary / text-soft / accent / on-accent) that swap under `.dark`.
4. **No component discipline for CTAs.** The site's most important buttons (hero CTAs) bypass `ButtonLink` with hand-built pills; three different shapes/casings exist for the same "Start Here" action. Define one CTA system with strict roles (primary filled / secondary outlined / tertiary ghost) and one radius language.
5. **No motion system.** Three hardcoded fade-up delays, `fill-mode: both` hiding content until animation runs, zero `prefers-reduced-motion` handling anywhere.

## 6. Accessibility — non-negotiable fixes (bake into the redesign, not a follow-up)

- **Zero `focus-visible` styles exist in the codebase.** Every interactive element needs a designed focus state.
- `prefers-reduced-motion` support site-wide (entrance animations, hover lifts, smooth scroll, pulse dots).
- Dark-mode contrast failures: checked checkbox (navy on slate-800, ~1.1:1 — invisible in the prayer flow), error text (`text-red-600` with no dark variant), placeholder text (~3.4:1).
- Text-over-image/gradient contrast: white/60–75 overlays on photos and gradient mid-zones fail AA unpredictably.
- Forms: no `aria-live`/`role=alert` on submit success/error (screen readers get silence), no `autocomplete` attributes anywhere, free-text "email or phone" field on connect.
- Heading structure: lesson-page section titles are styled `<p>` not headings; sermon hub renders dozens of sibling `h2` cards; testimony card names aren't headings.
- Mobile menu: no focus management, no Escape-close, no `aria-controls`/`aria-current`, no scroll lock; no skip-to-content link.
- Decorative glyphs (✦, ✛, ✉, →, ↗) announced by screen readers; replace with an icon system (lucide-react is installed) with `aria-hidden`.
- Gradient-clip-text headlines can render invisible in forced-colors mode; 44px minimum touch targets (theme toggle is 36px); global `a { text-decoration: none }` leaves links color-only.
- Anchor targets need `scroll-mt` for the sticky header (currently anchored sections land clipped underneath it).

## 7. Page-by-page problems and opportunities (from the audit)

### Homepage & shell
- **Service times, address, and directions must move above the fold** — a "Plan your visit" module (data already exists in `siteConfig.serviceHours`). Currently they're the second-to-last section.
- Hero has three same-weight CTAs with overlapping meanings; pick one primary action per screen.
- **Prayer request has no homepage pathway** despite being a core job with a dedicated form — elevate it to a first-class CTA.
- Homepage is one very long scroll trying to be the whole site (all 7 lesson cards render in full); restructure around the three audience journeys.
- StatsRow presents non-metrics as metrics with dead hover states; replace with a dynamic "This week at Acts 242" strip (next service, latest sermon, next event — derivable from existing data).
- Events go stale by design: "June Preaching Schedule" heading is hardcoded and past-dated events still render (in July it shows Father's Day June 21). Make the events display self-maintaining: filter past dates, derive the month label from data.
- No photography above the fold anywhere — the gallery data has `featured` congregation photos; lead with real faces.
- Acts 2:42 appears three times on one page; navy hero + navy verse band stack back-to-back.
- Consider intent-based nav labels (e.g., Visit / Watch / Grow / Community / About) and a mobile quick-action row (Watch Live · Service Times · Prayer); Messenger deserves first-class placement for a Facebook-native congregation.

### Sermons (hub + detail)
- The merged hub has no visible in-page navigation — add a sticky segmented control (Live · Sunday · Midweek · Archive) that tracks scroll; the Archive section has no anchor ID at all.
- Grids render every sermon with no search/filter/pagination and grow weekly without bound — design a browsable library (filter by title/passage/preacher/date; group by year theme, e.g. "2026 — All About Jesus").
- Detail pages: poster hero + video embed show near-identical imagery back to back (~1.5 mobile viewports before content) — unify poster as the video facade with a play button. No way back to the hub until page bottom — add a slim sticky wayfinding bar.
- The resource row is up to 6 identical white pills; establish hierarchy (one primary Watch action; compact iconed downloads with true `download` behavior and file-type labels).
- **Scripture blockquotes have no designed treatment** (the prose class even contains contradictory italic rules) — Scripture is the most important content type on the site; give it a signature. Add reading time / progress for long sermon prose.
- Archive hands users to raw Google Drive folders — design on-site year cards (count, cover, description) at minimum.

### Community (testimonies + gallery)
- Album photos are raw `<a target=_blank>` links to image files — catastrophic in the Facebook in-app browser. Design an in-page lightbox/swipe carousel with captions.
- **Design for the low-content reality:** with 1 testimony and 1 album today, 3-column grids read as an empty church. Default to generous spotlight layouts (full-width story band, film-strip albums) that look intentional with 1–3 items and scale up later.
- The community hero is a full viewport of abstract gradient on the one page whose job is faces — use real congregation photos with a scrim.
- The album detail's "Connected To" card body is hardcoded to one May 2026 event — make it data-driven from `events.ts`.
- Give testimonies a designed quote signature (oversized quote glyph / amber rule) reused site-wide; fix the invisible seam between the page's two halves.

### Grow (lessons + baptism + materials)
- The 7 lessons are listed twice back-to-back (a non-clickable "journey" list, then a card grid) — replace with **one linked journey path/stepper (1→7 ending at Water Baptism as the 8th milestone)** with per-lesson state (done / current / next) via localStorage, so the hero can say "Continue Lesson 4" instead of always "Begin Lesson 1."
- Lesson pages are navigational dead-ends (no back link, no prev, no series context) and read as a flat dashboard of identical cards with body text in the muted color; rebuild as a guided devotional reading experience — sticky "Lesson 3 of 7" header, real typographic hierarchy, elevated Scripture and prayer moments, single reading column.
- **Bug:** the water-baptism page's "Review Lesson 5" button links to `/discipleship/discipleship` (Lesson 3), not Lesson 5.
- Every lesson's first block is a "Video teaching coming soon" placeholder (all `videoUrl` are empty) — collapse it until videos exist.
- Material cards crop portrait document covers into landscape strips; redesign as a compact document browser with true portrait previews and metadata chips (PDF, pages, language — Filipino/English matters for evangelism materials).
- Add a completion moment when a lesson (especially Lesson 7) is finished; make baptism readiness convert to a conversation in one tap (Messenger deep link).

### Connect / Welcome / Prayer / About
- All four pages open with the identical cinematic navy hero — **the prayer page needs a quiet, pastoral register with the form above the fold on mobile** (currently a distressed user scrolls 2–3 screens to reach the textarea). Split hero registers by intent.
- Consider one guided "next step" flow (I'm new / I need prayer / I'm ready for baptism) that progressively reveals only relevant fields, replacing three scattered forms with three different conventions (e.g., asterisks vs "(optional)").
- Connect's baptism card says "let us know below" but links away from the form it refers to; the welcome page's "one-on-one Bible study" card promises a human match but links to self-serve lessons.
- Add "what happens next" micro-timelines beside forms (submit → a pastor reads → we reply within 48 hours) and show the pastoral team's faces near the prayer form.
- About: leadership renders mostly as initials circles ("The people who lead us" reads as an unfinished org chart) — design leadership cards so real portraits are the norm and missing photos still look intentional; render the Mustard Seed → SEC story as a visual timeline; the quick-facts card (service times!) is desktop-only — it must be mobile-visible.
- Turn /welcome into a visual "Your first Sunday" walkthrough (photos of the space, what to expect, kids info).

## 8. Design directions — what we want from you

1. **Propose 2–3 named, genuinely distinct design directions first** (e.g., a warm editorial/typographic direction; a photography-led congregation-warmth direction; a refined "sacred modern" evolution of navy+gold). For each: palette + type pairing, one homepage concept, one sermon-detail concept, and the mobile nav treatment. Navy/amber heritage may be evolved or replaced — argue for your choice.
2. **We'll pick one; then apply it system-first**: tokens → primitives (buttons, cards, forms, sections, icons via lucide-react) → shell → every page, both themes, mobile-first (design at 375px first).
3. Fix the §6 accessibility list and the concrete bugs flagged in §7 as part of the build, not after.

## 9. Definition of done

- `npm run build` passes; all 39 static pages render.
- Every page reviewed at 375px mobile and desktop, in light **and** dark mode.
- Weekly content workflow unchanged (drop MDX + images, nothing else).
- All redirects and cross-links still resolve; anchor targets clear the sticky header.
- Focus states, reduced motion, contrast, form announcements, and heading structure from §6 in place.
- No new external network dependencies (CSP-safe; fonts self-hosted).
