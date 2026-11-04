'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { pickImage, resolveMediaUrl } from '../../lib/media';
import { cn } from '../../lib/utils';

const FALLBACK_KEYS = ['campus', 'architecture', 'city', 'library', 'study', 'lecture'];

const GENERATED_DESTINATION_IMAGES = {
  uk: '/destinations/uk.jpg',
  canada: '/destinations/canada.jpg',
  australia: '/destinations/australia.jpg',
  usa: '/destinations/usa.jpg',
  germany: '/destinations/germany.jpg',
  ireland: '/destinations/ireland.jpg',
  'new-zealand': '/destinations/new-zealand.jpg',
  dubai: '/destinations/dubai.jpg',
  europe: '/destinations/europe.jpg',
  malaysia: '/destinations/malaysia.jpg',
};

const DESTINATION_TAGS = {
  uk: ['Russell Group', '2-Yr PSW Visa', '1-Yr Masters'],
  canada: ['PGWP Work Permit', 'Top Universities', 'Co-op Terms'],
  australia: ['Group of Eight', 'Subclass 485', 'Post-Study Work'],
  usa: ['OPT / STEM Extension', 'Ivy League & R1', 'Scholarships'],
  germany: ['Low / Zero Tuition', '18-Mo Stay Back', 'STEM Excellence'],
  ireland: ['European Tech Hub', '2-Yr Stay Back', 'English Speaking'],
  'new-zealand': ['Post-Study Visa', 'Green List Careers', 'Safe & Scenic'],
  dubai: ['Global Campus Hub', 'Tax-Free Career', 'Fast Visa'],
  europe: ['Schengen Mobility', 'Bologna System', 'Multilingual'],
  malaysia: ['Twinning Degrees', 'Affordable Living', 'Asian Gateway'],
};

const DESTINATION_DESCRIPTIONS = {
  uk: 'World-renowned Russell Group universities, 2-year post-study work rights, and accelerated master’s programs.',
  canada: 'High-ranking research universities, welcoming multicultural cities, and clear post-graduation work permit pathways.',
  australia: 'Globally celebrated Group of Eight institutions, generous post-study stay-back rights, and superior quality of living.',
  usa: 'World-leading universities, flexible curricula, abundant research funding, and up to 3 years of STEM OPT.',
  germany: 'World-class tuition-free public universities, cutting-edge engineering and research, and 18-month job seeker visas.',
  ireland: 'The European headquarters of global tech and pharma, 2-year post-study work rights, and English-speaking education.',
  'new-zealand': 'All 8 universities ranked in the global top 3%, excellent research standards, and welcoming student environment.',
  dubai: 'Branch campuses of premier global universities, thriving economic hub, tax-free earnings, and rapid visa turnaround.',
  europe: 'Rich academic heritage across European nations, affordable tuition fees, and seamless continental mobility.',
  malaysia: 'Cost-effective international degree twinning from British and Australian universities in a vibrant Asian hub.',
};

const DISC = 64; // the arrow disc, px
const BLOCK = 80; // the notch block, px (radius = BLOCK - DISC / 2 = 48px)
const FILLET = 28; // the curve where the cut meets the cover's edges, px

const SURFACE_LOOKUP = {
  white: '#FFFFFF',
  ivory: '#F8F7F2',
  sage: '#DCE9E4',
  'sage-dark': '#C4D8D1',
  navy: '#14243A',
  'navy-900': '#0D1829',
};

function resolveSurfaceColor(surface) {
  if (!surface) return '#FFFFFF';
  if (SURFACE_LOOKUP[surface]) return SURFACE_LOOKUP[surface];
  return surface;
}

/**
 * Notched Destination Card
 *
 * Implements the notched project card design tailored for Shine's "Explore study destinations".
 * Features a circular-cut corner concentric with an interactive arrow disc, filleted corner
 * transitions, custom destination photography, region badges, and benefit tags.
 */
