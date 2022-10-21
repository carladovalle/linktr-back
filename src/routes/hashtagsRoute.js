import express from 'express';
import { listHashtags, findPostByHashtag } from '../controllers/hashtagsControllers.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/hashtags', authMiddleware, listHashtags);
router.get('/hashtags/:hashtag', authMiddleware, findPostByHashtag);

export default router;
