#!/usr/bin/env node
/**
 * Asserts that the rendered HTML actually contains the database content it
 * should, and does not contain what it should not.
 *
 * A 200 response proves a route exists; it does not prove the page shows
 * real data, hides unpublished records or withholds an unverified fee.
 * That is what this checks.
 *
 * Requires the API and the site to be running, with the development data
 * created by scripts/smoke-e2e.mjs and scripts/publish-structure.mjs.
 *
 *   node scripts/check-rendered-pages.mjs
 */

const SITE = process.env.SITE ?? 'http://localhost:3000';

const cache = new Map();
let passed = 0;
const failures = [];

/**
 * `body` is the raw response; `visible` has the script elements removed.
 *
 * This distinction matters more than it looks. On the home page 90 KB of a
 * 174 KB response is React's serialised flight payload, which contains
 * every prop passed to every component. A naive `/headline text/.test(body)`
 * therefore passes whether or not the text was ever rendered — it matches
 * the serialised prop. Content assertions run against `visible`; only
 * genuinely document-level checks (metadata, link tags) use `body`.
 */
async function html(path) {
  if (cache.has(path)) return cache.get(path);
  const response = await fetch(`${SITE}${path}`, { headers: { Accept: 'text/html' } });
  const body = await response.text();
  const visible = body
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    // React's server renderer inserts `<!-- -->` between adjacent text and
    // expression nodes, so `Step {n}: ` arrives as `Step <!-- -->1<!-- -->: `.
    // Stripping comments lets a text assertion span an interpolation
    // boundary instead of failing on an invisible separator.
    .replace(/<!--[\s\S]*?-->/g, '');
  cache.set(path, { status: response.status, body, visible, headers: response.headers });
  return cache.get(path);
}

function report(label, condition, detail) {
  if (condition) {
    passed += 1;
    console.log(`  ok    ${label}`);
  } else {
    failures.push(label);
    console.log(`  FAIL  ${label}${detail ? ` — ${detail}` : ''}`);
  }
}

/**
 * `[path, label, pattern, expect = true, scope = 'visible']`
 *
 * `expect: false` asserts the pattern is absent. `scope: 'raw'` asserts
 * against the unmodified response, which is what structured data needs —
 * JSON-LD legitimately lives inside a script element, so the stripped
 * document cannot see it.
 */
