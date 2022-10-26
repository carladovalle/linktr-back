import { connection } from '../db/db.js';

async function publishPost(content, link, userId) {
	return connection.query(
		'INSERT INTO posts (content, link, "userId") VALUES($1, $2, $3) RETURNING id',
		[content, link, userId]
	);
}

async function addHashtag(hashtags, valuesString) {
	return connection.query(
		`INSERT INTO hashtags (hashtag) VALUES ${valuesString} RETURNING id`,
		hashtags
	);
}

async function insertIntoMiddleTable(valuesString, id, hashtagsIdList) {
	return connection.query(
		`INSERT INTO "postsHashtags" ("postId", "hashtagId") VALUES ${valuesString}`,
		[id, ...hashtagsIdList]
	);
}

async function publishPostWithoutContent(link, userId) {
	return connection.query(
		'INSERT INTO posts (link, "userId") VALUES($1, $2) RETURNING id',
		[link, userId]
	);
}

async function listAllPosts(offset, limit) {
	return connection.query(`
		SELECT 
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
		GROUP BY posts.id, users.name, users.image, users.id, metadatas.url, metadatas.title, metadatas.image, metadatas.description
		ORDER BY posts."id" DESC
		LIMIT $1
		OFFSET $2	
		`,[limit, offset]);
}

async function findPost(postId) {
	return connection.query(`SELECT * FROM posts WHERE id = $1;`, [postId]);
}

async function updateLinkAndContent(link, content, postId) {
	return connection.query(
		`UPDATE posts SET link = $1, content = $2 WHERE id = $3;`,
		[link, content, postId]
	);
}

async function updateContent(contentResolve, postId) {
	return connection.query(`UPDATE posts SET content = $1 WHERE id = $2`, [
		contentResolve,
		postId,
	]);
}

async function deleteLikeData(postId) {
	return connection.query(`DELETE FROM likes WHERE "postId" = $1;`, [postId]);
}

async function deleteMiddleTableData(postId) {
	return connection.query(`DELETE FROM "postsHashtags" WHERE "postId" = $1;`, [
		postId,
	]);
}

async function deletePostData(postId) {
	return connection.query(`DELETE FROM posts WHERE id = $1;`, [postId]);
}

async function insertMetadata({ url, title, image, description }, id) {
	return connection.query(
		'INSERT INTO metadatas (url, title, image, description, "postId") VALUES($1, $2, $3, $4, $5)',
		[url, title, image, description, id]
	);
}

export {
	publishPost,
	addHashtag,
	insertIntoMiddleTable,
	publishPostWithoutContent,
	listAllPosts,
	findPost,
	updateLinkAndContent,
	updateContent,
	deleteLikeData,
	deleteMiddleTableData,
	deletePostData,
	insertMetadata,
};
