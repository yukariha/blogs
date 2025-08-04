import { useEffect, useState } from "react";

function PostPage() {
  const [postHTML, setPostHTML] = useState("");

  useEffect(() => {
    const url = "http://10.28.250.166:3000";
    fetch(`${url}/posts/1`)
      .then((response) => response.text())
      .then((data) => setPostHTML(data))
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <article className="prose dark:prose-invert prose-img:rounded-xl mx-auto max-w-3xl dark:text-zinc-200">
      <div dangerouslySetInnerHTML={{ __html: postHTML }} />
    </article>
  );
}

export default PostPage;
