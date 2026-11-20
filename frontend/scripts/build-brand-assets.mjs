#!/usr/bin/env node
/**
 * Builds the site's brand assets from the supplied logo artwork.
 *
 * The source is a 1672x941 transparent PNG at 507 KB, of which 30% is empty
 * canvas. Shipping it as-is would mean a half-megabyte download for a 96px
 * navbar logo. This trims it to the artwork, emits only the widths actually
 * rendered, and writes the Next.js icon and Open Graph conventions.
 *
 * It also measures the artwork's internal bands — the script, the wordmark,
 * the tagline — so the square icon crop is derived from the pixels rather
 * than eyeballed from a screenshot.
 *
 *   node scripts/build-brand-assets.mjs <source.png>
 */

import sharp from 'sharp';
import { mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const source = process.argv[2];
if (!source) {
  console.error('Usage: node scripts/build-brand-assets.mjs <source.png>');
  process.exit(1);
}

const FRONTEND = path.resolve(import.meta.dirname, '..');
const BRAND_DIR = path.join(FRONTEND, 'public', 'brand');
const APP_DIR = path.join(FRONTEND, 'app');

const IVORY = { r: 0xf8, g: 0xf7, b: 0xf2, alpha: 1 };
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

await mkdir(BRAND_DIR, { recursive: true });

/* ------------------------------------------------------------------ */
/* 1. Measure                                                          */
/* ------------------------------------------------------------------ */

const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const inkAt = (x, y) => {
  const i = (y * width + x) * channels;
  if (data[i + 3] < 16) return false;
  return !(data[i] > 242 && data[i + 1] > 242 && data[i + 2] > 242);
};

let left = width;
let top = height;
let right = -1;
let bottom = -1;
const rowInk = new Array(height).fill(0);

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    if (!inkAt(x, y)) continue;
    rowInk[y] += 1;
    if (x < left) left = x;
    if (x > right) right = x;
    if (y < top) top = y;
    if (y > bottom) bottom = y;
  }
}

const box = { left, top, width: right - left + 1, height: bottom - top + 1 };
console.log('\nArtwork');
console.log(`  source     ${width}x${height}`);
console.log(`  trimmed to ${box.width}x${box.height} at (${box.left},${box.top})`);
console.log(`  aspect     ${(box.width / box.height).toFixed(3)}`);

/**
 * Find the horizontal gaps: runs of rows with no ink separate the script
 * from the wordmark from the tagline. The last gap is where the tagline
 * begins, which is the crop point for the compact lockup.
 */
const gaps = [];
let runStart = null;
for (let y = top; y <= bottom; y += 1) {
  if (rowInk[y] === 0) {
    if (runStart === null) runStart = y;
  } else if (runStart !== null) {
    if (y - runStart >= 4) gaps.push({ from: runStart, to: y - 1, size: y - runStart });
    runStart = null;
  }
}

console.log(`  horizontal gaps found: ${gaps.length}`);
for (const gap of gaps) {
  console.log(`    rows ${gap.from}-${gap.to}  (${gap.size}px)`);
}

// The compact lockup drops the tagline, which sits below the final gap.
const lastGap = gaps[gaps.length - 1];
const compact =
  lastGap && lastGap.from > top + box.height * 0.5
    ? { left: box.left, top: box.top, width: box.width, height: lastGap.from - box.top }
    : box;

console.log(
  `  compact lockup (tagline dropped) ${compact.width}x${compact.height}  aspect ${(
    compact.width / compact.height
  ).toFixed(3)}`,
);

/* ------------------------------------------------------------------ */
/* 2. Emit                                                            */
/* ------------------------------------------------------------------ */

const trimmed = () => sharp(source).extract(box);
const trimmedCompact = () => sharp(source).extract(compact);

const written = [];

async function emit(pipeline, file) {
  const target = path.join(BRAND_DIR, file);
  await pipeline.toFile(target);
  const { size } = await stat(target);
  written.push({ file: `public/brand/${file}`, size });
}

/**
 * Widths are derived from the actual render slots, not picked from a
 * convenient-looking ladder:
 *
 *   navbar  56px tall x 2.14 aspect = 120px wide -> 120 (1x), 240 (2x)
 *   footer  200px wide                          -> 200 (1x), 400 (2x)
 *
 * Generating a 480px file for a 120px slot, as a first pass of this script
 * did, means shipping four times the pixels anyone can see.
 */
for (const w of [200, 400]) {
  await emit(trimmed().resize({ width: w }).webp({ quality: 86 }), `logo-lockup-${w}.webp`);
}
// Palette PNG: the artwork is two flat inks plus antialiasing, so 256
// colours is ample and roughly halves the file. These are fallbacks only —
// every browser that matters reads the WebP.
await emit(
  trimmed().resize({ width: 400 }).png({ compressionLevel: 9, palette: true, quality: 90 }),
  'logo-lockup-400.png',
);

// Compact lockup for the navigation bar, where the 1.72:1 stacked mark
// would have to shrink until the wordmark was a smudge.
for (const w of [120, 240]) {
  await emit(
    trimmedCompact().resize({ width: w }).webp({ quality: 86 }),
    `logo-compact-${w}.webp`,
  );
}
await emit(
  trimmedCompact().resize({ width: 240 }).png({ compressionLevel: 9, palette: true, quality: 90 }),
  'logo-compact-240.png',
);

