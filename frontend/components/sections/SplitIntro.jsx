import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { ResponsiveImage } from '../media/ResponsiveImage';
import { pickImage } from '../../lib/media';
import { toParagraphs } from '../../lib/format';

/**
 * Asymmetric 7/5 split with the image offset below the text column, so the
 * composition reads as editorial rather than as a two-up card.
 */
export function SplitIntro({ content }) {
  if (!content?.heading && !content?.body) return null;

  const image = pickImage(content?.image, {
    fallbackKey: 'advice',
    alt: 'A counselling session in progress',
  });

  const paragraphs = toParagraphs(content?.body);

  return (
    <section className="section-y bg-ivory">
      <div className="shell grid items-start gap-10 lg:grid-cols-split-left lg:gap-16">
        <div className="lg:pt-6">
          {content.eyebrow ? <p className="eyebrow">{content.eyebrow}</p> : null}

          {content.heading ? (
            <h2 className="mt-4 max-w-2xl text-h2 font-bold">{content.heading}</h2>
          ) : null}

          <span className="rule-accent mt-6" aria-hidden="true" />

          <div className="mt-6 space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="max-w-prose text-lead text-charcoal-70">
                {paragraph}
              </p>
            ))}
          </div>

          {content.ctaLabel ? (
            <Button href="/about" variant="secondary" className="mt-8">
              {content.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          ) : null}
        </div>

        {image ? (
          <div className="relative lg:-mt-10">
            <ResponsiveImage
              image={image}
              aspect="3 / 4"
              rounded="rounded-xl"
              className="shadow-card"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
            <span
              className="absolute -bottom-4 -left-4 hidden h-24 w-24 rounded-xl border-4 border-accent lg:block"
              aria-hidden="true"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

/**
 * Alternating prose/figure block used down the destination and service
 * detail pages. `side` mirrors the layout so consecutive sections never
 * repeat the same arrangement.
 */
export function ProseFigure({
  id,
  eyebrow,
  title,
  body,
  bullets = [],
  image,
  fallbackKey,
  side = 'right',
  surface = 'ivory',
  level = 2,
}) {
  if (!body && bullets.length === 0) return null;

  const Heading = `h${level}`;
  const resolved = pickImage(image, { fallbackKey, alt: title ?? '' });
  const paragraphs = toParagraphs(body);

  const surfaceClass = { ivory: 'bg-ivory', white: 'bg-white', sage: 'bg-sage' }[surface] ?? '';

  return (
    <section id={id} className={`section-y ${surfaceClass}`}>
      <div
        className={`shell grid items-center gap-10 lg:gap-16 ${
          resolved ? 'lg:grid-cols-2' : ''
        }`}
      >
        <div className={side === 'left' && resolved ? 'lg:order-2' : ''}>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          {title ? <Heading className="mt-3 text-h2 font-bold">{title}</Heading> : null}

          <div className="mt-5 space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="max-w-prose text-body text-charcoal-70">
                {paragraph}
              </p>
            ))}
          </div>

          {bullets.length > 0 ? (
            <ul className="mt-6 space-y-3">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex gap-3 text-body text-charcoal-70">
                  <span
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage text-navy"
                    aria-hidden="true"
                  >
                    <Check className="h-3 w-3" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {resolved ? (
          <div className={side === 'left' ? 'lg:order-1' : ''}>
            <ResponsiveImage
              image={resolved}
              aspect="4 / 3"
              rounded="rounded-xl"
              className="shadow-card"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
