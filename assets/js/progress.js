// Reading progress bar on project pages (<div data-progress>).
// Shows how far through the story you are, so the end always feels close.

export function initProgress() {
  const bar = document.querySelector('[data-progress]');
  if (!bar) return;
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(scrollY / max, 1) : 0;
    bar.style.transform = `scaleX(${p})`;
    ticking = false;
  };
  addEventListener(
    'scroll',
    () => {
      if (!ticking) requestAnimationFrame(update);
      ticking = true;
    },
    { passive: true },
  );
  addEventListener('resize', update);
  update();
}
