'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, GraduationCap, Briefcase, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const FLAG_MAP = {
  usa: '🇺🇸',
  uk: '🇬🇧',
  canada: '🇨🇦',
  australia: '🇦🇺',
  germany: '🇩🇪',
  ireland: '🇮🇪',
  malaysia: '🇲🇾',
  'new-zealand': '🇳🇿',
  dubai: '🇦🇪',
  europe: '🇪🇺',
};

export function DestinationHero({ destination, pageData }) {
  const flagEmoji = FLAG_MAP[destination.slug] || '🎓';
  const heroImage =
    destination.heroImage ||
    destination.cardImage ||
    `/destinations/${destination.slug}.jpg`;

  const heroIntro =
    pageData?.heroIntro ||
    destination.shortIntroduction ||
    `Discover world-class universities, innovative learning environments and opportunities to build your international career.`;

  return (
    <section className="relative overflow-hidden bg-[#FAF8F3] pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 border-b border-navy/10">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            {/* Small Red Eyebrow */}
            <div className="inline-flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-accent">
                STUDY DESTINATION
              </span>
              <span className="h-[2px] w-8 rounded-full bg-accent inline-block" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-navy leading-[1.12] tracking-tight">
              Study in the{' '}
              <span className="relative inline-block text-accent">
                {destination.name}
                {/* Red Underline Wave */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-accent pointer-events-none"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 9.5C50 2 150 2 198 9.5"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="mt-5 text-base sm:text-lg text-charcoal/80 leading-relaxed max-w-2xl font-normal">
              {heroIntro}
            </p>

            {/* CTA Buttons Row */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                href="/book-consultation"
                variant="primary"
                className="bg-accent text-white hover:bg-accent-hover px-6 sm:px-7 py-3 rounded-lg font-heading text-sm sm:text-base font-bold shadow-md inline-flex items-center gap-2 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Book Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                href="#universities"
                variant="secondary"
                className="border border-navy/20 bg-white text-navy hover:bg-navy/5 px-6 sm:px-7 py-3 rounded-lg font-heading text-sm sm:text-base font-semibold shadow-xs"
              >
                Explore Universities
              </Button>
            </div>

            {/* Key Feature Badges Row */}
            <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-3.5">
              <div className="inline-flex items-center gap-2.5 rounded-xl border border-navy/10 bg-white px-3.5 py-2.5 shadow-xs">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <span className="font-heading text-xs sm:text-sm font-bold text-navy">
                  World-Class Universities
                </span>
              </div>

              <div className="inline-flex items-center gap-2.5 rounded-xl border border-navy/10 bg-white px-3.5 py-2.5 shadow-xs">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Briefcase className="h-4 w-4" />
                </div>
                <span className="font-heading text-xs sm:text-sm font-bold text-navy">
                  Diverse Career Opportunities
                </span>
              </div>

              <div className="inline-flex items-center gap-2.5 rounded-xl border border-navy/10 bg-white px-3.5 py-2.5 shadow-xs">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Users className="h-4 w-4" />
                </div>
                <span className="font-heading text-xs sm:text-sm font-bold text-navy">
                  Global Student Community
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Red Wave Curve & Floating Badge */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Main Landmark Image Container */}
              <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] shadow-2xl border-4 border-white bg-slate-100 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3]">
                <img
                  src={heroImage}
                  alt={`Study in ${destination.name} — iconic landmark`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  priority="true"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Signature Red Wave Swoop at bottom of image */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-1 -left-2 -right-2 pointer-events-none"
                >
                  <svg
                    viewBox="0 0 500 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    className="w-full h-9 sm:h-12 text-accent fill-current opacity-90"
                  >
                    <path d="M0 60C150 15 350 45 500 15V60H0Z" />
                  </svg>
                </div>
              </div>

              {/* Floating Pill on bottom right: "Your Global Education Journey Starts Here." */}
              <div className="absolute -bottom-5 sm:-bottom-6 right-2 sm:right-6 z-20">
                <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 sm:px-5 sm:py-3.5 shadow-xl border border-navy/10 backdrop-blur-md">
                  <span className="text-2xl sm:text-3xl shrink-0" role="img" aria-label={`${destination.name} flag`}>
                    {flagEmoji}
                  </span>
                  <div>
                    <p className="font-heading text-xs sm:text-sm font-extrabold text-navy leading-tight">
                      Your Global Education
                    </p>
                    <p className="font-heading text-micro sm:text-xs font-semibold text-accent leading-tight">
                      Journey Starts Here.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DestinationHero;

