import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck2,
  GraduationCap,
  Headphones,
  HeartHandshake,
  Layers,
  MapPin,
  PlaneTakeoff,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
  Users,
} from 'lucide-react';
import { getCompany, getContentCounts, getSettings } from '../../../lib/content';
import { buildMetadata } from '../../../lib/seo';
import { toParagraphs } from '../../../lib/format';
import { EditorialHero } from '../../../components/sections/EditorialHero';
import { SectionShell } from '../../../components/ui/SectionShell';
import { CtaStrip } from '../../../components/sections/FinalCta';
import { Button } from '../../../components/ui/Button';
import { GradientCard } from '../../../components/ui/gradient-card';

export const metadata = buildMetadata({
  title: 'About Shine Consultant',
  description:
    'An overseas education, migration consultancy and training organisation based in Mumbai, led by Mrs. Bhadrika Mehta.',
  path: '/about',
});

/**
 * Detailed specifications for the 3 advisory team pillars.
 */
const DETAILED_TEAM = [
  {
    role: 'Senior Education Counsellors',
    category: 'Advisory Practice',
    icon: Compass,
    accentColor: '#D00100',
    description:
      'Experienced academic counsellors who evaluate academic transcripts, career ambitions, and budget parameters to recommend optimal courses and universities.',
    scope: [
      'Comprehensive Profile Evaluation',
      'Unbiased University & Country Selection',
      'SOP & Personal Statement Direction',
      'Merit Scholarship Identification',
    ],
    standard: '100% Unbiased Recommendations',
  },
  {
    role: 'Faculty & Test Trainers',
    category: 'Academic Training',
    icon: GraduationCap,
    accentColor: '#10243D',
    description:
      'Subject-specialist educators conducting rigorous preparation for IELTS, PTE, TOEFL, GRE, and GMAT with structured diagnostic drills and mock error-log reviews.',
    scope: [
      'IELTS & PTE Scoring Strategies',
      'GRE & GMAT Quantitative & Verbal Coaching',
      'Timed Full-Length Mock Examinations',
      'Individual Diagnostic Error Analysis',
    ],
    standard: 'In-Person & Diagnostic Mentoring',
  },
  {
    role: 'Admissions & Visa Operations',
    category: 'Documentation & Compliance',
    icon: ShieldCheck,
    accentColor: '#D00100',
    description:
      'Operational specialists managing dossier preparation, portal submissions, and student visa lodgements in strict accordance with embassy regulations.',
    scope: [
      'Application Dossier Compilation',
      'Offer Letter & CAS / I-20 Tracking',
      'Visa Documentation Audit & Lodgement',
      'Pre-Departure Orientation & Checklists',
    ],
    standard: 'Rigorous Embassy Compliance Check',
  },
];

/**
 * Detailed 4-stage advisory roadmap from initial discovery to campus arrival.
 */
const ROADMAP_STAGES = [
  {
    stage: '01',
    duration: 'Week 1',
    title: 'Profile Discovery & Assessment',
    subtitle: 'Understanding your academic background and goals',
    icon: HeartHandshake,
    deliverables: [
      'Academic transcript & eligibility review',
      'Career aspiration and country mapping',
      'Budget and timeline feasibility check',
      'Standardised test readiness evaluation',
    ],
    outcome: 'Personalised Advisory Roadmap',
  },
  {
    stage: '02',
    duration: 'Weeks 2 – 3',
    title: 'Strategic Course & University Selection',
    subtitle: 'Matching profiles to verified international institutions',
    icon: BookOpen,
    deliverables: [
      'Shortlist of target, reach, and safe universities',
      'Intake calendar and deadline scheduling',
      'Entry criteria & English language requirement check',
      'Applicable scholarship opportunities identified',
    ],
    outcome: 'Confirmed University Shortlist',
  },
  {
    stage: '03',
    duration: 'Weeks 4 – 6',
    title: 'Application Dossier & SOP Review',
    subtitle: 'Submitting accurate and compelling admissions files',
    icon: FileCheck2,
    deliverables: [
      'Statement of Purpose (SOP) structured reviews',
      'Letters of Recommendation (LOR) guidance',
      'Certified translation and credential compilation',
      'Direct institutional portal submissions',
    ],
    outcome: 'Offer of Admission & CAS / I-20',
  },
  {
    stage: '04',
    duration: 'Weeks 7 – 10',
    title: 'Visa Documentation & Travel Preparation',
    subtitle: 'Navigating student visa requirements with confidence',
    icon: PlaneTakeoff,
    deliverables: [
      'Financial documentation audit and verification',
      'Visa application filing and appointment booking',
      'Mock visa interview practice (if required)',
      'Pre-departure orientation & accommodation support',
    ],
    outcome: 'Visa Grant & Flight Readiness',
  },
];

