'use client';

import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

/**
 * ContactCard
 *
 * Layout primitive for the contact page.
 *
 * Props:
 *   title              — heading text
 *   description        — supporting text
 *   contactInfoSlot    — pre-rendered server JSX for the info tiles grid
 *                        (kept separate so icon components don't cross the
 *                         server→client boundary as function props)
 *   className          — extra wrapper classes
 *   formSectionClassName — extra right-panel classes
 *   children           — the form (EnquiryForm or similar)
 */
export function ContactCard({
  title = 'Contact With Us',
  description = 'If you have any questions, fill out the form here. We respond within one working day.',
  contactInfoSlot,
  className,
  formSectionClassName,
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        'relative grid w-full border border-navy/15 bg-white shadow-xl',
        'rounded-3xl overflow-hidden',
        'md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
      {...props}
    >
      {/* Corner plus marks */}
      <Plus aria-hidden="true" className="absolute -top-3 -left-3 h-6 w-6 text-accent stroke-[3]" />
      <Plus aria-hidden="true" className="absolute -top-3 -right-3 h-6 w-6 text-accent stroke-[3]" />
      <Plus aria-hidden="true" className="absolute -bottom-3 -left-3 h-6 w-6 text-accent stroke-[3]" />
      <Plus aria-hidden="true" className="absolute -bottom-3 -right-3 h-6 w-6 text-accent stroke-[3]" />

      {/* Left / Info panel */}
      <div className="flex flex-col justify-between lg:col-span-2">
        <div className="relative h-full space-y-6 px-6 py-10 md:p-10">
          <h2 className="text-3xl font-extrabold text-navy md:text-4xl lg:text-5xl leading-tight tracking-tight">
            {title}
          </h2>
          <p className="max-w-xl text-sm text-charcoal/80 leading-relaxed md:text-base">
            {description}
          </p>
          {contactInfoSlot ? (
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 pt-2">
              {contactInfoSlot}
            </div>
          ) : null}
        </div>
      </div>

      {/* Right / Form panel */}
      <div
        className={cn(
          'flex h-full w-full items-start border-t border-navy/10 bg-[#EAF5F1] p-6',
          'md:border-t-0 md:border-l md:col-span-1 md:p-8',
          formSectionClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
