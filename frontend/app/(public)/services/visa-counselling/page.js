import {
  Camera,
  Briefcase,
  Heart,
  FileCheck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Globe,
  Plane,
  Award,
} from 'lucide-react';
import { buildMetadata } from '../../../../lib/seo';
import { getSettings } from '../../../../lib/content';
import { pickImage } from '../../../../lib/media';
import { EditorialHero } from '../../../../components/sections/EditorialHero';
import { SectionShell } from '../../../../components/ui/SectionShell';
import { FinalCta } from '../../../../components/sections/FinalCta';

export const metadata = buildMetadata({
  title: 'Visa Counselling',
  description:
    'Expert visa counselling for tourist, business and dependent visas. Over 95% successful visa applications — Shine Consultant, Mumbai.',
  path: '/services/visa-counselling',
});

const VISA_TYPES = [
  { icon: Camera, title: 'Tourist Visas', description: 'Planning to explore a new country? We assist with documentation, itinerary planning and application filing for tourist visas across multiple countries.', highlights: ['Complete documentation support', 'Travel itinerary guidance', 'Application filing and tracking', 'Interview preparation where required'] },
  { icon: Briefcase, title: 'Business Visas', description: 'For professionals attending conferences, trade fairs, meetings or business engagements abroad. We handle the visa process so you can focus on your business.', highlights: ['Business invitation and sponsorship guidance', 'Documentation for corporate travellers', 'Multi-entry and long-term visa support', 'Expedited processing where available'] },
  { icon: Heart, title: 'Dependent Visas', description: 'Joining a family member who is already abroad? We guide dependents through the visa process with sensitivity and thoroughness.', highlights: ['Spousal and family reunion visas', 'Documentation of relationships and financials', 'Co-ordination with the primary visa holder', 'Guidance on dependent rights and entitlements'] },
];

export default function VisaCounsellingPage() {
  const settings = getSettings();
  const socialLinks = (settings?.socialLinks ?? [])
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const heroImage = pickImage(null, {
    fallbackKey: 'documents',
    alt: 'Visa documentation and passport — visa counselling by Shine Consultant',
  });

  const heroContent = {
    eyebrow: 'VISA SERVICES — TOURIST, BUSINESS & DEPENDENT',
    headline: 'Visa Counselling — Twenty Years of Filing Success.',
    supportingLine:
      'We have been helping people for the last twenty years filing their visas. We hold the record of having over 95% of successful visa applications. We possess expertise in documentation processing, application and filing services across multiple visa categories.',
    primaryCtaLabel: 'Book Free Consultation',
  };

  const stats = [
    { value: '20+', label: 'years of experience', srLabel: 'Years of experience' },
    { value: '95%+', label: 'success rate', srLabel: 'Historical success rate' },
    { value: 'Multiple', label: 'countries covered', srLabel: 'Countries covered', featureLabel: 'countries' },
  ];

  const quickPillars = [
    { icon: ShieldCheck, title: '95%+ Success Rate', subtitle: 'Historical track record' },
    { icon: Globe, title: 'Multiple Countries', subtitle: 'Worldwide visa expertise' },
    { icon: FileCheck, title: 'Expert Documentation', subtitle: 'Error-free applications' },
    { icon: Clock, title: '20+ Years Experience', subtitle: 'Trusted since day one' },
  ];

  return (
    <>
      {/* 1 — Hero */}
      <EditorialHero content={heroContent} stats={stats} socialLinks={socialLinks} image={heroImage} />

      {/* 2 — Quick Pillars */}
      <div className="border-y border-navy/10 bg-[#FAF8F3] py-6 sm:py-8">
        <div className="shell">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {quickPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div key={idx} className={`flex items-center gap-4 lg:px-6 ${idx < 3 ? 'lg:border-r lg:border-navy/10' : ''}`}>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage text-navy">
                    <IconComp className="h-6 w-6 stroke-[1.8]" />
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold text-navy">{pillar.title}</p>
                    <p className="text-caption text-charcoal/70">{pillar.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3 — Introduction */}
      <SectionShell id="intro" eyebrow="Our expertise" title="Two Decades of Visa Excellence" surface="white" containerClassName="max-w-4xl">
        <div className="space-y-4 text-body leading-relaxed text-charcoal-70">
          <p>We possess expertise in documentation processing, application and filing services for those interested in obtaining visas in various categories such as studies, tourism and business, among many others.</p>
          <p>Our experience across a wide range of visa categories and countries means we understand what each consulate expects — and we prepare your application to meet those standards the first time.</p>
        </div>
      </SectionShell>

      {/* 4 — Visa Types */}
      <SectionShell id="visa-types" eyebrow="Visa categories" title="Types of Visas We Handle" surface="ivory">
        <div className="grid gap-6 lg:grid-cols-3">
          {VISA_TYPES.map((visa) => {
            const IconComponent = visa.icon;
            return (
              <div key={visa.title} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-shadow duration-base hover:shadow-card-hover lg:p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-sage text-navy">
                  <IconComponent className="h-6 w-6 stroke-[1.8]" />
                </div>
                <h3 className="font-heading text-lead font-bold text-navy">{visa.title}</h3>
                <p className="mt-3 text-body leading-relaxed text-charcoal-70">{visa.description}</p>
                <ul className="mt-5 space-y-2.5">
                  {visa.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-caption text-charcoal-70">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </SectionShell>

      {/* 5 — Documentation Support */}
      <SectionShell id="documentation" eyebrow="Complete support" title="Documentation & Application Support" surface="white" containerClassName="max-w-4xl">
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            { icon: FileCheck, title: 'Document Preparation', desc: 'We compile and verify every document required for your specific visa type and destination.' },
            { icon: ShieldCheck, title: 'Application Review', desc: 'Each application is reviewed for completeness and consistency before submission.' },
            { icon: Clock, title: 'Timely Filing', desc: 'Applications are filed within the right windows, with deadlines tracked across your case.' },
            { icon: Globe, title: 'Multi-Country Expertise', desc: 'We handle visas for a wide range of countries and understand each consulate\'s specific requirements.' },
          ].map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.title} className="flex gap-4 rounded-xl border border-navy/10 bg-ivory p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sage text-navy">
                  <IconComponent className="h-5 w-5 stroke-[2]" />
                </span>
                <div>
                  <h3 className="font-heading text-body font-bold text-navy">{item.title}</h3>
                  <p className="mt-1 text-caption leading-relaxed text-charcoal-70">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-8 rounded-lg border border-navy/10 bg-sage/50 px-5 py-4 text-caption text-charcoal-70 italic">
          Note: The over-95% success rate is based on our historical track record. Visa decisions are made solely by the respective embassies and consulates. Shine Consultant does not guarantee any visa outcome.
        </p>
      </SectionShell>

      {/* 6 — CTA */}
      <FinalCta content={{ headline: 'Need Help With Your Visa Application?', supportingLine: 'Book a free consultation to discuss your visa requirements and documentation.', ctaLabel: 'Book Free Consultation' }} />
    </>
  );
}
