'use client';

import { useId, useState } from 'react';
import { Minus, Plus } from 'lucide-react';

/**
 * Native buttons with aria-expanded and aria-controls, so the whole thing
 * is operable from the keyboard without any key handling of our own.
 *
 * `single` (the FAQ behaviour) keeps one panel open at a time; the filter
 * and footer groups open independently.
 */
export function Accordion({ items = [], single = true, defaultOpen = [], variant = 'faq' }) {
  const baseId = useId();
  const [open, setOpen] = useState(() => new Set(defaultOpen));

  if (items.length === 0) return null;

  const toggle = (index) => {
    setOpen((current) => {
      const next = new Set(single ? [] : current);
      if (current.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const styles = {
    faq: {
      wrapper: 'divide-y divide-navy/10 overflow-hidden rounded-xl border border-navy/10 bg-white',
      trigger: 'px-6 py-5 text-left',
      title: 'text-h3 font-semibold text-navy',
      panel: 'px-6 pb-6',
    },
    plain: {
      wrapper: 'divide-y divide-navy/10',
      trigger: 'py-4 text-left',
      title: 'font-heading text-body font-semibold text-navy',
      panel: 'pb-4',
    },
  }[variant] ?? {};

  return (
    <div className={styles.wrapper}>
      {items.map((item, index) => {
        const isOpen = open.has(index);
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.id ?? item.question ?? index}>
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className={`flex w-full touch-target items-start justify-between gap-4 transition-colors duration-fast ease-standard hover:bg-sage/40 ${styles.trigger}`}
              >
                <span className={styles.title}>{item.question ?? item.title}</span>
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-navy/15 text-navy"
                  aria-hidden="true"
                >
                  {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={styles.panel}
            >
              <div className="max-w-prose whitespace-pre-line text-body text-charcoal-70">
                {item.answer ?? item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
