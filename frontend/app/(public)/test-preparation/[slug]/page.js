import { notFound } from 'next/navigation';
import {
  Check,
  Languages,
  Target,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Headphones,
} from 'lucide-react';
import {
  getServiceOptions,
  getTestPreparation,
  getTestPreparationProgramme,
  getSettings,
} from '../../../../lib/content';
import { breadcrumbJsonLd, faqJsonLd, metadataForRecord } from '../../../../lib/seo';
import { JsonLd } from '../../../../components/seo/JsonLd';
import { Breadcrumbs } from '../../../../components/ui/Breadcrumbs';
import { SectionShell } from '../../../../components/ui/SectionShell';
import { Accordion } from '../../../../components/ui/Accordion';
import { ResponsiveImage } from '../../../../components/media/ResponsiveImage';
import { EnquiryForm } from '../../../../components/forms/EnquiryForm';
import { CtaStrip } from '../../../../components/sections/FinalCta';
import { pickImage } from '../../../../lib/media';
import { toParagraphs, truncate } from '../../../../lib/format';

/* Signature Hero from Home Page */
import { EditorialHero } from '../../../../components/sections/EditorialHero';

/* Premium IELTS Preparation Sections matching reference design */
import { AboutIeltsSection } from '../../../../components/sections/test-prep/AboutIeltsSection';
import { IeltsVersionsAndModulesSection } from '../../../../components/sections/test-prep/IeltsVersionsAndModulesSection';
import { WhatStudentsGetSection } from '../../../../components/sections/test-prep/WhatStudentsGetSection';
import { TeachingApproachSection } from '../../../../components/sections/test-prep/TeachingApproachSection';
import { WhyChooseIeltsAndFaqSection } from '../../../../components/sections/test-prep/WhyChooseIeltsAndFaqSection';
import { IeltsFinalCta } from '../../../../components/sections/test-prep/IeltsFinalCta';

/* Premium Test Preparation Layout for PTE, TOEFL, GRE, GMAT matching IELTS design */
import { TEST_PREP_DATA } from '../../../../lib/test-prep-data';
import { TestProgrammeDetailLayout } from '../../../../components/sections/test-prep/TestProgrammeDetailLayout';

const FAMILY_ICON = {
  english: Languages,
  entrance: Target,
};

export function generateStaticParams() {
  return getTestPreparation().map((test) => ({ slug: test.slug }));
}

function load(slug) {
  const test = getTestPreparationProgramme(slug);
  if (!test) return null;
  const prepData = TEST_PREP_DATA[slug];
  const faqs = prepData?.faqs?.length > 0 ? prepData.faqs : (test.faqs ?? []);
  return { test, faqs, prepData };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const payload = load(slug);
  if (!payload) return { title: 'Test preparation not found' };

  const { test, prepData } = payload;
  return metadataForRecord(test, {
    path: `/test-preparation/${test.slug}`,
    fallbackTitle: `${test.name} Preparation`,
    fallbackDescription:
      prepData?.heroContent?.supportingLine ||
      test.summary ||
      truncate(test.description ?? '', 155) ||
      `${test.name} coaching at Shine Consultant — how we prepare candidates and what the programme covers.`,
    image: test.heroImage ?? `/imagery/${test.slug}-hero.jpg`,
  });
}

/**
 * Test Preparation Detail Page (e.g. /test-preparation/ielts).
 *
 * For IELTS, renders the full-page layout matching the reference specifications:
 * 1. Slim Navigation Bar (Global Navbar)
 * 2. Hero Section (Signature EditorialHero matching Home + 4 benefit indicators)
 * 3. About the IELTS Test (photo with red accent, floating badge, 3 info cards)
 * 4. IELTS Versions + Coaching Modules (split layout with soft mint panel and 4 skill cards)
 * 5. What Students Get (6 benefit cards + library student with headphones photo)
 * 6. Our Teaching Approach (soft mint background + 5-step process timeline)
 * 7. Why Choose Shine Consultant + FAQ (4 cards + home page FaqAccordion)
 * 8. Final CTA (dark navy banner with skyline line-art and red button)
 */
