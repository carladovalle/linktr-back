import { findUserById, findUsers, getUserInfo, listUserPosts } from '../repositories/usersRepository.js';

async function searchUsers(req, res) {
	const { word } = req.params;
	const {userId} = res.locals.session;

	try {
		const userList = await findUsers(userId, word)
		return res.status(200).send(userList.rows);
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

async function getUserById(req, res) {
	const { id } = req.params;
	const { offset, limit } = req.query;

	try {
		const user = await findUserById(id)

		if (user.rows.length === 0 && offset === 0) {
			return res.status(404).send('There are no users with this id.');
		}

		const userInfo = await getUserInfo(id);
		const userPosts = await listUserPosts(id, offset, limit);

		const userObject = {
			...userInfo.rows[0],
			userPosts: userPosts.rows
		}
		
		return res.status(200).send(userObject);
	} catch (error) {
		console.log(error);
		return res.status(500).send(error.message);
	}
}

export { searchUsers, getUserById };