const CHECKS = [
  ['/', 'the page title is not doubled by the layout template', /<title>Overseas Education, Migration &amp; Training \| Shine Consultant<\/title>/],
  ['/', 'the hero headline comes from the home content record', /Your Global Education Journey Starts Here/],
  ['/', 'the published destination is rendered', /United Kingdom/],
  /* Asserted as a link, not as a name. This check used to look for the
     string "New Zealand" and broke once a published FAQ answer mentioned
     the country in prose — the draft was not leaking, the assertion was
     just too loose. A card or dropdown entry for a draft destination would
     have to carry its href, so that is what is tested.

     It now names France rather than New Zealand. New Zealand was a draft
     when this was written and is in the published roster of ten, so the
     assertion had started testing that a published destination was absent
     — which would have failed for the right reason eventually and the
     wrong one first. France is the destination that is actually a draft. */
  ['/', 'no link to an unpublished destination is rendered', /href="\/destinations\/france"/, false, 'raw'],
  /* The course, university and testimonial assertions that stood here are
     gone with the records they tested. They asserted fixtures created by an
     end-to-end script against a database that no longer exists, and the
     three home sections they covered were removed because nothing could
     ever populate them. What replaced those sections is asserted below. */
  ['/', 'the services grid renders on the home page', /Career Counselling/],
  ['/', 'the test preparation strip renders on the home page', /IELTS[\s\S]*GMAT/],
  ['/', 'the course search section is gone', /Find your course/, false],
  ['/', 'the university rail is gone', /Universities we work with/, false],
  ['/', 'the testimonial section is gone', /Student success stories/, false],
  ['/', 'the seeded FAQ questions are rendered', /How does overseas education counselling work/],
  ['/', 'the mandated closing headline is rendered', /Your Future Has No Borders/],

  // --- process pillars --------------------------------------------------
  // The supplied component hardcoded five bars labelled "Step 1".."Step 5".
  // All seven real stages, with their titles and descriptions, must survive.
  ['/', 'all seven process stages render', /Career Counselling[\s\S]*Profile Evaluation[\s\S]*Offer &amp; Documentation[\s\S]*Post-Departure/],
  ['/', 'stage descriptions are not dropped for the visual', /Error-free applications prepared and reviewed before submission/],
  ['/', 'no placeholder "Step N" labels survived', />Step 1</, false],
  ['/', 'the pillars are a semantic ordered list', /<ol[^>]*>[\s\S]{0,400}?Career Counselling|Career Counselling[\s\S]{0,400}?<\/li>/],
  ['/', 'each stage number is announced once, not twice', /Step 1: /],
  ['/', 'the vertical sequence is kept below the pillar breakpoint', /xl:hidden/],
  ['/', 'no off-palette blue gradient from the source component', /from-blue-400|via-blue-500|to-blue-600/, false],
  ['/', 'no invalid h-30 utility survived', /\bh-30\b/, false],
  // Seven 168px columns needed 1320px in a 1216px container, so the last
  // stage was clipped and `no-scrollbar` hid the only cue that it scrolled.
  ['/', 'the pillar row no longer scrolls horizontally', /flex items-stretch gap-4/],
  ['/', 'the per-column minimum that caused the clipping is gone', /minWidth:"168px"|min-width:168px/, false],
  ['/', 'the hidden scrollbar is gone from the pillar row', /no-scrollbar flex items-stretch/, false],
  ['/', 'long words wrap rather than widening a column', /break-words/],
  ['/', 'Organization structured data is emitted', /EducationalOrganization/, true, 'raw'],
  ['/', 'WebSite structured data carries a SearchAction', /SearchAction/, true, 'raw'],
  ['/', 'FAQPage structured data is emitted', /FAQPage/, true, 'raw'],
  ['/', 'the skip link is present', /Skip to main content/],
  ['/', 'the financial-services denial is present', /do not provide, arrange or broker/],
  ['/', 'a canonical URL is declared', /rel="canonical"/],
  ['/', 'Open Graph tags are present', /property="og:title"/],
  ['/', 'the Twitter card is declared', /name="twitter:card"/],
  ['/', 'images declare a WebP source set', /type="image\/webp"/],
  ['/', 'images below the fold are lazy-loaded', /loading="lazy"/],

  // --- resizable navbar -----------------------------------------------
  ['/', 'the bar is a header landmark, not an anonymous div', /<header/],
  ['/', 'the primary navigation landmark is labelled', /aria-label="Primary"/],
  /* The bar renders `short` labels and the dropdown triggers carry the
     full label as their accessible name, so both forms appear in the
     markup. "Universities" is deliberately no longer among them — it lost
     its slot to Test Preparation and lives in the footer. */
  ['/', 'every top-level item renders', /Study Destinations[\s\S]*Test Preparation[\s\S]*Services/],
  ['/', 'the test preparation item is in the bar', /Test Prep/],
  ['/', 'no link points at the removed university directory', /href="\/universities"/, false, 'raw'],
  ['/', 'no link points at the removed course directory', /href="\/courses/, false, 'raw'],
  ['/', 'dropdown triggers are buttons carrying aria-expanded', /aria-expanded="false"[\s\S]*Study Destinations menu|Study Destinations menu[\s\S]*aria-expanded/],
  /* Three dropdown groups now, not two: destinations, test preparation
     and services. A group whose source has nothing published drops its
     chevron rather than opening an empty panel, so each of these also
     proves its source is populated. */
  ['/', 'the services dropdown exposes a trigger', /Services menu/],
  ['/', 'the test preparation dropdown exposes a trigger', /Test Preparation menu/],
  ['/', 'the destinations dropdown is populated from published records', /href="\/destinations\/malaysia"/, true, 'raw'],
  ['/', 'the test preparation dropdown is populated', /href="\/test-preparation\/ielts"/, true, 'raw'],
  ['/', 'the mobile toggle is a button with an accessible name', /Open menu<\/span>/],
  ['/', 'the active item is marked for assistive technology', /aria-current="page"/],
  /* The secondary action was "Explore Courses" and now points at the
     destinations index, because the course directory was removed. Both
     actions still exist, which is what this guards — the primary must not
     end up alone in the bar. */
  ['/', 'the bar keeps both calls to action', /Book Free Consultation[\s\S]*Study Destinations|Study Destinations[\s\S]*Book Free Consultation/],
  // Nothing from the pasted source should have survived.
  ['/', 'no placeholder brand name from the source component', /Startup<\/span>/, false],
  ['/', 'no third-party CDN logo from the source component', /cdn\.21st\.dev/, false],
  ['/', 'no dead href="#" logo link', /href="#"/, false],
  ['/', 'the nav list is not an absolute overlay covering the buttons', /absolute inset-0 hidden flex-1/, false],
  ['/', 'no unreachable dark-mode classes were carried over', /dark:bg-neutral-950/, false],
  ['/', 'nav links cannot wrap onto a second line', /whitespace-nowrap/],
  ['/', 'the bar uses short labels so seven items fit', />Destinations</],
  ['/', 'no two-word label is left in the bar', />Contact Us<\/a>/, false],
  ['/', 'the header is opaque at rest, with no translucent strip', /duration-slow ease-standard bg-ivory/],
  ['/', 'the bar takes pointer events while the header does not', /pointer-events-auto/],
  ['/', 'the desktop bar is gated at xl, not lg', /xl:flex/],

  // --- default imagery --------------------------------------------------
  /* These two named the generated navy panel (`hero-1920.webp`) because
     that is what the hero used before a real photograph was supplied. The
     filename changed; the thing worth guarding did not — the hero image
     must come from our own origin, with a raster fallback. The Unsplash
     incident below is why. */
  ['/', 'the hero image is served from our own origin', /src="\/imagery\/|srcSet="\/imagery\/|srcset="\/imagery\//, true, 'raw'],
  ['/', 'the hero image has a raster fallback', /\/imagery\/hero-photo-fallback\.jpg/, true, 'raw'],
  ['/', 'no hero image is loaded from a third-party host', /<img[^>]+src="https?:\/\/(?!localhost)/, false, 'raw'],
  // Every hardcoded Unsplash id in the first version of lib/media.js was
  // invented and returned 404, so every image fell back silently.
  ['/', 'no third-party image host is referenced', /images\.unsplash\.com/, false],
  ['/destinations', 'all ten destinations are listed', /Malaysia[\s\S]*Dubai[\s\S]*Europe/],

  // --- editorial hero -------------------------------------------------
  ['/', 'the hero eyebrow renders', /Overseas education, migration &amp; training/],
  /* The hero's brand tagline defaulted to a hardcoded literal, so
     correcting siteConfig.tagline did not reach it and the old positioning
     survived in the one place nobody looked. */
  ['/', 'the hero tagline comes from siteConfig', /Overseas education, migration consultancy and training/],
  ['/', 'the superseded positioning line is gone from the hero', /International education and admissions guidance/, false],
  ['/', 'the hero notch mask is applied as a clip path', /clip-path:url\(#hero-notch|clipPath/],

  /* --- the supplied hero photograph ----------------------------------
     Built by backend/scripts/build-hero-image.mjs. The source is a
     1.85 MB PNG whose subject stands ~5% from the top of the frame, and
     the notch removes the top 13.85% — so the build pads the canvas to
     2137x854 and the notch clips padding instead of her head. These
     assert the padded file is what ships and the raw source does not. */
  ['/', 'the hero serves the photograph, not the generated navy panel', /hero-photo-1920\.webp/, true, 'raw'],
  ['/', 'the hero offers all four widths', /hero-photo-360\.webp[\s\S]*hero-photo-768\.webp[\s\S]*hero-photo-1024\.webp/, true, 'raw'],
  ['/', 'the hero has a raster fallback for the picture element', /hero-photo-fallback\.jpg/, true, 'raw'],
  ['/', 'the 1.85 MB source PNG is never served', /heroimage\.png|hero-original\.png/, false, 'raw'],
  // The padded height, not the source's 736. If this regresses to the
  // unpadded figure the reserved box stops matching the file and the hero
  // shifts on load — and it would mean the padding was dropped, which is
  // what stops the subject being cut.
  ['/', 'the padded dimensions are declared, so the box is reserved correctly', /width="2137"[\s\S]{0,80}height="854"|height="854"[\s\S]{0,80}width="2137"/, true, 'raw'],
  ['/', 'the hero image is eager, being the largest element above the fold', /fetchPriority="high"|fetchpriority="high"/, true, 'raw'],
  ['/', 'the hero describes the actual photograph', /smiling student holding notebooks/, true, 'raw'],
  ['/', 'the stale alt text written for the generated panel is gone', /Students walking through a university campus/, false, 'raw'],
  // 100vw would have pulled the 768px variant onto a 390px phone.
  ['/', 'the hero sizes attribute matches the shell, not the viewport', /calc\(100vw - 2rem\)/, true, 'raw'],
  ['/', 'the hero supporting line splits into a second paragraph', /Honest, unbiased and professional guidance for people looking to broaden/],
  /* No real social accounts have been supplied, so the honest state is an
     omitted strip rather than icons linking to a platform home page. This
     used to assert `instagram.com` was present, which only passed because
     an optional dev script had seeded placeholder URLs — so the suite was
     depending on placeholder content to go green. Set the real accounts in
     Site settings and flip this to assert they render. */
  ['/', 'the hero social strip omits itself when no accounts are configured', /aria-label="Follow us|instagram\.com/, false, 'raw'],
  ['/', 'the hero brand block renders', /Ready to find the course that fits your record/],

  // --- supplied logo artwork ------------------------------------------
  ['/', 'the navbar renders the compact lockup', /\/brand\/logo-compact-240\.(webp|png)/],
  ['/', 'the logo offers a WebP source with a PNG fallback', /type="image\/webp"[\s\S]*logo-compact/],
  ['/', 'the logo declares 1x and 2x densities', /logo-compact-120\.webp 1x, \/brand\/logo-compact-240\.webp 2x/],
  ['/', 'the logo reserves its box to avoid layout shift', /logo-compact[\s\S]*?width="240"[\s\S]*?height="112"/],
  ['/', 'the logo carries the brand name as its accessible name', /alt="Shine Consultant"/],
  ['/', 'the logo is eager-loaded, being above the fold', /logo-compact[\s\S]*?loading="eager"|fetchpriority="high"/i],
  ['/', 'the footer uses the full lockup including the tagline', /\/brand\/logo-lockup-400\.(webp|png)/],
  ['/', 'the half-megabyte source artwork is never served', /a_clean_transparent_png_logo/, false],
  ['/', 'no text wordmark is left duplicating the image logo', /<span class="text-accent">Shine<\/span>/, false],
  ['/', 'the hero keeps both mandated calls to action', /Explore Study Destinations/],
  ['/', 'hero stats carry screen-reader labels for their figures', /Study destinations/],
  // The ported component's hard-coded figures must not have survived.
  ['/', 'no invented years-of-experience figure', /10\+\s*<\/|10\+ *years/, false],
  ['/', 'no invented word count', /3 million/, false],
  ['/', 'no invented brand count', /100\+/, false],
  ['/', 'no invented engagement statistic', /higher engagement/, false],
  ['/', 'no leftover placeholder identity from the source component', /SANGVI|Copywriter|naymur/i, false],
  ['/', 'no third-party CDN assets from the source component', /cdn\.21st\.dev/, false],

  /* ---------------------------------------------------------------------
     Eighteen assertions stood here and have been removed, not relaxed.
     They covered course detail pages, the university directory, the course
     filter and a destination guide filled in by an end-to-end script —
     every one of them against records in a database that no longer exists.
     Keeping them as skipped or loosened checks would leave a suite that
     looks like it is testing more than it is.

     What they protected that still matters is asserted elsewhere: that an
     unverified figure never reaches a page is now structural, because
     there is no fee field anywhere in the content files to hold one.
     --------------------------------------------------------------------- */

  /* An empty content field must omit its section and its heading. Every
     destination guide is currently empty, so this is the live case rather
     than an edge one — the page should be a masthead, a section nav and a
     working enquiry form, with no empty headings between them. */
  ['/destinations/uk', 'an empty guide omits its section headings', /English language requirements/, false],
  ['/destinations/uk', 'an empty guide omits the visa heading too', /Student visa guidance/, false],
  ['/destinations/uk', 'an empty guide still offers the enquiry form', /Interested service/],
  ['/destinations/uk', 'an empty guide still renders its masthead', /Studying in United Kingdom/],
  /* No review date is shown until someone records one. A date here would
     claim a check that has not happened. */
  ['/destinations/uk', 'no review date is claimed before a review', /last reviewed/i, false],

  /* --- The company's own details, from the seeded company profile -----
     These replace an earlier set that asserted the *absence* of contact
     details, written when no office record existed. Those assertions kept
     passing after the real office was seeded, because the build had
     replayed stale API responses out of `.next/cache` — so they were
     testing the cache, not the site. Asserting the real values fails
     loudly in that situation instead. */
  ['/contact', 'the real office address is shown', /Gold Crest Business Centre/],
  ['/contact', 'the address names the locality', /Borivali \(West\)/],
  ['/contact', 'the mobile number is shown', /\+91 73038 90969/],
  ['/contact', 'the mobile number is dialable', /href="tel:\+917303890969"/, true, 'raw'],
  ['/contact', 'the landline group is shown', /022-2892 8911 \/ 22 \/ 33/],
  // The landline is printed as a stem with shared extensions, so it is
  // three numbers. Collapsing it into one href would not dial.
  ['/contact', 'the landline is not turned into a tel: link', /tel:022-?2892/, false, 'raw'],
  ['/contact', 'the real email address is shown', /enquiry@shineconsultant\.co\.in/],
  ['/contact', 'the no-details empty state is gone now that an office exists', /contact details are being published/, false],
  ['/contact', 'no WhatsApp link is offered, because availability is unconfirmed', /wa\.me/, false, 'raw'],
  ['/contact', 'the full enquiry form is present', /Current education level/],

  /* --- About page: every claim comes from the company profile --------- */
  ['/about', 'the vision statement renders from the database', /leading organization in the domain of overseas education/],
  ['/about', 'the mission statement renders from the database', /honest, unbiased and professional guidance/],
  ['/about', 'the core values render', /Ethical practices/],
  ['/about', 'all four core values render', /Accountability in services/],
  ['/about', 'the founder is named', /Mrs\. Bhadika Mehta/],
  ['/about', 'the founder\u2019s role is shown', /Founder and Head/],
  ['/about', 'the team description renders', /unbiased and honest opinions/],
  [
    '/about',
    'the invented brand story an earlier version carried is gone',
    /founded on a simple observation|we started Shine because/i,
    false,
  ],
  ['/about', 'no map embed appears on any page but contact', /google\.com\/maps\/embed/, false],

  /* --- Claims the profile supplied but which are withheld ------------- */
  ['/about', 'no unverified visa success rate is published', /95\s*%|95 per cent/, false],
  ['/about', 'no unverified student volume is published', /thousands of (students|individuals)/i, false],
  ['/', 'no unverified visa success rate reaches the home page', /95\s*%|95 per cent/, false],
  ['/services/visa-assistance', 'the visa page claims no success rate', /95\s*%/, false],
  ['/services/visa-assistance', 'the visa page disclaims guaranteed outcomes', /do not guarantee outcomes/],

  /* --- The eleven real services -------------------------------------- */
  ['/services', 'the first service is listed', /Career Counselling/],
  ['/services', 'test preparation is listed', /Test Preparation/],
  ['/services', 'corporate training is listed', /Corporate Training/],
  ['/services', 'migration counselling is listed', /Migration Counselling/],
  ['/services', 'institutional services is listed', /Institutional Services/],
  [
    '/services',
    'services invented before the company profile arrived are gone',
    /Pre-Departure Guidance|Profile Evaluation|Course Selection|Documentation Assistance/,
    false,
  ],
  ['/services/career-counselling', 'the service summary is the profile\u2019s own wording', /depending on their past academic records/],
  ['/services/career-counselling', 'the service process stepper renders', /Agree a direction/],
  ['/book-consultation', 'the booking form offers only published countries', /United Kingdom/],
  ['/accessibility', 'the accessibility statement names its conformance target', /WCAG 2.1 Level AA/],

  ['/terms-and-conditions', 'the terms describe the real business', /overseas education, migration consultancy and training organisation/],
  ['/terms-and-conditions', 'the terms list the real services', /institutional services/],
  ['/terms-and-conditions', 'the terms state nothing is sold through the site', /Nothing is sold, booked or paid for through this website/],
  ['/terms-and-conditions', 'services invented before the company profile are not listed', /profile evaluation|documentation assistance/i, false],
  ['/terms-and-conditions', 'the lending denial is intact', /do not provide, arrange or broker financial lending services/],

  /* --- test preparation ------------------------------------------------
     A new subsystem: five programmes, grouped by family, each with its own
     page. The records carry our own coaching method, which is a fact about
     us; nothing here states a test board's format, duration or scoring,
     because those change and a stale one would be read as current. */
  ['/test-preparation', 'all five programmes are listed', /IELTS[\s\S]*PTE[\s\S]*TOEFL[\s\S]*GRE[\s\S]*GMAT/],
  ['/test-preparation', 'the English family band renders', /English language tests/],
  ['/test-preparation', 'the entrance family band renders', /Entrance and aptitude tests/],
  ['/test-preparation', 'it states that nothing is sold through the site', /Nothing is sold or booked through this website/],
  ['/test-preparation/ielts', 'the acronym expansion comes from the record', /International English Language Testing System/],
  ['/test-preparation/ielts', 'both IELTS forms render', /Academic IELTS[\s\S]*General Training IELTS/],
  ['/test-preparation/ielts', 'all four skills render as modules', /Listening[\s\S]*Reading[\s\S]*Writing[\s\S]*Speaking/],
  ['/test-preparation/ielts', 'the preparation features render', /Mock tests under timed conditions/],
  ['/test-preparation/ielts', 'the page refuses to promise a band', /We do not promise a band score/],
  ['/test-preparation/ielts', 'the inline enquiry form carries the service field', /Interested service/],
  ['/test-preparation/ielts', 'a breadcrumb trail is emitted', /BreadcrumbList/, true, 'raw'],
  ['/test-preparation/gmat', 'GMAT renders its own sections', /Data Insights/],
  // GMAT has no variants recorded, so that section must omit itself
  // entirely rather than render an empty heading.
  ['/test-preparation/gmat', 'an empty variants section omits its heading', /GMAT versions/, false],
  ['/test-preparation/gmat', 'no IELTS content leaks across records', /Academic IELTS/, false],

  /* No score guarantee, pass rate or price anywhere. The model cannot
     store them; these assert nothing reintroduced them as static copy.
     Phrased to allow a denial: the page says "Anyone guaranteeing a band is
     selling you something", which is the opposite of a claim, so the
     pattern looks for the claim shapes rather than the bare word. */
  ['/test-preparation', 'no guaranteed score is claimed', /guaranteed (score|band|result)|score guarantee|assured band/i, false],
  ['/test-preparation', 'no pass rate is claimed', /pass rate|success rate|\b9[0-9]%\s*(success|pass)/i, false],
  ['/test-preparation', 'no fee or batch price appears', /₹\s?\d|\bINR\s?\d|course fee|batch fee/i, false],
  ['/test-preparation/ielts', 'no guaranteed score on the detail page', /guaranteed (score|band)|score guarantee/i, false],
  ['/test-preparation/ielts', 'no fee on the detail page', /₹\s?\d|\bINR\s?\d/i, false],

  /* --- the ten destinations ------------------------------------------- */
  ['/destinations', 'the UK is listed', /United Kingdom/],
  ['/destinations', 'Malaysia is listed', /Malaysia/],
  ['/destinations', 'Dubai is listed', /Dubai/],
  ['/destinations', 'Europe is listed', /Europe/],
  ['/destinations', 'New Zealand is listed', /New Zealand/],
  // Dropped from the roster and left unpublished rather than deleted.
  ['/destinations', 'a destination outside the roster stays invisible', /France/, false],
  /* `destinationType` exists because two of the ten are not countries.
     The badge appears only for those two, so a country page is not
     labelled with a redundant "Country" chip. */
  ['/destinations/dubai', 'Dubai is identified as a city, not a country', /City or emirate/],
  ['/destinations/europe', 'Europe is identified as a region', /Region/],
  ['/destinations/uk', 'a country carries no type badge', /City or emirate|>Region</, false],

  ['/sitemap.xml', 'the sitemap lists the test preparation index', /\/test-preparation</],
  ['/sitemap.xml', 'the sitemap lists a published programme', /\/test-preparation\/ielts/],
  ['/sitemap.xml', 'the sitemap lists the new destinations', /\/destinations\/dubai/],
  ['/sitemap.xml', 'the sitemap omits an unpublished destination', /\/destinations\/france/, false],

  ['/sitemap.xml', 'the sitemap has no stale course entries', /\/courses/, false],
  ['/sitemap.xml', 'the sitemap has no stale university entries', /\/universities/, false],
  ['/sitemap.xml', 'the sitemap omits the draft course', /msc-draft-programme/, false],
  ['/sitemap.xml', 'the sitemap contains no admin URL', /\/admin/, false],
  ['/robots.txt', 'robots.txt disallows the back office', /Disallow: \/admin/],

  /* The back-office assertions are gone because the back office is gone.
     There is no administrator login, no session cookie and no privileged
     route on this site any more, which removes the largest piece of
     attack surface it had. */
];

async function main() {
  console.log(`\nRendered-content check against ${SITE}\n`);

  let currentPath = null;
  for (const [path, label, pattern, expect = true, scope = 'visible'] of CHECKS) {
    if (path !== currentPath) {
      console.log(`\n${path}`);
      currentPath = path;
    }
    const page = await html(path);
    // Content assertions run against the stripped document, so a match
    // proves the content was rendered rather than merely serialised into
    // the flight payload.
    const found = pattern.test(scope === 'raw' ? page.body : page.visible);
    report(label, found === expect, `status ${page.status}`);
  }

  /**
   * The bar only contracts on scroll, which needs a browser to exercise.
   * These assert the mechanism is present and compiled: if a class in the
   * contracted branch were misspelled or purged, Tailwind would drop it
   * silently and the contraction would simply never happen.
   */
  console.log('\nNavbar contraction styles');
  const home = await html('/');
  const cssHref = home.body.match(/href="(\/_next\/static\/css\/[^"]+)"/);
  if (cssHref) {
    const css = await (await fetch(`${SITE}${cssHref[1]}`)).text();

    report(
      'the contraction transitions width, height, radius and transform',
      /transition-property:max-width,height,border-radius/.test(css.replace(/\s/g, '')),
    );
    report('the contracted pill radius compiled', /\.rounded-full\{/.test(css));
    report('the contracted translate compiled', /\.translate-y-3\{/.test(css));
    // Tailwind compiles this as a custom property composed into a single
    // `backdrop-filter`, not as a literal `backdrop-filter: blur(...)`.
    report('the contracted backdrop blur compiled', /\.backdrop-blur-safe\{/.test(css));
    // Safari dropped the prefix only in v18, so iOS 15–17 needs it.
    // Autoprefixer does not add it for this build's resolved targets, so
    // globals.css declares both properties explicitly.
    report(
      'the backdrop filter carries the -webkit- prefix Safari needs',
      /-webkit-backdrop-filter/.test(css),
    );
    report('the contracted height compiled', /\.h-16\{/.test(css));
    report('the resting height compiled', /\.h-20\{/.test(css));

    /**
     * The hero's focal point is an arbitrary-value utility. This project
     * replaces Tailwind's scales rather than extending them, so a utility
     * Tailwind does not recognise is dropped from the stylesheet with no
     * error — which is how 29 spacing utilities once compiled to nothing
     * here. An uncompiled focal point would silently centre the crop and
     * trim the campus away on every phone.
     */
    report(
      'the hero focal point compiled',
      /object-position:35% center|object-position:35%_center/.test(css.replace(/\s*:\s*/g, ':')),
    );
    report('the large-screen focal point reset compiled', /object-position:center/.test(css.replace(/\s*:\s*/g, ':')));
    report(
      'the transition duration is a design token, not an ad-hoc value',
      /transition-duration:\.3s|transition-duration:300ms/.test(css.replace(/\s/g, '')),
    );
  } else {
    report('the stylesheet could be located', false);
  }

  /**
   * Scoped to the Primary navigation landmark.
   *
   * Asserting "universities is not in the bar" against the whole document
   * cannot work: the footer carries a link with byte-identical markup, and
   * it is supposed to. The claim is only meaningful inside the bar, so the
   * bar is what gets searched.
   */
  console.log('\nPrimary navigation contents');
  const primaryNav = home.body.match(/<nav[^>]+aria-label="Primary"[\s\S]*?<\/nav>/);
  if (primaryNav) {
    const bar = primaryNav[0];
    report('the bar links to the destinations index', /href="\/destinations"/.test(bar));
    report('the bar links to test preparation', /href="\/test-preparation"/.test(bar));
    report('the bar links to services', /href="\/services"/.test(bar));
    report(
      'universities is not a top-level bar item',
      !/href="\/universities"/.test(bar),
    );
    // Seven items is the measured ceiling before the bar wraps; an eighth
    // is what the `short` labels and the xl breakpoint were fixing.
    const topLevel = [...bar.matchAll(/data-nav-item|<li\b/g)].length;
    report('the bar carries no more than seven items', topLevel <= 7, `found ${topLevel}`);
  } else {
    report('the Primary navigation landmark could be located', false);
  }

  console.log('\nHeadings and landmarks');
  for (const path of [
    '/',
    '/services',
    '/destinations',
    '/destinations/uk',
    '/destinations/dubai',
    '/about',
    '/contact',
    '/test-preparation',
    '/test-preparation/ielts',
  ]) {
    const page = await html(path);
    const h1Count = (page.body.match(/<h1[\s>]/g) ?? []).length;
    report(`${path} has exactly one level-one heading`, h1Count === 1, `found ${h1Count}`);
  }

  console.log('\nNot-found handling');
  const missing = await html('/this-route-does-not-exist');
  report('an unmatched path responds 404', missing.status === 404, `status ${missing.status}`);
  report('the not-found page links to the destinations index', /\/destinations/.test(missing.body));
  report('the not-found page links to contact', /\/contact/.test(missing.body));

  const missingSlug = await html('/destinations/no-such-country');
  report('an unknown destination slug responds 404', missingSlug.status === 404);

  /**
   * The removed subsystems must 404 rather than redirect or render. They
   * were linked from the navigation and the sitemap for months, so there
   * are live links to them; a 404 is the honest answer.
   */
  for (const path of ['/courses', '/universities', '/admin', '/admin/login']) {
    const gone = await html(path);
    report(`${path} responds 404 now that it is removed`, gone.status === 404, `status ${gone.status}`);
  }

  const missingTest = await html('/test-preparation/no-such-test');
  report('an unknown test preparation slug responds 404', missingTest.status === 404);

  /**
   * Asserted as a status, not as absent text. A destination dropped from
   * the roster stays in the database as a draft, and a draft must answer
   * 404 rather than rendering — otherwise it is reachable by anyone who
   * knows the URL even though it is not linked anywhere.
   */
  const draftDestination = await html('/destinations/france');
  report(
    'a destination outside the roster responds 404 rather than rendering',
    draftDestination.status === 404,
    `status ${draftDestination.status}`,
  );

  console.log('');
  console.log(`${passed} checks passed, ${failures.length} failed.`);
  if (failures.length > 0) {
    console.log('');
    for (const failure of failures) console.log(`  FAILED: ${failure}`);
    process.exit(1);
  }
  console.log('');
}

main().catch((error) => {
  console.error('\nThe check could not run:', error.message);
  console.error('Is the site running on', SITE, '?');
  process.exit(1);
});
