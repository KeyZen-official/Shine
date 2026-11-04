'use client';

import { MessageCircle } from 'lucide-react';
import { whatsappHref } from '../../lib/format';

/**
 * Fixed bottom-right. Sits above the iOS home indicator via
 * env(safe-area-inset-bottom) and keeps a 24px keep-out margin, which page
 * sections respect by padding their final CTA — so the dock never covers a
 * primary button at any width between 360 and 1920.
 */
export function WhatsAppDock({ number, message }) {
  const href = whatsappHref(
    number,
    message ?? 'Hello Shine Consultant, I would like guidance on studying abroad.',
  );

  // No configured number means no dock, rather than a button that goes
  // nowhere.
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed right-4 z-30 inline-flex items-center gap-3 rounded-full bg-navy py-3 pl-3 pr-4 text-white shadow-card-hover transition-all duration-base ease-standard hover:bg-navy-900 sm:right-6"
      style={{ bottom: 'max(16px, env(safe-area-inset-bottom, 16px))' }}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/12">
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="hidden font-heading text-caption font-semibold sm:inline">
        Chat with a counsellor
      </span>
      <span className="sr-only sm:hidden">Chat with a counsellor on WhatsApp</span>
    </a>
  );
}
