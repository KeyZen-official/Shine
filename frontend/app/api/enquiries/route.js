import { enquiryDescriptor, validateAgainst } from '../../../shared/validation';
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
 * Enquiry capture.
 *
 * This replaced `POST /api/enquiries` on the Express service. The site has
 * no accounts and sells nothing, so an enquiry is not stored — it is
 * validated, checked for spam, and emailed to the business. Removing the
 * database removed the obligation to hold a stranger's name, email and
 * phone number indefinitely, which is a privacy improvement rather than a
 * compromise.
 *
 * The order matters and is the same as before: rate limit, then spam
 * evidence, then validation. The cheapest refusal runs first, and nothing
 * expensive happens for a request that was never going to be accepted.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const ip = clientIp(request);

  const limit = rateLimit(ip);
  if (!limit.allowed) {
    return fail(429, 'RATE_LIMITED', 'Please wait a few minutes before sending another message.', {
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
    // Deliberately identical to a validation refusal, so an automated
    // client cannot tell which layer rejected it.
    return fail(400, 'VALIDATION_FAILED', 'Check the highlighted fields and try again.');
  }

  const verdict = validateAgainst(enquiryDescriptor, payload);
  if (!verdict.valid) {
    return fail(400, 'VALIDATION_FAILED', 'Check the highlighted fields and try again.', {
      fields: verdict.fields,
    });
  }

  const value = verdict.value;
  const reference = buildReference('ENQ');

  // Awaited, unlike the Express version which dispatched after flushing the
  // response. A serverless function can be frozen the moment it responds,
  // so work started after the response may never run.
  await notify({
    subject: `New enquiry — ${value.fullName} [${reference}]`,
    heading: 'New enquiry from the website',
    replyTo: value.email,
    fields: [
      ['Reference', reference],
      ['Name', value.fullName],
      ['Email', value.email],
      ['Phone', value.phone],
      ['Interested destination', value.interestedCountry],
      ['Interested course', value.interestedCourse],
      ['Interested service', value.interestedService],
      ['Education level', value.educationLevel],
      ['Submitted from', payload.source ?? 'unknown'],
      ['Challenge', spam.challenge ?? 'n/a'],
    ],
    body: value.message,
  });

  return ok({ reference }, 201);
}
