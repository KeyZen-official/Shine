import { buildMetadata } from '../../../lib/seo';
import { LegalDocument } from '../legal/LegalDocument';

export const metadata = buildMetadata({
  title: 'Accessibility',
  description:
    'Our accessibility conformance target for this website, what we have done, the limitations we know about, and how to tell us about a problem.',
  path: '/accessibility',
});

const SECTIONS = [
  {
    id: 'our-target',
    heading: 'Our conformance target',
    body: [
      'We aim to meet WCAG 2.1 Level AA across this website. That is a target we hold ourselves to, not a certification we have been awarded.',
      'This statement describes what we have built in, what we know is not yet right, and how to report something we have missed.',
    ],
  },
  {
    id: 'what-we-have-done',
    heading: 'What we have built in',
    body: [
      'Specific measures rather than general assurances:',
      [
        'Every page has one level-one heading and a heading sequence that does not skip levels.',
        'A skip link is the first element in the tab order on every page and moves focus to the main content.',
        'Body text meets or exceeds a 4.5:1 contrast ratio against its background, and headings 3:1. Our brand red is never used as text on our navy surfaces, because that pairing measures 2.66:1 and fails — a lighter variant at 4.87:1 is used instead.',
        'Body text is at least 16 pixels at every viewport width, and the type scale uses fluid sizing so there is no jump between breakpoints.',
        'Every interactive control is at least 44 by 44 pixels below 1024 pixels wide.',
        'Every control is reachable and operable by keyboard, with a visible focus indicator that is never removed.',
        'The mobile navigation drawer traps focus while open and returns focus to the button that opened it on close. Escape closes it.',
        'Every form field has a visible label that is programmatically associated with it. A placeholder is never the only label.',
        'Form errors appear beside the field and are also announced through an assertive live region, so a screen reader user does not have to hunt for them.',
        'Loading and result counts are announced once per region through a polite live region, not once per card.',
        'Every content image carries a description entered with the image. An image cannot be saved in our system without one.',
        'Status and selection are never signalled by colour alone — there is always a text label, a checkmark or an underline as well.',
        'All motion respects the operating system reduced-motion preference. With it on, entrance and parallax animations do not run.',
      ],
    ],
  },
  {
    id: 'known-limitations',
    heading: 'Limitations we know about',
    body: [
      'Being specific here is more useful than claiming full conformance:',
      [
        'The process timeline and the testimonial and course rails scroll horizontally on wide screens. They are keyboard-focusable and scrollable, but a horizontal scroll region is harder to navigate than a vertical list.',
        'The Google Maps embed on our contact page is a third-party iframe. Its internal accessibility is outside our control.',
        'The Cloudflare Turnstile challenge on our forms is a third-party widget. We use its no-interaction mode so that in most cases nothing is required of you, but we do not control its markup.',
        'Long-form content entered by our team — country guides, course overviews — depends on the person writing it using clear language and structure. We review for this, but it is a human process and we will not always get it right.',
        'We have not yet completed a full audit with a screen reader on every page of the site.',
      ],
    ],
  },
  {
    id: 'compatibility',
    heading: 'Compatibility',
    body: [
      'This site is built and tested against current versions of Chrome, Edge, Firefox and Safari on desktop and mobile. It should work with the screen readers built into those platforms.',
      'It will not work correctly in browsers that do not support modern CSS layout. We have chosen not to support versions of Internet Explorer.',
    ],
  },
  {
    id: 'tell-us',
    heading: 'Telling us about a problem',
    body: [
      'If any part of this site is difficult or impossible for you to use, we want to know — and we will also give you the information another way in the meantime.',
      'Contact us using the details on our contact page and describe what you were trying to do and what went wrong. We will acknowledge within five working days and tell you what we intend to do about it.',
      'If you need course details, entry requirements or our contact information in a different format, ask and we will send it.',
    ],
  },
];

export default function AccessibilityPage() {
  return (
    <LegalDocument
      title="Accessibility"
      intro="What we have built in, what we know is not yet right, and how to tell us about a problem."
      lastUpdated="Pending publication — confirm after the first full audit"
      sections={SECTIONS}
    />
  );
}
