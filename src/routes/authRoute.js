import express from "express";
import { allowUserAccess, login, register } from "../controllers/authController.js";
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post("/sign-up",register)
router.post("/sign-in", login)
router.get("/access/auth", authMiddleware, allowUserAccess)

export default router