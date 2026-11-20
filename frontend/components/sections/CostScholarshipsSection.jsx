import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Cost & Scholarships section: two-column layout.
 * Left: tuition fees and living costs with a subtle image.
 * Right: scholarship info with CTA.
 * Cream/ivory background to stand out.
 */
export function CostScholarshipsSection({ destination, costData, scholarshipData }) {
  if (!costData && !scholarshipData) return null;

  return (
    <section id="cost-scholarships" className="bg-sage section-y">
      <div className="shell">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Cost card */}
          {costData && (
            <div className="flex items-start gap-5 rounded-2xl bg-white p-6 lg:p-8 shadow-panel">
              {/* Small decorative image */}
              <div className="hidden sm:block shrink-0 w-28 h-28 rounded-xl overflow-hidden">
                <img
                  src={`/destinations/${destination.slug}.jpg`}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-heading text-h3 font-bold text-navy italic">
                  Cost of Study
                </h3>
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-caption text-charcoal-50">{costData.tuitionLabel}</p>
                    <p className="font-heading text-body font-bold text-navy">{costData.tuitionRange}</p>
                    <p className="text-caption text-charcoal-50">{costData.tuitionInr}</p>
                  </div>
                  <div>
                    <p className="text-caption text-charcoal-50">{costData.livingLabel}</p>
                    <p className="font-heading text-body font-bold text-navy">{costData.livingRange}</p>
                    <p className="text-caption text-charcoal-50">{costData.livingInr}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Scholarships card */}
          {scholarshipData && (
            <div className="flex flex-col justify-between rounded-2xl bg-white p-6 lg:p-8 shadow-panel">
              <div>
                <h3 className="font-heading text-h3 font-bold text-navy italic">
                  Scholarships
                </h3>
                <p className="mt-4 text-body text-charcoal-70 leading-relaxed">
                  {scholarshipData.description}
                </p>
              </div>

              <div className="mt-6">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-accent px-5 py-2.5 font-heading text-caption font-semibold text-accent transition-all duration-200 hover:bg-accent hover:text-white"
                >
                  Explore Scholarships
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Small decorative scroll image */}
              <div className="hidden lg:block absolute bottom-4 right-6 opacity-10">
                {/* Decorative element handled by the card corner radius */}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CostScholarshipsSection;

