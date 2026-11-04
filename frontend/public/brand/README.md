# Brand assets

Generated from the supplied logo artwork by
`backend/scripts/build-brand-assets.mjs`. Do not edit these by hand — rerun
the script against the source artwork instead.

| File | Use |
| --- | --- |
| `logo-compact-240.webp`, `-480.webp`, `-240.png` | Navigation bar. Tagline cropped: a 1.72:1 stacked mark shrunk to navbar height leaves the wordmark illegible. |
| `logo-lockup-200/400/800.webp`, `-400.png` | Footer and anywhere with vertical room for the full lockup including the tagline. |
| `icon-512.png` | Square, transparent, padded. |
| `../../app/icon.png` | Favicon (Next.js file convention). |
| `../../app/apple-icon.png` | iOS home screen. Opaque white, because iOS composites transparency onto black. |
| `../../app/opengraph-image.png` | Default link preview card, 1200x630 on ivory. |

## Measured from the artwork

- Source: 1672x941, 507 KB, genuinely transparent
  (85.6% of pixels have zero alpha; all four corners are clear).
- Artwork occupies 1377x799 at (143,65) — 30% of the
  canvas was empty.
- Brand red: `#DD0100`. Brand navy: `#010D6C`.

## A note on the square icon

The lockup is wider than it is tall, so the icon is padded, not cropped. At
16px the mark is a red smudge — unavoidable for a three-line stacked
wordmark. **A dedicated single-glyph mark would be noticeably better** and is
a design task, not a code one. If one is produced, drop it in as
`app/icon.png` and nothing else needs changing.
