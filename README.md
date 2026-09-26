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
npm run build        # minified CSS + SEO URLs/sitemap, then copies the site into dist/
```

Commit `assets/css/site.css` after building. It's generated, but committing it means the site works as
plain static files anywhere.

## Where things live

```
index.html                 Homepage: hero, work, about, experience, contact
work/*.html                One page per project
404.html                   Not-found page
src/css/main.css           All styling: theme colours, fonts, components (edit this)
assets/css/site.css        Built stylesheet (generated, don't edit)
assets/js/config.js        Email, WhatsApp, links, CV path, form endpoint, nav, availability
assets/js/components/      <site-header>, <site-footer>, <svg-include>
assets/js/*.js             Theme, reveal animations, clock, contact form, maze, progress bar
assets/shots/              Real screenshots of live projects (desktop + mobile)
assets/covers/             Illustrated project covers (SVG, follow the theme)
assets/img/                Portrait, avatar, favicons, share image (og.png)
site.config.json           Your live URL, used for link previews and the sitemap
UX-LAWS.md                 How each of the 30 Laws of UX is applied
```

## Common edits

**Contact details, links, availability.** Change them once in `assets/js/config.js`. The header, footer,
contact section and WhatsApp links all read from it. Set `available: false` to hide the
"Available for freelance work" badges.

**Homepage copy.** Edit `index.html` directly. Every section is marked with a comment banner.

**A project page.** Edit `work/<project>.html`. The text lives inside `<div class="prose-case">`.

**Add a project.**
1. Copy an existing `work/*.html` page and change the text, facts and links.
2. Add a card for it in the `#work` section of `index.html` (copy an `<article>` block).
3. Update the "01 / 07" counters and the previous/next links on the neighbouring pages.

**Screenshots.** Put new images in `assets/shots/`: desktop at 1600×1000 (plus a 960-wide WebP) and
mobile at 585×1266, in WebP with a JPEG fallback.

**Colours and fonts.** The theme tokens are at the top of `src/css/main.css`, in a dark block and a light
block. Change a token and both themes update everywhere.

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
