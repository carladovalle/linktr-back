import { connection } from '../db/db.js';

async function findUsers(word) {
	return connection.query(
		`SELECT 
			users.id, 
			users.name, 
			users.image, 
			followers."profileUserId"
		FROM users
		LEFT JOIN followers
			ON users.id = followers."profileUserId"
		WHERE users.name ILIKE $1
		GROUP BY users.id, followers."profileUserId"
		ORDER BY followers."profileUserId"`,
		[`%${word}%`]
	);
}

async function findUserById(id) {
	return connection.query('SELECT * FROM users WHERE id = $1', [Number(id)]);
}

async function getUserInfo(id) {
	return connection.query(
		`SELECT 
			id, name, image 
		FROM users 
		WHERE id = $1`, [
		Number(id),
	]);
}

async function listUserPosts(id, offset, limit) {
	return connection.query(
		`
		SELECT 
			posts.*,
			users.name,
			users.image,
			users.id AS "userId",
			json_build_object('url', metadatas.url, 'title', metadatas.title, 'image', metadatas.image, 'description', metadatas.description) AS "urlInfos"
		FROM posts
		JOIN metadatas 
			ON posts.id = metadatas."postId"
		JOIN users 
			ON posts."userId" = users.id
		WHERE users.id = $1
		GROUP BY posts.id, users.name, users.image, users.id, metadatas.url, metadatas.title, metadatas.image, metadatas.description
		ORDER BY posts."id" DESC
		LIMIT $3
		OFFSET $2`,
		[Number(id), offset, limit]
	);
}

export { findUsers, findUserById, listUserPosts, getUserInfo };
