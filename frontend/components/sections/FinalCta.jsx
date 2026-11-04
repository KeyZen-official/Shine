import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

/**
 * Navy band that closes the home page. The extra bottom padding at small
 * widths keeps the primary button clear of the WhatsApp dock's keep-out
 * zone.
 */
export function FinalCta({ content }) {
  const headline = content?.headline ?? 'Your Future Has No Borders.';

  return (
    <section className="relative overflow-hidden bg-navy on-navy">
      {/* A decorative rule, never the only indicator of anything. */}
      <span
        className="absolute inset-x-0 top-0 h-1 bg-accent"
        aria-hidden="true"
      />

      <div className="shell py-20 pb-28 text-center lg:py-24 lg:pb-24">
        <h2 className="mx-auto max-w-3xl text-h1 font-extrabold text-white">{headline}</h2>

        {content?.supportingLine ? (
          <p className="mx-auto mt-5 max-w-prose text-lead text-white/75">
            {content.supportingLine}
          </p>
        ) : null}

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/book-consultation" size="lg">
            {content?.ctaLabel ?? 'Book Your Free Consultation'}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button href="/contact" variant="inverse" size="lg">
            Send an enquiry
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Lighter closing strip for interior pages. */
export function CtaStrip({
  title,
  description,
  primaryLabel = 'Book Free Consultation',
  primaryHref = '/book-consultation',
  secondaryLabel,
  secondaryHref,
  surface = 'sage',
}) {
  const onSage = surface === 'sage';

  return (
    <section className={onSage ? 'bg-sage' : 'bg-white'}>
      <div className="shell py-16 lg:py-20">
        <div
          className={`flex flex-col gap-6 rounded-xl p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10 ${
            onSage ? 'bg-white shadow-panel' : 'bg-sage'
          }`}
        >
          <div className="max-w-prose">
            <h2 className="text-h3 font-bold">{title}</h2>
            {description ? (
              <p className="mt-2 text-body text-charcoal-70">{description}</p>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button href={primaryHref}>{primaryLabel}</Button>
            {secondaryLabel && secondaryHref ? (
              <Button href={secondaryHref} variant="secondary">
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
