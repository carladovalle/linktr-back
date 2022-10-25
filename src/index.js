import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoute.js';
import postsRoute from './routes/postsRoute.js';
import usersRoute from './routes/usersRoute.js';
import likesRoute from './routes/likesRoute.js';
import hashtagRoutes from './routes/hashtagsRoute.js';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/authMiddleware.js';

//PODE APAGAR DEPOIS DE DAR O REFRESH
import urlMetadata from 'url-metadata';
import { connection } from './db/db.js';

const server = express();
dotenv.config();
server.use(cors());
server.use(express.json());

//PODE APAGAR DEPOIS DE DAR O REFRESH
server.get('/refresh', async (req, res) => {
	const query = await connection.query(`
	SELECT posts.*, users.name, users.image, users.id AS "userId" FROM posts
			JOIN users ON posts."userId" = users.id
			ORDER BY posts."id" DESC 
			LIMIT 20`);
	for (let i = 0; i < query.rows.length; i++) {
		const metadata = await urlMetadata(query.rows[i].link, {
			timeout: 20000,
			descriptionLength: 120,
		});
		const id = query.rows[i].id;
		await connection.query(
			'INSERT INTO metadatas (url, title, image, description, "postId") VALUES($1, $2, $3, $4, $5)',
			[metadata.url, metadata.title, metadata.image, metadata.description, id]
		);
	}
	res.send('dados inseridos com sucesso');
});

server.get('/status', authMiddleware, (req, res) => res.sendStatus(200));

server.use(authRoutes);
server.use(postsRoute);
server.use(usersRoute);
server.use(likesRoute);
server.use(hashtagRoutes);

server.listen(process.env.PORT, () =>
	console.log(`A mágica acontece no ${process.env.PORT}`)
);
