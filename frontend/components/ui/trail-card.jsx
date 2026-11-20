'use client';

// components/ui/trail-card.jsx
import * as React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

// Define stat item component for DRY principle
const StatItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm font-bold text-navy leading-tight">{value}</span>
    <span className="text-micro sm:text-xs text-charcoal/70 uppercase tracking-wider font-medium mt-0.5">{label}</span>
  </div>
);

const TrailCard = React.forwardRef(
  (
    {
      className,
      imageUrl,
      mapImageUrl,
      title,
      location,
      difficulty = "Featured",
      creators = "Verified Institution",
      distance,
      elevation,
      duration,
      buttonText, // intentionally unused: Explore button removed per user specification
      onDirectionsClick,
      stat1Label = "Distance",
      stat1Value,
      stat2Label = "Elevation",
      stat2Value,
      stat3Label = "Duration",
      stat3Value,
      badge,
      badgeText,
      ...props
    },
    ref
  ) => {
    const s1Val = stat1Value || distance || "Fall / Spring";
    const s2Val = stat2Value || elevation || "UG & PG";
    const s3Val = stat3Value || duration || "Full-Time";

    const [hasError, setHasError] = React.useState(false);
    const resolvedImage = hasError || !imageUrl
      ? '/imagery/usa-campus-overview.jpg'
      : imageUrl;

    return (
      <motion.div
        ref={ref}
        onClick={onDirectionsClick}
        className={cn(
          "w-full max-w-sm overflow-hidden rounded-2xl bg-white text-card-foreground shadow-lg border border-navy/10 group transition-all duration-300 hover:shadow-2xl cursor-pointer flex flex-col justify-between",
          className
        )}
        whileHover={{ y: -6, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...props}
      >
        {/* Top section with background image, dark scrim, and prominent white university name */}
        <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-[#10243D]">
          <img
            src={resolvedImage}
            alt={`${title} campus`}
            onError={() => setHasError(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Deep gradient overlay guaranteeing maximum contrast for text */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B192B] via-[#0B192B]/60 to-transparent pointer-events-none" />

          {/* Prominent, readable University Name & Location */}
          <div className="absolute bottom-0 inset-x-0 p-5 z-10 text-white pointer-events-none">
            <h3 className="text-xl sm:text-[1.35rem] font-extrabold text-white leading-snug drop-shadow-md">
              {title}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-white/90 drop-shadow-sm mt-1.5 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
              <span>{location}</span>
            </p>
          </div>
        </div>

        {/* Bottom section with verified ranking, badge & key stats */}
        <div className="p-5 bg-white flex flex-col justify-between flex-grow">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-heading font-extrabold text-navy text-sm sm:text-base leading-snug">{difficulty}</p>
              <p className="text-xs text-charcoal/70 mt-0.5">{creators}</p>
            </div>

            {/* University Badge / Tag */}
            {mapImageUrl ? (
              <img
                src={mapImageUrl}
                alt={`${title} badge`}
                className="h-9 w-18 object-contain rounded-md"
              />
            ) : (
              <div className="flex h-8 px-3 items-center justify-center rounded-lg bg-accent/10 text-accent text-xs font-heading font-extrabold border border-accent/25 shrink-0">
                {badge || badgeText || "Verified"}
              </div>
            )}
          </div>

          <div className="my-4 h-px w-full bg-navy/10" />

          {/* Three Key Institutional Stats */}
          <div className="flex justify-between items-center text-left">
            <StatItem label={stat1Label} value={s1Val} />
            <StatItem label={stat2Label} value={s2Val} />
            <StatItem label={stat3Label} value={s3Val} />
          </div>
        </div>
      </motion.div>
    );
  }
);

TrailCard.displayName = "TrailCard";

export default TrailCard;
export { TrailCard };
