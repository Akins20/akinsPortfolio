// Keyboard shortcuts for people who like them (hidden from everyone else):
//   T        switch between dark and light
//   ← / →    previous / next project on project pages

export function initShortcuts() {
  addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.target.closest?.('input, textarea, select, [contenteditable="true"]')) return;

    if (e.key === 't' || e.key === 'T') {
      document.querySelector('[data-theme-toggle]')?.click();
      return;
    }
    const nav = document.querySelector('[data-project-nav]');
    if (!nav) return;
    if (e.key === 'ArrowLeft') nav.querySelector('[data-prev]')?.click();
    if (e.key === 'ArrowRight') nav.querySelector('[data-next]')?.click();
  });
}
