import express from 'express';
import * as postsController from '../controllers/postsController.js';

const router = express.Router();

router.post('/posts/publish', postsController.sendPost);

export default router;
