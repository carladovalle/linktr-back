import { connection } from "../db/db.js";

async function getIsFollowed (userId, followedId) {

    try {
        const IsFollowed = (await connection.query(`SELECT * FROM followers 
        WHERE "followerUserId" = $1 AND "profileUserId" = $2`, [userId, followedId])).rows;

        if (IsFollowed.length !== 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return res.status(500).send("follows not available");
    }

}

async function getUserFollows (userId) {

    try {
        const userFollows = (await connection.query(`SELECT "profileUserId" FROM followers 
        WHERE "followerUserId" = $1`, [userId])).rows;

        return userFollows;
    } catch (error) {
        return res.status(500).send("user follows not available");
    }

}

async function unfollow (userId, followedId) {

    try {
        await connection.query(`DELETE FROM followers 
        WHERE "followerUserId" = $1 AND "profileUserId" = $2`, [userId, followedId]);

        return;
    } catch (error) {
        return res.status(500).send("unable to remove follow");
    }

}

async function follow (userId, followedId) {

    try {
        await connection.query(`INSERT INTO followers ("followerUserId", "profileUserId") 
        VALUES ($1, $2)`, [userId, followedId]);

        return;
    } catch (error) {
        return res.status(500).send("unable to add follow");
    }

}

export { getIsFollowed, getUserFollows, unfollow, follow };