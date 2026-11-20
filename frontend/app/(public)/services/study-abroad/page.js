import {
  Compass,
  ListChecks,
  FileText,
  Award,
  Plane,
  Luggage,
  GraduationCap,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { buildMetadata } from '../../../../lib/seo';
import { getSettings } from '../../../../lib/content';
import { pickImage } from '../../../../lib/media';
import { EditorialHero } from '../../../../components/sections/EditorialHero';
import { SectionShell } from '../../../../components/ui/SectionShell';
import { FinalCta } from '../../../../components/sections/FinalCta';

export const metadata = buildMetadata({
  title: 'Study Abroad',
  description:
    'Expert overseas education advisory services — career counselling, university selection, applications, scholarships, visa assistance and pre-departure support from Shine Consultant.',
  path: '/services/study-abroad',
});

/* ── Full service data (from brochure / services.json) ──────────── */
const SERVICES = [
  {
    icon: Compass,
    number: '01',
    title: 'Career Counselling',
    slug: 'career-counselling',
    summary:
      'We help students decide career options depending on their past academic records, work experience and future aspirations.',
    description: [
      'The first conversation is about direction, not destinations. We look at what you have studied, what you have done since, and what you want the next few years to lead to.',
      'Getting this stage right is what makes every later decision — country, institution, programme — follow from something rather than from a brochure.',
    ],
    howWeHelp: [
      'A structured review of your academic record and work experience',
      'Career options discussed against your own aspirations, not a shortlist of products',
      'An honest view of which directions your profile currently supports',
    ],
    processSteps: [
      { title: 'Share your background', description: 'Transcripts, test scores and any work experience.' },
      { title: 'Talk through the options', description: 'Where your record can realistically take you.' },
      { title: 'Agree a direction', description: 'So the country and course decisions that follow have a basis.' },
    ],
  },
  {
    icon: ListChecks,
    number: '02',
    title: 'University Selection',
    slug: 'university-selection',
    summary:
      'We assist students in shortlisting and deciding countries and universities based on their past profile, needs and career goals.',
    description: [
      'A shortlist is only useful if it is built around your profile. We work through countries and institutions against your academic record, your budget and what you want the qualification to do for you.',
    ],
    howWeHelp: [
      'Countries compared on their education systems, entry requirements and costs',
      'Institutions shortlisted against your actual profile rather than a ranking table',
      'The trade-offs made explicit, including where a choice is ambitious',
    ],
    processSteps: [
      { title: 'Set the criteria', description: 'What you need from the country, the institution and the city.' },
      { title: 'Build the shortlist', description: 'With the reasoning attached to each option.' },
      { title: 'Decide together', description: 'You choose; our job is to make the choice an informed one.' },
    ],
  },
  {
    icon: FileText,
    number: '03',
    title: 'University Application',
    slug: 'university-application',
    summary:
      'We aid students in creating error-free applications because any shortcoming in the application process can delay the entire process, resulting in possible rejection.',
    description: [
      'Most avoidable rejections and delays come from the application itself: a statement that answers the wrong question, a reference that arrives late, a form field left incomplete.',
      'We work through each application before it is submitted.',
    ],
    howWeHelp: [
      'Every form checked for completeness before submission',
      'Statements of purpose reviewed against what the institution actually asks',
      'References requested early and followed up',
      'Deadlines tracked across your whole shortlist',
    ],
    processSteps: [
      { title: 'Prepare', description: 'Documents assembled and the statement drafted.' },
      { title: 'Review', description: "A full check against each institution's requirements." },
      { title: 'Submit and track', description: 'Filed on time, then followed through to the decision.' },
    ],
  },
  {
    icon: Award,
    number: '04',
    title: 'Scholarship Help',
    slug: 'scholarship-help',
    summary:
      'We guide students with regard to applying for various scholarships and financial aids.',
    description: [
      'Scholarship opportunities are more often lost to deadlines than to competition. We identify what your profile is eligible for and build those applications into your timeline from the start.',
      'We cannot promise an award, and we will not suggest otherwise.',
    ],
    howWeHelp: [
      'Eligibility checked against institutional and external awards',
      'Funding deadlines mapped alongside your admission deadlines',
      'Applications reviewed before they are submitted',
    ],
    processSteps: [
      { title: 'Check eligibility', description: 'What you can realistically apply for.' },
      { title: 'Plan the timeline', description: 'Funding deadlines usually fall before admission ones.' },
      { title: 'Apply', description: 'Prepared and reviewed like any other application.' },
    ],
  },
  {
    icon: Plane,
    number: '05',
    title: 'Visa Assistance',
    slug: 'visa-assistance',
    summary:
      'We offer expert visa guidance in various domains such as studies, tourism and business.',
    description: [
      'We help you assemble a complete and internally consistent application, and explain what each stage of the process expects of you.',
      'We are a consultancy, not an immigration authority. We do not make visa decisions and we do not guarantee outcomes. We will also not assist with any application that misrepresents your position.',
    ],
    howWeHelp: [
      'A document checklist specific to your destination and purpose',
      'Your application read for internal consistency before it is filed',
      'Each stage of the process explained in advance',
      'Interview preparation where one is required',
    ],
    processSteps: [
      { title: 'Checklist', description: 'Exactly what your destination requires from you.' },
      { title: 'Assemble', description: 'Documents gathered and checked against one another.' },
      { title: 'Final review', description: 'A last read before you submit.' },
    ],
  },
  {
    icon: Luggage,
    number: '06',
    title: 'Pre- and Post-Departure Sessions',
    slug: 'pre-and-post-departure-sessions',
    summary:
      'We conduct pre-departure and post-departure sessions with our clients to facilitate their transition to overseas countries.',
    description: [
      'The weeks either side of departure are where most practical problems appear, usually because nobody planned the unglamorous parts. We go through them with you — and we stay reachable after you have arrived.',
    ],
    howWeHelp: [
      "Accommodation options compared, including the institution's own",
      'Travel, insurance and arrival planned in the right order',
      'Banking, mobile connectivity and registration covered',
      'A follow-up session after you arrive, not just before you leave',
    ],
    processSteps: [
      { title: 'Before you fly', description: 'Accommodation, travel, insurance and finances settled.' },
      { title: 'Arrival briefing', description: 'What to expect in your first week.' },
      { title: 'After you land', description: 'A post-departure session once you are settling in.' },
    ],
  },
];

const JOURNEY_STEPS = [
  { step: '01', title: 'Profile Assessment', description: 'We evaluate your academic background, test scores, work experience and career aspirations.' },
  { step: '02', title: 'Country & University Shortlisting', description: 'Together we narrow down destinations and institutions that match your profile and goals.' },
  { step: '03', title: 'Application & Documentation', description: 'Error-free applications, compelling statements of purpose and timely submissions.' },
  { step: '04', title: 'Visa Filing & Interview Prep', description: 'Complete visa dossier preparation and guidance for the consular interview.' },
  { step: '05', title: 'Pre-Departure Briefing', description: 'Accommodation, travel, insurance, banking and everything you need before you fly.' },
];

export default function StudyAbroadPage() {
  const settings = getSettings();
  const socialLinks = (settings?.socialLinks ?? [])
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const heroImage = pickImage(null, {
    fallbackKey: 'study',
    alt: 'Students on a university campus — study abroad with Shine Consultant',
  });

  const heroContent = {
    eyebrow: 'OVERSEAS EDUCATION — STUDY ABROAD',
    headline: 'Study Abroad — Your Gateway to Global Education.',
    supportingLine:
      'We offer expert advisory services helping aspiring candidates accomplish their academic and professional goals. From career counselling to post-departure support, Shine Consultant is with you at every step.',
    primaryCtaLabel: 'Book Free Consultation',
    primaryCtaHref: '/book-consultation',
  };

  const stats = [
    { value: 6, label: 'advisory services', srLabel: 'Advisory services' },
    { value: '10+', label: 'study destinations', srLabel: 'Study destinations', featureLabel: 'destinations' },
  ];

  const quickPillars = [
    { icon: Compass, title: 'Career Direction', subtitle: 'Personalised profiling' },
    { icon: GraduationCap, title: 'University Selection', subtitle: 'Unbiased shortlisting' },
    { icon: BookOpen, title: 'Application Support', subtitle: 'Error-free filings' },
    { icon: Plane, title: 'Visa & Departure', subtitle: 'End-to-end guidance' },
  ];

  return (
    <>
      {/* 1 — Hero: Same EditorialHero as Home/Destination pages */}
      <EditorialHero
        content={heroContent}
        stats={stats}
        socialLinks={socialLinks}
        image={heroImage}
      />

      {/* 2 — Quick Pillars Strip */}
      <div className="border-y border-navy/10 bg-[#FAF8F3] py-6 sm:py-8">
        <div className="shell">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {quickPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-4 lg:px-6 ${idx < 3 ? 'lg:border-r lg:border-navy/10' : ''}`}
                >
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

      {/* 3 — Full Service Sections — one per service */}
      {SERVICES.map((service, index) => {
        const IconComponent = service.icon;
        const isEven = index % 2 === 0;
        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`scroll-mt-24 ${isEven ? 'bg-white' : 'bg-ivory'}`}
          >
            <div className="shell py-16 sm:py-20 lg:py-24">
              {/* Service header */}
              <div className="mb-10 flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sage text-navy">
                  <IconComponent className="h-7 w-7 stroke-[1.8]" />
                </span>
                <div>
                  <span className="font-heading text-micro font-bold tracking-wider text-accent uppercase">
                    Service {service.number}
                  </span>
                  <h2 className="font-heading text-h2 font-extrabold text-navy">
                    {service.title}
                  </h2>
                </div>
              </div>

              {/* Two-column layout: description left, how-we-help + steps right */}
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                {/* Left column — description */}
                <div>
                  <p className="mb-4 text-body leading-relaxed text-charcoal-70 font-medium">
                    {service.summary}
                  </p>
                  <div className="space-y-4">
                    {service.description.map((para, i) => (
                      <p key={i} className="text-body leading-relaxed text-charcoal-70">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Right column — how we help + process steps */}
                <div className="space-y-8">
                  {/* How we help */}
                  <div>
                    <h3 className="mb-4 font-heading text-body font-bold text-navy">
                      How We Help
                    </h3>
                    <ul className="space-y-3">
                      {service.howWeHelp.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                          <span className="text-caption leading-relaxed text-charcoal-70">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Process steps */}
                  <div>
                    <h3 className="mb-4 font-heading text-body font-bold text-navy">
                      The Process
                    </h3>
                    <div className="space-y-4">
                      {service.processSteps.map((step, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-micro font-bold text-white">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <p className="font-heading text-caption font-bold text-navy">
                              {step.title}
                            </p>
                            <p className="mt-0.5 text-caption leading-relaxed text-charcoal-70">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider between sections */}
              {index < SERVICES.length - 1 && (
                <div className="mt-16 border-b border-navy/10 sm:mt-20 lg:mt-24" />
              )}
            </div>
          </section>
        );
      })}

      {/* 4 — Student Journey */}
      <SectionShell
        id="journey"
        eyebrow="Step by step"
        title="Your Student Journey"
        intro="From the first conversation to your arrival on campus — here is how we work together."
        surface="white"
        containerClassName="max-w-4xl"
      >
        <div className="relative space-y-0">
          <div className="absolute left-6 top-6 bottom-6 w-px bg-navy/10 hidden sm:block" aria-hidden="true" />
          {JOURNEY_STEPS.map((item) => (
            <div key={item.step} className="relative flex gap-5 py-5 sm:pl-2">
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-caption font-bold text-white shadow-sm">
                {item.step}
              </span>
              <div className="pt-1">
                <h3 className="font-heading text-body font-bold text-navy">{item.title}</h3>
                <p className="mt-1 text-caption leading-relaxed text-charcoal-70">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* 5 — CTA */}
      <FinalCta
        content={{
          headline: 'Ready to Begin Your Study Abroad Journey?',
          supportingLine: 'Book a free consultation with our experienced counsellors. No obligation, no pressure.',
          ctaLabel: 'Book Free Consultation',
        }}
      />
    </>
  );
}
