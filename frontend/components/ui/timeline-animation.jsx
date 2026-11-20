'use client';

import { LazyMotion, m, useInView, useReducedMotion } from 'framer-motion';

/**
 * framer-motion's full `motion` component carries its animation features
 * eagerly, which costs roughly 25 KB compressed on first load. `m` carries
 * none, and `LazyMotion` fetches the DOM feature bundle in a separate chunk
 * after hydration.
 *
 * `strict` makes this enforceable rather than aspirational: it throws if a
 * `motion.*` component is rendered inside, so a future import cannot
 * quietly undo the saving.
 */
const loadDomAnimation = () => import('framer-motion').then((mod) => mod.domAnimation);

export function MotionFeatures({ children }) {
  return (
    <LazyMotion features={loadDomAnimation} strict>
      {children}
    </LazyMotion>
  );
}

/**
 * Scroll-triggered staggered reveal.
 *
 * This file was not supplied with the component that imports it, so it is
 * written to the interface that component uses:
 *
 *   as             the element to render ('div' | 'span' | 'a' | 'figure' | …)
 *   animationNum   passed to framer-motion as `custom`, so the variant can
 *                  derive its own delay from its position
 *   timelineRef    a ref to the *section*, not to this element — every child
 *                  animates off one shared in-view trigger, which is what
 *                  makes the stagger read as one sequence instead of each
 *                  piece firing as it scrolls past
 *   customVariants the variants object, whose `visible` is a function of
 *                  `animationNum`
 *
 * Under `prefers-reduced-motion` nothing is animated at all: the element
 * renders as a plain tag in its final state. framer-motion drives
 * transforms in JavaScript, so the blanket CSS override in globals.css does
 * not reach it — this has to be handled here or the preference is ignored.
 */
export function TimelineContent({
  as = 'div',
  animationNum = 0,
  timelineRef,
  customVariants,
  once = true,
  amount = 0.1,
  className,
  children,
  ...rest
}) {
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(timelineRef, { once, amount });

  if (prefersReducedMotion) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const MotionTag = m[as] ?? m.div;

  return (
    <MotionTag
      custom={animationNum}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={customVariants}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * The two variant sets the hero uses, kept here so the delay rhythm lives
 * in one place rather than being redeclared per section.
 *
 * `step` is 0.08s, not the 0.4s the original used: at 0.4s the sixteenth
 * element appears six seconds after the section enters view, by which point
 * a visitor has scrolled past it.
 */
export function buildRevealVariants({ step = 0.08, duration = 0.5, distance = 20 } = {}) {
  return {
    hidden: { filter: 'blur(10px)', y: -distance, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { delay: i * step, duration },
    }),
  };
}

export function buildFadeVariants({ step = 0.08, duration = 0.5 } = {}) {
  return {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      filter: 'blur(0px)',
      transition: { delay: i * step, duration },
    }),
  };
}
