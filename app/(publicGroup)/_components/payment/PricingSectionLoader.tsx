"use client";

import React from "react";

export function PricingSectionLoader() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Title skeleton */}
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="h-5 w-28 animate-pulse rounded-full bg-muted" />
        <div className="h-10 w-80 max-w-full animate-pulse rounded-lg bg-muted" />
        <div className="h-4 w-96 max-w-full animate-pulse rounded bg-muted/70" />
        
        {/* Toggle skeleton */}
        <div className="flex items-center gap-3 pt-6">
          <div className="h-4 w-12 animate-pulse rounded bg-muted" />
          <div className="h-6 w-12 animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        </div>
      </div>

      {/* Grid plans skeleton */}
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col justify-between rounded-2xl border border-border/40 bg-card/60 p-8 shadow-sm"
          >
            <div className="space-y-6">
              {/* Header skeleton */}
              <div className="space-y-2">
                <div className="h-6 w-24 animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted/60" />
              </div>

              {/* Price skeleton */}
              <div className="flex items-baseline gap-1 py-2">
                <div className="h-10 w-24 animate-pulse rounded bg-muted" />
                <div className="h-4 w-12 animate-pulse rounded bg-muted/60" />
              </div>

              {/* Divider */}
              <div className="border-t border-border/20" />

              {/* Features list skeleton */}
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-pulse rounded-full bg-muted" />
                    <div className="h-3 w-4/5 animate-pulse rounded bg-muted/80" />
                  </div>
                ))}
              </div>
            </div>

            {/* Button skeleton */}
            <div className="mt-8">
              <div className="h-10 w-full animate-pulse rounded-xl bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
