// <site-header> — shared sticky header with desktop nav, theme toggle and a
// full-screen mobile menu. Rendered in light DOM so Tailwind classes apply.

import { SITE, LINKS } from '../config.js';
import { icon } from '../icons.js';
import { currentTheme, toggleTheme } from '../theme.js';

const isHome = () => ['/', '/index.html', '/index'].includes(location.pathname);

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const navItems = SITE.nav
      .map(
        (item) => `
        <li>
          <a href="${item.href}" data-nav="${item.id}"
             class="nav-link relative block px-3 py-2 text-[0.9rem] text-muted transition-colors duration-200 hover:text-fg">${item.label}</a>
        </li>`,
      )
      .join('');

    const mobileItems = [...SITE.nav, { label: 'Contact', href: '/#contact' }]
      .map(
        (item, i) => `
        <li class="border-b border-line" data-menu-item style="--i:${i}">
          <a href="${item.href}" class="flex items-baseline justify-between py-4 font-display text-[2.6rem] leading-none tracking-tight">
            ${item.label}<span class="font-mono text-xs text-subtle">0${i + 1}</span>
          </a>
        </li>`,
      )
      .join('');

    this.innerHTML = `
      <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-btn focus:px-4 focus:py-2 focus:text-btn-fg">Skip to content</a>
      <header class="fixed inset-x-0 top-0 z-50">
        <div class="site-header-bar border-b border-transparent">
          <div class="wrap flex h-[4.5rem] items-center justify-between gap-6">
            <a href="/" class="group flex items-center gap-3" aria-label="${SITE.name}, home">
              <img src="/assets/img/logo-mark-dark.svg" alt="" width="36" height="36"
                   class="size-9 rounded-[0.6rem] transition-transform duration-300 ease-out-expo group-hover:-rotate-6 group-hover:scale-105">
              <span class="font-display text-[1.35rem] leading-none tracking-tight">${SITE.name}</span>
            </a>

            <nav aria-label="Primary" class="hidden lg:block">
              <ul class="relative flex items-center gap-1" data-nav-list>
                ${navItems}
                <li aria-hidden="true" data-nav-indicator class="nav-indicator pointer-events-none absolute bottom-1 h-px bg-accent opacity-0" style="left:0;width:0"></li>
              </ul>
            </nav>

            <div class="flex items-center gap-2">
              <button type="button" data-theme-toggle
                class="grid size-10 place-items-center rounded-full border border-line text-muted transition-[color,border-color,rotate] duration-300 hover:border-line-strong hover:text-fg active:rotate-45">
              </button>
              <a href="/#contact" data-nav="contact" data-magnetic="0.25" class="btn btn-primary btn-sm hidden sm:inline-flex">
                Get in touch ${icon('arrow', 'arrow size-4')}
              </a>
              <button type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu"
                class="grid size-10 place-items-center rounded-full border border-line text-fg lg:hidden">
                <span class="sr-only">Open menu</span>
                ${icon('menu', 'size-5')}
              </button>
            </div>
          </div>
        </div>

        <div id="mobile-menu" inert class="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto bg-bg lg:hidden">
          <div class="wrap flex min-h-full flex-col pt-4 pb-10">
            <ul class="border-t border-line">${mobileItems}</ul>
            <div class="mt-auto grid grid-cols-2 gap-3 pt-10 text-sm text-muted" data-menu-item style="--i:5">
              <a class="link" href="${LINKS.email}">${SITE.email}</a>
              <a class="link justify-self-end" href="${LINKS.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>
              <a class="link" href="${LINKS.github}" target="_blank" rel="noopener">GitHub</a>
              <a class="link justify-self-end" href="${LINKS.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
            </div>
          </div>
        </div>
      </header>`;

    this.#setupTheme();
    this.#setupMenu();
    this.#setupScrollState();
    this.#setupIndicator();
    if (isHome()) this.#setupSectionSpy();
  }

  #setupTheme() {
    const btn = this.querySelector('[data-theme-toggle]');
    const paint = () => {
      const dark = currentTheme() === 'dark';
      btn.innerHTML = `${icon(dark ? 'sun' : 'moon', 'size-[1.1rem]')}<span class="sr-only">Switch to ${dark ? 'light' : 'dark'} theme (shortcut: T)</span>`;
    };
    paint();
    btn.addEventListener('click', () => toggleTheme(btn));
    document.addEventListener('themechange', paint);
  }

  #setupMenu() {
    const btn = this.querySelector('[data-menu-toggle]');
    const menu = this.querySelector('#mobile-menu');
    const isOpen = () => menu.hasAttribute('data-open');
    const setOpen = (open) => {
      btn.setAttribute('aria-expanded', String(open));
      btn.innerHTML = `<span class="sr-only">${open ? 'Close' : 'Open'} menu</span>${icon(open ? 'close' : 'menu', 'size-5')}`;
      menu.toggleAttribute('data-open', open);
      menu.inert = !open;
      document.documentElement.style.overflow = open ? 'hidden' : '';
      if (open) this.setAttribute('data-scrolled', '');
      else if (window.scrollY < 8) this.removeAttribute('data-scrolled');
    };
    btn.addEventListener('click', () => setOpen(!isOpen()));
    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) {
        setOpen(false);
        btn.focus();
      }
    });
    matchMedia('(min-width: 64rem)').addEventListener('change', (e) => e.matches && setOpen(false));
  }

  #setupScrollState() {
    const update = () => this.toggleAttribute('data-scrolled', window.scrollY > 8);
    update();
    addEventListener('scroll', update, { passive: true });
  }

  // A single underline that slides to the hovered or current nav link.
  #setupIndicator() {
    const list = this.querySelector('[data-nav-list]');
    const bar = this.querySelector('[data-nav-indicator]');
    if (!list || !bar) return;
    const moveTo = (link) => {
      if (!link) {
        bar.style.opacity = '0';
        return;
      }
      const l = link.getBoundingClientRect();
      const p = list.getBoundingClientRect();
      bar.style.left = `${l.left - p.left + 12}px`;
      bar.style.width = `${l.width - 24}px`;
      bar.style.opacity = '1';
    };
    const current = () => list.querySelector('.nav-link[aria-current="true"]');
    list.querySelectorAll('.nav-link').forEach((a) => {
      a.addEventListener('pointerenter', () => moveTo(a));
      a.addEventListener('focus', () => moveTo(a));
    });
    list.addEventListener('pointerleave', () => moveTo(current()));
    this.addEventListener('navchange', () => moveTo(current()));
    addEventListener('resize', () => moveTo(current()));
  }

  #setupSectionSpy() {
    const links = new Map(
      [...this.querySelectorAll('[data-nav]')].map((a) => [a.dataset.nav, a]),
    );
    const sections = [...links.keys()].map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          links.forEach((a) => a.removeAttribute('aria-current'));
          links.get(entry.target.id)?.setAttribute('aria-current', 'true');
          this.dispatchEvent(new Event('navchange'));
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
  }
}

customElements.define('site-header', SiteHeader);
