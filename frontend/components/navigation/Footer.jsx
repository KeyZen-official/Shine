'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from 'lucide-react';
import { Brandmark } from '../brand/Brandmark';
import {
  FOOTER_ADDITIONAL_SERVICES,
  FOOTER_OUR_SERVICES,
  FOOTER_OVERSEAS_SERVICES,
  FOOTER_QUICK_LINKS,
  LEGAL_LINKS,
} from '../../lib/config';
import { FINANCIAL_SERVICES_DISCLAIMER } from '../../shared/constants';
import { whatsappHref } from '../../lib/format';
import { cn } from '../../lib/utils';

const SOCIAL_ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
  x: MessageCircle,
  threads: MessageCircle,
};

/* Brand colours for each social platform icon */
const SOCIAL_COLORS = {
  facebook: {
    bg: '#1877F2',
    text: '#ffffff',
    border: '#1877F2',
  },
  instagram: {
    bg: '#E4405F',
    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    text: '#ffffff',
    border: 'transparent',
  },
  linkedin: {
    bg: '#0A66C2',
    text: '#ffffff',
    border: '#0A66C2',
  },
  youtube: {
    bg: '#FF0000',
    text: '#ffffff',
    border: '#FF0000',
  },
};

/**
 * Footer link groups collapse below 768px. Each group is independently
 * expandable: a visitor looking for a phone number should not have to
 * close the destinations list first.
 */
