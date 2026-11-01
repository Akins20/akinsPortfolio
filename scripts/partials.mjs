// Copies the shared header and footer (src/partials/*.html) into every page,
// between <!-- header --> … <!-- /header --> markers, so each page is complete
// HTML that works without JavaScript. `{{year}}` becomes the current year, and
// project pages get "Work" marked as the current section.
// Runs on `npm run dev` and `npm run build`; or on its own: node scripts/partials.mjs

import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');
const NAMES = ['header', 'footer'];

export async function syncPartials() {
  const partials = {};
  for (const name of NAMES) {
    partials[name] = (await readFile(join(ROOT, 'src/partials', `${name}.html`), 'utf8'))
      .trim()
      .replaceAll('{{year}}', String(new Date().getFullYear()));
  }

  const work = (await readdir(join(ROOT, 'work'))).filter((f) => f.endsWith('.html')).map((f) => `work/${f}`);
  const changed = [];
  for (const page of ['index.html', '404.html', ...work]) {
    const file = join(ROOT, page);
    const before = await readFile(file, 'utf8');
    let after = before;
    for (const name of NAMES) {
      let block = partials[name];
      if (name === 'header' && page.startsWith('work/')) {
        block = block.replace('href="/#work"', 'href="/#work" aria-current="page"');
      }
      const re = new RegExp(`^([ \\t]*)<!-- ${name} -->[\\s\\S]*?<!-- /${name} -->`, 'm');
      after = after.replace(re, (_, indent) => {
        const body = block.split('\n').map((line) => (line ? indent + line : line)).join('\n');
        return `${indent}<!-- ${name} -->\n${body}\n${indent}<!-- /${name} -->`;
      });
    }
    if (after !== before) {
      await writeFile(file, after);
      changed.push(page);
    }
  }
  console.log(`partials: ${changed.length ? changed.join(', ') : 'all pages up to date'}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await syncPartials();
