import { connection } from '../db/db.js';
import { postSchema } from '../schemas/postSchema.js';
import urlMetaData from 'url-metadata';

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
			const hashtagsHashtable = {};
			content
				.split(' ')
				.filter((word) => word[0] === '#')
				.forEach(
					(element) => (hashtagsHashtable[element.toLowerCase()] = true)
				);
			let valuesString = '';
			for (let i = 1; i <= Object.keys(hashtagsHashtable).length; i++) {
				valuesString += `($${i}), `;
			}
			valuesString = valuesString.trim().replace(/.$/, '');
			const hashtags = Object.keys(hashtagsHashtable);

			if (hashtags.length === 0) {
				await connection.query(
					'INSERT INTO posts (content, link, "userId") VALUES($1, $2, $3)',
					[content, link, session.userId]
				);

				return res.sendStatus(201);
			}

			const insertedPostId = await connection.query(
				'INSERT INTO posts (content, link, "userId") VALUES($1, $2, $3) RETURNING id',
				[content, link, session.userId]
			);

			const insertedHashtagsId = await connection.query(
				`INSERT INTO hashtags (hashtag) VALUES ${valuesString} RETURNING id`,
				hashtags
			);

			const hashtagsIdList = insertedHashtagsId.rows.map(
				(element) => element.id
			);
			valuesString = '';
			for (let i = 1; i <= hashtagsIdList.length; i++) {
				valuesString += `($1, $${i + 1}), `;
			}
			valuesString = valuesString.trim().replace(/.$/, '');

			await connection.query(
				`INSERT INTO "postsHashtags" ("postId", "hashtagId") VALUES ${valuesString}`,
				[insertedPostId.rows[0].id, ...hashtagsIdList]
			);

			res.sendStatus(201);
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

async function listPosts(req, res) {
	try {
		const list = [];
		const query = await connection.query(`
			SELECT posts.*, users.name, users.image, users.id AS "userId" FROM posts
					JOIN users ON posts."userId" = users.id
					ORDER BY posts."id" DESC 
					LIMIT 20`);

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
		console.log(error);
		return res.sendStatus(500);
	}
}

export { sendPost, listPosts };
