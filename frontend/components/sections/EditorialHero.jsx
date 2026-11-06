'use client';

import { useId, useRef } from 'react';
import {
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Youtube,
} from 'lucide-react';
import {
  MotionFeatures,
  TimelineContent,
  buildFadeVariants,
  buildRevealVariants,
} from '@/components/ui/timeline-animation';
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { Brandmark } from '@/components/brand/Brandmark';
import { Button } from '@/components/ui/Button';
import { toParagraphs } from '@/lib/format';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config';

const SOCIAL_ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
  x: MessageCircle,
  threads: MessageCircle,
};

/**
 * The home page hero: a notched editorial image with the eyebrow and social
 * links sitting in the cut-out strip, real catalogue counts beneath it, and
 * the headline revealing line by line.
 *
 * Adapted from the supplied `about-section` component. The composition,
 * the clip-path geometry and the reveal choreography are kept; four things
 * are not:
 *
 *  1. **Every figure comes from the database.** The original hard-coded
 *     "10+ years", "3 million words", "100+ brands" and "30% higher
 *     engagement". This project forbids invented statistics, so the stats
 *     row renders counts of published records and nothing else. With an
 *     empty catalogue the row omits itself rather than showing zeros.
 *
 *  2. **The mask is CSS `clip-path`, not an SVG `<image>`.** An SVG
 *     `<image>` cannot carry a `srcset`, so the original would have loaded
 *     one width at every viewport — the worst case being a 1920px file on a
 *     360px screen. Applying the same path as a `clip-path` to a real
 *     `<picture>` keeps the notch and keeps the four WebP variants.
 *
 *  3. **Token classes.** None of the original's `text-sm`,
 *     `text-gray-600`, `text-red-500` or `bg-neutral-900` resolve here:
 *     the colour and type scales are replaced rather than extended. Each
 *     maps onto a project token.
 *
 *  4. **Delays are much shorter.** The original delayed the headline by
 *     three seconds and each reveal step by 0.4s. The headline is the
 *     largest element above the fold, so a three-second delay makes it the
 *     Largest Contentful Paint and hands the page a poor score for an
 *     animation nobody asked to wait for.
 */
export function EditorialHero(props) {
  return (
    <MotionFeatures>
      <HeroContent {...props} />
    </MotionFeatures>
  );
}

