// <svg-include src="/assets/covers/x.svg" label="…"> — inlines an SVG file so
// it inherits the page's theme colours (an <img> can't). Reserve its space
// with an aspect-ratio style to avoid layout shift.

const cache = new Map();

class SvgInclude extends HTMLElement {
  async connectedCallback() {
    const src = this.getAttribute('src');
    if (!src || this.dataset.loaded) return;
    this.dataset.loaded = '1';
    try {
      if (!cache.has(src)) cache.set(src, fetch(src).then((r) => (r.ok ? r.text() : '')));
      const markup = await cache.get(src);
      const tpl = document.createElement('template');
      tpl.innerHTML = markup.trim();
      const svg = tpl.content.querySelector('svg');
      if (!svg) return;
      svg.classList.add('dg');
      const label = this.getAttribute('label');
      if (label) {
        svg.setAttribute('role', 'img');
        svg.setAttribute('aria-label', label);
      } else {
        svg.setAttribute('aria-hidden', 'true');
      }
      this.replaceChildren(svg);
    } catch {
      /* decorative — fail quietly */
    }
  }
}

customElements.define('svg-include', SvgInclude);
