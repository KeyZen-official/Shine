import { CalendarDays, MessageSquare, PhoneCall } from 'lucide-react';
import { getDestinationOptions } from '../../../lib/content';
import { buildMetadata } from '../../../lib/seo';
import { BookingForm } from '../../../components/forms/BookingForm';

export const metadata = buildMetadata({
  title: 'Book a Free Consultation',
  description:
    'Choose a date and time for a free consultation with a Shine Consultant counsellor. No obligation, no charge.',
  path: '/book-consultation',
});

const WHAT_HAPPENS_NEXT = [
  {
    icon: MessageSquare,
    title: 'We confirm the slot',
    body: 'A counsellor replies by email or phone. If the time you chose is taken, we offer the nearest alternatives.',
  },
  {
    icon: PhoneCall,
    title: 'Thirty minutes, on your terms',
    body: 'Bring your transcripts and any test scores. We will go through where you stand and what is realistic.',
  },
  {
    icon: CalendarDays,
    title: 'You leave with a shortlist',
    body: 'Written options with the reasoning behind each, including the ones we would advise against.',
  },
];

/**
 * Composition: a centred single-column form card with a short "what
 * happens next" aside. On success the card is replaced in place by a
 * confirmation that echoes the submitted date and time — no redirect, so
 * the back button does not resubmit.
 */
export default function BookConsultationPage() {
  /**
   * The select is built from the same published list the route handler
   * validates against, so a visitor cannot pick a destination the server
   * will then refuse.
   */
  const countries = getDestinationOptions();

  return (
    <section className="bg-sage">
      <div className="shell py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Free consultation</p>
          <h1 className="mt-4 text-h1 font-extrabold">Book your free consultation</h1>
          <p className="mt-5 text-lead text-charcoal-70">
            Pick a date and time that suits you. There is no charge and no obligation to continue.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-start lg:gap-12">
          <div className="rounded-xl border border-navy/10 bg-white p-6 shadow-card lg:p-10">
            <BookingForm countries={countries} />
          </div>

          <aside className="lg:sticky lg:top-24">
            <h2 className="font-heading text-caption font-bold uppercase tracking-[0.1em] text-navy">
              What happens next
            </h2>

            <ol className="mt-6 space-y-6">
              {WHAT_HAPPENS_NEXT.map((item, index) => (
                <li key={item.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-navy shadow-panel">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-heading text-body font-semibold text-navy">
                      <span className="sr-only">Step {index + 1}: </span>
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-caption text-charcoal-70">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-8 rounded-lg bg-white p-5 text-caption leading-relaxed text-charcoal-70">
              Prefer to write first? Send an{' '}
              <a href="/contact" className="font-semibold text-navy underline underline-offset-2">
                enquiry
              </a>{' '}
              instead and we will reply with available slots.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
