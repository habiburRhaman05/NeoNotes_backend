import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreatePostInput } from "./post.schema";
import { createPostInput, Post } from "./post.types";

const fetchAllPosts = async () => {
  const result = await prisma.post.findMany();
  return result || [];
};

const createPostService = async (
  postInputData:any): Promise<Post> => {

try {
    const result = await prisma.post.create({data:postInputData})

  return result
} catch (error) {
   throw new  AppError("inva")
}

};

const postServices = { fetchAllPosts,createPostService };

export default postServices;
