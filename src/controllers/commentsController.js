import { createCommentData, getCommentData, getCommentQtdData } from '../repositories/commentsRepository.js';

async function createComment (req, res) {

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

async function getComment (req, res) {

    const { postId } = req.params;

    try {
        const comments = await getCommentData(postId);
        return res.status(200).send(comments.rows);
    } catch (error) {
		return res.status(500).send(error);
	}

}

async function getCommentsQtd (req, res) { 
	const { userId } = res.locals.session;
	const { postId } = req.params;

	try {
		const comments = await getCommentQtdData(postId)
		const totalComments = {comments: comments.rows, postId};
		res.status(200).send(totalComments);
	} catch (error) {
		return res.status(500).send(error);
	}
	
}

export { createComment, getComment, getCommentsQtd }