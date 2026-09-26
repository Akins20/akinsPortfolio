// <site-footer> — shared footer. Add `cta` (<site-footer cta>) on inner pages
// to close with a "let's work together" line; the homepage omits it because
// its contact section sits right above.

import { SITE, LINKS } from '../config.js';
import { icon } from '../icons.js';

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    const ext = 'target="_blank" rel="noopener"';

    const cta = this.hasAttribute('cta')
      ? `
      <section class="wrap section-y border-t border-line" aria-label="Contact">
        <p class="eyebrow">Like what you see?</p>
        <a href="/#contact" class="group mt-5 inline-flex items-baseline gap-4 font-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.92] tracking-[-0.02em]">
          <span>Let’s work <em>together</em>.</span>
          ${icon('arrow-ne', 'arrow-ne size-[0.5em] shrink-0 text-accent')}
        </a>
        <p class="mt-6 text-muted">
          Or email <a class="link text-fg" href="${LINKS.email}">${SITE.email}</a>
        </p>
      </section>`
      : '';

    this.innerHTML = `
      ${cta}
      <footer class="border-t border-line">
        <div class="wrap flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <a href="/" class="font-display text-[1.6rem] leading-none tracking-tight">${SITE.name}<span class="text-accent">.</span></a>
            <p class="mt-2 font-mono text-[0.72rem] text-subtle">© ${year} · ${SITE.location} · <time data-clock>--:--</time> ${SITE.timeZoneLabel}</p>
          </div>
          <ul class="flex flex-wrap items-center gap-2">
            <li><a href="${LINKS.github}" ${ext} class="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg">${icon('github', 'size-[1.05rem]')}<span class="sr-only">GitHub</span></a></li>
            <li><a href="${LINKS.linkedin}" ${ext} class="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg">${icon('linkedin', 'size-[1.05rem]')}<span class="sr-only">LinkedIn</span></a></li>
            <li><a href="${LINKS.whatsapp}" ${ext} class="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg">${icon('whatsapp', 'size-[1.05rem]')}<span class="sr-only">WhatsApp</span></a></li>
            <li><a href="${LINKS.email}" class="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg">${icon('mail', 'size-[1.05rem]')}<span class="sr-only">Email</span></a></li>
            <li class="ml-2"><a href="#top" class="inline-flex h-11 items-center gap-2 rounded-full px-3 font-mono text-[0.72rem] text-subtle transition-colors hover:text-fg">Back to top ${icon('arrow-up', 'size-3.5')}</a></li>
          </ul>
        </div>
      </footer>`;
  }
}

customElements.define('site-footer', SiteFooter);
