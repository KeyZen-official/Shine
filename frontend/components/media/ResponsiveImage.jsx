'use client';

import { useState } from 'react';

/**
 * Emits a <picture> with the WebP variants the API generated at
 * 360/768/1024/1920 plus a raster fallback.
 *
 * Three things it always does:
 *  - reserves the box via aspect-ratio or intrinsic width/height, so layout
 *    shift stays at zero
 *  - lazy-loads unless `priority` is set (hero only)
 *  - carries the record's stored image description as `alt`
 *
 * On a load failure it shows the reserved box with the description visible,
 * so the layout never collapses and the information is not lost.
 */
export function ResponsiveImage({
  image,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px',
  priority = false,
  aspect = '4 / 3',
  className = '',
  imgClassName = '',
  rounded = 'rounded-lg',
}) {
  const [failed, setFailed] = useState(false);

  if (!image?.fallbackUrl && !image?.variants?.w1024) return null;

  const variants = image.variants ?? {};
  const srcSet = [360, 768, 1024, 1920]
    .map((width) => (variants[`w${width}`] ? `${variants[`w${width}`]} ${width}w` : null))
    .filter(Boolean)
    .join(', ');

  const style = image.width && image.height
    ? { aspectRatio: `${image.width} / ${image.height}` }
    : { aspectRatio: aspect };

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center overflow-hidden bg-navy-fade p-6 ${rounded} ${className}`}
        style={{ ...style, aspectRatio: aspect }}
      >
        <p className="max-w-measure text-center text-caption text-white/70">{image.alt}</p>
      </div>
    );
  }

  return (
    <picture className={`block overflow-hidden ${rounded} ${className}`}>
      {srcSet ? <source type="image/webp" srcSet={srcSet} sizes={sizes} /> : null}
      <img
        src={image.fallbackUrl ?? variants.w1024}
        alt={image.alt ?? ''}
        {...(image.width && image.height ? { width: image.width, height: image.height } : {})}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchPriority: 'high' } : {})}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
        style={style}
      />
    </picture>
  );
}

/* `LogoTile` was removed with the university directory. It rendered an
   institution's crest contained in a square box, with legible initials as
   the fallback, and nothing else ever used it. */
