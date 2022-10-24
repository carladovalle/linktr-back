import { connection } from '../db/db.js';

async function createUser({ name, username, email, password, image }) {
	return connection.query(
		'INSERT INTO users (name, username, email, password, image) VALUES ($1,$2,$3,$4, $5);',
		[name, username, email, password, image]
	);
}

async function searchUserByEmail(email){
	return connection.query(
		'SELECT * FROM users WHERE email = $1;',
		[email]
	);
}

async function createNewSession(token, userId){
	return connection.query(
		'INSERT INTO sessions (token,"userId") VALUES ($1, $2);',
		[token, userId]
	);
}

async function validateUserToken(token){
	return connection.query(
		`
		SELECT 
			users.name, users.image, users.id
		FROM sessions
		JOIN users
			ON sessions."userId" = users.id
		WHERE sessions.token = $1
		`,
		[token]
	);
}

export { createUser, searchUserByEmail, createNewSession, validateUserToken };
