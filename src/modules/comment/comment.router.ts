import express, { Router } from "express";
import { isAuthenticate } from "../../middleware/auth-middlewares";
import { validate } from "../../middleware/validate";
import { commentSchemas } from "./comment.schema";
import { asyncHandler } from "../../utils/asyncHandler";
import { commentControllers } from "./comment.controller";

const commentRouter: Router = express.Router();

commentRouter.post(
  "/create-new",
  isAuthenticate(),
  validate(commentSchemas.createComment),
  asyncHandler(commentControllers.createNewComment)
);
commentRouter.put(
  "/:id/update",
  isAuthenticate(),
  // validate(commentSchemas.updateSchema),
  asyncHandler(commentControllers.updateComment)
);
commentRouter.delete(
  "/:id/delete",
  isAuthenticate(),
  asyncHandler(commentControllers.deleteComment)
);

export default commentRouter;
