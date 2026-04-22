import { readFileSync, writeFileSync } from 'node:fs';

const files = ['index.html', 'vita.html', 'impressum.html', 'datenschutz.html'];
const source = readFileSync('index.html', 'utf8');
const navMatch = source.match(/<nav class="nav"[\s\S]*?<\/nav>/);

if (!navMatch) {
  throw new Error('Navigation block not found in index.html');
}

const navBlock = navMatch[0];

for (const file of files.slice(1)) {
  const html = readFileSync(file, 'utf8');
  const replaced = html.replace(/<nav class="nav"[\s\S]*?<\/nav>/, navBlock);
  writeFileSync(file, replaced);
}

console.log(`Synced nav block from index.html to ${files.length - 1} pages.`);