function FooterGroup({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = `footer-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="border-b border-white/10 py-4 md:border-0 md:py-0">
      <h3 className="m-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((current) => !current)}
          className="flex w-full items-center justify-between gap-2 font-heading text-caption font-semibold uppercase tracking-[0.1em] text-white md:pointer-events-none md:cursor-default"
        >
          {title}
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-white/50 transition-transform duration-base ease-standard md:hidden ${
              open ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div id={id} className={`${open ? 'block' : 'hidden'} mt-4 md:mt-5 md:block`}>
        {children}
      </div>
    </div>
  );
}

const LINK = 'block py-1.5 text-caption text-white/70 transition-colors duration-fast hover:text-white';

/**
 * `contact` is now a single record read from `content/contact.json`.
 *
 * It used to be an `offices` array with one entry flagged primary, because
 * a consultancy might list several. There is one office. If a second opens,
 * `contact.json` grows a list and this reads the primary again — a smaller
 * change than maintaining a collection against the possibility.
 */
export function Footer({
  settings,
  contact: office = {},
  destinations = [],
  services = [],
  testPreparation = [],
}) {
  const contact = {
    address: office.officeAddress,
    phone: office.phone,
    mobileNumbers: ['7303890969', '9137044882'],
    officeNumbers: ['022-28928911', '022-28928922', '022-28928933'],
    email: office.email,
    whatsapp: office.whatsappNumber,
    mapEmbedUrl: office.mapEmbedUrl || 'https://maps.google.com/maps?q=Gold+Crest+Business+Center,+Lokmanya+Tilak+Road,+Borivali+West,+Mumbai+400092&t=&z=16&ie=UTF8&iwloc=&output=embed',
  };

  const socialLinks = (settings?.socialLinks ?? [])
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy on-navy text-white">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-16 lg:py-20">
        <div className="grid gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-4 xl:grid-cols-[1.25fr_0.75fr_0.85fr_0.85fr_1.05fr_0.75fr_0.75fr_1.35fr]">
          <div>
            {/* The footer has vertical room for the whole lockup, tagline
                included — unlike the navigation bar, which crops it. */}
            <Brandmark surface="navy" variant="full" imageClassName="h-24 w-auto" />
            {settings?.companyIntroduction ? (
              <p className="mt-5 max-w-measure text-caption leading-relaxed text-white/70">
                {settings.companyIntroduction}
              </p>
            ) : null}

            {socialLinks.length > 0 ? (
              <ul className="mt-6 flex items-center gap-2.5">
                {socialLinks.map((link) => {
                  const SocialIcon = SOCIAL_ICONS[link.platform] ?? MessageCircle;
                  const brandColor = SOCIAL_COLORS[link.platform];
                  return (
                    <li key={link.platform}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'inline-flex h-10 w-10 items-center justify-center rounded-md transition-transform duration-fast hover:scale-110 shadow-sm overflow-hidden',
                          !brandColor && 'border border-white/20 text-white/70 hover:border-white/50 hover:text-white',
                        )}
                        style={
                          brandColor
                            ? {
                                background: brandColor.background || brandColor.bg,
                                borderColor: brandColor.border || brandColor.bg,
                                color: brandColor.text,
                              }
                            : undefined
                        }
                      >
                        <SocialIcon className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">
                          Shine Consultant on {link.platform}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>

          <FooterGroup title="Quick links">
            <ul>
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterGroup>

          {/* Each group omits itself when it has no published records,
              rather than showing an empty heading. */}
          {destinations.length > 0 ? (
            <FooterGroup title="Study destinations">
              <ul>
                {destinations.map((destination) => (
                  <li key={destination.slug}>
                    <Link href={`/destinations/${destination.slug}`} className={LINK}>
                      {destination.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterGroup>
          ) : null}

          <FooterGroup title="Our services">
            <ul>
              {FOOTER_OUR_SERVICES.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className={LINK}>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterGroup>

          <FooterGroup title="Overseas Education Services">
            <ul>
              {FOOTER_OVERSEAS_SERVICES.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className={LINK}>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterGroup>

          <FooterGroup title="Additional services">
            <ul>
              {FOOTER_ADDITIONAL_SERVICES.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={LINK}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterGroup>

          {testPreparation.length > 0 ? (
            <FooterGroup title="Test preparation">
              <ul>
                {testPreparation.map((test) => (
                  <li key={test.slug}>
                    <Link href={`/test-preparation/${test.slug}`} className={LINK}>
                      {test.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterGroup>
          ) : null}

          {contact.address || contact.mobileNumbers || contact.officeNumbers || contact.email ? (
            <FooterGroup title="Get in touch" defaultOpen={true}>
              <ul className="space-y-3.5">
                {contact.address ? (
                  <li className="flex flex-col gap-2">
                    <div className="flex gap-2.5 text-caption text-white/75">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span className="whitespace-pre-line leading-relaxed">{contact.address}</span>
                    </div>

                    {/* Google Map embed for the office address */}
                    {contact.mapEmbedUrl ? (
                      <div className="mt-1 flex flex-col gap-1.5">
                        <div className="overflow-hidden rounded-xl border border-white/15 bg-[#0E1A29] shadow-inner w-full h-[140px]">
                          <iframe
                            title="Shine Consultant Borivali West Location Map"
                            src={contact.mapEmbedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full"
                          />
                        </div>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent('Gold Crest Business Center, 1113/14, Lokmanya Tilak Road, Borivali West, Mumbai 400092')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-heading text-micro font-semibold text-accent hover:underline"
                        >
                          <span>Open in Google Maps</span>
                          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                        </a>
                      </div>
                    ) : null}
                  </li>
                ) : null}

                {/* Mobile Numbers */}
                <li className="flex gap-2.5 items-start">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <div className="flex flex-col text-caption">
                    <span className="text-micro font-semibold uppercase tracking-wider text-white/50">Mobile No</span>
                    <span className="text-white/85">
                      <a href="tel:7303890969" className="transition-colors hover:text-white">
                        7303890969
                      </a>
                      {' / '}
                      <a href="tel:9137044882" className="transition-colors hover:text-white">
                        9137044882
                      </a>
                    </span>
                  </div>
                </li>

                {/* Office Numbers */}
                <li className="flex gap-2.5 items-start">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <div className="flex flex-col text-caption">
                    <span className="text-micro font-semibold uppercase tracking-wider text-white/50">Office No</span>
                    <span className="text-white/85">
                      <a href="tel:02228928911" className="transition-colors hover:text-white">
                        022-28928911
                      </a>
                      {' / '}
                      <a href="tel:02228928922" className="transition-colors hover:text-white">
                        22
                      </a>
                      {' / '}
                      <a href="tel:02228928933" className="transition-colors hover:text-white">
                        33
                      </a>
                    </span>
                  </div>
                </li>

                {/* Email */}
                {contact.email ? (
                  <li className="flex gap-2.5 items-start">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="whitespace-nowrap text-caption text-white/85 transition-colors hover:text-white"
                    >
                      {contact.email}
                    </a>
                  </li>
                ) : null}

                {/* WhatsApp */}
                {whatsappHref(contact.whatsapp, settings?.contact?.whatsappMessage) ? (
                  <li className="flex gap-2.5 items-center">
                    <MessageCircle
                      className="h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <a
                      href={whatsappHref(contact.whatsapp, settings?.contact?.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-caption text-white/85 transition-colors hover:text-white"
                    >
                      Chat on WhatsApp
                    </a>
                  </li>
                ) : null}
              </ul>
            </FooterGroup>
          ) : null}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="max-w-prose text-micro leading-relaxed text-white/45">
            {FINANCIAL_SERVICES_DISCLAIMER}
          </p>

          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-caption text-white/55">
              © {year} Shine Consultant. All rights reserved.
            </p>
            <nav aria-label="Legal">
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-caption text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
