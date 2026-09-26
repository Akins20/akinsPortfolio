// Entry point, loaded on every page.

import './components/site-header.js';
import './components/site-footer.js';
import './components/svg-include.js';
import { bindLinks } from './bind.js';
import { initReveal } from './reveal.js';
import { initClock } from './clock.js';
import { initContact } from './contact.js';
import { initProgress } from './progress.js';

bindLinks();
initClock();
initReveal();
initContact();
initProgress();

// Heavier, page-specific pieces load only where they're used.
if (document.querySelector('[data-maze]')) import('./maze.js').then((m) => m.initMaze());
