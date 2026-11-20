/**
 * A section wrapper that disappears when it has nothing to show.
 *
 * `children` being null means the heading is not rendered either — an
 * "Our universities" heading above an empty space is worse than no section
 * at all, and this is where that rule is enforced rather than repeated in
 * every page.
 */
export function SectionShell({
  id,
  eyebrow,
  title,
  intro,
  level = 2,
  surface = 'ivory',
  align = 'left',
  action,
  children,
  className = '',
  containerClassName = '',
  padded = true,
}) {
  if (children === null || children === undefined || children === false) return null;

  const Heading = `h${level}`;
  const onNavy = surface === 'navy';

  const surfaceClasses = {
    ivory: 'bg-ivory',
    white: 'bg-white',
    sage: 'bg-sage',
    navy: 'bg-navy text-white on-navy',
    none: '',
  }[surface];

  return (
    <section
      id={id}
      className={`${surfaceClasses} ${padded ? 'section-y' : ''} ${className}`}
      {...(title ? { 'aria-labelledby': id ? `${id}-heading` : undefined } : {})}
    >
      <div className={`shell ${containerClassName}`}>
        {title || eyebrow || intro ? (
          <header
            className={`mb-10 flex flex-col gap-4 lg:mb-12 ${
              align === 'center' ? 'items-center text-center' : ''
            } ${action ? 'lg:flex-row lg:items-end lg:justify-between' : ''}`}
          >
            <div className={`max-w-prose ${align === 'center' ? 'mx-auto' : ''}`}>
              {eyebrow ? (
                <p className={onNavy ? 'eyebrow-on-navy' : 'eyebrow'}>{eyebrow}</p>
              ) : null}
              {title ? (
                <Heading
                  id={id ? `${id}-heading` : undefined}
                  className={`mt-3 text-h2 font-bold ${onNavy ? 'text-white' : ''}`}
                >
                  {title}
                </Heading>
              ) : null}
              {intro ? (
                <p
                  className={`mt-4 text-lead ${onNavy ? 'text-white/75' : 'text-charcoal-70'}`}
                >
                  {intro}
                </p>
              ) : null}
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
          </header>
        ) : null}
        {children}
      </div>
    </section>
  );
}
