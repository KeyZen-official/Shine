#!/usr/bin/env node
/**
 * One-off: finds a text-safe darkening of the logo red.
 *
 * The logo red #DD0100 passes on ivory (4.80:1) and white (5.15:1) but only
 * reaches 4.12:1 on sage, which fails body text. Sage banding carries
 * accent-coloured eyebrows, so a single red cannot serve both the fill and
 * the text role.
 *
 * This searches for the lightest red that clears 4.5:1 on all three light
 * surfaces, so the text variant stays as close to the brand red as the
 * contrast requirement allows.
 *
 *   node scripts/pick-accent-text.mjs
 */

const toRgb = (hex) => {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));
};

const toHex = ([r, g, b]) =>
  `#${[r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')}`;

const luminance = (hex) => {
  const linear = toRgb(hex)
    .map((c) => c / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};

const contrast = (a, b) => {
  const [la, lb] = [luminance(a), luminance(b)];
  const [light, dark] = la > lb ? [la, lb] : [lb, la];
  return (light + 0.05) / (dark + 0.05);
};

const SURFACES = { ivory: '#F8F7F2', white: '#FFFFFF', sage: '#DCE9E4' };
const BRAND = '#DD0100';
const [br, bg, bb] = toRgb(BRAND);

console.log('\nSearching for the lightest red that clears 4.5:1 on ivory, white and sage');
console.log(`Starting from the brand red ${BRAND}\n`);

let chosen = null;

// Scale the brand red toward black in 1% steps: this keeps the hue and the
// relative channel balance, so the result still reads as the same red
// rather than drifting toward maroon or orange.
for (let step = 0; step <= 60; step += 1) {
  const factor = 1 - step / 100;
  const candidate = toHex([br * factor, bg * factor, bb * factor]);

  const ratios = Object.fromEntries(
    Object.entries(SURFACES).map(([name, value]) => [name, contrast(candidate, value)]),
  );
  const worst = Math.min(...Object.values(ratios));

  if (step % 4 === 0 || worst >= 4.5) {
    console.log(
      `  -${String(step).padStart(2)}%  ${candidate}  ivory ${ratios.ivory.toFixed(2)}  ` +
        `white ${ratios.white.toFixed(2)}  sage ${ratios.sage.toFixed(2)}  ` +
        `worst ${worst.toFixed(2)}${worst >= 4.5 ? '  <-- clears it' : ''}`,
    );
  }

  if (worst >= 4.5 && !chosen) {
    chosen = { candidate, ratios, worst, step };
    break;
  }
}

if (!chosen) {
  console.log('\nNo darkening within 60% cleared 4.5:1 on every surface.');
  process.exit(1);
}

console.log('\nChosen text variant');
console.log(`  ${chosen.candidate}  (brand red darkened ${chosen.step}%)`);
for (const [name, value] of Object.entries(SURFACES)) {
  console.log(`    on ${name.padEnd(6)} ${contrast(chosen.candidate, value).toFixed(2)}:1  pass`);
}

console.log('\nAnd the hover state, one step darker again');
const hover = toHex(toRgb(chosen.candidate).map((c) => c * 0.86));
console.log(`  ${hover}`);
for (const [name, value] of Object.entries(SURFACES)) {
  console.log(`    on ${name.padEnd(6)} ${contrast(hover, value).toFixed(2)}:1`);
}

console.log('\nWhite label on the brand red fill (the primary CTA)');
console.log(`  white on ${BRAND}  ${contrast('#FFFFFF', BRAND).toFixed(2)}:1  pass`);
console.log(`  white on ${chosen.candidate}  ${contrast('#FFFFFF', chosen.candidate).toFixed(2)}:1  pass`);
console.log('');
