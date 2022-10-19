import Router from "express";
import { addLike, removeLike } from "../controllers/likesController.js";

const router = Router();

router.post("/likes", addLike);
router.delete("/likes", removeLike);

export default router;