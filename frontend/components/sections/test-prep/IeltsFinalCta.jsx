'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function IeltsFinalCta() {
  return (
    <section className="pb-16 sm:pb-20 pt-4 bg-[#FAF9F5]">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[32px] bg-[#0B192B] p-8 sm:p-12 shadow-2xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Global Landmark Skyline Vector Graphic */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start">
              <svg
                viewBox="0 0 280 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-48 sm:w-56 h-auto text-white/40"
                aria-hidden="true"
              >
                {/* London Eye */}
                <circle cx="170" cy="65" r="32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="170" cy="65" r="4" fill="currentColor" />
                <path d="M170 65L170 115M170 65L145 115M170 65L195 115" stroke="currentColor" strokeWidth="1.5" />
                {/* Big Ben Spire */}
                <path d="M45 115V45L55 20L65 45V115H45Z" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="55" cy="55" r="5" stroke="currentColor" strokeWidth="1.2" />
                {/* European Domes & Towers */}
                <path d="M90 115V60C90 48 108 48 108 60V115" stroke="currentColor" strokeWidth="1.5" />
                <path d="M225 115V35L235 15L245 35V115" stroke="currentColor" strokeWidth="1.5" />
                {/* Ground Base */}
                <line x1="10" y1="115" x2="270" y2="115" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>

            {/* Centre: Heading & Description */}
            <div className="lg:col-span-6 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight mb-3">
                Ready to Achieve Your Target IELTS Score?
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
                Join Shine Consultant’s IELTS preparation programme and take a confident step towards your global goals.
              </p>
            </div>

            {/* Right: Bright Red Rounded Button */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end">
              <Button
                href="/book-consultation"
                variant="primary"
                className="bg-accent text-white hover:bg-accent-hover px-7 py-3.5 rounded-full font-heading text-sm sm:text-base font-bold shadow-lg inline-flex items-center gap-2 transition-transform duration-300 hover:scale-105"
              >
                Book Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Subtle Background Glow */}
          <div
            aria-hidden="true"
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-accent/15 blur-3xl pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}

export default IeltsFinalCta;

