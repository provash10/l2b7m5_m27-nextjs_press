"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Clock, Eye, Lock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  content?: string;
  category: string;
  image: string;
  isPremium: boolean;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  views?: number;
  readTime?: string;
}

import { IPost } from "@/lib/types";
import Image from "next/image";

interface NewsCardProps {
  news: NewsItem | IPost;
}

export function NewsCard({ news }: NewsCardProps) {
  const id = news.id;
  const title = news.title;
  const isPremium = news.isPremium;
  const createdAt = news.createdAt;
  const views = news.views ?? 120;

  const description = (news as any).description || (news as any).content || "";
  const category = (news as any).category || "General";
  const readTime = (news as any).readTime || "5 min read";
  const post = {
    ...news,
    thumbnail: (news as any).image || (news as any).thumbnail || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=60"
  };
  const authorName = news.author?.name || "Author";
  const authorAvatar = (news.author as any)?.avatar || 
                       (news.author as any)?.profilePhoto || 
                       `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(authorName)}`;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md dark:border-border/30 dark:bg-card/50">
      {/* Image Wrapper */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {/* <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        /> */}
        <Image
          src={post.thumbnail} 
          unoptimized
          width={500}
          height={500}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Badges container */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="rounded-full bg-background/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold tracking-wide text-foreground shadow-sm dark:bg-background/80">
            {category}
          </span>
          
          {isPremium && (
            <span className="flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-md animate-pulse">
              <Lock className="h-3 w-3" />
              PREMIUM
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Meta details */}
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readTime}
          </span>
          {views > 0 && (
            <>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {views} views
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-snug tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
          <Link href={`/news/${id}`} className="focus:outline-none">
            <span className="absolute inset-0 z-10" />
            {title}
          </Link>
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Separator */}
        <div className="my-3 border-t border-border/40" />

        {/* Footer info (Author & Action) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={authorAvatar}
              alt={authorName}
              className="h-7 w-7 rounded-full object-cover ring-1 ring-border"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                  authorName
                )}`;
              }}
            />
            <span className="text-xs font-semibold text-foreground/80">
              {authorName}
            </span>
          </div>

          <div className="relative z-20 flex items-center gap-1.5 text-xs font-bold text-primary transition-all duration-200 group-hover:translate-x-1">
            <span>Read Article</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </article>
  );
}
