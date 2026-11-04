import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-md font-heading font-semibold ' +
  'transition-all duration-base ease-standard disabled:cursor-not-allowed disabled:opacity-60 ' +
  'whitespace-nowrap';

/**
 * Button variants mapped onto the Shine Consultant design system,
 * with aliases for standard shadcn variants.
 */
const VARIANTS = {
  // Brand variants
  primary:
    'bg-accent text-white shadow-card hover:bg-accent-hover hover:-translate-y-px ' +
    'ring-1 ring-inset ring-white/20',
  secondary:
    'border-[1.5px] border-navy text-navy hover:bg-navy hover:text-white',
  ghost: 'text-navy underline-offset-4 hover:text-accent hover:underline',
  inverse: 'border-[1.5px] border-white/60 text-white hover:bg-white hover:text-navy',
  danger: 'border-[1.5px] border-accent text-accent hover:bg-accent hover:text-white',
  subtle: 'bg-sage text-navy hover:bg-sage-dark',

  // Shadcn aliases
  default:
    'bg-accent text-white shadow-card hover:bg-accent-hover hover:-translate-y-px ring-1 ring-inset ring-white/20',
  destructive: 'border-[1.5px] border-accent bg-accent text-white hover:bg-accent-hover',
  outline: 'border-[1.5px] border-navy/20 bg-white text-navy hover:bg-navy hover:text-white',
  link: 'text-accent underline-offset-4 hover:underline',
};

const SIZES = {
  sm: 'h-9 px-4 text-caption',
  md: 'h-11 px-6 text-body',
  default: 'h-10 px-4 py-2 text-sm',
  lg: 'h-13 px-8 text-body',
  icon: 'h-10 w-10 p-0',
};

export const buttonVariants = ({ variant = 'default', size = 'default', className = '' } = {}) => {
  return cn(BASE, VARIANTS[variant] ?? VARIANTS.primary, SIZES[size] ?? SIZES.md, className);
};

export const Button = React.forwardRef(function Button(
  {
    as,
    href,
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    asChild = false,
    ...props
  },
  ref
) {
  const classes = cn(BASE, VARIANTS[variant] ?? VARIANTS.primary, SIZES[size] ?? SIZES.md, className);

  if (href) {
    const external = /^https?:|^mailto:|^tel:/.test(href);
    if (external) {
      return (
        <a
          ref={ref}
          href={href}
          className={classes}
          {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link ref={ref} href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  const Tag = as || 'button';
  return (
    <Tag ref={ref} className={classes} {...props}>
      {children}
    </Tag>
  );
});

Button.displayName = 'Button';
export default Button;
