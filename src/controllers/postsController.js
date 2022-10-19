import { connection } from '../db/db.js';
import { postSchema } from '../schemas/postSchema.js';

async function sendPost(req, res) {
	const { userId, link, content } = req.body;
	const validation = postSchema.validate(req.body);

	if (validation.error) {
		const errors = validation.error.details
			.map((error) => error.message)
			.join('\n');
		return res
			.status(422)
			.send(`The following errors an occurred:\n\n${errors}`);
	}

	const hashtags = content.split(' ').filter((word) => word[0] === '#');
	return res.send(hashtags);
}

export { sendPost };
