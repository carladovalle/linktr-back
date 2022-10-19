import express from 'express';
import * as postsController from '../controllers/postsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/posts/publish', authMiddleware, postsController.sendPost);

export default router;
