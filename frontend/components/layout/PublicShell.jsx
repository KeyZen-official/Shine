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
      {/* First focusable element in the document. Hidden until keyboard
          focus, then pinned top-left so it cannot sit on top of content. */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-50 inline-flex h-11 items-center rounded-md bg-navy px-5 font-heading text-caption font-semibold text-white -translate-y-20 opacity-0 focus-visible:translate-y-0 focus-visible:opacity-100 transition-all duration-fast pointer-events-none focus-visible:pointer-events-auto"
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
