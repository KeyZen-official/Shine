'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  GraduationCap,
  FilePenLine,
  HandCoins,
  FileCheck,
  Plane,
  ArrowRight,
  Calendar,
} from 'lucide-react';

/**
 * The 6 core study abroad services featured in the Services section.
 * Each service links directly to its existing route.
 */
export const CORE_SERVICES = [
  {
    id: 'career-counselling',
    title: 'Career Counselling',
    description:
      'Personalised guidance to choose the right career path based on your goals, profile and interests.',
    href: '/services/career-counselling',
    icon: Users,
  },
  {
    id: 'university-selection',
    title: 'University Selection',
    description:
      'Shortlisting the best universities and courses that match your academic background and aspirations.',
    href: '/services/university-selection',
    icon: GraduationCap,
  },
  {
    id: 'university-application',
    title: 'University Application',
    description:
      'End-to-end support with accurate and compelling university applications.',
    href: '/services/university-application',
    icon: FilePenLine,
  },
  {
    id: 'scholarship-help',
    title: 'Scholarship Help',
    description:
      'Guidance to identify and apply for suitable scholarships and financial aid.',
    href: '/services/scholarship-help',
    icon: HandCoins,
  },
  {
    id: 'visa-assistance',
    title: 'Visa Assistance',
    description:
      'Expert support for a smooth and successful student visa application process.',
    href: '/services/visa-assistance',
    icon: FileCheck,
  },
  {
    id: 'pre-and-post-departure-sessions',
    title: 'Pre- and Post-Departure Sessions',
    description:
      'Complete guidance for a confident start, from travel preparation to settling abroad.',
    href: '/services/pre-and-post-departure-sessions',
    icon: Plane,
  },
];

/**
 * ServicesSection
 *
 * Implements the expansive two-column "Our Services" layout matching the design reference:
 * - Left column (~42%): Large header with curved underline, prominent education collage
 *   with bold red backing & floating card, and dual large CTAs.
 * - Right column (~58%): Six spacious horizontal service cards connected by a curved mint
 *   timeline line with 6 white-bordered red circular markers.
 * - Surrounding decorative elements: Dotted world map, looped flight trail, red airplane SVG,
 *   navy bottom-left wave with red accent, and red bottom-right wave.
 */
