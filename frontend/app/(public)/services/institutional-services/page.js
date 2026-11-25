import {
  Link2,
  ArrowLeftRight,
  Map,
  GraduationCap,
  CheckCircle2,
  Globe,
  Users,
  Building2,
  Handshake,
} from 'lucide-react';
import { buildMetadata } from '../../../../lib/seo';
import { getSettings } from '../../../../lib/content';
import { EditorialHero } from '../../../../components/sections/EditorialHero';
import { SectionShell } from '../../../../components/ui/SectionShell';
import { FinalCta } from '../../../../components/sections/FinalCta';

export const metadata = buildMetadata({
  title: 'Institutional Services',
  description:
    'Shine Consultant helps academic and professional institutions build international relations through tie-ups, student exchange programmes, study tours and international cells.',
  path: '/services/institutional-services',
});

const SERVICES = [
  {
    icon: Link2, number: '01', title: 'Institutional Tie-ups',
    description: 'Shine engages institutions of higher education throughout the globe and in India to foster and enhance linkages among them.',
    details: 'We seek to deepen institutional ties in numerous ways — in areas of collaborative research, study abroad programmes, faculty exchanges and seminars for higher education administrators from participating countries.',
    highlights: ['Collaborative research partnerships', 'Study abroad programme agreements', 'Faculty exchange facilitation', 'Administrative seminars and conferences'],
  },
  {
    icon: ArrowLeftRight, number: '02', title: 'Study Exchange Programs',
    description: 'Shine has been guiding students and institutions throughout the globe in facilitating Student Exchange Programs.',
    details: 'We help students find the global institutions that will help them find places of study under Exchange Programs. We also help institutions find the right students who can imbibe the values and academic knowledge that these institutions have to offer.',
    highlights: ['Student placement under exchange programmes', 'Institutional matching and vetting', 'Application and documentation support', 'Pre-departure orientation for exchange students'],
  },
  {
    icon: Map, number: '03', title: 'Study Tours',
    description: 'Shine has been guiding and facilitating academic tours abroad.',
    details: 'These tours last for 7–11 days and primarily include visiting educational institutions, learning about courses and requirements, getting to know the life on and around campus, exploring employment opportunities and knowing the culture of the place and society. These academic tours are generally self-funded.',
    highlights: ['Educational institution visits', 'Course and campus exploration', 'Employment opportunity briefings', 'Cultural immersion experiences'],
  },
  {
    icon: GraduationCap, number: '04', title: 'International Cell',
    description: 'Shine Consultant assists international schools and colleges to expand boundaries beyond their academic confines for the benefit of their students.',
    details: 'We provide in-house counselling and support to help students fulfil their dreams of studying abroad and gaining international exposure, which helps them become successful in their careers.',
    highlights: ['In-house counselling desks at institutions', 'Career guidance for international study', 'Application and admission support', 'Dedicated institutional relationship manager'],
  },
];

export default function InstitutionalServicesPage() {
  const settings = getSettings();
  const socialLinks = (settings?.socialLinks ?? [])
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const heroImage = {
    fallbackUrl: '/destinations/europe.jpg',
    alt: 'Historic university quadrangle campus — institutional partnerships by Shine Consultant',
    width: 1376,
    height: 768,
  };

  const heroContent = {
    eyebrow: 'INSTITUTIONAL PARTNERSHIPS — ACADEMIC',
    headline: 'Institutional Services — Building Academic Bridges.',
    supportingLine:
      'At Shine Consultant, we help academic and professional institutions based in overseas countries build relations with institutions in India and vice versa. We offer a host of services that help institutions initiate academic and professional contacts.',
    primaryCtaLabel: 'Partner With Us',
  };

  const stats = [
    { value: 4, label: 'Institutional Services', srLabel: 'Institutional services' },
    { value: 'Global', label: 'Institutional Network', srLabel: 'Global network', featureLabel: 'network' },
  ];

  const quickPillars = [
    { icon: Link2, title: 'Institutional Tie-ups', subtitle: 'Global partnerships' },
    { icon: ArrowLeftRight, title: 'Exchange Programs', subtitle: 'Student & faculty' },
    { icon: Map, title: 'Study Tours', subtitle: '7–11 day academic tours' },
    { icon: GraduationCap, title: 'International Cell', subtitle: 'In-house support' },
  ];

  return (
    <>
      {/* 1 — Hero */}
      <EditorialHero
        content={heroContent}
        stats={stats}
        socialLinks={socialLinks}
        image={heroImage}
        heroImgClassName="object-[50%_55%] lg:object-[50%_55%]"
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
      <SectionShell id="intro" eyebrow="Bridging institutions" title="Building International Academic Bridges" surface="white" containerClassName="max-w-4xl">
        <div className="grid gap-6 text-body leading-relaxed text-charcoal-70 md:grid-cols-2 md:gap-10">
          <p>International collaboration enriches academic programmes, broadens research horizons and gives students access to a global learning environment. Shine Consultant facilitates these connections between Indian institutions and their international counterparts.</p>
          <p>Whether it is establishing formal tie-ups, managing exchange programmes, organising study tours or setting up an international cell within your institution, we bring the experience and networks to make it happen.</p>
        </div>
      </SectionShell>

      {/* 4 — Four Services */}
      <SectionShell id="services" eyebrow="Our services" title="What We Offer to Institutions" surface="ivory">
        <div className="space-y-6">
          {SERVICES.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.title} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm lg:p-8">
                <div className="grid gap-6 lg:grid-cols-[5fr_7fr]">
                  {/* Left: Title & Description */}
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage text-navy">
                        <IconComponent className="h-5 w-5 stroke-[2]" />
                      </span>
                      <span className="font-heading text-h1 font-extrabold text-navy/10">{service.number}</span>
                    </div>
                    <h3 className="font-heading text-lead font-bold text-navy">{service.title}</h3>
                    <p className="mt-2 text-body leading-relaxed text-charcoal-70">{service.description}</p>
                  </div>
                  {/* Right: Details & Highlights */}
                  <div>
                    <p className="mb-5 text-body leading-relaxed text-charcoal-70">{service.details}</p>
                    <ul className="space-y-2.5">
                      {service.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-caption text-charcoal-70">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionShell>

      {/* 5 — Benefits */}
      <SectionShell id="benefits" eyebrow="Why partner with us" title="Benefits of Working With Shine Consultant" surface="white">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: Globe, title: 'Global Network', desc: 'Access to a wide network of academic institutions across multiple countries and continents.' },
            { icon: Users, title: 'Student & Faculty Matching', desc: 'We match the right students and faculty with the right programmes and institutions.' },
            { icon: Building2, title: 'End-to-End Facilitation', desc: 'From initial contact to formal agreements, we manage the entire process.' },
          ].map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-navy/10 bg-ivory p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage text-navy">
                  <IconComponent className="h-6 w-6 stroke-[2]" />
                </div>
                <h3 className="font-heading text-body font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-caption leading-relaxed text-charcoal-70">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </SectionShell>

      {/* 6 — CTA */}
      <FinalCta content={{ headline: 'Looking to Build International Academic Partnerships?', supportingLine: 'Speak to us about how we can help your institution expand its global reach.', ctaLabel: 'Partner With Us' }} />
    </>
  );
}
