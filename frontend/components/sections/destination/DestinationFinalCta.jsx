import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DestinationFinalCta({ destination }) {
  const isUsa = destination.slug === 'usa';
  const headingTitle = isUsa ? 'American Education' : `${destination.name} Education`;

  return (
    <section id="cta" className="relative overflow-hidden bg-navy on-navy">
      {/* Decorative top red accent stripe */}
      <span
        className="absolute inset-x-0 top-0 h-1 bg-accent"
        aria-hidden="true"
      />

      <div className="shell py-20 pb-28 text-center lg:py-24 lg:pb-24">
        <h2 className="mx-auto max-w-3xl text-3xl sm:text-4xl lg:text-h1 font-extrabold text-white">
          Your <span className="text-accent">{headingTitle}</span> Journey Starts Here.
        </h2>

        <p className="mx-auto mt-5 max-w-prose text-lead text-white/75">
          Let Shine Consultant guide you through university selection, applications, visa assistance and your journey towards studying in {destination.name}.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/book-consultation" size="lg">
            Book Free Consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default DestinationFinalCta;
