'use client';

import { useEffect, useState } from 'react';

/**
 * Sticky in-page jump nav for the destination detail page — the only page
 * that has one, because it is the only page long enough to need it.
 *
 * Highlights the section currently in view via IntersectionObserver rather
 * than scroll arithmetic, so it stays correct when sections omit
 * themselves for want of content.
 */
export function SectionNav({ sections = [] }) {
  const [active, setActive] = useState(sections[0]?.id ?? null);

  useEffect(() => {
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -60% 0px', threshold: 0 },
    );

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [sections]);

  if (sections.length < 3) return null;

  return (
    <nav
      aria-label="On this page"
      /* top-20, not top-16: the primary bar contracts to 64px tall and
         floats 12px down, so its underside sits at 76px. */
      className="sticky top-20 z-20 -mx-4 border-b border-navy/10 bg-ivory/95 px-4 backdrop-blur-safe-sm sm:-mx-6 sm:px-6"
    >
      <ul className="no-scrollbar flex gap-1 overflow-x-auto py-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={active === section.id ? 'true' : undefined}
              className={`inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-md px-3 font-heading text-caption font-semibold transition-colors duration-fast ${
                active === section.id
                  ? 'bg-navy text-white'
                  : 'text-charcoal-70 hover:bg-sage hover:text-navy'
              }`}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
