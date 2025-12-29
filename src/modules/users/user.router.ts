import { fromNodeHeaders } from "better-auth/node";
// Your Better Auth instance
import express, { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { auth } from "../../lib/auth";



const router = express.Router();



router.get("/api/me", async (req, res) => {
 	const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
	return res.json(session);
});

const userRouter:Router = router;
export default userRouter