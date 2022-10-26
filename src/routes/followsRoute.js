import Router from "express";
import { changeFollows, getFollows } from "../controllers/followsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/follows/:followedId", authMiddleware, getFollows);
router.post("/follows", authMiddleware, changeFollows);

export default router;