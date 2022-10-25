import urlMetaData from "url-metadata";
import { getHashtags, listHashtagPosts } from '../repositories/hashtagsRepository.js';

async function listHashtags(req, res) {
	try {
			const query = await getHashtags();
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
		const query = await listHashtagPosts(hashtag)
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
