import React from 'react';
import {
  BookOpen, FileText, FolderOpen, Stamp, Plane,
} from 'lucide-react';

const STEP_ICONS = [BookOpen, FileText, FolderOpen, Stamp, Plane];

/**
 * Visa process timeline: horizontal 5-step process with icons,
 * step numbers and connecting lines between them.
 */
export function VisaTimeline({ destination, visaSteps = [] }) {
  if (!visaSteps?.length) return null;

  return (
    <section id="visa" className="bg-white section-y">
      <div className="shell">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="eyebrow">Visa Process</span>
          <span className="h-[2px] w-10 rounded-full bg-accent inline-block" />
        </div>
        <h2 className="text-h2 font-bold text-navy">
          {destination.name} Student Visa Process
        </h2>

        {/* Timeline */}
        <div className="mt-10 relative">
          {/* Connecting line — desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-[2px] bg-navy/10"
          />

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {visaSteps.map((step, i) => {
              const IconComponent = STEP_ICONS[i] || FileText;
              return (
                <div key={i} className="flex flex-col items-center text-center relative">
                  {/* Icon circle */}
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-ivory border-2 border-navy/10 shadow-panel transition-all duration-300 hover:border-accent hover:shadow-card">
                    <IconComponent className="h-7 w-7 text-navy" />
                  </div>

                  {/* Step info */}
                  <p className="mt-4 font-heading text-caption font-bold text-navy">
                    {step.step}. {step.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisaTimeline;

