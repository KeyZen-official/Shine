import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import {
  getContact,
  getContentCounts,
  getDestinationOptions,
  getServiceOptions,
  getSettings,
} from '../../../lib/content';
import { buildMetadata, organizationJsonLd } from '../../../lib/seo';
import { JsonLd } from '../../../components/seo/JsonLd';
import { EnquiryForm } from '../../../components/forms/EnquiryForm';
import { ContactCard } from '../../../components/ui/contact-card';
import { EditorialHero } from '../../../components/sections/EditorialHero';
import { formatBusinessHours, whatsappHref } from '../../../lib/format';
import { Button } from '../../../components/ui/Button';

export const metadata = buildMetadata({
  title: 'Contact Shine Consultant',
  description:
    'Reach our counsellors by phone, email or walk in to our Borivali West office. Send an enquiry and we will respond within one working day.',
  path: '/contact',
});

export default function ContactPage() {
  const settings = getSettings();
  const primary = getContact();
  const counts = getContentCounts();

  const address = primary.officeAddress;
  const phone = primary.phone;
  const alternatePhone = primary.alternatePhone;
  const email = primary.email;
  const whatsapp = primary.whatsappNumber;
  const mapEmbedUrl = primary.mapEmbedUrl;
  const hours = formatBusinessHours(primary.businessHours ?? []);

  const destinations = getDestinationOptions();
  const services = getServiceOptions();

  /* Build pre-rendered contact info tiles for the ContactCard slot. */
  const contactInfoSlot = (
    <>
      {address && (
        <div className="flex items-start gap-3 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <MapPin className="h-5 w-5 stroke-[2]" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="font-heading text-xs font-bold uppercase tracking-wider text-navy">Office</p>
            <p className="mt-0.5 text-xs text-charcoal/75 break-words leading-relaxed">
              {address.replace(/\n/g, ', ')}
            </p>
          </div>
        </div>
      )}
      {phone && (
        <div className="flex items-start gap-3 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Phone className="h-5 w-5 stroke-[2]" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="font-heading text-xs font-bold uppercase tracking-wider text-navy">Mobile</p>
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="mt-0.5 text-xs text-charcoal/75 hover:text-accent transition-colors leading-relaxed">
              {phone}
            </a>
          </div>
        </div>
      )}
      {alternatePhone && (
        <div className="flex items-start gap-3 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
            <Phone className="h-5 w-5 stroke-[2]" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="font-heading text-xs font-bold uppercase tracking-wider text-navy">Landline</p>
            <p className="mt-0.5 text-xs text-charcoal/75 leading-relaxed">{alternatePhone}</p>
          </div>
        </div>
      )}
      {email && (
        <div className="flex items-start gap-3 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Mail className="h-5 w-5 stroke-[2]" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="font-heading text-xs font-bold uppercase tracking-wider text-navy">Email</p>
            <a href={`mailto:${email}`} className="mt-0.5 text-xs text-charcoal/75 hover:text-accent transition-colors break-all leading-relaxed">
              {email}
            </a>
          </div>
        </div>
      )}
      {whatsappHref(whatsapp, primary.whatsappMessage) && (
        <div className="flex items-start gap-3 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <MessageCircle className="h-5 w-5 stroke-[2]" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="font-heading text-xs font-bold uppercase tracking-wider text-navy">WhatsApp</p>
            <a href={whatsappHref(whatsapp, primary.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="mt-0.5 text-xs text-charcoal/75 hover:text-accent transition-colors leading-relaxed">
              Message a counsellor
            </a>
          </div>
        </div>
      )}
      {hours.length > 0 && (
        <div className="flex items-start gap-3 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
            <Clock className="h-5 w-5 stroke-[2]" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="font-heading text-xs font-bold uppercase tracking-wider text-navy">Hours</p>
            <p className="mt-0.5 text-xs text-charcoal/75 leading-relaxed">
              {hours.map((h) => `${h.day}: ${h.value}`).join(' · ')}
            </p>
          </div>
        </div>
      )}
    </>
  );

  const plural = (count, one, many) => (count === 1 ? one : many);

  const stats = [
    counts.destinations > 0
      ? {
        value: counts.destinations,
        label: plural(counts.destinations, 'study destination', 'study destinations'),
        srLabel: 'Study destinations',
      }
      : null,
    counts.services > 0
      ? {
        value: counts.services,
        label: plural(counts.services, 'advisory service', 'advisory services'),
        srLabel: 'Advisory services',
      }
      : null,
    counts.testPreparation > 0
      ? {
        value: counts.testPreparation,
        label: plural(counts.testPreparation, 'coaching programme', 'coaching programmes'),
        srLabel: 'Coaching programmes',
        featureLabel: plural(counts.testPreparation, 'programme', 'programmes'),
      }
      : null,
  ].filter(Boolean);

  const heroContent = {
    eyebrow: 'GET IN TOUCH — SHINE CONSULTANT',
    headline: 'Contact Shine Consultant. We Are Here to Help.',
    supportingLine:
      'Whether you are just beginning to explore your options or you have a specific destination in mind, our counsellors are here for a direct, honest conversation. Send an enquiry and we will respond during our next working session.',
    primaryCtaLabel: 'Book Free Consultation',
    primaryCtaHref: '/book-consultation',
    secondaryCtaLabel: 'Send an Enquiry',
    secondaryCtaHref: '#contact-form',
  };

  const heroImage = {
    fallbackUrl: '/imagery/counsellor-consultation.jpg',
    alt: 'Shine Consultant counsellor in a consultation session with an international student',
    width: 2560,
    height: 1024,
    variants: {
      w360: '/imagery/counsellor-consultation.jpg',
      w768: '/imagery/counsellor-consultation.jpg',
      w1024: '/imagery/counsellor-consultation.jpg',
      w1920: '/imagery/counsellor-consultation.jpg',
    },
  };

  const socialLinks = (settings?.socialLinks ?? [])
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  return (
    <>
      <JsonLd data={organizationJsonLd(settings, primary)} />

      {/* ── 1. Hero — Signature EditorialHero matching the Home page ───── */}
      <EditorialHero
        content={heroContent}
        stats={stats}
        socialLinks={socialLinks}
        image={heroImage}
      />

      {/* ── 2. ContactCard: Info + Enquiry Form ──────────────────────────── */}
      <section id="contact-form" className="section-y bg-[#FAF9F5]">
        <div className="shell">
          <ContactCard
            title="Send Us an Enquiry"
            description="Tell us about your academic background, what you are considering and your preferred destination. The more context you share, the more useful our first reply will be. We respond within one working day."
            contactInfoSlot={contactInfoSlot}
          >
            <EnquiryForm
              source="contact_page"
              compact
              title=""
              description=""
              countries={destinations}
              services={services}
            />
          </ContactCard>
        </div>
      </section>

      {/* ── 5. Office Details & Book Consultation ───────────────────────── */}
      <section className="section-y bg-white border-t border-navy/10">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Office Info */}
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-accent">
                  FIND US
                </span>
                <span className="h-[2px] w-8 rounded-full bg-accent inline-block" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight mb-6">
                Visit Our Office
              </h2>
              <p className="text-sm text-charcoal/80 leading-relaxed mb-8 max-w-lg">
                Our counsellors are available in person at our Borivali West headquarters. Walk-in
                appointments are welcome during business hours; for a guaranteed session, please
                book a free consultation in advance.
              </p>

              <dl className="space-y-6">
                {address && (
                  <div className="flex gap-4">
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF5F1] text-accent">
                      <MapPin className="h-5 w-5 stroke-[2]" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="font-heading text-xs font-bold uppercase tracking-[0.1em] text-navy mb-1">
                        {primary?.label ?? 'Office'}
                      </dt>
                      <dd className="text-sm text-charcoal/80 whitespace-pre-line leading-relaxed">
                        {address}
                      </dd>
                    </div>
                  </div>
                )}

                {(phone || alternatePhone) && (
                  <div className="flex gap-4">
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF5F1] text-accent">
                      <Phone className="h-5 w-5 stroke-[2]" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="font-heading text-xs font-bold uppercase tracking-[0.1em] text-navy mb-1">
                        Phone
                      </dt>
                      {phone && (
                        <dd>
                          <a
                            href={`tel:${phone.replace(/\s/g, '')}`}
                            className="text-sm font-semibold text-navy underline underline-offset-2 hover:text-accent transition-colors"
                          >
                            {phone}
                          </a>
                        </dd>
                      )}
                      {alternatePhone && (
                        <dd className="mt-1 text-sm text-charcoal/70">
                          <span className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                            Landline:{' '}
                          </span>
                          {alternatePhone}
                        </dd>
                      )}
                    </div>
                  </div>
                )}

                {email && (
                  <div className="flex gap-4">
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF5F1] text-accent">
                      <Mail className="h-5 w-5 stroke-[2]" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="font-heading text-xs font-bold uppercase tracking-[0.1em] text-navy mb-1">
                        Email
                      </dt>
                      <dd>
                        <a
                          href={`mailto:${email}`}
                          className="break-all text-sm font-semibold text-navy underline underline-offset-2 hover:text-accent transition-colors"
                        >
                          {email}
                        </a>
                      </dd>
                    </div>
                  </div>
                )}

                {whatsappHref(whatsapp, primary.whatsappMessage) && (
                  <div className="flex gap-4">
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF5F1] text-accent">
                      <MessageCircle className="h-5 w-5 stroke-[2]" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="font-heading text-xs font-bold uppercase tracking-[0.1em] text-navy mb-1">
                        WhatsApp
                      </dt>
                      <dd>
                        <a
                          href={whatsappHref(whatsapp, primary.whatsappMessage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-navy underline underline-offset-2 hover:text-accent transition-colors"
                        >
                          Message a counsellor directly
                        </a>
                      </dd>
                    </div>
                  </div>
                )}

                {hours.length > 0 && (
                  <div className="flex gap-4">
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF5F1] text-accent">
                      <Clock className="h-5 w-5 stroke-[2]" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <dt className="font-heading text-xs font-bold uppercase tracking-[0.1em] text-navy mb-2">
                        Business Hours
                      </dt>
                      <dd>
                        <ul className="divide-y divide-navy/10 rounded-xl border border-navy/10 bg-[#FAF9F5] overflow-hidden">
                          {hours.map((entry) => (
                            <li
                              key={entry.day}
                              className="flex items-center justify-between gap-4 px-4 py-2.5 text-xs"
                            >
                              <span className="text-charcoal/70">{entry.day}</span>
                              <span className="font-heading font-semibold text-navy">
                                {entry.value}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </div>
                )}
              </dl>
            </div>

            {/* Book Consultation Prompt */}
            <div className="rounded-3xl border border-navy/10 bg-navy on-navy p-8 sm:p-10 relative overflow-hidden">
              {/* Background dots */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />
              <span
                aria-hidden="true"
                className="absolute top-0 inset-x-0 h-1 bg-accent rounded-t-3xl"
              />

              <div className="relative">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-heading font-bold mb-6">
                  FREE CONSULTATION
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
                  Prefer to Talk It Through in Person?
                </h3>

                <p className="text-sm text-white/75 leading-relaxed mb-6 max-w-md">
                  Book a thirty-minute session at our Borivali West office or over a call. Bring
                  your transcripts, your questions and nothing else — we handle the rest.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    'Detailed academic profile review',
                    'Country and university shortlist',
                    'Test score requirements explained',
                    'Visa pathway overview',
                    'Realistic timeline for your intake',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    href="/book-consultation"
                    variant="primary"
                    size="lg"
                    className="font-heading font-bold"
                  >
                    Book Free Consultation
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button
                    href="/services"
                    variant="inverse"
                    size="lg"
                    className="font-heading font-bold"
                  >
                    View Our Services
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Map ──────────────────────────────────────────────────────── */}
      {mapEmbedUrl ? (
        <section aria-labelledby="map-heading" className="bg-[#FAF9F5] border-t border-navy/10">
          <div className="shell py-14 lg:py-20">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 id="map-heading" className="text-2xl font-extrabold text-navy">
                Find Us on the Map
              </h2>
              {address && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-heading text-xs font-bold text-accent hover:underline"
                >
                  Open in Google Maps
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
            <div className="overflow-hidden rounded-2xl border border-navy/10 shadow-card">
              <iframe
                src={mapEmbedUrl}
                title={`Map showing the Shine Consultant office at ${address ?? 'our location'}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-80 w-full border-0 lg:h-[460px]"
              />
            </div>
          </div>
        </section>
      ) : null}

    </>
  );
}
