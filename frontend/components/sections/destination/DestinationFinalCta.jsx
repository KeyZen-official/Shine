import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Brandmark } from '@/components/brand/Brandmark';

export function DestinationFinalCta({ destination }) {
  const isUsa = destination.slug === 'usa';
  const headingTitle = isUsa ? 'American Education' : `${destination.name} Education`;

  return (
    <section id="cta" className="section-y bg-white">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#10243D] p-8 sm:p-12 lg:p-14 text-white shadow-2xl border border-white/10">
          {/* Subtle Red Swoosh Gradient in Background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-tl from-accent/40 via-accent/15 to-transparent blur-3xl"
          />

          {/* Decorative NYC / Skyline silhouette if USA */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0 top-0 w-1/3 opacity-10 flex items-end justify-end overflow-hidden"
          >
            <svg viewBox="0 0 400 300" className="w-full h-auto text-white fill-current">
              <path d="M 50 300 L 50 120 L 70 120 L 70 300 Z M 80 300 L 80 80 L 110 80 L 110 300 Z M 120 300 L 120 150 L 150 150 L 150 300 Z M 160 300 L 160 60 L 170 30 L 180 60 L 180 300 Z M 190 300 L 190 100 L 220 100 L 220 300 Z M 230 300 L 230 140 L 260 140 L 260 300 Z M 270 300 L 270 40 L 280 20 L 290 40 L 290 300 Z M 300 300 L 300 110 L 330 110 L 330 300 Z M 340 300 L 340 90 L 370 90 L 370 300 Z" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Brandmark (2 cols) */}
            <div className="lg:col-span-3 flex items-center">
              <div className="bg-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-sm border border-white/15">
                <Brandmark variant="compact" className="h-10 sm:h-12 w-auto" />
              </div>
            </div>

            {/* Centre: Headline & Description (6 cols) */}
            <div className="lg:col-span-6">
              <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold text-white leading-tight">
                Your <span className="text-accent">{headingTitle}</span> Journey Starts Here.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
                Let Shine Consultant guide you through university selection, applications, visa assistance and your journey towards studying in {destination.name}.
              </p>
            </div>

            {/* Right: Actions (3 cols) */}
            <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-3.5">
              <Link
                href="/book-consultation"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-heading text-sm font-bold text-white shadow-card transition-all duration-300 hover:bg-accent-hover hover:-translate-y-0.5"
              >
                Book Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 font-heading text-sm font-bold text-white transition-all duration-300 hover:bg-white hover:text-navy hover:border-white backdrop-blur-sm"
              >
                Contact Our Experts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DestinationFinalCta;

