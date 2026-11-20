'use client';

import { CheckCircle2, Clock, Send } from 'lucide-react';
import { FormErrorSummary, FormField, SpamGuardFields } from './FormField';
import { Turnstile } from './Turnstile';
import { useLeadForm } from './useLeadForm';
import { Button } from '../ui/Button';
import { enquiryDescriptor } from '../../shared/validation';
import { EDUCATION_LEVELS } from '../../shared/constants';

const EMPTY = {
  fullName: '',
  email: '',
  phone: '',
  interestedCountry: '',
  interestedCourse: '',
  interestedService: '',
  educationLevel: '',
  message: '',
};

/**
 * Used on the contact page and inline on destination, course and
 * university pages. The `context` prop carries the originating record, so
 * an enquiry from a course page arrives already attached to that course.
 */
export function EnquiryForm({
  source = 'contact_page',
  context = {},
  countries = [],
  services = [],
  title,
  description,
  compact = false,
  submitLabel = 'Send enquiry',
  successTitle = 'Your enquiry is with us',
}) {
  const form = useLeadForm({
    descriptor: enquiryDescriptor,
    endpoint: '/enquiries',
    initialValues: {
      ...EMPTY,
      interestedCountry: context.countryName ?? '',
      interestedCourse: context.courseTitle ?? '',
      // Pre-filled when the form sits on a service or test page, so the
      // visitor does not restate what they were already reading about.
      interestedService: context.serviceName ?? '',
    },
    buildPayload: (values) => ({
      ...values,
      source,
      ...(context.courseId ? { courseId: context.courseId } : {}),
      ...(context.universityId ? { universityId: context.universityId } : {}),
      ...(context.destinationId ? { destinationId: context.destinationId } : {}),
      ...(context.serviceId ? { serviceId: context.serviceId } : {}),
      ...(context.testPreparationId ? { testPreparationId: context.testPreparationId } : {}),
    }),
  });

  if (form.result) {
    return (
      <div
        className="rounded-xl border border-navy/10 bg-white p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-[#1F6B4A]" aria-hidden="true" />
        <h3 className="mt-4 text-h3 font-bold">{successTitle}</h3>
        <p className="mx-auto mt-3 max-w-measure text-body text-charcoal-70">
          A counsellor will review it and reply during our next working hours. Quote reference{' '}
          <strong className="font-semibold text-navy">{form.result.reference}</strong> if you
          contact us before then.
        </p>
        <Button variant="secondary" onClick={form.reset} className="mt-6">
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      ref={form.formRef}
      onSubmit={form.submit}
      noValidate
      className={compact ? '' : 'rounded-xl border border-navy/10 bg-white p-6 lg:p-8'}
    >
      {title ? <h2 className="text-h3 font-bold">{title}</h2> : null}
      {description ? (
        <p className="mt-2 max-w-prose text-body text-charcoal-70">{description}</p>
      ) : null}

      <div className={`${title || description ? 'mt-6' : ''} space-y-5`}>
        <FormErrorSummary
          message={form.formError}
          fieldErrors={form.fieldErrors}
          labels={form.labels}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Full name"
            name="fullName"
            required
            autoComplete="name"
            value={form.values.fullName}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.fieldErrors.fullName}
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
            label="Interested country"
            name="interestedCountry"
            as={countries.length > 0 ? 'select' : 'input'}
            options={countries.map((country) => country.name)}
            placeholder={countries.length > 0 ? 'Select a destination' : undefined}
            value={form.values.interestedCountry}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.fieldErrors.interestedCountry}
          />
          <FormField
            label="Interested course"
            name="interestedCourse"
            value={form.values.interestedCourse}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.fieldErrors.interestedCourse}
          />
          <FormField
            label="Current education level"
            name="educationLevel"
            as="select"
            options={EDUCATION_LEVELS}
            placeholder="Select your current level"
            value={form.values.educationLevel}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.fieldErrors.educationLevel}
          />
          {/* A select where the caller supplied the published list, a plain
              input otherwise — never a select with nothing in it. */}
          <FormField
            label="Interested service"
            name="interestedService"
            as={services.length > 0 ? 'select' : 'input'}
            options={services.map((service) => service.name)}
            placeholder={services.length > 0 ? 'Select a service' : undefined}
            value={form.values.interestedService}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.fieldErrors.interestedService}
          />
        </div>

        <FormField
          label="Message"
          name="message"
          as="textarea"
          required
          rows={5}
          placeholder="Tell us what you are considering, and anything that would help us advise you."
          hint="At least 10 characters."
          value={form.values.message}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.fieldErrors.message}
        />

        <SpamGuardFields honeypot={form.honeypot} onHoneypotChange={form.setHoneypot} />
        <Turnstile onToken={form.setTurnstileToken} />

        {form.retryAfter ? (
          <p className="flex items-center gap-2 text-caption text-charcoal-70">
            <Clock className="h-4 w-4" aria-hidden="true" />
            Please wait about {Math.ceil(form.retryAfter / 60)} minutes before sending another
            message.
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit" size="lg" disabled={form.submitting || Boolean(form.retryAfter)}>
            {form.submitting ? 'Sending…' : submitLabel}
            {!form.submitting ? <Send className="h-4 w-4" aria-hidden="true" /> : null}
          </Button>

          {/* Retry re-posts the identical payload rather than asking the
              visitor to type it again. */}
          {form.formError && !form.retryAfter && Object.keys(form.fieldErrors).length === 0 ? (
            <Button type="button" variant="secondary" onClick={form.retry}>
              Try again
            </Button>
          ) : null}
        </div>

        <p className="text-caption text-charcoal-50">
          We use your details only to respond to this enquiry. See our{' '}
          <a href="/privacy-policy" className="text-navy underline underline-offset-2">
            privacy policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}