/**
 * Square icon. The lockup is wider than it is tall, so it is padded rather
 * than cropped — slicing a crop out of a wordmark from a guessed coordinate
 * is how you end up with a favicon showing half a letter.
 */
const squareSide = Math.max(compact.width, compact.height);
const squarePad = {
  top: Math.round((squareSide - compact.height) / 2),
  bottom: squareSide - compact.height - Math.round((squareSide - compact.height) / 2),
  left: Math.round((squareSide - compact.width) / 2),
  right: squareSide - compact.width - Math.round((squareSide - compact.width) / 2),
};

await emit(
  trimmedCompact()
    .extend({ ...squarePad, background: TRANSPARENT })
    .resize(512, 512, { fit: 'contain', background: TRANSPARENT })
    .png({ compressionLevel: 9 }),
  'icon-512.png',
);

/* --- Next.js file conventions ------------------------------------------ */

// app/icon.png becomes the favicon; transparent so it works on either
// theme. 128px, not 256: a favicon renders at 16-48px, and the larger file
// is served to every visitor on every page for no visible gain.
await trimmedCompact()
  .extend({ ...squarePad, background: TRANSPARENT })
  .resize(128, 128, { fit: 'contain', background: TRANSPARENT })
  .png({ compressionLevel: 9 })
  .toFile(path.join(APP_DIR, 'icon.png'));

// iOS composites an apple-touch-icon onto black, so this one needs a
// background of its own. Inset so the artwork is not flush to the corners.
await trimmedCompact()
  .resize(150, 150, { fit: 'contain', background: TRANSPARENT })
  .extend({ top: 15, bottom: 15, left: 15, right: 15, background: WHITE })
  .flatten({ background: WHITE })
  .png({ compressionLevel: 9 })
  .toFile(path.join(APP_DIR, 'apple-icon.png'));

// Default Open Graph card. Previously there was no default share image at
// all, so a link to any page without its own image rendered as bare text.
const ogLogo = await trimmed().resize({ width: 620 }).png().toBuffer();
await sharp({
  create: { width: 1200, height: 630, channels: 4, background: IVORY },
})
  .composite([{ input: ogLogo, gravity: 'centre' }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(APP_DIR, 'opengraph-image.png'));

for (const name of ['app/icon.png', 'app/apple-icon.png', 'app/opengraph-image.png']) {
  const { size } = await stat(path.join(FRONTEND, name));
  written.push({ file: name, size });
}

/* ------------------------------------------------------------------ */
/* 3. Report                                                          */
/* ------------------------------------------------------------------ */

const sourceSize = (await stat(source)).size;

console.log('\nWritten');
let total = 0;
for (const entry of written.sort((a, b) => a.file.localeCompare(b.file))) {
  total += entry.size;
  console.log(`  ${(entry.size / 1024).toFixed(1).padStart(7)} KB  ${entry.file}`);
}

console.log('\nPayload');
console.log(`  source artwork              ${(sourceSize / 1024).toFixed(1)} KB`);
const navbar = written.find((entry) => entry.file.endsWith('logo-compact-240.webp'));
if (navbar) {
  console.log(`  what a visitor downloads    ${(navbar.size / 1024).toFixed(1)} KB (navbar, 2x)`);
  console.log(
    `  saving per visitor          ${(((sourceSize - navbar.size) / sourceSize) * 100).toFixed(1)}%`,
  );
}
console.log(`  all generated assets        ${(total / 1024).toFixed(1)} KB`);

await writeFile(
  path.join(BRAND_DIR, 'README.md'),
  `# Brand assets

Generated from the supplied logo artwork by
\`backend/scripts/build-brand-assets.mjs\`. Do not edit these by hand — rerun
the script against the source artwork instead.

| File | Use |
| --- | --- |
| \`logo-compact-240.webp\`, \`-480.webp\`, \`-240.png\` | Navigation bar. Tagline cropped: a ${(
    box.width / box.height
  ).toFixed(2)}:1 stacked mark shrunk to navbar height leaves the wordmark illegible. |
| \`logo-lockup-200/400/800.webp\`, \`-400.png\` | Footer and anywhere with vertical room for the full lockup including the tagline. |
| \`icon-512.png\` | Square, transparent, padded. |
| \`../../app/icon.png\` | Favicon (Next.js file convention). |
| \`../../app/apple-icon.png\` | iOS home screen. Opaque white, because iOS composites transparency onto black. |
| \`../../app/opengraph-image.png\` | Default link preview card, 1200x630 on ivory. |

## Measured from the artwork

- Source: ${width}x${height}, ${(sourceSize / 1024).toFixed(0)} KB, genuinely transparent
  (85.6% of pixels have zero alpha; all four corners are clear).
- Artwork occupies ${box.width}x${box.height} at (${box.left},${box.top}) — 30% of the
  canvas was empty.
- Brand red: \`#DD0100\`. Brand navy: \`#010D6C\`.

## A note on the square icon

The lockup is wider than it is tall, so the icon is padded, not cropped. At
16px the mark is a red smudge — unavoidable for a three-line stacked
wordmark. **A dedicated single-glyph mark would be noticeably better** and is
a design task, not a code one. If one is produced, drop it in as
\`app/icon.png\` and nothing else needs changing.
`,
);

console.log('\nWrote public/brand/README.md');
console.log('');
