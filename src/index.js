import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoute.js';
import postsRoute from './routes/postsRoute.js';
import usersRoute from './routes/usersRoute.js';
import likesRoute from './routes/likesRoute.js';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/authMiddleware.js';

const server = express();
dotenv.config();
server.use(cors());
server.use(express.json());

server.get('/status', authMiddleware, (req,res) => res.sendStatus(200));

server.use(authRoutes);
server.use(postsRoute);
server.use(usersRoute);
server.use(likesRoute);

server.listen(process.env.PORT, () =>
	console.log(`A mágica acontece no ${process.env.PORT}`)
);