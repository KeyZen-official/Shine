#!/usr/bin/env node
/**
 * Generates the site's default imagery locally, on brand.
 *
 * Why not stock photography: the previous default pointed at hardcoded
 * Unsplash photo IDs that were never verified. Every one of them returned
 * 404, so every image on the site had been silently falling back to its
 * placeholder — the hero included. Depending on a third-party host for core
 * visuals is what caused that, and a keyless random-photo service would put
 * an arbitrary landscape next to "Study in the United Kingdom", which for a
 * consultancy is worse than no photograph at all.
 *
 * So these are real files, served from our own origin, drawn from the
 * palette, with the star motif lifted from the supplied logo. They read as
 * deliberate art direction rather than a broken image, and they are
 * replaced the moment someone uploads a real photograph against a record.
 *
 *   node scripts/build-placeholder-imagery.mjs
 */

import sharp from 'sharp';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

// Resolved from this file, not the working directory, so the script works
// from anywhere. It used to live in the backend and wrote across into the
// frontend; both now sit in the same project.
const OUT = path.resolve(import.meta.dirname, '..', 'public', 'imagery');
await mkdir(OUT, { recursive: true });

const NAVY = '#14243A';
const NAVY_DEEP = '#0D1829';
const NAVY_MID = '#25374F';
const SAGE = '#DCE9E4';
const IVORY = '#F8F7F2';
const RED = '#D00100';

/** The five-point star from the logo's swoosh, as a path. */
const star = (cx, cy, r, fill, opacity = 1) => {
  const points = [];
  for (let i = 0; i < 5; i += 1) {
    const outer = (Math.PI / 180) * (-90 + i * 72);
    const inner = (Math.PI / 180) * (-90 + i * 72 + 36);
    points.push(`${cx + r * Math.cos(outer)},${cy + r * Math.sin(outer)}`);
    points.push(`${cx + r * 0.382 * Math.cos(inner)},${cy + r * 0.382 * Math.sin(inner)}`);
  }
  return `<polygon points="${points.join(' ')}" fill="${fill}" opacity="${opacity}"/>`;
};

/** The swoosh: stars on an arc, shrinking, alternating red and navy. */
const swoosh = (w, h, { scale = 1, opacity = 0.9, onDark = false } = {}) => {
  const cx = w * 0.74;
  const cy = h * 0.34;
  const radius = Math.min(w, h) * 0.3 * scale;
  const sizes = [0.1, 0.075, 0.055, 0.04, 0.028, 0.02];
  return sizes
    .map((size, i) => {
      const angle = (Math.PI / 180) * (165 - i * 30);
      return star(
        cx + radius * Math.cos(angle),
        cy + radius * Math.sin(angle),
        Math.min(w, h) * size * scale,
        i % 2 === 0 ? RED : onDark ? SAGE : NAVY,
        opacity,
      );
    })
    .join('');
};

/**
 * There is deliberately no `hero` panel here any more.
 *
 * A real hero photograph was supplied, so `defaultImage('hero')` in
 * frontend/lib/media.js now returns the `hero-photo-*` variants built by
 * build-hero-image.mjs, and nothing maps to a generated hero panel. Keeping
 * one would ship about 50 KB of files no page requests, and would leave two
 * different images both called "hero" — which is the kind of ambiguity that
 * gets the wrong one wired up later.
 *
 * If the photograph is ever withdrawn, either restore a panel here and
 * point the `hero` key at it, or let `pickImage` return null, which makes
 * the hero render its typographic treatment instead.
 */
