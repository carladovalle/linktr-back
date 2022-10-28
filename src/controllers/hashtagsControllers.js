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
    const { offset, limit } = req.query

        try {
	        const query = await listHashtagPosts(hashtag, offset, limit )	
		res.send(query.rows)
	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}

export { listHashtags, findPostByHashtag }
