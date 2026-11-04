'use client';

import { CalendarCheck, Clock } from 'lucide-react';
import { FormErrorSummary, FormField, SpamGuardFields } from './FormField';
import { Turnstile } from './Turnstile';
import { useLeadForm } from './useLeadForm';
import { Button } from '../ui/Button';
import { consultationDescriptor, todayInZone } from '../../shared/validation';
import { CONSULTATION_TIME_SLOTS } from '../../shared/constants';
import { formatDate, formatTime } from '../../lib/format';

const EMPTY = {
  studentName: '',
  email: '',
  phone: '',
  preferredCountry: '',
  preferredCourse: '',
  currentQualification: '',
  preferredDate: '',
  preferredTime: '',
};

export function BookingForm({ countries = [] }) {
  const form = useLeadForm({
    descriptor: consultationDescriptor,
    endpoint: '/consultations',
    initialValues: EMPTY,
  });

  // The native date picker enforces the floor too, so a past date is hard
  // to enter as well as rejected if it is.
  const minDate = todayInZone();

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
          A counsellor will confirm the slot by email or phone. If the time you chose is
          unavailable we will offer the nearest alternatives.
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
          <div className="flex items-center justify-between gap-4 py-3">
            <dt className="text-caption text-charcoal-70">Requested date</dt>
            <dd className="font-heading text-caption font-semibold text-navy">
              {formatDate(form.result.preferredDate)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-3">
            <dt className="text-caption text-charcoal-70">Requested time</dt>
            <dd className="font-heading text-caption font-semibold text-navy">
              {formatTime(form.result.preferredTime)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-3">
            <dt className="text-caption text-charcoal-70">Destination</dt>
            <dd className="font-heading text-caption font-semibold text-navy">
              {form.result.preferredCountry}
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

      <FormField
        label="Preferred country"
        name="preferredCountry"
        as="select"
        required
        options={countries.map((country) => country.name)}
        placeholder="Select a destination"
        hint={
          countries.length === 0
            ? 'No destinations are published yet. Send us an enquiry instead and we will advise directly.'
            : undefined
        }
        value={form.values.preferredCountry}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.fieldErrors.preferredCountry}
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

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Preferred date"
          name="preferredDate"
          type="date"
          required
          min={minDate}
          value={form.values.preferredDate}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.fieldErrors.preferredDate}
        />
        <FormField
          label="Preferred time"
          name="preferredTime"
          as="select"
          required
          options={CONSULTATION_TIME_SLOTS.map((slot) => ({
            value: slot,
            label: formatTime(slot),
          }))}
          placeholder="Select a slot"
          value={form.values.preferredTime}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.fieldErrors.preferredTime}
        />
      </div>

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
