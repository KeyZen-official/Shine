import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * Final CTA banner: dark navy background with dotted world map pattern,
 * "Ready to Study in [Country]?" heading, subtitle and
 * Book Free Consultation button.
 */
export function DestinationCTA({ destination }) {
  return (
    <section className="relative overflow-hidden bg-navy py-14 lg:py-16">
      {/* Dotted world map pattern */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <svg className="h-full w-full" viewBox="0 0 1200 200" fill="none">
          <defs>
            <pattern id="cta-dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="1200" height="200" fill="url(#cta-dots)" />
        </svg>
      </div>

      {/* Red accent line — top */}
      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-1 bg-accent" />

      <div className="shell relative z-10">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="max-w-xl">
            <h2 className="font-heading text-h2 font-bold text-white">
              Ready to Study in {destination.name}?
            </h2>
            <p className="mt-3 text-lead text-white/70">
              Get expert guidance, university shortlisting and complete application support.
            </p>
          </div>

          <Link
            href="/book-consultation"
            className="inline-flex items-center gap-3 rounded-md border-2 border-white bg-white px-8 py-3.5 font-heading text-body font-bold text-navy shadow-lg transition-all duration-200 hover:bg-transparent hover:text-white hover:-translate-y-0.5"
          >
            Book Free Consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DestinationCTA;

