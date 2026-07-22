import React from "react";
import { PublicNewsList } from "../_components/news/PublicNewsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News Feed - Next.js Press",
  description: "Browse the latest free and public news updates and editorial pieces.",
};

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-6xl px-4">
        <PublicNewsList />
      </div>
    </main>
  );
}
