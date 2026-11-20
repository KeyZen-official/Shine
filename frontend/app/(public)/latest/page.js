import {
  getUpdates,
  getUpdateCategories,
  getDestinations,
  getServices,
  getSettings,
  getHomeContent,
} from '../../../lib/content';
import { buildMetadata, breadcrumbJsonLd } from '../../../lib/seo';
import { EditorialHero } from '../../../components/sections/EditorialHero';
import { pickImage } from '../../../lib/media';
import { CtaStrip } from '../../../components/sections/FinalCta';
import { JsonLd } from '../../../components/seo/JsonLd';
import { LatestClient } from './LatestClient';

export const metadata = buildMetadata({
  title: 'Latest Updates & Educational Insights | Shine Consultant',
  description:
    'Explore the latest study abroad news, international student visa guidelines, university admissions deadlines, and announcements from Shine Consultant.',
  path: '/latest',
});

export default function LatestPage() {
  const updates = getUpdates();
  const categories = getUpdateCategories();
  const destinations = getDestinations();
  const services = getServices();
  const settings = getSettings();
  const home = getHomeContent();
  const sections = home ?? {};

  const stats = [
    destinations.length > 0
      ? {
          value: '10+',
          label: 'Destinations',
          srLabel: 'Study destinations',
        }
      : null,
    services.length > 0
      ? {
          value: 6,
          label: 'Services',
          srLabel: 'Services',
        }
      : null,
  ].filter(Boolean);

  const heroImage = pickImage(sections.hero?.backgroundImage, {
    fallbackKey: 'hero',
    alt: 'A smiling student holding notebooks, with a university campus behind her and a plane tracing an arc through a field of stars',
  });

  const socialLinks = (settings?.socialLinks ?? [])
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Latest Updates', href: '/latest' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      {/* Signature EditorialHero matching Home Page */}
      <EditorialHero
        content={sections.hero}
        stats={stats}
        socialLinks={socialLinks}
        image={heroImage}
      />

      <LatestClient initialUpdates={updates} categories={categories} />

      <CtaStrip
        title="Need personalized guidance for your study abroad plans?"
        description="Our senior counsellors in Mumbai provide unbiased, end-to-end guidance from university shortlisting to visa documentation."
        primaryLabel="Book Free Consultation"
        primaryHref="/book-consultation"
        secondaryLabel="Explore Study Destinations"
        secondaryHref="/destinations"
      />
    </>
  );
}
