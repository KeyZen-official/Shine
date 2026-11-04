#!/usr/bin/env node
/**
 * Checks the home hero's structure, after a redesign pass whose whole point
 * was that two call-to-action buttons were overflowing their grid column
 * and sitting on top of the supporting paragraphs.
 *
 * The overflow itself needs a browser to measure. What can be asserted from
 * the markup is that the causes are gone: the column is wide enough, the
 * buttons are laid out by grid fractions rather than by content width, the
 * size overrides actually took effect, and nothing is absolutely
 * positioned.
 *
 *   node scripts/check-hero-layout.mjs
 */

import { readFile } from 'node:fs/promises';

const SITE = process.env.SITE ?? 'http://localhost:3000';

const results = [];
const check = (label, condition) => results.push({ label, pass: Boolean(condition) });

const page = await fetch(`${SITE}/`, { cache: 'no-store' });
const html = await page.text();

// The hero ends where the introduction section begins.
const hero = html.split('section-y bg-ivory')[0];

// Read alongside the rendered page, for the cases where the correct render
// is nothing at all and only the source can show the wiring survives.
const heroSource = await readFile(
  new URL('../components/sections/EditorialHero.jsx', import.meta.url),
  'utf8',
);

console.log(`\nHome hero layout check against ${SITE}\n`);

console.log('Call to action placement');
check(
  'the lower grid is 7/5, not 2-of-3',
  /lg:grid-cols-\[minmax\(0,7fr\)_minmax\(0,5fr\)\]/.test(hero),
);
check('the old third-width column is gone', !/md:col-span-2/.test(hero));
check(
  'the buttons are laid out by grid fractions, not content width',
  /grid w-full gap-3 sm:grid-cols-2/.test(hero),
);
check('both buttons are present', /Book Free Consultation/.test(hero) && /Explore Study Destinations/.test(hero));
check('the primary stays the red fill', /bg-accent[^"]*/.test(hero));
check('the secondary stays the outlined variant', /border-\[1\.5px\] border-navy/.test(hero));
check('the buttons are full width when stacked', /grid w-full/.test(hero));

console.log('\nSize overrides actually applied');
// Button used to concatenate classes, so a caller's px-4 lost to the
// size's px-6 depending on Tailwind's emission order.
check('the padding override survived the merge', /px-4/.test(hero) && !/px-8 text-body[^"]*group/.test(hero));
check('the height override survived the merge', /min-h-12/.test(hero));
check('no conflicting height class remains on the buttons', !/h-13[^"]*min-h-12|min-h-12[^"]*h-13/.test(hero));

console.log('\nNo absolute positioning in the stats row');
check('the feature figure is no longer pinned to the banner', !/lg:absolute lg:bottom-16/.test(hero));
check('the stats row is a flex row in normal flow', /sm:flex-row sm:items-end sm:justify-between/.test(hero));

console.log('\nFigures read correctly');
check('singular agrees with a count of one', !/>1<\/dd><span[^>]*>study destinations</.test(hero));
check('no orphan separator character', !/>\|<\/span>/.test(hero));

/**
 * The stats row renders a figure per published record type, and omits
 * itself entirely when nothing is published. A separator only exists
 * between two figures, so asserting one unconditionally was really
 * asserting "this database has at least two kinds of published content" —
 * which made the check fail on a database with destinations but no courses
 * or universities yet. That is a legitimate state for a site being filled
 * in, not a layout regression.
 *
 * So: count the figures first, and assert the separator only where one
 * should exist. The failure mode this guards against — a literal "|"
 * character per item, which left a trailing orphan — is covered above and
 * is not conditional.
 */
const smallStats = [...hero.matchAll(/<dt class="sr-only">/g)].length;
if (smallStats >= 2) {
  check('separators are borders on following items', /border-l border-navy\/15/.test(hero));
} else {
  check(
    `separator check skipped — only ${smallStats} figure(s) published, so no separator is due`,
    !/border-l border-navy\/15/.test(hero),
  );
}

console.log('\nPreserved from the original design');
check('the cream background is unchanged', /bg-ivory/.test(hero));
check('the navy star banner is unchanged', /clip-path:url\(#hero-notch/.test(hero));
check(
  'the eyebrow and spinning mark remain',
  /animate-spin/.test(hero) && /Overseas education, migration (&amp;|&) training/i.test(hero),
);
/**
 * The social strip is driven by `WebsiteSettings.socialLinks`, and no real
 * accounts have been supplied for this company — so the correct render is
 * no strip at all. This used to assert `instagram|linkedin` was present,
 * which passed only because an optional development script
 * (`backend/scripts/apply-hero-copy.mjs`) seeds placeholder profile URLs.
 * A check that needs placeholder data in order to pass is not checking the
 * site. What matters is that the markup is still wired up, so that is
 * asserted against the component source instead of the rendered page.
 */
check(
  'the social strip omits itself when no accounts are configured',
  !/instagram\.com|linkedin\.com/i.test(hero),
);
check(
  'the social strip is still wired to settings, so it renders once accounts exist',
  /socialLinks/.test(heroSource) && /platform/.test(heroSource),
);
check('the headline remains', /Your Global Education/.test(hero));
check('the right-hand branding lockup remains', /logo-lockup-400/.test(hero));
check('the headline reveal animation is intact', /sr-only|inline-flex overflow-hidden/.test(hero));

console.log('');
for (const r of results) console.log(`  ${r.pass ? 'ok   ' : 'FAIL '} ${r.label}`);

const failures = results.filter((r) => !r.pass);
console.log(`\n${results.length - failures.length} passed, ${failures.length} failed.`);
if (failures.length > 0) process.exit(1);
console.log('');
