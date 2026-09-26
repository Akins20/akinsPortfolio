// Chomp card: generates a maze, floods it to prove every cell is reachable
// (the same check the game runs on each level), then a chomper follows the
// shortest route to the exit. New level every loop. Colours follow the theme.

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const N = 1, E = 2, S = 4, W = 8;
const DIRS = [
  [N, 0, -1, S],
  [E, 1, 0, W],
  [S, 0, 1, N],
  [W, -1, 0, E],
];

function rng(seed) {
  // mulberry32
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generate(cols, rows, seed) {
  const rand = rng(seed);
  // Every cell starts with all four walls.
  const walls = new Uint8Array(cols * rows).fill(N | E | S | W);
  const seen = new Uint8Array(cols * rows);
  const stack = [0];
  seen[0] = 1;
  while (stack.length) {
    const cur = stack[stack.length - 1];
    const x = cur % cols;
    const y = (cur / cols) | 0;
    const options = DIRS.filter(([, dx, dy]) => {
      const nx = x + dx, ny = y + dy;
      return nx >= 0 && ny >= 0 && nx < cols && ny < rows && !seen[ny * cols + nx];
    });
    if (!options.length) {
      stack.pop();
      continue;
    }
    const [bit, dx, dy, opposite] = options[(rand() * options.length) | 0];
    const next = (y + dy) * cols + (x + dx);
    walls[cur] &= ~bit;
    walls[next] &= ~opposite;
    seen[next] = 1;
    stack.push(next);
  }
  // Knock out a few extra walls so there are loops, like an arcade maze.
  for (let i = 0; i < cols * rows * 0.07; i++) {
    const c = (rand() * cols * rows) | 0;
    const x = c % cols, y = (c / cols) | 0;
    const [bit, dx, dy, opposite] = DIRS[(rand() * 4) | 0];
    const nx = x + dx, ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
    walls[c] &= ~bit;
    walls[ny * cols + nx] &= ~opposite;
  }
  return walls;
}

function flood(walls, cols, rows, start) {
  const dist = new Int32Array(cols * rows).fill(-1);
  const prev = new Int32Array(cols * rows).fill(-1);
  const queue = [start];
  dist[start] = 0;
  for (let q = 0; q < queue.length; q++) {
    const c = queue[q];
    const x = c % cols, y = (c / cols) | 0;
    for (const [bit, dx, dy] of DIRS) {
      if (walls[c] & bit) continue;
      const n = (y + dy) * cols + (x + dx);
      if (dist[n] !== -1) continue;
      dist[n] = dist[c] + 1;
      prev[n] = c;
      queue.push(n);
    }
  }
  return { dist, prev, max: dist[queue[queue.length - 1]] };
}

function readColors() {
  const cs = getComputedStyle(document.documentElement);
  const v = (name) => cs.getPropertyValue(name).trim();
  return { wall: v('--line-strong'), accent: v('--accent'), ok: v('--ok'), fg: v('--fg'), bg: v('--bg') };
}

export function initMaze() {
  document.querySelectorAll('canvas[data-maze]').forEach(setup);
}

function setup(canvas) {
  const ctx = canvas.getContext('2d');
  const label = canvas.parentElement.querySelector('[data-maze-label]');
  let colors = readColors();
  let visible = false;
  let level = 1;
  let seed = (Math.random() * 1e9) | 0;
  let state;

  document.addEventListener('themechange', () => {
    colors = readColors();
    if (reduceMotion && state) draw(1, 1);
  });

  function newLevel() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cell = Math.max(14, Math.round(w / 30));
    const cols = Math.max(8, Math.floor((w - 24) / cell));
    const rows = Math.max(6, Math.floor((h - 24) / cell));
    const ox = (w - cols * cell) / 2, oy = (h - rows * cell) / 2;
    const walls = generate(cols, rows, seed + level);
    const exit = cols * rows - 1;
    const { dist, prev, max } = flood(walls, cols, rows, 0);
    const path = [];
    for (let c = exit; c !== -1; c = prev[c]) path.unshift(c);
    state = { w, h, cell, cols, rows, ox, oy, walls, dist, max, path, exit };
  }

  const center = (c) => [
    state.ox + (c % state.cols) * state.cell + state.cell / 2,
    state.oy + ((c / state.cols) | 0) * state.cell + state.cell / 2,
  ];

  // floodT and pathT run 0 → 1
  function draw(floodT, pathT, mouth = 0.25) {
    const { w, h, cell, cols, rows, ox, oy, walls, dist, max, path, exit } = state;
    ctx.clearRect(0, 0, w, h);

    // Flood wave
    const front = floodT * (max + 6);
    ctx.fillStyle = colors.accent;
    for (let c = 0; c < cols * rows; c++) {
      const d = dist[c];
      if (d < 0 || d > front) continue;
      const age = front - d;
      ctx.globalAlpha = age < 6 ? 0.5 - age * 0.06 : 0.12;
      ctx.fillRect(ox + (c % cols) * cell + 1, oy + ((c / cols) | 0) * cell + 1, cell - 2, cell - 2);
    }
    ctx.globalAlpha = 1;

    // Walls
    ctx.strokeStyle = colors.wall;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    for (let c = 0; c < cols * rows; c++) {
      const x = ox + (c % cols) * cell, y = oy + ((c / cols) | 0) * cell;
      if (walls[c] & N) { ctx.moveTo(x, y); ctx.lineTo(x + cell, y); }
      if (walls[c] & W) { ctx.moveTo(x, y); ctx.lineTo(x, y + cell); }
      if ((c % cols) === cols - 1 && walls[c] & E) { ctx.moveTo(x + cell, y); ctx.lineTo(x + cell, y + cell); }
      if (((c / cols) | 0) === rows - 1 && walls[c] & S) { ctx.moveTo(x, y + cell); ctx.lineTo(x + cell, y + cell); }
    }
    ctx.stroke();

    // Pellets along the route ahead, trail behind
    const head = pathT * (path.length - 1);
    for (let i = 0; i < path.length; i++) {
      const [x, y] = center(path[i]);
      if (i > head) {
        ctx.fillStyle = colors.fg;
        ctx.globalAlpha = pathT > 0 ? 0.55 : 0;
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    // Exit
    const [ex, ey] = center(exit);
    ctx.fillStyle = colors.ok;
    ctx.beginPath();
    ctx.arc(ex, ey, cell * 0.28, 0, Math.PI * 2);
    ctx.fill();

    // Chomper
    if (pathT > 0) {
      const i = Math.min(Math.floor(head), path.length - 1);
      const j = Math.min(i + 1, path.length - 1);
      const t = head - i;
      const [x1, y1] = center(path[i]);
      const [x2, y2] = center(path[j]);
      const x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t;
      const angle = Math.atan2(y2 - y1, x2 - x1) || 0;
      ctx.fillStyle = colors.accent;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x, y, cell * 0.36, angle + mouth, angle + Math.PI * 2 - mouth);
      ctx.closePath();
      ctx.fill();
    }
  }

  const setLabel = (text) => label && (label.textContent = text);

  if (reduceMotion) {
    newLevel();
    draw(1, 1);
    setLabel(`Level ${level} · every corner reachable ✓`);
    return;
  }

  new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.1 }).observe(canvas);

  let phase = 'flood';
  let t0 = performance.now();
  let last = t0;
  const FLOOD_MS = 2200, PATH_MS = 3600, HOLD_MS = 1400;
  newLevel();
  draw(0, 0); // show the empty maze straight away, before it scrolls into view
  setLabel(`Level ${level} · generating…`);
  new ResizeObserver(() => {
    if (!state) return;
    newLevel();
    draw(phase === 'flood' ? 0 : 1, 0);
  }).observe(canvas);

  function frame(now) {
    requestAnimationFrame(frame);
    const dt = now - last;
    last = now;
    if (!visible || document.hidden) {
      t0 += dt; // freeze the current phase while off-screen
      return;
    }
    const t = now - t0;
    const mouth = 0.08 + Math.abs(Math.sin(now / 90)) * 0.38;
    if (phase === 'flood') {
      draw(Math.min(t / FLOOD_MS, 1), 0);
      if (t >= FLOOD_MS) {
        phase = 'path';
        t0 = now;
        setLabel(`Level ${level} · every corner reachable ✓`);
      }
    } else if (phase === 'path') {
      const p = Math.min(t / PATH_MS, 1);
      draw(1, 0.001 + p * 0.999, mouth);
      if (p >= 1) {
        phase = 'hold';
        t0 = now;
        setLabel(`Level ${level} · cleared!`);
      }
    } else if (t >= HOLD_MS) {
      level++;
      newLevel();
      phase = 'flood';
      t0 = now;
      setLabel(`Level ${level} · generating…`);
    }
  }
  requestAnimationFrame(frame);
}
