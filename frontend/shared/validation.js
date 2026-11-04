/**
 * Mirror of backend/src/validators/{engine,leadSchemas}.js.
 *
 * Field names match the server's descriptors exactly, which is what lets
 * the client map a server `fields[]` response straight back onto its own
 * inputs — and what makes a client/server disagreement a data difference
 * rather than an interpretation difference.
 */

import { CONSULTATION_TIME_SLOTS } from './constants';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE_ALLOWED = /^[0-9+\-()\s]+$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const BOOKING_TIMEZONE = 'Asia/Kolkata';

/** Used by the checks below and by nothing outside this file. */
function isPresent(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

export function todayInZone(timezone = BOOKING_TIMEZONE, now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

const checks = {
  required: (value, _arg, field) => isPresent(value) || `${field.label} is required.`,
  minLength: (value, min, field) =>
    !isPresent(value) ||
    String(value).trim().length >= min ||
    `${field.label} must be at least ${min} characters.`,
  maxLength: (value, max, field) =>
    !isPresent(value) ||
    String(value).trim().length <= max ||
    `${field.label} must be ${max} characters or fewer.`,
  email: (value) =>
    !isPresent(value) || EMAIL_PATTERN.test(String(value).trim()) || 'Enter a valid email address.',
  phone: (value) => {
    if (!isPresent(value)) return true;
    const raw = String(value).trim();
    if (!PHONE_ALLOWED.test(raw)) return 'Use digits, spaces and + - ( ) only.';
    const digits = raw.replace(/\D/g, '');
    if (digits.length < 7) return 'Enter a contact number with at least 7 digits.';
    if (digits.length > 15) return 'Enter a contact number with 15 digits or fewer.';
    return true;
  },
  isoDate: (value) =>
    !isPresent(value) || ISO_DATE.test(String(value).trim()) || 'Choose a date.',
  notBeforeToday: (value, timezone, field) =>
    !isPresent(value) ||
    String(value).trim() >= todayInZone(timezone) ||
    `${field.label} cannot be in the past.`,
  oneOf: (value, allowed, field) =>
    !isPresent(value) ||
    allowed.includes(String(value)) ||
    `Choose a valid ${field.label.toLowerCase()}.`,
};

export function validateAgainst(descriptor, payload = {}) {
  const fields = [];
  const value = {};

  for (const field of descriptor.fields) {
    const raw = payload?.[field.name];
    let message = null;

    for (const [rule, arg] of Object.entries(field.rules ?? {})) {
      const verdict = checks[rule](raw, arg, field);
      if (verdict !== true) {
        message = verdict;
        break;
      }
    }

    if (message) fields.push({ field: field.name, message });
    else if (isPresent(raw)) value[field.name] = typeof raw === 'string' ? raw.trim() : raw;
  }

  return { valid: fields.length === 0, fields, value };
}

/** Validates one field in isolation, for on-blur feedback. */
export function validateField(descriptor, name, payload) {
  const field = descriptor.fields.find((candidate) => candidate.name === name);
  if (!field) return null;

  for (const [rule, arg] of Object.entries(field.rules ?? {})) {
    const verdict = checks[rule](payload?.[name], arg, field);
    if (verdict !== true) return verdict;
  }
  return null;
}

export function fieldsToMap(fields = []) {
  return Object.fromEntries(fields.map((entry) => [entry.field, entry.message]));
}

export const enquiryDescriptor = {
  name: 'enquiry',
  fields: [
    { name: 'fullName', label: 'Full name', rules: { required: true, minLength: 2, maxLength: 100 } },
    { name: 'email', label: 'Email address', rules: { required: true, email: true, maxLength: 254 } },
    { name: 'phone', label: 'Phone number', rules: { required: true, phone: true } },
    { name: 'interestedCountry', label: 'Interested country', rules: { maxLength: 120 } },
    { name: 'interestedCourse', label: 'Interested course', rules: { maxLength: 120 } },
    { name: 'interestedService', label: 'Interested service', rules: { maxLength: 160 } },
    { name: 'educationLevel', label: 'Current education level', rules: { maxLength: 120 } },
    { name: 'message', label: 'Message', rules: { required: true, minLength: 10, maxLength: 2000 } },
  ],
};

export const consultationDescriptor = {
  name: 'consultation',
  fields: [
    { name: 'studentName', label: 'Student name', rules: { required: true, minLength: 2, maxLength: 100 } },
    { name: 'email', label: 'Email address', rules: { required: true, email: true, maxLength: 254 } },
    { name: 'phone', label: 'Phone number', rules: { required: true, phone: true } },
    { name: 'preferredCountry', label: 'Preferred country', rules: { required: true, maxLength: 120 } },
    { name: 'preferredCourse', label: 'Preferred course', rules: { maxLength: 120 } },
    { name: 'currentQualification', label: 'Current qualification', rules: { maxLength: 120 } },
    {
      name: 'preferredDate',
      label: 'Preferred date',
      rules: { required: true, isoDate: true, notBeforeToday: BOOKING_TIMEZONE },
    },
    {
      name: 'preferredTime',
      label: 'Preferred time',
      rules: { required: true, oneOf: CONSULTATION_TIME_SLOTS },
    },
  ],
};

export { BOOKING_TIMEZONE };
