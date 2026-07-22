"use client";

import React, { useState } from "react";
import { Plus, Newspaper } from "lucide-react";
import { toast } from "sonner";
import { MyPostCard, PostItem } from "./MyPostCard";
import { PostFormDialog } from "./PostFormDialog";

const INITIAL_POSTS: PostItem[] = [
  {
    id: "post-1",
    title: "My Post 1",
    content: "This is the content of my post 1.",
    thumbnailUrl: "",
    tags: "",
    isPremium: false,
    status: "DRAFT",
    createdAt: "2026-07-22T00:00:00.000Z",
    commentsCount: 0,
  },
];

export function MyPostList() {
  const [posts, setPosts] = useState<PostItem[]>(INITIAL_POSTS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<PostItem | null>(null);

  // Handle submit from modal
  const handlePostSubmit = (submittedData: Omit<PostItem, "id" | "createdAt"> & { id?: string }) => {
    if (submittedData.id) {
      // Edit mode
      setPosts((prev) =>
        prev.map((item) =>
          item.id === submittedData.id
            ? {
                ...item,
                title: submittedData.title,
                content: submittedData.content,
                thumbnailUrl: submittedData.thumbnailUrl,
                tags: submittedData.tags,
                isPremium: submittedData.isPremium,
                status: submittedData.status,
              }
            : item
        )
      );
      toast.success("Post updated successfully!");
    } else {
      // Create mode
      const newPost: PostItem = {
        ...submittedData,
        id: `post-${Date.now()}`,
        status: "DRAFT", // default new posts as Draft
        createdAt: new Date().toISOString(),
        commentsCount: 0,
      };
      setPosts((prev) => [...prev, newPost]);
      toast.success("Post created successfully!");
    }
    setEditingPost(null);
  };

  const handlePostEdit = (post: PostItem) => {
    setEditingPost(post);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Top Header section matching user screenshot */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            My Posts
          </h1>
          <p className="text-sm text-muted-foreground">
            Create and manage your own news posts.
          </p>
        </div>

        {/* Create Post Button matching user screenshot green styling */}
        <button
          onClick={() => {
            setEditingPost(null);
            setIsDialogOpen(true);
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#006940] hover:bg-[#005232] text-white px-5 py-2.5 text-sm font-semibold tracking-wide shadow-sm transition-all focus:outline-none"
        >
          <Plus className="h-4 w-4" />
          Create Post
        </button>
      </div>

      {/* Grid of posts */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 max-w-xl">
          {posts.map((post) => (
            <MyPostCard
              key={post.id}
              post={post}
              onEdit={handlePostEdit}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 py-16 text-center max-w-xl">
          <div className="mb-4 rounded-full bg-muted p-4">
            <Newspaper className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No posts drafted</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Click on "+ Create Post" button above to add your first article.
          </p>
        </div>
      )}

      {/* Post Modal Dialog Form */}
      <PostFormDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingPost(null);
        }}
        onSubmit={handlePostSubmit}
        post={editingPost}
      />
    </div>
  );
}
