import { notFound } from 'next/navigation';
import {
  GraduationCap,
  Briefcase,
  Compass,
  Users,
} from 'lucide-react';
import { getDestination, getDestinations, getSettings } from '../../../../lib/content';
import { getDestinationPageData } from '../../../../lib/destination-data';
import {
  breadcrumbJsonLd,
  faqJsonLd,
  metadataForRecord,
} from '../../../../lib/seo';
import { JsonLd } from '../../../../components/seo/JsonLd';
import { truncate } from '../../../../lib/format';

/* Signature Hero from Home Page */
import { EditorialHero } from '../../../../components/sections/EditorialHero';

/* Premium destination components matching reference design */
import { WhyChooseSection } from '../../../../components/sections/destination/WhyChooseSection';
import { PopularCoursesSection } from '../../../../components/sections/destination/PopularCoursesSection';
import { TopUniversitiesSection } from '../../../../components/sections/destination/TopUniversitiesSection';
import { RequirementsVisaSection } from '../../../../components/sections/destination/RequirementsVisaSection';
import { ScholarshipsFaqSection } from '../../../../components/sections/destination/ScholarshipsFaqSection';
import { DestinationFinalCta } from '../../../../components/sections/destination/DestinationFinalCta';

export function generateStaticParams() {
  return getDestinations().map((destination) => ({ slug: destination.slug }));
}

function load(slug) {
  const destination = getDestination(slug);
  if (!destination) return null;

  const pageData = getDestinationPageData(slug);
  const faqs = pageData?.faqs?.length > 0
    ? pageData.faqs
    : (destination.faqs ?? []);

  return { destination, pageData, faqs };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const payload = load(slug);
  if (!payload) return { title: 'Destination not found' };

  const { destination, pageData } = payload;
  return metadataForRecord(destination, {
    path: `/destinations/${destination.slug}`,
    fallbackTitle: `Study in ${destination.name}`,
    fallbackDescription:
      pageData?.heroIntro ||
      destination.shortIntroduction ||
      truncate(destination.content?.countryIntroduction ?? '', 155) ||
      `Discover study opportunities in ${destination.name}. Expert guidance from Shine Consultant.`,
    image: destination.heroImage ?? destination.cardImage ?? `/destinations/${destination.slug}.jpg`,
    type: 'article',
  });
}

/**
 * Destination Detail Page (e.g. /destinations/usa).
 *
 * Designed to strictly match user specifications:
 * 1. Signature EditorialHero layout matching Home page (per user explicit instruction)
 * 2. 4-Pillar quick strip directly below hero
 * 3. Why Choose Section (asymmetric collegiate campus photo + floating card + 6 feature points)
 * 4. Popular Courses Section (horizontal scrolling cards with imagery, icons, descriptions)
 * 5. Top Universities Section with TrailCard (without Explore button, prominent white name, 100% contrast)
 * 6. Admission Requirements & Visa Support (01-07 numbered list, passport photo, visa checklist)
 * 7. Scholarships & FAQs Section (scholarship student photo, checklist, interactive FAQ accordion)
 * 8. Final Dark Navy CTA Banner (brandmark, conversion headline, and CTAs)
 */
export default async function DestinationPage({ params }) {
  const { slug } = await params;
  const payload = load(slug);
  if (!payload) notFound();

  const { destination, pageData, faqs = [] } = payload;
  const settings = getSettings();
  const socialLinks = settings?.socialLinks ?? [];

  const trail = [
    { label: 'Home', href: '/' },
    { label: 'Destinations', href: '/destinations' },
    { label: destination.name, href: `/destinations/${destination.slug}` },
  ];

  const heroContent = {
    eyebrow: `STUDY DESTINATION — ${destination.name.toUpperCase()}`,
    headline: `Study in the ${destination.name} — From Mumbai.`,
    supportingLine:
      pageData?.heroIntro ||
      `Discover world-class universities, innovative learning environments and opportunities to build your international career. Expert guidance from Borivali West.`,
    primaryCtaLabel: 'Book Free Consultation',
    primaryCtaHref: '/book-consultation',
    secondaryCtaLabel: 'Explore Universities',
    secondaryCtaHref: '#universities',
  };

  const heroStats = [
    {
      value: '4,000+',
      label: 'accredited institutions',
      srLabel: 'Over 4,000 accredited universities',
    },
    {
      value: 'Top 100',
      label: 'global universities',
      srLabel: 'Top global university ranking',
    },
    {
      value: '3-Year',
      label: 'post-study work option',
      srLabel: 'Post-study work authorization',
      featureLabel: 'Work Rights',
    },
  ];

  const quickPillars = [
    {
      icon: GraduationCap,
      title: 'World-Class Universities',
      subtitle: 'Top-ranked global research',
    },
    {
      icon: Briefcase,
      title: 'Diverse Career Opportunities',
      subtitle: 'Post-study work & global industry',
    },
    {
      icon: Compass,
      title: 'Flexible Academic Pathways',
      subtitle: 'Comprehensive degree specialisations',
    },
    {
      icon: Users,
      title: 'Global Student Community',
      subtitle: 'Diverse international scholar network',
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs)} />}

      {/* 1 — Hero: Signature EditorialHero matching the Home Page */}
      <EditorialHero
        content={heroContent}
        stats={heroStats}
        socialLinks={socialLinks}
        image={{
          src: `/destinations/${destination.slug}.jpg`,
          fallbackUrl: `/destinations/${destination.slug}.jpg`,
          alt: `Study in ${destination.name} — University Campus`,
          width: 1920,
          height: 1080,
        }}
        brandTagline="Honest, unbiased & professional guidance — from Borivali West, Mumbai"
      />

      {/* 2 — Four Pillars Quick Strip matching home/about style */}
      <div className="border-y border-navy/10 bg-[#FAF8F3] py-6 sm:py-8">
        <div className="shell">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {quickPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-4 lg:px-6 ${
                    idx < 3 ? 'lg:border-r lg:border-navy/10' : ''
                  }`}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E5F2EC] text-navy">
                    <IconComp className="h-6 w-6 stroke-[1.8]" />
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold text-navy">{pillar.title}</p>
                    <p className="text-caption text-charcoal/70">{pillar.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3 — Why Choose Section (Asymmetric campus image + 6 points) */}
      <WhyChooseSection
        destination={destination}
        overview={pageData?.overview}
      />

      {/* 4 — Popular Courses Section (Horizontal scrollable track) */}
      <PopularCoursesSection
        courses={pageData?.popularCourses || pageData?.courses}
      />

      {/* 5 — Top Universities Section (6 verified institutions rendered with TrailCard) */}
      <TopUniversitiesSection
        destination={destination}
        universities={pageData?.topUniversities || pageData?.universities}
      />

      {/* 6 — Admission Requirements & Visa Support Section */}
      <RequirementsVisaSection
        destination={destination}
        admissionRequirements={pageData?.admissionRequirements}
        visaAssistance={pageData?.visaAssistance}
      />

      {/* 7 — Scholarships & FAQ Accordion Section */}
      <ScholarshipsFaqSection
        destination={destination}
        scholarships={pageData?.scholarships}
        faqs={faqs}
      />

      {/* 8 — Final Dark Navy CTA Banner */}
      <DestinationFinalCta destination={destination} />
    </>
  );
}
