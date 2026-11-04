'use client';

/**
 * Browser-side transport for the two forms, posting to this app's own route
 * handlers at `/api/*`.
 *
 * It replaced an axios instance pointed at a separate Express service.
 * Same-origin means no CORS, no credentials, and no cross-site cookie — and
 * because the admin panel is gone, there is no session to carry, so none of
 * the interceptor machinery that client needed applies any more. Dropping
 * axios also removes a dependency from the browser bundle.
 */

const TIMEOUT_MS = 20_000;

/**
 * Flattens a failure into the shape the forms already render:
 * { code, message, fields, status, retryAfterSeconds }.
 */
export function normaliseError(error) {
  if (error?.__normalised) return error;
  return {
    __normalised: true,
    status: 0,
    code: error?.name === 'AbortError' ? 'TIMEOUT' : 'NETWORK_ERROR',
    message:
      error?.name === 'AbortError'
        ? 'That took too long. Please try again.'
        : 'We could not reach our service. Check your connection and try again.',
    fields: [],
    retryAfterSeconds: null,
  };
}

export async function post(path, data) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response;
  try {
    response = await fetch(`/api${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
  } catch (error) {
    throw normaliseError(error);
  } finally {
    clearTimeout(timer);
  }

  const body = await response.json().catch(() => null);

  if (!response.ok || !body?.success) {
    const payload = body?.error ?? {};
    throw {
      __normalised: true,
      status: response.status,
      code: payload.code ?? 'REQUEST_FAILED',
      message: payload.message ?? 'Something went wrong. Please try again.',
      fields: payload.fields ?? [],
      retryAfterSeconds:
        payload.retryAfterSeconds ?? Number(response.headers.get('retry-after')) ?? null,
    };
  }

  return body.data;
}
