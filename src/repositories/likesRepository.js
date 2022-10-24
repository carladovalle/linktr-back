import { connection } from '../db/db.js';

async function getUserLikes(userId) {
	return await connection.query(
		`SELECT * FROM likes WHERE "userIdLike" = $1`,
		[userId]
	)
}

async function getTotalLikes(postId) {
	return await connection.query(
		`SELECT users.name as "likerName", likes."userIdLike" FROM users 
	JOIN likes 
	ON likes."userIdLike" = users.id
	WHERE likes."postId" = $1;`,
		[postId]
	);
}

async function likePost(userId, postId) {
	return connection.query(
		`INSERT INTO likes ("userIdLike", "postId") VALUES ($1, $2);`,
		[userId, postId]
	);
}

async function deleteLike(userId, postId) {
	return connection.query(
		`DELETE FROM likes WHERE "userIdLike" = $1 AND "postId" = $2;`,
		[userId, postId]
	);
}

export { getUserLikes, getTotalLikes, likePost, deleteLike };
