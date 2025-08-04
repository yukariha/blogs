import express from "express";
import BlogPost from "./blog-post.ts";

const app = express();
const port = 3000;
const host = "0.0.0.0";

// Middleware
app.use(express.static("public"));
app.use(express.json());

app.get("/posts", async (_, res) => {
  const posts = await BlogPost.getAllPosts();
  res.json(posts.map((post) => post.metadata));
});

app.get("/posts/:slug", async (req, res) => {
  const slug = req.params.slug;
  const post = await BlogPost.getPostBySlug(slug);

  if (post === null) {
    return res.status(404).send(`<h1>404 Not found</h1>`);
  }

  res.send(await post.toHTML());
});

app.listen(port, host, () => {
  console.log(`Listening on port ${port}...`);
});
