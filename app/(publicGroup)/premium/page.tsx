import React from "react";
import { PremiumNewsList } from "../_components/news/PremiumNewsList";
import { Sparkles, Trophy, BookOpen, Clock } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Hub - Next.js Press",
  description: "Access curated analytics, technical walkthroughs, and industry-grade insider information.",
};

export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Top Welcome Panel */}
      <section className="relative overflow-hidden bg-muted/40 border-b border-border/40 py-12 md:py-16">
        <div className="absolute top-0 right-0 -z-10 h-full w-[400px] bg-radial-gradient from-amber-500/10 to-transparent blur-2xl" />
        
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                <Sparkles className="h-3 w-3" />
                Exclusive Member Area
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                Premium News Hub
              </h1>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Welcome back to your member dashboard. Here is your daily digest of deep-dives, tech trends, and financial insights curated by our executive editorial team.
              </p>
            </div>

            {/* Quick stats board */}
            <div className="grid grid-cols-3 gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm shrink-0 md:w-96">
              <div className="text-center space-y-1">
                <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="text-sm font-extrabold text-foreground">150+</div>
                <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Reports</div>
              </div>

              <div className="text-center space-y-1 border-x border-border/80">
                <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                  <Trophy className="h-4 w-4" />
                </div>
                <div className="text-sm font-extrabold text-foreground">Exclusive</div>
                <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Content</div>
              </div>

              <div className="text-center space-y-1">
                <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="text-sm font-extrabold text-foreground">Daily</div>
                <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Updates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main List Section */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        {/* Render Premium news list. Note: defaults subscription simulation toggle button inside component */}
        <PremiumNewsList hasActiveSubscription={false} />
      </section>
    </main>
  );
}
