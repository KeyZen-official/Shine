import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ArrowRight,
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

export const metadata = buildMetadata({
  title: 'Contact Shine Consultant',
  description:
    'Reach our counsellors by phone, email or walk in to our office. Send an enquiry and we will respond within one working day.',
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
            <p className="font-heading text-xs font-bold uppercase tracking-wider text-navy">Mobile / Direct</p>
            <div className="mt-0.5 text-xs text-charcoal/75 leading-relaxed">
              <a href="tel:9137044882" className="hover:text-accent transition-colors">+91 91370 44882</a>
              <span className="mx-1 text-charcoal/40">/</span>
              <a href="tel:7303890969" className="hover:text-accent transition-colors">+91 73038 90969</a>
            </div>
          </div>
        </div>
      )}
      {alternatePhone && (
        <div className="flex items-start gap-3 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
            <Phone className="h-5 w-5 stroke-[2]" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="font-heading text-xs font-bold uppercase tracking-wider text-navy">Landline Office</p>
            <p className="mt-0.5 text-xs text-charcoal/75 leading-relaxed">{alternatePhone}</p>
          </div>
        </div>
      )}
      {email && (
        <div className="flex items-start gap-3 py-3 col-span-full">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Mail className="h-5 w-5 stroke-[2]" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="font-heading text-xs font-bold uppercase tracking-wider text-navy">Email</p>
            <a href={`mailto:${email}`} className="mt-0.5 text-xs text-charcoal/75 hover:text-accent transition-colors whitespace-nowrap leading-relaxed">
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

  const stats = [
    {
      value: '10+',
      label: 'Destinations',
      srLabel: 'Study destinations',
    },
    {
      value: 6,
      label: 'Services',
      srLabel: 'Services',
    },
  ];

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

      {/* ── 3. Map ──────────────────────────────────────────────────────── */}
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
