import { buildMetadata } from '../../../lib/seo';
import { LegalDocument } from '../legal/LegalDocument';

export const metadata = buildMetadata({
  title: 'Terms & Conditions',
  description:
    'The terms on which Shine Consultant provides this website and its education consultancy services.',
  path: '/terms-and-conditions',
});

const SECTIONS = [
  {
    id: 'about-these-terms',
    heading: 'About these terms',
    body: [
      'These terms govern your use of this website and the guidance we provide through it. By using the site or submitting an enquiry, you accept them.',
      'If you engage us for ongoing consultancy, that engagement will have its own written agreement. Where the two differ, the engagement agreement takes precedence.',
    ],
  },
  {
    id: 'what-we-provide',
    heading: 'What we provide',
    body: [
      'Shine Consultant is an overseas education, migration consultancy and training organisation. We provide career counselling, university selection, university application support, scholarship guidance, visa assistance, pre- and post-departure sessions, test preparation, corporate training, migration counselling, visa counselling and institutional services.',
      'Nothing is sold, booked or paid for through this website. The site carries information and an enquiry form; any engagement follows a separate conversation.',
      'We are not a university, an admissions office or an immigration authority. We do not make admission decisions and we do not make visa decisions.',
      'We do not provide, arrange or broker financial lending services of any kind. We have no lending partners and we receive no commission from any lender.',
    ],
  },
  {
    id: 'no-guarantees',
    heading: 'What we do not promise',
    body: [
      'We cannot and do not guarantee admission to any institution, the award of any scholarship, the grant of any visa, or any particular career outcome. Any claim to the contrary, by anyone, should be treated with suspicion.',
      'Our role is to improve the quality of your decision and the completeness of your application. The decisions themselves rest with the institutions and authorities concerned.',
    ],
  },
  {
    id: 'accuracy',
    heading: 'Accuracy of information on this site',
    body: [
      'We publish course details, entry requirements, tuition fees and partnership information only where we have verified them, and we show the date each record was last reviewed.',
      'Requirements, fees and immigration rules change, sometimes without notice. Always confirm current details with the institution and the relevant immigration authority before you act, and treat the review date on a page as the limit of what we can vouch for.',
      'Where we have not verified a figure, we leave the field empty rather than estimating it. An absent tuition fee means we do not have a confirmed one, not that the course is free.',
    ],
  },
  {
    id: 'your-responsibilities',
    heading: 'Your responsibilities',
    body: [
      'You agree to give us accurate information about your academic record, test scores and circumstances. Our guidance is only as good as what you tell us, and an application built on inaccurate information can be withdrawn by the institution.',
      'You are responsible for submitting truthful documents to institutions and immigration authorities. We will not assist with, and will end an engagement over, any attempt to submit false or altered documents.',
      'You agree not to misuse this website: no automated scraping, no attempt to access the back office, and no submission of unlawful content through our forms.',
    ],
  },
  {
    id: 'third-parties',
    heading: 'Third-party institutions and links',
    body: [
      'Where we link to a university or an official authority, we do so for your convenience. We do not control those sites and are not responsible for their content or their decisions.',
      'A university appearing in our directory does not imply a partnership unless the page says we have verified one.',
    ],
  },
  {
    id: 'intellectual-property',
    heading: 'Intellectual property',
    body: [
      'The design, text, structure and compiled content of this website belong to Shine Consultant. You may read, print and share pages for your own educational use.',
      'University names and logos belong to those institutions and appear here to identify them.',
    ],
  },
  {
    id: 'liability',
    heading: 'Liability',
    body: [
      'We provide this website and our guidance in good faith and with reasonable care. To the extent permitted by law, we are not liable for indirect or consequential loss arising from your use of the site, from a third party changing its requirements, or from a decision taken by an institution or authority.',
      'Nothing in these terms limits liability that cannot lawfully be limited.',
    ],
  },
  {
    id: 'governing-law',
    heading: 'Governing law',
    body: [
      'These terms are governed by the laws of India, and the courts of India have jurisdiction over any dispute arising from them.',
    ],
  },
  {
    id: 'contact',
    heading: 'Contacting us about these terms',
    body: [
      'Use the details on our contact page. We will respond to any question about these terms within a reasonable period.',
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms & conditions"
      intro="The basis on which we provide this website and our consultancy services."
      lastUpdated="Pending publication — review this document before launch"
      draftNotice="This is a prepared draft, not legal advice. Have it reviewed by a lawyer, confirm the governing-law clause matches where your business is registered, and replace this notice with a real publication date before launch."
      sections={SECTIONS}
    />
  );
}
