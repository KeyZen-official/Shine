import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Configure tailwind-merge with the project's bespoke font-size tokens
 * ('display', 'h1', 'h2', 'h3', 'lead', 'body', 'caption', 'micro', 'sm')
 * so that font-size utilities like `text-body` are never mistaken for color
 * utilities and never inadvertently strip `text-white` or other text colors.
 */
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { text: ['display', 'h1', 'h2', 'h3', 'lead', 'body', 'caption', 'micro', 'sm'] },
      ],
    },
  },
});

/**
 * Merges class names and resolves Tailwind conflicts, so a caller's
 * `className` can override a component's default rather than fighting it on
 * specificity. This is the `cn` helper shadcn-style components expect.
 */
export function cn(...inputs) {
  return customTwMerge(clsx(inputs));
}
