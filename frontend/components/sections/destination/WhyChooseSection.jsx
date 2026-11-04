import React from 'react';
import {
  Award,
  BookOpen,
  FlaskConical,
  Compass,
  Users,
  TrendingUp,
  GraduationCap,
} from 'lucide-react';

const ICON_MAP = {
  Award,
  BookOpen,
  FlaskConical,
  Compass,
  Users,
  TrendingUp,
  GraduationCap,
};

export function WhyChooseSection({ destination, overview }) {
  if (!overview) return null;

  const points = overview.points || [
    {
      title: 'Globally recognised universities',
      description: 'A home to some of the world\'s leading institutions.',
      icon: 'Award',
    },
    {
      title: 'Wide range of academic programmes',
      description: 'Choose from thousands of courses across fields.',
      icon: 'BookOpen',
    },
    {
      title: 'Research and innovation opportunities',
      description: 'Be part of cutting-edge research and innovation.',
      icon: 'FlaskConical',
    },
    {
      title: 'Flexible academic pathways',
      description: 'Options to switch, specialise and grow your career.',
      icon: 'Compass',
    },
    {
      title: 'International student community',
      description: 'A diverse and inclusive learning environment.',
      icon: 'Users',
    },
    {
      title: 'Career development opportunities',
      description: 'Gain practical skills and strong industry exposure.',
      icon: 'TrendingUp',
    },
  ];

  const imageSrc = overview.image || `/destinations/${destination.slug}.jpg`;
  const imageBadge = overview.imageBadge || 'A Hub of Innovation, Research & Global Opportunities';

  return (
    <section id="overview" className="section-y bg-[#FAF8F3]">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Asymmetric Editorial Campus Image with Floating Card */}
          <div className="lg:col-span-6 relative">
            {/* Red Accent Curve Badge on Top Left */}
            <div
              aria-hidden="true"
              className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-28 sm:w-36 h-28 sm:h-36 bg-accent rounded-tl-[36px] rounded-br-[48px] -z-0 opacity-95 shadow-md"
            />

            <div className="relative z-10 overflow-hidden rounded-[28px] sm:rounded-[36px] shadow-2xl border-4 border-white bg-navy aspect-[4/3] sm:aspect-[16/11]">
              <img
                src={imageSrc}
                alt={`Studying in ${destination.name} — campus overview`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Navy Information Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <div className="flex items-center gap-3.5 rounded-2xl bg-[#10243D]/95 p-3.5 sm:p-4 text-white shadow-xl backdrop-blur-md border border-white/15">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-white shadow-md">
                    <GraduationCap className="h-6 w-6 stroke-[2]" />
                  </div>
                  <div>
                    <p className="font-heading text-xs sm:text-sm font-bold text-white leading-snug">
                      {imageBadge}
                    </p>
                    <p className="text-micro text-white/70 uppercase tracking-wider font-semibold mt-0.5">
                      Shine Consultant Advisory
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Heading & 6 Features */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2.5 mb-2.5">
              <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-accent">
                {overview.eyebrow || 'OVERVIEW'}
              </span>
              <span className="h-[2px] w-8 rounded-full bg-accent inline-block" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-navy leading-tight tracking-tight">
              {overview.title || `Why Choose ${destination.name}?`}
            </h2>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
              {points.map((pt, idx) => {
                const IconComponent = ICON_MAP[pt.icon] || Award;
                return (
                  <div key={idx} className="flex items-start gap-3.5 group">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 border border-accent/20 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                      <IconComponent className="h-5 w-5 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="font-heading text-sm sm:text-base font-bold text-navy leading-snug group-hover:text-accent transition-colors">
                        {pt.title}
                      </h3>
                      <p className="mt-1 text-caption text-charcoal/75 leading-relaxed">
                        {pt.description}
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
  );
}

export default WhyChooseSection;

