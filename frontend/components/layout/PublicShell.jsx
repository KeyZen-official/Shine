import { NavigationBar } from '../navigation/NavigationBar';
import { Footer } from '../navigation/Footer';
import { WhatsAppDock } from '../navigation/WhatsAppDock';
import {
  getContact,
  getDestinationOptions,
  getServiceOptions,
  getSettings,
  getTestPreparationOptions,
} from '../../lib/content';

/**
 * The chrome every public page shares: navigation dropdowns, footer groups
 * and contact details.
 *
 * This used to issue four API requests per render pass. It now reads the
 * content files directly, so the whole shell is resolved at build time with
 * no network involved. A destination that is marked `draft` still never
 * appears in the menu — the rule is the same, the source is different.
 */
export function PublicShell({ children }) {
  const destinations = getDestinationOptions();
  const services = getServiceOptions();
  const testPreparation = getTestPreparationOptions();
  const settings = getSettings();
  const contact = getContact();

  return (
    <>
      {/* First focusable element in the document. */}
      <a
        href="#main-content"
        className="sr-only z-50 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:inline-flex focus:h-11 focus:items-center focus:rounded-md focus:bg-navy focus:px-5 focus:font-heading focus:text-caption focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <NavigationBar
        destinations={destinations}
        services={services}
        testPreparation={testPreparation}
      />

      <main id="main-content">{children}</main>

      <Footer
        settings={settings}
        contact={contact}
        destinations={destinations}
        services={services}
        testPreparation={testPreparation}
      />

      {/* Omits itself when no number is configured, rather than offering a
          link that may not reach anyone. */}
      <WhatsAppDock number={contact.whatsappNumber} message={contact.whatsappMessage} />
    </>
  );
}
