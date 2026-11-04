import Link from 'next/link';
import { Compass, Mail, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { BrandmarkLink } from '../components/brand/Brandmark';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

const DESTINATIONS = [
  { label: 'Home', href: '/', icon: Compass, note: 'Start from the beginning' },
  {
    label: 'Study destinations',
    href: '/destinations',
    icon: Search,
    note: 'The ten countries and regions we work with',
  },
  { label: 'Contact us', href: '/contact', icon: Mail, note: 'Ask a counsellor directly' },
];

/**
 * Minimal centred layout, deliberately unlike any other page. Three real
 * routes out, so an unmatched URL is never a dead end.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <header className="shell flex h-20 items-center">
        <BrandmarkLink imageClassName="h-12 w-auto" />
      </header>

      <main className="shell flex flex-1 items-center py-16">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-4 text-h1 font-extrabold">We could not find that page</h1>
          <p className="mt-5 text-lead text-charcoal-70">
            The link may be out of date, or the page may have been unpublished. Here is where to
            go instead.
          </p>

          <ul className="mt-10 space-y-3 text-left">
            {DESTINATIONS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-4 rounded-lg border border-navy/10 bg-white p-5 transition-all duration-base ease-standard hover:-translate-y-0.5 hover:shadow-card"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-sage text-navy">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-heading text-body font-semibold text-navy">
                      {item.label}
                    </span>
                    <span className="block text-caption text-charcoal-70">{item.note}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Button href="/book-consultation" variant="secondary" className="mt-10">
            Book a free consultation
          </Button>
        </div>
      </main>
    </div>
  );
}
