'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Briefcase,
  Headphones,
  BookOpen,
  Edit3,
  MessageSquare,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function IeltsVersionsAndModulesSection() {
  return (
    <section id="ielts-versions" className="section-y bg-white">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Soft Mint Panel for IELTS Versions */}
          <div className="lg:col-span-5 rounded-[28px] border border-navy/10 bg-[#EAF5F1] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-accent">
                  TARGETED COACHING
                </span>
                <span className="h-[2px] w-6 rounded-full bg-accent inline-block" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy leading-tight tracking-tight mb-6">
                IELTS Versions
              </h2>

              <div className="space-y-5">
                {/* Academic IELTS Card */}
                <div className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-6 shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3.5 mb-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <GraduationCap className="h-6 w-6 stroke-[2]" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-navy leading-snug">
                          Academic IELTS
                        </h3>
                        <span className="text-micro font-heading font-semibold text-accent uppercase tracking-wider">
                          Higher Education & Professional Licensure
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed mb-4">
                      Required for undergraduate, master’s and doctoral degrees, as well as medical and professional council registrations worldwide.
                    </p>

                    <ul className="space-y-1.5 mb-5 text-xs text-charcoal/75">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                        <span>University admission & scholarship eligibility</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                        <span>Complex academic texts & data reports</span>
                      </li>
                    </ul>
                  </div>

                  {/* Purposeful CTA Button */}
                  <Button
                    href="/book-consultation"
                    variant="primary"
                    size="sm"
                    className="w-full bg-accent text-white hover:bg-accent-hover font-heading text-xs sm:text-sm font-bold py-2.5 rounded-xl shadow-xs inline-flex items-center justify-center gap-2"
                  >
                    Enquire for Academic IELTS
                  </Button>
                </div>

                {/* General Training IELTS Card */}
                <div className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-6 shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3.5 mb-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
                        <Briefcase className="h-6 w-6 stroke-[2]" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-navy leading-snug">
                          General Training IELTS
                        </h3>
                        <span className="text-micro font-heading font-semibold text-navy/70 uppercase tracking-wider">
                          Immigration, PR & Vocational Work
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed mb-4">
                      Designed for applicants seeking Express Entry, Canadian PR, Australian skilled migration, work visas or secondary schooling abroad.
                    </p>

                    <ul className="space-y-1.5 mb-5 text-xs text-charcoal/75">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                        <span>Workplace communication & everyday social skills</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                        <span>General interest passages & formal letter writing</span>
                      </li>
                    </ul>
                  </div>

                  {/* Purposeful CTA Button */}
                  <Button
                    href="/contact"
                    variant="secondary"
                    size="sm"
                    className="w-full border border-navy/25 bg-white text-navy hover:bg-navy hover:text-white font-heading text-xs sm:text-sm font-bold py-2.5 rounded-xl shadow-xs inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    Contact Us for General Training
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom Advisory Helper */}
            <div className="mt-6 pt-4 border-t border-navy/10 flex items-center justify-between">
              <span className="text-xs text-charcoal/70">
                Unsure which version you need?
              </span>
              <Link
                href="/contact"
                className="text-xs font-heading font-bold text-accent hover:underline inline-flex items-center gap-1"
              >
                Contact Our Advisors
              </Link>
            </div>
          </div>

          {/* Right Column: What the Coaching Covers (Spacious 2x2 Grid) */}
          <div className="lg:col-span-7 rounded-[28px] border border-navy/10 bg-[#FAF9F5] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 mb-1.5">
                    <span className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-accent">
                      COMPREHENSIVE SYLLABUS
                    </span>
                    <span className="h-[2px] w-6 rounded-full bg-accent inline-block" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy leading-tight tracking-tight">
                    What the Coaching Covers
                  </h2>
                </div>

                <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent font-heading text-xs font-bold">
                  <Sparkles className="h-3.5 w-3.5" /> All 4 Modules
                </span>
              </div>

              {/* Spacious 2x2 Grid with generous width and no awkward line wraps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Listening Card */}
                <div className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-6 shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Headphones className="h-5 w-5 stroke-[2]" />
                      </div>
                      <span className="text-micro font-heading font-bold px-2.5 py-1 rounded-md bg-navy/5 text-navy border border-navy/10">
                        40 Qs • 30 Mins
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-navy leading-snug mb-2">
                      Listening
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed mb-3">
                      Improve your ability to understand key information, global English accents, and conversational context under timed conditions.
                    </p>

                    <ul className="space-y-1.5 text-xs text-charcoal/70">
                      <li className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>Accent exposure (British, Australian, North American)</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>Audio prediction &amp; note-taking strategies</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Reading Card */}
                <div className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-6 shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <BookOpen className="h-5 w-5 stroke-[2]" />
                      </div>
                      <span className="text-micro font-heading font-bold px-2.5 py-1 rounded-md bg-navy/5 text-navy border border-navy/10">
                        3 Texts • 60 Mins
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-navy leading-snug mb-2">
                      Reading
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed mb-3">
                      Build rapid reading speed, advanced vocabulary, scanning techniques, and critical comprehension across complex passages.
                    </p>

                    <ul className="space-y-1.5 text-xs text-charcoal/70">
                      <li className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>Skimming &amp; scanning under time pressure</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>True / False / Not Given &amp; Heading matching drills</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Writing Card */}
                <div className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-6 shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Edit3 className="h-5 w-5 stroke-[2]" />
                      </div>
                      <span className="text-micro font-heading font-bold px-2.5 py-1 rounded-md bg-navy/5 text-navy border border-navy/10">
                        2 Tasks • 60 Mins
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-navy leading-snug mb-2">
                      Writing
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed mb-3">
                      Learn to write clear, well-structured Task 1 visual reports/letters and cohesive Task 2 essays that meet official band descriptors.
                    </p>

                    <ul className="space-y-1.5 text-xs text-charcoal/70">
                      <li className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>Task achievement &amp; grammatical range</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>Individual line-by-line essay corrections</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Speaking Card */}
                <div className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-6 shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <MessageSquare className="h-5 w-5 stroke-[2]" />
                      </div>
                      <span className="text-micro font-heading font-bold px-2.5 py-1 rounded-md bg-navy/5 text-navy border border-navy/10">
                        3 Parts • 11–14 Mins
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-navy leading-snug mb-2">
                      Speaking
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed mb-3">
                      Develop natural fluency, coherence, pronunciation, lexical resource, and confidence for the face-to-face examiner interview.
                    </p>

                    <ul className="space-y-1.5 text-xs text-charcoal/70">
                      <li className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>Cue card Part 2 structure &amp; idea generation</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>1-on-1 mock interviews with audio recording analysis</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Strip */}
            <div className="mt-6 pt-5 border-t border-navy/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-xs sm:text-sm font-medium text-navy">
                Want to evaluate your current band score across all 4 modules?
              </span>
              <Button
                href="/book-consultation"
                variant="secondary"
                size="sm"
                className="self-start sm:self-auto border border-navy/20 bg-white text-navy hover:bg-navy hover:text-white text-xs font-heading font-bold px-4 py-2 rounded-xl shadow-xs transition-colors"
              >
                Book Diagnostic Session
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IeltsVersionsAndModulesSection;
