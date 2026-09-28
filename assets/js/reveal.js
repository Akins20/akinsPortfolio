// Fade/slide elements in as they enter the viewport.
// Mark elements with data-reveal (or data-reveal="clip" for a wipe).
// Put data-reveal-stagger on a parent to cascade its [data-reveal] children.

export function initReveal() {
  document.querySelectorAll('[data-reveal-stagger]').forEach((group) => {
    const step = Number(group.dataset.revealStagger) || 80;
    group.querySelectorAll(':scope > [data-reveal]').forEach((el, i) => {
      el.style.setProperty('--reveal-delay', `${i * step}ms`);
    });
  });

  // Arriving via a page transition: shared elements are already on screen.
  if (document.documentElement.classList.contains('vt')) {
    document.querySelectorAll('[data-vt]').forEach((el) => el.classList.add('is-visible'));
  }

  const els = [...document.querySelectorAll('[data-reveal]:not(.is-visible)')];
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  // A fully clipped element never counts as "on screen", so clip wipes are
  // triggered by their parent instead.
  const targets = new Map();
  for (const el of els) {
    const target = el.dataset.reveal === 'clip' ? el.parentElement : el;
    if (!targets.has(target)) targets.set(target, []);
    targets.get(target).push(el);
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        targets.get(entry.target)?.forEach((el) => el.classList.add('is-visible'));
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
  );
  targets.forEach((_, target) => io.observe(target));
}
