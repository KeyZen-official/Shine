import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs({ trail = [], surface = 'navy' }) {
  if (trail.length < 2) return null;

  const onNavy = surface === 'navy';
  const muted = onNavy ? 'text-white/50' : 'text-charcoal-50';
  const link = onNavy ? 'text-white/70 hover:text-white' : 'text-charcoal-70 hover:text-navy';
  const current = onNavy ? 'text-white' : 'text-navy';

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-caption">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight className={`h-3.5 w-3.5 ${muted}`} aria-hidden="true" />
              ) : null}
              {isLast ? (
                <span className={`font-semibold ${current}`} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className={`${link} underline-offset-2 hover:underline`}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
