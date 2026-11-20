const stripTrailing = (value) => (value ? value.replace(/\/+$/, '') : '');

/**
 * Site-level configuration.
 *
 * The API base URL, the server-side API base URL and the API origin have
 * all been removed: there is no API. Content is imported from
 * `content/*.json` at build time, and the two form handlers live in this
 * app under `app/api`, so the browser posts to its own origin.
 */
export const siteConfig = {
  name: 'Shine Consultant',
  tagline: 'Overseas education, migration consultancy and training',
  siteUrl: stripTrailing(process.env.NEXT_PUBLIC_SITE_URL) || 'http://localhost:3000',

  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',

  // With no image on a record, show the generated brand panel rather than
  // the typographic fallback. See docs/image-credits.md.
  useDefaultImagery: process.env.NEXT_PUBLIC_USE_DEFAULT_IMAGERY !== 'false',
};

/**
 * Primary navigation.
 *
 * `short` is what the desktop bar renders; `label` is used in the mobile
 * menu and as the dropdown trigger's accessible name.
 *
 * Six items plus the logo and two calls to action. Seven at their full
 * length ("Study Destinations", "Test Preparation", "Contact Us") wrapped
 * onto two lines and collided with the buttons, which is what the `short`
 * labels and the `xl` breakpoint exist to prevent. Adding an item means
 * re-checking that at 1280px.
 *
 * `/courses` and `/universities` were removed from here with the routes
 * themselves.
 */
export const PRIMARY_NAV = [
  { label: 'Home', short: 'Home', href: '/' },
  { label: 'About Us', short: 'About', href: '/about' },
  {
    label: 'Study Destinations',
    short: 'Destinations',
    // `href` is kept as a unique key for dropdown state only.
    // `dropdownOnly: true` means clicking the label opens the dropdown
    // instead of navigating to the listing page.
    href: '/destinations',
    dropdownSource: 'destinations',
    dropdownOnly: true,
  },
  {
    label: 'Test Preparation',
    short: 'Test Prep',
    href: '/test-preparation',
    dropdownSource: 'testPreparation',
    dropdownOnly: true,
  },
  {
    label: 'Services',
    short: 'Services',
    href: '/services',
    dropdownSource: 'servicePages',
    dropdownOnly: true,
  },
  { label: 'Contact Us', short: 'Contact', href: '/contact' },
];

/**
 * `/courses` and `/universities` are not here either. Both routes were
 * removed with the catalogue that fed them, and a footer link to a 404 is
 * worse than a shorter footer.
 */
export const FOOTER_QUICK_LINKS = [
  { label: 'About us', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Latest updates', href: '/latest-updates' },
  { label: 'Forex exchange', href: '/forex-exchange' },
  { label: 'Contact us', href: '/contact' },
];

export const FOOTER_OUR_SERVICES = [
  { label: 'Career Counselling', href: '/services/career-counselling' },
  { label: 'University Selection', href: '/services/university-selection' },
  { label: 'University Application', href: '/services/university-application' },
  { label: 'Scholarship Help', href: '/services/scholarship-help' },
  { label: 'Visa Assistance', href: '/services/visa-assistance' },
  { label: 'Institutional Tie-ups', href: '/services/institutional-services' },
];

export const FOOTER_ADDITIONAL_SERVICES = [
  { label: 'Study Abroad', href: '/services/study-abroad' },
  { label: 'Migration Counselling', href: '/services/migration-counselling' },
  { label: 'Corporate Training', href: '/services/corporate-training' },
  { label: 'Education Loan', href: '/contact?service=education-loan' },
  { label: 'Forex Support', href: '/forex-exchange' },
  { label: 'Temporary Accommodation', href: '/contact?service=temporary-accommodation' },
];

export const LEGAL_LINKS = [
  { label: 'Privacy policy', href: '/privacy-policy' },
  { label: 'Terms & conditions', href: '/terms-and-conditions' },
  { label: 'Accessibility', href: '/accessibility' },
];
