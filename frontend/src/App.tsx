import { useEffect, useState } from "react";
import type { PostMetadata } from "@shared/types";
import { Route, Switch } from "wouter";
import PostPage from "./components/PostPage";
import IndexPage from "./components/IndexPage";

function App() {
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
      <header className="mb-8">
        <h1 className="text-center font-serif text-3xl font-semibold text-gray-900 dark:text-zinc-200">
          Blogs
        </h1>
      </header>

      <Switch>
        <Route path="/">
          <IndexPage posts={posts} />
        </Route>
        <Route path="/posts/:slug" component={PostPage} />
        <Route>404 - Not Found</Route>
      </Switch>
    </div>
  );
}

export default App;
