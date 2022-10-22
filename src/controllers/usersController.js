import { connection } from '../db/db.js';
import urlMetaData from 'url-metadata';

async function searchUsers(req, res) {
	const { word } = req.params;
	const wordWithJoker = word + '%';

	try {
		const userList = await connection.query(
			'SELECT id, name, image FROM users WHERE name ILIKE $1',
			[wordWithJoker]
		);
		return res.status(200).send(userList.rows);
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

async function getUserById(req, res) {
	const { id } = req.params;

	try {


		const userPosts = await connection.query(
			`
			SELECT 
				posts.*, users.name, users.image 
			FROM posts
			JOIN users 
				ON posts."userId" = users.id
			WHERE users.id = $1
			ORDER BY posts."id" DESC 
			LIMIT 20`,
			[id]
		);
		const list = [];

		for (let i = 0; i < userPosts.rows.length; i++) {
			const metadata = await urlMetaData(userPosts.rows[i].link);
			list.push({
				...userPosts.rows[i],
				urlInfos: {
					url: metadata.url,
					title: metadata.title,
					image: metadata.image,
					description: metadata.description,
				},
			});
		}

		return res.status(200).send(list);
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

export { searchUsers, getUserById };
