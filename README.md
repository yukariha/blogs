# Blogs
> I'm very creative with names I know.

A full stack application built with Express.js and React. It lets you write blog posts as markdown files with TOML front matter metadata, which the app automatically parses and displays.

## Writing Blog Posts

Your blog posts live in the `posts `directory as markdown (`.md`) files. Each post starts with TOML front matter that describes its metadata.

### Example Post Front Matter (TOML)

```toml
+++
title = "My First Blog Post"
description = "An introduction to the blog."
createdAt = 2025-08-04T16:00:00
slug = "my-first-blog-post"
image = "/images/blog1.webp"
author = "Apothecary"
authorPicture = "/images/apothecary.webp"
tags = ["intro", "welcome"]
+++

# My First Blog Post

Here is the content of the blog post...
```

## Supported Front Matter Fields

| Field         | Type     | Description                         | Required |
|---------------|----------|-----------------------------------|----------|
| title         | string   | The post title                    | Yes      |
| description   | string   | A short description or summary   | Yes      |
| createdAt     | datetime | The post creation date/time       | Yes      |
| slug          | string   | URL-friendly identifier for post | Yes      |
| image         | string   | URL or path to a featured image  | Yes      |
| author        | string   | Name of the author                | No       |
| authorPicture | string   | URL or path to author’s picture  | No       |
| tags          | array    | List of tags/categories           | No       |


## How It Works
- The backend reads and parses all markdown posts from the posts folder, extracting front matter and content.
- The frontend fetches this data from the backend and shows post previews and full posts with a nice UI.

## Getting Started
1. Create your markdown post files with TOML front matter as shown above and place them inside the posts directory.
2. Run the backend server, it will automatically parse new or updated posts.
3. Run the frontend app to browse, and read your posts.
