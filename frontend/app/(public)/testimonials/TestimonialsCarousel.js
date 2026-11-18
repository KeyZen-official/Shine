'use client';

import { CircularTestimonials } from '../../../components/ui/circular-testimonials';

const TESTIMONIALS = [
  {
    quote:
      'They help you for studying for the test which you are preparing for. The service provided is quite good and the staff here is also polite. Overall it was good and convenient for me to do my admission abroad through this agency.',
    name: 'Apurv Nerurkar',
    designation: 'Study Abroad Student',
    src: '/Reviews/WhatsApp Image 2026-11-18 at 2.15.26 PM.jpeg',
  },
  {
    quote:
      'I had a really good experience with Shine Consultant. They supported and guided me at every step and also helped me decide which country would be best for my studies and future growth. They were always in touch and regularly followed up.',
    name: 'Ashwin Singh',
    designation: 'Study Abroad Student',
    src: '/Reviews/WhatsApp Image 2026-11-18 at 2.15.26 PM (1).jpeg',
  },
  {
    quote:
      'I am extremely grateful to Shine Consultant for their outstanding support in helping me secure admission to Macquarie University for my Master\'s in Information Systems and Management. From university selection to visa processing, they handled everything.',
    name: 'Dolwin Menezes',
    designation: 'MSc, Macquarie University, Australia',
    src: '/Reviews/WhatsApp Image 2026-11-18 at 2.15.27 PM.jpeg',
  },
  {
    quote:
      'Had a really great experience with Shine Consultant. They helped me sort out my entire UK university application and visa process in just 2 months. The team was extremely supportive, responsive, and professional throughout.',
    name: 'Krishnasagar Thakkar',
    designation: 'University Admit — UK',
    src: '/Reviews/WhatsApp Image 2026-11-18 at 2.15.31 PM.jpeg',
  },
  {
    quote:
      'All the staff members are very cooperative and friendly. They guided me with ease during my entire process. I would recommend Shine Consultant to all the students looking for Higher Studies and a better prospect for future.',
    name: 'Madan Panth',
    designation: 'Study Abroad Student',
    src: '/Reviews/WhatsApp Image 2026-11-18 at 2.15.32 PM.jpeg',
  },
];

export default function TestimonialsCarousel() {
  return (
    <div className="flex items-center justify-center">
      <CircularTestimonials
        testimonials={TESTIMONIALS}
        autoplay={true}
        colors={{
          name: '#0C1B44',
          designation: '#6b7280',
          testimony: '#374151',
          arrowBackground: '#0C1B44',
          arrowForeground: '#f1f1f7',
          arrowHoverBackground: '#D00100',
        }}
        fontSizes={{
          name: '24px',
          designation: '16px',
          quote: '18px',
        }}
      />
    </div>
  );
}

