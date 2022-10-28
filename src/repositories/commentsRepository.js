import { connection } from '../db/db.js';

async function createCommentData(userId, postId, text) {
    return connection.query(
        `INSERT INTO comments ("userId", "postId", text) VALUES ($1, $2, $3);`,
        [userId, postId, text]
    );
}

async function getCommentData(postId) {
    return connection.query(`
        SELECT comments.*, users.name as author, users.image, followers."profileUserId"
        FROM comments
        LEFT JOIN followers
            ON comments."userId" = followers."profileUserId"
        LEFT JOIN users
            ON comments."userId" = users.id
        WHERE comments."postId" = $1
        ORDER BY comments.id ASC;
    `,[postId]
    );
}

async function getCommentQtdData(postId) {
    return connection.query(
		`SELECT
	        COUNT(id) AS "countComments"
        FROM comments
        WHERE "postId" = $1;`,
		[postId]
    );
}

// async function searchFollowers(profileId, followerId){
//     return connection.query(
// 		`SELECT * FROM followers WHERE "profileUserId" = $1 AND "followerUserId" = $2`,
// 		[profileId, followerId]
//     );
// }

export { createCommentData, getCommentData, getCommentQtdData}