/**
 * Core institutional commitments that define Shine Consultant.
 */
const CORE_COMMITMENTS = [
  {
    icon: UserCheck,
    title: 'Student-First Transparency',
    description:
      'We do not steer students toward institutional quotas. Recommendations are grounded entirely in your academic performance, budget, and long-term career aspirations.',
  },
  {
    icon: Award,
    title: '20+ Years Direct Experience',
    description:
      'Under the leadership of Mrs. Bhadrika Mehta, our advisory practice brings more than two decades of tested insight into global admissions and visa regulations.',
  },
  {
    icon: Layers,
    title: 'Integrated Service Continuum',
    description:
      'From foundational IELTS and GRE test preparation in Mumbai through application filings, visa processing, and post-arrival settlement support.',
  },
  {
    icon: MapPin,
    title: 'Accessible Mumbai Headquarters',
    description:
      'Meet face-to-face with qualified counsellors at our Borivali West office. We believe personal conversations yield the most dependable guidance.',
  },
];

/**
 * About Page
 *
 * Composition:
 *   1. EditorialHero (Kept completely unchanged)
 *   2. Four Pillars Quick Strip (Visa, University, IELTS, Support)
 *   3. What We Do — What Shine Consultant Does (Asymmetric 5-card layout with photography)
 *   4. Leadership — Meet Our Leadership (Mrs. Bhadrika Mehta profile, bio, quote)
 *   5. Who You Will Deal With — Our Team (Redesigned 3-pillar department breakdown with detailed scope)
 *   6. Our Methodology — Advisory Roadmap (Redesigned 4-stage chronological progression)
 *   7. Why Shine Consultant — Institutional Commitments (Added depth & value)
 *   8. Final Call to Action
 */
