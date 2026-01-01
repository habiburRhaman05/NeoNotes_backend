import { fromNodeHeaders } from "better-auth/node";
// Your Better Auth instance
import express, { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { auth } from "../../lib/auth";
import { isAuthenticate } from "../../middleware/auth-middlewares";
import { userControllers } from "./user.controller";



const router = express.Router();


router.get("/profile", isAuthenticate(), asyncHandler(userControllers.getProfileDetails));
router.post("/change-password", isAuthenticate(), asyncHandler(userControllers.changePassword));


const userRouter:Router = router;
export default userRouter