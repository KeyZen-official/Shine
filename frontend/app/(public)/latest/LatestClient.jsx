'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Calendar, Clock, Newspaper, Search, X } from 'lucide-react';
import { UpdateCard } from '../../../components/cards/UpdateCard';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/ui/States';

const PAGE_SIZE = 9;

export function LatestClient({ initialUpdates = [], categories = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredUpdates = useMemo(() => {
    return initialUpdates.filter((update) => {
      const matchesCategory =
        selectedCategory === 'All' || update.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inTitle = update.title?.toLowerCase().includes(q);
      const inDesc = update.shortDescription?.toLowerCase().includes(q);
      const inCategory = update.category?.toLowerCase().includes(q);

      return inTitle || inDesc || inCategory;
    });
  }, [initialUpdates, selectedCategory, searchQuery]);

  const featuredUpdate = useMemo(() => {
    if (selectedCategory !== 'All' || searchQuery.trim() !== '') return null;
    return initialUpdates.find((u) => u.featured) || initialUpdates[0] || null;
  }, [initialUpdates, selectedCategory, searchQuery]);

  // When featured update is rendered at the top, omit it from the main grid below
  const gridUpdates = useMemo(() => {
    if (featuredUpdate && selectedCategory === 'All' && !searchQuery.trim()) {
      return filteredUpdates.filter((u) => u.slug !== featuredUpdate.slug);
    }
    return filteredUpdates;
  }, [filteredUpdates, featuredUpdate, selectedCategory, searchQuery]);

  const displayedUpdates = gridUpdates.slice(0, visibleCount);
  const hasMore = visibleCount < gridUpdates.length;

  const handleReset = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="shell py-12 lg:py-16">
      {/* Section Header */}
      <div className="mb-10">
        <p className="eyebrow">Announcements &amp; Insights</p>
        <h2 className="mt-2 text-h2 font-extrabold text-navy">Latest Updates</h2>
        <p className="mt-2 max-w-prose text-lead text-charcoal-70">
          Explore recent news, student visa guidelines, university admissions timelines, and announcements from Shine Consultant.
        </p>
      </div>

      {/* Category Pills & Search Bar */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pb-8 border-b border-navy/10">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            const count =
              category === 'All'
                ? initialUpdates.length
                : initialUpdates.filter((u) => u.category === category).length;

            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleCount(PAGE_SIZE);
                }}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-caption font-heading font-semibold transition-all duration-fast ${
                  isActive
                    ? 'bg-navy text-white shadow-sm'
                    : 'bg-white border border-navy/15 text-charcoal-70 hover:border-navy/40 hover:text-navy'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-micro ${
                    isActive ? 'bg-white/20 text-white' : 'bg-navy/5 text-charcoal-50'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-50" aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder="Search updates..."
            className="w-full rounded-md border border-navy/20 bg-white pl-10 pr-9 py-2 text-caption text-navy placeholder:text-charcoal-50 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-50 hover:text-navy"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Featured Highlight Card */}
      {featuredUpdate ? (
        <section aria-label="Featured update" className="mt-10 mb-14">
          <div className="rounded-xl border border-navy/10 bg-white shadow-card overflow-hidden transition-shadow duration-base hover:shadow-card-hover group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-sage/40">
                {featuredUpdate.featuredImage ? (
                  <img
                    src={featuredUpdate.featuredImage}
                    alt={featuredUpdate.featuredImageAlt || featuredUpdate.title}
                    className="h-full w-full object-cover transition-transform duration-slow ease-standard group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-navy text-white">
                    Featured Update
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <Badge tone="accent" className="shadow-sm">
                    Featured Update
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:p-10">
                <div>
                  <div className="flex items-center gap-3 text-caption text-charcoal-50 mb-3">
                    <span className="font-heading font-semibold text-accent uppercase tracking-wider text-micro">
                      {featuredUpdate.category}
                    </span>
                    <span aria-hidden="true">•</span>
                    {featuredUpdate.publishedAt ? (
                      <time dateTime={featuredUpdate.publishedAt}>
                        {new Date(featuredUpdate.publishedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </time>
                    ) : null}
                    {featuredUpdate.readingTime ? (
                      <>
                        <span aria-hidden="true">•</span>
                        <span>{featuredUpdate.readingTime}</span>
                      </>
                    ) : null}
                  </div>

                  <h2 className="font-heading text-h2 font-bold text-navy group-hover:text-accent transition-colors">
                    <Link href={`/latest/${featuredUpdate.slug}`}>
                      {featuredUpdate.title}
                    </Link>
                  </h2>

                  {featuredUpdate.shortDescription ? (
                    <p className="mt-4 text-body text-charcoal-70 leading-relaxed">
                      {featuredUpdate.shortDescription}
                    </p>
                  ) : null}
                </div>

                <div className="mt-8 pt-6 border-t border-navy/10">
                  <Button href={`/latest/${featuredUpdate.slug}`} variant="primary" size="md">
                    <span>Read Full Update</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Main Updates Grid */}
      {displayedUpdates.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-h3 font-bold text-navy">
              {selectedCategory === 'All' ? 'All Updates' : selectedCategory}
              <span className="ml-2 text-caption font-normal text-charcoal-50">
                ({filteredUpdates.length})
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayedUpdates.map((update, idx) => (
              <UpdateCard key={update.slug} update={update} priority={idx < 3} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore ? (
            <div className="mt-12 text-center">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              >
                Load More Updates
              </Button>
            </div>
          ) : null}
        </div>
      ) : (
        /* Empty State */
        <div className="py-12">
          <EmptyState
            icon={Newspaper}
            title="No updates found"
            description={
              searchQuery
                ? `No articles match "${searchQuery}" in ${selectedCategory}.`
                : `There are currently no updates in ${selectedCategory}.`
            }
            actionLabel="Reset filters"
            onAction={handleReset}
          />
        </div>
      )}
    </div>
  );
}
