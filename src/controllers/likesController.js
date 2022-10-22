import { connection } from '../db/db.js';

async function addLike(req, res) {
	const { userId, postId } = req.body;

	try {
		await connection.query(
			`INSERT INTO likes ("userIdLike", "postId") VALUES ($1, $2);`,
			[userId, postId]
		);
		return res.status(200).send('like added');
	} catch (error) {
		return res.status(500).send(error);
	}
}

async function removeLike(req, res) {
	const { userId, postId } = req.body;

	try {
		await connection.query(
			`DELETE FROM likes WHERE "userIdLike"=$1 AND "postId"=$2;`,
			[userId, postId]
		);
		return res.status(200).send('like removed');
	} catch (error) {
		return res.status(500).send(error);
	}
}

export { addLike, removeLike };
