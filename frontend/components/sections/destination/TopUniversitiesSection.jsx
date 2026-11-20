'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { TrailCard } from '@/components/ui/trail-card';

export function TopUniversitiesSection({ destination, universities = [] }) {
  const router = useRouter();

  if (!universities?.length) return null;

  return (
    <section id="universities" className="section-y bg-[#FAF8F3]">
      <div className="shell">
        {/* Header with Link */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-2.5">
              <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-accent">
                TOP UNIVERSITIES
              </span>
              <span className="h-[2px] w-8 rounded-full bg-accent inline-block" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-navy leading-tight tracking-tight">
              Explore Leading Universities in {destination.name}
            </h2>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full border border-navy/20 bg-white px-5 py-2.5 font-heading text-caption font-semibold text-navy transition-all duration-300 hover:border-navy hover:bg-navy hover:text-white shadow-sm"
          >
            Explore All Universities
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* TrailCard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch justify-items-center">
          {universities.map((uni, idx) => {
            const fallbackImage =
              uni.image ||
              uni.imageUrl ||
              'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80';

            return (
              <TrailCard
                key={idx}
                title={uni.name}
                location={uni.location || `${destination.name}`}
                difficulty={uni.rank || uni.difficulty || 'Top-Ranked Institution'}
                creators={uni.type || uni.creators || 'Verified Institution'}
                imageUrl={fallbackImage}
                mapImageUrl={uni.mapImageUrl}
                stat1Label={uni.stat1Label || 'Intakes'}
                stat1Value={uni.stat1Value || 'Fall & Spring'}
                stat2Label={uni.stat2Label || 'Degree Level'}
                stat2Value={uni.stat2Value || 'UG & PG'}
                stat3Label={uni.stat3Label || 'Advisory Status'}
                stat3Value={uni.stat3Value || 'Open'}
                badge={uni.badge}
                onDirectionsClick={() => {
                  router.push(uni.href || '/contact');
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TopUniversitiesSection;
