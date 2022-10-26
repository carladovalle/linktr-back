import { connection } from '../db/db.js';

async function createCommentData(userId, postId, text) {
    return connection.query(
        `INSERT INTO comments ("userId", "postId", text) VALUES ($1, $2, $3);`,
        [userId, postId, text]
    );
}

export { createCommentData }