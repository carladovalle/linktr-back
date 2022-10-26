import express from 'express';
import { createComment, getComment, getCommentsQtd } from '../controllers/commentsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/comments/:postId', authMiddleware, createComment);
router.get('/comments/:postId', authMiddleware, getComment);
router.get("/commentsQtd/:postId", authMiddleware, getCommentsQtd);

export default router;