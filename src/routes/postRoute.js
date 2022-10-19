import express from "express";
import * as postsControllers from "../controller/postControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/posts", postsControllers.listPosts)
router.put("/posts/edit/:id", postsControllers.editPost)
router.post("/posts/create", postsControllers.createPost)

export default router