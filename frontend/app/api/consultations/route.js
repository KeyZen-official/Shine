import { consultationDescriptor, validateAgainst } from '../../../shared/validation';
import { getDestinations } from '../../../lib/content';
import {
  buildReference,
  checkSpam,
  clientIp,
  fail,
  notify,
  ok,
  rateLimit,
} from '../../../lib/server/leads';

/**
 * Consultation booking.
 *
 * Same shape as the enquiry route, with one extra rule carried over from
 * the Express version: the requested destination has to be one we actually
 * publish a page for. A booking naming a country we say nothing about
 * describes a service we have not offered, so it is refused with the field
 * named rather than accepted and quietly corrected later.
 *
 * The destination list now comes from the content files instead of a
 * database query, so the check is a comparison against the same data the
 * form's own select was built from.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const ip = clientIp(request);

  const limit = rateLimit(ip);
  if (!limit.allowed) {
    return fail(429, 'RATE_LIMITED', 'Please wait a few minutes before sending another request.', {
      retryAfterSeconds: limit.retryAfterSeconds,
    });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return fail(400, 'INVALID_BODY', 'We could not read that submission.');
  }

  const spam = await checkSpam(payload, ip);
  if (!spam.ok) {
    return fail(400, 'VALIDATION_FAILED', 'Check the highlighted fields and try again.');
  }

  const verdict = validateAgainst(consultationDescriptor, payload);
  if (!verdict.valid) {
    return fail(400, 'VALIDATION_FAILED', 'Check the highlighted fields and try again.', {
      fields: verdict.fields,
    });
  }

  const value = verdict.value;

  // Handle multi-destination selection (array or comma-separated string)
  const publishedDestinations = getDestinations();
  let selectedCountries = [];
  if (Array.isArray(value.preferredCountry)) {
    selectedCountries = value.preferredCountry;
  } else if (typeof value.preferredCountry === 'string') {
    selectedCountries = value.preferredCountry.split(',').map((s) => s.trim()).filter(Boolean);
  }

  const matchedDestinations = selectedCountries
    .map((c) =>
      publishedDestinations.find(
        (dest) =>
          dest.name.toLowerCase() === c.toLowerCase() ||
          dest.slug === c.toLowerCase(),
      ),
    )
    .filter(Boolean);

  if (matchedDestinations.length === 0) {
    return fail(400, 'VALIDATION_FAILED', 'Choose at least one of our published study destinations.', {
      fields: [{ field: 'preferredCountry', message: 'Select at least one destination from the list.' }],
    });
  }

  const destinationSummary = matchedDestinations.map((d) => d.name).join(', ');
  const reference = buildReference('CON');

  await notify({
    subject: `Consultation request — ${value.studentName} [${reference}]`,
    heading: 'New consultation request',
    replyTo: value.email,
    fields: [
      ['Reference', reference],
      ['Student', value.studentName],
      ['Email', value.email],
      ['Phone', value.phone],
      ['Preferred destination(s)', destinationSummary],
      ['Preferred study level', value.preferredLevel || 'Not specified'],
      ['Preferred course', value.preferredCourse],
      ['Current qualification', value.currentQualification],
      ['Challenge', spam.challenge ?? 'n/a'],
    ],
  });

  return ok(
    {
      reference,
      preferredCountry: destinationSummary,
      preferredLevel: value.preferredLevel,
    },
    201,
  );
}
