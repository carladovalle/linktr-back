import express from 'express';
import { sendPost, listPosts } from '../controllers/postsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/posts/publish', authMiddleware, sendPost);
router.get('/posts', authMiddleware, listPosts);

export default router;
