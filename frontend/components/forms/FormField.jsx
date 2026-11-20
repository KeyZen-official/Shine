'use client';

import { useId } from 'react';
import { AlertCircle } from 'lucide-react';

const CONTROL =
  'block w-full rounded-md border bg-white px-4 text-body text-charcoal placeholder:text-charcoal-50 ' +
  'transition-colors duration-fast ease-standard disabled:bg-sage disabled:text-charcoal-50';

const NORMAL = 'border-navy/20 focus:border-navy';
const INVALID = 'border-accent focus:border-accent';

/**
 * Every field renders a visible label associated by htmlFor/id. A
 * placeholder is never the only label: it disappears the moment someone
 * starts typing, which is exactly when they need it.
 *
 * On error the control gets aria-invalid and aria-describedby pointing at
 * the message node, so the reason is announced with the field.
 */
export function FormField({
  label,
  name,
  type = 'text',
  as = 'input',
  value,
  onChange,
  onBlur,
  error,
  hint,
  required = false,
  options = [],
  placeholder,
  rows = 5,
  autoComplete,
  min,
  max,
  className = '',
  disabled = false,
}) {
  const reactId = useId();
  const id = `${name}-${reactId}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ');

  const shared = {
    id,
    name,
    value: value ?? '',
    onChange,
    onBlur,
    required,
    disabled,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': describedBy || undefined,
    'aria-required': required || undefined,
    className: `${CONTROL} ${error ? INVALID : NORMAL} ${
      as === 'textarea' ? 'min-h-40 py-3' : 'h-11'
    }`,
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block font-heading text-caption font-semibold text-navy">
        {label}
        {required ? (
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 font-normal text-charcoal-50">(optional)</span>
        )}
      </label>

      {as === 'textarea' ? (
        <textarea {...shared} rows={rows} placeholder={placeholder} />
      ) : as === 'select' ? (
        <select {...shared} className={`${shared.className} pr-10`}>
          <option value="">{placeholder ?? 'Select an option'}</option>
          {options.map((option) => {
            const optionValue = typeof option === 'string' ? option : option.value;
            const optionLabel = typeof option === 'string' ? option : option.label;
            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>
      ) : (
        <input
          {...shared}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          min={min}
          max={max}
        />
      )}

      {hint ? (
        <p id={hintId} className="mt-2 text-caption text-charcoal-50">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="mt-2 flex items-start gap-1.5 text-caption text-accent">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Three layers of spam evidence, two of them invisible:
 *  - a honeypot field a human never fills
 *  - the timestamp the form was rendered, so a sub-3-second submission is
 *    rejected server-side
 * The third, the Turnstile challenge, mounts only when a site key is set.
 */
export function SpamGuardFields({ honeypot, onHoneypotChange }) {
  return (
    <div className="honeypot" aria-hidden="true">
      <label htmlFor="company_website">Company website</label>
      <input
        id="company_website"
        name="company_website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(event) => onHoneypotChange(event.target.value)}
      />
    </div>
  );
}

/**
 * One assertive summary per form. Screen reader users find out that a
 * submission failed without having to tab through every field hunting for
 * the red one.
 */
export function FormErrorSummary({ message, fieldErrors = {}, labels = {} }) {
  const entries = Object.entries(fieldErrors).filter(([, value]) => Boolean(value));
  if (!message && entries.length === 0) return <div role="alert" aria-live="assertive" className="sr-only" />;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="rounded-lg border border-accent/40 bg-accent/5 p-4"
    >
      <p className="flex items-start gap-2 font-heading text-caption font-semibold text-accent">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        {message ?? 'Check the highlighted fields and try again.'}
      </p>
      {entries.length > 0 ? (
        <ul className="mt-2 list-inside list-disc space-y-1 pl-6 text-caption text-charcoal-70">
          {entries.map(([field, error]) => (
            <li key={field}>
              <span className="font-semibold">{labels[field] ?? field}:</span> {error}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
