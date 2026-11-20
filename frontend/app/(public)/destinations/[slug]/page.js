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
    headline: `Study in the ${destination.name}.`,
    supportingLine:
      pageData?.heroIntro ||
      `Discover world-class universities, innovative learning environments and opportunities to build your international career. Expert guidance from Shine Consultant.`,
    primaryCtaLabel: 'Book Free Consultation',
    primaryCtaHref: '/book-consultation',
    secondaryCtaLabel: 'Explore Universities',
    secondaryCtaHref: '#universities',
  };

  const DESTINATION_HERO_STATS = {
    canada: [
      {
        value: '350+',
        label: 'Institutions',
        srLabel: 'Over 350 accredited institutions',
      },
      {
        value: '150+',
        label: 'Canadian Universities',
        srLabel: 'Over 150 Canadian universities',
      },
      {
        value: '1 to 3 Years',
        label: 'Work Rights (PGWP)',
        srLabel: 'Post-Graduation Work Permit from 1 to 3 years',
      },
    ],
    australia: [
      {
        value: '300+',
        label: 'Institutions',
        srLabel: 'Over 300 institutions',
      },
      {
        value: '42',
        label: 'Australian Universities (Go8)',
        srLabel: '42 Australian universities including Group of Eight',
      },
      {
        value: '2 to 4 Years',
        label: 'PSWP Work Rights',
        srLabel: 'Post-study work permit from 2 up to 4 years',
      },
    ],
    usa: [
      {
        value: '4,000+',
        label: 'Accredited Institutions',
        srLabel: 'Over 4,000 accredited universities',
      },
      {
        value: 'Top 25',
        label: 'Global QS Universities',
        srLabel: 'Top 25 universities in Global QS rankings',
      },
      {
        value: 'Up to 3 Years',
        label: 'OPT Work Rights',
        srLabel: 'Up to 3 years post-study OPT work rights',
      },
    ],
    uk: [
      {
        value: '400+',
        label: 'Universities & Colleges',
        srLabel: 'Over 400 universities and institutions across the UK',
      },
      {
        value: 'Russell Group',
        label: 'World-Leading Research',
        srLabel: 'Russell Group world-leading research universities',
      },
      {
        value: '18 Months',
        label: 'Graduate Route (18 Months PSW)',
        srLabel: '18-month graduate route post-study work visa',
      },
    ],
    germany: [
      {
        value: '400+',
        label: 'Institutions',
        srLabel: 'Over 400 higher education institutions',
      },
      {
        value: 'Tuition-Free',
        label: 'Public Universities',
        srLabel: 'Tuition-free public universities',
      },
      {
        value: '18 Months',
        label: 'Job Seeker Stay-Back',
        srLabel: '18 months post-study stay-back visa',
      },
    ],
    ireland: [
      {
        value: '30+',
        label: 'Institutions',
        srLabel: 'Over 30 world-class institutions',
      },
      {
        value: 'European Tech Hub',
        label: 'Global Headquarters',
        srLabel: 'European tech and pharma headquarters',
      },
      {
        value: '2 Years',
        label: 'Third Level Graduate Scheme',
        srLabel: '2-year post-study work scheme',
      },
    ],
    'new-zealand': [
      {
        value: '8',
        label: 'Universities (Top 3%)',
        srLabel: 'All 8 universities in top 3% globally',
      },
      {
        value: 'High Quality',
        label: 'Standard of Living',
        srLabel: 'High quality of life and safety',
      },
      {
        value: 'Up to 3 Years',
        label: 'Post-Study Work Visa',
        srLabel: 'Up to 3 years post-study work visa',
      },
    ],
    dubai: [
      {
        value: '60+',
        label: 'International Campuses',
        srLabel: 'Over 60 international branch campuses',
      },
      {
        value: 'Tax-Free',
        label: 'Career Growth',
        srLabel: 'Global financial hub and tax-free earnings',
      },
      {
        value: 'Fast Track',
        label: 'Visa Processing',
        srLabel: 'Fast-track visa processing',
      },
    ],
    singapore: [
      {
        value: 'Top 15',
        label: 'Global Universities',
        srLabel: 'World top 15 global universities',
      },
      {
        value: 'Asian Hub',
        label: 'Industry Connections',
        srLabel: 'Premier Asian financial and technology hub',
      },
      {
        value: 'Post-Study',
        label: 'Career Pathways',
        srLabel: 'Global career and employment opportunities',
      },
    ],
    malaysia: [
      {
        value: 'Twinning',
        label: 'UK & Australian Degrees',
        srLabel: 'International degree twinning programmes',
      },
      {
        value: 'Affordable',
        label: 'Tuition & Living Cost',
        srLabel: 'Cost-effective high-quality education',
      },
      {
        value: 'Global Hub',
        label: 'Multicultural Gateway',
        srLabel: 'Vibrant multicultural education hub',
      },
    ],
    france: [
      {
        value: '3,500+',
        label: 'Institutions',
        srLabel: 'Over 3,500 higher education institutions',
      },
      {
        value: 'Grandes Écoles',
        label: 'Elite Business & Engineering',
        srLabel: 'Elite Grandes Ecoles and public universities',
      },
      {
        value: '2 Years',
        label: 'Post-Study APS Visa',
        srLabel: 'Post-study stay and work rights',
      },
    ],
  };

  const heroStats = DESTINATION_HERO_STATS[destination.slug] || [
    {
      value: 'Accredited',
      label: 'institutions',
      srLabel: 'Over 4,000 accredited universities',
    },
    {
      value: 'Top-Ranked',
      label: 'universities',
      srLabel: 'Top global university ranking',
    },
    {
      value: 'Post-Study',
      label: 'work rights',
      srLabel: 'Post-study work authorization',
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
        brandTagline="Honest, Unbiased & Professional Guidance"
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
                  className={`flex items-center gap-4 lg:px-6 ${idx < 3 ? 'lg:border-r lg:border-navy/10' : ''
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
