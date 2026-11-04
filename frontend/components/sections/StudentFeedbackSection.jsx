'use client';

import React from 'react';
import { StaggerTestimonials } from '../ui/stagger-testimonials';

/**
 * StudentFeedbackSection
 *
 * Implements the Student Feedback section with bespoke travel & wave decorative
 * backgrounds matching the design reference:
 * - Upper-right: subtle dotted world map, red dashed flight loop, red airplane SVG
 * - Bottom-left: flowing navy blue wave with a floating red accent curve above it
 * - Bottom-right: flowing red wave entering from the bottom-right corner
 * - Centre: strictly preserved 3D StaggerTestimonials carousel
 */
export function StudentFeedbackSection() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative w-full overflow-hidden bg-ivory py-16 lg:py-24"
    >
      {/* Fallback anchor target if user or code links to #student-feedback */}
      <span id="student-feedback" className="sr-only" aria-hidden="true" />

      {/* 1. Upper-Right Travel Illustration: Dotted World Map + Flight Loop + Airplane */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-2 right-0 sm:right-4 md:right-8 lg:right-12 z-0 hidden sm:block w-[320px] md:w-[420px] lg:w-[500px] h-auto select-none overflow-visible"
      >
        <svg
          viewBox="0 0 520 260"
          fill="none"
          className="w-full h-auto overflow-visible"
        >
          <defs>
            <pattern
              id="student-feedback-world-dots"
              x="0"
              y="0"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="4" cy="4" r="1.3" fill="#94A3B8" opacity="0.45" />
            </pattern>
          </defs>

          {/* Continents filled with dotted matrix pattern */}
          {/* North America */}
          <path
            d="M 40,30 Q 70,18 115,22 Q 145,30 150,50 Q 155,70 135,80 Q 115,98 100,108 Q 85,118 70,88 Q 50,60 40,30 Z M 135,10 Q 160,6 170,18 Q 160,32 135,25 Z"
            fill="url(#student-feedback-world-dots)"
          />
          {/* South America */}
          <path
            d="M 98,115 Q 125,120 135,140 Q 140,170 130,202 Q 120,225 110,235 Q 98,220 92,175 Q 88,140 98,115 Z"
            fill="url(#student-feedback-world-dots)"
          />
          {/* Europe */}
          <path
            d="M 188,35 Q 228,25 248,38 Q 252,58 232,72 Q 212,78 198,68 Q 185,52 188,35 Z M 178,28 Q 188,18 192,28 Q 182,38 178,28 Z M 208,8 Q 232,6 238,22 Q 222,32 208,22 Z"
            fill="url(#student-feedback-world-dots)"
          />
          {/* Africa */}
          <path
            d="M 188,80 Q 238,75 252,105 Q 258,145 238,182 Q 222,208 208,202 Q 192,178 182,140 Q 178,105 188,80 Z M 255,160 Q 262,155 260,172 Q 252,175 255,160 Z"
            fill="url(#student-feedback-world-dots)"
          />
          {/* Asia */}
          <path
            d="M 252,28 Q 312,12 380,18 Q 420,32 425,65 Q 410,95 372,105 Q 332,120 312,100 Q 288,120 268,95 Q 252,70 252,28 Z M 342,110 Q 368,105 378,125 Q 362,140 342,130 Z M 415,50 Q 425,45 422,60 Q 412,62 415,50 Z"
            fill="url(#student-feedback-world-dots)"
          />
          {/* Australia & NZ */}
          <path
            d="M 360,158 Q 415,152 425,178 Q 420,212 385,218 Q 355,208 355,178 Q 355,162 360,158 Z M 432,200 Q 442,195 438,215 Q 428,220 432,200 Z"
            fill="url(#student-feedback-world-dots)"
          />

          {/* Dotted Flight Loop Path */}
          <path
            d="M 250 155 C 280 180 305 190 325 180 C 345 170 355 145 340 128 C 325 110 300 120 310 150 C 316 168 338 174 365 156 C 392 138 425 104 452 64"
            stroke="#D00100"
            strokeWidth="2"
            strokeDasharray="5 5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Red Airplane */}
          <g transform="translate(452, 64) rotate(-38)">
            <path
              d="M 0 -17 C 1.2 -17 2 -15 2 -13 L 2 -3 L 17 6 L 17 9.5 L 2 5.5 L 2 14 L 6.5 17.5 L 6.5 20 L 0 18.5 L -6.5 20 L -6.5 17.5 L -2 14 L -2 5.5 L -17 9.5 L -17 6 L -2 -3 L -2 -13 C -2 -15 -1.2 -17 0 -17 Z"
              fill="#D00100"
            />
          </g>
        </svg>
      </div>

      {/* 2. Bottom-Left Navy Wave + Red Accent Curve */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-0 w-[200px] sm:w-[280px] md:w-[350px] lg:w-[420px] select-none"
      >
        <svg
          viewBox="0 0 350 154"
          fill="none"
          className="w-full h-auto overflow-visible"
        >
          {/* Red Accent Curved Line floating above navy */}
          <path
            d="M 0 74 C 25 80, 50 96, 75 116 C 90 128, 105 136, 120 140"
            stroke="#D00100"
            strokeWidth="8"
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

      {/* 3. Bottom-Right Red Wave */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-0 w-[160px] sm:w-[220px] md:w-[274px] lg:w-[340px] select-none"
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

      {/* 4. Main Content Container (relative z-10) */}
      <div className="shell relative z-10">
        <header className="mb-8 flex flex-col gap-4 lg:mb-10">
          <div className="max-w-prose">
            <div className="inline-flex items-center gap-3">
              <span className="eyebrow">Student Feedback</span>
              <span className="h-[2px] w-10 rounded-full bg-accent inline-block" />
            </div>
            <h2
              id="reviews-heading"
              className="mt-3 text-h2 font-bold text-navy"
            >
              What Our Students Say
            </h2>
            <p className="mt-4 text-lead text-charcoal-70">
              Hear from students and professionals who navigated their university admissions, test coaching and visa journey with Shine Consultant.
            </p>
          </div>
        </header>

        {/* 5. Center Carousel (strictly 100% untouched) */}
        <StaggerTestimonials />
      </div>
    </section>
  );
}

export default StudentFeedbackSection;
