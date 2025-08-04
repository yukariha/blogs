import { marked } from "marked";
import { readdir } from "node:fs/promises";
import path from "path";
import sanitizeHtml from "sanitize-html";
import { type PostMetadata } from "@shared/types";

class BlogPost {
  constructor(
    public metadata: PostMetadata,
    public content: string,
  ) {}

  static parse(raw: string): BlogPost {
    const frontMatterRegex = /^\+\+\+\s*([\s\S]*?)\s*\+\+\+\s*/;
    const match = raw.match(frontMatterRegex);

    if (match === null) {
      throw new Error("No front matter found");
    }

    const tomlString = match[1];
    const content = raw.slice(match[0].length);

    if (tomlString !== undefined) {
      const metadata = Bun.TOML.parse(tomlString) as PostMetadata;

      if (metadata.createdAt && typeof metadata.createdAt === "string") {
        metadata.createdAt = new Date(metadata.createdAt);
        if (isNaN(metadata.createdAt.getTime())) {
          throw new Error("Invalid date format in createdAt");
        }
      } else {
        throw new Error("createdAt is missing or not a string");
      }

      return new BlogPost(metadata, content);
    } else {
      throw new Error("Couldn't parse metadata");
    }
  }

  async toHTML(): Promise<string> {
    const rawHTML = await marked.parse(this.content);
    const cleanHTML = sanitizeHtml(rawHTML, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
        "img",
        "pre",
        "code",
        "blockquote",
        "hr",
        "del",
        "sup",
        "sub",
        "kbd",
        "samp",
        "var",
      ]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "title", "loading"],
        a: ["href", "name", "target", "rel"],
        code: ["class"],
        th: ["align"],
        td: ["align"],
      },
      allowedSchemesByTag: {
        a: ["http", "https", "mailto", "tel"],
        img: ["http", "https", "data"],
      },
    });

    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${this.metadata.title}</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <div class="markdown-body">
      ${cleanHTML}
    </div>
  </body>
  </html>
  `;
  }

  static async getAllPosts(dir?: string): Promise<BlogPost[]> {
    const postsDir = dir ?? "./posts";
    const posts = [];

    try {
      const fileNames = await readdir(postsDir);

      for (const fileName of fileNames) {
        const filePath = path.join(postsDir, fileName);
        const file = await Bun.file(filePath).text();
        posts.push(this.parse(file));
      }
    } catch (err: any) {
      console.error(err.message);
    }
    return posts;
  }

  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.getAllPosts();

    const filteredPosts = posts.filter((value) => value.metadata.slug === slug);

    return filteredPosts[0] ?? null;
  }
}

export default BlogPost;
