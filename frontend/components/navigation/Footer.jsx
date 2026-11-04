'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
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
import { FOOTER_QUICK_LINKS, LEGAL_LINKS } from '../../lib/config';
import { FINANCIAL_SERVICES_DISCLAIMER } from '../../shared/constants';
import { whatsappHref } from '../../lib/format';

const SOCIAL_ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
  x: MessageCircle,
  threads: MessageCircle,
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
    email: office.email,
    whatsapp: office.whatsappNumber,
  };

  const socialLinks = (settings?.socialLinks ?? [])
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy on-navy text-white">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
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
              <ul className="mt-6 flex items-center gap-2">
                {socialLinks.map((link) => {
                  const SocialIcon = SOCIAL_ICONS[link.platform] ?? MessageCircle;
                  return (
                    <li key={link.platform}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white/70 transition-colors duration-fast hover:border-white/50 hover:text-white"
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

          {services.length > 0 ? (
            <FooterGroup title="Our services">
              <ul>
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`} className={LINK}>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterGroup>
          ) : null}

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

          {contact.address || contact.phone || contact.email ? (
            <FooterGroup title="Get in touch">
              <ul className="space-y-3">
                {contact.address ? (
                  <li className="flex gap-3 text-caption text-white/70">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" aria-hidden="true" />
                    <span className="whitespace-pre-line">{contact.address}</span>
                  </li>
                ) : null}
                {contact.phone ? (
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/40" aria-hidden="true" />
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      className="text-caption text-white/70 transition-colors hover:text-white"
                    >
                      {contact.phone}
                    </a>
                  </li>
                ) : null}
                {contact.email ? (
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/40" aria-hidden="true" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="break-all text-caption text-white/70 transition-colors hover:text-white"
                    >
                      {contact.email}
                    </a>
                  </li>
                ) : null}
                {whatsappHref(contact.whatsapp, settings?.contact?.whatsappMessage) ? (
                  <li className="flex gap-3">
                    <MessageCircle
                      className="mt-0.5 h-4 w-4 shrink-0 text-white/40"
                      aria-hidden="true"
                    />
                    <a
                      href={whatsappHref(contact.whatsapp, settings?.contact?.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-caption text-white/70 transition-colors hover:text-white"
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
