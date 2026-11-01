# Elijah Ogunbiyi — portfolio

Personal portfolio of Elijah Ogunbiyi, full-stack & AI engineer in Lagos.
Plain HTML and vanilla JavaScript, styled with Tailwind CSS v4. No framework.

## Run it locally

```bash
npm install
npm run dev          # http://localhost:5173 (Tailwind rebuilds as you edit)
```

`PORT=4000 npm run dev` picks another port. If style changes don't show up (some external or network
drives don't report file changes), use `POLL=1 npm run dev`.

## Build

```bash
npm run build        # header/footer into every page, minified CSS, SEO URLs/sitemap, then dist/
```

Commit `assets/css/site.css` after building. It's generated, but committing it means the site works as
plain static files anywhere.

## Where things live

```
index.html                 Homepage: intro, work, services, about, experience, contact
work/*.html                One page per project
404.html                   Not-found page
src/partials/              Shared header and footer, copied into every page by scripts/partials.mjs
src/css/main.css           All styling: theme colours, fonts, components (edit this)
assets/css/site.css        Built stylesheet (generated, don't edit)
assets/js/config.js        Email, WhatsApp, links, CV path, form endpoint, availability
assets/js/*.js             Theme toggle, clock, contact form, toast, 404 maze
assets/shots/              Real screenshots of live projects (desktop + mobile)
assets/fonts/              IBM Plex Sans (variable) and IBM Plex Mono, latin subset
assets/img/                Portrait, favicons and app icons, share image (og.png)
site.config.json           Your live URL, used for link previews and the sitemap
UX-LAWS.md                 How the Laws of UX and UI principles are applied
```

## Common edits

**Contact details, links, availability.** Change them once in `assets/js/config.js`. Every link marked
`data-link="…"` (header, footer, contact section, WhatsApp buttons) is filled from it. Set `available: false` to hide the
"Available for freelance work" badges.

**Homepage copy.** Edit `index.html` directly. Every section is marked with a comment.

**Header and footer.** Edit `src/partials/header.html` or `footer.html`, never the copies inside the pages.
`npm run dev` and `npm run build` copy them into every page between the `<!-- header -->` /
`<!-- footer -->` markers (or run `npm run build:partials`).

**A project page.** Edit `work/<project>.html`. The text lives inside `<div class="prose-case">`.

**Add a project.**
1. Copy an existing `work/*.html` page and change the text, facts and links.
2. Add it to the `#work` section of `index.html`: a full `<article>` if it's live with screenshots, or a
   row under "Also building".
3. Update the previous/next links on the neighbouring pages.

**Screenshots.** Put new images in `assets/shots/`: desktop at 1600×1000 (plus a 960-wide WebP) and
mobile at 585×1266, in WebP with a JPEG fallback. Show them with `class="shot"` (a hairline border, no frame).

**Colours and fonts.** The theme tokens are at the top of `src/css/main.css`: IBM Carbon's Gray 100
(dark, the default) and White (light) themes. Blue is for links and focus only, green for "Live", yellow for
"In development". Change a token and both themes update everywhere.

## Contact form

The form sends to Formspree (`formEndpoint` in `config.js`) without leaving the page. It has inline
validation and a hidden spam trap, and falls back to a direct email link if sending fails. Send yourself one
test message after deploying to confirm the endpoint is still active on your Formspree account.

## Deploy (Vercel)

1. Push the repo to GitHub and import it in Vercel, or run `vercel` from this folder.
2. Vercel runs `npm run build` and serves the `dist/` folder it produces (set in `vercel.json`, along with
   clean URLs like `/work/freya`, caching and security headers).
3. Once you know the live address, put it in `site.config.json` (`"url": "https://your-domain.com"`) and
   redeploy, so link previews on WhatsApp, LinkedIn and X show the share image.
