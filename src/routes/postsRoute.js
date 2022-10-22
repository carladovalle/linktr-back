import express from 'express';
import { sendPost, listPosts, editPost, deletePost } from '../controllers/postsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/posts/publish', authMiddleware, sendPost);
router.get('/posts', listPosts);
router.put('/posts/edit/:postId', authMiddleware, editPost);
router.delete('/posts/delete/:postId', authMiddleware, deletePost);

export default router;
