import type { PostMetadata } from "@shared/types";
import PlaceholderImage from "../assets/default.svg";
import { Link } from "wouter";

type PostCardProps = {
  post: PostMetadata;
};

function PostCard({ post }: PostCardProps) {
  return (
    <div
      key={post.slug}
      className="mx-2 mb-6 overflow-hidden rounded-3xl bg-white shadow-lg md:max-w-sm dark:border dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-zinc-900/50"
    >
      <img
        src={post.image ?? PlaceholderImage}
        className="h-62 w-full object-cover"
        alt=""
      />
      <div className="flex flex-col gap-1 p-6">
        <p className="text-xl font-semibold text-gray-900 dark:text-zinc-100">
          {post.title}
        </p>
        <p className="text-md font-medium text-gray-500 dark:text-zinc-400">
          {new Date(post.createdAt).toLocaleDateString("gbr", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <p className="font-medium text-gray-700 dark:text-zinc-300">
          {post.description ??
            "This appears to be a mysterious post with no description?"}
        </p>
        <p className="text-gray-500 dark:text-zinc-500">
          {post.tags?.length ? "Tags: " + post.tags?.join(", ") : " "}
        </p>
        <div className="card-footer mt-8 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <img
              src={post.authorPicture ?? PlaceholderImage}
              alt="Author's Picture"
              className="h-8 w-8 rounded-full"
            />
            <p
              className={
                post.author
                  ? "font-medium text-gray-800 dark:text-zinc-200"
                  : "inline-flex items-center gap-1 rounded-md bg-gray-200 px-2 py-0.5 text-sm font-medium text-gray-600 dark:bg-zinc-700 dark:text-zinc-400"
              }
              title={post.author ? undefined : "Anonymous user"}
            >
              {post.author ?? "Anon"}
            </p>
          </div>
          <Link
            href={`/posts/${post.slug}`}
            className="block break-inside-avoid text-blue-500 hover:text-blue-400"
          >
            Read Post
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
