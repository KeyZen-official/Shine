import {
  Globe,
  ShieldCheck,
  Users,
  FileSearch,
  CheckCircle2,
  Heart,
  Scale,
  Handshake,
  Star,
  Plane,
  Compass,
} from 'lucide-react';
import { buildMetadata } from '../../../../lib/seo';
import { getSettings } from '../../../../lib/content';
import { pickImage } from '../../../../lib/media';
import { EditorialHero } from '../../../../components/sections/EditorialHero';
import { SectionShell } from '../../../../components/ui/SectionShell';
import { FinalCta } from '../../../../components/sections/FinalCta';

export const metadata = buildMetadata({
  title: 'Migration Counselling',
  description:
    'Expert immigration consultancy with specialised visa processing for Australia, Canada, New Zealand and more. Shine Consultant — Super Visa Specialists in Mumbai.',
  path: '/services/migration-counselling',
});

const COUNTRIES = [
  { name: 'Australia', flag: '🇦🇺', description: 'Skilled migration, family reunion and partner visas. PR pathways and regional nomination programmes.' },
  { name: 'Canada', flag: '🇨🇦', description: 'Express Entry, Provincial Nominee Programs, family sponsorship and Super Visa applications.' },
  { name: 'New Zealand', flag: '🇳🇿', description: 'Skilled Migrant Category, Essential Skills work visas and family stream applications.' },
];

const VALUES = [
  { icon: Heart, title: 'Integrity', description: 'We will never misrepresent your profile or file an application that stretches the truth.' },
  { icon: Scale, title: 'Transparency', description: 'Clear fees, honest timelines and realistic assessments of your chances — no false promises.' },
  { icon: Handshake, title: 'Dedication', description: 'Every case receives personal attention from evaluation through to the final decision.' },
  { icon: Star, title: 'Excellence', description: 'A strong research team ensures cases are processed as per the latest regulations of various high commissions.' },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Profile Evaluation', description: 'Complete assessment of your qualifications, work experience and eligibility.' },
  { step: '02', title: 'Strategy & Planning', description: 'Identify the best visa category and create a detailed application roadmap.' },
  { step: '03', title: 'Documentation', description: 'Meticulous preparation and review of all required documents and forms.' },
  { step: '04', title: 'Filing & Follow-up', description: 'Application submission and tracking through to the final decision.' },
];

export default function MigrationCounsellingPage() {
  const settings = getSettings();
  const socialLinks = (settings?.socialLinks ?? [])
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const heroImage = pickImage(null, {
    fallbackKey: 'arrival',
    alt: 'International migration — families settling abroad with Shine Consultant guidance',
  });

  const heroContent = {
    eyebrow: 'IMMIGRATION CONSULTANCY — MIGRATION',
    headline: 'Migration Counselling — Super Visa Specialists.',
    supportingLine:
      'Shine Consultant is one of the finest immigration consultants, having expertise in providing quality solutions in visa processing. We have been assisting people in fulfilling their dreams of going and settling abroad for more than a decade.',
    primaryCtaLabel: 'Book Free Consultation',
  };

  const stats = [
    { value: '10+', label: 'years of experience', srLabel: 'Years of experience' },
    { value: '1000s', label: 'families settled abroad', srLabel: 'Families settled abroad', featureLabel: 'settled' },
  ];

  const quickPillars = [
    { icon: Globe, title: 'Multiple Countries', subtitle: 'Australia, Canada, NZ & more' },
    { icon: ShieldCheck, title: 'Super Visa Specialists', subtitle: 'Expert visa processing' },
    { icon: Users, title: 'Family Migration', subtitle: 'Individuals & families' },
    { icon: Compass, title: 'Latest Regulations', subtitle: 'Updated case processing' },
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
      <SectionShell id="intro" eyebrow="Our expertise" title="Trusted Immigration Guidance" surface="white" containerClassName="max-w-4xl">
        <div className="space-y-4 text-body leading-relaxed text-charcoal-70">
          <p>Today, thousands of individuals and families are happily settled in varied countries like Australia, Canada and New Zealand after availing our services. Our specialisation in processing successful visas has made us one of the most sought-after immigration consultancies in India.</p>
          <p>A strong research team ensures that cases are evaluated and processed as per the latest updates and regulations of various high commissions. Every case is treated with the diligence and attention it deserves.</p>
          <p>Shine Consultant is driven by values. These values continue to direct the growth and business of Shine Consultant — integrity, transparency and a commitment to doing things the right way.</p>
        </div>
      </SectionShell>

      {/* 4 — Countries */}
      <SectionShell id="countries" eyebrow="Destinations" title="Countries We Assist With" intro="Specialised immigration guidance for the most sought-after migration destinations." surface="ivory">
        <div className="grid gap-6 md:grid-cols-3">
          {COUNTRIES.map((country) => (
            <div key={country.name} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-shadow duration-base hover:shadow-card-hover">
              <span className="text-4xl" aria-hidden="true">{country.flag}</span>
              <h3 className="mt-4 font-heading text-lead font-bold text-navy">{country.name}</h3>
              <p className="mt-2 text-caption leading-relaxed text-charcoal-70">{country.description}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* 5 — Process */}
      <SectionShell id="process" eyebrow="Step by step" title="Our Migration Process" surface="white" containerClassName="max-w-4xl">
        <div className="relative space-y-0">
          <div className="absolute left-6 top-6 bottom-6 w-px bg-navy/10 hidden sm:block" aria-hidden="true" />
          {PROCESS_STEPS.map((item) => (
            <div key={item.step} className="relative flex gap-5 py-5 sm:pl-2">
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-caption font-bold text-white shadow-sm">{item.step}</span>
              <div className="pt-1">
                <h3 className="font-heading text-body font-bold text-navy">{item.title}</h3>
                <p className="mt-1 text-caption leading-relaxed text-charcoal-70">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* 6 — Values */}
      <SectionShell id="values" eyebrow="Our values" title="What Drives Us" surface="sage">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => {
            const IconComponent = value.icon;
            return (
              <div key={value.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-navy shadow-sm">
                  <IconComponent className="h-6 w-6 stroke-[2]" />
                </div>
                <h3 className="font-heading text-body font-bold text-navy">{value.title}</h3>
                <p className="mt-2 text-caption leading-relaxed text-charcoal-70">{value.description}</p>
              </div>
            );
          })}
        </div>
      </SectionShell>

      {/* 7 — CTA */}
      <FinalCta content={{ headline: 'Thinking About Migrating Abroad?', supportingLine: 'Book a free consultation to discuss your eligibility and explore the right visa pathway.', ctaLabel: 'Book Free Consultation' }} />
    </>
  );
}
