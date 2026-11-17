// Generate canonical URLs, crawler directives and a sitemap without fabricated modification dates.
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const { url = '' } = JSON.parse(await readFile(join(ROOT, 'site.config.json'), 'utf8'));
const base = url.trim().replace(/\/+$/, '');
if (base && !/^https?:\/\//i.test(base)) throw new Error('site.config.json url must be an absolute HTTP(S) URL');

const workPages = (await readdir(join(ROOT, 'work'))).filter((file) => file.endsWith('.html')).sort();
const pages = ['index.html', ...workPages.map((file) => join('work', file))];

for (const page of pages) {
  const file = join(ROOT, page);
  const before = await readFile(file, 'utf8');
  let html = before;
  if (base) {
    const path = page === 'index.html' ? '/' : `/${page.replace(/\\.html$/, '')}`;
    const canonical = `${base}${path}`;
    html = html.replace(/(<link rel="canonical" href=")[^"]*(")/i, `$1${canonical}$2`);
    html = html.replace(/(<meta property="og:url" content=")[^"]*(")/i, `$1${canonical}$2`);
    html = html.replace(/(<meta property="og:image" content=")(?:https?:\/\/[^/]+)?(\/[^"]*)(")/i, `$1${base}$2$3`);
    html = html.replace(/(<meta name="twitter:image" content=")(?:https?:\/\/[^/]+)?(\/[^"]*)(")/i, `$1${base}$2$3`);
    html = html.replace(/("image": ")(?:https?:\/\/[^/]+)?(\/assets\/[^"]*)(")/g, `$1${base}$2$3`);
    html = html.replace(/("url": ")(?:https?:\/\/[^/]+)?(\/[^"]*)(")/g, `$1${base}$2$3`);
  }
  await writeFile(file, html);
}

const notFound = join(ROOT, '404.html');
try {
  let html = await readFile(notFound, 'utf8');
  if (!/<meta\s+name="robots"/i.test(html)) html = html.replace('</head>', '  <meta name="robots" content="noindex, follow">\n</head>');
  await writeFile(notFound, html);
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

await writeFile(join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n${base ? `\nSitemap: ${base}/sitemap.xml\n` : ''}`);
if (base) {
  const urls = pages.map((page) => page === 'index.html' ? '/' : `/${page.replace(/\\.html$/, '')}`);
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((path) => `  <url><loc>${base}${path}</loc></url>`).join('\n') +
    '\n</urlset>\n';
  await writeFile(join(ROOT, 'sitemap.xml'), xml);
  console.log(`SEO: canonical URLs updated; sitemap.xml written (${urls.length} pages; no fabricated lastmod dates)`);
} else {
  console.log('SEO: no url in site.config.json; canonical URLs remain relative and no sitemap is written');
}
