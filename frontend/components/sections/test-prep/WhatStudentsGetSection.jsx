'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const BENEFITS = [
  'Mock tests under timed conditions',
  'Practice sessions for all four skills',
  'Qualified, experienced trainers',
  'Personalised study plan',
  'Question-specific tips and strategies',
  'Detailed written feedback',
];

export function WhatStudentsGetSection({
  image = '/imagery/ielts-student-headphones.jpg',
  fallbackImage = '/imagery/services-education.jpg',
}) {
  const [imgSrc, setImgSrc] = React.useState(image);

  return (
    <section id="what-students-get" className="section-y bg-[#FAF9F5]">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading & 6 Compact White Cards in 2 columns */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-navy leading-tight tracking-tight mb-8">
              What Students Get
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BENEFITS.map((benefit, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-navy/10 bg-white p-4 sm:p-5 shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-3.5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <CheckCircle2 className="h-4.5 w-4.5 text-accent stroke-[2.5]" />
                  </span>
                  <span className="font-heading text-sm font-bold text-navy leading-snug">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Student with Headphones & Red Accent Top-Right Curve */}
          <div className="lg:col-span-5 relative">
            {/* Red Accent Decorative Corner Curve on Top-Right */}
            <div
              aria-hidden="true"
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-28 sm:w-36 h-28 sm:h-36 bg-accent rounded-tr-[36px] rounded-bl-[48px] -z-0 opacity-95 shadow-md"
            />

            <div className="relative z-10 overflow-hidden rounded-[28px] sm:rounded-[36px] shadow-2xl border-4 border-white bg-navy aspect-[4/3] sm:aspect-[16/12]">
              <img
                src={imgSrc}
                alt="Indian student wearing headphones studying with laptop in library"
                onError={() => setImgSrc(fallbackImage)}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatStudentsGetSection;

