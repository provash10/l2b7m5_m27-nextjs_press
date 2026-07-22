import React from "react";
import Link from "next/link";
import { ArrowRight, Newspaper, Shield, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicNewsList } from "./_components/news/PublicNewsList";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-background pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-muted/30 border-b border-border/40 py-20 lg:py-28">
        {/* Glow decoration */}
        <div className="absolute top-1/2 left-1/4 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 -z-10 h-80 w-80 rounded-full bg-amber-500/5 blur-3xl" />

        <div className="mx-auto max-w-6xl px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-wide text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            WELCOMING NEXTJS PRESS v1.0
          </div>
          
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-none tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Where Precision Journalism Meets Modern Web Tech
          </h1>
          
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg lg:text-xl leading-relaxed">
            Stay ahead with curated industry analysis, deep technical dives, and breaking business news. Tailored for software engineering and startup leaders.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button asChild size="lg" className="rounded-xl">
              <Link href="/news" className="cursor-pointer">
                Explore Feed
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <Link href="/payment" className="cursor-pointer">
                View Pricing Plans
              </Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="pt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs text-muted-foreground font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-emerald-500" /> Verified Insights</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-amber-500" /> 4.9/5 Rating</span>
            <span className="flex items-center gap-1.5"><Newspaper className="h-4 w-4 text-primary" /> Daily Editorial</span>
          </div>
        </div>
      </section>

      {/* Featured News list preview */}
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <PublicNewsList />
      </section>
    </main>
  );
}
