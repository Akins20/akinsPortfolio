// Motion: split-text reveals, card spotlight + cursor label, magnetic buttons,
// scroll-linked timeline and parallax. Durations and easings live in CSS
// (see "Motion system" in src/css/main.css). Nothing here runs when the
// visitor has asked for reduced motion.

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

// ---------------------------------------------------------------------------
// Split text. <h2 data-split> splits into words, data-split="chars" into
// letters. Screen readers get the original sentence from a hidden copy.
// ---------------------------------------------------------------------------
export function initSplit(root = document) {
  if (reduceMotion) return;
  root.querySelectorAll('[data-split]:not(.is-split)').forEach((el) => {
    const mode = el.dataset.split === 'chars' ? 'chars' : 'words';
    const label = el.textContent.replace(/\s+/g, ' ').trim();
    let i = 0;

    const unit = (text) => {
      const mask = document.createElement('span');
      mask.className = 'split-mask';
      const inner = document.createElement('span');
      inner.className = 'split-unit';
      inner.style.setProperty('--i', i++);
      inner.textContent = text;
      mask.append(inner);
      return mask;
    };

    const walk = (node) => {
      for (const child of [...node.childNodes]) {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          for (const part of child.textContent.split(/(\s+)/)) {
            if (!part) continue;
            if (/^\s+$/.test(part)) {
              frag.append(' ');
            } else if (mode === 'chars') {
              const word = document.createElement('span');
              word.style.whiteSpace = 'nowrap';
              for (const ch of part) word.append(unit(ch));
              frag.append(word);
            } else {
              frag.append(unit(part));
            }
          }
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
          walk(child);
        }
      }
    };
    walk(el);

    const visual = document.createElement('span');
    visual.setAttribute('aria-hidden', 'true');
    visual.append(...el.childNodes);
    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = label;
    el.append(sr, visual);
    el.classList.add('is-split');
    if (mode === 'chars') el.style.setProperty('--split-step', '28ms');
  });
}

// ---------------------------------------------------------------------------
// Pointer effects (desktop only)
// ---------------------------------------------------------------------------
export function initPointer() {
  if (reduceMotion || !finePointer) return;

  // Soft light that follows the cursor inside .spotlight elements
  document.querySelectorAll('.spotlight').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  // "View" label that follows the cursor over [data-cursor] elements
  const label = document.createElement('div');
  label.className = 'cursor-label';
  label.setAttribute('aria-hidden', 'true');
  document.body.append(label);
  let x = 0, y = 0, raf = 0;
  const place = () => {
    label.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    raf = 0;
  };
  addEventListener(
    'pointermove',
    (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(place);
    },
    { passive: true },
  );
  document.querySelectorAll('[data-cursor]').forEach((el) => {
    el.addEventListener('pointerenter', () => {
      label.textContent = el.dataset.cursor;
      label.classList.add('on');
    });
    el.addEventListener('pointerleave', () => label.classList.remove('on'));
    // Let the arrow button / external links take over when hovered
    el.querySelectorAll('a[target="_blank"]').forEach((a) => {
      a.addEventListener('pointerenter', () => label.classList.remove('on'));
      a.addEventListener('pointerleave', () => label.classList.add('on'));
    });
  });

  // Magnetic buttons: drift a few pixels toward the pointer
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const strength = Number(el.dataset.magnetic) || 0.3;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.setProperty('--tx', `${dx * strength}px`);
      el.style.setProperty('--ty', `${dy * strength}px`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--tx', '0px');
      el.style.setProperty('--ty', '0px');
    });
  });
}

// ---------------------------------------------------------------------------
// Scroll-linked: timeline line + dots, portrait parallax
// ---------------------------------------------------------------------------
export function initScrollEffects() {
  if (reduceMotion) return;
  const timelines = [...document.querySelectorAll('.timeline')];
  const parallax = [...document.querySelectorAll('[data-parallax]')];
  if (!timelines.length && !parallax.length) return;

  let ticking = false;
  const update = () => {
    const vh = innerHeight;
    for (const t of timelines) {
      const r = t.getBoundingClientRect();
      const p = Math.min(Math.max((vh * 0.65 - r.top) / r.height, 0), 1);
      t.style.setProperty('--progress', p.toFixed(3));
      t.querySelectorAll('.timeline-dot').forEach((dot) => {
        dot.classList.toggle('passed', dot.getBoundingClientRect().top < vh * 0.65);
      });
    }
    for (const el of parallax) {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) continue;
      const factor = Number(el.dataset.parallax) || 0.08;
      const offset = (r.top + r.height / 2 - vh / 2) * -factor;
      el.style.setProperty('--py', `${offset.toFixed(1)}px`);
    }
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) requestAnimationFrame(update);
    ticking = true;
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  update();
}
