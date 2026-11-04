'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Text that slides up out of a clipped line, character by character or word
 * by word.
 *
 * Ported from the supplied TypeScript source with four changes:
 *
 *  1. TypeScript removed — this project is JavaScript throughout.
 *  2. `text.split("\n")` for `splitBy="lines"`. The supplied source had a
 *     literal newline inside the string, which is a syntax error.
 *  3. `prefers-reduced-motion` renders the text plainly and immediately.
 *     framer-motion animates in JavaScript, so a CSS override cannot reach
 *     it.
 *  4. The visible text is no longer `aria-hidden` while an `sr-only` copy
 *     sits beside it. Duplicating the string meant the accessible name of a
 *     heading came from a hidden node, and anything that reads the visible
 *     DOM — including a search engine's text extraction — saw the heading
 *     twice. The per-character spans are presentational wrappers around
 *     real text instead.
 */
const VerticalCutReveal = forwardRef(function VerticalCutReveal(
  {
    children,
    reverse = false,
    transition = { type: 'spring', stiffness: 190, damping: 22 },
    splitBy = 'words',
    staggerDuration = 0.2,
    staggerFrom = 'first',
    containerClassName,
    wordLevelClassName,
    elementLevelClassName,
    onClick,
    onStart,
    onComplete,
    autoStart = true,
    ...props
  },
  ref,
) {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [isAnimating, setIsAnimating] = useState(false);

  /**
   * Until this is true the text renders as plain, visible text.
   *
   * Without it the server rendered every character already translated out
   * of a clipped box — `transform: translateY(-100%)` inside
   * `overflow-hidden` — so the heading was *invisible* in the initial HTML
   * and only appeared once JavaScript hydrated and started the animation.
   * On the home page that heading is the Largest Contentful Paint element,
   * and with JavaScript slow or unavailable the hero had no visible
   * headline at all.
   *
   * Server and first client render agree (both plain text), so there is no
   * hydration mismatch; the split markup and the reveal are introduced by
   * the effect below.
   */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const text = typeof children === 'string' ? children : (children?.toString() ?? '');

  /** Grapheme-aware, so an emoji or a combining mark is not split in half. */
  const splitIntoCharacters = (value) => {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
      return Array.from(segmenter.segment(value), ({ segment }) => segment);
    }
    return Array.from(value);
  };

  const elements = useMemo(() => {
    const words = text.split(' ');

    if (splitBy === 'characters') {
      return words.map((word, index) => ({
        characters: splitIntoCharacters(word),
        needsSpace: index !== words.length - 1,
      }));
    }

    if (splitBy === 'words') return words;
    if (splitBy === 'lines') return text.split('\n');
    return text.split(splitBy);
  }, [text, splitBy]);

  const getStaggerDelay = useCallback(
    (index) => {
      const total =
        splitBy === 'characters'
          ? elements.reduce(
              (sum, word) =>
                sum +
                (typeof word === 'string'
                  ? 1
                  : word.characters.length + (word.needsSpace ? 1 : 0)),
              0,
            )
          : elements.length;

      if (staggerFrom === 'first') return index * staggerDuration;
      if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;
      if (staggerFrom === 'center') {
        return Math.abs(Math.floor(total / 2) - index) * staggerDuration;
      }
      if (staggerFrom === 'random') {
        return Math.abs(Math.floor(Math.random() * total) - index) * staggerDuration;
      }
      return Math.abs(staggerFrom - index) * staggerDuration;
    },
    [elements, splitBy, staggerFrom, staggerDuration],
  );

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
    onStart?.();
  }, [onStart]);

  useImperativeHandle(ref, () => ({
    startAnimation,
    reset: () => setIsAnimating(false),
  }));

  useEffect(() => {
    if (autoStart) startAnimation();
  }, [autoStart, startAnimation]);

  // Plain text, in its final position, with no transform and no delay.
  // This is both the server-rendered output and the permanent output under
  // a reduced-motion preference.
  if (prefersReducedMotion || !mounted) {
    return (
      <span className={containerClassName} onClick={onClick} {...props}>
        {text}
      </span>
    );
  }

  const variants = {
    hidden: { y: reverse ? '-100%' : '100%' },
    visible: (i) => ({
      y: 0,
      transition: {
        ...transition,
        delay: (transition?.delay ?? 0) + getStaggerDelay(i),
      },
    }),
  };

  const words =
    splitBy === 'characters'
      ? elements
      : elements.map((element, index) => ({
          characters: [element],
          needsSpace: index !== elements.length - 1,
        }));

  return (
    <span
      className={cn(
        containerClassName,
        'flex flex-wrap whitespace-pre-wrap',
        splitBy === 'lines' && 'flex-col',
      )}
      onClick={onClick}
      ref={containerRef}
      {...props}
    >
      {words.map((wordObj, wordIndex) => {
        const previousCharsCount = words
          .slice(0, wordIndex)
          .reduce((sum, word) => sum + word.characters.length, 0);

        return (
          <span
            key={wordIndex}
            className={cn('inline-flex overflow-hidden', wordLevelClassName)}
          >
            {wordObj.characters.map((char, charIndex) => (
              <span
                key={charIndex}
                className={cn(elementLevelClassName, 'relative whitespace-pre-wrap')}
              >
                <m.span
                  custom={previousCharsCount + charIndex}
                  initial="hidden"
                  animate={isAnimating ? 'visible' : 'hidden'}
                  variants={variants}
                  onAnimationComplete={
                    wordIndex === words.length - 1 &&
                    charIndex === wordObj.characters.length - 1
                      ? onComplete
                      : undefined
                  }
                  className="inline-block"
                >
                  {char}
                </m.span>
              </span>
            ))}
            {wordObj.needsSpace ? <span> </span> : null}
          </span>
        );
      })}
    </span>
  );
});

VerticalCutReveal.displayName = 'VerticalCutReveal';

export { VerticalCutReveal };
