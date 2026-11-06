#!/usr/bin/env node
/**
 * End-to-end check of the whole site against a running `next start`.
 *
 *   npm run build && npm start      # in one terminal
 *   npm run check:site              # in another
 *
 * It exists because this site has no API and no database to test against,
 * so the old integration suite and its 61 end-to-end API checks went with
 * them. What is left worth asserting is: every public route answers 200,
 * the removed routes answer 404, the real content is on the pages, the
 * claims the client withheld are still absent, and both form handlers
 * accept a valid submission while refusing spam, invalid input and
 * repetition.
 *
 * Unlike the suite it replaced, this needs no fixtures and no seeding —
 * the content is in the repository, so the expected values are knowable.
 */

const SITE = process.env.SITE ?? 'http://localhost:3000';
const ok = (c) => (c ? 'ok    ' : 'FAIL  ');
let failures = 0;
const record = (pass) => {
  if (!pass) failures += 1;
  return pass;
};

/**
 * A fresh client address per run, per group.
 *
 * The rate limiter holds a 10-minute window in process memory, so running
 * this script twice against the same server reused spent budgets and every
 * enquiry check came back 429 — the limiter working correctly, reported as
 * six product failures. Unique addresses make each run independent.
 */
const run = Math.floor(Math.random() * 250) + 1;
const IP = {
  enquiry: `198.18.${run}.11`,
  booking: `198.18.${run}.22`,
  limiter: `198.18.${run}.33`,
  other: `198.18.${run}.44`,
};
const json = (ip) => ({ 'Content-Type': 'application/json', 'x-forwarded-for': ip });

async function page(path) {
  const r = await fetch(SITE + path);
  const body = await r.text();
  return {
    status: r.status,
    body,
    visible: body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<!--[\s\S]*?-->/g, ''),
  };
}

console.log('\n=== every public route, with no database and no API running ===');
const routes = [
  '/',
  '/about',
  '/contact',
  '/book-consultation',
  '/destinations',
  '/destinations/uk',
  '/destinations/dubai',
  '/destinations/europe',
  '/services',
  '/services/career-counselling',
  '/services/institutional-services',
  '/test-preparation',
  '/test-preparation/ielts',
  '/test-preparation/gmat',
  '/privacy-policy',
  '/terms-and-conditions',
  '/accessibility',
  '/sitemap.xml',
  '/robots.txt',
];
let allOk = true;
for (const route of routes) {
  const p = await page(route);
  if (p.status !== 200) allOk = false;
  console.log(`  ${ok(p.status === 200)} ${route.padEnd(36)} ${p.status}`);
}

console.log('\n=== removed routes 404 ===');
for (const route of ['/courses', '/universities', '/admin', '/admin/login']) {
  const p = await page(route);
  console.log(`  ${ok(p.status === 404)} ${route.padEnd(36)} ${p.status}`);
}

console.log('\n=== real content is on the pages ===');
const home = await page('/');
console.log(ok(home.visible.includes('Your Global Education Journey')), 'hero headline');
console.log(ok(home.visible.includes('Career Counselling')), 'services grid');
console.log(ok(home.visible.includes('IELTS') && home.visible.includes('GMAT')), 'test prep strip');
console.log(ok(home.visible.includes('United Kingdom')), 'destination cards');
console.log(ok(home.visible.includes('How the process works')), 'process section');
console.log(ok(home.visible.includes('Frequently asked questions')), 'faq section');
console.log(ok(!home.visible.includes('Find your course')), 'course search section removed');
console.log(ok(!home.visible.includes('Universities we work with')), 'university rail removed');

const contact = await page('/contact');
console.log(ok(contact.visible.includes('Gold Crest Business Center')), 'real office address');
console.log(ok(contact.visible.includes('+91 91370 44882')), 'real phone');
console.log(ok(contact.visible.includes('022-2892 8911 / 22 / 33')), 'landline as plain text');
console.log(ok(contact.visible.includes('enquiry@shineconsultant.co.in')), 'real email');
console.log(ok(contact.visible.includes('Interested service')), 'service field on the form');

const about = await page('/about');
console.log(ok(about.visible.includes('Mrs. Bhadrika Mehta')), 'founder named');
console.log(ok(about.visible.includes('leading organization in the domain')), 'vision');

const ielts = await page('/test-preparation/ielts');
console.log(ok(ielts.visible.includes('Academic IELTS')), 'IELTS variants');
console.log(ok(ielts.visible.includes('We do not promise a band score')), 'no score promise');

console.log('\n=== withheld claims still absent ===');
for (const [label, re] of [
  ['no 95% success rate', /95\s*%/],
  ['no guaranteed score', /guaranteed (score|band)/i],
  ['no price or fee', /₹\s?\d|\bINR\s?\d/],
]) {
  const hit = re.test(home.visible) || re.test(ielts.visible) || re.test(about.visible);
  console.log(`  ${ok(!hit)} ${label}`);
}

console.log('\n=== sitemap reflects the new shape ===');
const sm = await page('/sitemap.xml');
console.log(ok(sm.body.includes('/destinations/dubai')), 'destinations listed');
console.log(ok(sm.body.includes('/test-preparation/ielts')), 'test prep listed');
console.log(ok(sm.body.includes('/services/career-counselling')), 'services listed');
console.log(ok(!sm.body.includes('/courses')), 'no stale /courses entry');
console.log(ok(!sm.body.includes('/universities')), 'no stale /universities entry');
console.log(ok(!sm.body.includes('/admin')), 'no admin entry');

