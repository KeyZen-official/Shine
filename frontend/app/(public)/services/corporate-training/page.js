import {
  Briefcase,
  Users,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  Award,
  Target,
  BookOpen,
} from 'lucide-react';
import { buildMetadata } from '../../../../lib/seo';
import { getSettings } from '../../../../lib/content';
import { pickImage } from '../../../../lib/media';
import { EditorialHero } from '../../../../components/sections/EditorialHero';
import { SectionShell } from '../../../../components/ui/SectionShell';
import { FinalCta } from '../../../../components/sections/FinalCta';

export const metadata = buildMetadata({
  title: 'Corporate Training',
  description:
    'Professional development courses in etiquette training, personality development, business communication and more — delivered by experienced corporate trainers at Shine Consultant.',
  path: '/services/corporate-training',
});

const PROGRAMMES = [
  { icon: Award, title: 'Etiquette Training', description: 'Professional etiquette and workplace decorum that help individuals present themselves with confidence in corporate and social settings.', highlights: ['Business dining and social etiquette', 'Professional grooming and presentation', 'Cross-cultural etiquette awareness'] },
  { icon: Users, title: 'Personality Development', description: 'Structured programmes that build self-awareness, confidence and interpersonal effectiveness for career advancement.', highlights: ['Self-confidence and assertiveness', 'Leadership and team collaboration', 'Emotional intelligence and adaptability'] },
  { icon: MessageSquare, title: 'Business Communication', description: 'Practical communication skills for the professional environment — written, verbal and presentational.', highlights: ['Email and report writing', 'Presentation and public speaking', 'Negotiation and meeting skills'] },
  { icon: TrendingUp, title: 'Professional Development', description: 'Broad-based professional growth programmes covering areas essential for career progression.', highlights: ['Time management and productivity', 'Problem-solving and critical thinking', 'Goal setting and career planning'] },
];

const VALUE_POINTS = [
  'Courses tailored to individual and group needs',
  'Delivered by highly qualified and experienced corporate trainers',
  'Rich professional experience across multiple industries',
  'Practical, results-oriented training methodology',
  'Customisable programmes for organisations of all sizes',
  'Post-training support and assessment',
];

export default function CorporateTrainingPage() {
  const settings = getSettings();
  const socialLinks = (settings?.socialLinks ?? [])
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const heroImage = pickImage(null, {
    fallbackKey: 'lecture',
    alt: 'Corporate training session — professional development by Shine Consultant',
  });

  const heroContent = {
    eyebrow: 'PROFESSIONAL TRAINING — CORPORATE',
    headline: 'Corporate Training — Building Professional Excellence.',
    supportingLine:
      'We provide courses to suit individual and group needs that help people succeed in the professional environment. These trainings are imparted by highly qualified and experienced corporate trainers.',
    primaryCtaLabel: 'Enquire About Training',
  };

  const stats = [
    { value: 4, label: 'Training Programmes', srLabel: 'Training programmes' },
    { value: 'Expert', label: 'Corporate Trainers', srLabel: 'Expert trainers', featureLabel: 'trainers' },
  ];

  const quickPillars = [
    { icon: Award, title: 'Etiquette Training', subtitle: 'Professional decorum' },
    { icon: Users, title: 'Personality Development', subtitle: 'Confidence building' },
    { icon: MessageSquare, title: 'Business Communication', subtitle: 'Written & verbal skills' },
    { icon: TrendingUp, title: 'Career Growth', subtitle: 'Professional advancement' },
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

      {/* 3 — Training Programmes */}
      <SectionShell id="programmes" eyebrow="Our programmes" title="Training Programme Categories" intro="Four areas of professional development designed for individuals and organisations." surface="ivory">
        <div className="grid gap-6 md:grid-cols-2">
          {PROGRAMMES.map((prog) => {
            const IconComponent = prog.icon;
            return (
              <div key={prog.title} className="group rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-all duration-base hover:shadow-card-hover lg:p-8">
                <div className="mb-5 flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage text-navy">
                    <IconComponent className="h-6 w-6 stroke-[2]" />
                  </span>
                  <h3 className="font-heading text-lead font-bold text-navy">{prog.title}</h3>
                </div>
                <p className="mb-5 text-body leading-relaxed text-charcoal-70">{prog.description}</p>
                <ul className="space-y-2.5">
                  {prog.highlights.map((item) => (
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

      {/* 4 — Why Choose Us */}
      <SectionShell id="value" eyebrow="Our approach" title="Why Shine Consultant for Training" surface="white" containerClassName="max-w-4xl">
        <div className="grid gap-4 sm:grid-cols-2">
          {VALUE_POINTS.map((point) => (
            <div key={point} className="flex items-start gap-3 rounded-xl border border-navy/10 bg-ivory p-5">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage text-navy">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
              <span className="text-body text-charcoal-70">{point}</span>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* 5 — CTA */}
      <FinalCta content={{ headline: 'Looking for Corporate Training Solutions?', supportingLine: 'Discuss your team\'s training requirements with us. Programmes can be customised for your organisation.', ctaLabel: 'Enquire About Training' }} />
    </>
  );
}
