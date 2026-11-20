import './globals.css';
import { siteConfig } from '../lib/config';

const heading = { variable: 'font-heading' };
const body = { variable: 'font-body' };

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: 'Shine Consultant — Overseas Education, Migration & Training',
    template: '%s | Shine Consultant',
  },
  // Paraphrases the mission statement in the company profile. Keep this in
  // step with COMPANY.mission in backend/src/seed/structure.js.
  description:
    'Honest, unbiased and professional guidance for people broadening their academic and professional horizons overseas. Overseas education, migration consultancy and test preparation from Shine Consultant.',
  applicationName: siteConfig.name,
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: 'en_GB',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#14243A',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
