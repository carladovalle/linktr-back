import urlMetaData from 'url-metadata';
import { findUserById, findUsers, listUserPosts } from '../repositories/usersRepository.js';

async function searchUsers(req, res) {
	const { word } = req.params;

	try {
		const userList = await findUsers(word)
		return res.status(200).send(userList.rows);
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

async function getUserById(req, res) {
	const { id } = req.params;

	try {
		const user = await findUserById(id)

		if (user.rows.length === 0) {
			return res.status(404).send('There are no users with this id.');
		}

		const userPosts = await listUserPosts(id)
		const list = [];

		if (userPosts.rows[0].link === null) {
			return res.status(200).send(userPosts.rows);
		}

		for (let i = 0; i < userPosts.rows.length; i++) {
			const metadata = await urlMetaData(userPosts.rows[i].link);
			list.push({
				...userPosts.rows[i],
				urlInfos: {
					url: metadata.url,
					title: metadata.title,
					image: metadata.image,
					description: metadata.description,
				},
			});
		}

		return res.status(200).send(list);
	} catch (error) {
		console.log(error);
		return res.status(500).send(error.message);
	}
}

export { searchUsers, getUserById };
