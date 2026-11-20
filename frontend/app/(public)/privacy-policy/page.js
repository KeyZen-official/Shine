import { buildMetadata } from '../../../lib/seo';
import { LegalDocument } from '../legal/LegalDocument';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'What personal information Shine Consultant collects through this website, why, how long we keep it and who processes it.',
  path: '/privacy-policy',
});

const SECTIONS = [
  {
    id: 'what-we-collect',
    heading: 'What we collect',
    body: [
      'This website collects personal information in exactly two places: the enquiry form and the consultation booking form. Nothing is collected passively — there is no analytics script, no advertising tag and no tracking cookie on this site.',
      'When you submit an enquiry we store the following, as you entered it:',
      [
        'Your full name',
        'Your email address',
        'Your phone number',
        'The country and course you are interested in, if you told us',
        'Your current education level, if you told us',
        'The message you wrote',
        'Which page you submitted the form from',
        'Your IP address and browser user-agent string',
      ],
      'When you book a consultation we store your name, email address, phone number, preferred country and course, current qualification, and the date and time you requested, along with the same IP address and user-agent.',
      'We do not ask for, and have no field to store, financial information. We do not collect income figures, bank details, collateral details or payment information anywhere on this site.',
    ],
  },
  {
    id: 'why-we-collect',
    heading: 'Why we collect it',
    body: [
      'Your name, contact details and message are used to answer your enquiry or arrange your consultation. That is the only purpose.',
      'The IP address and user-agent are retained for one reason: to investigate abuse of the forms, such as automated submissions. They are not used to build a profile of you and are not shared.',
      'We do not sell your information. We do not pass it to universities, agents or any third party for marketing.',
    ],
  },
  {
    id: 'lawful-basis',
    heading: 'Our basis for processing',
    body: [
      'We process your enquiry or booking because you asked us to contact you — that is, on the basis of your request and our legitimate interest in responding to it.',
      'If we later want to send you anything beyond a reply to your enquiry, we will ask for your consent first, and you will be able to withdraw it at any time.',
    ],
  },
  {
    id: 'who-processes-it',
    heading: 'Who processes it on our behalf',
    body: [
      'Your information is stored in our own database and is handled by the following processors:',
      [
        'Our email provider, which delivers the notification to our team and the confirmation to you',
        'Our hosting provider, which runs this website and our database',
        'Cloudflare Turnstile, which checks that form submissions are not automated. Turnstile does not set cookies and does not receive your form contents.',
      ],
      'If you view the map on our contact page, that iframe is served by Google and your browser will connect to Google to load it. That request is made only on the contact page, and only when the map is in view.',
    ],
  },
  {
    id: 'how-long',
    heading: 'How long we keep it',
    body: [
      'We keep enquiry and booking records for as long as we are actively advising you, and for up to 24 months after our last contact, so that a returning student does not have to start again.',
      'IP addresses and user-agent strings attached to form submissions are deleted after 90 days.',
      'You can ask us to delete your records sooner. See the next section.',
    ],
  },
  {
    id: 'your-rights',
    heading: 'Your rights',
    body: [
      'You can ask us to: tell you what we hold about you; correct anything inaccurate; delete your records; or stop processing them. Write to us using the details on our contact page and we will respond within 30 days.',
      'If you are unhappy with how we have handled your information, you can raise it with the data protection authority in your jurisdiction.',
    ],
  },
  {
    id: 'security',
    heading: 'Security',
    body: [
      'Our site is served over HTTPS. Access to enquiry and booking records requires an authenticated staff account, and passwords are stored only as salted hashes.',
      'No system is perfectly secure. If we ever become aware of a breach affecting your information, we will tell you.',
    ],
  },
  {
    id: 'cookies',
    heading: 'Cookies',
    body: [
      'This website sets no analytics, advertising or tracking cookies, which is why you are not asked to accept any.',
      'The only cookies we set are session and request-verification cookies for our own staff when they sign in to the back office. They are not set for visitors.',
    ],
  },
  {
    id: 'changes',
    heading: 'Changes to this policy',
    body: [
      'If we change what we collect or who processes it, we will update this page and change the date at the top. Material changes will be summarised here.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy policy"
      intro="What this website collects, why, how long we keep it and who else sees it."
      lastUpdated="Pending publication — review this document before launch"
      draftNotice="This is a prepared draft, written to describe how this website actually handles data. It has not been reviewed by a lawyer and is not legal advice. Have it checked, confirm every retention period and processor named here is accurate for your setup, and replace this notice with a real publication date before launch."
      sections={SECTIONS}
    />
  );
}
