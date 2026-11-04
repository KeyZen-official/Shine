'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import {
  Code2,
  Briefcase,
  Cpu,
  Database,
  HeartPulse,
  TrendingUp,
  Video,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const ICON_MAP = {
  Code2,
  Briefcase,
  Cpu,
  Database,
  HeartPulse,
  TrendingUp,
  Video,
};

export function PopularCoursesSection({ courses = [] }) {
  const scrollRef = useRef(null);

  if (!courses?.length) return null;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="courses" className="section-y bg-white">
      <div className="shell">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-2.5">
              <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-accent">
                POPULAR COURSES
              </span>
              <span className="h-[2px] w-8 rounded-full bg-accent inline-block" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-navy leading-tight tracking-tight">
              Find the Right Course for Your Future
            </h2>
          </div>

          {/* Left / Right Carousel Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Previous courses"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 text-navy transition-all hover:bg-navy hover:text-white hover:border-navy"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Next courses"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 text-navy transition-all hover:bg-accent hover:text-white hover:border-accent"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Courses Track */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {courses.map((course, i) => {
            const IconComponent = ICON_MAP[course.icon] || Briefcase;
            return (
              <div
                key={i}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[22px] border border-navy/10 bg-[#FAF8F3] p-5 shadow-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 w-[260px] sm:w-[290px] shrink-0 snap-start"
              >
                <div>
                  {/* Image Thumbnail with Overlay Icon */}
                  <div className="relative w-full h-36 overflow-hidden rounded-xl border border-navy/10 shadow-sm mb-4 bg-navy/5">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-white/95 text-accent shadow-md backdrop-blur-sm border border-navy/5">
                      <IconComponent className="h-5 w-5 stroke-[2]" />
                    </div>
                  </div>

                  {/* Course Details */}
                  <h3 className="font-heading text-lg font-bold text-navy leading-snug group-hover:text-accent transition-colors">
                    {course.shortTitle || course.title}
                  </h3>
                  <p className="mt-2 text-caption text-charcoal/75 leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                </div>

                {/* Explore Courses Link */}
                <div className="mt-5 pt-3 border-t border-navy/10 flex items-center justify-between">
                  <Link
                    href={course.href || '/contact'}
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-accent transition-colors hover:text-accent-hover"
                  >
                    Explore Courses
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PopularCoursesSection;

