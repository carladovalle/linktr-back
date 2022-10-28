import express from 'express';
import { sendPost, listPosts, editPost, deletePost, haveNewPost, repost, getRepostsNumber} from '../controllers/postsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/posts/publish', authMiddleware, sendPost);
router.put('/posts/edit/:postId', authMiddleware, editPost);
router.delete('/posts/delete/:postId', authMiddleware, deletePost);
router.get('/posts', authMiddleware, listPosts);
router.get('/haveNewPost', haveNewPost)
router.post('/repost', authMiddleware, repost)
router.get('/repostNumber', getRepostsNumber)

export default router;