export default function AboutPage() {
  const about = getCompany();
  const settings = getSettings();
  const counts = getContentCounts();

  const leadership = about.leadership ?? {};

  // Dedicated bespoke photograph for the About Us hero banner (preserved)
  const aboutHeroImage = {
    fallbackUrl: '/imagery/about-hero.jpg',
    alt: 'Shine Consultant educational advisory session with students and mentors in a modern office',
    width: 2560,
    height: 1024,
    variants: {
      w360: '/imagery/about-hero.jpg',
      w768: '/imagery/about-hero.jpg',
      w1024: '/imagery/about-hero.jpg',
      w1920: '/imagery/about-hero.jpg',
    },
  };

  const plural = (count, one, many) => (count === 1 ? one : many);

  const stats = [
    counts.destinations > 0
      ? {
          value: counts.destinations,
          label: plural(counts.destinations, 'study destination', 'study destinations'),
          srLabel: 'Study destinations',
        }
      : null,
    counts.services > 0
      ? {
          value: counts.services,
          label: plural(counts.services, 'advisory service', 'advisory services'),
          srLabel: 'Specialised advisory services',
        }
      : null,
    counts.testPreparation > 0
      ? {
          value: counts.testPreparation,
          label: plural(counts.testPreparation, 'coaching programme', 'coaching programmes'),
          srLabel: 'Test preparation coaching programmes',
          featureLabel: plural(counts.testPreparation, 'programme', 'programmes'),
        }
      : null,
  ].filter(Boolean);

  const heroContent = {
    headline: 'Overseas Education, Migration and Training — From Mumbai.',
    supportingLine: about.introduction || settings?.companyIntroduction,
    primaryCtaLabel: 'Book Free Consultation',
    secondaryCtaLabel: 'Explore Study Destinations',
  };

  const socialLinks = settings?.socialLinks ?? [];

  return (
    <>
      {/* 1 — Hero: EditorialHero kept completely unchanged */}
      <EditorialHero
        content={heroContent}
        stats={stats}
        socialLinks={socialLinks}
        image={aboutHeroImage}
        brandTagline="Honest, unbiased & professional guidance — from Borivali West, Mumbai"
      />

      {/* 2 — Four Pillars Quick Strip matching reference */}
      <div className="border-y border-navy/10 bg-[#FAF8F3] py-6 sm:py-8">
        <div className="shell">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {/* 1. Visa & Immigration */}
            <div className="flex items-center gap-4 lg:px-6 lg:border-r lg:border-navy/10">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E5F2EC] text-navy">
                <GraduationCap className="h-6 w-6 stroke-[1.8]" />
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-navy">Visa &amp; Immigration</p>
                <p className="text-caption text-charcoal-70">End-to-end support</p>
              </div>
            </div>

            {/* 2. University Selection */}
            <div className="flex items-center gap-4 lg:px-6 lg:border-r lg:border-navy/10">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E5F2EC] text-navy">
                <Users className="h-6 w-6 stroke-[1.8]" />
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-navy">University Selection</p>
                <p className="text-caption text-charcoal-70">Find the right fit</p>
              </div>
            </div>

            {/* 3. IELTS & Test Preparation */}
            <div className="flex items-center gap-4 lg:px-6 lg:border-r lg:border-navy/10">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E5F2EC] text-navy">
                <BookOpen className="h-6 w-6 stroke-[1.8]" />
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-navy">IELTS &amp; Test Preparation</p>
                <p className="text-caption text-charcoal-70">Expert training</p>
              </div>
            </div>

            {/* 4. Student Support */}
            <div className="flex items-center gap-4 lg:px-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E5F2EC] text-navy">
                <Headphones className="h-6 w-6 stroke-[1.8]" />
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-navy">Student Support</p>
                <p className="text-caption text-charcoal-70">From admission to arrival</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 — What We Do: Premium Asymmetric Feature-Card Layout with Photography */}
      <section id="what-we-do" className="section-y bg-[#FAF8F3]">
        <div className="shell">
          {/* Header */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-10 lg:mb-14">
            <div>
              <div className="inline-flex items-center gap-2.5">
                <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-accent">
                  WHAT WE DO
                </span>
                <span className="h-[2px] w-8 rounded-full bg-accent inline-block" />
              </div>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-navy leading-tight tracking-tight">
                What Shine Consultant Does
              </h2>
            </div>
            <p className="max-w-md text-base sm:text-lead text-charcoal/80 leading-relaxed">
              End-to-end support for your global education journey, from planning to post-arrival.
            </p>
          </div>

          {/* 5 Feature Cards Grid (Asymmetric) with Integrated Photography */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            {/* Card 1: Study Abroad Consulting (Large Left Feature Card, 5 cols) */}
            <Link
              href="/services/university-selection"
              className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-[#10243D] to-[#0B192B] p-6 sm:p-7 text-white shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl lg:col-span-5 border border-white/10"
            >
              {/* Subtle Red Swoosh / Gradient at bottom-right */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-gradient-to-tl from-accent/50 via-accent/20 to-transparent blur-2xl"
              />

              <div>
                {/* Icon & Core Practice Pill */}
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1E3758] border border-white/10 text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <GraduationCap className="h-6 w-6 text-white stroke-[1.8]" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 font-heading text-micro font-bold uppercase tracking-wider text-accent border border-accent/30">
                    <Sparkles className="h-3 w-3 text-accent" />
                    Core Advisory
                  </span>
                </div>

                {/* Featured Photograph Inside the Box */}
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-white/15 shadow-lg my-3 group-hover:border-accent/40 transition-colors">
                  <img
                    src="/imagery/counsellor-consultation.jpg"
                    alt="Study abroad counselling session"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B192B]/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Text Content */}
                <div className="relative z-10 mt-4">
                  <h3 className="font-heading text-2xl sm:text-[1.75rem] font-extrabold text-white leading-tight">
                    Study Abroad Consulting
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base text-white/80 leading-relaxed max-w-sm">
                    Personalised guidance for courses, universities and admission process.
                  </p>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-heading text-xs font-semibold uppercase tracking-wider text-white/60 group-hover:text-white transition-colors">
                  Explore guidance
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:border-accent group-hover:scale-105">
                  <ArrowRight className="h-4.5 w-4.5 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>

            {/* Right Column: 4 Cards in 2x2 Grid (7 cols) with Imagery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 lg:col-span-7">
              {/* Card 2: Migration Support */}
              <Link
                href="/services/visa-assistance"
                className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-[#10243D] to-[#0B192B] p-5 sm:p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl border border-white/10"
              >
                <div>
                  {/* Image Banner with Badge */}
                  <div className="relative w-full h-28 sm:h-32 overflow-hidden rounded-xl border border-white/10 shadow-sm mb-4">
                    <img
                      src="/destinations/uk.jpg"
                      alt="Migration Support"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B192B]/85 via-[#10243D]/30 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-[#10243D]/90 backdrop-blur-sm border border-white/15 text-white shadow-md">
                      <Users className="h-4.5 w-4.5 stroke-[1.8]" />
                    </div>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-accent transition-colors">
                    Migration Support
                  </h3>
                  <p className="mt-1.5 text-caption text-white/75 leading-relaxed">
                    Expert assistance for a smooth and compliant migration journey.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="font-heading text-micro font-semibold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">
                    View service
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:border-accent group-hover:scale-105">
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>

              {/* Card 3: Test Preparation */}
              <Link
                href="/test-preparation"
                className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-[#10243D] to-[#0B192B] p-5 sm:p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl border border-white/10"
              >
                <div>
                  {/* Image Banner with Badge */}
                  <div className="relative w-full h-28 sm:h-32 overflow-hidden rounded-xl border border-white/10 shadow-sm mb-4">
                    <img
                      src="/imagery/services-education.jpg"
                      alt="Test Preparation"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B192B]/85 via-[#10243D]/30 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-[#10243D]/90 backdrop-blur-sm border border-white/15 text-white shadow-md">
                      <BookOpen className="h-4.5 w-4.5 stroke-[1.8]" />
                    </div>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-accent transition-colors">
                    Test Preparation
                  </h3>
                  <p className="mt-1.5 text-caption text-white/75 leading-relaxed">
                    Comprehensive coaching for IELTS, PTE, TOEFL, GRE and GMAT.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="font-heading text-micro font-semibold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">
                    View programmes
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:border-accent group-hover:scale-105">
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>

              {/* Card 4: Career Training */}
              <Link
                href="/services/career-counselling"
                className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-[#10243D] to-[#0B192B] p-5 sm:p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl border border-white/10"
              >
                <div>
                  {/* Image Banner with Badge */}
                  <div className="relative w-full h-28 sm:h-32 overflow-hidden rounded-xl border border-white/10 shadow-sm mb-4">
                    <img
                      src="/imagery/about-hero.jpg"
                      alt="Career Training"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B192B]/85 via-[#10243D]/30 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-[#10243D]/90 backdrop-blur-sm border border-white/15 text-white shadow-md">
                      <Briefcase className="h-4.5 w-4.5 stroke-[1.8]" />
                    </div>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-accent transition-colors">
                    Career Training
                  </h3>
                  <p className="mt-1.5 text-caption text-white/75 leading-relaxed">
                    Skill-based training to boost your global career prospects.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="font-heading text-micro font-semibold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">
                    View guidance
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:border-accent group-hover:scale-105">
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>

              {/* Card 5: Post-Arrival Support */}
              <Link
                href="/services/pre-and-post-departure-sessions"
                className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-[#10243D] to-[#0B192B] p-5 sm:p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl border border-white/10"
              >
                <div>
                  {/* Image Banner with Badge */}
                  <div className="relative w-full h-28 sm:h-32 overflow-hidden rounded-xl border border-white/10 shadow-sm mb-4">
                    <img
                      src="/destinations/canada.jpg"
                      alt="Post-Arrival Support"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B192B]/85 via-[#10243D]/30 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-[#10243D]/90 backdrop-blur-sm border border-white/15 text-white shadow-md">
                      <Headphones className="h-4.5 w-4.5 stroke-[1.8]" />
                    </div>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-accent transition-colors">
                    Post-Arrival Support
                  </h3>
                  <p className="mt-1.5 text-caption text-white/75 leading-relaxed">
                    Continued guidance for accommodation, settlement and beyond.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="font-heading text-micro font-semibold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">
                    View support
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:border-accent group-hover:scale-105">
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Leadership: Meet Our Leadership (Full Width Card) */}
      <section id="leadership" className="section-y bg-[#FAF8F3]">
        <div className="shell">
          {/* Header */}
          <div className="mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2.5">
              <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-accent">
                LEADERSHIP
              </span>
              <span className="h-[2px] w-8 rounded-full bg-accent inline-block" />
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-navy leading-tight tracking-tight">
              Meet Our Leadership
            </h2>
          </div>

          {/* Large Horizontal Dark Navy Container */}
          <div className="rounded-[28px] sm:rounded-[36px] bg-[#10243D] p-6 sm:p-8 lg:p-11 border border-white/5 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* LEFT: Portrait */}
              <div className="lg:col-span-3 flex justify-center lg:justify-start">
                <div className="relative w-full max-w-[260px] aspect-[4/3.5] overflow-hidden rounded-2xl border-2 border-white/10 shadow-xl bg-[#0B192B]">
                  <img
                    src="/imagery/leadership-bhadrika-mehta.jpg"
                    alt={`${leadership.name || 'Mrs. Bhadrika Mehta'} — Founder & Director`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* CENTRE: Name, Role & Biography */}
              <div className="lg:col-span-5 text-left">
                <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-heading font-extrabold text-white leading-tight">
                  {leadership.name || 'Mrs. Bhadrika Mehta'}
                </h3>
                <p className="mt-1 font-heading text-sm font-semibold uppercase tracking-wider text-accent">
                  Founder &amp; Director
                </p>
                <div className="mt-3 h-1 w-12 bg-accent rounded-full" />
                <p className="mt-5 text-sm sm:text-base text-white/80 leading-relaxed">
                  {leadership.note ||
                    'Shine Consultant is led by Mrs. Bhadrika Mehta, who has more than 20 years of experience in overseas education and migration consulting.'}
                </p>
              </div>

              {/* RIGHT: Separate Lighter Navy Quote Card */}
              <div className="lg:col-span-4">
                <div className="relative rounded-2xl bg-[#172D4A] border border-white/10 p-6 sm:p-7 shadow-lg flex flex-col justify-between">
                  <span
                    aria-hidden="true"
                    className="text-4xl font-serif text-accent leading-none font-bold select-none"
                  >
                    &ldquo;
                  </span>
                  <p className="mt-2 text-sm sm:text-base italic text-white/95 leading-relaxed">
                    Our goal is to provide honest, unbiased and professional guidance to help students build a successful global future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — Who You Will Deal With: Specialist Advisory Team with Gradient Cards */}
      <section id="team" className="section-y bg-[#EAF4F0]">
        <div className="shell">
          {/* Header */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-10 lg:mb-14">
            <div>
              <div className="inline-flex items-center gap-2.5">
                <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-accent">
                  WHO YOU WILL DEAL WITH
                </span>
                <span className="h-[2px] w-8 rounded-full bg-accent inline-block" />
              </div>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-navy leading-tight tracking-tight">
                Our Specialist Advisory Team
              </h2>
            </div>
            <p className="max-w-md text-base sm:text-lead text-charcoal/80 leading-relaxed">
              We employ qualified professionals who demonstrate ethics, competence and personal commitment at every stage.
            </p>
          </div>

          {/* 3 Department Cards using GradientCard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            <GradientCard
              badgeText="Advisory Practice"
              badgeColor="#F59E0B"
              title="Senior Education Counsellors"
              description="Unbiased university shortlisting, career mapping, and academic trajectory guidance tailored to your specific aptitude."
              ctaText="Book counselling session"
              ctaHref="/contact"
              imageUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
              gradient="orange"
            />

            <GradientCard
              badgeText="Documentation & Compliance"
              badgeColor="#64748B"
              title="Admissions & Visa Operations"
              description="Rigorous document verification, financial audits, mock interview preparation, and compliance with foreign consular guidelines."
              ctaText="Explore visa guidance"
              ctaHref="/services/visa-assistance"
              imageUrl="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80"
              gradient="gray"
            />

            <GradientCard
              badgeText="Academic Training"
              badgeColor="#8B5CF6"
              title="Faculty & Test Trainers"
              description="Subject-specialist coaching for IELTS, PTE, TOEFL, GRE, and GMAT with certified trainers, mock drills, and error reviews."
              ctaText="Explore test preparation"
              ctaHref="/test-preparation"
              imageUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"
              gradient="purple"
            />
          </div>
        </div>
      </section>

      {/* 6 — Our Methodology: Interactive Gradient Cards Layout */}
      <section id="roadmap" className="section-y bg-[#FAF8F3]">
        <div className="shell">
          {/* Header */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-10 lg:mb-14">
            <div>
              <div className="inline-flex items-center gap-2.5">
                <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-accent">
                  OUR METHODOLOGY
                </span>
                <span className="h-[2px] w-8 rounded-full bg-accent inline-block" />
              </div>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-navy leading-tight tracking-tight">
                How We Structure Your Advisory
              </h2>
            </div>
            <p className="max-w-md text-base sm:text-lead text-charcoal/80 leading-relaxed">
              A transparent, proven four-stage roadmap from initial profile discovery through university selection, application, and visa grant.
            </p>
          </div>

          {/* Interactive Gradient Cards in 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-9 items-stretch">
            <GradientCard
              badgeText="Stage 01 • Week 1"
              badgeColor="#F59E0B"
              title="Profile Discovery & Assessment"
              description="Comprehensive academic review, career mapping, budget feasibility, and personalized country evaluation."
              ctaText="Start profile discovery"
              ctaHref="/contact"
              imageUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
              gradient="orange"
            />

            <GradientCard
              badgeText="Stage 02 • Weeks 2 – 3"
              badgeColor="#64748B"
              title="Course & University Selection"
              description="Unbiased shortlisting across verified institutions, intake calendars, eligibility criteria, and scholarship mapping."
              ctaText="Explore destinations"
              ctaHref="/destinations"
              imageUrl="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80"
              gradient="gray"
            />

            <GradientCard
              badgeText="Stage 03 • Weeks 4 – 6"
              badgeColor="#8B5CF6"
              title="Application Dossier & SOP Review"
              description="Statement of Purpose guidance, reference letter compilation, certified credential filing, and direct portal tracking."
              ctaText="View application support"
              ctaHref="/services/university-application"
              imageUrl="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80"
              gradient="purple"
            />

            <GradientCard
              badgeText="Stage 04 • Weeks 7 – 10"
              badgeColor="#10B981"
              title="Visa Filing & Travel Orientation"
              description="Financial audit, mock visa interview rehearsal, embassy lodgement, accommodation guidance, and flight orientation."
              ctaText="Book free consultation"
              ctaHref="/book-consultation"
              imageUrl="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80"
              gradient="green"
            />
          </div>
        </div>
      </section>

      {/* 7 — Added Value Section: Institutional Commitments & Trust with Gradient Cards */}
      <section id="commitments" className="section-y bg-[#FAF8F3]">
        <div className="shell">
          {/* Header */}
          <div className="max-w-2xl mb-10 lg:mb-14">
            <div className="inline-flex items-center gap-2.5">
              <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-accent">
                OUR COMMITMENT
              </span>
              <span className="h-[2px] w-8 rounded-full bg-accent inline-block" />
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-navy leading-tight tracking-tight">
              Why Students &amp; Families Choose Shine Consultant
            </h2>
            <p className="mt-3.5 text-base sm:text-lead text-charcoal/80 leading-relaxed">
              We operate an independent, student-first practice with verified standards in Mumbai.
            </p>
          </div>

          {/* 4 Feature Columns using GradientCard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            <GradientCard
              badgeText="Student-Centric"
              badgeColor="#F59E0B"
              title="Student-First Transparency"
              description="We do not steer students toward institutional quotas. Recommendations are grounded entirely in your academic profile, budget, and ambitions."
              ctaText="Advisory principles"
              ctaHref="#principles"
              imageUrl="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80"
              gradient="orange"
            />

            <GradientCard
              badgeText="Leadership Insight"
              badgeColor="#64748B"
              title="20+ Years Direct Experience"
              description="Under the leadership of Mrs. Bhadrika Mehta, our advisory practice brings more than two decades of tested insight into global admissions and visas."
              ctaText="Meet leadership"
              ctaHref="#leadership"
              imageUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
              gradient="gray"
            />

            <GradientCard
              badgeText="Full Spectrum"
              badgeColor="#8B5CF6"
              title="Integrated Service Continuum"
              description="From foundational IELTS and GRE test preparation in Mumbai through application filings, visa processing, and post-arrival settlement support."
              ctaText="View all services"
              ctaHref="/services"
              imageUrl="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80"
              gradient="purple"
            />

            <GradientCard
              badgeText="Borivali West"
              badgeColor="#10B981"
              title="Accessible Mumbai Office"
              description="Meet face-to-face with qualified counsellors at our Borivali West centre. We believe personal conversations yield the most dependable guidance."
              ctaText="Visit our office"
              ctaHref="/contact"
              imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
              gradient="green"
            />
          </div>
        </div>
      </section>

      {/* 8 — Final Call to Action */}
      <CtaStrip
        title="Talk to us before you commit to anything"
        description="The first consultation is free and carries no obligation. Visit us in Borivali West, Mumbai or schedule an online session."
        secondaryLabel="Contact us"
        secondaryHref="/contact"
        surface="white"
      />
    </>
  );
}
