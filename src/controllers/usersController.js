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

		if (userPosts.rows[0].link === null) {
			return res.status(200).send(userPosts.rows);
		}

		return res.status(200).send(userPosts.rows);
	} catch (error) {
		console.log(error);
		return res.status(500).send(error.message);
	}
}

export { searchUsers, getUserById };
