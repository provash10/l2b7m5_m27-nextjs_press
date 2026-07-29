import { Suspense } from "react";
import { MyPostList } from "../../_components/MyPostList";
import { MyPostSkeleton } from "../../_components/MyPostSkeleton";
import { PostFormDialog } from "../../_components/PostFormDialog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Posts - Dashboard",
  description: "Manage your editorial posts and drafts on Next.js Press.",
};

const UserMyPostsPage = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">My Posts</h1>
          <p className="text-sm text-muted-foreground">
            Create and manage your own news posts.
          </p>
        </div>
        <PostFormDialog mode="create" />
      </div>

      <Suspense fallback={<MyPostSkeleton />}>
        <MyPostList />
      </Suspense>
    </div>
  );
};

export default UserMyPostsPage;
