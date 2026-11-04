'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

/**
 * Sticky section nav for destination detail pages with a
 * "Download Brochure" button on the right, matching the reference design.
 *
 * Highlights the section currently in view via IntersectionObserver.
 */
export function DestinationSectionNav({ sections = [] }) {
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

  if (sections.length < 2) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-20 z-20 -mx-4 border-b border-navy/10 bg-white/95 px-4 backdrop-blur-safe-sm sm:-mx-6 sm:px-6"
    >
      <div className="flex items-center justify-between gap-4">
        <ul className="no-scrollbar flex gap-1 overflow-x-auto py-2 flex-1">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active === section.id ? 'true' : undefined}
                className={`inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full px-4 font-heading text-caption font-semibold transition-colors duration-fast ${
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

        {/* Download Brochure CTA */}
        <a
          href="/contact"
          className="hidden sm:inline-flex shrink-0 items-center gap-2 rounded-md border-[1.5px] border-accent px-4 py-2 font-heading text-caption font-semibold text-accent transition-all duration-200 hover:bg-accent hover:text-white"
        >
          <Download className="h-3.5 w-3.5" />
          Download Brochure
        </a>
      </div>
    </nav>
  );
}

export default DestinationSectionNav;

