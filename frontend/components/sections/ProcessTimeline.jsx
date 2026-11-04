import { ProcessPillars } from '../ui/process-pillars';

/**
 * The student journey.
 *
 * Ascending pillars at 1024px and above, a vertical sequence below. Not a
 * shrunken desktop timeline: seven steps across a 390px screen is
 * unreadable at any font size, so the mobile version is a genuine vertical
 * list with the connector on the left.
 *
 * Both branches render every step's title and description. The pillars are
 * a visual treatment of the same content, not a replacement for it.
 */
export function ProcessTimeline({ steps = [] }) {
  if (steps.length === 0) return null;

  const ordered = steps.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <>
      {/* Vertical — below 1280px */}
      <ol className="relative space-y-8 xl:hidden">
        <span
          className="absolute bottom-4 left-[19px] top-4 w-0.5 bg-sage-dark"
          aria-hidden="true"
        />
        {ordered.map((step, index) => (
          <li key={step.order ?? index} className="relative flex gap-5">
            <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-sage-dark bg-ivory font-heading text-caption font-bold text-navy">
              {step.order ?? index + 1}
            </span>
            <div className="pt-1.5">
              <h3 className="font-heading text-body font-semibold text-navy">{step.title}</h3>
              {step.description ? (
                <p className="mt-2 max-w-prose text-caption text-charcoal-70">{step.description}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      {/* Ascending pillars — 1280px and above only.
      
          Seven columns need roughly 160px each to hold a title like
          "Course & University Selection" in three lines. That is available
          from 1280px up; between 1024px and 1279px each column would be
          about 125px and the titles would run to four or five lines. The
          vertical sequence reads better there, and shows the same content
          with room to breathe. */}
      <div className="hidden xl:block">
        <ProcessPillars steps={ordered} />
      </div>
    </>
  );
}

/** Vertical numbered stepper for service detail pages. */
export function ProcessStepper({ steps = [] }) {
  if (steps.length === 0) return null;

  return (
    <ol className="space-y-6">
      {steps
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((step, index) => (
          <li
            key={step.order ?? index}
            className="flex gap-5 rounded-lg border border-navy/10 bg-white p-6"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-navy font-heading text-caption font-bold text-white">
              {step.order ?? index + 1}
            </span>
            <div>
              <h3 className="font-heading text-body font-semibold text-navy">{step.title}</h3>
              {step.description ? (
                <p className="mt-2 max-w-prose text-caption text-charcoal-70">{step.description}</p>
              ) : null}
            </div>
          </li>
        ))}
    </ol>
  );
}
