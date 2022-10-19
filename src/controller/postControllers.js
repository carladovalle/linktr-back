import { connection } from "../db/db.js"
import urlMetaData from "url-metadata";

async function listPosts(req, res) {
    
    try {
        const list = []
        const query = await connection.query(`
        SELECT posts.*, users.name, users.image FROM posts
            JOIN users ON posts."userId" = users.id
            ORDER BY posts."id" DESC 
            LIMIT 20`)

        for(let i = 0 ; i < query.rows.length ; i++){
            const metadata = await urlMetaData(query.rows[i].link)
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

export {
    listPosts
}