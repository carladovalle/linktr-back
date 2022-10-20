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


async function editPost (req, res) {

    const { id } = req.params;

    const {content, link, userId } = req.body;

    if (id) {

        try {

            await connection.query(`UPDATE posts SET (content, link, "userId") = ('${content}', '${link}', '${userId}') WHERE id = $1;`, [id]);
    
            res.sendStatus(200);
    
        } catch (error) {
            return res.status(422).send(error.message);
        }

    } else {
        return res.status(404).status('ID nulo');
    }

}

async function createPost (req, res) {

    try {

        const {content, link, userId } = req.body;

        await connection.query(`INSERT INTO posts (content, link, "userId") VALUES ($1, $2, $3);`, [content, link, userId]);

        res.sendStatus(201);

    } catch (error) {
        return res.status(422).send(error.message);
    }

}

async function createUser (req, res) {

    try {

        const {email, username, password, name, image } = req.body;

        await connection.query(`INSERT INTO users (email, username, password, name, image) VALUES ($1, $2, $3, $4, $5);`, [email, username, password, name, image]);
        
        res.sendStatus(201);

    } catch (error) {
        return res.status(422).send(error.message);
    }

}

async function deletePost (req, res) {

    const { id } = req.params;

    if (id) {

        try {

            await connection.query(`DELETE FROM posts WHERE id = $1;`, [id]);
    
            return res.sendStatus(200);
    
        } catch (error) {
            return res.status(422).send(error.message);
        }

    } else {
        return res.status(404).status('ID nulo');
    }

}

export {
    listPosts, 
    editPost, 
    createPost, 
    createUser,
    deletePost
}