const body = await (await fetch('http://localhost:3000/', { cache: 'no-store' })).text();
const visible = body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<!--[\s\S]*?-->/g, '');

const ok = (c) => (c ? 'ok    ' : 'ABSENT');

console.log(`home page: ${body.length} bytes\n`);

console.log('Section markers:');
for (const [label, needle] of [
  ['section id', 'id="student-feedback"'],
  ['heading "What students say"', 'What students say'],
  ['eyebrow "In their words"', 'In their words'],
  ['intro line', 'Reviews left by students'],
]) {
  console.log(`  ${ok(visible.includes(needle))}  ${label}`);
}

console.log('\nReviewers:');
for (const name of [
  'Parth Gala',
  'Krishnasagar Thakkar',
  'Ashwin Singh',
  'Dolwin Menezes',
  'Raj Ajmera',
  'Madan Panth',
  'Apurv Nerurkar',
]) {
  console.log(`  ${ok(visible.includes(name))}  ${name}`);
}

console.log('\nReview photographs referenced in the HTML:');
const imgs = [...body.matchAll(/\/reviews\/[a-z0-9-]+\.jpg/g)].map((m) => m[0]);
console.log(`  ${new Set(imgs).size} unique: ${[...new Set(imgs)].join(', ') || '(none)'}`);

console.log('\nAll section ids on the page, in order:');
const ids = [...body.matchAll(/<section[^>]*\bid="([a-z0-9-]+)"/g)].map((m) => m[1]);
console.log(`  ${ids.join(' -> ')}`);

console.log('\nAll h2 headings, in order:');
const h2 = [...body.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) =>
  m[1].replace(/<[^>]+>/g, '').trim(),
);
for (const h of h2) console.log(`  ${h}`);
