import { NewsCard } from "@/app/(publicGroup)/_components/news/NewsCard";
import { IPost } from "@/lib/types";
import { getPremiumNews } from "../../_actions/getPremiumNews";

export async function PremiumNewsList({
  searchTerm,
  tags,
}: {
  searchTerm?: string;
  tags?: string[];
}) {
  const result = await getPremiumNews();

  if (!result.success || !result.data?.length) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No premium news found.
      </p>
    );
  }

  let posts: IPost[] = result.data || [];

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    posts = posts.filter(
      (post: IPost) =>
        post.title.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term) ||
        (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(term)))
    );
  }

  if (tags && tags.length > 0) {
    posts = posts.filter(
      (post: IPost) =>
        post.tags && post.tags.some((tag) => tags.includes(tag))
    );
  }

  if (posts.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No premium news matches your search criteria.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: IPost) => (
          <NewsCard key={post.id} news={post} />
        ))}
      </div>
    </div>
  );
}

