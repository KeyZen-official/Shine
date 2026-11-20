import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * The supplied logo artwork, rendered unaltered.
 *
 * Two variants, because the artwork is a three-line stacked lockup at
 * 1.72:1 and that does not survive being shrunk to navigation-bar height:
 *
 *   `compact`  script + wordmark, tagline cropped. 2.14:1.
 *   `full`     the whole lockup including "Let's Grow Together". 1.72:1.
 *
 * The crop point was measured from the pixels — there is a clean 48px
 * horizontal gap above the tagline — rather than eyeballed, so it cannot
 * clip a descender.
 *
 * `width`/`height` are the intrinsic dimensions of the 2x asset and exist
 * only to give the browser an aspect ratio; CSS sets the rendered size. The
 * logo therefore reserves its box before it loads and contributes nothing
 * to layout shift.
 */
const VARIANTS = {
  compact: {
    webp1x: '/brand/logo-compact-120.webp',
    webp2x: '/brand/logo-compact-240.webp',
    png: '/brand/logo-compact-240.png',
    width: 240,
    height: 112,
  },
  full: {
    webp1x: '/brand/logo-lockup-200.webp',
    webp2x: '/brand/logo-lockup-400.webp',
    png: '/brand/logo-lockup-400.png',
    width: 400,
    height: 232,
  },
};

export function Brandmark({
  variant = 'compact',
  surface = 'light',
  className,
  imageClassName = 'h-10 w-auto',
  priority = false,
}) {
  const asset = VARIANTS[variant] ?? VARIANTS.compact;

  const image = (
    <picture>
      <source type="image/webp" srcSet={`${asset.webp1x} 1x, ${asset.webp2x} 2x`} />
      <img
        src={asset.png}
        alt="Shine Consultant"
        width={asset.width}
        height={asset.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchPriority: 'high' } : {})}
        className={cn('block object-contain', imageClassName)}
      />
    </picture>
  );

  /**
   * The wordmark's "CONSULTANT" is the artwork's own navy (#010D6C), which
   * is invisible against our navy surfaces. Rather than recolour supplied
   * artwork — which would mean maintaining a second version of someone
   * else's logo — it sits on a white plate. That is also what keeps the
   * red script at its intended contrast instead of 2.9:1.
   */
  if (surface === 'navy') {
    return (
      <span className={cn('inline-flex rounded-md bg-white p-2', className)}>{image}</span>
    );
  }

  return <span className={cn('inline-flex', className)}>{image}</span>;
}

export function BrandmarkLink({
  variant = 'compact',
  surface = 'light',
  className,
  imageClassName,
  priority = false,
}) {
  return (
    <Link
      href="/"
      aria-label="Shine Consultant — home"
      className={cn('inline-flex shrink-0 items-center rounded-sm', className)}
    >
      <Brandmark
        variant={variant}
        surface={surface}
        imageClassName={imageClassName}
        priority={priority}
      />
    </Link>
  );
}

