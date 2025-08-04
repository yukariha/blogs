export interface PostMetadata {
  title: string;
  description: string;
  createdAt: Date;
  slug: string;
  image: string;
  author?: string;
  authorPicture?: string;
  tags?: string[];
}
