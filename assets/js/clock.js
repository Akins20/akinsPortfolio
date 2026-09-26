// Live local time for every <time data-clock> on the page.

import { SITE } from './config.js';

export function initClock() {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: SITE.timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const tick = () => {
    const now = fmt.format(new Date());
    document.querySelectorAll('time[data-clock]').forEach((el) => {
      el.textContent = now;
      el.dateTime = now;
    });
  };
  tick();
  setInterval(tick, 10_000);
}
