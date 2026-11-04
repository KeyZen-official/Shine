import Link from 'next/link';
import { ArrowRight, Globe2 } from 'lucide-react';
import { getDestinations } from '../../../lib/content';
import { buildMetadata } from '../../../lib/seo';
import { PageHeader } from '../../../components/sections/Hero';
import { SectionShell } from '../../../components/ui/SectionShell';
import { DestinationCard } from '../../../components/cards/DestinationCard';
import { ResponsiveImage } from '../../../components/media/ResponsiveImage';
import { pickImage } from '../../../lib/media';
import { EmptyState } from '../../../components/ui/States';
import { CtaStrip } from '../../../components/sections/FinalCta';
import { DestinationFilters } from './DestinationFilters';

export const metadata = buildMetadata({
  title: 'Study Destinations',
  description:
    'Compare international study destinations by education system, entry requirements, application process and cost of living.',
  path: '/destinations',
});

/**
 * Composition: short editorial hero, inline search and filter bar, a 2-up
 * feature strip for popular destinations, then the G1 photo grid. The
 * feature strip above a grid is what keeps this page visually distinct
 * from the home page's destinations section.
 */
export default async function DestinationsPage({ searchParams }) {
  const params = await searchParams;
  const search = typeof params?.search === 'string' ? params.search : '';
  const region = typeof params?.region === 'string' ? params.region : '';

  /**
   * Filtering happens here rather than in a database query. There are ten
   * destinations and the whole list is already in memory, so a `$text`
   * index and a round trip were buying nothing — the match is a substring
   * test over ten names.
   */
  const hasQuery = Boolean(search || region);
  const needle = search.trim().toLowerCase();

  const destinations = getDestinations().filter((destination) => {
    if (region && destination.region !== region) return false;
    if (!needle) return true;
    return (
      destination.name.toLowerCase().includes(needle) ||
      (destination.shortIntroduction ?? '').toLowerCase().includes(needle)
    );
  });

  const popular = destinations.filter((item) => item.isPopular).slice(0, 2);

  return (
    <>
      <PageHeader
        eyebrow="Where in the world"
        title="Study destinations"
        intro="Each country runs its admissions differently — different entry requirements, different application calendars, different costs. Start with the system that fits your profile."
        surface="navy"
      >
        <DestinationFilters search={search} region={region} />
      </PageHeader>

      {destinations.length === 0 ? (
        <div className="shell py-20">
          <EmptyState
            icon={Globe2}
            title={hasQuery ? 'No destinations match that search' : 'No destinations published yet'}
            description={
              hasQuery
                ? 'Try a different country name, or clear the filters to see everything available.'
                : 'Our destination guides are being prepared. Send us an enquiry and a counsellor will advise you directly in the meantime.'
            }
            actionLabel={hasQuery ? 'Clear filters' : 'Send an enquiry'}
            actionHref={hasQuery ? '/destinations' : '/contact'}
          />
        </div>
      ) : (
        <>
          {/* Feature strip — only popular destinations, only when nothing
              is being filtered, so it does not contradict the results. */}
          {popular.length > 0 && !hasQuery ? (
            <SectionShell
              id="popular"
              eyebrow="Most asked about"
              title="Popular destinations"
              surface="ivory"
            >
              <ul className="grid gap-6 lg:grid-cols-2">
                {popular.map((destination, index) => {
                  const generatedPhoto = `/destinations/${destination.slug}.jpg`;
                  const image = pickImage(destination.cardImage, {
                    fallbackKey: index === 0 ? 'architecture' : 'city',
                    alt: `${destination.name} — campus setting`,
                  });

                  return (
                    <li key={destination.slug}>
                      <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-navy/10 bg-white shadow-card sm:flex-row">
                        {destination.cardImage && image ? (
                          <div className="sm:w-2/5 sm:shrink-0">
                            <ResponsiveImage
                              image={image}
                              aspect="1 / 1"
                              rounded="rounded-none"
                              className="h-full"
                              imgClassName="h-full"
                              sizes="(max-width: 640px) 100vw, 260px"
                            />
                          </div>
                        ) : (
                          <div className="relative min-h-[220px] overflow-hidden bg-navy/5 sm:w-2/5 sm:shrink-0">
                            <img
                              src={generatedPhoto}
                              alt={`${destination.name} — campus setting`}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        )}

                        <div className="flex flex-1 flex-col p-6 lg:p-8">
                          <h3 className="text-h2 font-bold">
                            <Link
                              href={`/destinations/${destination.slug}`}
                              className="rounded-sm after:absolute after:inset-0 after:content-['']"
                            >
                              {destination.name}
                            </Link>
                          </h3>
                          {destination.shortIntroduction ? (
                            <p className="mt-3 flex-1 text-body text-charcoal-70">
                              {destination.shortIntroduction}
                            </p>
                          ) : (
                            <div className="flex-1" />
                          )}
                          <span className="mt-6 inline-flex items-center gap-2 font-heading text-caption font-semibold text-accent">
                            Explore destination
                            <ArrowRight
                              className="h-4 w-4 transition-transform duration-base ease-standard group-hover:translate-x-1"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </SectionShell>
          ) : null}

          <SectionShell
            id="all-destinations"
            title={hasQuery ? `${destinations.length} destination${destinations.length === 1 ? '' : 's'} found` : 'All destinations'}
            surface="white"
            level={2}
          >
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((destination, index) => (
                <li key={destination.slug}>
                  <DestinationCard destination={destination} index={index} />
                </li>
              ))}
            </ul>
          </SectionShell>
        </>
      )}

      <CtaStrip
        title="Not sure which country fits your profile?"
        description="A free consultation will narrow it down against your grades, budget and timeline."
        secondaryLabel="Browse all courses"
        secondaryHref="/test-preparation"
      />
    </>
  );
}