export default async function TestPreparationDetailPage({ params }) {
  const { slug } = await params;
  const payload = load(slug);
  if (!payload) notFound();

  const { test, faqs = [], prepData } = payload;
  const settings = getSettings();
  const socialLinks = settings?.socialLinks ?? [];

  const trail = [
    { label: 'Home', href: '/' },
    { label: 'Test preparation', href: '/test-preparation' },
    { label: test.name, href: `/test-preparation/${test.slug}` },
  ];

  /* ------------------------------------------------------------------ */
  /* IELTS: Full-Page UI Layout                                         */
  /* ------------------------------------------------------------------ */
  if (slug === 'ielts') {
    const heroContent = {
      eyebrow: 'IELTS PREPARATION — SHINE CONSULTANT',
      headline: 'IELTS Preparation — Master English for Global Ambitions.',
      supportingLine:
        'Expert coaching for IELTS with proven strategies, personalised guidance and practice that builds your confidence.',
      primaryCtaLabel: 'Book Free Consultation',
      primaryCtaHref: '/book-consultation',
      secondaryCtaLabel: 'Explore Syllabus',
      secondaryCtaHref: '#about-ielts',
    };

    const heroStats = [
      {
        value: '4 Skills',
        label: 'core papers trained',
        srLabel: 'Listening, Reading, Writing, Speaking',
      },
      {
        value: '2 Forms',
        label: 'Academic & General Training',
        srLabel: 'Both IELTS test forms',
      },
      {
        value: 'Full-Length',
        label: 'timed mock simulations',
        srLabel: 'Regular practice under exam conditions',
        featureLabel: 'Mock Tests',
      },
    ];

    const benefitIndicators = [
      {
        icon: GraduationCap,
        title: 'Expert Trainers',
        subtitle: 'Qualified IELTS faculty',
      },
      {
        icon: BookOpen,
        title: 'Practice Tests',
        subtitle: 'Real timed mock exams',
      },
      {
        icon: TrendingUp,
        title: 'Score Improvement',
        subtitle: 'Targeted band strategies',
      },
      {
        icon: Headphones,
        title: 'End-to-End Support',
        subtitle: 'Personalised feedback',
      },
    ];

    return (
      <>
        <JsonLd data={breadcrumbJsonLd(trail)} />
        {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs)} />}

        {/* SECTION 2 — HERO SECTION (Signature EditorialHero matching Home) */}
        <EditorialHero
          content={heroContent}
          stats={heroStats}
          socialLinks={socialLinks}
          image={{
            src: '/imagery/ielts-hero.jpg',
            fallbackUrl: '/imagery/ielts-hero.jpg',
            alt: 'Indian student holding IELTS preparation books in natural daylight with global landmarks',
            width: 1920,
            height: 1080,
          }}
          brandTagline="Honest, unbiased & professional guidance — from Borivali West, Mumbai"
        />

        {/* 4 Benefit Indicators Quick Strip */}
        <div className="border-y border-navy/10 bg-[#FAF9F5] py-6 sm:py-8">
          <div className="shell">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {benefitIndicators.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 lg:px-6 ${
                      idx < 3 ? 'lg:border-r lg:border-navy/10' : ''
                    }`}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <IconComp className="h-6 w-6 stroke-[1.8]" />
                    </span>
                    <div>
                      <p className="font-heading text-sm font-bold text-navy">{item.title}</p>
                      <p className="text-caption text-charcoal/70">{item.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 3 — ABOUT THE IELTS TEST */}
        <AboutIeltsSection />

        {/* SECTION 4 — IELTS VERSIONS + COACHING MODULES */}
        <IeltsVersionsAndModulesSection />

        {/* SECTION 5 — WHAT STUDENTS GET */}
        <WhatStudentsGetSection />

        {/* SECTION 6 — OUR TEACHING APPROACH */}
        <TeachingApproachSection />

        {/* SECTION 7 — WHY CHOOSE SHINE CONSULTANT + FAQ */}
        <WhyChooseIeltsAndFaqSection />

        {/* SECTION 8 — FINAL CTA */}
        <IeltsFinalCta />
      </>
    );
  }

  /* ------------------------------------------------------------------ */
  /* PTE, TOEFL, GRE, GMAT: Full-Page Layout matching IELTS             */
  /* ------------------------------------------------------------------ */
  if (prepData) {
    return (
      <>
        <JsonLd data={breadcrumbJsonLd(trail)} />
        {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs)} />}

        <TestProgrammeDetailLayout
          test={test}
          data={prepData}
          socialLinks={socialLinks}
          heroImage={test.heroImage ?? `/imagery/${test.slug}-hero.jpg`}
        />
      </>
    );
  }

  /* ------------------------------------------------------------------ */
  /* Fallback for other test prep programmes                            */
  /* ------------------------------------------------------------------ */
  const services = getServiceOptions();
  const FamilyIcon = FAMILY_ICON[test.family] ?? Target;
  const image = pickImage(test.heroImage ?? `/imagery/${test.slug}-hero.jpg`, {
    fallbackKey: test.family === 'english' ? 'study' : 'library',
    alt: `${test.name} preparation at Shine Consultant`,
  });

  const description = toParagraphs(test.description);
  const approach = toParagraphs(test.scoreImprovementApproach);
  const enrol = toParagraphs(test.howToEnrol);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={faqJsonLd(faqs)} />

      <section className="section-y bg-ivory">
        <div className={`shell grid items-center gap-10 lg:gap-16 ${image ? 'lg:grid-cols-2' : ''}`}>
          <div>
            <Breadcrumbs trail={trail} surface="light" />

            <span className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sage text-navy">
              <FamilyIcon className="h-5 w-5" aria-hidden="true" />
            </span>

            <h1 className="mt-6 text-h1 font-extrabold">{test.name} Preparation</h1>

            {test.fullName ? (
              <p className="mt-2 font-heading text-caption uppercase tracking-[0.1em] text-charcoal-50">
                {test.fullName}
              </p>
            ) : null}

            {test.summary ? (
              <p className="mt-5 max-w-prose text-lead text-charcoal-70">{test.summary}</p>
            ) : null}

            {description.length > 0 ? (
              <div className="mt-6 space-y-4">
                {description.map((paragraph, index) => (
                  <p key={index} className="max-w-prose text-body text-charcoal-70">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
          </div>

          {image ? (
            <div>
              <ResponsiveImage
                image={image}
                priority
                aspect="4 / 3"
                rounded="rounded-xl"
                className="shadow-card"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
          ) : null}
        </div>
      </section>

      {test.whoItIsFor ? (
        <SectionShell
          id="who-it-is-for"
          eyebrow="Target audience"
          title={`Who should take ${test.name}?`}
          surface="white"
        >
          <div className="max-w-prose space-y-4 text-body text-charcoal-70">
            {toParagraphs(test.whoItIsFor).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </SectionShell>
      ) : null}

      {test.variants?.length ? (
        <SectionShell
          id="variants"
          eyebrow="Formats"
          title="Programme options"
          surface="subtle"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {test.variants.map((v, i) => (
              <div key={i} className="rounded-xl border border-navy/10 bg-white p-6 shadow-card">
                <h3 className="font-heading text-h4 font-bold text-navy">{v.name}</h3>
                {v.suitableFor ? (
                  <p className="mt-2 text-body text-charcoal-70">{v.suitableFor}</p>
                ) : null}
              </div>
            ))}
          </div>
        </SectionShell>
      ) : null}

      {test.modules?.length ? (
        <SectionShell
          id="curriculum"
          eyebrow="What we cover"
          title="Curriculum & modules"
          surface="white"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {test.modules.map((m, i) => (
              <div key={i} className="rounded-xl border border-navy/10 bg-ivory p-6">
                <h3 className="font-heading text-h5 font-bold text-navy">{m.name}</h3>
                {m.focus ? <p className="mt-2 text-caption text-charcoal-70">{m.focus}</p> : null}
              </div>
            ))}
          </div>
        </SectionShell>
      ) : null}

      {approach.length > 0 ? (
        <SectionShell
          id="approach"
          eyebrow="How we coach"
          title="Our score improvement approach"
          surface="subtle"
        >
          <div className="max-w-prose space-y-4 text-body text-charcoal-70">
            {approach.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </SectionShell>
      ) : null}

      {enrol.length > 0 ? (
        <SectionShell
          id="how-to-enrol"
          eyebrow="Enrolment"
          title="How to begin your preparation"
          surface="white"
        >
          <div className="max-w-prose space-y-4 text-body text-charcoal-70">
            {enrol.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </SectionShell>
      ) : null}

      {faqs.length > 0 ? (
        <SectionShell
          id="faqs"
          eyebrow="Questions"
          title={`Frequently asked questions about ${test.name}`}
          surface="subtle"
        >
          <Accordion items={faqs} />
        </SectionShell>
      ) : null}

      <SectionShell
        id="enquire"
        eyebrow="Enquiry"
        title={`Speak with a ${test.name} coach`}
        intro="Schedule a diagnostic session and learn how we can help you achieve your target score."
        surface="white"
      >
        <div className="mx-auto max-w-xl">
          <EnquiryForm
            services={services}
            defaultService={`test-${test.slug}`}
          />
        </div>
      </SectionShell>

      <CtaStrip />
    </>
  );
}
