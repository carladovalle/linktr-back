import express from 'express';
import { searchUsers } from '../controllers/searchController.js';

const router = express.Router();

router.get('/users/search/:word', searchUsers);

export default router;
