

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



export type PostQueries = {
  search?: string | undefined;
  user?: string | undefined;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED" | undefined;
  tags?: string[] | undefined;
  isFeatured?: boolean | undefined;

  // page?: number;
  // limit?: number;

  // sortBy?: "createdAt" | "viwes" | "title";
  // order?: "asc" | "desc"; // sortBy?: "createdAt" | "viwes" | "title";
  // order?: "asc" | "desc";
};