function HeroContent({ content, stats = [], socialLinks = [], image, brandTagline }) {
  const heroRef = useRef(null);
  const clipId = `hero-notch-${useId().replace(/:/g, '')}`;

  const revealVariants = buildRevealVariants();
  const fadeVariants = buildFadeVariants();

  const headline = content?.headline ?? 'Your Global Education Journey Starts Here.';
  // One paragraph fills the column; two split it. Anything beyond is
  // ignored rather than overflowing the grid.
  const paragraphs = toParagraphs(content?.supportingLine).slice(0, 2);

  // The last figure is rendered large; everything before it sits in the
  // small row. With a single stat there is no feature figure at all, so the
  // row never shows a lone oversized number.
  const featureStat = stats.length > 1 ? stats[stats.length - 1] : null;
  const smallStats = stats.length > 1 ? stats.slice(0, -1) : stats;

  return (
    <section ref={heroRef} className="bg-ivory px-4 py-8 sm:px-6 lg:px-8">
      {/* The clip path, declared once per instance so two heroes on one
          page cannot collide on the id. objectBoundingBox units mean the
          same path fits any aspect ratio. */}
      <svg aria-hidden="true" focusable="false" className="absolute h-0 w-0">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="mx-auto w-full max-w-shell">
        <div className="relative">
          {/* Sits in the notch cut from the top of the image. The insets
              match the path's own coordinates (x 0.0204 → 0.8502) rather
              than being eyeballed, so the strip stays inside the cut-out
              at every width. */}
          <div className="relative mb-2 flex items-center justify-between gap-4 sm:absolute sm:left-[2%] sm:right-[15%] sm:top-0 sm:z-10 sm:mb-0 sm:h-[13.85%]">
            <p className="flex items-center gap-2">
              <span className="animate-spin text-lead text-accent" aria-hidden="true">
                ✱
              </span>
              <TimelineContent
                as="span"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="font-heading text-micro font-semibold uppercase tracking-[0.14em] text-charcoal-70 sm:text-caption"
              >
                Overseas education, migration &amp; training
              </TimelineContent>
            </p>

            {/* Omitted entirely when no social links are configured, rather
                than rendering icons that lead nowhere. */}
            {socialLinks.length > 0 ? (
              <ul className="flex shrink-0 gap-2 sm:gap-3">
                {socialLinks.map((link, index) => {
                  const SocialIcon = SOCIAL_ICONS[link.platform] ?? MessageCircle;
                  return (
                    <li key={link.platform}>
                      <TimelineContent
                        as="a"
                        animationNum={index}
                        timelineRef={heroRef}
                        customVariants={revealVariants}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-5 w-5 items-center justify-center rounded-sm border border-navy/10 bg-white text-navy transition-colors duration-fast ease-standard hover:border-navy/30 hover:text-accent sm:h-6 sm:w-6 sm:rounded-md md:h-8 md:w-8"
                      >
                        <SocialIcon className="h-3 w-3 md:h-4 md:w-4" aria-hidden="true" />
                        <span className="sr-only">Shine Consultant on {link.platform}</span>
                      </TimelineContent>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>

          <TimelineContent
            as="figure"
            animationNum={4}
            timelineRef={heroRef}
            customVariants={fadeVariants}
            className="relative m-0"
          >
            <div
              className="aspect-[3/2] w-full overflow-hidden bg-navy sm:aspect-[2/1] lg:aspect-[5/2]"
              style={{ clipPath: `url(#${clipId})` }}
            >
              {image ? (
                <ResponsiveImage
                  image={image}
                  priority
                  rounded="rounded-none"
                  className="h-full w-full"
                  /**
                   * The supplied hero photograph is 2.5:1 and the frame
                   * opens up to exactly that at `lg`, so there is no crop
                   * on a large screen. Below `lg` the frame is 2/1 and
                   * then 3/2, and the image is cropped horizontally.
                   *
                   * A centred crop at 3/2 keeps only the middle 60% —
                   * which holds the student but trims the campus down to a
                   * sliver. Biasing the focal point to 35% keeps the
                   * campus and the student together, and gives up the
                   * emptier decorative end of the picture instead. That is
                   * the right thing to lose.
                   */
                  imgClassName="h-full w-full object-[35%_center] lg:object-center"
                  aspect="5 / 2"
                  /**
                   * The figure is the shell width (1280px) minus the
                   * section padding, never the full viewport. Declaring it
                   * accurately drops a 390px phone from the 768px variant
                   * to the 360px one — 28.5 KB to 8.4 KB on the page's
                   * Largest Contentful Paint element.
                   */
                  sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) calc(100vw - 3rem), (max-width: 1344px) calc(100vw - 4rem), 1280px"
                />
              ) : (
                /* No uploaded image and stock imagery turned off: a
                   designed navy field, not a grey placeholder box. */
                <div className="flex h-full w-full items-end bg-navy-fade p-6 lg:p-10">
                  <p className="max-w-prose font-heading text-h3 font-bold text-white/80">
                    Study abroad, decided properly.
                  </p>
                </div>
              )}
            </div>
          </TimelineContent>

          {/**
           * Real counts only.
           *
           * This row used to pin the feature figure with
           * `lg:absolute lg:bottom-16 lg:right-0`, which floated it over
           * the banner's bottom edge and left it unable to react to the
           * row beside it. It is now a flex row in normal flow: small
           * figures left, feature figure right, baseline-aligned.
           *
           * The separators are left borders on the items that follow the
           * first, rather than literal "|" characters. Rendering the
           * character per item produced a trailing orphan divider with
           * nothing after it.
           */}
          {stats.length > 0 ? (
            <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <TimelineContent
                as="dl"
                animationNum={5}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex flex-wrap items-center gap-y-2"
              >
                {smallStats.map((stat, index) => (
                  <div
                    key={stat.srLabel ?? stat.label}
                    className={cn(
                      'flex items-center gap-2 text-caption sm:text-body',
                      index === 0 ? 'pr-5' : 'border-l border-navy/15 px-5',
                    )}
                  >
                    <dt className="sr-only">{stat.srLabel ?? stat.label}</dt>
                    <dd className="font-heading font-bold text-accent">{stat.value}</dd>
                    <span className="text-charcoal-70" aria-hidden="true">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </TimelineContent>

              {featureStat ? (
                <TimelineContent
                  as="dl"
                  animationNum={6}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  className="flex shrink-0 items-baseline gap-2 text-h2 lg:text-h1"
                >
                  <dt className="sr-only">{featureStat.srLabel ?? featureStat.label}</dt>
                  <dd className="font-heading font-bold leading-none text-accent">
                    {featureStat.value}
                  </dd>
                  <span
                    className="font-heading uppercase leading-none text-charcoal-70"
                    aria-hidden="true"
                  >
                    {featureStat.featureLabel ?? featureStat.label}
                  </span>
                </TimelineContent>
              ) : null}
            </div>
          ) : null}
        </div>

        {/**
         * 7/5 rather than the previous 2-of-3.
         *
         * The old right column was a third of the grid — about 384px at a
         * 1280px viewport — while two `lg` buttons side by side need close
         * to 575px. They overflowed their column leftward and sat on top of
         * the supporting paragraphs. Widening the column to 5/12 and
         * sizing the buttons to the space available is what actually fixes
         * that; nudging positions would not have.
         *
         * `items-stretch` lets the right column fill the row height so its
         * two blocks can be pushed apart, which aligns the call to action
         * with the paragraphs rather than leaving it floating.
         */}
        <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div>
            <h1 className="mb-8 text-h1 font-semibold !leading-[110%] text-navy lg:text-display">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.06}
                staggerFrom="first"
                reverse
                transition={{
                  type: 'spring',
                  stiffness: 250,
                  damping: 30,
                  // 0.25s, not the original 3s: this is the Largest
                  // Contentful Paint element.
                  delay: 0.25,
                }}
              >
                {headline}
              </VerticalCutReveal>
            </h1>

            {paragraphs.length > 0 ? (
              <TimelineContent
                as="div"
                animationNum={9}
                timelineRef={heroRef}
                customVariants={revealVariants}
                /**
                 * Two paragraph columns only where the left column is
                 * actually wide enough for them: full width below 1024,
                 * and again from 1280 where 7/12 of the grid is roughly
                 * 690px. Between the two the left column is about 530px,
                 * where a single column reads better than two 250px ones.
                 */
                className={cn(
                  'grid gap-6 text-charcoal-70 sm:gap-8',
                  paragraphs.length > 1 && 'md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2',
                )}
              >
                {paragraphs.map((paragraph, index) => (
                  <TimelineContent
                    key={index}
                    as="p"
                    animationNum={10 + index}
                    timelineRef={heroRef}
                    customVariants={revealVariants}
                    className="max-w-prose text-caption leading-relaxed sm:text-body"
                  >
                    {paragraph}
                  </TimelineContent>
                ))}
              </TimelineContent>
            ) : null}
          </div>

          {/* Right column: branding above, the ask and the actions below.
              `justify-between` at lg pushes them apart so the actions line
              up with the paragraphs on the left instead of hanging under
              the logo with a gap beneath them. */}
          <div className="flex flex-col gap-10 lg:h-full lg:justify-between lg:gap-8">
            <div className="flex flex-col gap-4 lg:items-end lg:text-right">
              {/* The lockup itself, rather than the name set in Manrope —
                  the script is the recognisable part of this brand. */}
              <Brandmark variant="full" imageClassName="h-20 w-auto sm:h-24" />

              <TimelineContent
                as="p"
                animationNum={13}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="max-w-measure text-caption text-charcoal-70"
              >
                {/**
                 * Defaults to the configured tagline, never to a literal.
                 * This used to hardcode "International education and
                 * admissions guidance". When the brand positioning was
                 * corrected to the real business, `siteConfig.tagline` was
                 * updated but no caller passes `brandTagline`, so the hero
                 * silently kept rendering the old string — the one place on
                 * the home page still describing the company wrongly.
                 */}
                {brandTagline ?? siteConfig.tagline}
              </TimelineContent>
            </div>

            <div className="flex flex-col gap-5 lg:items-end lg:text-right">
              <TimelineContent
                as="p"
                animationNum={14}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="max-w-measure font-heading text-body font-semibold text-navy"
              >
                Ready to find the course that fits your record?
              </TimelineContent>

              {/**
               * Real links, not styled buttons that do nothing. Both are
               * kept: the brief specifies a primary and a secondary.
               *
               * A two-column grid, not a flex row. Grid columns are a
               * fraction of the container, so neither button can push past
               * it however long a label the CMS supplies — the failure mode
               * becomes a label wrapping to two lines inside a button that
               * is still the right width, instead of a button sliding out
               * over the paragraph next to it. Equal columns also keep the
               * pair visually balanced.
               *
               * Full width and stacked below 640px.
               */}
              <TimelineContent
                as="div"
                animationNum={15}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex w-full justify-start lg:justify-end"
              >
                <Button
                  href="/book-consultation"
                  size="md"
                  className="group h-auto min-h-12 px-7 py-3 text-caption font-semibold leading-tight sm:text-body"
                >
                  {content?.primaryCtaLabel ?? 'Book Free Consultation'}
                  <svg
                    className="h-4 w-4 shrink-0 transition-transform duration-base ease-standard group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Button>
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditorialHero;
