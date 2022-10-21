import { connection } from '../db/db.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()

async function authMiddleware(req, res, next) {
	const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

	if (!token) {
		return res.sendStatus(400);
	}

	try{
		const data = jwt.verify(token, process.env.JWT_SECRET)
		
	}catch(error){
		console.log(error)
		return res.status(401).send(error)
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
