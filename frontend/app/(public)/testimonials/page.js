import {
  Users,
  GraduationCap,
  Globe,
  Star,
} from 'lucide-react';
import { buildMetadata } from '../../../lib/seo';
import { getSettings } from '../../../lib/content';
import { EditorialHero } from '../../../components/sections/EditorialHero';
import { SectionShell } from '../../../components/ui/SectionShell';
import { FinalCta } from '../../../components/sections/FinalCta';
import TestimonialsCarousel from './TestimonialsCarousel';

export const metadata = buildMetadata({
  title: 'Testimonials',
  description:
    'Hear from students, professionals and families who trusted Shine Consultant with their overseas education and immigration journey.',
  path: '/testimonials',
});

/* ── Google Review screenshots ────────────────────────────────── */
const REVIEW_SCREENSHOTS = [
  { src: '/Reviews/review-apurv-nerurkar.jpg', alt: 'Google review by Apurv Nerurkar' },
  { src: '/Reviews/review-ashwin-singh.jpg', alt: 'Google review by Ashwin Singh' },
  { src: '/Reviews/review-dolwin-menezes.jpg', alt: 'Google review by Dolwin Menezes' },
  { src: '/Reviews/review-krishnasagar-thakkar.jpg', alt: 'Google review by Krishnasagar Thakkar' },
  { src: '/Reviews/review-madan-panth.jpg', alt: 'Google review by Madan Panth' },
  { src: '/Reviews/review-parth-gala.jpg', alt: 'Google review by Parth Gala' },
  { src: '/Reviews/review-raj-ajmera.jpg', alt: 'Google review by Raj Ajmera' },
];

/* ── Student photos gallery ───────────────────────────────────── */
const STUDENT_PHOTOS = [
  '/Reviews/WhatsApp Image 2026-11-18 at 2.15.32 PM (1).jpeg',
  '/Reviews/WhatsApp Image 2026-11-18 at 2.15.32 PM (2).jpeg',
  '/Reviews/WhatsApp Image 2026-11-18 at 2.15.33 PM.jpeg',
  '/Reviews/WhatsApp Image 2026-11-18 at 2.15.33 PM (1).jpeg',
  '/Reviews/WhatsApp Image 2026-11-18 at 2.15.33 PM (2).jpeg',
  '/Reviews/WhatsApp Image 2026-11-18 at 2.15.34 PM.jpeg',
  '/Reviews/WhatsApp Image 2026-11-18 at 2.15.34 PM (1).jpeg',
  '/Reviews/WhatsApp Image 2026-11-18 at 2.15.34 PM (2).jpeg',
];

/* ── Quick pillars ────────────────────────────────────────────── */
const PILLARS = [
  { icon: Users, title: 'Happy Students', subtitle: 'Globally placed' },
  { icon: GraduationCap, title: 'University Admits', subtitle: 'Across 10+ countries' },
  { icon: Globe, title: 'Visa Success', subtitle: 'High approval rate' },
  { icon: Star, title: '5-Star Reviews', subtitle: 'On Google' },
];

export default function TestimonialsPage() {
  const settings = getSettings();
  const socialLinks = (settings?.socialLinks ?? [])
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const heroImage = {
    fallbackUrl: '/imagery/counsellor-consultation.jpg',
    alt: 'Students and clients in an educational advisory session with Shine Consultant',
    width: 2560,
    height: 1024,
    variants: {
      w360: '/imagery/counsellor-consultation.jpg',
      w768: '/imagery/counsellor-consultation.jpg',
      w1024: '/imagery/counsellor-consultation.jpg',
      w1920: '/imagery/counsellor-consultation.jpg',
    },
  };

  const heroContent = {
    eyebrow: 'CLIENT STORIES — TESTIMONIALS',
    headline: 'What Our Clients Say About Us.',
    supportingLine:
      'Hear from students, professionals and families who trusted Shine Consultant with their overseas education and immigration journey.',
    primaryCtaLabel: 'Book Free Consultation',
    primaryCtaHref: '/book-consultation',
  };

  const stats = [
    { value: '5★', label: 'Google Rating', srLabel: 'Google rating' },
    { value: '10+', label: 'Years Experience', srLabel: 'Years of experience', featureLabel: 'years' },
  ];

  return (
    <>
      {/* 1 — Hero: Same EditorialHero as Home page */}
      <EditorialHero
        content={heroContent}
        stats={stats}
        socialLinks={socialLinks}
        image={heroImage}
        brandTagline="Honest, Unbiased & Professional Guidance"
      />

      {/* 2 — Quick Pillars Strip */}
      <div className="border-y border-navy/10 bg-[#FAF8F3] py-6 sm:py-8">
        <div className="shell">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {PILLARS.map((pillar, idx) => {
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

      {/* 3 — Circular Testimonials Carousel (Client Component) */}
      <SectionShell
        id="testimonials"
        eyebrow="Success stories"
        title="Voices of Our Students"
        intro="Every journey is unique. Here are some of the students and professionals who achieved their goals with our guidance."
        surface="ivory"
      >
        <TestimonialsCarousel />
      </SectionShell>

      {/* 4 — Google Reviews Screenshots */}
      <SectionShell
        id="google-reviews"
        eyebrow="Google reviews"
        title="What People Say on Google"
        intro="Real reviews from real clients — straight from our Google Business profile."
        surface="white"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEW_SCREENSHOTS.map((review, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-navy/10 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <img
                src={review.src}
                alt={review.alt}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </SectionShell>

      {/* 5 — Student Photos Gallery */}
      <SectionShell
        id="student-gallery"
        eyebrow="Our students"
        title="Students at Shine Consultant"
        intro="Moments captured at our office with students who are now pursuing their dreams abroad."
        surface="ivory"
      >
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {STUDENT_PHOTOS.map((src, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-2xl border border-navy/10 aspect-[3/4] bg-sage/30"
            >
              <img
                src={src}
                alt={`Student at Shine Consultant office ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </SectionShell>

      {/* 6 — CTA */}
      <FinalCta
        content={{
          headline: 'Start Your Journey Today',
          supportingLine:
            'Join hundreds of students who have achieved their dreams with Shine Consultant. Book a free consultation today.',
          ctaLabel: 'Book Free Consultation',
        }}
      />
    </>
  );
}
