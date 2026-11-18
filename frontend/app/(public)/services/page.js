import Link from 'next/link';
import {
  ArrowRight,
  GraduationCap,
  Briefcase,
  Globe,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Sparkles,
  Users,
  Compass,
  FileCheck,
  Plane,
} from 'lucide-react';
import {
  getContentCounts,
  getServices,
  getSettings,
} from '../../../lib/content';
import { buildMetadata } from '../../../lib/seo';
import { EditorialHero } from '../../../components/sections/EditorialHero';
import { ServicesSection } from '../../../components/sections/ServicesSection';
import { FinalCta } from '../../../components/sections/FinalCta';
import { Button } from '../../../components/ui/Button';
import { FINANCIAL_SERVICES_DISCLAIMER } from '../../../shared/constants';

export const metadata = buildMetadata({
  title: 'Overseas Education Services',
  description:
    'Comprehensive overseas education and student advisory services: career counselling, university selection, application support, scholarships, visa assistance, and pre-departure briefings.',
  path: '/services',
});

/**
 * Four foundational principles of the Shine Consultant advisory approach.
 */
const ADVISORY_PILLARS = [
  {
    title: '100% Unbiased Counselling',
    description:
      'We do not push institutional quotas. Every recommendation is tailored strictly to your academic profile and ambitions.',
  },
  {
    title: 'One Dedicated Mentor',
    description:
      'Work with a single experienced counsellor from your initial profile evaluation until you land on campus.',
  },
  {
    title: 'Accurate & Complete Filings',
    description:
      'Rigorous error-checking on university applications, statements of purpose, scholarship essays and visa dossiers.',
  },
  {
    title: 'Transparent Pre-Departure Care',
    description:
      'Practical briefings covering accommodation, foreign exchange, health insurance and international student life.',
  },
];

/**
 * Our Services Page
 *
 * Composition:
 *   1. EditorialHero — Matches the signature hero composition from the Home page.
 *   2. Quick Benefits Strip — Four key service highlights.
 *   3. ServicesSection — The exact same expansive two-column component from the Home page.
 *   4. Specialised & Institutional Services — 5 additional programmes in clean cards.
 *   5. How We Work — Four transparency commitments.
 *   6. Statutory Notice — Financial services disclaimer.
 *   7. FinalCta — Closing consultation booking banner.
 */
