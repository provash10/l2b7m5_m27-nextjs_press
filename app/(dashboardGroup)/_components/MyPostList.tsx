/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPost } from "@/lib/types";
import { MyPostCard } from "./MyPostCard";
import { Newspaper } from "lucide-react";
import { getMyPosts } from "../_actions/myPostsActions";

export async function MyPostsList() {
  const result =await getMyPosts();

  // const result = {
  //   success: true,
  //   data: [
  //     {
  //       id: "1",
  //       title: "My Post 1",
  //       content: "This is the content of my post 1.",
  //       thumbnail: "https://via.placeholder.com/150",
  //       isFeatured: true,
  //       status: "DRAFT",
  //       tags: ["tag1", "tag2"],
  //       views: 100,
  //       isPremium: false,
  //       authorId: "1",
  //       createdAt: new Date().toISOString(),
  //       updatedAt: new Date().toISOString(),
  //     }
  //   ]
  // };

  if (!result.success || !result.data?.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 py-16 text-center max-w-xl">
        <div className="mb-4 rounded-full bg-muted p-4">
          <Newspaper className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground">No posts drafted</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Click on "Create Post" button above to add your first article.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 max-w-xl">
      {result.data.map((post: any) => (
        <MyPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

// Alias for compatibility
export { MyPostsList as MyPostList };
