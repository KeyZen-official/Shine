#!/usr/bin/env node
/**
 * Builds the home hero photograph into responsive variants.
 *
 *   node scripts/build-hero-image.mjs [path-to-source]
 *
 * Defaults to ../brand-source/hero-original.png.
 *
 * ---------------------------------------------------------------------------
 * Why this script exists rather than referencing the upload directly
 * ---------------------------------------------------------------------------
 *
 * The supplied file is a 1.85 MB PNG at 2137x736. Two problems with serving
 * it as-is, and the second is the interesting one.
 *
 * 1. Weight. It is the Largest Contentful Paint element on the home page.
 *    A 1.85 MB PNG there is the single worst thing you can do to the
 *    page's loading performance, and PNG is the wrong codec for a
 *    photograph anyway. The variants below are WebP and come to a fraction
 *    of the size.
 *
 * 2. The hero frame cuts a notch out of the top of the image.
 *
 *    `EditorialHero` clips its figure with a path whose top edge sits at
 *    y = 0.138535 for x between 0.02 and 0.85 — the strip the eyebrow and
 *    social icons sit in. So the top 13.85% of whatever image is supplied
 *    is removed across 83% of its width.
 *
 *    In this photograph the student's hair starts about 35px from the top
 *    of a 736px frame, roughly 4.8%. Scaled into the hero, a 13.85% cut
 *    removes about 102px of the original — her hair and part of her
 *    forehead. It would read as a mistake, because it is one.
 *
 *    The fix uses the fact that the notch *discards* that band rather than
 *    covering it: give the photograph exactly enough headroom that the
 *    band falls on padding, and the whole subject survives below it.
 *
 *      canvas height = photo height / (1 - 0.138535)
 *                    = 736 / 0.861465
 *                    = 854
 *
 *    2137 x 854 is 2.502:1, which is within a rounding error of the
 *    frame's own `lg:aspect-[5/2]`. That is not a coincidence worth
 *    relying on blindly, so it is asserted below: if a future source image
 *    has a different aspect ratio, the script says so instead of quietly
 *    producing a crop that cuts somebody's head off.
 *
 * The padding colour is almost irrelevant, because at every aspect the
 * frame uses (3/2, 2/1 and 5/2 are all narrower than the image, so the
 * image is always height-matched) the band is clipped away precisely. It
 * is filled with the navy token anyway, so that a browser which cannot
 * apply `clip-path` degrades to a navy bar rather than a white gap.
 */

import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

/** Must match the clip path's top edge in components/sections/EditorialHero.jsx. */
const NOTCH_DEPTH = 0.138535;

/** The frame's widest aspect, from `lg:aspect-[5/2]` on the same component. */
const FRAME_ASPECT = 5 / 2;

const NAVY = '#14243A';
const WIDTHS = [360, 768, 1024, 1920];
const BASENAME = 'hero-photo';

// Resolved from this file rather than the working directory, so the script
// behaves the same however it is invoked.
const source = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : path.resolve(import.meta.dirname, '..', '..', 'brand-source', 'hero-original.png');
const OUT = path.resolve(import.meta.dirname, '..', 'public', 'imagery');
await mkdir(OUT, { recursive: true });

const input = sharp(source);
const meta = await input.metadata();

if (!meta.width || !meta.height) {
  console.error(`Could not read dimensions from ${source}`);
  process.exit(1);
}

// Full canvas: the photograph plus the headroom the notch will remove.
const canvasHeight = Math.round(meta.height / (1 - NOTCH_DEPTH));
const headroom = canvasHeight - meta.height;
const canvasAspect = meta.width / canvasHeight;

console.log(`\nSource      ${path.basename(source)}  ${meta.width}x${meta.height}  (${(meta.width / meta.height).toFixed(3)}:1)`);
console.log(`Headroom    +${headroom}px at the top, for the ${(NOTCH_DEPTH * 100).toFixed(2)}% notch`);
console.log(`Canvas      ${meta.width}x${canvasHeight}  (${canvasAspect.toFixed(3)}:1)`);

/**
 * The frame is height-matched only while the canvas is at least as wide as
 * the frame. If it is narrower, the image is width-matched instead, the
 * headroom no longer lines up with the notch, and the subject gets cut
 * after all. Fail loudly rather than ship that.
 */
if (canvasAspect < FRAME_ASPECT - 0.01) {
  console.error(
    `\nThe padded canvas is ${canvasAspect.toFixed(3)}:1 but the hero frame opens up to ` +
      `${FRAME_ASPECT}:1.\nAt that width the image would be scaled to fit the width and cropped ` +
      `vertically,\nso the headroom would not align with the notch and the subject would be cut.\n\n` +
      `Either crop the source wider than ${FRAME_ASPECT}:1 before padding, or narrow the\n` +
      `frame's widest aspect in EditorialHero.jsx and update FRAME_ASPECT here.`,
  );
  process.exit(1);
}

/** The padded master, rendered once and resized from. */
const padded = await input
  .extend({ top: headroom, bottom: 0, left: 0, right: 0, background: NAVY })
  .toColourspace('srgb')
  .png()
  .toBuffer();

const written = [];

for (const width of WIDTHS) {
  const height = Math.round(width / canvasAspect);
  const file = `${BASENAME}-${width}.webp`;
  await sharp(padded)
    .resize({ width, height, fit: 'cover' })
    // 80 keeps the gradient in the navy field free of banding. Below about
    // 75 the smooth blue develops visible steps, which is the one artefact
    // this particular image shows first.
    .webp({ quality: 80, effort: 6 })
    .toFile(path.join(OUT, file));
  written.push({ file, size: (await stat(path.join(OUT, file))).size });
}

// Raster fallback for the <picture> element.
const fallbackWidth = 1200;
const fallbackFile = `${BASENAME}-fallback.jpg`;
await sharp(padded)
  .resize({ width: fallbackWidth, height: Math.round(fallbackWidth / canvasAspect), fit: 'cover' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(OUT, fallbackFile));
written.push({ file: fallbackFile, size: (await stat(path.join(OUT, fallbackFile))).size });

const sourceSize = (await stat(source)).size;
const served = written.find((entry) => entry.file === `${BASENAME}-1920.webp`).size;

console.log('\nWrote into frontend/public/imagery:');
for (const entry of written) {
  console.log(`  ${(entry.size / 1024).toFixed(1).padStart(8)} KB  ${entry.file}`);
}
console.log(`\n  source                 ${(sourceSize / 1024).toFixed(1)} KB`);
console.log(`  widest variant served  ${(served / 1024).toFixed(1)} KB`);
console.log(`  saving                 ${(100 - (served / sourceSize) * 100).toFixed(1)}%`);
console.log('\nDeclare these dimensions in frontend/lib/media.js:');
console.log(`  width: ${meta.width}, height: ${canvasHeight}\n`);
