import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { getService, getServices } from '../../../../lib/content';
import { breadcrumbJsonLd, faqJsonLd, metadataForRecord } from '../../../../lib/seo';
import { JsonLd } from '../../../../components/seo/JsonLd';
import { Breadcrumbs } from '../../../../components/ui/Breadcrumbs';
import { SectionShell } from '../../../../components/ui/SectionShell';
import { Accordion } from '../../../../components/ui/Accordion';
import { Icon } from '../../../../components/ui/Icon';
import { ProcessStepper } from '../../../../components/sections/ProcessTimeline';
import { ResponsiveImage } from '../../../../components/media/ResponsiveImage';
import { CtaStrip } from '../../../../components/sections/FinalCta';
import { pickImage } from '../../../../lib/media';
import { toParagraphs, truncate } from '../../../../lib/format';

export function generateStaticParams() {
  return getServices().map((service) => ({ slug: service.slug }));
}

function load(slug) {
  const service = getService(slug);
  return service ? { service, faqs: service.faqs ?? [] } : null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const payload = load(slug);
  if (!payload) return { title: 'Service not found' };

  const { service } = payload;
  return metadataForRecord(service, {
    path: `/services/${service.slug}`,
    fallbackTitle: service.name,
    fallbackDescription:
      service.summary || truncate(service.description ?? '', 155) ||
      `${service.name} from Shine Consultant — how it works and what it involves.`,
    image: service.heroImage,
  });
}

/**
 * Three layout variants, selected by the record's `layoutVariant`. The
 * seed data alternates them, so two services reached in sequence never
 * present the same arrangement — which is the point: nine near-identical
 * pages would read as filler.
 */
/**
 * Which generated panel stands in when a service has no uploaded image.
 *
 * Re-keyed onto the real service slugs. The previous map was written
 * against an earlier, invented services list, and after that list was
 * replaced with the eleven from the company profile only one of its nine
 * keys still matched — so ten of eleven service pages were silently
 * falling through to the same default panel.
 */
const FALLBACK_IMAGE = {
  'career-counselling': 'advice',
  'university-selection': 'study',
  'university-application': 'documents',
  'scholarship-help': 'lecture',
  'visa-assistance': 'arrival',
  'pre-and-post-departure-sessions': 'arrival',
  'test-preparation': 'study',
  'corporate-training': 'lecture',
  'migration-counselling': 'advice',
  'visa-counselling': 'documents',
  'institutional-services': 'library',
};

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const payload = load(slug);
  if (!payload) notFound();

  const { service, faqs = [] } = payload;
  const variant = service.layoutVariant ?? 'a-left-media';

  const image = pickImage(service.heroImage, {
    fallbackKey: FALLBACK_IMAGE[service.slug] ?? 'advice',
    alt: `${service.name} — Shine Consultant`,
  });

  const trail = [
    { label: 'Home', href: '/' },
    { label: 'Our services', href: '/services' },
    { label: service.name, href: `/services/${service.slug}` },
  ];

  const paragraphs = toParagraphs(service.description);

  const intro = (
    <>
      <Breadcrumbs trail={trail} surface={variant === 'c-stacked-banner' ? 'navy' : 'light'} />

      <span
        className={`mt-6 inline-flex h-12 w-12 items-center justify-center rounded-lg ${
          variant === 'c-stacked-banner' ? 'bg-white/10 text-white' : 'bg-sage text-navy'
        }`}
      >
        <Icon name={service.icon} className="h-5 w-5" />
      </span>

      <h1
        className={`mt-6 text-h1 font-extrabold ${
          variant === 'c-stacked-banner' ? 'text-white' : ''
        }`}
      >
        {service.name}
      </h1>

      {service.summary ? (
        <p
          className={`mt-5 max-w-prose text-lead ${
            variant === 'c-stacked-banner' ? 'text-white/75' : 'text-charcoal-70'
          }`}
        >
          {service.summary}
        </p>
      ) : null}
    </>
  );

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={faqJsonLd(faqs)} />

      {variant === 'c-stacked-banner' ? (
        <>
          <section className="relative isolate overflow-hidden bg-navy on-navy">
            {image ? (
              <div className="absolute inset-0">
                <ResponsiveImage
                  image={image}
                  priority
                  aspect="21 / 9"
                  rounded="rounded-none"
                  className="h-full w-full"
                  imgClassName="h-full w-full"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-hero-scrim" aria-hidden="true" />
              </div>
            ) : null}
            <div className="shell relative py-16 lg:py-24">
              <div className="max-w-3xl">{intro}</div>
            </div>
          </section>

          {paragraphs.length > 0 ? (
            <section className="section-y bg-ivory">
              <div className="shell max-w-prose space-y-4">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-body text-charcoal-70">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ) : null}
        </>
      ) : (
        <section className="section-y bg-ivory">
          <div
            className={`shell grid items-center gap-10 lg:gap-16 ${image ? 'lg:grid-cols-2' : ''}`}
          >
            <div className={variant === 'a-left-media' && image ? 'lg:order-2' : ''}>
              {intro}
              {paragraphs.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {paragraphs.map((paragraph, index) => (
                    <p key={index} className="max-w-prose text-body text-charcoal-70">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>

            {image ? (
              <div className={variant === 'a-left-media' ? 'lg:order-1' : ''}>
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
      )}

      <SectionShell
        id="how-we-help"
        eyebrow="What this involves"
        title="How Shine Consultant helps"
        surface="white"
        containerClassName="max-w-4xl"
      >
        {service.howWeHelp?.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {service.howWeHelp.map((item, index) => (
              <li
                key={index}
                className="flex gap-3 rounded-lg border border-navy/10 bg-ivory p-5 text-body text-charcoal-70"
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage text-navy"
                  aria-hidden="true"
                >
                  <Check className="h-3.5 w-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </SectionShell>

      <SectionShell
        id="process"
        eyebrow="Step by step"
        title="The process"
        surface="sage"
        containerClassName="max-w-3xl"
      >
        {service.processSteps?.length > 0 ? (
          <ProcessStepper steps={service.processSteps} />
        ) : null}
      </SectionShell>

      <SectionShell
        id="faqs"
        eyebrow="Questions"
        title={`${service.name}: common questions`}
        surface="ivory"
        containerClassName="max-w-4xl"
      >
        {faqs.length > 0 ? <Accordion items={faqs} single /> : null}
      </SectionShell>

      <CtaStrip
        title={`Talk to a counsellor about ${service.name.toLowerCase()}`}
        description="The first consultation is free and carries no obligation."
        secondaryLabel="See all services"
        secondaryHref="/services"
        surface="white"
      />
    </>
  );
}
