import { connection } from '../db/db.js';
import { postSchema } from '../schemas/postSchema.js';

async function sendPost(req, res) {
	const { link, content } = req.body;
	const validation = postSchema.validate(req.body);
	const { session } = res.locals;

	if (validation.error) {
		const errors = validation.error.details
			.map((error) => error.message)
			.join('\n');
		return res
			.status(422)
			.send(`The following errors an occurred:\n\n${errors}`);
	}

	try {
		if (content) {
			const hashtable = content
				.split(' ')
				.filter((word) => word[0] === '#')
				.forEach((element) => (hashtable[element] = true));
			let valuesString = '';
			for (let i = 1; i <= Object.keys(hashtable).length; i++) {
				valuesString += `($${i}), `;
			}
			valuesString = valuesString.trim().replace(/.$/, '');

			// await connection.query(
			// 	'INSERT INTO posts (content, link, "userId") VALUES($1, $2, $3)',
			// 	[content, link, session.userId]
			// );

			// const hashtags = content.split(' ').filter((word) => word[0] === '#');
			// let valuesString = '';
			// for (let i = 1; i <= hashtags.length; i++) {
			// 	valuesString += `($${i}), `;
			// }
			// valuesString = valuesString.trim().replace(/.$/, '');

			// await connection.query(
			// 	`INSERT INTO hashtags (hashtag) VALUES ${valuesString}`,
			// 	hashtags
			// );
			res.status(201).send({ valuesString, hashtags: Object.keys(hashtable) });
		} else {
			await connection.query(
				'INSERT INTO posts (link, "userId") VALUES($1, $2)',
				[link, session.userId]
			);
			res.statusSend(201);
		}
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

export { sendPost };
