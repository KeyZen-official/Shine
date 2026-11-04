'use client';

import React from 'react';
import Image from 'next/image';
import {
  GraduationCap, Briefcase, Globe, Shield, Sun, Heart,
  Cog, Mountain, Award, TrendingUp, Users, Leaf,
} from 'lucide-react';
import { Breadcrumbs } from '../ui/Breadcrumbs';

const ICON_MAP = {
  GraduationCap, Briefcase, Globe, Shield, Sun, Heart,
  Cog, Mountain, Award, TrendingUp, Users, Leaf,
};

/**
 * Hero section for destination detail pages.
 *
 * Two-column layout: Left has breadcrumb, heading with country name
 * in red, intro text, and 3 benefit icons. Right has a large country
 * photo with red decorative shape and decorative elements.
 */
export function DestinationHero({ destination, heroData }) {
  const trail = [
    { label: 'Home', href: '/' },
    { label: 'Destinations', href: '/destinations' },
    { label: destination.name, href: `/destinations/${destination.slug}` },
  ];

  const countryImage = `/destinations/${destination.slug}.jpg`;

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0D1829] via-navy to-[#1a3050]">
      {/* Decorative world map dots */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]">
        <svg className="h-full w-full" viewBox="0 0 1200 500" fill="none">
          <defs>
            <pattern id="hero-world-dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="white" />
            </pattern>
          </defs>
          <rect width="1200" height="500" fill="url(#hero-world-dots)" />
        </svg>
      </div>

      {/* Red decorative corner — top left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 -left-6 h-32 w-32 sm:h-48 sm:w-48 rounded-br-[80px] bg-accent/90 z-0"
      />

      {/* Red decorative corner — top right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 sm:h-40 sm:w-40 rounded-bl-[60px] bg-accent/90 z-0"
      />

      <div className="shell relative z-10 py-10 lg:py-16">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumbs trail={trail} surface="navy" />
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left column — text */}
          <div className="max-w-xl">
            <h1
              className="font-heading font-extrabold text-white leading-[1.08]"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Study in the{' '}
              <span className="relative inline-block text-accent">
                {destination.name}
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-3 overflow-visible pointer-events-none"
                  viewBox="0 0 200 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 4 8 C 55 13, 145 13, 196 5"
                    stroke="#D00100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-5 text-lead text-white/80 max-w-lg">
              {heroData?.heroIntro || `Explore study opportunities in ${destination.name}.`}
            </p>

            {/* 3 Hero Benefits */}
            {heroData?.heroBenefits?.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-6">
                {heroData.heroBenefits.map((benefit, i) => {
                  const IconComponent = ICON_MAP[benefit.icon] || GraduationCap;
                  return (
                    <div key={i} className="flex flex-col items-center text-center gap-2 min-w-[80px]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 border border-white/20">
                        <IconComponent className="h-5 w-5 text-accent-onNavy" />
                      </div>
                      <span className="text-caption text-white/75 font-medium leading-tight max-w-[110px]">
                        {benefit.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right column — country image */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Red abstract shape behind image */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 h-[85%] w-[85%] rounded-[32px] bg-accent/20 z-0"
            />

            {/* Main image */}
            <div className="relative z-10 w-full max-w-[480px] overflow-hidden rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <div className="aspect-[4/3] relative">
                <Image
                  src={countryImage}
                  alt={`${destination.name} landmark`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 480px"
                  priority
                />
              </div>
            </div>

            {/* Small floating red accent element */}
            <div
              aria-hidden="true"
              className="absolute -top-3 right-8 lg:right-4 h-6 w-6 rounded-full bg-accent shadow-lg z-20"
            />
            <div
              aria-hidden="true"
              className="absolute top-8 -left-2 lg:left-4 h-4 w-4 rounded-full bg-accent/60 z-20"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DestinationHero;

