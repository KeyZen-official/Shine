'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Brandmark } from '@/components/brand/Brandmark';

/**
 * A navigation bar that contracts into a floating pill once the page is
 * scrolled.
 *
 * Adapted from the supplied `resizable-navbar`. The public API is the same,
 * so the documented composition still works. What changed, and why:
 *
 * **It uses CSS transitions, not framer-motion.** Three reasons, in order
 * of weight:
 *   - This bar renders in the shell on every route. Importing an animation
 *     library here moves it into the shared chunk, so every page pays for
 *     it. The transition is width, height, radius, colour and translate —
 *     all of which CSS does natively for nothing.
 *   - Two of the four properties the original animated could never have
 *     tweened: `backdropFilter` and `boxShadow` were going from the keyword
 *     `none`, which is not interpolatable. Those were snapping already.
 *   - The supplied import was `motion/react`, which is the renamed Framer
 *     Motion. Installing it beside the `framer-motion` already in this
 *     project would have shipped two copies of the same library.
 *
 * As a side effect, the global `prefers-reduced-motion` rule in globals.css
 * now neutralises this bar for free — a JavaScript animation would have
 * needed its own opt-out.
 *
 * **`minWidth: 800px` is gone.** Combined with `width: 40%` it meant the
 * contraction did nothing below roughly a 2000px viewport: 40% of 1280px is
 * 512px, well under the floor. The bar now contracts from 80rem to 68rem,
 * which is visible at every desktop width and still fits the content.
 *
 * **`NavItems` is a flex child, not `absolute inset-0`.** As an absolute
 * overlay with no `pointer-events-none` it covered the whole bar, which
 * made the action buttons on the right unclickable.
 *
 * **Dropdowns are supported.** The original had none, and this site needs
 * them for study destinations and services.
 */

const NavbarContext = createContext({ visible: false });

export function useNavbarState() {
  return useContext(NavbarContext);
}

/** Page scroll past a threshold, throttled to one read per frame. */
function useScrolledPast(threshold) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > threshold);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return scrolled;
}

/**
 * `visible` reaches descendants through context rather than
 * `React.cloneElement`. Cloning only works on a direct, single, valid
 * element child — wrap a child in a fragment or render it conditionally and
 * the prop silently vanishes.
 *
 * Renders a real `<header>`: this is a landmark, and the original's
 * `motion.div` gave screen reader users nothing to navigate to.
 */
export function Navbar({ children, className, threshold = 80 }) {
  const visible = useScrolledPast(threshold);

  return (
    <NavbarContext.Provider value={{ visible }}>
      {/* No horizontal padding here: the gutter belongs to the bar itself,
          so its inner edge lines up with the `.shell` content width on
          every page. Padding on both would offset the logo from the page
          content by the width of one gutter.
          
          Once contracted the header itself goes fully transparent and
          stops taking pointer events, so all you see is the floating pill.
          Tinting the full-width header as well produced a long translucent
          strip across the viewport with the pill sitting inside it, and
          intercepted clicks on the content passing underneath. */}
      <header
        className={cn(
          'sticky inset-x-0 top-0 z-40 w-full transition-colors duration-slow ease-standard',
          visible ? 'pointer-events-none bg-transparent' : 'bg-ivory',
          className,
        )}
      >
        {children}
      </header>
    </NavbarContext.Provider>
  );
}

const SHELL_TRANSITION =
  'transition-[max-width,height,border-radius,background-color,border-color,box-shadow,transform,padding] duration-slow ease-standard';

