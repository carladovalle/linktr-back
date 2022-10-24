import { registerSchema, loginSchema } from '../schemas/authSchema.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import { createNewSession, createUser, searchUserByEmail, validateUserToken } from '../repositories/authRepository.js';

async function register(req, res) {
	let { name, username, email, password, image } = req.body;
	const isValid = registerSchema.validate({
		name,
		username,
		email,
		password,
		image,
	});

	if (isValid.error) {
		return res.sendStatus(422);
	}

	password = bcrypt.hashSync(password, 10);

	try {
		await createUser({...req.body, password})
		return res.sendStatus(201);
	} catch (error) {
		if (error.code === '23505') {
			return res.sendStatus(409);
		}
		console.log(error);
		return res.sendStatus(500);
	}
}

async function login(req, res) {
	const { email, password } = req.body;
	const secret = process.env.JWT_SECRET;
	const config = { expiresIn: 60 * 60 };
	const isValid = loginSchema.validate({ email, password });
	let userId;

	const token = jwt.sign({ email, password }, secret, config);

	if (isValid.error) {
		return res.sendStatus(422);
	}

	try {
		const query = await searchUserByEmail(email)
		const isPasswordValid = bcrypt.compareSync(
			password,
			query.rows[0].password
		);
		userId = query.rows[0].id;

		if (!isPasswordValid) {
			return res.sendStatus(401);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}

	try {
		await createNewSession(token, userId)
		return res.send({ token });
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
}

async function allowUserAccess(req, res) {
	const { session } = res.locals;

	try {
		const user = await validateUserToken(session.token)
		return res.status(200).send(user.rows[0]);
	} catch (error) {
		console.log(error.message);
		return res.status(500).send(error.message);
	}
}

export { register, login, allowUserAccess };
