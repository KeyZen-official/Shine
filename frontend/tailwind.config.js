/**
 * The single source of design tokens. No component declares a raw hex
 * value, a one-off spacing number or an ad-hoc transition duration — if it
 * is not expressible here, it is not in the design system.
 *
 * @type {import('tailwindcss').Config}
 */
const config = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    // `colors` is replaced rather than extended, so an off-palette colour
    // cannot be reached by accident through a Tailwind default.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',

      navy: {
        DEFAULT: '#14243A',
        900: '#0D1829',
        800: '#14243A',
        700: '#25374F',
        600: '#3B4E68',
      },
      ivory: '#F8F7F2',
      white: '#FFFFFF',
      charcoal: {
        DEFAULT: '#252D35',
        70: 'rgba(37, 45, 53, 0.70)',
        50: 'rgba(37, 45, 53, 0.50)',
      },
      sage: {
        DEFAULT: '#DCE9E4',
        dark: '#C4D8D1',
      },
      /**
       * Brand red, taken from the logo artwork.
       *
       * The artwork's exact red is #DD0100 (sampled: 9.76% of the canvas,
       * the "Shine" script and the tagline). That value clears 4.5:1 on
       * ivory and white but reaches only 4.12:1 on sage, and sage banding
       * carries accent-coloured eyebrows — so it fails as a text colour.
       *
       * Darkening it 6% to #D00100 clears 4.5:1 on all three light
       * surfaces while staying about dE 2.5 from the artwork, which is at
       * the edge of perceptibility. One red that works everywhere beats
       * two reds that nearly match.
       *
       * On navy it measures 2.9:1 and is never used for text or icons
       * there; `accent.onNavy` is the substitute at 4.87:1.
       */
      accent: {
        DEFAULT: '#D00100',
        artwork: '#DD0100',
        hover: '#B30100',
        onNavy: '#EE6070',
      },
      // Status tints for the back office. Each is paired with a text label,
      // never used as the only indicator.
      status: {
        new: '#14243A',
        progress: '#8A6A1F',
        done: '#1F6B4A',
        closed: '#5B6670',
      },
      // Shadcn tokens mapped onto Shine Consultant brand palette
      background: '#FFFFFF',
      foreground: '#14243A',
      card: {
        DEFAULT: '#FFFFFF',
        foreground: '#14243A',
      },
      border: 'rgba(20, 36, 58, 0.10)',
      primary: {
        DEFAULT: '#14243A',
        foreground: '#FFFFFF',
      },
      secondary: {
        DEFAULT: '#DCE9E4',
        foreground: '#14243A',
      },
      muted: {
        DEFAULT: '#EAE8E0',
        foreground: 'rgba(37, 45, 53, 0.70)',
      },
      // Gradient card color tokens
      orange: {
        100: '#FFEDD5',
        200: '#FED7AA',
        500: '#F97316',
      },
      amber: {
        100: '#FEF3C7',
        200: '#FDE68A',
        500: '#F59E0B',
      },
      slate: {
        100: '#F1F5F9',
        200: '#E2E8F0',
        500: '#64748B',
      },
      purple: {
        100: '#F3E8FF',
        200: '#E9D5FF',
        500: '#8B5CF6',
      },
      indigo: {
        100: '#E0E7FF',
        200: '#C7D2FE',
        500: '#6366F1',
      },
      emerald: {
        100: '#D1FAE5',
        200: '#A7F3D0',
        500: '#10B981',
      },
      teal: {
        100: '#CCFBF1',
        200: '#99F6E4',
        500: '#14B8A6',
      },
    },

    /**
     * The spacing scale is replaced, not extended, so an arbitrary value
     * cannot be reached through a Tailwind default.
     *
     * Layout spacing follows a 4px rhythm. The half-steps (6px, 10px, 14px)
     * exist because optical work does not: a 14px icon beside 14px text,
     * or a 6px gap between an icon and its label, has no 4px equivalent
     * that looks right. Tailwind ships these for the same reason.
     *
     * A first version of this config omitted them, and because Tailwind
     * drops an unknown utility silently rather than warning, `h-3.5` on two
     * dozen icons produced no rule at all and they rendered at Lucide's
     * intrinsic 24px. `npm run check:spacing` now fails the build on any
     * spacing utility that compiles to nothing.
     */
    spacing: {
      0: '0px',
      px: '1px',
      0.5: '2px',
      1: '4px',
      1.5: '6px',
      2: '8px',
      2.5: '10px',
      3: '12px',
      3.5: '14px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      13: '52px',
      14: '56px',
      16: '64px',
      18: '72px',
      20: '80px',
      24: '96px',
      28: '112px',
      32: '128px',
      40: '160px',
      44: '176px',
      48: '192px',
      56: '224px',
      64: '256px',
      72: '288px',
      80: '320px',
      96: '384px',
    },

    borderRadius: {
      none: '0px',
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '20px',
      '2xl': '24px',
      full: '9999px',
    },

    fontFamily: {
      heading: ['var(--font-heading)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },

    // clamp() throughout, so there is no jump at a breakpoint, with a 16px
    // floor on body text at every width.
    fontSize: {
      display: ['clamp(2.5rem, 5.2vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      h1: ['clamp(2rem, 3.6vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
      h2: ['clamp(1.5rem, 2.4vw, 2.125rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      h3: ['clamp(1.25rem, 1.6vw, 1.5rem)', { lineHeight: '1.25', letterSpacing: '-0.005em' }],
      lead: ['clamp(1.0625rem, 1.2vw, 1.25rem)', { lineHeight: '1.55' }],
      body: ['1rem', { lineHeight: '1.65' }],
      caption: ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
      sm: ['0.875rem', { lineHeight: '1.5' }],
      micro: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.06em' }],
    },

    extend: {
      maxWidth: {
        shell: '1280px',
        prose: '68ch',
        measure: '56ch',
        xs: '20rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,36,58,.06), 0 8px 24px -12px rgba(20,36,58,.12)',
        'card-hover': '0 2px 4px rgba(20,36,58,.08), 0 16px 32px -16px rgba(20,36,58,.18)',
        nav: '0 1px 0 rgba(20,36,58,.08)',
        panel: '0 1px 2px rgba(20,36,58,.05)',
      },
      // The only permitted gradient: a two-stop single-hue navy scrim over
      // hero photography, which exists for text legibility.
      backgroundImage: {
        'hero-scrim':
          'linear-gradient(to top, rgba(20,36,58,.88) 0%, rgba(20,36,58,.42) 55%, rgba(20,36,58,.18) 100%)',
        'navy-fade': 'linear-gradient(160deg, #14243A 0%, #0D1829 100%)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '220ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(.2,.6,.2,1)',
        exit: 'cubic-bezier(.4,0,1,1)',
      },
      minHeight: {
        touch: '44px',
      },
      minWidth: {
        touch: '44px',
      },
      screens: {
        xs: '430px',
      },
      gridTemplateColumns: {
        'split-left': 'minmax(0, 7fr) minmax(0, 5fr)',
        'split-right': 'minmax(0, 5fr) minmax(0, 7fr)',
        'filter-shell': 'minmax(0, 280px) minmax(0, 1fr)',
        'detail-shell': 'minmax(0, 1fr) minmax(0, 340px)',
      },
      keyframes: {
        'fade-rise': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Navbar dropdown: fades in and slides down from just above its resting position.
        dropdown: {
          '0%': { opacity: '0', transform: 'translateY(-6px) scaleY(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0) scaleY(1)' },
        },
        // `shimmer` was removed with the loading skeletons it animated.
        // Content is inlined at build time, so nothing shimmers any more.
      },
      animation: {
        'fade-rise': 'fade-rise 300ms cubic-bezier(.2,.6,.2,1) both',
        // Navbar dropdown — slightly snappier than fade-rise so it feels native.
        dropdown: 'dropdown 180ms cubic-bezier(.2,.6,.2,1) both',
      },
    },
  },
  plugins: [],
};

export default config;
