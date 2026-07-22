"use client";

import React, { useState } from "react";
import { NewsCard, NewsItem } from "./NewsCard";
import { Lock, Sparkles, Search, Newspaper, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PremiumNewsListClientProps {
  initialNews: NewsItem[];
  hasActiveSubscription: boolean;
}

// Fallback high-quality mock premium news data if the database is empty
const MOCK_PREMIUM_NEWS: NewsItem[] = [
  {
    id: "prem-1",
    title: "Inside the AI Chip War: How GPU Architectures are Evolving for 2027",
    description: "An in-depth technical breakdown of next-generation lithography, high-bandwidth memory (HBM4) integration, and the proprietary interconnects driving the next wave of supercomputers.",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60",
    isPremium: true,
    author: {
      name: "Dr. Rachel Vance",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
    },
    createdAt: "2026-07-22T09:00:00.000Z",
    views: 890,
    readTime: "12 min read",
  },
  {
    id: "prem-2",
    title: "Quantum Cryptography: Preparing for the Post-Quantum Security Shockwaves",
    description: "As quantum superiority approaches, banking conglomerates and nation-states are rushing to implement lattice-based cryptography standards. Here is what security architects must know.",
    category: "Cybersecurity",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60",
    isPremium: true,
    author: {
      name: "Vikram Mehta",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
    createdAt: "2026-07-21T15:45:00.000Z",
    views: 650,
    readTime: "9 min read",
  },
  {
    id: "prem-3",
    title: "The Death of SaaS? Why AI-Native Micro-Agents are Disrupting Software Pricing",
    description: "Traditional seat-based licensing is collapsing under the weight of hyper-automated workflows. We explore the emerging tokens-per-execution models and self-assembling apps.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    isPremium: true,
    author: {
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    },
    createdAt: "2026-07-20T11:20:00.000Z",
    views: 1200,
    readTime: "8 min read",
  },
];

const CATEGORIES = ["All", "Technology", "Cybersecurity", "Business"];

export function PremiumNewsListClient({ initialNews, hasActiveSubscription }: PremiumNewsListClientProps) {
  // Use fetched news, but fallback to mock data if none is returned to guarantee a beautiful presentation
  const newsList = initialNews.length > 0 ? initialNews : MOCK_PREMIUM_NEWS;

  // Let client toggle subscription simulation for preview/demo flow testing
  const [isSubscribed, setIsSubscribed] = useState(hasActiveSubscription);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = newsList.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
              <Sparkles className="h-4.5 w-4.5" />
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Exclusive Premium Insights
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mt-1.5">
            Deep-dives, expert reviews, and industry analysis updated daily for our members.
          </p>
        </div>

        {/* Demo Switcher Toggle */}
        <button
          onClick={() => setIsSubscribed(!isSubscribed)}
          className="inline-flex self-start items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-600 transition-all hover:bg-amber-500/20 dark:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
        >
          <span>Demo Access: {isSubscribed ? "👑 Active Member" : "🔒 Guest"}</span>
          <span className="text-[10px] bg-amber-500 text-white rounded px-2 py-0.5 font-semibold">Toggle</span>
        </button>
      </div>

      {isSubscribed ? (
        /* SUBSCRIBED USER: Interactive search, categories & premium articles */
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-amber-500 text-white shadow-md shadow-amber-500/15"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute top-2.5 left-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search premium articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Dynamic Grid layout */}
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 rounded-2xl bg-muted p-4">
                <Newspaper className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground">No matches found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-1">
                We couldn't find any premium articles matching your search criteria.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* GUEST USER: Blurred preview cards with interactive membership CTA box */
        <div className="relative">
          {/* Locked Grid (Blurred backdrop) */}
          <div className="grid grid-cols-1 gap-6 opacity-30 sm:grid-cols-2 lg:grid-cols-3 pointer-events-none select-none filter blur-[3px]">
            {newsList.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>

          {/* Checkout subscription Call-To-Action Box */}
          <div className="absolute inset-0 flex items-center justify-center p-4 bg-gradient-to-t from-background via-background/60 to-transparent">
            <div className="max-w-md w-full rounded-2xl border border-amber-500/20 bg-card/80 p-8 text-center shadow-xl backdrop-blur-md">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Unlock Premium Insights
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                Gain instant access to our expert breakdowns, post-quantum research, SaaS trend indices, and executive updates.
              </p>
              
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/payment"
                  className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-amber-500/10 transition-all hover:bg-amber-600 hover:shadow-lg focus:outline-none"
                >
                  View Subscription Plans
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <button
                  onClick={() => setIsSubscribed(true)}
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-card/50 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted"
                >
                  Quick Unlock (Demo)
                </button>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Premium plans start at $4.99/mo. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
