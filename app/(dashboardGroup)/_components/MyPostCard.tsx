"use client";

import React, { useTransition } from "react";
import { Loader2, MessageSquare, Sparkles, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { IPost } from "@/lib/types";
import { PostFormDialog } from "./PostFormDialog";
import { Button } from "@/components/ui/button";
import { deletePost } from "../_actions/myPostsActions";
import { toast } from "sonner";

interface MyPostCardProps {
  post: IPost | any;
}

export function MyPostCard({ post }: MyPostCardProps) {
  const { id, title, content, status, createdAt, _count } = post;
  const commentsCount = _count?.comments ?? 0;
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    startTransition(async () => {
      const res = await deletePost(id);
      if (res?.success) {
        toast.success(res.message || "Post deleted successfully");
      } else {
        toast.error(res?.message || "Failed to delete post");
      }
    });
  };

  const statusColors: Record<string, string> = {
    PUBLISHED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    DRAFT: "bg-slate-500/10 text-slate-600 border-slate-500/20",
    UNDER_REVIEW: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    ARCHIVED: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  };

  return (
    <div className="relative rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      {/* Top row: Status, Premium badge, Edit, and Delete button */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase",
              statusColors[status] || statusColors.DRAFT
            )}
          >
            {status}
          </span>
          {post.isPremium && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 text-white px-2.5 py-0.5 text-xs font-semibold">
              <Sparkles className="h-3 w-3" />
              <span>Premium</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <PostFormDialog mode="edit" post={post} />
          <Button
            variant="outline"
            size="sm"
            disabled={isPending}
            onClick={handleDelete}
            className="h-8 w-8 p-0 rounded-lg border-border/70 text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all"
            title="Delete post"
          >
            {isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
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
          {createdAt ? new Date(createdAt).toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          }) : ""}
        </span>
        <span className="flex items-center gap-1.5">
          <MessageSquare className="h-3.5 w-3.5" />
          {commentsCount}
        </span>
      </div>
    </div>
  );
}
