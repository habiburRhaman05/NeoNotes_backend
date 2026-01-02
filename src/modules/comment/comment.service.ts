import { CommentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import postServices from "../post/post.service";
import { Comment } from "./comment.type";

type CreateCommentInput = Omit<Comment, "id" | "updatedAt" | "createdAt">;

const createCommentService = async (
  commentData: CreateCommentInput
): Promise<{
  id: number;
  updatedAt: Date;
  createdAt: Date;
  content: string;
  authorId: string;
  postId: number;
  parentId: number | null;
  status: CommentStatus;
}> => {
  try {
    const post = await postServices.fetchPostDeatils(commentData.postId);

    if (!post) {
      throw new AppError("post not found", 404);
    }

    const result = await prisma.comment.create({
      data: commentData,
    });

    return result;
  } catch (error) {
    console.error(error);
    throw new AppError("Failed to create comment");
  }
};

const deleteCommentService = async (
  commentId: number,
  authorId: string
): Promise<void> => {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    throw new AppError("Comment not found", 404);
  }

  if (comment.authorId !== authorId) {
    throw new AppError("You do not have permission to delete this", 403);
  }

  await prisma.comment.delete({
    where: { id: commentId },
  });
};

const updateCommentService = async (
  commentId: number,
  authorId: string,
  data: { content?: string; status?: CommentStatus }
): Promise<Comment> => {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });

  if (!comment) throw new AppError("Comment not found", 404);
  if (comment.authorId !== authorId) throw new AppError("Unauthorized", 403);

  return await prisma.comment.update({
    where: { id: commentId },
    data,
  });
};

export const commentServices = {
  createCommentService,
  updateCommentService,
  deleteCommentService,
};
