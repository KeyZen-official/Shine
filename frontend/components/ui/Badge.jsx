const TONES = {
  neutral: 'bg-sage text-navy',
  accent: 'bg-accent/10 text-accent',
  outline: 'border border-navy/20 text-navy',
  inverse: 'bg-white/10 text-white ring-1 ring-inset ring-white/25',
  new: 'bg-navy text-white',
  progress: 'bg-[#8A6A1F]/12 text-[#6F5518]',
  done: 'bg-[#1F6B4A]/12 text-[#17553A]',
  closed: 'bg-navy/8 text-navy/70',
};

/**
 * Status badges always carry a text label. Colour alone is never the
 * indicator, so the meaning survives for a colour-blind reader and in
 * print.
 */
export function Badge({ tone = 'neutral', children, className = '', icon: Icon }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-heading text-micro font-semibold uppercase tracking-[0.08em] ${
        TONES[tone] ?? TONES.neutral
      } ${className}`}
    >
      {Icon ? <Icon className="h-3 w-3" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

/* `MetaChip` was removed with the course and university cards it was built
   for. Nothing else used it. */
