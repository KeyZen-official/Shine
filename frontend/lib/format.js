/**
 * Formatting helpers.
 *
 * `formatCurrency`, `formatTuitionFee` and `formatDuration` have been
 * removed. They formatted course fees and programme lengths, and this site
 * no longer has either: nothing is sold through it, and the content files
 * have no field that could hold a price.
 *
 * `formatTuitionFee` in particular only ever rendered a figure that had
 * been explicitly marked verified, and returned null otherwise — that rule
 * is now structural rather than enforced in a formatter, because there is
 * nowhere for an unverified figure to live.
 */

export function formatDate(value, { month = 'long' } = {}) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return null;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month,
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function formatTime(value) {
  if (!value) return null;
  const [hours, minutes] = String(value).split(':').map(Number);
  if (!Number.isFinite(hours)) return value;
  const suffix = hours >= 12 ? 'pm' : 'am';
  const display = hours % 12 === 0 ? 12 : hours % 12;
  return `${display}:${String(minutes ?? 0).padStart(2, '0')}${suffix}`;
}

export function truncate(value, max) {
  const text = String(value ?? '').trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

/** Splits stored prose into paragraphs on blank lines. */
export function toParagraphs(value) {
  if (!value) return [];
  return String(value)
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
}

const DAY_LABELS = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

export function formatBusinessHours(hours = []) {
  return hours.map((entry) => ({
    day: DAY_LABELS[entry.day] ?? entry.day,
    value: entry.isClosed ? 'Closed' : [entry.opensAt, entry.closesAt].filter(Boolean).join(' – '),
  }));
}

/** Builds a wa.me link from a stored number, tolerating formatting. */
export function whatsappHref(number, message) {
  if (!number) return null;
  const digits = String(number).replace(/\D/g, '');
  if (!digits) return null;
  const query = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${digits}${query}`;
}
