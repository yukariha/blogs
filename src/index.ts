import express from "express";
import { readdir } from "fs/promises";
import { marked } from "marked";
import { PrismaClient } from "./generated/prisma";

const app = express();
const port = 3000;
const host = "0.0.0.0";

function renderBlog(title: string, content: string): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <div class="markdown-body">
      ${content}
    </div>
  </body>
  </html>
  `;
}
type PostMetadata = {
  title: string;
  createdAt: string;
};

type PostData = {
  metadata: PostMetadata;
  content: string;
};

function parseBlog(raw: string) {
  const frontMatterRegex = /^\+\+\+\s*([\s\S]*?)\s*\+\+\+\s*/;
  const match = raw.match(frontMatterRegex);

  if (match === null) {
    throw new Error("No front matter found");
  }

  const tomlString = match[1];
  const content = raw.slice(match[0].length);

  const metadata = Bun.TOML.parse(tomlString) as PostMetadata;

  return { metadata, content };
}

const prisma = new PrismaClient();
let cache: Map<number, string> = new Map();

// Middleware
app.use(express.static("public"));
app.use(express.json());

app.get("/posts", async (req, res) => {
  // const files = await readdir("posts");

  const posts = await prisma.post.findMany();

  // res.json(files.map((value) => value.replace(/\D/g, "")));

  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const data = req.body;

  const newPost = await prisma.post.create({
    data: {
      title: data.title,
      filePath: data.filePath,
    },
  });

  res.json(newPost);
});

app.get("/posts/:id", async (req, res) => {
  const id = Number(req.params.id);
  let fileText: string;

  try {
    if (cache.has(id)) {
      fileText = cache.get(id);
      console.log(cache);
    } else {
      fileText = await Bun.file(`posts/post${id}.md`).text();
      cache.set(id, fileText);
      console.log(cache);
    }
  } catch {
    return res
      .status(404)
      .send(
        `<h1>404 Not found</h1>Blog post with an id of ${id} does not exist.`,
      );
  }

  const { metadata, content } = parseBlog(fileText);
  const htmlContent = await marked.parse(content);

  res.send(renderBlog(`Blog #${id}`, htmlContent));
});

app.listen(port, host, () => {
  console.log(`Listening on port ${port}...`);
});
