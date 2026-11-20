'use client';

import React from 'react';

const STEPS = [
  {
    step: '01',
    title: 'Diagnostic Assessment',
    description: 'Evaluate your current English proficiency.',
  },
  {
    step: '02',
    title: 'Identify Weak Areas',
    description: 'Pinpoint specific skills that need improvement.',
  },
  {
    step: '03',
    title: 'Personalised Coaching',
    description: 'Focused training with proven strategies.',
  },
  {
    step: '04',
    title: 'Mock Tests & Practice',
    description: 'Regular practice to build speed and accuracy.',
  },
  {
    step: '05',
    title: 'Progress Evaluation',
    description: 'Track your improvement and stay on target.',
  },
];

export function TeachingApproachSection() {
  return (
    <section id="teaching-approach" className="section-y bg-[#EAF5F1]">
      <div className="shell">
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-navy leading-tight tracking-tight">
            Our Teaching Approach
          </h2>
        </div>

        {/* Horizontal 5-Step Process Timeline with Connecting Line */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-7 left-12 right-12 h-[2px] bg-navy/15 -z-0"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
            {STEPS.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center group"
              >
                {/* Circular Number Indicator */}
                <div className="flex h-14 w-14 sm:h-15 sm:w-15 items-center justify-center rounded-full bg-white border-2 border-accent text-accent font-heading text-lg font-extrabold shadow-md mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                  {item.step}
                </div>

                {/* Title */}
                <h3 className="font-heading text-base sm:text-lg font-bold text-navy leading-snug mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeachingApproachSection;

