import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShieldCheck, FileText, Info } from 'lucide-react';

export function RequirementsVisaSection({
  destination,
  admissionRequirements,
  visaAssistance,
}) {
  if (!admissionRequirements && !visaAssistance) return null;

  const reqItems = admissionRequirements?.items || [
    'Academic transcripts and certificates',
    'English proficiency test scores (e.g. IELTS, TOEFL, PTE)',
    'Statement of Purpose (SOP)',
    'Letters of Recommendation (LOR), where required',
    'Resume or CV, where required',
    'Valid passport',
    'University-specific application documents',
  ];

  const visaItems = visaAssistance?.items || [
    'Visa documentation guidance',
    'DS-160 application guidance',
    'SEVIS-related guidance',
    'Interview preparation',
    'Financial documentation guidance',
    'Pre-departure support',
  ];

  const passportImage = visaAssistance?.image || '/imagery/usa-visa-passport.jpg';

  return (
    <section id="requirements" className="section-y bg-white">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Admission Requirements (7 cols or 6 cols) */}
          <div className="lg:col-span-5 rounded-[28px] border border-navy/10 bg-[#FAF8F3] p-7 sm:p-9 shadow-card flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2.5 mb-2.5">
                <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-accent">
                  {admissionRequirements?.eyebrow || 'ADMISSION REQUIREMENTS'}
                </span>
                <span className="h-[2px] w-8 rounded-full bg-accent inline-block" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy leading-tight tracking-tight mb-6">
                {admissionRequirements?.title || 'What Do You Need to Apply?'}
              </h2>

              {/* Numbered 01-07 Vertical List */}
              <ul className="space-y-3.5">
                {reqItems.map((item, idx) => {
                  const num = String(idx + 1).padStart(2, '0');
                  return (
                    <li key={idx} className="flex items-start gap-3.5 group">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy text-white text-xs font-heading font-extrabold shadow-sm transition-colors group-hover:bg-accent">
                        {num}
                      </span>
                      <span className="text-sm sm:text-base font-medium text-navy/90 leading-snug pt-0.5">
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Footnote */}
            <div className="mt-8 pt-4 border-t border-navy/10 flex items-center gap-2 text-caption text-charcoal/70">
              <Info className="h-4 w-4 text-accent shrink-0" />
              <span>{admissionRequirements?.note || 'Requirements may vary by university and programme.'}</span>
            </div>
          </div>

          {/* Right Column: Passport Imagery + Visa Support Card (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Center: US Passport Image */}
            <div className="relative overflow-hidden rounded-[28px] border border-navy/10 shadow-card min-h-[300px] md:min-h-full bg-navy">
              <img
                src={passportImage}
                alt="US student visa documentation and passport"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192B]/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-navy font-heading text-xs font-bold backdrop-blur-sm shadow-md">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                  Official Consular Guidance
                </span>
              </div>
            </div>

            {/* Right: Visa Support Checklist Card */}
            <div className="rounded-[28px] border border-navy/10 bg-[#FAF8F3] p-7 sm:p-8 shadow-card flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2.5 mb-2.5">
                  <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-accent">
                    {visaAssistance?.eyebrow || 'VISA SUPPORT'}
                  </span>
                  <span className="h-[2px] w-8 rounded-full bg-accent inline-block" />
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-navy leading-tight tracking-tight mb-5">
                  {visaAssistance?.title || 'Get Ready for Your USA Student Visa'}
                </h3>

                <ul className="space-y-3">
                  {visaItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-charcoal/85 leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 pt-5 border-t border-navy/10">
                <Link
                  href={visaAssistance?.ctaHref || '/services/visa-assistance'}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-heading text-sm font-bold text-white shadow-card transition-all duration-300 hover:bg-accent-hover hover:-translate-y-0.5"
                >
                  {visaAssistance?.ctaText || 'Talk to Our Visa Experts'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RequirementsVisaSection;

