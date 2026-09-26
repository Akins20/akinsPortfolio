// Copies the deployable site into dist/, which is what Vercel serves.
// Working files (src/, scripts/, notes, package files) stay out of it.

import { access, cp, mkdir, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const OUT = join(ROOT, 'dist');
const ENTRIES = [
  'index.html',
  '404.html',
  'work',
  'assets',
  'robots.txt',
  'sitemap.xml',
  'site.webmanifest',
  'favicon.ico',
];

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT);

const copied = [];
for (const entry of ENTRIES) {
  try {
    await access(join(ROOT, entry));
  } catch {
    continue; // optional files (e.g. sitemap.xml before a domain is set)
  }
  await cp(join(ROOT, entry), join(OUT, entry), { recursive: true });
  copied.push(entry);
}
console.log(`dist: ${copied.join(', ')}`);
