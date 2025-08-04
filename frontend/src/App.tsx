import { useEffect, useState } from "react";
import type { PostMetadata } from "@shared/types";
import PostCard from "./components/PostCard";

function App() {
  // const url = "http://localhost:3000";
  const url = "http://10.28.250.166:3000";
  const [posts, setPosts] = useState<PostMetadata[]>([]);

  useEffect(() => {
    fetch(`${url}/posts`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 p-8 dark:bg-zinc-900">
      <div className="md:columns-2 lg:columns-3 xl:columns-4">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard post={post} />)
        ) : (
          <p className="text-gray-700 dark:text-zinc-400">Loading posts...</p>
        )}
      </div>
    </div>
  );
}

export default App;
