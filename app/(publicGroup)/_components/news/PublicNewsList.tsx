"use client";

import React, { useState } from "react";
import { NewsCard, NewsItem } from "./NewsCard";
import { Search, Filter, Newspaper } from "lucide-react";

// Mock public news data for presentation/design
const MOCK_PUBLIC_NEWS: NewsItem[] = [
  {
    id: "pub-1",
    title: "Next.js 16 Announces Groundbreaking React Server Components Features",
    description: "Discover the latest enhancements in Next.js 16 including advanced routing configurations, faster build caching mechanisms, and complete out-of-the-box partial pre-rendering.",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800&auto=format&fit=crop&q=60",
    isPremium: false,
    author: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    },
    createdAt: "2026-07-20T10:00:00.000Z",
    views: 450,
    readTime: "4 min read",
  },
  {
    id: "pub-2",
    title: "Global Markets Stabilize as Tech Stocks Lead Economic Recovery",
    description: "Major financial indices rebounded today as strong quarterly reports from major consumer tech companies bolstered investor confidence and eased inflation fears.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=60",
    isPremium: false,
    author: {
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    },
    createdAt: "2026-07-19T14:30:00.000Z",
    views: 290,
    readTime: "6 min read",
  },
  {
    id: "pub-3",
    title: "SpaceX Successfully Launches the Next-Gen Climate Monitoring Satellite",
    description: "The Falcon Heavy rocket lifted off successfully from Cape Canaveral, carrying a state-of-the-art payload designed to monitor greenhouse emissions with high precision.",
    category: "Science",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&auto=format&fit=crop&q=60",
    isPremium: false,
    author: {
      name: "Marcus Aurelius",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
    createdAt: "2026-07-18T08:15:00.000Z",
    views: 610,
    readTime: "5 min read",
  },
  {
    id: "pub-4",
    title: "Designing for the Future: How AI is Reshaping Modern Architecture",
    description: "From generative design tools to smart building materials, see how architects are utilizing artificial intelligence to create sustainable, energy-efficient workspaces.",
    category: "Design",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60",
    isPremium: false,
    author: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    },
    createdAt: "2026-07-17T11:45:00.000Z",
    views: 340,
    readTime: "7 min read",
  },
  {
    id: "pub-5",
    title: "The Ultimate Guide to Remote Work Ergonomics & Productivity",
    description: "Learn how to optimize your desk setup, avoid repetitive strain injuries, and structure your workday to keep motivation high without burnout.",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=60",
    isPremium: false,
    author: {
      name: "David Vane",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    },
    createdAt: "2026-07-15T09:00:00.000Z",
    views: 520,
    readTime: "4 min read",
  },
  {
    id: "pub-6",
    title: "Traditional Hand-Drawn Animation Making a Comeback in Indie Gaming",
    description: "A look into how independent game developers are shunning 3D renderers in favor of painstaking frame-by-frame illustration for their latest hit titles.",
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60",
    isPremium: false,
    author: {
      name: "Leo Sterling",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    },
    createdAt: "2026-07-14T16:20:00.000Z",
    views: 280,
    readTime: "8 min read",
  },
];

const CATEGORIES = ["All", "Technology", "Business", "Science", "Design", "Lifestyle", "Gaming"];

export function PublicNewsList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = MOCK_PUBLIC_NEWS.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header and filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Latest Public News
          </h2>
          <p className="text-sm text-muted-foreground">
            Explore free, high-quality analytical articles and news updates.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full max-w-xs">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-border bg-card py-2 pl-9 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="no-scrollbar -mx-4 flex overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
        <div className="flex gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <Newspaper className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No news articles found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-1">
            We couldn't find any public articles matching your current search criteria. Try using other terms.
          </p>
        </div>
      )}
    </div>
  );
}
