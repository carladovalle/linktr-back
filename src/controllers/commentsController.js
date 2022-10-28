import {
	createCommentData,
	getCommentData,
	getCommentQtdData,
} from '../repositories/commentsRepository.js';

async function createComment(req, res) {
	const { userId } = res.locals.session;
	const { text } = req.body;
	const { postId } = req.params;

	try {
		await createCommentData(userId, postId, text);
		return res.sendStatus(201);
	} catch (error) {
		return res.status(500).send(error);
	}
}

async function getComment(req, res) {
	const { postId } = req.params;
	const { userId } = res.locals.session;

	try {
		const comments = await getCommentData(userId, postId);
		return res.status(200).send(comments.rows);
	} catch (error) {
		return res.status(500).send(error);
	}
}

async function getCommentsQtd(req, res) {
	const { postId } = req.params;

	try {
		const comments = await getCommentQtdData(postId);
		res.status(200).send(comments.rows[0].countComments);
	} catch (error) {
		return res.status(500).send(error);
	}
}

// async function verifyFollow(req, res) {
// 	const { profile, follower } = req.query;
// 	let hasFollower;

// 	try {
// 		const searchFollowers = await searchFollowers(profile, follower);
// 		searchFollowers.length === 0 ? (hasFollower = false) : (hasFollower = true);

// 		res.status(200).send(hasFollower);
// 	} catch (error) {
// 		res.status(500).send(error.message)
// 	}

// 	searchFollowers;
// }

export { createComment, getComment, getCommentsQtd };
