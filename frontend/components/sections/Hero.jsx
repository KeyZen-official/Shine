/**
 * Compact page masthead for index and detail routes.
 *
 * Typographic, with no photography, which is what keeps it visually
 * distinct from the home page hero (see EditorialHero). This file stays a
 * server component on purpose: it has no interactive behaviour, so it
 * should not drag a `use client` boundary into every page that renders a
 * page title.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  surface = 'navy',
  children,
  breadcrumbs,
  meta,
}) {
  const onNavy = surface === 'navy';

  return (
    <section
      className={`${onNavy ? 'bg-navy on-navy text-white' : 'bg-sage'} border-b ${
        onNavy ? 'border-white/10' : 'border-navy/10'
      }`}
    >
      <div className="shell py-14 lg:py-20">
        {breadcrumbs ? <div className="mb-6">{breadcrumbs}</div> : null}

        <div className="max-w-3xl">
          {eyebrow ? (
            <p className={onNavy ? 'eyebrow-on-navy' : 'eyebrow'}>{eyebrow}</p>
          ) : null}
          <h1 className={`mt-4 text-h1 font-extrabold ${onNavy ? 'text-white' : ''}`}>{title}</h1>
          {intro ? (
            <p className={`mt-5 text-lead ${onNavy ? 'text-white/75' : 'text-charcoal-70'}`}>
              {intro}
            </p>
          ) : null}
          {meta ? <div className="mt-6">{meta}</div> : null}
        </div>

        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
