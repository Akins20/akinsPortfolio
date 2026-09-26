// Fill contact details from config.js so they're defined in one place.
//   data-link="email|whatsapp|github|linkedin|cv"  → sets href
//   data-text="email|whatsappDisplay|…"            → sets text from SITE
//   data-availability                               → hidden when SITE.available is false

import { SITE, LINKS } from './config.js';

export function bindLinks(root = document) {
  root.querySelectorAll('[data-link]').forEach((el) => {
    const href = LINKS[el.dataset.link];
    if (href) el.setAttribute('href', href);
  });
  root.querySelectorAll('[data-text]').forEach((el) => {
    const text = SITE[el.dataset.text];
    if (text) el.textContent = text;
  });
  if (!SITE.available) {
    root.querySelectorAll('[data-availability]').forEach((el) => (el.hidden = true));
  }
}
