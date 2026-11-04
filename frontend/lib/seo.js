import { siteConfig } from './config';
import { resolveMediaUrl } from './media';
import { truncate } from './format';

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 160;

/**
 * Builds a Next.js metadata object. Every route gets a distinct title
 * within 60 characters, a description within 160, a canonical URL and the
 * full Open Graph set — served in the initial HTML, because Next renders
 * the document on the server.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  noindex = false,
  prev,
  next,
}) {
  const canonical = `${siteConfig.siteUrl}${path === '/' ? '' : path}` || siteConfig.siteUrl;
  const resolvedTitle = truncate(title ?? siteConfig.name, TITLE_MAX);
  const resolvedDescription = truncate(description ?? siteConfig.tagline, DESCRIPTION_MAX);
  const ogImage = resolveMediaUrl(image?.variants?.w1920 ?? image?.fallbackUrl);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical,
      ...(prev || next ? { types: {} } : {}),
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      siteName: siteConfig.name,
      type,
      ...(ogImage
        ? { images: [{ url: ogImage, width: 1200, height: 630, alt: image?.alt ?? resolvedTitle }] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    other: {
      ...(prev ? { 'link:prev': prev } : {}),
      ...(next ? { 'link:next': next } : {}),
    },
  };
}

/** Falls back record SEO → record fields → site defaults, in that order. */
export function metadataForRecord(record, { path, fallbackTitle, fallbackDescription, image, type }) {
  return buildMetadata({
    title: record?.seo?.title || fallbackTitle,
    description: record?.seo?.description || fallbackDescription,
    path,
    image: record?.seo?.ogImage ?? image,
    type,
  });
}

/* ------------------------------------------------------------------ */
/* Structured data                                                     */
/* ------------------------------------------------------------------ */

/**
 * `contact` is a single record now, not an array of offices with one
 * flagged primary. Callers pass `getContact()`.
 */
export function organizationJsonLd(settings, contact = {}) {
  return prune({
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description: settings?.companyIntroduction || undefined,
    telephone: contact.phone || undefined,
    email: contact.email || undefined,
    address: contact.officeAddress
      ? { '@type': 'PostalAddress', streetAddress: contact.officeAddress }
      : undefined,
    sameAs: settings?.socialLinks?.length
      ? settings.socialLinks.map((link) => link.url)
      : undefined,
  });
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    /**
     * Points at the destinations search, which is the only search on the
     * site. It used to point at `/courses?q=`, a route that no longer
     * exists — a `SearchAction` naming a 404 is worse than none, because a
     * crawler may surface it as a sitelinks search box.
     */
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.siteUrl}/destinations?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/* `courseJsonLd` and `universityJsonLd` were removed with the course and
   university pages. The course builder emitted an `Offer` only where a fee
   had been explicitly marked verified; there is no fee field anywhere in
   the content files now, so there is nothing for a price to come from. */

/** Emitted only where at least two published FAQs exist. */
export function faqJsonLd(faqs = []) {
  if (faqs.length < 2) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(trail = []) {
  if (trail.length < 2) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${siteConfig.siteUrl}${item.href}`,
    })),
  };
}

function prune(object) {
  const output = {};
  for (const [key, value] of Object.entries(object)) {
    if (value === undefined || value === null || value === '') continue;
    if (typeof value === 'object' && !Array.isArray(value)) {
      const nested = prune(value);
      // '@type' alone means every real property was empty.
      if (Object.keys(nested).length <= 1 && nested['@type']) continue;
      output[key] = nested;
      continue;
    }
    output[key] = value;
  }
  return output;
}
