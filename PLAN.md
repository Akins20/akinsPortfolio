# Portfolio revamp — plan & task tracker

Content sources: the 2026 CV, earlier CVs for Ogascounty and hosting details, the public
[FREYA](https://github.com/Akins20/FREYA) and [Postal](https://github.com/Akins20/Postal) READMEs,
and the live sites. No invented testimonials, clients or prices.

Stack: plain HTML + vanilla JS (ES modules, no framework) + **Tailwind CSS v4** (CLI). The only build
step compiles CSS and fills in absolute URLs; the built stylesheet is committed. Hosted on **Vercel**.

Legend: `[ ]` todo · `[x]` done

---

## Direction (agreed)

- A **personal portfolio**, not a landing page: name and photo, the work, about, experience, contact.
- Title: **Full-Stack & AI Engineer**. Full-stack is the core; "AI integration" is the client-facing service.
- Lead with the **niches**: e-commerce, marketplaces, news & media, AI assistants, SaaS, mobile.
- Copy in plain, first-person language. Outcomes and specifics, not buzzwords.
- Real screenshots for live sites (Ogascounty, LettsTV); illustrated covers for the rest.
- Built with all 30 laws on lawsofux.com in mind (see `UX-LAWS.md`).
- Only work Elijah owns or built for OTESC and other clients he can show is featured.

## Information architecture

```
/                     Home
  hero                 Name + photo, niche-led intro, CV / GitHub / LinkedIn, availability
  ticker               The niches, as a slow marquee
  #work                5 featured projects + "Also building" list + GitHub link
  #about               Story + "What I build"
  #experience          Timeline, education, skills
  #contact             Email / WhatsApp / LinkedIn + 3-field form
/work/<slug>          ogascounty, boldpetals, lettstv, rooster, freya, otesc-store, postal
/404
```

---

## Phase 0 — Foundation & cleanup
- [x] Remove the 2023 site (Bootstrap pages, PHP mailers, `composer.phar`, old assets)
- [x] `package.json` + Tailwind v4 CLI; `npm run dev` / `npm run build`
- [x] `.gitignore`, `.editorconfig`
- [x] Self-hosted fonts (Instrument Serif, Geist, Geist Mono)
- [x] Portrait + avatar → WebP/JPEG
- [x] 2026 CV PDF in `assets/cv/`

## Phase 1 — Design system & shell
- [x] Theme tokens (dark default + light), type scale, components
- [x] Shared `<site-header>` / `<site-footer>` Web Components
- [x] Sticky header, active-section highlight, full-screen mobile menu
- [x] Theme toggle (remembered, no flash), reveal-on-scroll, reduced-motion support

## Phase 2 — Homepage
- [x] Hero, niche ticker, work gallery, about, experience, contact, footer

## Phase 3 — Project pages
- [x] Template: niche + status, title, lede, key facts, cover, story sections, tech, prev/next
- [x] Ogascounty · OTESC Store · LettsTV · FREYA · Postal · Rooster
- [x] Reading progress bar
- [x] LettsTV screenshots from a category page (not the homepage)
- [x] Ogascounty: add mobile shop + single product screenshots
- [x] Postal: back to the illustrated cover (the live app is only a sign-in page)

## Phase 4 — Functionality
- [x] Contact form → Formspree via `fetch`, validation, honeypot, success/error states
- [x] Copy-email button + toast, WhatsApp with pre-filled message
- [x] Lagos local-time clock
- [x] 404 page (with a self-solving maze)

## Phase 5 — SEO, performance, accessibility
- [x] Titles, descriptions, Open Graph + Twitter cards, JSON-LD `Person`
- [x] OG image 1200×630, favicons, `site.webmanifest`
- [x] `scripts/seo.mjs`: absolute URLs + `sitemap.xml` + `robots.txt` from `site.config.json`
- [x] Lazy images, WebP, preloaded fonts, reserved aspect ratios (no layout shift)
- [x] Accessibility pass: skip link, landmarks, focus rings, alt text, 40px+ touch targets, one h1 per page
- [ ] Set the real domain in `site.config.json` once deployed

## Phase 5b — Laws of UX
- [x] All 30 laws applied and documented in `UX-LAWS.md`

## Phase 7 — Brand, services & motion (round 2)
- [x] Fix Vercel build: output to `dist/`
- [x] New portrait (LinkedIn photo), cropped 4:5
- [x] Brand mark "E." (amber tile for favicon/SEO, dark tile in-page) + logo lockups
- [x] Full icon set: favicon.svg/.ico/32/48, apple-touch, 192/512, maskable
- [x] Integrate: header/footer mark, head links, manifest, OG image, JSON-LD (WebSite + photo)
- [x] Services section from Elijah's confirmed capability list
- [x] Research UI principles beyond Laws of UX (Nielsen, Norman, Gestalt, CRAP, motion) → `UX-LAWS.md`
- [x] Motion system: load choreography, richer scroll reveals, hover/press states, page transitions,
      theme-switch transition, animated mobile menu — all off under reduced motion
- [x] Regenerate pages, QA, commit & push

## Phase 6 — QA & ship
- [x] Playwright screenshots: desktop / mobile × dark / light, every page
- [x] Console-error sweep + internal link check
- [x] Contact form tested with the network call intercepted (no real email sent): 23/23 checks pass
- [x] `vercel.json` (clean URLs, caching, security headers), `.vercelignore`
- [x] README
- [ ] First real form submission (Elijah, to confirm the Formspree endpoint is live)
- [ ] Deploy to Vercel — **only on Elijah's go-ahead**
- [ ] Commit & push — **only on Elijah's go-ahead**

## Phase 8 — Developer-portfolio redesign (round 3)

Why: the round-2 look is the recognisable "Claude design" template: Instrument Serif + Geist,
one italic accent word per heading, warm near-black with amber, glow blobs, grid backgrounds,
uppercase mono eyebrows, cards around everything, and a full motion kit.

Research (2026-11-01):
- Refero's anti-AI-slop guide names these exact tells: the one-word italic serif highlight,
  "calm editorial serif on autopilot", cards everywhere, fake graphics, and *reference averaging*
  (blending many references into a safe middle). Rule taken: pick one direction and keep its traits.
- A Show HN analysis (Gigazine, Apr 2026) lists Instrument Serif, Geist, Space Grotesk, Syne and
  Fraunces as the recurring fonts on Claude Code-built sites; Mitchell Hashimoto called serif +
  italics "the new AI web design giveaway".
- Real developer sites looked at: jhey.dev, paco.me, emilkowal.ski, brittanychiang.com,
  taniarascia.com, antfu.me, overreacted.io, delba.dev, lynnandtonic.com, joshwcomeau.com,
  zenorocha.com. Shared traits: one sans + a mono for small details, small confident type,
  left-aligned single column, plain underlined links, lists and rules instead of cards, dates in
  a mono column, real work instead of illustrations, very little motion, a voice.

Direction (decided with Elijah): dark by default, IBM Plex Sans + IBM Plex Mono, keep the full
Services list. Plex's native system (IBM Carbon, Gray 100 theme) supplies the rest: cool neutral
greys (#161616), square corners, 1px rules, blue links (#78a9ff), green only for "Live".

### Step 1 — Remove the template tells
- [x] Plex Sans (variable) + Plex Mono, self-hosted; drop Instrument Serif and Geist
- [x] Carbon Gray 100 tokens (dark) and White tokens (light); no amber, glows, grain or grid
- [x] No italic accent words, no amber full stops, no uppercase eyebrows, no "01 / 06" counters
- [x] No cards, fake browser chrome, marquee, extra clocks, pulsing dots, shortcut tips
- [x] Motion cut to hover states; content shows on first paint
- [x] New favicon / logo / OG image in the new style

### Step 2 — Restructure around the work
- [x] Header and footer as plain HTML in every page (shared snippets, synced at build), no JS needed
- [x] Hero: name, role, plain intro, availability, links, smaller photo
- [x] Work: Ogascounty, LettsTV, Rooster as features with real screenshots; OTESC Store, FREYA,
      Postal as a compact list
- [x] Remove the illustrated mockups (fake UIs) until real captures exist
- [x] Services kept in full as a dense list; Experience as a dated list; skills as plain text
- [x] Case-study pages on the same system

### Step 3 — Developer proof (needs Elijah)
- [x] FREYA: real material from her install on Elijah's PC (six sites she built in her workspace, plus a real
      tool-by-tool run from her README); her window was not captured because it shows his private history
- [x] OTESC Store and Postal stay benched under "Also building" until they ship (Elijah's call)
- [x] Bold Petals (boldpetals.com) added as a featured project with a case study, from the live site
- [ ] Notes: 2–3 short write-ups in Elijah's voice (hosting cut, Freya checking her work,
      Rooster's private contact matching)
- [ ] Short muted screen recordings of the live products
- Dropped: a GitHub repo widget. His public repos show 0 stars and mostly forks, which hurts more
  than it helps.

---

## Decisions log
- 2026-09-26 — Cloned the 2023 repo, audited it, wrote this plan.
- 2026-09-26 — Old testimonials dropped; WhatsApp on; host = Vercel.
- 2026-09-26 — First draft read like a SaaS landing page; rebuilt as a proper portfolio.
- 2026-09-26 — Removed one project at Elijah's request; Experience keeps a neutral job line only.
- 2026-09-26 — Title set to Full-Stack & AI Engineer; niche-led, human copy; Ogascounty added.
- 2026-09-26 — Real screenshots of live sites replace mockups where available.
- 2026-09-26 — LettsTV → category page shots; Ogascounty → add shop + product (mobile); Postal → no screenshot.
- 2026-09-26 — QA: all pages clean at desktop/mobile × dark/light; form, copy, theme and menu tested.
- 2026-09-26 — WhatsApp → +234 811 320 9561. Added custom AI agents, AI dashboards, technical consulting,
  LettsTV's AI editorial pipeline. Removed Ogascounty traffic/abandonment numbers; 78% hosting cut kept (confirmed).
- 2026-11-01 — Rooster is live on Google Play (com.otesc.rooster): status, store link and features updated.
  Chomp removed: a game broke the pattern of client-style work. The 404 keeps its maze, without the Chomp link.
- 2026-11-01 — Round 3: researched real developer portfolios and AI-design tells; rebuilt on IBM Plex +
  Carbon Gray 100 (dark default), no cards or motion kit, header/footer as static partials, Services kept in full,
  drawn mockups removed. Step 3 (captures, notes) waits on Elijah.
- 2026-11-01 — Added Bold Petals (Next.js, Firebase, Paystack; facts from the live site). FREYA promoted to a featured
  project with screenshots of sites she built; her ADA dashboard output and contact pages (his name/email) left out.
