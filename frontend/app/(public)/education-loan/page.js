import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileCheck2,
  GraduationCap,
  Handshake,
  Landmark,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import {
  getContact,
  getDestinations,
  getHomeContent,
  getServices,
  getSettings,
} from '../../../lib/content';
import { buildMetadata, breadcrumbJsonLd } from '../../../lib/seo';
import { EditorialHero } from '../../../components/sections/EditorialHero';
import { pickImage } from '../../../lib/media';
import { SectionShell } from '../../../components/ui/SectionShell';
import { Button } from '../../../components/ui/Button';
import { JsonLd } from '../../../components/seo/JsonLd';
import { whatsappHref } from '../../../lib/format';
import { FINANCIAL_SERVICES_DISCLAIMER } from '../../../shared/constants';

export const metadata = buildMetadata({
  title: 'Education Loan Guidance & Support',
  description:
    'Shine Consultant helps students navigate education loan options for studying abroad. We guide you through the documentation, eligibility requirements, and application process.',
  path: '/education-loan',
});

const LOAN_FEATURES = [
  {
    icon: GraduationCap,
    title: 'Covers Tuition & Living Costs',
    description:
      'Education loans typically cover tuition fees, hostel accommodation, travel expenses, book purchases, and other living costs abroad.',
  },
  {
    icon: Landmark,
    title: 'Government & Private Bank Options',
    description:
      'Multiple financing channels are available — nationalised banks, private banks, and NBFCs each offer different terms, interest rates, and repayment structures.',
  },
  {
    icon: FileCheck2,
    title: 'Documentation & Eligibility Guidance',
    description:
      'Our counsellors help you understand the documentation requirements, co-applicant criteria, collateral norms, and eligibility benchmarks across lenders.',
  },
  {
    icon: Clock,
    title: 'Moratorium Period Awareness',
    description:
      'Most education loans offer a moratorium (repayment holiday) covering the course duration plus 6 to 12 months after completion, giving graduates time to find employment.',
  },
  {
    icon: ShieldCheck,
    title: 'Interest Subsidy Schemes',
    description:
      'Government interest subsidy schemes exist for students from economically weaker sections. We help eligible students understand and apply for these concessions.',
  },
  {
    icon: Handshake,
    title: 'End-to-End Application Support',
    description:
      'From shortlisting suitable lenders to assembling the application dossier and coordinating with bank officials, our team supports you at every step.',
  },
];

const LOAN_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Profile Assessment',
    description:
      'Our counsellors review your admission offer, chosen university, course fees, and family financial profile to determine the most appropriate financing route.',
  },
  {
    step: '02',
    title: 'Lender Shortlisting',
    description:
      'Based on your requirements, we identify banks and financial institutions that offer competitive interest rates, favourable collateral terms, and adequate coverage.',
  },
  {
    step: '03',
    title: 'Documentation Preparation',
    description:
      'We guide you through assembling the complete application package — admission letters, fee structure, income proof, identity documents, property papers, and guarantor details.',
  },
  {
    step: '04',
    title: 'Application & Follow-Up',
    description:
      'Once your dossier is ready, we assist with submitting the application and coordinate with bank officials to expedite processing and resolve any queries.',
  },
  {
    step: '05',
    title: 'Disbursement Coordination',
    description:
      'After sanction, we help coordinate the disbursement schedule with your university fee payment deadlines, ensuring funds reach the institution on time.',
  },
];

const trail = [
  { label: 'Home', href: '/' },
  { label: 'Education Loan', href: '/education-loan' },
];

