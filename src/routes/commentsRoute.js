import express from 'express';
import { createComment } from '../controllers/commentsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/comments/:postId', authMiddleware, createComment);

export default router;