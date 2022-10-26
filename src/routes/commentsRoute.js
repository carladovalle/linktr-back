import express from 'express';
import { createComment, getComment } from '../controllers/commentsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/comments/:postId', authMiddleware, createComment);
router.get('/comments/:postId', authMiddleware, getComment);

export default router;