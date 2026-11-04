"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * NotchedProjectCard
 *
 * A project card whose cover has a rounded notch bitten out of its
 * bottom-right corner, with the "open" arrow nested inside it. The cut is
 * concentric with the arrow disc, and filleted where it meets the cover's
 * edges, so the cover curves into it instead of ending on a point.
 *
 * The notch is drawn by three layers painted in the colour of the surface
 * BEHIND the card (`surface`, the page background by default). Put the card
 * on a different background and pass that colour, or the notch shows.
 *
 * Optional extras:
 * - `screen`: a product screen layered over the cover photo. The photo holds
 *   still and the screen grows on hover, so the card gains depth instead of
 *   just zooming.
 * - `monochrome`: the cover sits in black and white and takes its colours
 *   back on hover or keyboard focus.
 */

const DISC = 64; // the arrow disc, px
const BLOCK = 80; // the notch block, px (radius = BLOCK - DISC / 2)
const FILLET = 28; // the curve where the cut meets the cover's edges, px

const SURFACE_LOOKUP = {
  white: "#FFFFFF",
  ivory: "#F8F7F2",
  sage: "#DCE9E4",
  "sage-dark": "#C4D8D1",
  navy: "#14243A",
  "navy-900": "#0D1829",
  "color-background": "var(--color-background, #FFFFFF)",
  background: "var(--color-background, #FFFFFF)",
};

function resolveSurfaceColor(surface) {
  if (!surface) return "#FFFFFF";
  if (SURFACE_LOOKUP[surface]) return SURFACE_LOOKUP[surface];
  return surface;
}

export function NotchedProjectCard({
  href,
  title,
  description,
  image,
  imageAlt = "",
  badge,
  badgeIcon,
  tags = [],
  screen,
  dim = screen ? 0.45 : 0,
  monochrome = false,
  surface = "white",
  accent = "#D00100",
  accentForeground = "#FFFFFF",
  actionLabel,
  className,
}) {
  const resolvedSurface = resolveSurfaceColor(surface);

  const tone = monochrome
    ? "grayscale transition-[filter,transform] duration-500 group-hover:grayscale-0 group-focus-visible:grayscale-0"
    : "transition-transform duration-500";

  const isExternal = typeof href === "string" && (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//"));

  const LinkComponent = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <LinkComponent
      {...linkProps}
      className={cn(
        "group flex flex-col rounded-[28px] outline-none transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-4 focus-visible:ring-offset-white",
        className,
      )}
    >
      <div className="relative">
        {/* the cover */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-navy/5">
          <img
            src={image}
            alt={screen ? "" : imageAlt || title}
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              tone,
              !screen && "group-hover:scale-[1.04]",
            )}
          />
          {dim > 0 && (
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundColor: `rgb(0 0 0 / ${dim})` }}
            />
          )}
          {screen && (
            <img
              src={screen.src}
              alt={screen.alt}
              className={cn(
                "absolute bottom-0 right-0 w-[82%] origin-bottom-right drop-shadow-[0_18px_40px_rgba(0,0,0,0.5)] group-hover:scale-[1.07]",
                tone,
                screen.className,
              )}
            />
          )}
          {badge && (
            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center pt-4 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-navy/80 px-3 py-1 font-heading text-micro font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-md shadow-sm">
                {badgeIcon && <span className="shrink-0">{badgeIcon}</span>}
                {badge}
              </span>
            </div>
          )}
        </div>

        {/* the notch: a block with a concave corner, and a fillet at each
            end where the cut meets the cover's right and bottom edges */}
        <div
          aria-hidden
          className="absolute bottom-0 right-0 pointer-events-none"
          style={{
            width: BLOCK,
            height: BLOCK,
            borderTopLeftRadius: BLOCK - DISC / 2,
            background: resolvedSurface,
          }}
        />
        {[
          { bottom: BLOCK, right: 0 },
          { bottom: 0, right: BLOCK },
        ].map((pos, i) => (
          <div
            key={i}
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              ...pos,
              width: FILLET,
              height: FILLET,
              background: `radial-gradient(circle at top left, transparent ${FILLET - 0.5}px, ${resolvedSurface} ${FILLET}px)`,
            }}
          />
        ))}

        {/* the arrow, nested in the notch */}
        <span
          aria-hidden
          className={cn(
            "absolute bottom-0 right-0 flex items-center justify-center rounded-full shadow-card transition-all duration-300 group-hover:scale-105",
            "bg-navy text-white group-hover:bg-[var(--card-accent,#D00100)] group-hover:text-[var(--card-accent-fg,#FFFFFF)]",
          )}
          style={
            {
              width: DISC,
              height: DISC,
              "--card-accent": accent,
              "--card-accent-fg": accentForeground,
            }
          }
        >
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <h3 className="font-heading text-h3 font-bold tracking-tight text-navy group-hover:text-accent transition-colors duration-200">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-body text-charcoal-70 leading-relaxed line-clamp-3">
            {description}
          </p>
        )}
        {tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {tags.map((t, i) => (
              <li
                key={`${t}-${i}`}
                className="rounded-md bg-sage/60 px-2.5 py-1 font-heading text-micro font-semibold uppercase tracking-wider text-navy"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
        {actionLabel && (
          <div className="mt-4 inline-flex items-center gap-1.5 font-heading text-caption font-semibold text-accent group-hover:underline">
            {actionLabel}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        )}
      </div>
    </LinkComponent>
  );
}

export default NotchedProjectCard;

/**
 * Demo component showcasing the NotchedProjectCard adapted with study destinations
 */
export function NotchedDestinationDemo() {
  return (
    <div className="grid w-full max-w-6xl gap-x-6 gap-y-12 p-6 md:grid-cols-3 lg:gap-x-8 lg:p-8">
      <NotchedProjectCard
        href="/destinations/uk"
        title="United Kingdom"
        description="World-renowned Russell Group universities, 2-year post-study work visa, and centuries of academic prestige."
        image="/destinations/uk.jpg"
        badge="Europe"
        tags={["Top 100 Unis", "2-Yr PSW Visa", "Russell Group"]}
        surface="#FFFFFF"
        accent="#D00100"
      />
      <NotchedProjectCard
        href="/destinations/canada"
        title="Canada"
        description="Affordable high-calibre education, multicultural cities, and attractive post-graduation work permit pathways."
        image="/destinations/canada.jpg"
        badge="North America"
        tags={["PGWP Permit", "Top Universities", "PR Pathways"]}
        surface="#FFFFFF"
        accent="#D00100"
      />
      <NotchedProjectCard
        href="/destinations/australia"
        title="Australia"
        description="Globally ranked Group of Eight institutions, generous post-study work rights, and unbeatable quality of life."
        image="/destinations/australia.jpg"
        badge="Oceania"
        tags={["Group of Eight", "Subclass 485", "High Quality of Life"]}
        surface="#FFFFFF"
        accent="#D00100"
      />
    </div>
  );
}

