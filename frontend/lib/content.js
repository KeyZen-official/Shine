import destinationsFile from '../content/destinations.json';
import reviewsFile from '../content/reviews.json';
import servicesFile from '../content/services.json';
import testPreparationFile from '../content/test-preparation.json';
import faqsFile from '../content/faqs.json';
import companyFile from '../content/company.json';
import contactFile from '../content/contact.json';
import homeFile from '../content/home.json';
import settingsFile from '../content/settings.json';

/**
 * The site's content layer.
 *
 * This replaced an Express API and a MongoDB database. The site sells
 * nothing, has no accounts and no payments, so the only thing that needed a
 * server was handling the enquiry forms — which is now one Next.js route
 * handler. Everything a visitor reads is authored in `content/*.json`,
 * imported at build time and inlined into the static pages.
 *
 * What that bought: one deployable app instead of two, no database to run
 * or back up, and no administrator login — which was the largest security
 * surface on a site that otherwise holds nothing worth attacking.
 *
 * What it cost: editing content is a file change and a redeploy rather than
 * a form in a back office. For visa guidance in particular that is a real
 * operational cost, and the reason `lastReviewed` exists on every
 * destination.
 *
 * Two rules carried over from the database version, because they are what
 * stop the site making things up:
 *
 *  1. **An unfinished record is invisible.** `status: 'draft'` keeps a
 *     record out of every listing, the navigation and the sitemap. Nothing
 *     half-written reaches a visitor.
 *  2. **An empty field omits its section, heading included.** A destination
 *     with no visa guidance renders a shorter page, not a page with an
 *     empty "Student visa guidance" heading.
 *
 * Everything here is synchronous and runs at build time. There is no
 * fetching, so there is no loading state, no error state and no cache to go
 * stale — which removes the whole class of problem where a rebuild served
 * the previous content out of `.next/cache`.
 */

const isPublished = (record) => (record.status ?? 'published') === 'published';

const byDisplayOrder = (a, b) =>
  (a.displayOrder ?? 0) - (b.displayOrder ?? 0) || String(a.name ?? '').localeCompare(String(b.name ?? ''));

/** Trims strings and drops empty ones, so `''` and `'   '` behave alike. */
const present = (value) => {
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return value !== null && value !== undefined;
};

/**
 * Strips empty fields from a record's `content` block.
 *
 * Pages test `content.visaGuidance` to decide whether to render that
 * section. An empty string is falsy, so this is not strictly required — but
 * doing it here means a page never has to care whether a field is absent,
 * empty, or whitespace, and the three cannot diverge.
 */
function compactContent(content = {}) {
  return Object.fromEntries(Object.entries(content).filter(([, value]) => present(value)));
}

/* ------------------------------------------------------------------ */
/* Destinations                                                        */
/* ------------------------------------------------------------------ */

export function getDestinations({ includeDrafts = false } = {}) {
  return destinationsFile
    .filter((d) => includeDrafts || isPublished(d))
    .sort(byDisplayOrder)
    .map((d) => ({ ...d, content: compactContent(d.content) }));
}

export function getDestination(slug) {
  const record = destinationsFile.find((d) => d.slug === slug);
  if (!record || !isPublished(record)) return null;
  return {
    ...record,
    content: compactContent(record.content),
    faqs: (record.faqs ?? []).filter(isPublished),
  };
}

/** Names and slugs only, for navigation and form selects. */
export function getDestinationOptions() {
  return getDestinations().map((d) => ({ name: d.name, slug: d.slug }));
}

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export function getServices() {
  return servicesFile.filter(isPublished).sort(byDisplayOrder);
}

export function getService(slug) {
  const record = servicesFile.find((s) => s.slug === slug);
  if (!record || !isPublished(record)) return null;
  return { ...record, faqs: (record.faqs ?? []).filter(isPublished) };
}

export function getServiceOptions() {
  return getServices().map((s) => ({ name: s.name, slug: s.slug }));
}

/* ------------------------------------------------------------------ */
/* Test preparation                                                    */
/* ------------------------------------------------------------------ */

export function getTestPreparation() {
  return testPreparationFile.filter(isPublished).sort(byDisplayOrder);
}

export function getTestPreparationProgramme(slug) {
  const record = testPreparationFile.find((t) => t.slug === slug);
  if (!record || !isPublished(record)) return null;
  return { ...record, faqs: (record.faqs ?? []).filter(isPublished) };
}

export function getTestPreparationOptions() {
  return getTestPreparation().map((t) => ({ name: t.name, slug: t.slug }));
}

/* ------------------------------------------------------------------ */
/* Singletons                                                          */
/* ------------------------------------------------------------------ */

export function getSiteFaqs() {
  return faqsFile.filter(isPublished).sort(byDisplayOrder);
}

/**
 * Google reviews, quoted as written.
 *
 * These live here rather than inside the carousel component, and the
 * reason is a real bug rather than tidiness. The carousel is a
 * `'use client'` module, and it originally exported the review array
 * itself. A server component that imports a plain data export across the
 * client boundary does not receive the array — it receives a client
 * reference — so `reviews.length` was `undefined`, the section's own
 * "nothing to show" guard fired, and the whole block vanished from the
 * page with no error at build time or in the browser.
 *
 * Content belongs in `content/*.json` on this project anyway. Keeping it
 * here means the server reads real data and passes it across the boundary
 * as props, which is the direction that works.
 *
 * `status: "draft"` hides one review without deleting it.
 */
export function getReviews() {
  return reviewsFile.filter(isPublished);
}

export function getCompany() {
  return companyFile;
}

export function getContact() {
  return contactFile;
}

export function getHomeContent() {
  return homeFile;
}

export function getSettings() {
  return settingsFile;
}

/*
 * `getPrimaryOffice` was removed: callers read the contact record directly.
 *
 * There used to be a separate "offices" collection, on the grounds that a
 * consultancy might list more than one. There is one office. If a second
 * opens, `contact.json` grows a list and the readers take the primary — a
 * smaller change than maintaining a collection against the possibility.
 */

/**
 * Counts of published content, for the figures on the about page.
 *
 * Counted rather than written down. The figures the hero and the about
 * page show are derived from the content files, so they cannot claim more
 * destinations or services than actually exist — and a section with
 * nothing to count omits itself rather than showing a zero.
 */
export function getContentCounts() {
  return {
    destinations: getDestinations().length,
    services: getServices().length,
    testPreparation: getTestPreparation().length,
  };
}
