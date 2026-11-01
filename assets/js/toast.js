// Small transient message at the bottom of the screen.

let el;
let timer;

export function toast(message) {
  if (!el) {
    el = document.createElement('div');
    el.className =
      'toast fixed bottom-6 left-1/2 z-50 border border-line-strong bg-surface px-4 py-2.5 font-mono text-[0.8125rem] text-fg';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.append(el);
  }
  el.textContent = message;
  requestAnimationFrame(() => el.classList.add('on'));
  clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove('on'), 2400);
}
