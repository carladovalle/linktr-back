import Router from "express";
import { changeFollows, getFollows, userFollows } from "../controllers/followsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/follows/:followedId", authMiddleware, getFollows);
router.get("/follows", authMiddleware, userFollows);
router.post("/follows", authMiddleware, changeFollows);

export default router;