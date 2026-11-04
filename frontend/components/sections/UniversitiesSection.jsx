import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

/**
 * Universities section: horizontal card grid with university name,
 * rank badge and arrow link. Matches the reference design with
 * logo emoji, name, rank subtitle and circular arrow button.
 */
export function UniversitiesSection({ destination, universities = [] }) {
  if (!universities?.length) return null;

  return (
    <section id="universities" className="bg-white section-y">
      <div className="shell">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="eyebrow">Top Universities</span>
          <span className="h-[2px] w-10 rounded-full bg-accent inline-block" />
        </div>
        <h2 className="text-h2 font-bold text-navy">
          Leading Universities in {destination.name}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {universities.map((uni, i) => (
            <div
              key={i}
              className="group flex flex-col items-center rounded-xl border border-navy/10 bg-ivory p-6 text-center transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
            >
              {/* Logo / Emoji */}
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white border border-navy/10 text-2xl shadow-panel mb-4">
                {uni.logo}
              </div>

              <h3 className="font-heading text-body font-bold text-navy leading-snug">
                {uni.name}
              </h3>
              <p className="mt-1.5 text-caption text-charcoal-50">{uni.rank}</p>

              {/* Arrow circle */}
              <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button href="/contact" variant="secondary" size="sm">
            Explore All Universities
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default UniversitiesSection;

