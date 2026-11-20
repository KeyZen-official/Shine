/**
 * Emits a JSON-LD block, or nothing at all when the builder returned null
 * (for example an FAQ page with fewer than two published questions).
 *
 * JSON.stringify output is escaped for `<` so a value containing markup
 * cannot close the script element early.
 */
export function JsonLd({ data }) {
  if (!data) return null;

  const serialised = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: serialised }}
    />
  );
}
