'use client';

import React from 'react';
import { Award, Users, Target, Layers } from 'lucide-react';
import { FaqAccordion } from '@/components/ui/faq-chat-accordion';

const REASONS = [
  {
    icon: Award,
    title: 'Professional Counselling',
    description: 'Guidance from experienced education experts.',
  },
  {
    icon: Users,
    title: 'Experienced Teachers',
    description: 'Trainers with proven expertise in IELTS preparation.',
  },
  {
    icon: Target,
    title: 'Personalised Attention',
    description: 'Focused support based on your current level.',
  },
  {
    icon: Layers,
    title: 'Structured Preparation',
    description: 'A step-by-step plan to help you achieve your target score.',
  },
];

const IELTS_FAQS = [
  {
    id: 1,
    question: 'What is the IELTS test?',
    answer:
      'The International English Language Testing System (IELTS) is a globally recognised standardised test designed to assess the language proficiency of individuals who wish to study, work or migrate where English is used as the language of communication.',
    icon: '💬',
  },
  {
    id: 2,
    question: 'What is a good IELTS score?',
    answer:
      'IELTS scores are reported on a 9-band scale from 1 (Non-user) to 9 (Expert user). Most top international universities typically look for an overall band score of 6.5 to 7.5, with no individual skill component below 6.0.',
  },
  {
    id: 3,
    question: 'Which IELTS version should I take?',
    answer:
      'Take IELTS Academic if you are applying for undergraduate, postgraduate, or professional medical registration abroad. Choose IELTS General Training if you are planning to migrate to Australia, Canada, New Zealand or the UK, or enrolling in vocational programmes.',
  },
  {
    id: 4,
    question: 'How long does the IELTS test take?',
    answer:
      'The total test duration is approximately 2 hours and 45 minutes: Listening (30 minutes), Reading (60 minutes), Writing (60 minutes), and Speaking (11 to 14 minutes face-to-face with a certified examiner).',
    icon: '💡',
  },
  {
    id: 5,
    question: 'How can Shine Consultant help me improve my score?',
    answer:
      'Shine Consultant provides diagnostic profiling, small batch interactive sessions, full-length timed mock tests, personalized error analysis, and expert feedback across all four papers to help you achieve your target band.',
  },
];

export function WhyChooseIeltsAndFaqSection() {
  return (
    <section id="why-choose-ielts-faqs" className="section-y bg-[#FAF9F5]">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Why Choose Shine Consultant? */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight tracking-tight mb-8">
              Why Choose Shine Consultant?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REASONS.map((reason, idx) => {
                const IconComp = reason.icon;
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

          {/* Right Column: Frequently Asked Questions with Home Page FaqAccordion */}
          <div className="lg:col-span-7 rounded-[28px] border border-navy/10 bg-white p-6 sm:p-9 shadow-card">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy leading-tight tracking-tight mb-6">
              Frequently Asked Questions
            </h2>

            {/* Exact same FaqAccordion component used on Home Page */}
            <FaqAccordion
              data={IELTS_FAQS}
              timestamp={null}
              className="p-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseIeltsAndFaqSection;