const PANELS = {
  /* Sage field with navy geometry — for lighter contexts. */
  sage: (w, h) => `
    <rect width="${w}" height="${h}" fill="${SAGE}"/>
    <path d="M0,${h} L${w * 0.52},0 L${w * 0.78},0 L${w * 0.26},${h} Z"
          fill="${NAVY}" opacity="0.08"/>
    <path d="M${w * 0.62},${h} L${w},${h * 0.3} L${w},${h} Z"
          fill="${NAVY}" opacity="0.12"/>
    ${swoosh(w, h, { scale: 0.8, opacity: 0.75 })}`,

  /* Ivory with a navy band — documents, process, admin contexts. */
  ivory: (w, h) => `
    <rect width="${w}" height="${h}" fill="${IVORY}"/>
    <rect y="${h * 0.66}" width="${w}" height="${h * 0.34}" fill="${NAVY}" opacity="0.06"/>
    <rect x="${w * 0.08}" y="${h * 0.2}" width="${w * 0.34}" height="${h * 0.02}" fill="${NAVY}" opacity="0.18"/>
    <rect x="${w * 0.08}" y="${h * 0.28}" width="${w * 0.24}" height="${h * 0.02}" fill="${NAVY}" opacity="0.12"/>
    <rect x="${w * 0.08}" y="${h * 0.36}" width="${w * 0.3}" height="${h * 0.02}" fill="${RED}" opacity="0.5"/>
    ${swoosh(w, h, { scale: 0.7, opacity: 0.7 })}`,

  /* Navy with a sage diagonal — campus, architecture. */
  'navy-split': (w, h) => `
    <rect width="${w}" height="${h}" fill="${NAVY}"/>
    <path d="M${w * 0.45},0 L${w},0 L${w},${h} L${w * 0.72},${h} Z" fill="${SAGE}" opacity="0.14"/>
    <path d="M0,${h * 0.7} L${w * 0.3},${h} L0,${h} Z" fill="${RED}" opacity="0.25"/>
    ${swoosh(w, h, { onDark: true, scale: 0.75, opacity: 0.8 })}`,

  /* Light, airy — advice, counselling, people contexts. */
  light: (w, h) => `
    <defs>
      <linearGradient id="l" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${IVORY}"/>
        <stop offset="100%" stop-color="${SAGE}"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#l)"/>
    <circle cx="${w * 0.22}" cy="${h * 0.62}" r="${h * 0.3}" fill="${NAVY}" opacity="0.07"/>
    <circle cx="${w * 0.36}" cy="${h * 0.76}" r="${h * 0.2}" fill="${RED}" opacity="0.1"/>
    ${swoosh(w, h, { scale: 0.8, opacity: 0.8 })}`,
};

/**
 * The ten keys the frontend asks for, mapped onto the five panels. Related
 * contexts share a panel; adjacent ones do not, so a grid of destination
 * cards does not read as five copies of the same picture.
 */
const KEY_TO_PANEL = {
  // `hero` is absent on purpose: it is served by the supplied photograph,
  // not by a panel. See the note above PANELS.
  campus: 'navy-split',
  library: 'sage',
  study: 'light',
  lecture: 'sage',
  architecture: 'navy-split',
  // Was 'hero' when the hero was a generated navy field. Pointing it at the
  // photograph instead would put the same student on every cityscape card.
  city: 'navy-split',
  arrival: 'light',
  advice: 'light',
  documents: 'ivory',
};

const WIDTHS = [360, 768, 1024, 1920];
const ASPECT = 1600 / 1000;

const written = [];

for (const [name, render] of Object.entries(PANELS)) {
  for (const width of WIDTHS) {
    const height = Math.round(width / ASPECT);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${render(
      width,
      height,
    )}</svg>`;

    const file = `${name}-${width}.webp`;
    await sharp(Buffer.from(svg)).webp({ quality: 88 }).toFile(path.join(OUT, file));
    written.push({ file, size: (await stat(path.join(OUT, file))).size });
  }

  // One raster fallback per panel for the <picture> element.
  const height = Math.round(1200 / ASPECT);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${height}" viewBox="0 0 1200 ${height}">${render(
    1200,
    height,
  )}</svg>`;
  const file = `${name}-fallback.jpg`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(OUT, file));
  written.push({ file, size: (await stat(path.join(OUT, file))).size });
}

await writeFile(
  path.join(OUT, 'manifest.json'),
  `${JSON.stringify({ panels: Object.keys(PANELS), keys: KEY_TO_PANEL, widths: WIDTHS, aspect: ASPECT }, null, 2)}\n`,
);

const total = written.reduce((sum, entry) => sum + entry.size, 0);

console.log(`\nGenerated ${written.length} files into frontend/public/imagery`);
for (const entry of written.filter((e) => e.file.includes('768') || e.file.includes('fallback'))) {
  console.log(`  ${(entry.size / 1024).toFixed(1).padStart(7)} KB  ${entry.file}`);
}
console.log(`\n  total ${(total / 1024).toFixed(1)} KB across ${Object.keys(PANELS).length} panels`);
console.log('  wrote manifest.json\n');
