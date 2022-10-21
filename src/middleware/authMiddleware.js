import { connection } from '../db/db.js';

async function authMiddleware(req, res, next) {
	const token = req.headers.authorization?.replace('Bearer ', '');

	if (!token) {
		return res.sendStatus(400);
	}

	try {
		const session = await connection.query(
			`SELECT * FROM sessions JOIN users ON sessions."userId" = users.id WHERE sessions.token = $1;`,
			[token]
		);

		if (!session.rows[0].userId) {
			return res.sendStatus(400);
		}

		res.locals.session = session.rows[0];
		next();
	} catch (error) {
		return res.sendStatus(401);
	}
}

export { authMiddleware };
