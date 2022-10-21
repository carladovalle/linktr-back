import Router from "express";
import { addLike, getLikes, removeLike } from "../controllers/likesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/likes", authMiddleware, getLikes);
router.post("/likes", authMiddleware, addLike);
router.delete("/likes/:postId", authMiddleware, removeLike);

export default router;