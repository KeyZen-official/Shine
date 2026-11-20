'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';

const CATEGORY_TONES = {
  'Visa Updates': 'accent',
  'Study Abroad Updates': 'neutral',
  'Educational Insights': 'neutral',
  Events: 'accent',
  'News & Announcements': 'neutral',
  'Company Updates': 'outline',
  'Student Success Stories': 'neutral',
};

export function UpdateCard({ update, priority = false, className = '' }) {
  if (!update) return null;

  const {
    slug,
    title,
    category,
    publishedAt,
    readingTime,
    featuredImage,
    featuredImageAlt,
    shortDescription,
  } = update;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  const tone = CATEGORY_TONES[category] || 'neutral';

  return (
    <article
      className={cn(
        'group flex flex-col h-full rounded-xl border border-navy/10 bg-white shadow-card transition-all duration-base ease-standard hover:-translate-y-1 hover:shadow-card-hover overflow-hidden',
        className
      )}
    >
      <Link href={`/latest/${slug}`} className="relative block aspect-[16/10] w-full overflow-hidden bg-sage/40">
        {featuredImage ? (
          <img
            src={featuredImage}
            alt={featuredImageAlt || title}
            loading={priority ? 'eager' : 'lazy'}
            className="h-full w-full object-cover transition-transform duration-slow ease-standard group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-navy text-white font-heading text-caption">
            Shine Consultant Update
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge tone={tone} className="shadow-sm">
            {category}
          </Badge>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-3 text-caption text-charcoal-50 mb-3">
          {formattedDate ? (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              <time dateTime={publishedAt}>{formattedDate}</time>
            </span>
          ) : null}
          {readingTime ? (
            <>
              <span aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{readingTime}</span>
              </span>
            </>
          ) : null}
        </div>

        <h3 className="font-heading text-h3 font-bold text-navy transition-colors duration-fast group-hover:text-accent line-clamp-2">
          <Link href={`/latest/${slug}`} className="focus:outline-none">
            {title}
          </Link>
        </h3>

        {shortDescription ? (
          <p className="mt-3 text-caption leading-relaxed text-charcoal-70 line-clamp-3">
            {shortDescription}
          </p>
        ) : null}

        <div className="mt-auto pt-5 flex items-center justify-between border-t border-navy/10">
          <Link
            href={`/latest/${slug}`}
            className="inline-flex items-center gap-1.5 font-heading text-caption font-semibold text-accent transition-colors group-hover:text-accent-hover"
          >
            <span>Read full update</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
