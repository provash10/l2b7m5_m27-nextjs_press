import React from "react";
import { MyPostList } from "../../_components/MyPostList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Posts - Dashboard",
  description: "Manage your editorial posts and drafts on Next.js Press.",
};

export default function UserMyPostsPage() {
  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-5xl px-6">
        <MyPostList />
      </div>
    </main>
  );
}
