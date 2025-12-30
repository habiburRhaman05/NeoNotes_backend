 //import the auth client
import { Request, Response } from "express";
import  postServices  from "./post.service"
import { Controller } from "../../types/controller";
import { createPostSchema } from "./post.schema";
import { sendError, sendSuccess } from "../../utils/apiResponse";
import { authClient } from "../../lib/auth-client";

const getAllPosts:Controller = async (req,res) =>{
    const allPosts = await postServices.fetchAllPosts();
    res.json({
        data:allPosts
    })
}
const createPost:Controller = async (req,res,next) =>{


    const newPost =  await postServices.createPostService(req.body);
return  sendSuccess(res,{
    statusCode:201,
  data:newPost,
    message:"post created successfully"
  })

}




const postControllers = {getAllPosts,createPost};
export default postControllers