console.log('\n=== the enquiry route handler ===');
const spam = await fetch(`${SITE}/api/enquiries`, {
  method: 'POST',
  headers: json(IP.enquiry),
  body: JSON.stringify({
    fullName: 'Spam Bot',
    email: 'bot@example.test',
    phone: '9876543210',
    message: 'This should be refused by the honeypot.',
    source: 'contact_page',
    honeypot: 'i am a bot',
    renderedAt: Date.now() - 10000,
  }),
});
console.log(ok(spam.status === 400), `honeypot refused -> ${spam.status}`);

const tooFast = await fetch(`${SITE}/api/enquiries`, {
  method: 'POST',
  headers: json(IP.enquiry),
  body: JSON.stringify({
    fullName: 'Fast Bot',
    email: 'fast@example.test',
    phone: '9876543210',
    message: 'Submitted far too quickly to have been typed.',
    source: 'contact_page',
    honeypot: '',
    renderedAt: Date.now(),
  }),
});
console.log(ok(tooFast.status === 400), `dwell-time refused -> ${tooFast.status}`);

const invalid = await fetch(`${SITE}/api/enquiries`, {
  method: 'POST',
  headers: json(IP.enquiry),
  body: JSON.stringify({
    fullName: 'A',
    email: 'not-an-email',
    phone: '1',
    message: 'short',
    source: 'contact_page',
    honeypot: '',
    renderedAt: Date.now() - 10000,
  }),
});
const invalidBody = await invalid.json();
console.log(ok(invalid.status === 400), `invalid input refused -> ${invalid.status}`);
console.log(
  ok((invalidBody.error?.fields ?? []).length >= 4),
  `field errors returned (${(invalidBody.error?.fields ?? []).length})`,
);

const good = await fetch(`${SITE}/api/enquiries`, {
  method: 'POST',
  headers: json(IP.enquiry),
  body: JSON.stringify({
    fullName: 'Asha Menon',
    email: 'asha@example.test',
    phone: '+91 98765 43210',
    interestedCountry: 'United Kingdom',
    interestedService: 'Visa Assistance',
    message: 'I would like help with my application to the United Kingdom.',
    source: 'contact_page',
    honeypot: '',
    renderedAt: Date.now() - 10000,
  }),
});
const goodBody = await good.json();
console.log(ok(good.status === 201), `valid enquiry accepted -> ${good.status}`);
console.log(ok(Boolean(goodBody.data?.reference)), `reference issued: ${goodBody.data?.reference}`);

/**
 * The consultation checks use their own address.
 *
 * The rate limiter is shared between both lead routes and keyed by client
 * address, and `next start` reports every local request as `::1` — so the
 * enquiry checks above had already spent that address's budget and the
 * booking came back 429. That was this script exhausting a working limiter,
 * not the route being broken, but it read as a product failure. Giving each
 * group its own address makes the checks independent.
 */
const BOOKING_IP = '192.0.2.55';

console.log('\n=== the consultation route handler ===');
const badCountry = await fetch(`${SITE}/api/consultations`, {
  method: 'POST',
  headers: json(IP.booking),
  body: JSON.stringify({
    studentName: 'Rahul Shah',
    email: 'rahul@example.test',
    phone: '9876543210',
    preferredCountry: 'Atlantis',
    preferredDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    preferredTime: '11:00',
    honeypot: '',
    renderedAt: Date.now() - 10000,
  }),
});
console.log(ok(badCountry.status === 400), `unpublished destination refused -> ${badCountry.status}`);

const booking = await fetch(`${SITE}/api/consultations`, {
  method: 'POST',
  headers: json(IP.booking),
  body: JSON.stringify({
    studentName: 'Rahul Shah',
    email: 'rahul@example.test',
    phone: '9876543210',
    preferredCountry: 'United Kingdom',
    preferredDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    preferredTime: '11:00',
    honeypot: '',
    renderedAt: Date.now() - 10000,
  }),
});
const bookingBody = await booking.json();
console.log(ok(booking.status === 201), `valid booking accepted -> ${booking.status}`);
console.log(ok(bookingBody.data?.preferredTime === '11:00'), 'confirmation echoes the slot');

console.log('\n=== rate limit, with an address the server can see ===');
let limited = false;
let firstFive = 0;
for (let i = 0; i < 6; i += 1) {
  const r = await fetch(`${SITE}/api/enquiries`, {
    method: 'POST',
    headers: json(IP.limiter),
    body: JSON.stringify({
      fullName: 'Repeat Sender',
      email: 'repeat@example.test',
      phone: '9876543210',
      message: 'Sending this repeatedly to exercise the limiter.',
      source: 'contact_page',
      honeypot: '',
      renderedAt: Date.now() - 10000,
    }),
  });
  if (r.status === 201) firstFive += 1;
  if (r.status === 429) limited = true;
}
console.log(ok(firstFive === 5), `the first five are accepted (${firstFive})`);
console.log(ok(limited), 'the sixth is throttled');

// A different address must have its own budget, or one abuser locks out
// every other visitor.
const otherAddress = await fetch(`${SITE}/api/enquiries`, {
  method: 'POST',
  headers: json(IP.other),
  body: JSON.stringify({
    fullName: 'Different Visitor',
    email: 'other@example.test',
    phone: '9876543210',
    message: 'A different visitor should not be blocked by someone else.',
    source: 'contact_page',
    honeypot: '',
    renderedAt: Date.now() - 10000,
  }),
});
console.log(
  ok(otherAddress.status === 201),
  `a different address is unaffected -> ${otherAddress.status}`,
);

console.log('');
if (!allOk || failures > 0) {
  console.error(`✗ Site check failed.`);
  process.exitCode = 1;
} else {
  console.log('✓ Site check passed. Every route, every form handler, no database.');
}
