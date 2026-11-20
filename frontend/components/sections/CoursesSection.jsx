import React from 'react';
import {
  Briefcase, Code, BarChart, Beaker, Heart, Palette,
  Leaf, Scale, Globe, Cog,
} from 'lucide-react';

const COURSE_ICON_MAP = {
  Briefcase, Code, BarChart, Beaker, Heart, Palette,
  Leaf, Scale, Globe, Cog,
};

/**
 * Popular courses section: 6 course category cards with icons
 * in a 2×3 or 3×2 grid layout. Matches the reference design.
 */
export function CoursesSection({ courses = [] }) {
  if (!courses?.length) return null;

  return (
    <section id="courses" className="bg-white section-y">
      <div className="shell">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="eyebrow">Popular Courses</span>
          <span className="h-[2px] w-10 rounded-full bg-accent inline-block" />
        </div>
        <h2 className="text-h2 font-bold text-navy">Top Courses to Study</h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {courses.map((course, i) => {
            const IconComponent = COURSE_ICON_MAP[course.icon] || Briefcase;
            return (
              <div
                key={i}
                className="group flex flex-col items-center gap-3 rounded-xl border border-navy/10 bg-ivory p-5 text-center transition-all duration-300 hover:shadow-card hover:-translate-y-1 hover:border-accent/30"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent/20">
                  <IconComponent className="h-5 w-5 text-accent" />
                </div>
                <span className="font-heading text-caption font-semibold text-navy leading-snug">
                  {course.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CoursesSection;

