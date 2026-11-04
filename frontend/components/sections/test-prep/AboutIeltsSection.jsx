'use client';

import React from 'react';
import { BookOpen, Users, Calendar, Target, Clock } from 'lucide-react';

export function AboutIeltsSection({
  image = '/imagery/ielts-about-library.jpg',
  fallbackImage = '/imagery/about-hero.jpg',
}) {
  const [imgSrc, setImgSrc] = React.useState(image);

  return (
    <section id="about-ielts" className="section-y bg-[#FAF9F5]">
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
                src={imgSrc}
                alt="Students studying for IELTS in modern library"
                onError={() => setImgSrc(fallbackImage)}
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
                      IELTS
                    </p>
                    <p className="text-micro sm:text-xs text-white/80 font-medium mt-0.5">
                      International English Language Testing System
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Overview Heading & 3 Horizontal Cards */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Red Eyebrow */}
            <div className="inline-flex items-center gap-2.5 mb-2.5">
              <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-accent">
                OVERVIEW
              </span>
              <span className="h-[2px] w-8 rounded-full bg-accent inline-block" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-navy leading-tight tracking-tight mb-4">
              About the IELTS Test
            </h2>

            <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed mb-8 max-w-2xl">
              IELTS (International English Language Testing System) is a globally recognised English proficiency test for higher education, work and migration.
            </p>

            {/* Three Horizontally Aligned White Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {/* Card 1 */}
              <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent mb-3.5">
                    <Users className="h-5 w-5 stroke-[2]" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-navy leading-snug mb-1.5">
                    Who Should Take It?
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                    Students, professionals and individuals planning to study, work or migrate abroad.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent mb-3.5">
                    <Calendar className="h-5 w-5 stroke-[2]" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-navy leading-snug mb-1.5">
                    Test Format
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                    Assesses your English skills in Listening, Reading, Writing and Speaking.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent mb-3.5">
                    <Clock className="h-5 w-5 stroke-[2]" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-navy leading-snug mb-1.5">
                    Test Duration
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                    Around 2 hours 45 minutes for all three written sections and speaking interview.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutIeltsSection;