export function ServicesSection({ services }) {
  const items = CORE_SERVICES;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative w-full overflow-hidden bg-[#E6F0EC] py-20 lg:py-28"
    >
      {/* 1. Bottom-Left Corner Wave (Navy + Red Accent Curve) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-0 w-[240px] sm:w-[320px] md:w-[420px] lg:w-[500px] select-none"
      >
        <svg
          viewBox="0 0 350 154"
          fill="none"
          className="w-full h-auto overflow-visible"
        >
          {/* Red Accent Curve */}
          <path
            d="M 0 74 C 25 80, 50 96, 75 116 C 90 128, 105 136, 120 140"
            stroke="#D00100"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />
          {/* Navy Main Wave */}
          <path
            d="M 0 88 C 30 92, 60 115, 95 132 C 130 143, 165 150, 195 154 L 0 154 Z"
            fill="#14243A"
          />
        </svg>
      </div>

      {/* 2. Bottom-Right Corner Wave (Bold Red Wave) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-0 w-[180px] sm:w-[250px] md:w-[320px] lg:w-[400px] select-none"
      >
        <svg
          viewBox="0 0 274 154"
          fill="none"
          className="w-full h-auto overflow-visible"
        >
          <path
            d="M 274 95 C 245 106, 210 120, 180 132 C 155 142, 140 151, 125 154 L 274 154 Z"
            fill="#D00100"
          />
        </svg>
      </div>

      {/* 3. Main Content Container (Wide & Spacious) */}
      <div className="relative z-10 w-full max-w-[1440px] xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center">
          {/* ======================================================== */}
          {/* LEFT COLUMN (~42%): Headings, Image Collage, Dual CTAs   */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Header Block */}
            <div className="mb-8 lg:mb-10">
              <div className="inline-flex items-center gap-2.5">
                <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-accent">
                  HOW WE HELP
                </span>
                <span className="h-[2px] w-8 rounded-full bg-accent inline-block" />
              </div>

              <h2
                id="services-heading"
                className="mt-3.5 text-4xl sm:text-5xl lg:text-[3.35rem] xl:text-[3.65rem] font-extrabold text-navy leading-[1.08] tracking-tight"
              >
                <span className="text-navy">Our </span>
                <span className="relative inline-block text-accent">
                  Services
                  {/* Curved Red Smile Underline */}
                  <svg
                    className="absolute -bottom-2.5 sm:-bottom-3.5 left-0 w-full h-4 overflow-visible pointer-events-none"
                    viewBox="0 0 180 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 4 8 C 55 17, 135 17, 176 5"
                      stroke="#D00100"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>

              <p className="mt-5 text-base sm:text-lg lg:text-[1.125rem] text-charcoal/80 leading-relaxed max-w-lg">
                End-to-end support for your global education journey, from planning to post-arrival.
              </p>
            </div>

            {/* Prominent Education Photo & Collage Composition */}
            <div className="relative w-full max-w-[520px] sm:max-w-[560px] lg:max-w-none pr-3 sm:pr-6 pb-6 sm:pb-8">
              {/* Dotted World Map & Airplane behind top-right of photo */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-12 -right-8 sm:-top-16 sm:-right-10 w-72 sm:w-80 h-40 z-0 select-none overflow-visible hidden sm:block"
              >
                <svg viewBox="0 0 280 150" fill="none" className="w-full h-full">
                  <defs>
                    <pattern
                      id="services-refined-world-dots"
                      x="0"
                      y="0"
                      width="7"
                      height="7"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="3.5" cy="3.5" r="1.1" fill="#94A3B8" opacity="0.45" />
                    </pattern>
                  </defs>
                  {/* Subtle map continent silhouette */}
                  <path
                    d="M 20 20 Q 70 10 120 15 Q 180 25 200 55 Q 160 85 110 90 Q 50 85 20 50 Z"
                    fill="url(#services-refined-world-dots)"
                  />
                  {/* Red looped flight trail */}
                  <path
                    d="M 70 95 C 105 110 135 115 152 105 C 170 95 172 72 154 62 C 138 52 128 70 142 85 C 160 102 200 85 240 45"
                    stroke="#D00100"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                  />
                  {/* Red airplane SVG */}
                  <g transform="translate(244, 42) rotate(-35) scale(0.85)">
                    <path
                      d="M 0 -17 C 1.2 -17 2 -15 2 -13 L 2 -3 L 17 6 L 17 9.5 L 2 5.5 L 2 14 L 6.5 17.5 L 6.5 20 L 0 18.5 L -6.5 20 L -6.5 17.5 L -2 14 L -2 5.5 L -17 9.5 L -17 6 L -2 -3 L -2 -13 C -2 -15 -1.2 -17 0 -17 Z"
                      fill="#D00100"
                    />
                  </g>
                </svg>
              </div>

              {/* Bold Red Decorative Backing Shape (wrapping top-left) */}
              <div
                aria-hidden="true"
                className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-56 sm:w-72 h-56 sm:h-72 bg-accent rounded-tl-[52px] sm:rounded-tl-[64px] rounded-bl-[44px] sm:rounded-bl-[56px] rounded-br-[96px] rounded-tr-[36px] -z-10 shadow-xl pointer-events-none"
              />

              {/* Main Rounded Education Photograph with Thick White Frame & Depth */}
              <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden border-[6px] sm:border-[8px] border-white shadow-[0_20px_50px_rgba(20,40,64,0.18)] bg-white aspect-[4/3] -rotate-[0.75deg] hover:rotate-0 transition-transform duration-500">
                <img
                  src="/imagery/services-education.webp"
                  alt="Study abroad books, graduation cap, and desk globe"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Floating Information Card overlapping bottom-right */}
              <div className="absolute -bottom-5 -right-3 sm:-bottom-7 sm:right-0 z-20 bg-white rounded-2xl sm:rounded-[24px] shadow-[0_12px_36px_rgba(20,40,64,0.16)] p-3.5 sm:p-4.5 border border-navy/5 flex items-center gap-3.5 sm:gap-4 max-w-[240px] sm:max-w-[270px]">
                {/* Celebratory Red Accent Sparks */}
                <div
                  className="absolute -top-3.5 -right-1.5 text-accent select-none pointer-events-none"
                  aria-hidden="true"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  >
                    <line x1="6" y1="6" x2="3" y2="3" />
                    <line x1="12" y1="4" x2="12" y2="0.5" />
                    <line x1="18" y1="6" x2="21" y2="3" />
                  </svg>
                </div>

                {/* Mint Icon Badge with Red Graduation Cap */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#E8F3EE] flex items-center justify-center shrink-0">
                  <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 text-accent stroke-[1.8]" />
                </div>

                {/* Text Block */}
                <div className="flex flex-col pr-1">
                  <span className="font-heading font-extrabold text-xs sm:text-[0.925rem] text-navy leading-tight">
                    Complete<br />Study Abroad<br />Support
                  </span>
                  <span className="w-10 h-1 bg-accent rounded-full mt-2" />
                </div>
              </div>
            </div>

            {/* Dual CTA Buttons (Large & Prominent) */}
            <div className="mt-9 sm:mt-12 flex flex-wrap items-center gap-4">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-accent hover:bg-accent-hover text-white font-bold px-8 sm:px-9 py-4 text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>All Services</span>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-white/95 hover:bg-white border-2 border-navy text-navy font-bold px-7 sm:px-8 py-4 text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <Calendar className="h-5 w-5 text-navy" aria-hidden="true" />
                <span>Book Free Consultation</span>
              </Link>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN (~58%): Six Spacious Horizontal Cards       */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 relative flex flex-col justify-center">
            {/* Vertical Flowing Mint Connecting Line with 6 Red Node Markers (desktop only) */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute -left-9 xl:-left-11 top-4 bottom-4 w-12 pointer-events-none select-none z-0"
            >
              <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 45 660"
                fill="none"
                preserveAspectRatio="none"
              >
                {/* Flowing curve line */}
                <path
                  d="M 36 20 C 10 160, 10 500, 36 640"
                  stroke="#A8D4C4"
                  strokeWidth="2.5"
                  fill="none"
                />
                {/* 6 Circular Red Markers aligned with card vertical centers */}
                <circle cx="34" cy="52" r="5.5" fill="#D00100" stroke="#FFFFFF" strokeWidth="2.5" />
                <circle cx="21" cy="164" r="5.5" fill="#D00100" stroke="#FFFFFF" strokeWidth="2.5" />
                <circle cx="13" cy="276" r="5.5" fill="#D00100" stroke="#FFFFFF" strokeWidth="2.5" />
                <circle cx="13" cy="388" r="5.5" fill="#D00100" stroke="#FFFFFF" strokeWidth="2.5" />
                <circle cx="21" cy="500" r="5.5" fill="#D00100" stroke="#FFFFFF" strokeWidth="2.5" />
                <circle cx="34" cy="608" r="5.5" fill="#D00100" stroke="#FFFFFF" strokeWidth="2.5" />
              </svg>
            </div>

            {/* Vertical Stack of 6 Spacious Horizontal Cards */}
            <div className="flex flex-col gap-4 sm:gap-4.5 relative z-10 w-full">
              {items.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="group relative flex items-center gap-4 sm:gap-5 bg-white rounded-[28px] sm:rounded-[36px] py-4 sm:py-4.5 px-5 sm:px-7 border border-navy/5 shadow-[0_4px_24px_rgba(20,40,64,0.06)] w-full"
                  >
                    {/* Left Icon Pill with Mint Background */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#E5F2EC] flex items-center justify-center shrink-0">
                      <IconComponent className="h-7 w-7 sm:h-8 sm:w-8 text-navy stroke-[1.8]" />
                    </div>

                    {/* Thin Vertical Mint Separator */}
                    <div className="h-10 w-[1.5px] bg-[#C8E2D7] shrink-0 mx-1 sm:mx-2 hidden sm:block" />

                    {/* Title & Description */}
                    <div className="flex-1 min-w-0 pr-1">
                      <h3 className="font-heading font-extrabold text-base sm:text-[1.18rem] text-navy leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-[0.915rem] text-charcoal/70 leading-normal line-clamp-2 mt-0.5 sm:mt-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
