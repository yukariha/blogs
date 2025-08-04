import type { PostMetadata } from "@shared/types";
import PostCard from "./PostCard";

type IndexPageProps = {
  posts: PostMetadata[];
};

function IndexPage({ posts }: IndexPageProps) {
  return (
    <div className="md:columns-2 lg:columns-3 xl:columns-4">
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.slug} post={post} />)
      ) : (
        <p className="text-gray-700 dark:text-zinc-400">Loading posts...</p>
      )}
    </div>
  );
}

export default IndexPage;
