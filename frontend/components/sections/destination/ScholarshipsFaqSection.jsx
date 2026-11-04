'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Award } from 'lucide-react';
import { FaqAccordion } from '@/components/ui/faq-chat-accordion';

export function ScholarshipsFaqSection({
  destination,
  scholarships,
  faqs = [],
}) {
  const scholarshipItems = scholarships?.items || [
    'University-specific scholarships',
    'Merit-based funding opportunities',
    'Need-based financial aid (where available)',
    'Scholarship application guidance',
    'Education cost planning',
  ];

  const studentPhoto = scholarships?.image || '/imagery/usa-student-scholarship.jpg';

  return (
    <section id="scholarships-faqs" className="section-y bg-[#FAF8F3]">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Scholarship Opportunities with Photo */}
          <div className="lg:col-span-5 rounded-[28px] border border-navy/10 bg-white p-7 sm:p-9 shadow-card flex flex-col justify-between">
            <div>
              {/* Photo Banner */}
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-navy/10 shadow-sm mb-6 bg-navy/5">
                <img
                  src={studentPhoto}
                  alt={`Student exploring scholarships in ${destination?.name || 'destination'}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-navy font-heading text-xs font-bold shadow-md">
                  <Award className="h-3.5 w-3.5 text-accent" />
                  Merit &amp; Need-Based Aid
                </div>
              </div>

              <div className="inline-flex items-center gap-2.5 mb-2.5">
                <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-accent">
                  {scholarships?.eyebrow || 'SCHOLARSHIPS'}
                </span>
                <span className="h-[2px] w-8 rounded-full bg-accent inline-block" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy leading-tight tracking-tight mb-5">
                {scholarships?.title || 'Explore Scholarship Opportunities'}
              </h2>

              <ul className="space-y-3">
                {scholarshipItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-charcoal/85 leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-navy/10">
              <Link
                href={scholarships?.ctaHref || '/services/scholarship-help'}
                className="inline-flex items-center gap-2 rounded-xl border border-navy/20 bg-white px-5 py-2.5 font-heading text-sm font-bold text-navy transition-all duration-300 hover:bg-navy hover:text-white hover:border-navy shadow-sm"
              >
                {scholarships?.ctaText || 'Explore Scholarships'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Frequently Asked Questions with Same FaqAccordion as Home Page */}
          <div className="lg:col-span-7 rounded-[28px] border border-navy/10 bg-white p-7 sm:p-9 shadow-card flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2.5 mb-2.5">
                <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-accent">
                  FAQS
                </span>
                <span className="h-[2px] w-8 rounded-full bg-accent inline-block" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy leading-tight tracking-tight mb-6">
                Frequently Asked Questions
              </h2>

              {/* Exact same FaqAccordion component used on the Home Page */}
              <FaqAccordion
                data={faqs.map((f, i) => ({
                  id: i + 1,
                  question: f.question,
                  answer: f.answer,
                  icon: i === 0 ? '💬' : i === 4 ? '💡' : undefined,
                }))}
                timestamp={null}
                className="p-0"
              />
            </div>

            <div className="mt-8 pt-4 border-t border-navy/10 flex items-center justify-between">
              <span className="text-xs text-charcoal/60 font-medium">
                Have more questions regarding {destination?.name || 'this destination'}?
              </span>
              <Link
                href="/contact"
                className="text-xs font-heading font-bold text-accent hover:underline inline-flex items-center gap-1"
              >
                Ask a Counsellor <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScholarshipsFaqSection;
