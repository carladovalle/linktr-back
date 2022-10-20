import express from "express";
import { listPosts } from "../controller/postControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/posts", listPosts)

export default router