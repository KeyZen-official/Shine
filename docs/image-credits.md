# Imagery

## Where images on this site come from

Every content image resolves in this order:

1. **An image referenced by the record** in `frontend/content/*.json` — a
   path under `frontend/public/`.
2. **A generated brand panel**, where a record has no image of its own and
   `NEXT_PUBLIC_USE_DEFAULT_IMAGERY` is not `false`.
3. **A designed typographic treatment**, when that flag is off.

There is no third-party image host in the path at any stage.

## Why there is no stock photography

The first version of this site pointed its defaults at hardcoded Unsplash
photo IDs. **Those IDs were invented rather than verified, and every one of
them returned 404** — so every image on the site, the home hero included,
had been silently falling back to its placeholder. Nothing warned; a missing
image just looks like a design choice.

Two things followed:

- **Depending on a third-party host for core visuals is the fault.** Even
  with correct IDs, a URL on someone else's CDN can rot, be rate-limited,
  be blocked by a CSP, or be unavailable offline. The failure is invisible
  until someone looks at the right page.
- **A keyless random-photo service would be worse.** It would fix the 404
  and introduce an arbitrary landscape beside "Study in the United
  Kingdom". For an education consultancy that is not a placeholder, it is a
  wrong picture.

## The hero photograph

Supplied by the client. Archived at `brand-source/hero-original.png` and
never served; the variants in `public/imagery/hero-photo-*` are what ship.

| | |
| --- | --- |
| Source | 2137 × 736 PNG, 1.85 MB |
| Served at 1920 | 105 KB WebP |
| Served at 360 | 8.4 KB WebP |
| Saving | 94.4% |

**It is padded at the top on purpose.** The hero frame cuts a notch out of
the top 13.85%, and the student stands about 5% from the top edge — a
straight drop-in removed her hair and part of her forehead. The build pads
the canvas by exactly the notch depth so the cut falls on padding:

```
736 / (1 - 0.138535) = 854
2137 × 854 = 2.502 : 1   ← the frame's own lg:aspect-[5/2]
```

`frontend/lib/media.js` declares `height: 854`, the **padded** height. That
is what keeps the reserved box matching the file.

Regenerate with `npm run build:hero`. The script asserts the padded aspect
against the frame and refuses to run if a replacement image breaks the
relationship, rather than quietly producing a crop that beheads somebody.

## The generated panels

`npm run build:imagery` produces four panels from the palette, each carrying
the five-point star motif from the supplied logo. Real files from our own
origin, around 135 KB for the whole set across four widths plus fallbacks.

| Panel | Character | Keys mapped to it |
| --- | --- | --- |
| `navy-split` | Navy with a sage diagonal | `campus`, `architecture`, `city` |
| `sage` | Sage field with navy geometry | `library`, `lecture` |
| `light` | Ivory to sage, soft circles | `study`, `arrival`, `advice` |
| `ivory` | Ivory with a navy band and rule marks | `documents` |

Related contexts share a panel but adjacent ones do not, so a grid of
destination cards does not read as copies of one picture.

There is deliberately no `hero` panel. The `hero` key is served by the
photograph, and having two different images both called "hero" is how the
wrong one gets wired up later.

## What is deliberately never shown

**No named university's campus photography.** Institutional imagery and
trademarks carry usage restrictions, and a photograph taken from a
university's own website is not ours to publish.

**No stock portrait presented as a student of ours.** That would be a
fabrication, and there is no testimonial surface on the site to put one on.

## Adding real photography

Put the file in `frontend/public/imagery/`, then set `heroImage` or
`cardImage` on the record in `content/*.json` to its path. Supply a
`variants` map as well if you have generated widths:

```json
"cardImage": {
  "fallbackUrl": "/imagery/uk-card.jpg",
  "variants": { "w768": "/imagery/uk-card-768.webp" },
  "alt": "The Radcliffe Camera in Oxford, seen from the square",
  "width": 1600,
  "height": 1000
}
```

`alt` is required in practice — it is what a screen reader and a failed
image both fall back to. Describe what the picture shows, not what the page
is about.

Once every surface has genuine photography, set
`NEXT_PUBLIC_USE_DEFAULT_IMAGERY=false` so a future gap shows the designed
typographic treatment rather than quietly reaching for a brand panel.

If you license stock photography, record the source and licence here.
