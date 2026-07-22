"use client";

import React from "react";

interface NewsSkeletonProps {
  count?: number;
}

export function NewsSkeleton({ count = 6 }: NewsSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-card/50 p-0 shadow-sm"
        >
          {/* Image skeleton */}
          <div className="aspect-video w-full animate-pulse bg-muted/60" />

          {/* Content skeleton */}
          <div className="flex flex-1 flex-col p-5">
            {/* Meta skeleton */}
            <div className="mb-4 flex items-center gap-3">
              <div className="h-3 w-20 animate-pulse rounded bg-muted" />
              <div className="h-1 w-1 rounded-full bg-muted" />
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
            </div>

            {/* Title skeleton */}
            <div className="mb-3 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            </div>

            {/* Description skeleton */}
            <div className="mb-4 space-y-2 flex-1">
              <div className="h-3 w-full animate-pulse rounded bg-muted/70" />
              <div className="h-3 w-full animate-pulse rounded bg-muted/70" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-muted/70" />
            </div>

            {/* Divider */}
            <div className="my-2 border-t border-border/20" />

            {/* Footer skeleton */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 animate-pulse rounded-full bg-muted" />
                <div className="h-3 w-16 animate-pulse rounded bg-muted" />
              </div>
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
