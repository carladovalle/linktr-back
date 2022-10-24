import { connection } from '../db/db.js';

async function getHashtags() {
	return connection.query(`
    SELECT hashtag, COUNT(hashtag) FROM hashtags GROUP BY "hashtag" 
    ORDER BY COUNT DESC
    LIMIT 10`);
}

async function listHashtagPosts(hashtag){
    return connection.query(`
			SELECT posts.*, users.name, users.image FROM posts 
            JOIN users ON posts."userId" = users.id
            WHERE content ILIKE $1 
            ORDER BY id desc 
            LIMIT 20`
            , [`%${hashtag}%`])
}


export {getHashtags, listHashtagPosts}