export default function EducationLoanPage() {
  const contact = getContact();
  const destinations = getDestinations();
  const services = getServices();
  const settings = getSettings();
  const home = getHomeContent();
  const sections = home ?? {};

  const stats = [
    destinations.length > 0
      ? {
          value: '10+',
          label: 'Destinations',
          srLabel: 'Study Destinations',
        }
      : null,
    services.length > 0
      ? {
          value: 6,
          label: 'Services',
          srLabel: 'Services',
        }
      : null,
  ].filter(Boolean);

  const heroImage = pickImage(sections.hero?.backgroundImage, {
    fallbackKey: 'hero',
    alt: 'A smiling student holding notebooks, with a university campus behind her and a plane tracing an arc through a field of stars',
  });

  const socialLinks = (settings?.socialLinks ?? [])
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const directWhatsapp = whatsappHref(
    contact?.whatsappNumber,
    'Hi Shine Consultant, I need guidance regarding education loan options for studying abroad.'
  );

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      {/* Hero matching Home Page */}
      <EditorialHero
        content={sections.hero}
        stats={stats}
        socialLinks={socialLinks}
        image={heroImage}
      />

      {/* What Education Loans Cover */}
      <SectionShell
        id="loan-features"
        eyebrow="Education Loan Guidance"
        title="Comprehensive Education Loan Guidance"
        intro="Financing your international education is a critical step. Our advisory team guides students through every aspect of education loan planning — from understanding eligibility to coordinating with lenders."
        surface="white"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {LOAN_FEATURES.map((feature) => {
            const FeatureIcon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-xl border border-navy/10 bg-ivory p-6 shadow-card transition-shadow duration-base hover:shadow-card-hover"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sage text-navy">
                  <FeatureIcon className="h-5 w-5 stroke-[1.8]" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading text-h3 font-bold text-navy">
                  {feature.title}
                </h3>
                <p className="mt-2 text-caption text-charcoal-70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </SectionShell>

      {/* How the Process Works */}
      <SectionShell
        id="loan-process"
        eyebrow="Step by step"
        title="How Our Guidance Process Works"
        intro="A structured, transparent process from your first enquiry to loan disbursement."
        surface="ivory"
      >
        <div className="space-y-6">
          {LOAN_PROCESS_STEPS.map((item) => (
            <div
              key={item.step}
              className="flex gap-5 rounded-xl border border-navy/10 bg-white p-6 sm:p-8"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-body font-bold text-white">
                {item.step}
              </span>
              <div>
                <h3 className="font-heading text-h3 font-bold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-caption text-charcoal-70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* Key Facts */}
      <SectionShell
        id="key-facts"
        eyebrow="Good to know"
        title="Key Things to Know About Education Loans"
        surface="white"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              title: 'Loan amounts vary by destination',
              body: 'Banks typically sanction higher amounts for top-ranked universities in countries like the US, UK, Canada, and Australia. The loan quantum depends on the university ranking, course fees, and your financial profile.',
            },
            {
              title: 'Collateral & non-collateral options',
              body: 'Loans up to a certain threshold (commonly ₹7.5 lakh for certain government schemes) may not require collateral. Higher amounts typically require property or fixed deposit security.',
            },
            {
              title: 'Co-applicant requirement',
              body: "Most banks require a parent, guardian, or spouse as a co-applicant. The co-applicant's income and credit history influence the sanctioned amount and interest rate.",
            },
            {
              title: 'Tax benefits under Section 80E',
              body: 'The interest paid on education loans qualifies for tax deduction under Section 80E of the Income Tax Act, with no upper limit on the deduction amount. This benefit is available for up to 8 years.',
            },
          ].map((fact) => (
            <div
              key={fact.title}
              className="flex items-start gap-4 rounded-lg border border-navy/10 bg-ivory p-6"
            >
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <h3 className="font-heading text-body font-bold text-navy">
                  {fact.title}
                </h3>
                <p className="mt-1.5 text-caption text-charcoal-70 leading-relaxed">
                  {fact.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* Disclaimer */}
      <div className="bg-white">
        <div className="shell pb-8">
          <div className="rounded-lg border-l-4 border-accent bg-white p-5 sm:p-6">
            <p className="text-caption text-charcoal-70 leading-relaxed">
              <strong className="font-semibold text-navy">Important:</strong>{' '}
              {FINANCIAL_SERVICES_DISCLAIMER}{' '}
              We guide students through the loan landscape and help with documentation, but the loan is sanctioned and disbursed directly by the bank or financial institution. All loan terms, interest rates, and conditions are determined by the respective lender.
            </p>
          </div>
        </div>
      </div>

      {/* Contact CTA Section */}
      <section className="bg-navy on-navy">
        <div className="shell py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow-on-navy">Need Help?</span>
            <h2 className="mt-3 text-h1 font-extrabold text-white">
              Get End-to-End Education Loan Support
            </h2>
            <p className="mx-auto mt-5 max-w-prose text-lead text-white/75">
              From understanding eligibility criteria to assembling your complete loan dossier, our experienced counsellors at Shine Consultant are here to guide you through every step. Reach out to us for personalised, one-on-one support.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/book-consultation" size="lg">
                Book Free Consultation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="/contact" variant="inverse" size="lg">
                Contact Us
                <Phone className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            {directWhatsapp ? (
              <div className="mt-6">
                <a
                  href={directWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-caption font-semibold text-white/80 transition-colors hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
                  <span>Or enquire directly on WhatsApp</span>
                </a>
              </div>
            ) : null}

            <p className="mx-auto mt-8 max-w-measure text-caption text-white/50">
              Shine Consultant — Overseas Education, Migration &amp; Training. Gold Crest Business Center, Borivali West, Mumbai.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
