import express, { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import postControllers from "./post.controller";
import { validate } from "../../middleware/validate";
import { createPostSchema } from "./post.schema";


const router = express.Router();


router.get("/all",asyncHandler(postControllers.getAllPosts));
router.post("/create-new",validate(createPostSchema),asyncHandler(postControllers.createPost));
const postRouter:Router = router;
export default postRouter