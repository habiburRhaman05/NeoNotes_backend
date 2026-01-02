export enum CommentStatus {
 "APPROVED",
 "REJECT"
}

export interface Comment {
  id?: number;
  content: string;
  authorId: string;
  postId: number;
  parentId?: number | null;
  status:  "APPROVED" | "REJECT";
  createdAt?: Date;
  updatedAt?: Date;
}