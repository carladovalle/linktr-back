import { connection } from '../db/db.js';

async function getLikes (req, res) {
	const { userId } = res.locals.session;

	try {
		const likes = (await connection.query(`SELECT * FROM likes WHERE "userId" = $1`, [userId])).rows;
		res.status(200).send(likes);
	} catch (error) {
		return res.status(500).send(error);
	}
	
}

async function addLike(req, res) {
	const { userId } = res.locals.session;
	const { postId } = req.body;

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
	const { userId } = res.locals.session;
	const { postId } = req.body;

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

export { getLikes, addLike, removeLike };
