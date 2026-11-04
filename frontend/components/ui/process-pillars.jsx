'use client';

import { LazyMotion, m, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * A rising staircase of pillars, one per step, with the step's real title
 * and description beneath it.
 *
 * Adapted from the supplied `process-pillars`. The ascending-height
 * metaphor is kept — it reads as advancement, which is right for a
 * seven-stage journey. Almost everything else had to change:
 *
 * **The pillars are driven by data.** The original hardcoded five bars
 * labelled "Step 1" … "Step 5". This process has seven stages, each with a
 * title and a description that staff edit, so a fixed five-bar component
 * could not show the content at all. Heights are now computed from the
 * step's position in whatever list it is given.
 *
 * **`h-30` is not a Tailwind class.** There is no 30 in the default scale
 * or in this project's, so the container it was on had no height — and the
 * whole effect depended on that height. Tailwind drops an unknown utility
 * silently, so nothing warned.
 *
 * **The original staircase did not ascend.** Heights were 48 / 96 / 192 /
 * 384 / `h-full`. The fourth bar was the tallest, and the fifth resolved
 * `h-full` against an auto-height parent and collapsed to nothing. The
 * sequence peaked at four and lost five.
 *
 * **Height is animated, not `scaleY`.** The label sat inside the element
 * being scaled from 0 to 1 on the Y axis, so it was squashed flat and
 * stretched into place for the whole transition. Each bar now sits in a
 * fixed-height track and animates its own height, so nothing is distorted
 * and no sibling moves.
 */
const loadDomAnimation = () => import('framer-motion').then((mod) => mod.domAnimation);

const MIN_HEIGHT = 56;
const MAX_HEIGHT = 208;

/** Snapped to the 4px grid so the ramp lands on the layout rhythm. */
function pillarHeight(index, count) {
  if (count <= 1) return MAX_HEIGHT;
  const raw = MIN_HEIGHT + ((MAX_HEIGHT - MIN_HEIGHT) * index) / (count - 1);
  return Math.round(raw / 4) * 4;
}

/**
 * The row fits its container rather than scrolling.
 *
 * It previously set a 168px minimum per column with `overflow-x-auto`.
 * Seven columns plus six 24px gaps needs 1320px, and the content width at a
 * 1280px viewport is 1216px — so the row overflowed and the last stage was
 * clipped mid-pillar. `no-scrollbar` then hid the scrollbar, which removed
 * the one cue that there was anything more to see, so a cut-off pillar read
 * as a broken layout rather than as a scrollable row.
 *
 * Dropping the minimum lets `flex-1 basis-0` divide the space exactly:
 * seven columns of about 160px at 1280px and above. Nothing is clipped, and
 * adding stages in the admin panel narrows the columns rather than pushing
 * one off the edge.
 */
export function ProcessPillars({ steps = [], className }) {
  const prefersReducedMotion = useReducedMotion();

  if (steps.length === 0) return null;

  const count = steps.length;

  return (
    <LazyMotion features={loadDomAnimation} strict>
      <ol className={cn('flex items-stretch gap-4', className)}>
        {steps.map((step, index) => {
          const height = pillarHeight(index, count);
          const isLast = index === count - 1;
          const number = step.order ?? index + 1;

          return (
            <li key={step.order ?? index} className="flex min-w-0 flex-1 basis-0 flex-col">
              {/* Fixed-height track. The bar grows inside it, so animating
                  the bar cannot shift the row or the text below. */}
              <div className="flex items-end" style={{ height: `${MAX_HEIGHT}px` }}>
                <m.div
                  className={cn(
                    'relative w-full overflow-hidden rounded-t-lg',
                    // The final pillar is the accent: this step is the
                    // point of the whole sequence, so it reads as arrival.
                    // Two accented elements per section is the cap, and
                    // this is the only one here.
                    isLast
                      ? 'bg-accent'
                      : 'bg-gradient-to-t from-navy-900 via-navy to-navy-700',
                  )}
                  initial={prefersReducedMotion ? false : { height: 0 }}
                  whileInView={{ height: `${height}px` }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.7,
                    // Staggered off the index rather than a hardcoded
                    // per-item delay, so any number of steps cascades.
                    delay: Math.min(index * 0.09, 0.8),
                    ease: [0.2, 0.6, 0.2, 1],
                  }}
                  style={prefersReducedMotion ? { height: `${height}px` } : undefined}
                >
                  <span
                    className="absolute inset-x-0 top-0 pt-3 text-center font-heading text-caption font-bold text-white"
                    aria-hidden="true"
                  >
                    {number}
                  </span>
                </m.div>
              </div>

              {/* `break-words` so a long single word wraps instead of
                  widening the column past its share and reintroducing the
                  overflow this layout exists to avoid. */}
              <h3 className="mt-5 break-words font-heading text-caption font-semibold leading-snug text-navy xl:text-body">
                {/* The number is decorative inside the bar, so it is spoken
                    once here instead. */}
                <span className="sr-only">Step {number}: </span>
                {step.title}
              </h3>

              {step.description ? (
                <p className="mt-2 break-words text-micro leading-relaxed text-charcoal-70 xl:text-caption">
                  {step.description}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </LazyMotion>
  );
}

export default ProcessPillars;
