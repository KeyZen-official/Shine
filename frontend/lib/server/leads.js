import 'server-only';

import { Resend } from 'resend';

/**
 * Server-side lead handling: validation, spam evidence, rate limiting and
 * email. This is the whole of what used to be an Express service.
 *
 * `server-only` makes an accidental import from a client component a build
 * error rather than a bundle that ships the API key to the browser.
 */

/* ------------------------------------------------------------------ */
/* Envelope — the shape the existing client already understands         */
/* ------------------------------------------------------------------ */

export function ok(data, status = 200) {
  return Response.json({ success: true, data, error: null }, { status });
}

export function fail(status, code, message, extra = {}) {
  return Response.json(
    { success: false, data: null, error: { code, message, ...extra } },
    { status, headers: extra.retryAfterSeconds ? { 'Retry-After': String(extra.retryAfterSeconds) } : undefined },
  );
}

/* ------------------------------------------------------------------ */
/* Rate limiting                                                        */
/* ------------------------------------------------------------------ */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const buckets = new Map();
let warnedAboutMissingIp = false;

/**
 * Per-address submission budget.
 *
 * **In-process, so it resets on redeploy and is per-instance.** On a single
 * container that is the same behaviour the Express version had. On a
 * platform that runs several instances, or scales to zero between requests,
 * an attacker gets `MAX_PER_WINDOW` per instance rather than overall.
 *
 * That is a deliberate, stated limit rather than a hidden one: the layer
 * doing the real work against automated abuse is the Turnstile challenge,
 * which is verified server-side and cannot be replayed. This exists to stop
 * a human refreshing the form twenty times, which it does correctly.
 *
 * If the site is ever deployed across instances and this matters, move it
 * to the platform's own rate limiting or a shared store. Do not pretend
 * this map is doing more than it is.
 */
export function rateLimit(ip) {
  /**
   * With no determinable address, do not rate limit.
   *
   * The alternative is bucketing every such request under one key — which
   * is what this did, and it means that if the deployment does not set
   * `x-forwarded-for` (a bare Node process with no proxy in front, say),
   * five submissions from anybody would lock the forms for every visitor
   * for ten minutes. A shared budget is worse than no budget: it turns a
   * per-abuser limit into a trivial denial of service against real
   * customers.
   *
   * Turnstile is the layer that actually stops automated abuse, and it is
   * verified server-side and cannot be replayed. This limiter only exists
   * to stop one person refreshing the form repeatedly, and that requires
   * knowing who they are.
   */
  if (!ip || ip === 'unknown') {
    if (!warnedAboutMissingIp) {
      warnedAboutMissingIp = true;
      console.warn(
        '[lead] no client address on the request, so per-address rate limiting is inactive. ' +
          'Set TURNSTILE_SECRET_KEY, and make sure the proxy forwards x-forwarded-for.',
      );
    }
    return { allowed: true };
  }

  const now = Date.now();
  const bucket = buckets.get(ip)?.filter((time) => now - time < WINDOW_MS) ?? [];

  if (bucket.length >= MAX_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((WINDOW_MS - (now - bucket[0])) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  bucket.push(now);
  buckets.set(ip, bucket);

  // Keep the map from growing without bound on a long-lived process.
  if (buckets.size > 5000) {
    for (const [key, times] of buckets) {
      if (times.every((time) => now - time >= WINDOW_MS)) buckets.delete(key);
    }
  }

  return { allowed: true };
}

export function clientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

/* ------------------------------------------------------------------ */
/* Spam evidence                                                        */
/* ------------------------------------------------------------------ */

const MIN_DWELL_MS = 2000;

/**
 * Three independent signals, in increasing cost order.
 *
 * All of them return the same generic refusal, so a bot learns nothing
 * about which one caught it.
 */
export async function checkSpam({ honeypot, renderedAt, turnstileToken }, ip) {
  // 1. Honeypot: a field no human sees, so anything in it is automated.
  if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
    return { ok: false, reason: 'honeypot' };
  }

  // 2. Dwell time: a form completed in under two seconds was not typed.
  const dwell = Number(renderedAt);
  if (Number.isFinite(dwell) && Date.now() - dwell < MIN_DWELL_MS) {
    return { ok: false, reason: 'dwell' };
  }

  // 3. Turnstile, when configured.
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Absent in development on purpose: the two checks above still apply.
    // Production startup refuses to boot without it — see lib/server/env.js.
    return { ok: true, challenge: 'skipped' };
  }

  if (!turnstileToken) return { ok: false, reason: 'challenge-missing' };

  try {
    const body = new URLSearchParams({ secret, response: turnstileToken });
    if (ip && ip !== 'unknown') body.set('remoteip', ip);

    const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      cache: 'no-store',
    });
    const result = await verify.json();
    if (!result.success) return { ok: false, reason: 'challenge-failed' };
  } catch {
    /**
     * Cloudflare unreachable. Allowed through rather than refused: the
     * alternative is that an outage at a third party silently stops every
     * enquiry reaching the business, which is worse than letting some spam
     * past the two checks that already ran.
     */
    return { ok: true, challenge: 'unverified' };
  }

  return { ok: true, challenge: 'passed' };
}

