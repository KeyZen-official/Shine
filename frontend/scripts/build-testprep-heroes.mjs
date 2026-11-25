#!/usr/bin/env node
/**
 * Generates notched-safe hero images for test preparation pages whose subjects
 * sit close to the top edge of the source 16:9 photograph.
 *
 * `EditorialHero` clips a 13.8535% notch from the top of the frame at lg (5/2).
 * Adding top headroom built from a vertically-flipped, softly blurred extension
 * of the top edge lets `object-top` keep the entire subject visible below the
 * notch without modifying the source images used in 4:3 overview cards.
 *
 *   node scripts/build-testprep-heroes.mjs
 */

import sharp from 'sharp';
import path from 'node:path';

const IMAGERY_DIR = path.resolve(import.meta.dirname, '..', 'public', 'imagery');

const TARGETS = [
  { source: 'ielts-hero.jpg', output: 'ielts-hero-notched.jpg', headroom: 92 },
  { source: 'pte-hero.jpg', output: 'pte-hero-notched.jpg', headroom: 92 },
  { source: 'toefl-hero.jpg', output: 'toefl-hero-notched.jpg', headroom: 92 },
  { source: 'gmat-hero.jpg', output: 'gmat-hero-notched.jpg', headroom: 92 },
  { source: 'sat-hero.jpg', output: 'sat-hero-notched.jpg', headroom: 104 },
];

for (const item of TARGETS) {
  const srcPath = path.join(IMAGERY_DIR, item.source);
  const outPath = path.join(IMAGERY_DIR, item.output);

  const meta = await sharp(srcPath).metadata();
  const width = meta.width;
  const height = meta.height;
  const h = item.headroom;

  // Stretch only the top 8px edge upward with soft blur so there are no
  // mirrored spires/objects while seamlessly extending sky/ceiling headroom.
  const topStrip = await sharp(srcPath)
    .extract({ left: 0, top: 0, width, height: 8 })
    .resize({ width, height: h, fit: 'fill' })
    .blur(6)
    .toBuffer();

  const canvasHeight = height + h;

  await sharp({
    create: {
      width,
      height: canvasHeight,
      channels: 3,
      background: { r: 20, g: 36, b: 58 },
    },
  })
    .composite([
      { input: topStrip, top: 0, left: 0 },
      { input: srcPath, top: h, left: 0 },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outPath);

  console.log(`Built ${item.output}: ${width}x${canvasHeight} (+${h}px headroom)`);
}
