import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/**
 * Premium hero section shared across all six service pages.
 *
 * Full-width background image with a navy gradient overlay, breadcrumbs,
 * eyebrow, heading, optional subtitle, description and a CTA.
 *
 * The image is a plain `<img>` rather than Next/Image so external stock
 * URLs do not need a `domains` entry in next.config.
 */
export function ServicePageHero({
  eyebrow,
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  breadcrumbs = [],
  ctaLabel = 'Book Free Consultation',
  ctaHref = '/book-consultation',
  children,
}) {
  return (
    <section className="relative isolate min-h-[400px] overflow-hidden bg-navy lg:min-h-[480px]">
      {/* Background image */}
      {imageSrc && (
        <div className="absolute inset-0 -z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/65" />
        </div>
      )}

      <div className="shell relative py-16 lg:py-24">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-caption">
              {breadcrumbs.map((item, i) => (
                <li key={item.href || item.label} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <ChevronRight
                      className="h-3.5 w-3.5 text-white/40"
                      aria-hidden="true"
                    />
                  )}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-white/60">{item.label}</span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-white/50 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Eyebrow */}
        {eyebrow && (
          <p className="mb-4 inline-flex items-center gap-2">
            <span
              className="h-[2px] w-8 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-accent">
              {eyebrow}
            </span>
          </p>
        )}

        {/* Title */}
        <h1 className="max-w-3xl text-h1 font-extrabold text-white lg:text-display">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-3 max-w-2xl font-heading text-lead font-semibold text-white/85">
            {subtitle}
          </p>
        )}

        {/* Description */}
        {description && (
          <p className="mt-5 max-w-2xl text-body leading-relaxed text-white/70">
            {description}
          </p>
        )}

        {/* Slot for extra content (stats, etc.) */}
        {children}

        {/* CTA buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href={ctaHref} size="lg" className="group">
            {ctaLabel}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-base group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Button>
          <Button href="/services" variant="inverse" size="lg">
            All Services
          </Button>
        </div>
      </div>
    </section>
  );
}

