import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  getContact,
  getDestinations,
  getHomeContent,
  getServices,
  getSettings,
  getSiteFaqs,
  getTestPreparation,
} from '../../lib/content';
import { buildMetadata, organizationJsonLd, websiteJsonLd, faqJsonLd } from '../../lib/seo';
import { JsonLd } from '../../components/seo/JsonLd';
import { EditorialHero } from '../../components/sections/EditorialHero';
import { WhoWeAreSection } from '../../components/sections/WhoWeAreSection';
import { pickImage } from '../../lib/media';
import { SectionShell } from '../../components/ui/SectionShell';
import { DestinationCard } from '../../components/cards/DestinationCard';
import { ValueMatrix } from '../../components/sections/ValueMatrix';
import { ProcessTimeline } from '../../components/sections/ProcessTimeline';
import { FinalCta } from '../../components/sections/FinalCta';
import { StudentFeedbackSection } from '../../components/sections/StudentFeedbackSection';
import { FaqAccordion } from '../../components/ui/faq-chat-accordion';
import { Button } from '../../components/ui/Button';
import { ServicesSection } from '../../components/sections/ServicesSection';
import { TestPrepSection } from '../../components/sections/TestPrepSection';

// The root layout appends " | Shine Consultant", so page titles never
// carry the brand name themselves.
export const metadata = buildMetadata({
  title: 'Overseas Education, Migration & Training',
  description:
    'Honest, unbiased and professional guidance on studying, training and migrating overseas. Career counselling, university selection, applications, scholarships, visas and test preparation, from Borivali West, Mumbai.',
  path: '/',
});

/**
 * The home page.
 *
 * Eight sections in a fixed order, each omitting itself — heading included
 * — when it has nothing to show.
 *
 * Three sections were removed when the course and university catalogue
 * went: a course search box, a featured-courses rail and a university
 * logo rail. All three were driven by a catalogue that held no records and
 * that nothing can now add to, so they rendered as a search over nothing
 * and two empty headings. What took their place is a grid of the eleven
 * services and a strip of the five test-preparation programmes, which are
 * real and are what the company actually sells.
 *
 * Everything is read from the content files at build time, so there is no
 * loading state and no request that can fail.
 */
export default function HomePage() {
  const home = getHomeContent();
  const sections = home ?? {};
  const headings = sections.sectionHeadings ?? {};

  const destinations = getDestinations().slice(0, 6);
  const services = getServices();
  const testPreparation = getTestPreparation();
  const faqs = getSiteFaqs();
  const settings = getSettings();
  const contact = getContact();

  /**
   * Counted from the content files, never typed in. The last entry becomes
   * the hero's large feature figure, so the biggest honest number goes
   * last. An entry at zero is dropped, and with nothing published the hero
   * omits the stats row altogether.
   *
   * `label` agrees with `value`: a catalogue of one was reading "1 study
   * destinations", which undercuts the point of showing real counts.
   * `srLabel` keeps a stable name for the description list.
   */
  const plural = (count, one, many) => (count === 1 ? one : many);

  const allDestinations = getDestinations().length;

  const stats = [
    testPreparation.length > 0
      ? {
          value: testPreparation.length,
          label: plural(testPreparation.length, 'test we coach', 'tests we coach'),
          srLabel: 'Tests we coach',
        }
      : null,
    services.length > 0
      ? {
          value: services.length,
          label: plural(services.length, 'service', 'services'),
          srLabel: 'Services',
        }
      : null,
    allDestinations > 0
      ? {
          value: allDestinations,
          label: plural(allDestinations, 'study destination', 'study destinations'),
          srLabel: 'Study destinations',
          featureLabel: plural(allDestinations, 'destination', 'destinations'),
        }
      : null,
  ].filter(Boolean);

  /**
   * The `alt` describes this specific photograph. The previous text said
   * "students walking through a university campus", which was written for a
   * generated panel and is not what the picture shows.
   */
  const heroImage = pickImage(sections.hero?.backgroundImage, {
    fallbackKey: 'hero',
    alt: 'A smiling student holding notebooks, with a university campus behind her and a plane tracing an arc through a field of stars',
  });

  const socialLinks = (settings?.socialLinks ?? [])
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  return (
    <>
      <JsonLd data={organizationJsonLd(settings, contact)} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={faqJsonLd(faqs)} />

      {/* 1 — Hero */}
      <EditorialHero
        content={sections.hero}
        stats={stats}
        socialLinks={socialLinks}
        image={heroImage}
      />

      {/* 2 — Who We Are */}
      <WhoWeAreSection content={sections.introduction} />

      {/* 3 — Study destinations */}
      <SectionShell
        id="destinations"
        eyebrow="Where to study"
        title={headings.destinations ?? 'Explore study destinations'}
        intro={headings.destinationsIntro}
        surface="white"
        action={
          destinations.length > 0 ? (
            <Button href="/destinations" variant="secondary">
              All destinations
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          ) : null
        }
      >
        {destinations.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination, index) => (
              <li key={destination.slug}>
                <DestinationCard destination={destination} index={index} />
              </li>
            ))}
          </ul>
        ) : null}
      </SectionShell>

      {/* 4 — Our Services: Redesigned two-column composition with generated visual & horizontal cards */}
      <ServicesSection services={services} />

      {/* 5 — Test preparation */}
      <TestPrepSection testPreparation={testPreparation} />

      {/* 6 — Our process */}
      <SectionShell
        id="process"
        eyebrow="Step by step"
        title={headings.process ?? 'How the process works'}
        intro={headings.processIntro}
        surface="white"
      >
        {sections.process?.length > 0 ? <ProcessTimeline steps={sections.process} /> : null}
      </SectionShell>

      {/* 8 — Student Reviews & Experiences */}
      <StudentFeedbackSection />

      {/* 9 — FAQs */}
      <SectionShell
        id="faq"
        eyebrow="Questions"
        title={headings.faq ?? 'Frequently asked questions'}
        surface="sage"
        containerClassName="max-w-4xl"
      >
        {faqs.length > 0 ? (
          <FaqAccordion
            data={faqs.map((f, i) => ({
              id: i + 1,
              question: f.question,
              answer: f.answer,
              icon: i === 0 ? '🎓' : i === 4 ? '✈️' : undefined,
              iconPosition: i === 0 ? 'right' : 'left',
            }))}
            timestamp="Updated for 2026 admissions & visa cycles"
            className="p-0"
          />
        ) : null}
      </SectionShell>

      <FinalCta content={sections.finalCta} />
    </>
  );
}
