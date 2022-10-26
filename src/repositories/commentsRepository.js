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
    )
}

export { createCommentData, getCommentData }