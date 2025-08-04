import { useEffect, useState } from "react";
import { useRoute } from "wouter";

function PostPage() {
  const [postHTML, setPostHTML] = useState("");
  const [isMatch, routeParams] = useRoute("/post/:slug");

  useEffect(() => {
    if (isMatch === false || routeParams.slug === "") return;
    const url = "http://localhost:3000";
    fetch(`${url}/posts/${routeParams?.slug}`)
      .then((response) => response.text())
      .then((data) => setPostHTML(data))
      .catch((err) => {
        console.error(err.message);
        setPostHTML("<p>Post not found.</p>");
      });
  }, [isMatch, routeParams]);

  return (
    <article className="prose dark:prose-invert prose-img:rounded-xl mx-auto max-w-3xl dark:text-zinc-200">
      <div dangerouslySetInnerHTML={{ __html: postHTML }} />
    </article>
  );
}

export default PostPage;
