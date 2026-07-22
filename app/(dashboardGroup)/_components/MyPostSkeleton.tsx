"use client";

import React from "react";

interface MyPostSkeletonProps {
  count?: number;
}

export function MyPostSkeleton({ count = 3 }: MyPostSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-border/40 bg-card/50 p-6 shadow-sm space-y-4"
        >
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div className="h-5 w-20 animate-pulse rounded bg-muted" />
            <div className="h-6 w-16 animate-pulse rounded bg-muted" />
          </div>

          {/* Title row */}
          <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />

          {/* Snippet content rows */}
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted/70" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted/70" />
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between border-t border-border/20 pt-4">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-4 w-8 animate-pulse rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
