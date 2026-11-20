'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { post, normaliseError } from '../../lib/leadClient';
import { fieldsToMap, validateAgainst, validateField } from '../../shared/validation';

/**
 * Shared behaviour for the enquiry and booking forms.
 *
 * The contract it enforces:
 *  - invalid input is caught on the client and no request is sent
 *  - the first invalid field receives focus, and every error is announced
 *  - a 5xx keeps every entered value and offers retry with the same payload
 *  - a 429 disables submit and reports the wait
 */
export function useLeadForm({ descriptor, endpoint, initialValues, buildPayload }) {
  const [values, setValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [retryAfter, setRetryAfter] = useState(null);

  const [honeypot, setHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const renderedAt = useRef(Date.now());
  const formRef = useRef(null);
  const lastPayload = useRef(null);

  const labels = useMemo(
    () => Object.fromEntries(descriptor.fields.map((field) => [field.name, field.label])),
    [descriptor],
  );

  const setValue = useCallback((name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
    // Clear the message as soon as the visitor starts fixing the field,
    // rather than leaving stale red text under a now-valid input.
    setFieldErrors((current) => (current[name] ? { ...current, [name]: null } : current));
  }, []);

  const handleChange = useCallback(
    (event) => setValue(event.target.name, event.target.value),
    [setValue],
  );

  const handleBlur = useCallback(
    (event) => {
      const { name } = event.target;
      setValues((current) => {
        const message = validateField(descriptor, name, current);
        setFieldErrors((errors) => ({ ...errors, [name]: message }));
        return current;
      });
    },
    [descriptor],
  );

  const focusFirstInvalid = useCallback((errors) => {
    const firstField = descriptor.fields.find((field) => errors[field.name]);
    if (!firstField) return;
    const element = formRef.current?.querySelector(`[name="${firstField.name}"]`);
    if (element instanceof HTMLElement) element.focus();
  }, [descriptor]);

  const send = useCallback(
    async (payload) => {
      setSubmitting(true);
      setFormError(null);
      setRetryAfter(null);

      try {
        const data = await post(endpoint, payload);
        setResult(data);
        setValues(initialValues);
        setFieldErrors({});
        renderedAt.current = Date.now();
        return data;
      } catch (error) {
        const normalised = normaliseError(error);

        if (normalised.fields?.length) {
          const mapped = fieldsToMap(normalised.fields);
          setFieldErrors(mapped);
          focusFirstInvalid(mapped);
        }

        if (normalised.status === 429) setRetryAfter(normalised.retryAfterSeconds ?? 600);

        setFormError(normalised.message);
        return null;
      } finally {
        setSubmitting(false);
      }
    },
    [endpoint, focusFirstInvalid, initialValues],
  );

  const submit = useCallback(
    async (event) => {
      event?.preventDefault();

      const verdict = validateAgainst(descriptor, values);
      if (!verdict.valid) {
        const mapped = fieldsToMap(verdict.fields);
        setFieldErrors(mapped);
        setFormError('Check the highlighted fields and try again.');
        focusFirstInvalid(mapped);
        // No request is issued — the browser already knows this is invalid.
        return;
      }

      const payload = {
        ...(buildPayload ? buildPayload(verdict.value) : verdict.value),
        honeypot,
        renderedAt: renderedAt.current,
        ...(turnstileToken ? { turnstileToken } : {}),
      };

      lastPayload.current = payload;
      await send(payload);
    },
    [buildPayload, descriptor, focusFirstInvalid, honeypot, send, turnstileToken, values],
  );

  /** Re-posts the identical payload, so nothing the visitor typed is lost. */
  const retry = useCallback(() => {
    if (lastPayload.current) send(lastPayload.current);
  }, [send]);

  return {
    values,
    setValue,
    handleChange,
    handleBlur,
    fieldErrors,
    formError,
    submitting,
    result,
    retryAfter,
    submit,
    retry,
    formRef,
    labels,
    honeypot,
    setHoneypot,
    setTurnstileToken,
    reset: () => {
      setResult(null);
      setValues(initialValues);
      setFieldErrors({});
      setFormError(null);
      renderedAt.current = Date.now();
    },
  };
}
