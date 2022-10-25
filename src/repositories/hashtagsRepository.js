import { connection } from '../db/db.js';

async function getHashtags() {
	return connection.query(`
    SELECT hashtag, COUNT(hashtag) FROM hashtags GROUP BY "hashtag" 
    ORDER BY COUNT DESC
    LIMIT 10`);
}

async function listHashtagPosts(hashtag) {
	return connection.query(
		`SELECT 
		    posts.*,
			users.name,
			users.image,
			users.id AS "userId",
			json_build_object('url', metadatas.url, 'title', metadatas.title, 'image', metadatas.image, 'description', metadatas.description) AS "urlInfos"
		FROM posts
		JOIN users 
			ON posts."userId" = users.id
		JOIN metadatas 
			ON posts.id = metadatas."postId"
		WHERE posts.content ILIKE $1
		GROUP BY posts.id, users.name, users.image, users.id, metadatas.url, metadatas.title, metadatas.image, metadatas.description
		ORDER BY posts."id" DESC
		LIMIT 20`,
		[`%${hashtag}%`]
	);
}

export { getHashtags, listHashtagPosts };