export function DestinationCard({
  destination,
  index = 0,
  priority = false,
  surface = 'white',
  monochrome = false,
  accent = '#D00100',
  accentForeground = '#FFFFFF',
  className,
}) {
  const resolvedSurface = resolveSurfaceColor(surface);

  // Resolve image: uploaded image -> generated destination photography -> fallback panel
  let imageUrl = null;
  if (destination?.cardImage?.url) {
    imageUrl = resolveMediaUrl(destination.cardImage.url);
  } else if (typeof destination?.cardImage === 'string') {
    imageUrl = resolveMediaUrl(destination.cardImage);
  } else if (destination?.slug && GENERATED_DESTINATION_IMAGES[destination.slug]) {
    imageUrl = GENERATED_DESTINATION_IMAGES[destination.slug];
  } else {
    const fallbackImage = pickImage(destination?.heroImage, {
      fallbackKey: FALLBACK_KEYS[index % FALLBACK_KEYS.length],
      alt: `${destination?.name} — study destination`,
    });
    imageUrl = fallbackImage?.variants?.w1024 || fallbackImage?.fallbackUrl || '/destinations/uk.jpg';
  }

  const tags = destination?.tags?.length
    ? destination.tags
    : (DESTINATION_TAGS[destination?.slug] ?? ['International Degree', 'Career Guidance']);

  const description =
    destination?.shortIntroduction ||
    DESTINATION_DESCRIPTIONS[destination?.slug] ||
    'Comprehensive guidance on university applications, visa requirements, and post-study opportunities.';

  const regionLabel = destination?.region ? destination.region.replace(/-/g, ' ') : null;

  const tone = monochrome
    ? 'grayscale transition-[filter,transform] duration-500 group-hover:grayscale-0 group-focus-visible:grayscale-0'
    : 'transition-transform duration-500';

  return (
    <article
      className={cn(
        'group relative flex flex-col rounded-[28px] outline-none transition-all duration-300 hover:-translate-y-1',
        'focus-within:ring-2 focus-within:ring-navy focus-within:ring-offset-4 focus-within:ring-offset-white',
        className,
      )}
    >
      <div className="relative">
        {/* Cover photograph */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-navy/5 shadow-card">
          <img
            src={imageUrl}
            alt={`${destination?.name} — university setting`}
            className={cn(
              'absolute inset-0 h-full w-full object-cover',
              tone,
              'group-hover:scale-[1.05]',
            )}
            loading={priority ? 'eager' : 'lazy'}
          />

          {/* Region or Popularity Badge */}
          {regionLabel && (
            <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-navy/85 px-3 py-1 font-heading text-micro font-semibold uppercase tracking-[0.1em] text-white shadow-sm backdrop-blur-md">
                <MapPin className="h-3 w-3 text-accent-onNavy" aria-hidden="true" />
                {regionLabel}
              </span>
            </div>
          )}

          {destination?.isPopular && (
            <div className="pointer-events-none absolute right-4 top-4 z-10 flex items-center">
              <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 font-heading text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                Popular
              </span>
            </div>
          )}
        </div>

        {/* The Notch: A block with concave corner concentric with the arrow disc */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0"
          style={{
            width: BLOCK,
            height: BLOCK,
            borderTopLeftRadius: BLOCK - DISC / 2,
            background: resolvedSurface,
          }}
        />

        {/* Fillets at each end where the notch meets cover edges */}
        {[
          { bottom: BLOCK, right: 0 },
          { bottom: 0, right: BLOCK },
        ].map((pos, i) => (
          <div
            key={i}
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              ...pos,
              width: FILLET,
              height: FILLET,
              background: `radial-gradient(circle at top left, transparent ${FILLET - 0.5}px, ${resolvedSurface} ${FILLET}px)`,
            }}
          />
        ))}

        {/* The Arrow Disc nested inside the notch */}
        <Link
          href={`/destinations/${destination?.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className={cn(
            'absolute bottom-0 right-0 flex items-center justify-center rounded-full shadow-card transition-all duration-300 group-hover:scale-105',
            'bg-navy text-white group-hover:bg-[var(--card-accent,#D00100)] group-hover:text-[var(--card-accent-fg,#FFFFFF)]',
          )}
          style={
            {
              width: DISC,
              height: DISC,
              '--card-accent': accent,
              '--card-accent-fg': accentForeground,
            }
          }
        >
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col pt-5">
        <h3 className="font-heading text-h3 font-bold tracking-tight text-navy transition-colors duration-200 group-hover:text-accent">
          <Link
            href={`/destinations/${destination?.slug}`}
            className="rounded-sm outline-none focus-visible:underline"
          >
            {destination?.name}
          </Link>
        </h3>

        {description && (
          <p className="mt-2 flex-1 text-body text-charcoal-70 leading-relaxed line-clamp-3">
            {description}
          </p>
        )}

        {tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <li
                key={`${tag}-${i}`}
                className="rounded-md bg-sage/60 px-2.5 py-1 font-heading text-micro font-semibold uppercase tracking-wider text-navy"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4">
          <Link
            href={`/destinations/${destination?.slug}`}
            className="inline-flex items-center gap-1.5 font-heading text-caption font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            <span>Explore destination</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default DestinationCard;
