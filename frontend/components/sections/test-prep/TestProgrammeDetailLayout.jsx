'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  TrendingUp,
  Headphones,
  Users,
  Calendar,
  Clock,
  Target,
  Award,
  Layers,
  Briefcase,
  Edit3,
  MessageSquare,
  CheckCircle2,
  Calculator,
  Laptop,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EditorialHero } from '@/components/sections/EditorialHero';
import { FaqAccordion } from '@/components/ui/faq-chat-accordion';

const ICON_MAP = {
  GraduationCap,
  BookOpen,
  TrendingUp,
  Headphones,
  Users,
  Calendar,
  Clock,
  Target,
  Award,
  Layers,
  Briefcase,
  Edit3,
  MessageSquare,
  CheckCircle2,
  Calculator,
  Laptop,
  Sparkles,
};

function getIcon(name, fallback = BookOpen) {
  return ICON_MAP[name] ?? fallback;
}

export function TestProgrammeDetailLayout({
  test,
  data,
  socialLinks = [],
  heroImage,
}) {
  const {
    heroContent,
    heroStats,
    benefitIndicators = [],
    about,
    versions,
    modules = [],
    benefits = [],
    teachingSteps = [],
    reasons = [],
    faqs = [],
    finalCta,
  } = data;

  const [aboutImgSrc, setAboutImgSrc] = React.useState(heroImage);
  const [studentImgSrc, setStudentImgSrc] = React.useState('/imagery/ielts-student-headphones.jpg');

  return (
    <>
      {/* 1. HERO SECTION (Signature EditorialHero matching Home & IELTS) */}
      <EditorialHero
        content={heroContent}
        stats={heroStats}
        socialLinks={socialLinks}
        image={{
          src: heroImage,
          fallbackUrl: heroImage,
          alt: `${test.name} Preparation at Shine Consultant`,
          width: 1920,
          height: 1080,
        }}
        brandTagline="Honest, unbiased & professional guidance — from Borivali West, Mumbai"
      />

      {/* 2. FOUR BENEFIT INDICATORS QUICK STRIP */}
      <div className="border-y border-navy/10 bg-[#FAF9F5] py-6 sm:py-8">
        <div className="shell">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {benefitIndicators.map((item, idx) => {
              const IconComp = getIcon(item.icon, GraduationCap);
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-4 lg:px-6 ${
                    idx < 3 ? 'lg:border-r lg:border-navy/10' : ''
                  }`}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <IconComp className="h-6 w-6 stroke-[1.8]" />
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold text-navy">{item.title}</p>
                    <p className="text-caption text-charcoal/70">{item.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. ABOUT THE TEST SECTION */}
      <section id={`about-${test.slug}`} className="section-y bg-[#FAF9F5]">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Rounded Photograph with Red Accent & Floating Navy Badge */}
            <div className="lg:col-span-5 relative">
              {/* Red Accent Decorative Corner Curve */}
              <div
                aria-hidden="true"
                className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-28 sm:w-36 h-28 sm:h-36 bg-accent rounded-tl-[36px] rounded-br-[48px] -z-0 opacity-95 shadow-md"
              />

              <div className="relative z-10 overflow-hidden rounded-[28px] sm:rounded-[36px] shadow-2xl border-4 border-white bg-navy aspect-[4/3] sm:aspect-[16/12]">
                <img
                  src={aboutImgSrc}
                  alt={`${test.name} study preparation at Shine Consultant`}
                  onError={() => setAboutImgSrc('/imagery/ielts-about-library.jpg')}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Navy Label */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="flex items-center gap-3.5 rounded-2xl bg-[#10243D]/95 p-3.5 sm:p-4 text-white shadow-xl backdrop-blur-md border border-white/15">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-white shadow-md">
                      <BookOpen className="h-6 w-6 stroke-[2]" />
                    </div>
                    <div>
                      <p className="font-heading text-sm sm:text-base font-extrabold text-white tracking-wide">
                        {about.badgeTitle}
                      </p>
                      <p className="text-micro sm:text-xs text-white/80 font-medium mt-0.5">
                        {about.badgeSubtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Overview Heading & 3 Horizontal Cards */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2.5 mb-2.5">
                <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-accent">
                  OVERVIEW
                </span>
                <span className="h-[2px] w-8 rounded-full bg-accent inline-block" />
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-navy leading-tight tracking-tight mb-4">
                About the {test.name} Test
              </h2>

              <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed mb-8 max-w-2xl">
                {about.overviewText}
              </p>

              {/* Three Horizontally Aligned White Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                {about.cards.map((card, idx) => {
                  const IconComp = getIcon(card.icon, Users);
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent mb-3.5">
                          <IconComp className="h-5 w-5 stroke-[2]" />
                        </div>
                        <h3 className="font-heading text-base font-bold text-navy leading-snug mb-1.5">
                          {card.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VERSIONS & COACHING MODULES SECTION */}
      <section id={`${test.slug}-versions`} className="section-y bg-white">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Soft Mint Panel for Test Versions */}
            <div className="lg:col-span-5 rounded-[28px] border border-navy/10 bg-[#EAF5F1] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-accent">
                    {versions.eyebrow}
                  </span>
                  <span className="h-[2px] w-6 rounded-full bg-accent inline-block" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy leading-tight tracking-tight mb-6">
                  {versions.title}
                </h2>

                <div className="space-y-5">
                  {versions.items.map((ver, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-6 shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-3.5 mb-3">
                          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${idx === 0 ? 'bg-accent/10 text-accent' : 'bg-navy/10 text-navy'}`}>
                            <GraduationCap className="h-6 w-6 stroke-[2]" />
                          </div>
                          <div>
                            <h3 className="font-heading text-lg font-bold text-navy leading-snug">
                              {ver.title}
                            </h3>
                            <span className="text-micro font-heading font-semibold text-accent uppercase tracking-wider">
                              {ver.subtitle}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed mb-4">
                          {ver.description}
                        </p>

                        <ul className="space-y-1.5 mb-5 text-xs text-charcoal/75">
                          {ver.bullets.map((b, bIdx) => (
                            <li key={bIdx} className="flex items-center gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        href="/book-consultation"
                        variant="primary"
                        size="sm"
                        className="w-full bg-accent text-white hover:bg-accent-hover font-heading text-xs sm:text-sm font-bold py-2.5 rounded-xl shadow-xs inline-flex items-center justify-center gap-2"
                      >
                        {ver.ctaLabel}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-navy/10 flex items-center justify-between text-xs text-charcoal/70">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Diagnostic assessment before admission
                </span>
                <Link
                  href="/contact"
                  className="text-accent font-semibold hover:underline"
                >
                  Ask a Counsellor →
                </Link>
              </div>
            </div>

            {/* Right Column: Coaching Modules */}
            <div className="lg:col-span-7 rounded-[28px] border border-navy/10 bg-[#FAF9F5] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-accent">
                    COMPREHENSIVE SYLLABUS
                  </span>
                  <span className="h-[2px] w-6 rounded-full bg-accent inline-block" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy leading-tight tracking-tight mb-2">
                  Coaching Modules
                </h2>
                <p className="text-xs sm:text-sm text-charcoal/75 mb-6">
                  Personalised coaching designed for all core papers, analytical skills, and scoring criteria.
                </p>

                {/* Modules Grid */}
                <div className={`grid grid-cols-1 ${modules.length >= 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-4 sm:gap-5 mb-6`}>
                  {modules.map((mod, idx) => {
                    const ModIcon = getIcon(mod.icon, BookOpen);
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                              <ModIcon className="h-5 w-5 stroke-[2]" />
                            </span>
                            {mod.duration && (
                              <span className="text-[10px] sm:text-micro font-heading font-semibold uppercase tracking-wider text-charcoal/60 bg-navy/5 px-2.5 py-1 rounded-full">
                                {mod.duration}
                              </span>
                            )}
                          </div>

                          <h3 className="font-heading text-base font-bold text-navy leading-snug mb-2">
                            {mod.title}
                          </h3>

                          <p className="text-xs text-charcoal/75 leading-relaxed mb-4">
                            {mod.focus}
                          </p>

                          <ul className="space-y-1.5 text-xs text-charcoal/70">
                            {mod.bullets.map((mb, mbIdx) => (
                              <li key={mbIdx} className="flex items-start gap-1.5">
                                <CheckCircle2 className="h-3 w-3 text-accent shrink-0 mt-0.5" />
                                <span>{mb}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Support Banner */}
              <div className="rounded-2xl bg-gradient-to-r from-navy to-[#1B365D] p-5 sm:p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 text-center sm:text-left">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white shadow-md">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-heading text-sm sm:text-base font-bold text-white">
                      Timed Mock Test Simulations Included
                    </h4>
                    <p className="text-micro sm:text-xs text-white/80">
                      Regular mock tests under official exam conditions with individual error logs.
                    </p>
                  </div>
                </div>

                <Button
                  href="/book-consultation"
                  variant="primary"
                  size="sm"
                  className="shrink-0 bg-accent text-white hover:bg-accent-hover font-heading text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-md whitespace-nowrap"
                >
                  Book Free Assessment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT STUDENTS GET SECTION */}
      <section id="what-students-get" className="section-y bg-[#FAF9F5]">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Heading & 6 Compact White Cards in 2 columns */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-navy leading-tight tracking-tight mb-8">
                What Students Get
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-navy/10 bg-white p-4 sm:p-5 shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-3.5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <CheckCircle2 className="h-4.5 w-4.5 text-accent stroke-[2.5]" />
                    </span>
                    <span className="font-heading text-sm font-bold text-navy leading-snug">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Student with Headphones & Red Accent Top-Right Curve */}
            <div className="lg:col-span-5 relative">
              <div
                aria-hidden="true"
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-28 sm:w-36 h-28 sm:h-36 bg-accent rounded-tr-[36px] rounded-bl-[48px] -z-0 opacity-95 shadow-md"
              />

              <div className="relative z-10 overflow-hidden rounded-[28px] sm:rounded-[36px] shadow-2xl border-4 border-white bg-navy aspect-[4/3] sm:aspect-[16/12]">
                <img
                  src={studentImgSrc}
                  alt={`${test.name} coaching student studying in library`}
                  onError={() => setStudentImgSrc('/imagery/services-education.jpg')}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR TEACHING APPROACH SECTION */}
      <section id="teaching-approach" className="section-y bg-[#EAF5F1]">
        <div className="shell">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-navy leading-tight tracking-tight">
              Our Teaching Approach
            </h2>
          </div>

          <div className="relative">
            {/* Desktop Connecting Line */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-7 left-12 right-12 h-[2px] bg-navy/15 -z-0"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
              {teachingSteps.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="flex h-14 w-14 sm:h-15 sm:w-15 items-center justify-center rounded-full bg-white border-2 border-accent text-accent font-heading text-lg font-extrabold shadow-md mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                    {item.step}
                  </div>

                  <h3 className="font-heading text-base sm:text-lg font-bold text-navy leading-snug mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed max-w-xs">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE SHINE CONSULTANT + FAQ SECTION */}
      <section id="why-choose-faqs" className="section-y bg-[#FAF9F5]">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Why Choose Shine Consultant? */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight tracking-tight mb-8">
                Why Choose Shine Consultant?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reasons.map((reason, idx) => {
                  const IconComp = getIcon(reason.icon, Award);
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent mb-3.5">
                          <IconComp className="h-5 w-5 stroke-[2]" />
                        </div>
                        <h3 className="font-heading text-base font-bold text-navy leading-snug mb-1.5">
                          {reason.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: FAQ Accordion */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-accent">
                  COMMON QUESTIONS
                </span>
                <span className="h-[2px] w-6 rounded-full bg-accent inline-block" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy leading-tight tracking-tight mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/75 mb-6">
                Direct answers to common questions about {test.name} testing, eligibility, scoring, and coaching batches.
              </p>

              <FaqAccordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA SECTION (Dark Navy with Landmark Skyline) */}
      <section className="pb-16 sm:pb-20 pt-4 bg-[#FAF9F5]">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[32px] bg-[#0B192B] p-8 sm:p-12 shadow-2xl border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left: Global Landmark Skyline Vector Graphic */}
              <div className="lg:col-span-3 flex justify-center lg:justify-start">
                <svg
                  viewBox="0 0 280 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-48 sm:w-56 h-auto text-white/40"
                  aria-hidden="true"
                >
                  <circle cx="170" cy="65" r="32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="170" cy="65" r="4" fill="currentColor" />
                  <path d="M170 65L170 115M170 65L145 115M170 65L195 115" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M45 115V45L55 20L65 45V115H45Z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="55" cy="55" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M90 115V60C90 48 108 48 108 60V115" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M225 115V35L235 15L245 35V115" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="10" y1="115" x2="270" y2="115" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>

              {/* Centre: Heading & Description */}
              <div className="lg:col-span-6 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight mb-3">
                  {finalCta.headline}
                </h2>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
                  {finalCta.description}
                </p>
              </div>

              {/* Right: Bright Red Rounded Button */}
              <div className="lg:col-span-3 flex justify-center lg:justify-end">
                <Button
                  href="/book-consultation"
                  variant="primary"
                  className="bg-accent text-white hover:bg-accent-hover px-7 py-3.5 rounded-full font-heading text-sm sm:text-base font-bold shadow-lg inline-flex items-center gap-2 transition-transform duration-300 hover:scale-105"
                >
                  Book Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Subtle Background Glow */}
            <div
              aria-hidden="true"
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-accent/15 blur-3xl pointer-events-none"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default TestProgrammeDetailLayout;

