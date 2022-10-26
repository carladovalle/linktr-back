import { connection } from '../db/db.js';

async function createCommentData(userId, postId, text) {
    return connection.query(
        `INSERT INTO comments ("userId", "postId", text) VALUES ($1, $2, $3);`,
        [userId, postId, text]
    );
}

async function getCommentData(postId) {
    return connection.query(
        `SELECT * FROM comments WHERE "postId" = $1;`,
        [postId]
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