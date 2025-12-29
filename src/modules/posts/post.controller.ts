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
  sendSuccess(res,{
    statusCode:201,
    data:newPost,
    message:"post created successfully"
  })

}


const signup:Controller =async (req,res) =>{
  

  const {email,password,name} = req.body
  
    const { data, error } = await authClient.signUp.email({
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        callbackURL: "/home" // A URL to redirect to after the user verifies their email (optional)
    }, {
        onRequest: (ctx) => {
            //show loading
        },
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
        },

  })

}


const postControllers = {getAllPosts,createPost};
export default postControllers