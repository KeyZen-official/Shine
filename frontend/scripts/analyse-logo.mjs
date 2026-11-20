#!/usr/bin/env node
/**
 * One-off: inspects the supplied logo so the brand tokens can be set from
 * the artwork rather than guessed.
 *
 * Reports whether the PNG is genuinely transparent, where the artwork
 * actually ends inside the canvas, and the exact red and navy in use.
 *
 *   node scripts/analyse-logo.mjs <path-to-png>
 */

import sharp from 'sharp';
import process from 'node:process';

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/analyse-logo.mjs <path-to-png>');
  process.exit(1);
}

const image = sharp(file);
const meta = await image.metadata();

console.log('\nFile');
console.log(`  ${meta.width} x ${meta.height}  ${meta.format}  channels=${meta.channels}`);
console.log(`  declares alpha: ${meta.hasAlpha}`);

const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

/* --- is the transparency real, or is it a white background? ------------ */

let fullyTransparent = 0;
let nearWhiteOpaque = 0;
const corners = [
  [0, 0],
  [width - 1, 0],
  [0, height - 1],
  [width - 1, height - 1],
];

for (let i = 0; i < data.length; i += channels) {
  const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
  if (a < 8) fullyTransparent += 1;
  else if (r > 245 && g > 245 && b > 245) nearWhiteOpaque += 1;
}

const total = width * height;
console.log('\nBackground');
console.log(`  fully transparent pixels: ${((fullyTransparent / total) * 100).toFixed(1)}%`);
console.log(`  opaque near-white pixels: ${((nearWhiteOpaque / total) * 100).toFixed(1)}%`);
for (const [x, y] of corners) {
  const i = (y * width + x) * channels;
  console.log(
    `  corner (${x},${y}): rgba(${data[i]},${data[i + 1]},${data[i + 2]},${data[i + 3]})`,
  );
}

/* --- where does the artwork actually end? ------------------------------ */

let minX = width;
let minY = height;
let maxX = -1;
let maxY = -1;

const isInk = (i) => {
  const a = data[i + 3];
  if (a < 16) return false;
  // Ink is anything meaningfully darker or more saturated than paper.
  const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
  return !(r > 242 && g > 242 && b > 242);
};

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    if (!isInk((y * width + x) * channels)) continue;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
}

const boxWidth = maxX - minX + 1;
const boxHeight = maxY - minY + 1;

console.log('\nArtwork bounding box');
console.log(`  left=${minX} top=${minY} right=${maxX} bottom=${maxY}`);
console.log(`  ${boxWidth} x ${boxHeight}  (aspect ${(boxWidth / boxHeight).toFixed(3)})`);
console.log(
  `  wasted canvas: ${(100 - ((boxWidth * boxHeight) / total) * 100).toFixed(1)}% of the file`,
);

/* --- the actual brand colours ------------------------------------------ */

const buckets = new Map();

for (let i = 0; i < data.length; i += channels) {
  const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
  if (a < 200) continue;
  if (r > 242 && g > 242 && b > 242) continue; // paper
  // Quantise lightly so antialiasing does not fragment the count.
  const key = `${r >> 3}:${g >> 3}:${b >> 3}`;
  const bucket = buckets.get(key) ?? { count: 0, r: 0, g: 0, b: 0 };
  bucket.count += 1;
  bucket.r += r;
  bucket.g += g;
  bucket.b += b;
  buckets.set(key, bucket);
}

const hex = (r, g, b) =>
  `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;

const top = [...buckets.values()]
  .sort((a, b) => b.count - a.count)
  .slice(0, 8)
  .map((bucket) => ({
    hex: hex(bucket.r / bucket.count, bucket.g / bucket.count, bucket.b / bucket.count),
    share: ((bucket.count / total) * 100).toFixed(2),
  }));

console.log('\nDominant ink colours');
for (const entry of top) console.log(`  ${entry.hex}   ${entry.share}% of canvas`);

/* --- contrast of those colours, for the token decision ----------------- */

const luminance = (value) => {
  const srgb = [1, 3, 5].map((offset) => parseInt(value.slice(offset, offset + 2), 16) / 255);
  const linear = srgb.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};

const ratio = (a, b) => {
  const [la, lb] = [luminance(a), luminance(b)];
  const [light, dark] = la > lb ? [la, lb] : [lb, la];
  return (light + 0.05) / (dark + 0.05);
};

console.log('\nContrast of the top two inks against our surfaces');
const surfaces = { ivory: '#f8f7f2', white: '#ffffff', navy: '#14243a' };
for (const ink of top.slice(0, 3)) {
  for (const [name, value] of Object.entries(surfaces)) {
    const r = ratio(ink.hex, value);
    const verdict = r >= 4.5 ? 'body ok' : r >= 3 ? 'large text only' : 'FAILS';
    console.log(`  ${ink.hex} on ${name.padEnd(6)} ${r.toFixed(2)}:1  ${verdict}`);
  }
}

console.log('');
