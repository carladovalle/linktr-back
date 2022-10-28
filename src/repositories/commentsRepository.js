import { connection } from '../db/db.js';

async function createCommentData(userId, postId, text) {
    return connection.query(
        `INSERT INTO comments ("userId", "postId", text) VALUES ($1, $2, $3);`,
        [userId, postId, text]
    );
}

async function getCommentData(postId) {
    return connection.query(`
        SELECT c.*, u.username as author, u.image
        FROM comments c
        JOIN users u ON u.id = c."userId"
        WHERE c."postId" = $1
        ORDER BY c.id ASC;
    `,[postId]
    );
}

async function getCommentQtdData(postId) {
    return connection.query(
		`SELECT posts.content, comments."postId"
        FROM posts 
        JOIN comments 
        ON comments."postId" = posts.id
        WHERE comments."postId" = $1;`,
		[postId]
    );
}

export { createCommentData, getCommentData, getCommentQtdData}