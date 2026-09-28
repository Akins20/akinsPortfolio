// Link previews need absolute URLs, and so does the sitemap. Put your live
// address in site.config.json ("url": "https://your-domain.com") and run
// `npm run build`. With an empty url everything stays relative.

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const { url = '' } = JSON.parse(await readFile(join(ROOT, 'site.config.json'), 'utf8'));
const base = url.trim().replace(/\/+$/, '');

const workPages = (await readdir(join(ROOT, 'work'))).filter((f) => f.endsWith('.html')).sort();
const pages = ['index.html', ...workPages.map((f) => `work/${f}`)];

// Attributes that must be absolute for crawlers. The optional host group makes
// this idempotent: re-running swaps one domain for another, or back to relative.
const PATTERNS = [
  /(<link rel="canonical" href=")(?:https?:\/\/[^/"]+)?(\/[^"]*")/g,
  /(<meta property="og:url" content=")(?:https?:\/\/[^/"]+)?(\/[^"]*")/g,
  /(<meta property="og:image" content=")(?:https?:\/\/[^/"]+)?(\/[^"]*")/g,
  /(<meta name="twitter:image" content=")(?:https?:\/\/[^/"]+)?(\/[^"]*")/g,
  /("image": ")(?:https?:\/\/[^/"]+)?(\/assets\/[^"]*")/g,
  /("url": ")(?:https?:\/\/[^/"]+)?(\/[^"]*")/g,
];

for (const page of pages) {
  const file = join(ROOT, page);
  const before = await readFile(file, 'utf8');
  let after = before;
  for (const re of PATTERNS) after = after.replace(re, `$1${base}$2`);
  if (after !== before) await writeFile(file, after);
}

await writeFile(
  join(ROOT, 'robots.txt'),
  `User-agent: *\nAllow: /\n${base ? `\nSitemap: ${base}/sitemap.xml\n` : ''}`,
);

if (base) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = ['/', ...workPages.map((f) => `/work/${f.replace(/\.html$/, '')}`)];
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => `  <url><loc>${base}${u === '/' ? '/' : u}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
    '\n</urlset>\n';
  await writeFile(join(ROOT, 'sitemap.xml'), xml);
  console.log(`SEO: absolute URLs set to ${base}; sitemap.xml written (${urls.length} pages)`);
} else {
  console.log('SEO: no url in site.config.json, so links stay relative and no sitemap is written');
}
