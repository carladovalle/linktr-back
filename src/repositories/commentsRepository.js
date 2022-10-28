import { connection } from '../db/db.js';

async function createCommentData(userId, postId, text) {
    return connection.query(
        `INSERT INTO comments ("userId", "postId", text) VALUES ($1, $2, $3);`,
        [userId, postId, text]
    );
}

async function getCommentData(userId, postId) {
    return connection.query(`
        SELECT 
            comments.*, 
            users.name AS author, 
            users.image, 
            (
				SELECT followers.id
				FROM followers
				WHERE followers."profileUserId" = users.id
				AND followers."followerUserId" = $1
			) AS "isFollowing"
        FROM comments
        JOIN users
            ON comments."userId" = users.id
        WHERE comments."postId" = $2
        ORDER BY comments.id ASC;
    `,[userId, postId]
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