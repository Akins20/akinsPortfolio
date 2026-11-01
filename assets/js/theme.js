// Theme: dark by default, light on request. The choice is remembered.
// A tiny inline script in each page's <head> applies the saved theme before
// first paint so there is no flash; this module wires up the toggle button.

const KEY = 'theme';
const COLORS = { dark: '#161616', light: '#ffffff' };

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

export function initTheme() {
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => setTheme(currentTheme() === 'dark' ? 'light' : 'dark'));
  });
}
