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
- Lead with the **niches**: e-commerce, marketplaces, news & media, AI assistants, SaaS, mobile, games.
- Copy in plain, first-person language. Outcomes and specifics, not buzzwords.
- Real screenshots for live sites (Ogascounty, LettsTV); illustrated covers for the rest.
- Built with all 30 laws on lawsofux.com in mind (see `UX-LAWS.md`).
- Only work Elijah owns or built for OTESC and other clients he can show is featured.

## Information architecture

```
/                     Home
  hero                 Name + photo, niche-led intro, CV / GitHub / LinkedIn, availability
  ticker               The niches, as a slow marquee
  #work                7 projects + GitHub card (staggered gallery)
  #about               Story + "What I build"
  #experience          Timeline, education, skills
  #contact             Email / WhatsApp / LinkedIn + 3-field form
/work/<slug>          ogascounty, otesc-store, lettstv, freya, postal, rooster, chomp
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
- [x] Ogascounty · OTESC Store · LettsTV · FREYA · Postal · Rooster · Chomp
- [x] Reading progress bar
- [x] LettsTV screenshots from a category page (not the homepage)
- [x] Ogascounty: add mobile shop + single product screenshots
- [x] Postal: back to the illustrated cover (the live app is only a sign-in page)

## Phase 4 — Functionality
- [x] Contact form → Formspree via `fetch`, validation, honeypot, success/error states
- [x] Copy-email button + toast, WhatsApp with pre-filled message
- [x] Lagos local-time clock
- [x] 404 page (with the Chomp maze)

## Phase 5 — SEO, performance, accessibility
- [x] Titles, descriptions, Open Graph + Twitter cards, JSON-LD `Person`
- [x] OG image 1200×630, favicons, `site.webmanifest`
- [x] `scripts/seo.mjs`: absolute URLs + `sitemap.xml` + `robots.txt` from `site.config.json`
- [x] Lazy images, WebP, preloaded fonts, reserved aspect ratios (no layout shift)
- [x] Accessibility pass: skip link, landmarks, focus rings, alt text, 40px+ touch targets, one h1 per page
- [ ] Set the real domain in `site.config.json` once deployed

## Phase 5b — Laws of UX
- [x] All 30 laws applied and documented in `UX-LAWS.md`

## Phase 6 — QA & ship
- [x] Playwright screenshots: desktop / mobile × dark / light, every page
- [x] Console-error sweep + internal link check
- [x] Contact form tested with the network call intercepted (no real email sent): 23/23 checks pass
- [x] `vercel.json` (clean URLs, caching, security headers), `.vercelignore`
- [x] README
- [ ] First real form submission (Elijah, to confirm the Formspree endpoint is live)
- [ ] Deploy to Vercel — **only on Elijah's go-ahead**
- [ ] Commit & push — **only on Elijah's go-ahead**

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
