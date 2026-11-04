'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { InfoCard } from '../ui/info-card';
import { Button } from '../ui/Button';

/**
 * Premium test-preparation section using the InfoCard component.
 *
 * Uses the original InfoCard at 388×378 with inner 354×344, the exact
 * dimensions the component was designed for. All 5 cards sit in a single
 * horizontal row, centred and scrollable on smaller viewports.
 */

const TEST_CARD_CONFIG = {
  ielts: {
    fallbackImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    borderColor: '#E00000',
    effectBgColor: '#E00000',
    hoverTextColor: '#fff',
  },
  pte: {
    fallbackImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    borderColor: '#9F4EFF',
    effectBgColor: '#9F4EFF',
    hoverTextColor: '#fff',
  },
  toefl: {
    fallbackImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
    borderColor: '#2196F3',
    effectBgColor: '#2196F3',
    hoverTextColor: '#fff',
  },
  gre: {
    fallbackImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    borderColor: '#FF5613',
    effectBgColor: '#FF5613',
    hoverTextColor: '#fff',
  },
  gmat: {
    fallbackImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    borderColor: '#14243A',
    effectBgColor: '#14243A',
    hoverTextColor: '#fff',
  },
};

export function TestPrepSection({ testPreparation = [] }) {
  if (!testPreparation.length) return null;

  return (
    <section
      id="test-preparation"
      aria-labelledby="test-prep-heading"
      className="relative w-full overflow-hidden bg-ivory py-16 lg:py-24"
    >
      <div className="shell relative z-10">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-3">
              <span className="eyebrow">Training</span>
              <span className="h-[2px] w-10 rounded-full bg-accent inline-block" />
            </div>
            <h2
              id="test-prep-heading"
              className="mt-3 font-heading font-bold text-navy"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
            >
              Test <span className="text-accent">Preparation</span>
            </h2>
            <p className="mt-4 text-lead text-charcoal-70">
              Coaching for the English language tests and the graduate entrance
              tests, taught in person by qualified teachers.
            </p>
          </div>
          <Button href="/test-preparation" variant="secondary" className="shrink-0 self-start lg:self-auto">
            All programmes
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </header>
      </div>

      {/* Cards row — full-width, horizontally scrollable on small screens, centred on large */}
      <div className="w-full overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-0">
        <div
          className="flex justify-center gap-5 mx-auto"
          style={{ minWidth: 'max-content', padding: '8px 0' }}
        >
          {testPreparation.map((test) => {
            const config = TEST_CARD_CONFIG[test.slug] || TEST_CARD_CONFIG.ielts;

            return (
              <Link
                key={test.slug}
                href={`/test-preparation/${test.slug}`}
                className="block shrink-0 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 rounded-2xl"
              >
                <InfoCard
                  image={config.fallbackImage}
                  title={test.name}
                  description={test.summary || test.fullName || ''}
                  width={388}
                  height={378}
                  borderColor={config.borderColor}
                  borderBgColor="var(--border-bg-color)"
                  borderWidth={3}
                  borderPadding={14}
                  cardBgColor="var(--card-bg-color)"
                  shadowColor="var(--shadow-color)"
                  textColor="var(--text-color)"
                  hoverTextColor={config.hoverTextColor}
                  fontFamily="var(--font-heading), 'Manrope', sans-serif"
                  rtlFontFamily="var(--font-heading), sans-serif"
                  effectBgColor={config.effectBgColor}
                  patternColor1="var(--pattern-color1)"
                  patternColor2="var(--pattern-color2)"
                  contentPadding="14.3px 16px"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TestPrepSection;
