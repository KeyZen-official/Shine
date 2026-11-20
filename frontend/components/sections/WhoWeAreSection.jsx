'use client';

import React from 'react';
import Link from 'next/link';
import { Users, GraduationCap, Award, ArrowRight } from 'lucide-react';
import { toParagraphs } from '../../lib/format';

/**
 * Three key highlights with icons and labels matching the reference design.
 */
export const KEY_HIGHLIGHTS = [
  {
    icon: Users,
    title: 'Experienced\nTeam',
  },
  {
    icon: GraduationCap,
    title: 'Personalised\nGuidance',
  },
  {
    icon: Award,
    title: 'Student-First\nApproach',
  },
];

/**
 * WhoWeAreSection
 *
 * Implements the redesigned "Who We Are" section matching the design reference:
 * - Left column (~50%): Eyebrow, two-tone heading with curved underline, supportive copy,
 *   3 horizontal highlights with icons, and red "More about us →" CTA button.
 * - Right column (~50%): Large consultation photograph with thick white border, soft shadow,
 *   bold red backing shape, subtle dotted world map, red looped flight trail, and red airplane SVG.
 * - Surrounding decorative elements: Navy bottom-left wave with red accent curve, red bottom-right wave.
 * - Background: Light mint green / soft aqua (#EAF5F1).
 */
export function WhoWeAreSection({ content }) {
  // Use passed content or fallback to verified company text
  const eyebrow = content?.eyebrow || 'WHO WE ARE';
  const ctaLabel = content?.ctaLabel || 'More about us';
  const paragraphs = content?.body
    ? toParagraphs(content.body)
    : [
        'Shine Consultant is an overseas education, migration consultancy and training organisation based in Mumbai. Our mission is to provide honest, unbiased and professional guidance to people looking to broaden their academic and professional horizons in overseas countries.',
        'We are led by Mrs. Bhadrika Mehta, and our team brings together qualified counsellors, experienced teachers for test preparation, and administrative staff who coordinate across departments.',
      ];

  return (
    <section
      id="who-we-are"
      aria-labelledby="who-we-are-heading"
      className="relative w-full overflow-hidden bg-[#EAF5F1] py-20 lg:py-28"
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

      {/* 3. Main Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center">
          {/* ======================================================== */}
          {/* LEFT COLUMN (~52%): Text, Heading, Highlights & CTA      */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            {/* Header Block */}
            <div>
              <div className="inline-flex items-center gap-2.5">
                <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-accent">
                  {eyebrow}
                </span>
                <span className="h-[2px] w-8 rounded-full bg-accent inline-block" />
              </div>

              <h2
                id="who-we-are-heading"
                className="mt-3.5 text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-extrabold leading-[1.1] tracking-tight"
              >
                <span className="text-navy block">Honest, unbiased,</span>
                <span className="relative inline-block text-accent mt-1">
                  professional guidance.
                  {/* Curved Red Hand-drawn Underline */}
                  <svg
                    className="absolute -bottom-2.5 sm:-bottom-3.5 left-0 w-full h-4 overflow-visible pointer-events-none"
                    viewBox="0 0 240 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 4 8 C 80 17, 180 17, 236 5"
                      stroke="#D00100"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>

              {/* Description Paragraphs */}
              <div className="mt-6 space-y-4 text-base sm:text-lg text-charcoal/80 leading-relaxed max-w-xl">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Three Key Highlights */}
            <div className="mt-8 pt-2 flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 lg:gap-8">
              {KEY_HIGHLIGHTS.map((item, index) => {
                const IconComp = item.icon;
                return (
                  <React.Fragment key={item.title}>
                    {index > 0 && (
                      <div
                        className="hidden sm:block h-9 w-px bg-navy/15 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-sm border border-navy/5 flex items-center justify-center text-accent shrink-0">
                        <IconComp className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <span className="font-heading font-bold text-xs sm:text-caption text-navy leading-snug whitespace-pre-line">
                        {item.title}
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="mt-8 sm:mt-10">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-accent hover:bg-accent-hover text-white font-bold px-8 sm:px-9 py-3.5 text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>{ctaLabel}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN (~48%): Large Consultation Photograph & Art  */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex flex-col items-center justify-center">
            {/* Travel Dotted Map & Airplane illustration above/behind photo */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 -right-6 sm:-top-16 sm:-right-8 w-72 sm:w-80 h-40 z-0 select-none overflow-visible hidden sm:block"
            >
              <svg viewBox="0 0 280 150" fill="none" className="w-full h-full">
                <defs>
                  <pattern
                    id="whoweare-refined-world-dots"
                    x="0"
                    y="0"
                    width="7"
                    height="7"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="3.5" cy="3.5" r="1.1" fill="#94A3B8" opacity="0.45" />
                  </pattern>
                </defs>
                {/* Dotted map shape */}
                <path
                  d="M 20 20 Q 70 10 120 15 Q 180 25 200 55 Q 160 85 110 90 Q 50 85 20 50 Z"
                  fill="url(#whoweare-refined-world-dots)"
                />
                {/* Looped flight trail */}
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

            {/* Photo Collage Wrapper */}
            <div className="relative w-full max-w-[580px] lg:max-w-none pr-2 sm:pr-4">
              {/* Celebratory Red Accent Sparks on top-right */}
              <div
                className="absolute -top-3.5 -right-1 text-accent select-none pointer-events-none z-20 hidden sm:block"
                aria-hidden="true"
              >
                <svg
                  width="24"
                  height="24"
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

              {/* Bold Red Decorative Backing Shape (wrapping top-left) */}
              <div
                aria-hidden="true"
                className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-56 sm:w-68 h-56 sm:h-68 bg-accent rounded-tl-[52px] sm:rounded-tl-[64px] rounded-bl-[44px] sm:rounded-bl-[56px] rounded-br-[96px] rounded-tr-[36px] -z-10 shadow-xl pointer-events-none"
              />

              {/* Large Landscape Photograph with Thick White Frame & Depth */}
              <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden border-[6px] sm:border-[8px] border-white shadow-[0_20px_50px_rgba(20,40,64,0.18)] bg-white aspect-[16/10] -rotate-[0.6deg] hover:rotate-0 transition-transform duration-500">
                <img
                  src="/imagery/counsellor-consultation.webp"
                  alt="Professional education counsellor advising students in a modern consultation office"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhoWeAreSection;

