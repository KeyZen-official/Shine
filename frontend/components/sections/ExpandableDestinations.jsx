'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { DestinationCard } from '../cards/DestinationCard';

/**
 * Shows the first 6 destinations in a grid, with a "Show more" button
 * that expands to reveal the rest. No separate page needed.
 */
export function ExpandableDestinations({ destinations = [] }) {
  const [expanded, setExpanded] = useState(false);
  const INITIAL_COUNT = 6;
  const hasMore = destinations.length > INITIAL_COUNT;
  const visible = expanded ? destinations : destinations.slice(0, INITIAL_COUNT);

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((destination, index) => (
          <li key={destination.slug}>
            <DestinationCard
              destination={destination}
              index={index}
              showRegionBadge={false}
            />
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="group inline-flex items-center gap-2.5 rounded-full border-2 border-navy/15 bg-white px-7 py-3.5 font-heading text-body font-bold text-navy shadow-sm transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-md"
          >
            <span>
              {expanded
                ? 'Show fewer destinations'
                : `View remaining destinations (${destinations.length - INITIAL_COUNT} more)`}
            </span>
            <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full bg-navy/5 transition-transform duration-300 group-hover:bg-accent/10 ${expanded ? 'rotate-180' : ''}`}>
              <ChevronDown className="h-4 w-4 transition-colors group-hover:text-accent" aria-hidden="true" />
            </span>
          </button>
        </div>
      )}
    </>
  );
}

export default ExpandableDestinations;

