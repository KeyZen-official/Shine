#!/usr/bin/env node
/**
 * One-off: compares the colours sampled from the supplied logo against the
 * tokens currently in tailwind.config.js, and recomputes the WCAG contrast
 * table for the candidate palette.
 *
 * The question this answers: which token mismatches would actually be
 * visible, and which are below the threshold anyone could notice?
 *
 *   node scripts/compare-brand-colours.mjs
 */

const toRgb = (hex) => {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));
};

const relativeLuminance = (hex) => {
  const linear = toRgb(hex)
    .map((channel) => channel / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};

const contrast = (a, b) => {
  const [la, lb] = [relativeLuminance(a), relativeLuminance(b)];
  const [light, dark] = la > lb ? [la, lb] : [lb, la];
  return (light + 0.05) / (dark + 0.05);
};

/* --- CIE Lab, for perceptual difference -------------------------------- */

const toXyz = (hex) => {
  const [r, g, b] = toRgb(hex)
    .map((channel) => channel / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return [
    r * 0.4124 + g * 0.3576 + b * 0.1805,
    r * 0.2126 + g * 0.7152 + b * 0.0722,
    r * 0.0193 + g * 0.1192 + b * 0.9505,
  ];
};

const toLab = (hex) => {
  const white = [0.95047, 1, 1.08883];
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const [fx, fy, fz] = toXyz(hex).map((value, i) => f(value / white[i]));
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
};

/** CIE76. Rough, but the thresholds are well understood. */
const deltaE = (a, b) => {
  const [la, aa, ba] = toLab(a);
  const [lb, ab, bb] = toLab(b);
  return Math.sqrt((la - lb) ** 2 + (aa - ab) ** 2 + (ba - bb) ** 2);
};

const verdict = (delta) => {
  if (delta < 1) return 'identical to the eye';
  if (delta < 2.3) return 'below the just-noticeable threshold';
  if (delta < 5) return 'noticeable side by side';
  if (delta < 10) return 'clearly different';
  return 'obviously a different colour';
};

console.log('\nSampled from the logo artwork');
console.log('  red   #DD0100   9.76% of the canvas  (the "Shine" script and tagline)');
console.log('  navy  #010D6C   1.67% of the canvas  (the "CONSULTANT" wordmark)');

console.log('\nAgainst the tokens currently in tailwind.config.js');
const pairs = [
  ['accent (red)', '#C8102E', '#DD0100'],
  ['navy', '#14243A', '#010D6C'],
];

for (const [label, current, sampled] of pairs) {
  const delta = deltaE(current, sampled);
  console.log(`  ${label.padEnd(13)} ${current} -> ${sampled}   dE=${delta.toFixed(1)}  ${verdict(delta)}`);
}

console.log('\nContrast table if the red token becomes #DD0100');
const surfaces = {
  'ivory  #F8F7F2': '#F8F7F2',
  'white  #FFFFFF': '#FFFFFF',
  'sage   #DCE9E4': '#DCE9E4',
  'navy   #14243A': '#14243A',
};

const check = (fg, bg, label, needBody = true) => {
  const ratio = contrast(fg, bg);
  const pass = needBody ? ratio >= 4.5 : ratio >= 3;
  console.log(
    `  ${fg} on ${label.padEnd(16)} ${ratio.toFixed(2).padStart(5)}:1  ${
      pass ? 'pass' : 'FAIL'
    }${needBody ? '' : ' (non-text / large only)'}`,
  );
  return pass;
};

for (const [label, value] of Object.entries(surfaces)) {
  check('#DD0100', value, label);
}
console.log('  white   on red    #DD0100 ', contrast('#FFFFFF', '#DD0100').toFixed(2) + ':1', contrast('#FFFFFF', '#DD0100') >= 4.5 ? ' pass  (CTA label)' : ' FAIL');

console.log('\nThe red-on-navy substitute');
console.log('  #DD0100 on navy fails for text, so a lighter variant is still needed.');
for (const candidate of ['#EE6070', '#F2707E', '#FF8A8A', '#FF9A99']) {
  const ratio = contrast(candidate, '#14243A');
  console.log(
    `  ${candidate} on navy  ${ratio.toFixed(2)}:1  ${ratio >= 4.5 ? 'pass' : 'FAIL'}   dE from #DD0100 = ${deltaE(candidate, '#DD0100').toFixed(1)}`,
  );
}

console.log('\nIf the navy token became the logo navy #010D6C');
for (const fg of ['#FFFFFF', '#DD0100', '#EE6070']) {
  const ratio = contrast(fg, '#010D6C');
  console.log(
    `  ${fg} on #010D6C  ${ratio.toFixed(2)}:1  ${ratio >= 4.5 ? 'pass' : ratio >= 3 ? 'large only' : 'FAIL'}`,
  );
}
console.log('');
