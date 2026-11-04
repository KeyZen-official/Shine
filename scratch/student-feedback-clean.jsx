"'use client';

import React from 'react';
import { StaggerTestimonials } from '../ui/stagger-testimonials';

/**
 * StudentFeedbackSection
 *
 * Implements the Student Feedback section with bespoke travel & wave decorative
 * backgrounds matching the design reference:
 * - Upper-right: subtle dotted world map, red dashed flight loop, red airplane SVG
 * - Bottom-left: flowing navy blue wave with a floating red accent curve above it
 * - Bottom-right: flowing red wave entering from the bottom-right corner
 * - Centre: strictly preserved 3D StaggerTestimonials carousel
 */
export function StudentFeedbackSection() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative w-full overflow-hidden bg-ivory py-16 lg:py-24"
    >
      {/* 1. Upper-Right Travel Illustration: Dotted World Map + Flight Loop + Airplane */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-2 right-0 sm:right-4 md:right-8 lg:right-12 z-0 hidden sm:block w-[320px] md:w-[420px] lg:w-[500px] h-auto select-none overflow-visible"
      >
        <svg
          viewBox="0 0 520 260"
          fill="none"
          className="w-full h-auto overflow-visible"
        >
          <defs>
            <pattern
              id="student-feedback-world-dots"
              x="0"
              y="0"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="4" cy="4" r="1.3" fill="#94A3B8" opacity="0.45" />
            </pattern>
          </defs>

          {/* Continents filled with dotted matrix pattern */}
          {/* North America */}
          <path
            d="M 40,30 Q 70,18 115,22 Q 145,30 150,50 Q 155,70 135,80 Q 115,98 100,108 Q 85,118 70,88 Q 50,60 40,30 Z M 135,10 Q 160,6 170,18 Q 160,32 135,25 Z"
            fill="url(#student-feedback-world-dots)"
          />
          {/* South Amer
<truncated 4746 bytes>