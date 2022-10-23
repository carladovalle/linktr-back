import express from 'express';
import { getUserById, searchUsers } from '../controllers/usersController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users/search/:word', authMiddleware, searchUsers);
router.get('/user/:id', authMiddleware, getUserById);

export default router;
