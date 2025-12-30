import express from "express";
import { authControllers } from "./auth.controller";

const router = express.Router();
router.post("/forgot-password", authControllers.forgotPassword);
router.post("/reset-password", authControllers.resetPassword);

export default router;