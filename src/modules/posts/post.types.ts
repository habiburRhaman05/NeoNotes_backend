

export interface Post {
  id: number;
  title: string;
  content: string;
  thumbnail?: string | null;
  isFeatured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  tags: string[];
  viwes: number;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type createPostInput = {
    title: string;
    content: string;
};

