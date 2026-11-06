'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
  Navbar,
  NavbarButton,
  NavbarLogo,
  useNavbarState,
} from '../ui/resizable-navbar';
import { PRIMARY_NAV } from '../../lib/config';

const MOBILE_MENU_ID = 'primary-mobile-navigation';

/**
 * The secondary call to action shows only while the bar is at full width.
 *
 * A media query cannot express this: the bar's width is driven by its own
 * scroll state, not the viewport, so at a 1440px viewport an `xl:` rule
 * would keep showing the second button inside a bar that had contracted to
 * 1152px — which is precisely what pushed "Contact" underneath "Explore
 * Courses". Reading the contraction state is the only correct test.
 */
/**
 * The secondary call to action shows only while the bar is at full width.
 *
 * A media query cannot express this: the bar's width is driven by its own
 * scroll state, not the viewport, so at a 1440px viewport an `xl:` rule
 * would keep showing the second button inside a bar that had contracted to
 * 1152px — which is precisely what pushed "Contact" underneath "Explore
 * Courses". Reading the contraction state is the only correct test.
 */
function TopContactBar() {
  const { visible } = useNavbarState();
  if (visible) return null;

  return (
    <div className="hidden border-b border-navy/10 bg-[#FAF8F5] py-2 text-caption text-charcoal-70 xl:block">
      <div className="shell flex items-center justify-between">
        <div className="flex items-center gap-2 text-micro">
          <span className="font-bold text-navy">Shine Consultant</span>
          <span className="text-navy/30">•</span>
          <span>Overseas Education, Migration & Training — Borivali West, Mumbai</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="tel:+919137044882"
            className="inline-flex items-center gap-2 font-heading text-caption font-semibold text-navy transition-colors hover:text-accent"
          >
            <Phone className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span>+91 91370 44882</span>
          </a>
          <a
            href="mailto:enquiry@shineconsultant.co.in"
            className="inline-flex items-center gap-2 font-heading text-caption font-semibold text-navy transition-colors hover:text-accent"
          >
            <Mail className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span>enquiry@shineconsultant.co.in</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function NavbarActions() {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <NavbarButton href="/book-consultation" variant="primary">
        Book Free Consultation
      </NavbarButton>
    </div>
  );
}

/** A nav item owns its own path and every path nested beneath it. */
function isActivePath(pathname, href) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * The site's primary navigation, composed from the resizable-navbar
 * primitives in components/ui.
 *
 * The dropdown contents are not hardcoded: they come from the published
 * destinations and services the shell loaded. A destination that has not
 * been published simply never appears in the menu, and a category with
 * nothing published drops its chevron rather than opening an empty panel.
 */
export function NavigationBar({ destinations = [], services = [], testPreparation = [] }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);

  // Close on navigation, or the panel hangs over the new page.
  useEffect(() => {
    setMobileOpen(false);
    setExpandedGroup(null);
  }, [pathname]);

  const dropdownFor = (source) => {
    if (source === 'destinations') {
      return destinations.map((item) => ({ label: item.name, href: `/destinations/${item.slug}` }));
    }
    if (source === 'services') {
      return services.map((item) => ({ label: item.name, href: `/services/${item.slug}` }));
    }
    if (source === 'testPreparation') {
      return testPreparation.map((item) => ({
        label: item.name,
        href: `/test-preparation/${item.slug}`,
      }));
    }
    return [];
  };

  const items = PRIMARY_NAV.map((item) => ({
    name: item.label,
    // The bar renders `short`; the mobile menu and the dropdown trigger's
    // accessible name use the full label.
    short: item.short ?? item.label,
    href: item.href,
    dropdown: item.dropdownSource ? dropdownFor(item.dropdownSource) : [],
    // dropdownOnly: clicking the label opens the dropdown instead of navigating.
    dropdownOnly: item.dropdownOnly ?? false,
  }));

  return (
    <Navbar threshold={80}>
      <TopContactBar />

      {/* Desktop */}
      <NavBody>
        <NavbarLogo />

        <nav aria-label="Primary" className="flex min-w-0 flex-1 justify-center px-2">
          <NavItems items={items} isActive={(href) => isActivePath(pathname, href)} />
        </nav>

        <NavbarActions />
      </NavBody>

      {/* Below 1024px */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={mobileOpen}
            controls={MOBILE_MENU_ID}
            onClick={() => setMobileOpen((open) => !open)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          id={MOBILE_MENU_ID}
          isOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        >
          <nav aria-label="Mobile" className="w-full">
            <ul className="w-full">
              {items.map((item) => {
                const active = isActivePath(pathname, item.href);
                const expanded = expandedGroup === item.href;

                return (
                  <li key={item.href} className="border-b border-navy/10 last:border-0">
                    <div className="flex items-center justify-between gap-2">
                      {item.dropdownOnly ? (
                        // Category-only: clicking opens/closes the submenu, never navigates.
                        <button
                          type="button"
                          aria-expanded={expanded}
                          aria-label={`${item.name} submenu`}
                          onClick={() => setExpandedGroup(expanded ? null : item.href)}
                          className={`flex-1 touch-target py-3 text-left font-heading text-body font-semibold ${
                            active ? 'text-accent' : 'text-navy'
                          }`}
                        >
                          <span className="flex items-center justify-between">
                            {item.name}
                            <ChevronDown
                              aria-hidden="true"
                              className={`h-5 w-5 transition-transform duration-base ease-standard ${
                                expanded ? 'rotate-180' : ''
                              }`}
                            />
                          </span>
                        </button>
                      ) : (
                        <>
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            aria-current={active ? 'page' : undefined}
                            className={`flex-1 touch-target py-3 font-heading text-body font-semibold ${
                              active ? 'text-accent' : 'text-navy'
                            }`}
                          >
                            {item.name}
                          </Link>

                          {item.dropdown.length > 0 ? (
                            <button
                              type="button"
                              aria-expanded={expanded}
                              aria-label={`${item.name} submenu`}
                              onClick={() => setExpandedGroup(expanded ? null : item.href)}
                              className="inline-flex touch-target items-center justify-center rounded-md text-navy/50"
                            >
                              <ChevronDown
                                aria-hidden="true"
                                className={`h-5 w-5 transition-transform duration-base ease-standard ${
                                  expanded ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                          ) : null}
                        </>
                      )}
                    </div>

                    {item.dropdown.length > 0 && expanded ? (
                      <ul className="mb-3 space-y-0.5 border-l-2 border-sage-dark pl-4">
                        {item.dropdown.map((entry) => (
                          <li key={entry.href}>
                            <Link
                              href={entry.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2.5 text-caption text-charcoal-70"
                            >
                              {entry.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex w-full flex-col gap-3 border-t border-navy/10 pt-5">
            <div className="flex flex-col gap-2 pb-2">
              <a
                href="tel:+919137044882"
                className="inline-flex items-center gap-2 text-caption font-semibold text-navy"
              >
                <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                +91 91370 44882
              </a>
              <a
                href="mailto:enquiry@shineconsultant.co.in"
                className="inline-flex items-center gap-2 text-caption font-semibold text-navy"
              >
                <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
                enquiry@shineconsultant.co.in
              </a>
            </div>
            <NavbarButton
              href="/book-consultation"
              variant="primary"
              className="w-full"
              onClick={() => setMobileOpen(false)}
            >
              Book Free Consultation
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
