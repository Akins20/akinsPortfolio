// Theme: dark by default, light on request. The choice is remembered.
// A tiny inline script in each page's <head> applies the saved theme before
// first paint so there is no flash; this module handles toggling, with a
// circular reveal from the toggle button where the browser supports it.

const KEY = 'theme';
const COLORS = { dark: '#0d0d0c', light: '#f4f1ea' };
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function currentTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function setTheme(theme) {
  const root = document.documentElement;
  if (theme === 'light') root.dataset.theme = 'light';
  else delete root.dataset.theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLORS[theme]);
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* storage unavailable (private mode): the toggle still works for this visit */
  }
  document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

export function toggleTheme(origin) {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  if (reduceMotion || !document.startViewTransition) return setTheme(next);

  const r = origin?.getBoundingClientRect();
  const x = r ? r.left + r.width / 2 : innerWidth / 2;
  const y = r ? r.top + r.height / 2 : 0;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const root = document.documentElement;
  root.classList.add('theme-switching');
  const transition = document.startViewTransition(() => setTheme(next));
  transition.ready
    .then(() =>
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
      ),
    )
    .catch(() => {});
  transition.finished.finally(() => root.classList.remove('theme-switching'));
}
