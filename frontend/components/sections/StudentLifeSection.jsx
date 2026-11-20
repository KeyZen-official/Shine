import React from 'react';
import {
  Home, UtensilsCrossed, Users, Calendar,
} from 'lucide-react';

const LIFE_ICON_MAP = {
  Home, UtensilsCrossed, Users, Calendar,
};

/**
 * Student life section: two-column layout with a student photo
 * on the left and lifestyle highlights on the right.
 */
export function StudentLifeSection({ destination, studentLifeData }) {
  if (!studentLifeData) return null;

  return (
    <section id="student-life" className="bg-ivory section-y">
      <div className="shell">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 items-center">
          {/* Left — image */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-card">
              <img
                src={`/destinations/${destination.slug}.jpg`}
                alt={`Student life in ${destination.name}`}
                className="w-full h-auto object-cover aspect-[3/4] max-h-[480px]"
                loading="lazy"
              />
            </div>
            {/* Graduation cap decorative element */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent shadow-lg"
            >
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15v3.75m0 0h10.5m-10.5 0L12 21.75l5.25-2.25" />
              </svg>
            </div>
          </div>

          {/* Right — content */}
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="eyebrow">Student Life</span>
              <span className="h-[2px] w-10 rounded-full bg-accent inline-block" />
            </div>
            <h2 className="text-h2 font-bold text-navy">
              {studentLifeData.title}
            </h2>
            <p className="mt-4 text-body text-charcoal-70 leading-relaxed">
              {studentLifeData.description}
            </p>

            {/* Highlights grid */}
            {studentLifeData.highlights?.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-4">
                {studentLifeData.highlights.map((item, i) => {
                  const IconComponent = LIFE_ICON_MAP[item.icon] || Home;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <IconComponent className="h-4.5 w-4.5 text-accent" />
                      </div>
                      <span className="text-caption font-semibold text-navy">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudentLifeSection;

