"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PostItem } from "./MyPostCard";

interface PostFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Omit<PostItem, "id" | "createdAt"> & { id?: string }) => void;
  post?: PostItem | null;
}

export function PostFormDialog({ isOpen, onClose, onSubmit, post }: PostFormDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [tags, setTags] = useState("");
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setThumbnailUrl(post.thumbnailUrl);
      setTags(post.tags);
      setIsPremium(post.isPremium);
    } else {
      setTitle("");
      setContent("");
      setThumbnailUrl("");
      setTags("");
      setIsPremium(false);
    }
  }, [post, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: post?.id,
      title,
      content,
      thumbnailUrl: thumbnailUrl || "https://images.unsplash.com/photo-1495020689067-958852a6565d?w=800&auto=format&fit=crop&q=60",
      tags,
      isPremium,
      status: post?.status || "DRAFT",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300">
      {/* Modal dialog card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-in fade-in-50 zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
          <h3 className="text-lg font-bold text-foreground">
            {post ? "Edit Post" : "Create Post"}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Title input */}
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-sm font-semibold text-foreground">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder=""
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="rounded-xl border-border bg-card text-foreground"
            />
          </div>

          {/* Content text area */}
          <div className="space-y-1.5">
            <Label htmlFor="content" className="text-sm font-semibold text-foreground">
              Content
            </Label>
            <textarea
              id="content"
              rows={5}
              placeholder=""
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full rounded-xl border border-input bg-card p-3 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          {/* Thumbnail URL input */}
          <div className="space-y-1.5">
            <Label htmlFor="thumbnailUrl" className="text-sm font-semibold text-foreground">
              Thumbnail URL
            </Label>
            <Input
              id="thumbnailUrl"
              type="text"
              placeholder="https://..."
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              className="rounded-xl border-border bg-card text-foreground"
            />
          </div>

          {/* Tags input */}
          <div className="space-y-1.5">
            <Label htmlFor="tags" className="text-sm font-semibold text-foreground">
              Tags (comma separated)
            </Label>
            <Input
              id="tags"
              type="text"
              placeholder="tech, sports"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="rounded-xl border-border bg-card text-foreground"
            />
          </div>

          {/* Mark as Premium checkbox */}
          <div className="flex items-center gap-2 pt-2">
            <input
              id="isPremium"
              type="checkbox"
              checked={isPremium}
              onChange={(e) => setIsPremium(e.target.checked)}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary/45"
            />
            <Label htmlFor="isPremium" className="text-sm font-medium text-foreground cursor-pointer">
              Mark as premium content
            </Label>
          </div>

          {/* Footer Submit */}
          <div className="flex items-center justify-end pt-4 border-t border-border/40">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm px-6 py-2.5 shadow-sm transition-all focus:outline-none"
            >
              {post ? "Save Post" : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
