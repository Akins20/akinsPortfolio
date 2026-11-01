// Entry point, loaded on every page. Pages work without it; this adds the
// theme toggle, copy-email, the contact form and the Lagos clock.

import { bindLinks } from './bind.js';
import { initTheme } from './theme.js';
import { initClock } from './clock.js';
import { initContact } from './contact.js';

bindLinks();
initTheme();
initClock();
initContact();

// The 404 page's maze loads only where it's used.
if (document.querySelector('[data-maze]')) import('./maze.js').then((m) => m.initMaze());
