import { Icon } from '../ui/Icon';

/**
 * Six-up value matrix on sage banding. Deliberately imageless, and the
 * only place on the site that uses this composition — the services page
 * uses a 3×3 icon matrix with different proportions.
 */
export function ValueMatrix({ items = [] }) {
  if (items.length === 0) return null;

  const ordered = items.slice().sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  return (
    <ul className="grid gap-px overflow-hidden rounded-xl border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-3">
      {ordered.map((item) => (
        <li key={item.title} className="group bg-white p-6 transition-colors duration-base ease-standard hover:bg-sage/50 lg:p-8">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sage text-navy transition-colors duration-base ease-standard group-hover:bg-navy group-hover:text-white">
            <Icon name={item.icon} className="h-5 w-5" />
          </span>
          <h3 className="mt-5 font-heading text-body font-semibold text-navy">{item.title}</h3>
          {item.description ? (
            <p className="mt-2 text-caption leading-relaxed text-charcoal-70">{item.description}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
