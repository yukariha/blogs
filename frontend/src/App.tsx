import { useEffect, useState } from "react";
import type { PostMetadata } from "@shared/types";
import { Link, Route, Switch } from "wouter";
import PostPage from "./components/PostPage";
import IndexPage from "./components/IndexPage";
import ReactLogo from "./assets/react.svg";

function App() {
  const url = "http://10.28.250.166:3000";
  // const url = "http://localhost:3000":
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
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow p-8">
        <header className="mb-8">
          <Link
            href="/"
            className="block text-center font-serif text-3xl font-semibold text-gray-900 transition hover:text-gray-600 dark:text-zinc-200 dark:hover:text-zinc-400"
          >
            Blogs
          </Link>
        </header>

        <main>
          <Switch>
            <Route path="/">
              <IndexPage posts={posts} />
            </Route>
            <Route path="/posts/:slug" component={PostPage} />
            <Route>404 - Not Found</Route>
          </Switch>
        </main>
      </div>
      <footer className="mt-8 w-full border-t border-gray-300 py-12 dark:border-zinc-700">
        <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-3 px-4">
          <p className="flex items-center gap-1 text-gray-800 dark:text-zinc-200">
            Made with ❤️ using{" "}
            <img src={ReactLogo} alt="" className="h-5 w-5" />
            React by Apothecary
          </p>
          <p className="text-sm text-gray-600 dark:text-zinc-400">
            <a
              href="https://github.com/yukariha/blogs"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition hover:text-gray-900 dark:hover:text-zinc-200"
            >
              View source code on GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
