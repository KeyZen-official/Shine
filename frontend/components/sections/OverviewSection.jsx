import React from 'react';
import {
  Award, Briefcase, Users, TrendingUp, GraduationCap,
  Globe, Shield, Sun, Heart, Cog, Mountain, Leaf,
} from 'lucide-react';

const ICON_MAP = {
  Award, Briefcase, Users, TrendingUp, GraduationCap,
  Globe, Shield, Sun, Heart, Cog, Mountain, Leaf,
};

/**
 * Overview section: two columns with "Why Study in [Country]?" heading,
 * descriptive text, benefit checkpoints, and a key benefits strip below.
 */
export function OverviewSection({ destination, overviewData, keyBenefits }) {
  if (!overviewData) return null;

  return (
    <section id="overview" className="bg-ivory section-y">
      <div className="shell">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 items-start">
          {/* Left — text */}
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="eyebrow">Overview</span>
              <span className="h-[2px] w-10 rounded-full bg-accent inline-block" />
            </div>
            <h2 className="text-h2 font-bold text-navy">
              {overviewData.title || `Why Study in ${destination.name}?`}
            </h2>
            <p className="mt-4 text-body text-charcoal-70 leading-relaxed">
              {overviewData.description}
            </p>

            {/* Benefit checkpoints */}
            {overviewData.benefits?.length > 0 && (
              <ul className="mt-6 space-y-3">
                {overviewData.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-body text-charcoal-70">{benefit}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right — country image with video overlay feel */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-card">
              <img
                src={`/destinations/${destination.slug}.jpg`}
                alt={`Studying in ${destination.name}`}
                className="w-full h-auto object-cover aspect-[4/3]"
                loading="lazy"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-end justify-start p-5">
                <div className="flex items-center gap-2.5 rounded-full bg-navy/80 px-4 py-2.5 backdrop-blur-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                    <svg className="h-3.5 w-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="text-caption text-white font-medium">
                    Watch: Student Life in {destination.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits strip */}
        {keyBenefits?.length > 0 && (
          <div className="mt-10 rounded-xl border border-navy/10 bg-white p-4 shadow-panel">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="font-heading text-h3 font-bold text-navy italic px-3 shrink-0">
                Key Benefits
              </span>
              {keyBenefits.map((item, i) => {
                const IconComponent = ICON_MAP[item.icon] || Award;
                return (
                  <div key={i} className="flex items-center gap-2.5 px-3 py-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
                      <IconComponent className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-caption font-semibold text-navy">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default OverviewSection;

