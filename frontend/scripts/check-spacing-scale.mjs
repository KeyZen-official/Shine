#!/usr/bin/env node
/**
 * Checks that every spacing utility used in the source actually compiles.
 *
 * tailwind.config.js *replaces* the spacing scale rather than extending it,
 * which is deliberate — it stops an off-scale value reaching production.
 * The trap is that Tailwind drops an unknown utility silently: `h-3.5` on
 * an icon does not warn, it just produces no rule, and the icon renders at
 * its intrinsic size.
 *
 * This reads the built stylesheet and reports any utility referenced in the
 * source that has no corresponding rule.
 *
 *   node scripts/check-spacing-scale.mjs
 */

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const SITE = process.env.SITE ?? 'http://localhost:3000';
const ROOT = path.resolve(import.meta.dirname, '..');
const SCAN = ['app', 'components'];

/** Utilities whose value comes from the spacing scale. */
const PREFIXES = [
  'p', 'px', 'py', 'pt', 'pr', 'pb', 'pl',
  'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml',
  'gap', 'gap-x', 'gap-y',
  'w', 'h', 'size',
  'top', 'right', 'bottom', 'left', 'inset', 'inset-x', 'inset-y',
  'space-x', 'space-y',
  'min-w', 'min-h', 'max-w', 'max-h',
  'translate-x', 'translate-y',
  'basis',
];

const pattern = new RegExp(
  `(?:^|[\\s"'\`])-?(?:(?:sm|md|lg|xl|2xl|hover|focus|focus-visible|group-hover|first|last|peer-focus)\\:)*(${PREFIXES.join('|')})-(\\d+(?:\\.\\d+)?)(?=[\\s"'\`]|$)`,
  'g',
);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.jsx?$/.test(entry.name)) yield full;
  }
}

const used = new Map(); // "h-3.5" -> Set of files

for (const base of SCAN) {
  for await (const file of walk(path.join(ROOT, base))) {
    const raw = await readFile(file, 'utf8');

    /**
     * Comments are stripped before scanning. Without this the checker
     * reads prose: a comment explaining that `h-30` is not a valid
     * Tailwind class was itself reported as a missing utility.
     *
     * The `[^:]` guard keeps `https://` from being read as a line comment.
     */
    const source = raw
      .replace(/\/\*[\s\S]*?\*\//g, ' ')
      .replace(/(^|[^:])\/\/[^\n]*/g, '$1');

    for (const match of source.matchAll(pattern)) {
      const key = `${match[1]}-${match[2]}`;
      if (!used.has(key)) used.set(key, new Set());
      used.get(key).add(path.relative(ROOT, file));
    }
  }
}

const page = await fetch(SITE);
const html = await page.text();
const href = html.match(/href="(\/_next\/static\/css\/[^"]+)"/);
if (!href) {
  console.error('Could not find the stylesheet. Is the production server running?');
  process.exit(1);
}
const css = await (await fetch(`${SITE}${href[1]}`)).text();

const escapeForCss = (value) => value.replace(/\./g, '\\.');

const missing = [];
const compiled = [];

for (const [utility, files] of [...used.entries()].sort()) {
  /**
   * A utility counts as compiled if its class name appears anywhere in a
   * selector. Matching on `.name{` alone cried wolf on three shapes that
   * are perfectly valid:
   *
   *   space-y-3        emits `.space-y-3>:not([hidden])~:not([hidden]){`
   *   group-hover:…    emits `.group:hover .group-hover\:translate-x-1{`
   *   first:pt-0       emits `.first\:pt-0:first-child{`
   *
   * So the test is simply whether the escaped class name is present as a
   * class selector at all.
   */
  const escaped = escapeForCss(utility);
  const found =
    css.includes(`.${escaped}`) ||
    // The source pattern strips a leading minus, so `-mx-4` is recorded as
    // `mx-4` and Tailwind emits it as `.-mx-4`.
    css.includes(`.-${escaped}`) ||
    css.includes(`\\:${escaped}`) ||
    css.includes(`\\:-${escaped}`);

  if (found) compiled.push(utility);
  else missing.push({ utility, files: [...files] });
}

console.log(`\nSpacing utilities referenced in source: ${used.size}`);
console.log(`  compiled: ${compiled.length}`);
console.log(`  missing:  ${missing.length}`);

if (missing.length > 0) {
  console.log('\nThese produce no CSS rule — Tailwind dropped them silently:\n');
  for (const entry of missing) {
    console.log(`  ${entry.utility.padEnd(16)} ${entry.files.length} file(s)`);
    for (const file of entry.files.slice(0, 3)) console.log(`      ${file}`);
    if (entry.files.length > 3) console.log(`      … and ${entry.files.length - 3} more`);
  }
  console.log('\nEither add the value to the spacing scale in tailwind.config.js');
  console.log('or replace the usages with a value that is on the scale.\n');
  process.exit(1);
}

console.log('\nEvery spacing utility used in source compiles.\n');
