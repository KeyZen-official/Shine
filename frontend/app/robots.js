import { siteConfig } from '../lib/config';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The back office and the API are never indexable. The API also
        // sends X-Robots-Tag: noindex, so this is belt and braces.
        disallow: ['/admin', '/admin/', '/api/'],
      },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host: siteConfig.siteUrl,
  };
}