export function NavBody({ children, className, visible: override }) {
  const { visible: fromContext } = useNavbarState();
  const visible = override ?? fromContext;

  return (
    <div
      /**
       * 72rem contracted, not 68rem. Seven nav items plus a logo and a
       * call to action need 1152px; at 1088px the last item collided with
       * the buttons.
       *
       * `xl:flex`, not `lg:flex`, for the same reason: below 1280px this
       * bar cannot hold its content without wrapping, so the mobile menu
       * — which has the same dropdowns and a focus trap — serves that
       * range instead.
       */
      style={{ maxWidth: visible ? '72rem' : '80rem' }}
      className={cn(
        'pointer-events-auto relative z-50 mx-auto hidden w-full items-center justify-between gap-4 border px-4 sm:px-6 xl:flex xl:px-8',
        SHELL_TRANSITION,
        visible
          ? 'h-16 translate-y-3 rounded-full border-navy/10 bg-white/90 shadow-card backdrop-blur-safe'
          : 'h-20 translate-y-0 rounded-none border-transparent bg-transparent',
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * The hover pill slides between items.
 *
 * The original used a shared `layoutId`, which needs framer-motion's
 * `domMax` feature bundle — the heaviest one. Measuring the hovered item
 * and transitioning `left`/`width` gives the same slide with no library at
 * all, and the global reduced-motion rule disables it automatically.
 */
export function NavItems({ items = [], className, onItemClick, isActive }) {
  const baseId = useId().replace(/:/g, '');
  const listRef = useRef(null);
  const [indicator, setIndicator] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const moveIndicator = useCallback((element) => {
    if (!element || !listRef.current) return;
    const listBox = listRef.current.getBoundingClientRect();
    const itemBox = element.getBoundingClientRect();
    setIndicator({ left: itemBox.left - listBox.left, width: itemBox.width });
  }, []);

  // Escape closes the open menu and hands focus back to the trigger it came
  // from; a pointer press outside closes it without moving focus.
  useEffect(() => {
    if (!openDropdown) return undefined;

    const onPointerDown = (event) => {
      if (!listRef.current?.contains(event.target)) setOpenDropdown(null);
    };

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setOpenDropdown(null);
      document.getElementById(`${baseId}-trigger-${openDropdown}`)?.focus();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openDropdown, baseId]);

  return (
    <ul
      ref={listRef}
      onMouseLeave={() => setIndicator(null)}
      className={cn('relative flex flex-1 items-center justify-center', className)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-1.5 z-0 rounded-full bg-sage transition-all duration-base ease-standard"
        style={{
          left: indicator?.left ?? 0,
          width: indicator?.width ?? 0,
          opacity: indicator ? 1 : 0,
        }}
      />

      {items.map((item) => {
        const active = isActive?.(item.href ?? item.link) ?? false;
        const dropdown = item.dropdown ?? [];
        const key = item.href ?? item.link;
        const dropdownOnly = item.dropdownOnly ?? false;

        return (
          <li
            key={key}
            className="relative z-10"
            onMouseEnter={(event) => moveIndicator(event.currentTarget)}
          >
            <div className="flex shrink-0 items-center">
              {dropdownOnly && dropdown.length > 0 ? (
                // Category has no standalone page — the entire label is the
                // dropdown trigger. Click toggles open/closed.
                <button
                  type="button"
                  id={`${baseId}-trigger-${key}`}
                  aria-expanded={openDropdown === key}
                  aria-controls={`${baseId}-menu-${key}`}
                  aria-haspopup="true"
                  onClick={() => setOpenDropdown((current) => (current === key ? null : key))}
                  className={cn(
                    'relative inline-flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded-full px-2.5 py-2 font-heading text-caption font-semibold transition-colors duration-fast ease-standard',
                    active ? 'text-navy' : 'text-charcoal-70 hover:text-navy',
                  )}
                >
                  {item.short ?? item.name ?? item.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      'h-3.5 w-3.5 transition-transform duration-base ease-standard',
                      openDropdown === key && 'rotate-180',
                    )}
                  />
                  {/* Active underline bar */}
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-0.5 h-0.5 rounded-full bg-accent"
                    />
                  ) : null}
                </button>
              ) : (
                <>
                  <Link
                    href={key}
                    onClick={onItemClick}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      // whitespace-nowrap is load-bearing: without it a
                      // two-word label breaks onto a second line the moment
                      // the bar is tight, which is what made "Study
                      // Destinations" and "Contact Us" stack.
                      'relative block whitespace-nowrap rounded-full px-2.5 py-2 font-heading text-caption font-semibold transition-colors duration-fast ease-standard',
                      active ? 'text-navy' : 'text-charcoal-70 hover:text-navy',
                    )}
                  >
                    {item.short ?? item.name ?? item.label}
                    {/* An underline bar as well as a colour change, so the
                        active item is not signalled by colour alone. */}
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 bottom-0.5 h-0.5 rounded-full bg-accent"
                      />
                    ) : null}
                  </Link>

                  {dropdown.length > 0 ? (
                    <button
                      type="button"
                      id={`${baseId}-trigger-${key}`}
                      aria-expanded={openDropdown === key}
                      aria-controls={`${baseId}-menu-${key}`}
                      aria-label={`${item.label ?? item.name} menu`}
                      onClick={() => setOpenDropdown((current) => (current === key ? null : key))}
                      className="-ml-1.5 shrink-0 rounded-full p-0.5 text-charcoal-50 transition-colors duration-fast hover:text-navy"
                    >
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          'h-3.5 w-3.5 transition-transform duration-base ease-standard',
                          openDropdown === key && 'rotate-180',
                        )}
                      />
                    </button>
                  ) : null}
                </>
              )}
            </div>

            {dropdown.length > 0 && openDropdown === key ? (
              <div
                id={`${baseId}-menu-${key}`}
                role="menu"
                aria-label={`${item.name ?? item.label} options`}
                className="absolute left-0 top-full z-50 mt-2 min-w-[13rem] overflow-hidden rounded-xl border border-navy/10 bg-white py-1.5 shadow-card-hover animate-dropdown"
              >
                <ul>
                  {dropdown.map((entry) => (
                    <li key={entry.href} role="none">
                      <Link
                        href={entry.href}
                        role="menuitem"
                        onClick={() => {
                          setOpenDropdown(null);
                          onItemClick?.();
                        }}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-caption text-charcoal-70 transition-colors duration-fast hover:bg-sage hover:text-navy"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/40" aria-hidden="true" />
                        {entry.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export function MobileNav({ children, className, visible: override }) {
  const { visible: fromContext } = useNavbarState();
  const visible = override ?? fromContext;

  return (
    <div
      style={{ maxWidth: visible ? 'calc(100vw - 1.5rem)' : '80rem' }}
      className={cn(
        'pointer-events-auto relative z-50 mx-auto flex w-full flex-col border px-4 sm:px-6 xl:hidden',
        SHELL_TRANSITION,
        visible
          ? 'translate-y-3 rounded-xl border-navy/10 bg-white/95 shadow-card backdrop-blur-safe'
          : 'translate-y-0 rounded-none border-transparent bg-transparent',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function MobileNavHeader({ children, className }) {
  const { visible } = useNavbarState();

  return (
    <div
      className={cn(
        'flex w-full flex-row items-center justify-between transition-[height] duration-slow ease-standard',
        visible ? 'h-14' : 'h-20',
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * A real button, with an accessible name and `aria-expanded`.
 *
 * The original put `onClick` straight on an `<svg>`: not focusable, not
 * keyboard operable, and announced as nothing.
 */
export function MobileNavToggle({ isOpen, onClick, controls, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={controls}
      className={cn(
        'inline-flex touch-target items-center justify-center rounded-md border border-navy/15 text-navy transition-colors duration-fast hover:bg-sage',
        className,
      )}
    >
      {isOpen ? (
        <X className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Menu className="h-5 w-5" aria-hidden="true" />
      )}
      <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
    </button>
  );
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * The open panel.
 *
 * The original accepted `onClose` and never called it — no Escape, no
 * outside press, no focus management. This traps focus while open, restores
 * it to the trigger on close, locks page scroll and marks itself a dialog,
 * which is what the panel's behaviour already implied.
 */
export function MobileNavMenu({ children, className, isOpen, onClose, id }) {
  const panelRef = useRef(null);
  const openerRef = useRef(null);
  const [mounted, setMounted] = useState(isOpen);

  // Kept mounted briefly after closing so the exit transition can run.
  // The original used AnimatePresence for this; a timeout costs nothing.
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      return undefined;
    }
    const timer = setTimeout(() => setMounted(false), 150);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    openerRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = Array.from(panelRef.current?.querySelectorAll(FOCUSABLE) ?? []).filter(
        (element) => element.offsetParent !== null,
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (openerRef.current instanceof HTMLElement) openerRef.current.focus();
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return (
    <>
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close menu"
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-navy/50 transition-opacity duration-base ease-standard',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
      />

      <div
        id={id}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={cn(
          'absolute inset-x-0 top-full z-50 mt-2 flex max-h-[calc(100vh-7rem)] w-full flex-col items-start gap-4 overflow-y-auto rounded-lg border border-navy/10 bg-white px-4 py-6 shadow-card-hover',
          'transition-all duration-base ease-standard',
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0',
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}

/**
 * The brandmark. The original linked to `href="#"`, read "Startup" and
 * pulled a logo from a third-party CDN.
 *
 * The logo shrinks with the bar — 48px tall at rest, 36px once contracted —
 * so the proportion between mark and bar stays constant rather than the
 * logo suddenly dominating a shorter bar. `priority` because this is above
 * the fold on every route.
 */
export function NavbarLogo({ className }) {
  const { visible } = useNavbarState();

  return (
    <Link
      href="/"
      aria-label="Shine Consultant — home"
      className={cn('relative z-20 flex shrink-0 items-center rounded-sm', className)}
    >
      <Brandmark
        variant="compact"
        priority
        imageClassName={cn(
          'w-auto transition-[height] duration-slow ease-standard',
          visible ? 'h-9' : 'h-12',
        )}
      />
    </Link>
  );
}

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 rounded-md font-heading text-caption font-semibold whitespace-nowrap transition-all duration-base ease-standard';

/**
 * Variants mapped onto the project palette. The original's `bg-white`,
 * `text-black`, `text-sm` and `from-blue-500` resolve to nothing here: the
 * colour and type scales in tailwind.config.js are replaced rather than
 * extended, specifically so an off-palette value cannot slip through.
 */
const BUTTON_VARIANTS = {
  primary:
    'bg-accent px-5 py-2.5 text-white shadow-card ring-1 ring-inset ring-white/20 hover:-translate-y-px hover:bg-accent-hover',
  secondary: 'px-3 py-2.5 text-navy underline-offset-4 hover:text-accent hover:underline',
  dark: 'bg-navy px-5 py-2.5 text-white hover:bg-navy-900',
  outline:
    'border-[1.5px] border-navy px-5 py-2.5 text-navy hover:bg-navy hover:text-white',
};

export function NavbarButton({
  href,
  as: Tag = 'a',
  children,
  className,
  variant = 'primary',
  ...props
}) {
  const classes = cn(BUTTON_BASE, BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.primary, className);

  // An internal href routes through next/link so navigation stays client
  // side; the original always rendered a plain anchor, which reloaded the
  // whole document.
  if (href && !/^(https?:|mailto:|tel:|#)/.test(href)) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
