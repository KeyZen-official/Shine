import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs';

/**
 * Shared document layout for the three legal routes: breadcrumb, h1, table
 * of contents, numbered prose sections, last-updated line.
 *
 * It contains no card grid, so the three legal pages cost nothing against
 * the grid-reuse budget.
 */
export function LegalDocument({ title, intro, lastUpdated, sections = [], draftNotice }) {
  const trail = [
    { label: 'Home', href: '/' },
    { label: title, href: '#' },
  ];

  return (
    <>
      <section className="bg-sage">
        <div className="shell py-12 lg:py-16">
          <Breadcrumbs trail={trail} surface="light" />
          <h1 className="mt-6 max-w-3xl text-h1 font-extrabold">{title}</h1>
          {intro ? (
            <p className="mt-5 max-w-prose text-lead text-charcoal-70">{intro}</p>
          ) : null}
          {lastUpdated ? (
            <p className="mt-6 text-caption text-charcoal-50">Last updated: {lastUpdated}</p>
          ) : null}
        </div>
      </section>

      <div className="shell section-y">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="font-heading text-caption font-bold uppercase tracking-[0.1em] text-navy">
              Contents
            </h2>
            <ol className="mt-4 space-y-1">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded-sm py-1.5 text-caption text-charcoal-70 underline-offset-2 hover:text-navy hover:underline"
                  >
                    {index + 1}. {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0">
            {draftNotice ? (
              <div className="mb-10 flex gap-3 rounded-lg border border-accent/30 bg-accent/5 p-5">
                <AlertTriangle
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <p className="text-caption leading-relaxed text-charcoal-70">{draftNotice}</p>
              </div>
            ) : null}

            <ol className="space-y-12">
              {sections.map((section, index) => (
                <li key={section.id} id={section.id}>
                  <h2 className="text-h2 font-bold">
                    <span className="mr-2 text-accent">{index + 1}.</span>
                    {section.heading}
                  </h2>
                  <div className="prose-content mt-5">
                    {section.body.map((paragraph, paragraphIndex) =>
                      Array.isArray(paragraph) ? (
                        <ul key={paragraphIndex} className="max-w-prose space-y-2 pl-5">
                          {paragraph.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="list-disc text-body text-charcoal-70"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p key={paragraphIndex}>{paragraph}</p>
                      ),
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-16 border-t border-navy/10 pt-8 text-caption text-charcoal-70">
              Questions about this document?{' '}
              <Link
                href="/contact"
                className="font-semibold text-navy underline underline-offset-2 hover:text-accent"
              >
                Contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
