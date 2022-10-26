import { createCommentData } from '../repositories/commentsRepository.js';

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

export { createComment }