export default function ServicesPage() {
  const services = getServices();
  const settings = getSettings();
  const counts = getContentCounts();

  const socialLinks = (settings?.socialLinks ?? [])
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const plural = (count, one, many) => (count === 1 ? one : many);

  const stats = [
    counts.services > 0
      ? {
          value: counts.services,
          label: plural(counts.services, 'advisory service', 'advisory services'),
          srLabel: 'Advisory services',
        }
      : null,
    counts.destinations > 0
      ? {
          value: counts.destinations,
          label: plural(counts.destinations, 'study destination', 'study destinations'),
          srLabel: 'Study destinations',
        }
      : null,
    counts.testPreparation > 0
      ? {
          value: counts.testPreparation,
          label: plural(counts.testPreparation, 'coaching programme', 'coaching programmes'),
          srLabel: 'Coaching programmes',
          featureLabel: plural(counts.testPreparation, 'programme', 'programmes'),
        }
      : null,
  ].filter(Boolean);

  const heroContent = {
    eyebrow: 'OVERSEAS EDUCATION SERVICES — SHINE CONSULTANT',
    headline: 'End-to-End Overseas Education & Student Advisory Services.',
    supportingLine:
      'From career counselling and university selection to application filings, visa processing, pre-departure briefings and test preparation — Shine Consultant provides honest, transparent and dedicated support at every step of your international journey.',
    primaryCtaLabel: 'Book Free Consultation',
    primaryCtaHref: '/book-consultation',
    secondaryCtaLabel: 'Explore Services',
    secondaryCtaHref: '#services',
  };

  const heroImage = {
    fallbackUrl: '/imagery/services-education.jpg',
    alt: 'Shine Consultant educational advisory session with counsellors and students in a modern office',
    width: 2560,
    height: 1024,
    variants: {
      w360: '/imagery/services-education.jpg',
      w768: '/imagery/services-education.jpg',
      w1024: '/imagery/services-education.jpg',
      w1920: '/imagery/services-education.jpg',
    },
  };

  return (
    <>
      {/* 1 — Hero: Signature EditorialHero matching the Home page */}
      <EditorialHero
        content={heroContent}
        stats={stats}
        socialLinks={socialLinks}
        image={heroImage}
      />

      {/* 2 — Four Pillars Quick Strip */}
      <div className="border-b border-navy/10 bg-white py-6">
        <div className="shell">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Compass className="h-5 w-5 stroke-[2.2]" />
              </span>
              <div>
                <p className="font-heading text-xs font-bold text-navy">Career Direction</p>
                <p className="text-micro text-charcoal/70">Personalised profiling</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
                <GraduationCap className="h-5 w-5 stroke-[2.2]" />
              </span>
              <div>
                <p className="font-heading text-xs font-bold text-navy">University Choice</p>
                <p className="text-micro text-charcoal/70">Unbiased shortlisting</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <FileCheck className="h-5 w-5 stroke-[2.2]" />
              </span>
              <div>
                <p className="font-heading text-xs font-bold text-navy">Visa Success</p>
                <p className="text-micro text-charcoal/70">Expert filing support</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
                <Plane className="h-5 w-5 stroke-[2.2]" />
              </span>
              <div>
                <p className="font-heading text-xs font-bold text-navy">Global Arrival</p>
                <p className="text-micro text-charcoal/70">Pre-departure sessions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 — Explore Our Service Areas */}
      <section className="section-y bg-ivory border-t border-navy/10">
        <div className="shell">
          <header className="mb-10 max-w-prose lg:mb-12">
            <p className="eyebrow">Our Expertise</p>
            <h2 className="mt-3 text-h2 font-bold">
              Explore Our Service Areas
            </h2>
            <p className="mt-4 text-lead text-charcoal-70">
              From overseas education to corporate training and immigration — comprehensive support across six domains.
            </p>
          </header>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: '/services/study-abroad',
                icon: GraduationCap,
                title: 'Study Abroad',
                desc: 'Career counselling, university selection, applications, scholarships, visa assistance and pre-departure support.',
                accent: 'bg-accent/10 text-accent',
              },
              {
                href: '/services/test-preparation',
                icon: FileCheck,
                title: 'Test Preparation',
                desc: 'Personalised coaching for IELTS, TOEFL, PTE, GRE, GMAT, SAT and ACT by qualified teachers.',
                accent: 'bg-navy/10 text-navy',
              },
              {
                href: '/services/corporate-training',
                icon: Briefcase,
                title: 'Corporate Training',
                desc: 'Etiquette training, personality development, business communication and professional growth.',
                accent: 'bg-accent/10 text-accent',
              },
              {
                href: '/services/migration-counselling',
                icon: Globe,
                title: 'Migration Counselling',
                desc: 'Expert immigration consultancy and visa processing for Australia, Canada, New Zealand and more.',
                accent: 'bg-navy/10 text-navy',
              },
              {
                href: '/services/visa-counselling',
                icon: ShieldCheck,
                title: 'Visa Counselling',
                desc: 'Tourist, business and dependent visa filing with over 95% historical success rate.',
                accent: 'bg-accent/10 text-accent',
              },
              {
                href: '/services/institutional-services',
                icon: Building2,
                title: 'Institutional Services',
                desc: 'Institutional tie-ups, exchange programmes, study tours and international cells.',
                accent: 'bg-navy/10 text-navy',
              },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-all duration-base hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <span className={`mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.accent}`}>
                    <IconComponent className="h-5 w-5 stroke-[2]" />
                  </span>
                  <h3 className="font-heading text-body font-bold text-navy group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-caption leading-relaxed text-charcoal-70">
                    {item.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-heading text-caption font-semibold text-accent">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-base group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 — Overseas Education Services: The signature component */}
      <ServicesSection services={services} />

      {/* 4 — Our Advisory Commitments */}
      <section className="section-y bg-white border-t border-navy/10">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-accent">
              TRANSPARENCY FIRST
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
              How Shine Consultant Works
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-charcoal/75">
              Clear expectations, honest feedback, and no hidden agendas.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADVISORY_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-navy/10 bg-[#FAF9F5] p-5 sm:p-6"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent mb-3.5">
                  <CheckCircle2 className="h-5 w-5 stroke-[2.2]" />
                </div>
                <h3 className="font-heading text-sm sm:text-base font-bold text-navy leading-snug mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Statutory Notice: Financial Services Disclaimer */}
          <div className="mt-12 rounded-xl border border-navy/10 bg-[#EAF5F1] p-5 text-xs text-charcoal/80 leading-relaxed max-w-3xl mx-auto text-center">
            {FINANCIAL_SERVICES_DISCLAIMER}
          </div>
        </div>
      </section>

      {/* 6 — Closing Call to Action */}
      <FinalCta
        content={{
          headline: 'Start Your Education Journey with Shine Consultant',
          supportingLine:
            'Schedule a confidential thirty-minute consultation with a senior advisor. We will review your academic background, discuss realistic destinations, and chart your roadmap abroad.',
          ctaLabel: 'Book Free Consultation',
        }}
      />
    </>
  );
}
