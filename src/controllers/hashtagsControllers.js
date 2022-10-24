import { connection } from '../db/db.js';
import urlMetaData from "url-metadata";

async function listHashtags(req, res) {
	try {
			const query = await connection.query(`
			SELECT hashtag, COUNT(hashtag) FROM hashtags GROUP BY "hashtag" 
            ORDER BY COUNT DESC
            LIMIT 10`)
			
			res.send(query.rows)

	} catch (error) {
			console.log(error)
			return res.sendStatus(500)
	}
}

async function findPostByHashtag(req, res) {
    const {hashtag} = req.params
    const list = []

	try {
		const query = await connection.query(`
			SELECT posts.*, users.name, users.image FROM posts 
            JOIN users ON posts."userId" = users.id
            WHERE content ILIKE $1 
            ORDER BY id desc 
            LIMIT 20`
            , [`%${hashtag}%`])

            for(let i = 0 ; i < query.rows.length ; i++){
                const metadata = await urlMetaData(query.rows[i].link, {timeout: 20000, descriptionLength: 120})
                list.push({
                        ...query.rows[i],
                        urlInfos:{
                                url: metadata.url,
                                title: metadata.title,
                                image: metadata.image,
                                description: metadata.description
                        }
                })
        }
			
		res.send(list)

	} catch (error) {
			console.log(error)
			return res.sendStatus(500)
	}
}

export { listHashtags, findPostByHashtag }
