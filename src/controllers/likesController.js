import { deleteLike, getTotalLikes, getUserLikes, likePost } from '../repositories/likesRepository.js';

async function getLikes (req, res) { 
	const { userId } = res.locals.session;

	try {
		const likes = await getUserLikes(userId)
		res.status(200).send(likes.rows);
	} catch (error) {
		return res.status(500).send(error);
	}
	
}

async function getLikesQtd (req, res) { 
	const { userId } = res.locals.session;
	const { postId } = req.params;

	try {
		const likes = await getTotalLikes(postId)
		const totalLikes = {likes: likes.rows, userId};
		res.status(200).send(totalLikes);
	} catch (error) {
		return res.status(500).send(error);
	}
	
}

async function addLike(req, res) {
	const { userId } = res.locals.session;
	const { postId } = req.body;

	try {
		await likePost(userId, postId)
		return res.status(200).send('like added');
	} catch (error) {
		return res.status(500).send(error);
	}
}

async function removeLike(req, res) {
	const { userId } = res.locals.session;
	const { postId } = req.params;

	try {
		await deleteLike(userId, postId)
		return res.status(200).send('like removed');
	} catch (error) {
		return res.status(500).send(error);
	}
}

export { getLikes, getLikesQtd, addLike, removeLike };
