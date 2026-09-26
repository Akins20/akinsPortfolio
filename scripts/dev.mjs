// Local dev: Tailwind in watch mode + a tiny static server.
// The server mirrors Vercel's `cleanUrls`, so /work/freya serves work/freya.html.
// Usage: npm run dev            (PORT=4000 npm run dev to change the port)

import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const PORT = Number(process.env.PORT) || 5173;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

// --watch=always keeps watching even when stdin is closed (e.g. run in the
// background). Set POLL=1 if file changes aren't picked up (some network or
// external drives don't emit file-system events).
const tailwindArgs = ['tailwindcss', '-i', 'src/css/main.css', '-o', 'assets/css/site.css', '--watch=always'];
if (process.env.POLL) tailwindArgs.push('--poll=400');
const tailwind = spawn('npx', tailwindArgs, { cwd: ROOT, stdio: 'inherit' });

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function resolvePath(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '');
  const base = join(ROOT, clean);
  if (!base.startsWith(ROOT)) return null;
  for (const candidate of [base, `${base}.html`, join(base, 'index.html')]) {
    if (await isFile(candidate)) return candidate;
  }
  return null;
}

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  const file = await resolvePath(pathname);
  if (!file) {
    res.writeHead(404, { 'content-type': TYPES['.html'] });
    res.end(await readFile(join(ROOT, '404.html')).catch(() => 'Not found'));
    return;
  }
  res.writeHead(200, {
    'content-type': TYPES[extname(file)] ?? 'application/octet-stream',
    'cache-control': 'no-store',
  });
  res.end(await readFile(file));
});

server.listen(PORT, () => console.log(`\n  Portfolio running at http://localhost:${PORT}\n`));

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    tailwind.kill();
    server.close();
    process.exit(0);
  });
}
