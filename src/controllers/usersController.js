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
		const user = await connection.query('SELECT * FROM users WHERE id = $1', [
			Number(id),
		]);

		if (user.rows.length === 0) {
			return res.status(404).send('There are no users with this id.');
		}

		const userPosts = await connection.query(
			`
			SELECT 
				posts.*, users.name, users.image 
			FROM posts
			RIGHT JOIN users 
				ON posts."userId" = users.id
			WHERE users.id = $1
			ORDER BY posts."id" DESC 
			LIMIT 20`,
			[id]
		);
		const list = [];

		if (userPosts.rows[0].link === null) {
			return res.status(200).send(userPosts.rows);
		}

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
		console.log(error);
		return res.status(500).send(error.message);
	}
}

export { searchUsers, getUserById };
