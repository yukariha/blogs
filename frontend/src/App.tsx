import { useEffect, useState } from "react";
import { type PostMetadata } from "@shared/types";

function App() {
  const url = "http://localhost:3000";
  const [posts, setPosts] = useState<PostMetadata[]>([]);

  useEffect(() => {
    fetch(`${url}/posts`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
    console.log(posts);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-200 p-8">
      <div className="flex flex-col gap-4">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div
              key={post.slug ?? index}
              className="flex flex-col overflow-hidden rounded-xl bg-white"
            >
              <img src={post.image} className="" alt="" />
              <div className="p-8">
                <p className="text-xl font-semibold">{post.title}</p>
                <p className="text-md font-medium text-neutral-500">
                  {post.createdAt}
                </p>
                <p>{post.author}</p>
                <p>
                  {post.tags?.length ? "Tags: " + post.tags?.join(", ") : " "}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading posts...</p>
        )}
      </div>
    </div>
  );
}

export default App;
