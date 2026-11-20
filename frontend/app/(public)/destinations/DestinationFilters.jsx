'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RotateCcw, Search } from 'lucide-react';
import { DESTINATION_REGIONS } from '../../../shared/constants';

const DEBOUNCE_MS = 350;

/**
 * Writes to the query string so a filtered destination list is shareable
 * and survives the back button, matching how the course index behaves.
 */
export function DestinationFilters({ search, region }) {
  const router = useRouter();
  const [term, setTerm] = useState(search ?? '');
  const timer = useRef(null);

  useEffect(() => setTerm(search ?? ''), [search]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const push = (nextSearch, nextRegion) => {
    const params = new URLSearchParams();
    if (nextSearch) params.set('search', nextSearch);
    if (nextRegion) params.set('region', nextRegion);
    const query = params.toString();
    router.push(query ? `/destinations?${query}` : '/destinations', { scroll: false });
  };

  const onTermChange = (event) => {
    const next = event.target.value;
    setTerm(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => push(next.trim(), region), DEBOUNCE_MS);
  };

  const hasFilters = Boolean(search || region);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
      <div className="lg:max-w-sm lg:flex-1">
        <label
          htmlFor="destination-search"
          className="mb-2 block font-heading text-caption font-semibold text-white"
        >
          Search destinations
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40"
            aria-hidden="true"
          />
          <input
            id="destination-search"
            type="search"
            value={term}
            onChange={onTermChange}
            placeholder="Country name"
            className="h-12 w-full rounded-md border border-white/20 bg-white pl-11 pr-4 text-body text-charcoal placeholder:text-charcoal-50"
          />
        </div>
      </div>

      <fieldset className="min-w-0">
        <legend className="mb-2 font-heading text-caption font-semibold text-white">Region</legend>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => push(search, '')}
            aria-pressed={!region}
            className={`inline-flex h-11 items-center rounded-full px-4 font-heading text-caption font-semibold transition-colors duration-fast ${
              !region
                ? 'bg-white text-navy'
                : 'border border-white/25 text-white/75 hover:border-white/60 hover:text-white'
            }`}
          >
            All
          </button>
          {DESTINATION_REGIONS.map((entry) => {
            const active = region === entry.value;
            return (
              <button
                key={entry.value}
                type="button"
                onClick={() => push(search, active ? '' : entry.value)}
                aria-pressed={active}
                className={`inline-flex h-11 items-center rounded-full px-4 font-heading text-caption font-semibold transition-colors duration-fast ${
                  active
                    ? 'bg-white text-navy'
                    : 'border border-white/25 text-white/75 hover:border-white/60 hover:text-white'
                }`}
              >
                {entry.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {hasFilters ? (
        <button
          type="button"
          onClick={() => push('', '')}
          className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-md px-3 font-heading text-caption font-semibold"
          style={{ color: '#EE6070' }}
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset
        </button>
      ) : null}
    </div>
  );
}