/* ------------------------------------------------------------------ */
/* Email via Resend                                                     */
/* ------------------------------------------------------------------ */

let resendClient;

function getResend() {
  if (resendClient !== undefined) return resendClient;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    resendClient = null;
    return null;
  }

  resendClient = new Resend(apiKey);
  return resendClient;
}

/** Escapes a value before it is interpolated into the HTML email body. */
function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderRows(fields) {
  return fields
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '')
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#555;vertical-align:top">${escapeHtml(label)}</td>` +
        `<td style="padding:6px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
    )
    .join('');
}

/**
 * Sends the notification via Resend. Never throws: a mail failure must not
 * turn a successfully captured lead into an error for the person who
 * submitted it. The caller has already decided to respond 201.
 */
export async function notify({ subject, heading, fields, replyTo, body }) {
  const resend = getResend();
  const to = process.env.ADMIN_NOTIFICATION_EMAIL ?? 'enquiry@shineconsultant.co.in';

  if (!resend) {
    // Logged, not silently dropped, so a misconfigured deployment is
    // visible in the platform logs rather than only discovered when
    // somebody asks why no enquiries have arrived.
    console.warn(
      '[lead] no Resend API key configured; lead was not emailed',
      { subject },
    );
    return { sent: false, reason: 'not-configured' };
  }

  const from = process.env.MAIL_FROM ?? 'Shine Consultant <support@shineconsultant.co.in>';

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: replyTo || undefined,
      subject,
      text: [
        heading,
        '',
        ...fields
          .filter(([, v]) => String(v ?? '').trim() !== '')
          .map(([label, value]) => `${label}: ${value}`),
        '',
        body ?? '',
      ].join('\n'),
      html:
        `<div style="font-family:system-ui,sans-serif;font-size:15px;color:#222;line-height:1.5">` +
        `<h2 style="margin:0 0 16px;font-size:18px">${escapeHtml(heading)}</h2>` +
        `<table style="border-collapse:collapse">${renderRows(fields)}</table>` +
        (body
          ? `<p style="margin:18px 0 0;white-space:pre-wrap;border-top:1px solid #eee;padding-top:14px">${escapeHtml(body)}</p>`
          : '') +
        `</div>`,
    });

    if (error) {
      console.error('[lead] Resend error', { message: error.message, name: error.name });
      return { sent: false, reason: 'send-failed' };
    }

    return { sent: true };
  } catch (error) {
    console.error('[lead] email failed', { message: error.message });
    return { sent: false, reason: 'send-failed' };
  }
}

/* ------------------------------------------------------------------ */
/* Reference                                                            */
/* ------------------------------------------------------------------ */

/**
 * A short reference the visitor can quote. Previously a database sequence;
 * now a timestamp in base 36 plus random characters, which is unique enough
 * for a human-quoted reference and needs no storage.
 */
export function buildReference(prefix) {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  const random = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `${prefix}-${stamp}${random}`;
}
