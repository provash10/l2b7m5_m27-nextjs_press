"use client";

import React from "react";
import { Edit3, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PostItem {
  id: string;
  title: string;
  content: string;
  thumbnailUrl: string;
  tags: string;
  isPremium: boolean;
  status: "DRAFT" | "PUBLISHED" | "UNDER_REVIEW";
  createdAt: string;
  commentsCount?: number;
}

interface MyPostCardProps {
  post: PostItem;
  onEdit: (post: PostItem) => void;
}

export function MyPostCard({ post, onEdit }: MyPostCardProps) {
  const { title, content, status, createdAt, commentsCount = 0 } = post;

  const statusColors = {
    PUBLISHED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    DRAFT: "bg-slate-500/10 text-slate-600 border-slate-500/20",
    UNDER_REVIEW: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  };

  return (
    <div className="relative rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      {/* Top row: Status and Edit button */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase",
            statusColors[status] || statusColors.DRAFT
          )}
        >
          {status}
        </span>
        <button
          onClick={() => onEdit(post)}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground transition-all hover:bg-muted focus:outline-none"
        >
          <Edit3 className="h-3.5 w-3.5" />
          Edit
        </button>
      </div>

      {/* Post Title */}
      <h3 className="text-xl font-bold text-foreground mb-2">
        {title}
      </h3>

      {/* Post Content description snippet */}
      <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
        {content}
      </p>

      {/* Footer row: Date and Comments count */}
      <div className="flex items-center justify-between border-t border-border/40 pt-4 text-xs text-muted-foreground">
        <span>
          {new Date(createdAt).toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <span className="flex items-center gap-1.5">
          <MessageSquare className="h-3.5 w-3.5" />
          {commentsCount}
        </span>
      </div>
    </div>
  );
}
