'use client';

import { AlertCircle, CalendarCheck, Check, Clock } from 'lucide-react';
import { FormErrorSummary, FormField, SpamGuardFields } from './FormField';
import { Turnstile } from './Turnstile';
import { useLeadForm } from './useLeadForm';
import { Button } from '../ui/Button';
import { consultationDescriptor } from '../../shared/validation';

const STUDY_LEVEL_OPTIONS = [
  "Bachelor's Degree (Undergraduate)",
  "Master's Degree (Postgraduate)",
  'Diploma / Advanced Diploma',
  'Doctorate / PhD',
  'Certificate / Vocational',
  'Other',
];

const EMPTY = {
  studentName: '',
  email: '',
  phone: '',
  preferredCountry: [],
  preferredLevel: '',
  preferredCourse: '',
  currentQualification: '',
};

export function BookingForm({ countries = [] }) {
  const form = useLeadForm({
    descriptor: consultationDescriptor,
    endpoint: '/consultations',
    initialValues: EMPTY,
  });

  const selectedCountries = Array.isArray(form.values.preferredCountry)
    ? form.values.preferredCountry
    : form.values.preferredCountry
    ? [form.values.preferredCountry]
    : [];

  const toggleCountry = (countryName) => {
    const next = selectedCountries.includes(countryName)
      ? selectedCountries.filter((c) => c !== countryName)
      : [...selectedCountries, countryName];
    form.setValue('preferredCountry', next);
  };

  if (form.result) {
    return (
      <div
        className="rounded-xl border border-navy/10 bg-white p-8"
        role="status"
        aria-live="polite"
      >
        <CalendarCheck className="h-10 w-10 text-[#1F6B4A]" aria-hidden="true" />
        <h2 className="mt-4 text-h2 font-bold">Your consultation is requested</h2>
        <p className="mt-3 max-w-prose text-body text-charcoal-70">
          A counsellor will contact you shortly by email or phone to arrange your session.
        </p>

        {/* The confirmation echoes exactly what was submitted, so the
            visitor can check it before they walk away. */}
        <dl className="mt-8 divide-y divide-navy/10 border-y border-navy/10">
          <div className="flex items-center justify-between gap-4 py-3">
            <dt className="text-caption text-charcoal-70">Reference</dt>
            <dd className="font-heading text-caption font-bold text-navy">
              {form.result.reference}
            </dd>
          </div>
          {form.result.preferredLevel ? (
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="text-caption text-charcoal-70">Preferred level</dt>
              <dd className="font-heading text-caption font-semibold text-navy">
                {form.result.preferredLevel}
              </dd>
            </div>
          ) : null}
          <div className="flex items-center justify-between gap-4 py-3">
            <dt className="text-caption text-charcoal-70">Destination(s)</dt>
            <dd className="font-heading text-caption font-semibold text-navy text-right">
              {Array.isArray(form.result.preferredCountry)
                ? form.result.preferredCountry.join(', ')
                : form.result.preferredCountry}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/destinations" variant="secondary">
            Browse courses meanwhile
          </Button>
          <Button variant="ghost" onClick={form.reset}>
            Book another consultation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form ref={form.formRef} onSubmit={form.submit} noValidate className="space-y-5">
      <FormErrorSummary
        message={form.formError}
        fieldErrors={form.fieldErrors}
        labels={form.labels}
      />

      <FormField
        label="Student name"
        name="studentName"
        required
        autoComplete="name"
        value={form.values.studentName}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.fieldErrors.studentName}
      />

      <FormField
        label="Email address"
        name="email"
        type="email"
        required
        autoComplete="email"
        value={form.values.email}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.fieldErrors.email}
      />

      <FormField
        label="Phone number"
        name="phone"
        type="tel"
        required
        autoComplete="tel"
        placeholder="+91 98765 43210"
        value={form.values.phone}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.fieldErrors.phone}
      />

      {/* Multi-destination selector */}
      <div>
        <label className="mb-2 block font-heading text-caption font-semibold text-navy">
          Preferred destinations
          <span className="ml-1 text-accent" aria-hidden="true">*</span>
          <span className="ml-2 font-normal text-charcoal-50">(Select one or more)</span>
        </label>
        <div className="flex flex-wrap gap-2 pt-1">
          {countries.map((country) => {
            const isSelected = selectedCountries.includes(country.name);
            return (
              <button
                type="button"
                key={country.slug || country.name}
                onClick={() => toggleCountry(country.name)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-heading text-caption font-semibold transition-all duration-150 ${
                  isSelected
                    ? 'bg-navy text-white shadow-sm ring-2 ring-accent'
                    : 'border border-navy/15 bg-white text-charcoal hover:border-navy/40 hover:bg-sage/20'
                }`}
              >
                {isSelected && <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />}
                {country.name}
              </button>
            );
          })}
        </div>
        {form.fieldErrors.preferredCountry && (
          <p className="mt-2 flex items-start gap-1.5 text-caption text-accent">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {form.fieldErrors.preferredCountry}
          </p>
        )}
      </div>

      {/* Preferred Level with dropdown */}
      <FormField
        label="Preferred study level"
        name="preferredLevel"
        as="select"
        required
        options={STUDY_LEVEL_OPTIONS}
        placeholder="Select your preferred study level"
        value={form.values.preferredLevel}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.fieldErrors.preferredLevel}
      />

      <FormField
        label="Preferred course"
        name="preferredCourse"
        placeholder="For example, MSc Data Science"
        value={form.values.preferredCourse}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.fieldErrors.preferredCourse}
      />

      <FormField
        label="Current qualification"
        name="currentQualification"
        placeholder="For example, BSc Computer Science, 2024"
        value={form.values.currentQualification}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.fieldErrors.currentQualification}
      />

      <SpamGuardFields honeypot={form.honeypot} onHoneypotChange={form.setHoneypot} />
      <Turnstile onToken={form.setTurnstileToken} />

      {form.retryAfter ? (
        <p className="flex items-center gap-2 text-caption text-charcoal-70">
          <Clock className="h-4 w-4" aria-hidden="true" />
          Please wait about {Math.ceil(form.retryAfter / 60)} minutes before requesting again.
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          disabled={form.submitting || Boolean(form.retryAfter)}
          className="w-full sm:w-auto"
        >
          {form.submitting ? 'Requesting…' : 'Request this consultation'}
        </Button>

        {form.formError && !form.retryAfter && Object.keys(form.fieldErrors).length === 0 ? (
          <Button type="button" variant="secondary" onClick={form.retry}>
            Try again
          </Button>
        ) : null}
      </div>

      <p className="text-caption text-charcoal-50">
        The first consultation is free and carries no obligation. We use your details only to
        arrange it — see our{' '}
        <a href="/privacy-policy" className="text-navy underline underline-offset-2">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
