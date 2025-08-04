import { useEffect, useState } from "react";

type PostMetadata = {
  title: string;
  description: string;
  createdAt: string;
  slug: string;
  author?: string;
  tags?: string[];
};

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
      <h1>Hello, world!</h1>

      <div className="columns-3 gap-4">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div
              key={post.slug ?? index}
              className="bg-white flex flex-col p-8"
            >
              <span>Post #{index + 1}</span>
              <p>{post.title}</p>
              <p>{post.createdAt}</p>
              <p>{post.author}</p>
              <p>{post.createdAt}</p>
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
