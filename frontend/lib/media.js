import { siteConfig } from './config';

/**
 * Resolves an image reference to something a browser can load.
 *
 * This used to prefix a relative path with the API origin, because the
 * backend's local storage driver returned paths like `/uploads/...` that
 * were relative to *that* service, not this one. There is no API now, and
 * `siteConfig.apiOrigin` went with it — so the old implementation would
 * have produced `undefined/imagery/hero.webp` and broken every image. It
 * was still referenced in three places, which is why it is rewritten here
 * rather than deleted.
 *
 * An image is now either an absolute URL or a path under `public/`, and
 * both are returned unchanged. Relative paths in Open Graph tags are
 * resolved by Next.js against `metadataBase`, which `app/layout.js` sets.
 */
export function resolveMediaUrl(url) {
  if (!url) return null;
  if (typeof url !== 'string') return null;
  if (/^(https?:)?\/\//.test(url) || url.startsWith('data:')) return url;
  return url.startsWith('/') ? url : `/${url}`;
}

/**
 * Default imagery, generated locally and served from our own origin.
 *
 * This replaced a set of hardcoded Unsplash photo IDs that were never
 * verified. Every one of them returned 404, so every image on the site —
 * the home hero included — had been silently falling back to its
 * placeholder. Depending on a third-party host for core visuals is what
 * caused that.
 *
 * A keyless random-photo service would have fixed the 404 and introduced a
 * worse problem: an arbitrary landscape beside "Study in the United
 * Kingdom". For a consultancy that is not a placeholder, it is a wrong
 * picture.
 *
 * So these are designed panels drawn from the palette, carrying the star
 * motif from the logo. They read as art direction rather than as a missing
 * image, they cannot rot, and they work offline. A record with its own
 * image takes precedence — see docs/image-credits.md.
 *
 * Regenerate with `npm run build:imagery`.
 */
const PANEL_FOR_KEY = {
  campus: 'navy-split',
  library: 'sage',
  study: 'light',
  lecture: 'sage',
  architecture: 'navy-split',
  // Previously 'hero', which shared the hero's panel. The `hero` key is now
  // a specific photograph of one student, so sharing it would put that same
  // person on every card that asks for a cityscape.
  city: 'navy-split',
  arrival: 'light',
  advice: 'light',
  documents: 'ivory',
};

const WIDTHS = [360, 768, 1024, 1920];

/**
 * The home hero photograph. A real supplied image rather than a generated
 * panel, so it is defined separately.
 *
 * The dimensions are the *padded* canvas, not the source photograph. The
 * hero frame clips a notch out of the top 13.85% of the figure, and the
 * subject stands close to the top edge, so `npm run build:hero` adds
 * exactly that much headroom before resizing. The notch therefore removes
 * padding instead of the top of her head. Declaring the padded height here
 * is what keeps the reserved box matching the file and layout shift at
 * zero.
 */
const HERO_PHOTO = {
  basename: 'hero-photo',
  width: 2137,
  height: 854,
};

function defaultImage(key, alt) {
  if (key === 'hero') {
    return {
      alt,
      isDefault: true,
      width: HERO_PHOTO.width,
      height: HERO_PHOTO.height,
      variants: Object.fromEntries(
        WIDTHS.map((w) => [`w${w}`, `/imagery/${HERO_PHOTO.basename}-${w}.webp`]),
      ),
      fallbackUrl: `/imagery/${HERO_PHOTO.basename}-fallback.jpg`,
    };
  }

  const panel = PANEL_FOR_KEY[key] ?? 'sage';
  return {
    alt,
    isDefault: true,
    // The panels are generated at 1.6:1; declaring it here lets
    // ResponsiveImage reserve the box and keep layout shift at zero.
    width: 1920,
    height: 1200,
    variants: Object.fromEntries(
      WIDTHS.map((w) => [`w${w}`, `/imagery/${panel}-${w}.webp`]),
    ),
    fallbackUrl: `/imagery/${panel}-fallback.jpg`,
  };
}

/**
 * Picks the image to render: the record's own image first, then the
 * generated panel if that is enabled, then nothing — in which case the
 * caller renders its typographic treatment.
 *
 * A record image in `content/*.json` is a path under `public/`. To add one,
 * put the file in `public/imagery/` and set `heroImage` or `cardImage` to
 * its path; supply `variants` as well if you have generated widths.
 */
export function pickImage(recordImage, { fallbackKey, alt } = {}) {
  if (typeof recordImage === 'string' && recordImage) {
    const resolved = resolveMediaUrl(recordImage);
    return {
      src: resolved,
      fallbackUrl: resolved,
      alt: alt ?? '',
    };
  }

  if (recordImage?.fallbackUrl || recordImage?.src || recordImage?.url || recordImage?.variants?.w1024) {
    const fallbackUrl = resolveMediaUrl(recordImage.fallbackUrl ?? recordImage.src ?? recordImage.url);
    return {
      ...recordImage,
      src: fallbackUrl,
      fallbackUrl,
      alt: recordImage.alt ?? alt ?? '',
      variants: Object.fromEntries(
        Object.entries(recordImage.variants ?? {}).map(([key, value]) => [
          key,
          resolveMediaUrl(value),
        ]),
      ),
    };
  }

  if (fallbackKey && siteConfig.useDefaultImagery) {
    return defaultImage(fallbackKey, alt ?? '');
  }

  return null;
}
