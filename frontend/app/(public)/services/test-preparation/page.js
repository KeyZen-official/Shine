import {
  BookOpen,
  Globe,
  Monitor,
  Calculator,
  BarChart3,
  PenTool,
  Target,
  CheckCircle2,
  Users,
  Clock,
  Award,
  GraduationCap,
} from 'lucide-react';
import { buildMetadata } from '../../../../lib/seo';
import { getSettings } from '../../../../lib/content';
import { pickImage } from '../../../../lib/media';
import { EditorialHero } from '../../../../components/sections/EditorialHero';
import { SectionShell } from '../../../../components/ui/SectionShell';
import { FinalCta } from '../../../../components/sections/FinalCta';

export const metadata = buildMetadata({
  title: 'Test Preparation',
  description:
    'Result-oriented and personalised coaching for IELTS, TOEFL, PTE, GRE, GMAT, SAT and ACT by qualified and experienced teachers at Shine Consultant, Mumbai.',
  path: '/services/test-preparation',
});

const EXAMS = [
  { name: 'IELTS', fullName: 'International English Language Testing System', icon: BookOpen, description: 'Coaching for both IELTS formats, across all four skills, with mock tests and a study plan built around your target band score.' },
  { name: 'TOEFL', fullName: 'Test of English as a Foreign Language', icon: Globe, description: 'TOEFL coaching across all four sections, with practice sessions and timed mock tests.' },
  { name: 'PTE', fullName: 'Pearson Test of English Academic', icon: Monitor, description: 'PTE Academic coaching across the integrated skills, with practice and mock tests on the computer-based format.' },
  { name: 'GRE', fullName: 'Graduate Record Examinations', icon: Calculator, description: 'GRE coaching across verbal reasoning, quantitative reasoning and analytical writing, with practice tests.' },
  { name: 'GMAT', fullName: 'Graduate Management Admission Test', icon: BarChart3, description: 'GMAT coaching across quantitative reasoning, verbal reasoning and data insights, with practice tests.' },
  { name: 'SAT', fullName: 'Scholastic Aptitude Test', icon: PenTool, description: 'SAT coaching across evidence-based reading, writing and mathematics, with practice tests and score improvement strategies.' },
  { name: 'ACT', fullName: 'American College Testing', icon: Target, description: 'ACT coaching covering English, mathematics, reading and science reasoning, with timed practice tests.' },
];

const BENEFITS = [
  { icon: Users, title: 'Personalised Attention', description: 'Small batch sizes ensure each student receives individual feedback and tailored guidance.' },
  { icon: Clock, title: 'Flexible Scheduling', description: 'Weekday, weekend and intensive batch options designed to fit your existing commitments.' },
  { icon: Award, title: 'Experienced Faculty', description: 'Coaching is imparted by qualified teachers who possess rich professional experience in the domain.' },
  { icon: CheckCircle2, title: 'Comprehensive Materials', description: 'Practice tests, mock exams and curated study material aligned with the latest exam patterns.' },
];

export default function TestPreparationPage() {
  const settings = getSettings();
  const socialLinks = (settings?.socialLinks ?? [])
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const heroImage = pickImage(null, {
    fallbackKey: 'study',
    alt: 'Student preparing for standardised tests — Shine Consultant coaching',
  });

  const heroContent = {
    eyebrow: 'COACHING & TRAINING — TEST PREPARATION',
    headline: 'Test Preparation — Coaching That Delivers Results.',
    supportingLine:
      'We provide result-oriented and personalised coaching services for GMAT, GRE, SAT, ACT, TOEFL, IELTS and PTE. Scores of these standardised examinations go a long way in securing admission and obtaining scholarships.',
    primaryCtaLabel: 'Enquire About Coaching',
  };

  const stats = [
    { value: 7, label: 'exams we coach', srLabel: 'Exams we coach' },
    { value: '6+', label: 'tests we coach', srLabel: 'Tests we prepare for', featureLabel: 'programmes' },
  ];

  const quickPillars = [
    { icon: BookOpen, title: 'Expert Coaching', subtitle: 'Qualified teachers' },
    { icon: GraduationCap, title: 'All Major Exams', subtitle: 'IELTS to ACT' },
    { icon: Users, title: 'Small Batches', subtitle: 'Personal attention' },
    { icon: Award, title: 'Proven Results', subtitle: 'Result-oriented approach' },
  ];

  return (
    <>
      {/* 1 — Hero */}
      <EditorialHero
        content={heroContent}
        stats={stats}
        socialLinks={socialLinks}
        image={heroImage}
      />

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
      <SectionShell id="intro" eyebrow="Expert coaching" title="Prepare With Confidence" surface="white" containerClassName="max-w-4xl">
        <div className="space-y-4 text-body leading-relaxed text-charcoal-70">
          <p>Standardised test scores are a critical component of international university admissions. Whether you are applying for undergraduate programmes, graduate school or business school, the right score can make a decisive difference.</p>
          <p>Coaching is imparted by qualified teachers who possess rich and professional experience in the same realm. Each programme is structured around the latest exam patterns with a focus on building real competence, not shortcuts.</p>
        </div>
      </SectionShell>

      {/* 4 — Exams Grid */}
      <SectionShell id="exams" eyebrow="Programmes" title="Exams We Prepare You For" intro="Comprehensive coaching programmes for all major standardised tests required for international admissions." surface="ivory">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {EXAMS.map((exam) => {
            const IconComponent = exam.icon;
            return (
              <div key={exam.name} className="group rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-all duration-base hover:-translate-y-1 hover:shadow-card-hover">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sage text-navy">
                  <IconComponent className="h-5 w-5 stroke-[2]" />
                </div>
                <h3 className="font-heading text-h3 font-extrabold text-navy">{exam.name}</h3>
                <p className="mt-1 text-micro font-semibold text-charcoal-70/60">{exam.fullName}</p>
                <p className="mt-3 text-caption leading-relaxed text-charcoal-70">{exam.description}</p>
              </div>
            );
          })}
        </div>
      </SectionShell>

      {/* 5 — Benefits */}
      <SectionShell id="benefits" eyebrow="Why choose us" title="Benefits of Our Coaching" surface="white">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => {
            const IconComponent = benefit.icon;
            return (
              <div key={benefit.title} className="rounded-2xl border border-navy/10 bg-ivory p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-sage text-navy">
                  <IconComponent className="h-5 w-5 stroke-[2.2]" />
                </div>
                <h3 className="font-heading text-body font-bold text-navy">{benefit.title}</h3>
                <p className="mt-2 text-caption leading-relaxed text-charcoal-70">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </SectionShell>

      {/* 6 — CTA */}
      <FinalCta content={{ headline: 'Ready to Ace Your Exam?', supportingLine: 'Speak to our coaching team about the right programme for your target score and timeline.', ctaLabel: 'Enquire About Coaching' }} />
    </>
  );
}
