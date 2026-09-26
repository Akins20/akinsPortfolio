// Small transient message at the bottom of the screen.

let el;
let timer;

export function toast(message) {
  if (!el) {
    el = document.createElement('div');
    el.className =
      'toast fixed bottom-6 left-1/2 z-[80] rounded-full border border-line-strong bg-surface px-5 py-3 font-mono text-xs text-fg shadow-card';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.append(el);
  }
  el.textContent = message;
  requestAnimationFrame(() => el.classList.add('on'));
  clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove('on'), 2400);
}
