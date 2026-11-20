'use client';

// components/ui/gradient-card.jsx

import * as React from "react";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

// Pure fallback for card styles in case cva is unavailable during HMR
const fallbackCardVariants = ({ gradient = "gray" } = {}) => {
  const gradients = {
    orange: "bg-gradient-to-br from-orange-100 to-amber-200/50",
    gray: "bg-gradient-to-br from-slate-100 to-slate-200/50",
    purple: "bg-gradient-to-br from-purple-100 to-indigo-200/50",
    green: "bg-gradient-to-br from-emerald-100 to-teal-200/50",
  };
  const base = "relative flex flex-col justify-between h-full w-full overflow-hidden rounded-2xl p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg";
  return `${base} ${gradients[gradient] || gradients.gray}`;
};

// Define variants for the card's overall style using cva with safe fallback
let cardVariants;
try {
  cardVariants = cva(
    "relative flex flex-col justify-between h-full w-full overflow-hidden rounded-2xl p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg",
    {
      variants: {
        gradient: {
          orange: "bg-gradient-to-br from-orange-100 to-amber-200/50",
          gray: "bg-gradient-to-br from-slate-100 to-slate-200/50",
          purple: "bg-gradient-to-br from-purple-100 to-indigo-200/50",
          green: "bg-gradient-to-br from-emerald-100 to-teal-200/50",
        },
      },
      defaultVariants: {
        gradient: "gray",
      },
    }
  );
} catch {
  cardVariants = fallbackCardVariants;
}

const GradientCard = React.forwardRef(
  ({ className, gradient, badgeText, badgeColor, title, description, ctaText, ctaHref, imageUrl, ...props }, ref) => {
    
    // Animation variants for framer-motion
    const cardAnimation = {
      rest: { scale: 1, y: 0 },
      hover: { scale: 1.03, y: -4 },
    };

    const imageAnimation = {
      rest: { scale: 1, rotate: 0 },
      hover: { scale: 1.1, rotate: 3 },
    };

    const resolvedVariant = typeof cardVariants === "function" 
      ? cardVariants({ gradient }) 
      : fallbackCardVariants({ gradient });

    return (
      <motion.div
        variants={cardAnimation}
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="h-full"
        ref={ref}
      >
        <div
          className={cn(resolvedVariant, className)}
          {...props}
        >
          {/* Decorative background image with animation */}
          {imageUrl && (
            <motion.img
              src={imageUrl}
              alt={`${title} background graphic`}
              variants={imageAnimation}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="absolute -right-1/4 -bottom-1/4 w-3/4 opacity-80 pointer-events-none dark:opacity-30 object-cover"
            />
          )}

          {/* Card Content */}
          <div className="z-10 flex flex-col h-full">
            {/* Badge */}
            {badgeText && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-background/50 px-3 py-1 text-sm font-medium text-foreground/80 backdrop-blur-sm w-fit">
                <span 
                  className="h-2 w-2 rounded-full" 
                  style={{ backgroundColor: badgeColor || "#F59E0B" }}
                />
                {badgeText}
              </div>
            )}

            {/* Title and Description */}
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
              <p className="text-foreground/70 max-w-xs">{description}</p>
            </div>
            
            {/* Call to Action Link */}
            {ctaHref && (
              <a
                href={ctaHref}
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground"
              >
                {ctaText || "Learn more"}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);
GradientCard.displayName = "GradientCard";

export default GradientCard;
export { GradientCard, cardVariants };
