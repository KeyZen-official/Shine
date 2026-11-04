/**
 * Structural vocabulary: enumerations and labels the UI needs to render
 * controls and badges.
 *
 * No destination fact, requirement, fee or visa rule belongs here. Those
 * live in `content/*.json`, which is the content layer; this file is the
 * fixed set of options those records can take.
 *
 * It used to be twice this size and mirrored a backend constants file. The
 * course taxonomy, study modes, sort options, publication-state labels,
 * service layouts, FAQ scopes and the enquiry and consultation status
 * vocabularies have all been removed along with the subsystems that read
 * them. Everything that remains is referenced by something.
 */

export const TEST_PREPARATION_FAMILIES = [
  { value: 'english', label: 'English language tests' },
  { value: 'entrance', label: 'Entrance and aptitude tests' },
];

/**
 * A destination is not always a country: the roster includes Dubai, a city,
 * and Europe, a region. The detail page shows a badge for anything that is
 * not a country, so neither is described as one.
 */
export const DESTINATION_TYPES = [
  { value: 'country', label: 'Country' },
  { value: 'region', label: 'Region' },
  { value: 'city', label: 'City or emirate' },
];

export const DESTINATION_REGIONS = [
  { value: 'europe', label: 'Europe' },
  { value: 'north-america', label: 'North America' },
  { value: 'oceania', label: 'Oceania' },
  { value: 'asia', label: 'Asia' },
  { value: 'other', label: 'Other' },
];

/** Half-hour slots the consultation form offers. */
export const CONSULTATION_TIME_SLOTS = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00',
];

export const EDUCATION_LEVELS = [
  'Secondary school (Class 10)',
  'Higher secondary (Class 12)',
  "Bachelor's degree — in progress",
  "Bachelor's degree — completed",
  "Master's degree — in progress",
  "Master's degree — completed",
  'Diploma or certificate',
  'Working professional',
];

export function labelFor(list, value) {
  return list.find((item) => item.value === value)?.label ?? value ?? '';
}

/**
 * The only sentence on the site permitted to mention lending, and it
 * exists to say we do not do it. `check:terms` allow-lists this exact
 * string and nothing else.
 */
export const FINANCIAL_SERVICES_DISCLAIMER =
  'Shine Consultant provides education and admissions guidance only. We do not provide, arrange or broker financial lending services of any kind.';
