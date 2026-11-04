import { siteConfig } from '../lib/config';
import { getDestinations, getServices, getTestPreparation } from '../lib/content';

/**
 * Built from the content files at build time.
 *
 * It used to fetch a generated list from the API, with a hardcoded fallback
 * list in case that was unreachable — a fallback which had gone stale and
 * still advertised `/universities` and `/courses` after both were removed.
 * Reading the content directly means there is no request to fail, so there
 * is no fallback to drift.
 *
 * A record marked `draft` is excluded, because `getDestinations` and the
 * others only return published ones. `/admin` and `/api` are absent by
 * construction: nothing here enumerates routes, it enumerates content.
 */
export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { path: '/', changeFrequency: 'monthly', priority: 1.0 },
    { path: '/destinations', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/test-preparation', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/book-consultation', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.2 },
    { path: '/terms-and-conditions', changeFrequency: 'yearly', priority: 0.2 },
    { path: '/accessibility', changeFrequency: 'yearly', priority: 0.2 },
  ];

  const records = [
    ...getDestinations().map((d) => ({
      path: `/destinations/${d.slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
      lastModified: d.lastReviewed ? new Date(d.lastReviewed) : now,
    })),
    ...getTestPreparation().map((t) => ({
      path: `/test-preparation/${t.slug}`,
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
    ...getServices().map((s) => ({
      path: `/services/${s.slug}`,
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
  ];

  return [...staticRoutes, ...records].map((entry) => ({
    url: `${siteConfig.siteUrl}${entry.path === '/' ? '' : entry.path}`,
    lastModified: entry.lastModified ?? now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
