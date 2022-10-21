import { connection } from '../db/db.js';

async function searchUsers(req, res) {
	const { word } = req.params;
	console.log(word);
	const wordWithJoker = word + '%';

	try {
		const userList = await connection.query(
			'SELECT name, image FROM users WHERE name ILIKE $1',
			[wordWithJoker]
		);
		return res.status(200).send(userList.rows);
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

export { searchUsers };
